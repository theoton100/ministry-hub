import PublicLayout from "@/components/PublicLayout";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { Headphones, Calendar } from "lucide-react";

export default function Listen() {
  const { data: episodes = [], isLoading } = trpc.podcast.list.useQuery({ limit: 50, offset: 0 });

  return (
    <PublicLayout>
      {/* PAGE HEADER */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Podcast</h1>
            <p className="text-gray-600 text-base max-w-2xl">Today's Word with T.I. Solomon — be strengthened and encouraged by God's word. Listen to sermons, teachings, and spiritual insights.</p>
          </motion.div>
        </div>
      </section>

      {/* EPISODES SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Episodes</h2>
            <p className="text-gray-600 text-base">Subscribe and listen to our latest teachings</p>
          </motion.div>

          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : episodes.length > 0 ? (
            <div className="space-y-6">
              {episodes.map((episode, i) => (
                <motion.div
                  key={episode.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.08)}
                >
                  {episode.spotifyEpisodeId ? (
                    <div className="rounded-lg overflow-hidden bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                      <iframe
                        src={`https://open.spotify.com/embed/episode/${episode.spotifyEpisodeId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded"
                      />
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0">
                          <Headphones className="h-6 w-6 text-gray-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{episode.title}</h3>
                          {episode.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3 font-light">{episode.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {new Date(episode.publishedAt || episode.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
              <Headphones className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">Episodes Coming Soon</h2>
              <p className="text-gray-600 text-sm">
                New episodes will be added here. Check back soon for the latest teachings.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
