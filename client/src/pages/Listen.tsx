import PublicLayout from "@/components/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Headphones, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Listen() {
  const { data: episodes, isLoading } = trpc.podcast.list.useQuery({ limit: 50, offset: 0 });

  return (
    <PublicLayout>
      <section className="bg-navy-900 text-white py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">Listen</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Podcast Episodes</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Take the ministry with you wherever you go. Listen to powerful messages, devotionals, and teachings on Spotify.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-40 rounded-xl" />
              ))}
            </div>
          ) : episodes && episodes.length > 0 ? (
            <div className="space-y-8">
              {episodes.map((ep, i) => (
                <motion.div key={ep.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                          <Music className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-lg font-semibold">{ep.title}</h3>
                          {ep.description && <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{ep.description}</p>}
                          <p className="text-xs text-muted-foreground/60 mt-2 tracking-wider uppercase">
                            {new Date(ep.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      {ep.spotifyEpisodeId && (
                        <div className="rounded-xl overflow-hidden">
                          <iframe
                            src={`https://open.spotify.com/embed/episode/${ep.spotifyEpisodeId}?utm_source=generator&theme=0`}
                            width="100%"
                            height="152"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-xl"
                          />
                        </div>
                      )}
                      {!ep.spotifyEpisodeId && ep.spotifyShowUrl && (
                        <a href={ep.spotifyShowUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-teal-500 hover:underline font-semibold">
                          <Headphones className="h-4 w-4" /> Listen on Spotify
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center mx-auto mb-6">
                <Headphones className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Podcast Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We are preparing inspiring podcast episodes for you. Stay tuned for powerful messages you can listen to on the go.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
