import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, Headphones, Loader2, Music } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function extractSpotifyEpisodeId(input: string): string {
  if (!input) return "";
  const match = input.match(/episode\/([a-zA-Z0-9]+)/);
  if (match) return match[1];
  if (/^[a-zA-Z0-9]{22}$/.test(input)) return input;
  return input;
}

export default function AdminPodcasts() {
  const { data: episodes, isLoading, refetch } = trpc.podcast.listAll.useQuery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [spotifyInput, setSpotifyInput] = useState("");
  const [spotifyShowUrl, setSpotifyShowUrl] = useState("");

  const createMutation = trpc.podcast.create.useMutation({
    onSuccess: () => { toast.success("Episode added!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.podcast.update.useMutation({
    onSuccess: () => { toast.success("Episode updated!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.podcast.delete.useMutation({
    onSuccess: () => { toast.success("Episode deleted"); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const resetForm = () => {
    setDialogOpen(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setSpotifyInput("");
    setSpotifyShowUrl("");
  };

  const openEdit = (ep: NonNullable<typeof episodes>[number]) => {
    setEditingId(ep.id);
    setTitle(ep.title);
    setDescription(ep.description || "");
    setSpotifyInput(ep.spotifyEpisodeId || "");
    setSpotifyShowUrl(ep.spotifyShowUrl || "");
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    const episodeId = extractSpotifyEpisodeId(spotifyInput);

    if (editingId) {
      updateMutation.mutate({ id: editingId, title, description, spotifyEpisodeId: episodeId || undefined, spotifyShowUrl: spotifyShowUrl || undefined });
    } else {
      createMutation.mutate({ title, description, spotifyEpisodeId: episodeId || undefined, spotifyShowUrl: spotifyShowUrl || undefined });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold">Podcast Episodes</h1>
          <p className="text-muted-foreground text-sm mt-1">Add and manage your Spotify podcast episodes.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Episode</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">{editingId ? "Edit Episode" : "Add New Episode"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Episode title..." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Spotify Episode ID or URL</Label>
                <Input placeholder="e.g. 4rOoJ6Egrf8K2IrywzwOMk or https://open.spotify.com/episode/..." value={spotifyInput} onChange={(e) => setSpotifyInput(e.target.value)} />
                {spotifyInput && extractSpotifyEpisodeId(spotifyInput) && (
                  <div className="rounded-lg overflow-hidden mt-2">
                    <iframe
                      src={`https://open.spotify.com/embed/episode/${extractSpotifyEpisodeId(spotifyInput)}?utm_source=generator&theme=0`}
                      width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Spotify Show URL (optional fallback)</Label>
                <Input placeholder="https://open.spotify.com/show/..." value={spotifyShowUrl} onChange={(e) => setSpotifyShowUrl(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea placeholder="Brief description..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isSaving ? "Saving..." : editingId ? "Update Episode" : "Add Episode"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="p-6 h-20" /></Card>)}</div>
      ) : episodes && episodes.length > 0 ? (
        <div className="space-y-3">
          {episodes.map((ep) => (
            <Card key={ep.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Music className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{ep.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {new Date(ep.publishedAt).toLocaleDateString()}
                    {ep.spotifyEpisodeId && ` · ${ep.spotifyEpisodeId}`}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => openEdit(ep)}><Edit className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{ep.title}"?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate({ id: ep.id })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
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
          <Headphones className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-serif text-xl font-semibold mb-2">No Episodes Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first Spotify podcast episode to share with your listeners.</p>
        </div>
      )}
    </div>
  );
}
