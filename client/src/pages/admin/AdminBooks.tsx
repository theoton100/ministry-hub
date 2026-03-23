import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { Plus, Edit, Trash2, BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminBooks() {
  const { data: books, isLoading, refetch } = trpc.book.listAll.useQuery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceStr, setPriceStr] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = trpc.book.create.useMutation({
    onSuccess: () => { toast.success("Book added!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.book.update.useMutation({
    onSuccess: () => { toast.success("Book updated!"); resetForm(); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.book.delete.useMutation({
    onSuccess: () => { toast.success("Book deleted"); refetch(); },
    onError: (err) => toast.error(err.message),
  });

  const uploadCover = trpc.book.uploadCover.useMutation({
    onSuccess: (data) => {
      setCoverImageUrl(data.url);
      setUploading(false);
      toast.success("Cover uploaded!");
    },
    onError: (err) => {
      setUploading(false);
      toast.error(err.message || "Upload failed");
    },
  });

  const resetForm = () => {
    setDialogOpen(false);
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPriceStr("");
    setCoverImageUrl("");
    setPublished(false);
  };

  const openEdit = (book: NonNullable<typeof books>[number]) => {
    setEditingId(book.id);
    setTitle(book.title);
    setDescription(book.description || "");
    setPriceStr((book.priceInCents / 100).toFixed(2));
    setCoverImageUrl(book.coverImageUrl || "");
    setPublished(book.published);
    setDialogOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      uploadCover.mutate({ base64, filename: file.name, contentType: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!title.trim()) { toast.error("Title is required"); return; }
    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) { toast.error("Enter a valid price"); return; }
    const priceInCents = Math.round(price * 100);

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        title,
        description: description || undefined,
        priceInCents,
        coverImageUrl: coverImageUrl || undefined,
        published,
      });
    } else {
      createMutation.mutate({
        title,
        description: description || undefined,
        priceInCents,
        coverImageUrl: coverImageUrl || undefined,
        published,
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold">Books</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your books and set prices in USD.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Add Book</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-sans">{editingId ? "Edit Book" : "Add New Book"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Book title..." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the book..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Price (USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="9.99"
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cover Image</Label>
                {coverImageUrl && (
                  <div className="w-32 h-44 rounded overflow-hidden bg-muted mb-2">
                    <img src={coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="gap-2"
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {uploading ? "Uploading..." : coverImageUrl ? "Change Cover" : "Upload Cover"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="published">Published (visible on store page)</Label>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isSaving ? "Saving..." : editingId ? "Update Book" : "Add Book"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="p-6 h-20" /></Card>)}</div>
      ) : books && books.length > 0 ? (
        <div className="space-y-3">
          {books.map((book) => (
            <Card key={book.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                {book.coverImageUrl ? (
                  <div className="w-12 h-16 rounded overflow-hidden bg-muted shrink-0">
                    <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-16 rounded bg-orange-50 flex items-center justify-center shrink-0">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {formatPrice(book.priceInCents)}
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${book.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {book.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => openEdit(book)}><Edit className="h-4 w-4" /></Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{book.title}"?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate({ id: book.id })} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
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
          <BookOpen className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-sans text-xl font-semibold mb-2">No Books Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first book to start selling on the store page.</p>
        </div>
      )}
    </div>
  );
}
