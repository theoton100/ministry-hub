import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Play } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Watch() {
  const { data: sermons, isLoading } = trpc.sermon.list.useQuery({ limit: 50, offset: 0 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermons?.find((s) => s.youtubeVideoId === activeVideoId) ?? sermons?.[0];

  return (
    <PublicLayout>
      <section className="bg-navy-900 text-white py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">Watch</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Sermon Messages</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Watch our latest sermons and let the Word of God transform your life. Every message is a seed of hope planted in your heart.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {isLoading ? (
            <div className="max-w-4xl mx-auto"><Skeleton className="w-full aspect-video rounded-xl" /><Skeleton className="h-8 w-2/3 mt-6" /></div>
          ) : activeSermon ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl mx-auto">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-navy-950">
                <iframe src={`https://www.youtube.com/embed/${activeSermon.youtubeVideoId}`} title={activeSermon.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video" />
              </div>
              <div className="mt-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold">{activeSermon.title}</h2>
                {activeSermon.description && <p className="text-muted-foreground mt-3 leading-relaxed">{activeSermon.description}</p>}
                <p className="text-xs text-muted-foreground/60 mt-2 tracking-wider uppercase">{new Date(activeSermon.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Sermons Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">We are preparing powerful messages of hope and faith. Check back soon for our sermon archive.</p>
            </div>
          )}
        </div>
      </section>

      {sermons && sermons.length > 1 && (
        <section className="py-12 md:py-16 bg-warm-50">
          <div className="container">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-center mb-10">Sermon Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {sermons.map((sermon, i) => (
                <motion.div key={sermon.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                  <Card
                    className={`group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-0 shadow-md ${activeSermon?.id === sermon.id ? "ring-2 ring-teal-500 shadow-lg" : ""}`}
                    onClick={() => { setActiveVideoId(sermon.youtubeVideoId); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={sermon.thumbnailUrl || `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center"><Play className="h-6 w-6 text-navy-900 ml-0.5" /></div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-teal-500 transition-colors">{sermon.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1.5">{new Date(sermon.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
