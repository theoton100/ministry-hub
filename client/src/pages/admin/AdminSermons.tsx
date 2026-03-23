import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, Video, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function extractYouTubeId(input: string): string {
  if (!input.includes("/") && !input.includes(".")) return input;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return input;
}

export default function AdminSermons() {
  const { data: sermons, isLoading, refetch } = trpc.sermon.listAll.useQuery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [featured, setFeatured] = useState(false);

  const createMutation = trpc.sermon.create.useMutation({
    onSuccess: () => { toast.success("Sermon added!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.sermon.update.useMutation({
    onSuccess: () => { toast.success("Sermon updated!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.sermon.delete.useMutation({
    onSuccess: () => { toast.success("Sermon deleted"); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const resetForm = () => {
    setDialogOpen(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setYoutubeInput("");
    setFeatured(false);
  };

  const openEdit = (sermon: NonNullable<typeof sermons>[number]) => {
    setEditingId(sermon.id);
    setTitle(sermon.title);
    setDescription(sermon.description || "");
    setYoutubeInput(sermon.youtubeVideoId);
    setFeatured(sermon.featured);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    const videoId = extractYouTubeId(youtubeInput);
    if (!videoId) { toast.error("YouTube video ID or URL is required"); return; }

    if (editingId) {
      updateMutation.mutate({ id: editingId, title, description, youtubeVideoId: videoId, featured });
    } else {
      createMutation.mutate({ title, description, youtubeVideoId: videoId, featured });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold">Sermons</h1>
          <p className="text-muted-foreground text-sm mt-1">Add and manage your YouTube sermon videos.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Sermon</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-sans">{editingId ? "Edit Sermon" : "Add New Sermon"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Sermon title..." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>YouTube Video ID or URL</Label>
                <Input placeholder="e.g. dQw4w9WgXcQ or https://youtube.com/watch?v=..." value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)} />
                {youtubeInput && (
                  <img src={`https://img.youtube.com/vi/${extractYouTubeId(youtubeInput)}/mqdefault.jpg`} alt="Thumbnail preview" className="w-full max-w-xs rounded-lg mt-2" />
                )}
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea placeholder="Brief description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="featured" checked={featured} onCheckedChange={setFeatured} />
                <Label htmlFor="featured">Featured sermon (shown on homepage)</Label>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isSaving ? "Saving..." : editingId ? "Update Sermon" : "Add Sermon"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="p-6 h-20" /></Card>)}</div>
      ) : sermons && sermons.length > 0 ? (
        <div className="space-y-3">
          {sermons.map((sermon) => (
            <Card key={sermon.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={sermon.thumbnailUrl || `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`}
                  alt={sermon.title}
                  className="w-28 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate">{sermon.title}</h3>
                    {sermon.featured && <Badge variant="default" className="shrink-0"><Star className="h-3 w-3 mr-1" /> Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {new Date(sermon.publishedAt).toLocaleDateString()} · {sermon.youtubeVideoId}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => openEdit(sermon)}><Edit className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{sermon.title}"?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate({ id: sermon.id })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
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
          <Video className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-sans text-xl font-semibold mb-2">No Sermons Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first YouTube sermon to share with your community.</p>
        </div>
      )}
    </div>
  );
}
