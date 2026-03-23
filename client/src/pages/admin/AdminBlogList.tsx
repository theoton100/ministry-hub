import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminBlogList() {
  const { data: posts, isLoading, refetch } = trpc.blog.listAll.useQuery();
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { toast.success("Post deleted"); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">Create, edit, and manage your blog articles.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2"><Plus className="h-4 w-4" /> New Post</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse"><CardContent className="p-6 h-20" /></Card>
          ))}
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <Badge variant={post.published ? "default" : "secondary"} className="shrink-0">
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.updatedAt ? `Updated ${new Date(post.updatedAt).toLocaleDateString()}` : ""}
                    {post.slug && ` · /${post.slug}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {post.published && (
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="icon" className="h-9 w-9"><Eye className="h-4 w-4" /></Button>
                    </Link>
                  )}
                  <Link href={`/admin/blog/edit/${post.id}`}>
                    <Button variant="ghost" size="icon" className="h-9 w-9"><Edit className="h-4 w-4" /></Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{post.title}"?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. The blog post will be permanently deleted.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate({ id: post.id })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-sans text-xl font-semibold mb-2">No Blog Posts Yet</h3>
          <p className="text-muted-foreground mb-6">Start writing your first article to inspire your community.</p>
          <Link href="/admin/blog/new"><Button className="gap-2"><Plus className="h-4 w-4" /> Write Your First Post</Button></Link>
        </div>
      )}
    </div>
  );
}
