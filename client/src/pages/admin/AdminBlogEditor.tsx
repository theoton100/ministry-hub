import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export default function AdminBlogEditor() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const isEditing = !!params.id;
  const postId = params.id ? parseInt(params.id) : undefined;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const { data: existingPost, isLoading: loadingPost } = trpc.blog.getById.useQuery(
    { id: postId! },
    { enabled: !!postId }
  );

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setSlug(existingPost.slug);
      setExcerpt(existingPost.excerpt || "");
      setContent(existingPost.content || "");
      setFeaturedImageUrl(existingPost.featuredImageUrl || "");
      setPublished(existingPost.published);
      setSlugManuallyEdited(true);
    }
  }, [existingPost]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Blog post created!");
      navigate("/admin/blog");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Blog post updated!");
      navigate("/admin/blog");
    },
    onError: (err) => toast.error(err.message),
  });

  const uploadImageMutation = trpc.blog.uploadImage.useMutation({
    onSuccess: (data) => {
      setFeaturedImageUrl(data.url);
      toast.success("Image uploaded!");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadImageMutation.mutate({
        base64,
        filename: file.name,
        contentType: file.type,
      });
    };
    reader.readAsDataURL(file);
  }, [uploadImageMutation]);

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    if (!slug.trim()) { toast.error("Slug is required"); return; }

    if (isEditing && postId) {
      updateMutation.mutate({ id: postId, title, slug, excerpt, content, featuredImageUrl, published });
    } else {
      createMutation.mutate({ title, slug, excerpt, content, featuredImageUrl, published });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isEditing && loadingPost) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/blog")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-sans text-2xl font-bold">{isEditing ? "Edit Post" : "New Blog Post"}</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isEditing ? "Update your blog article." : "Write a new article for your ministry blog."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch id="published" checked={published} onCheckedChange={setPublished} />
            <Label htmlFor="published" className="text-sm">{published ? "Published" : "Draft"}</Label>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter your blog post title..."
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-lg font-sans"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">/blog/</span>
            <Input
              id="slug"
              placeholder="url-slug"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
              className="flex-1"
            />
          </div>
        </div>

        {/* Featured Image */}
        <div className="space-y-2">
          <Label>Featured Image</Label>
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="p-4">
              {featuredImageUrl ? (
                <div className="space-y-3">
                  <img src={featuredImageUrl} alt="Featured" className="w-full max-h-64 object-cover rounded-lg" />
                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <Button variant="outline" size="sm" asChild>
                        <span className="gap-2"><ImageIcon className="h-4 w-4" /> Change Image</span>
                      </Button>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <Button variant="ghost" size="sm" onClick={() => setFeaturedImageUrl("")}>Remove</Button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3 py-8 text-muted-foreground hover:text-foreground transition-colors">
                  {uploadImageMutation.isPending ? (
                    <Loader2 className="h-10 w-10 animate-spin" />
                  ) : (
                    <ImageIcon className="h-10 w-10" />
                  )}
                  <span className="text-sm font-medium">
                    {uploadImageMutation.isPending ? "Uploading..." : "Click to upload a featured image"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </CardContent>
          </Card>
          <Input
            placeholder="Or paste an image URL..."
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            className="text-sm"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="A brief summary of your post (shown in listings)..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="content">Content (Markdown supported)</Label>
          <Textarea
            id="content"
            placeholder="Write your blog post content here... You can use **bold**, *italic*, ## headings, and other Markdown formatting."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            className="font-mono text-sm leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">
            Supports Markdown formatting: **bold**, *italic*, ## headings, - lists, &gt; blockquotes, [links](url)
          </p>
        </div>
      </div>
    </div>
  );
}
