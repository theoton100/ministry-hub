import PublicLayout from "@/components/PublicLayout";
import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";

export default function Listen() {
  const { data: episodes = [], isLoading } = trpc.podcast.list.useQuery({ limit: 50, offset: 0 });

  return (
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Podcast</h1>
            <p className="text-white/40 text-sm">Today's Word with T.I. Solomon — be strengthened and encouraged by God's word.</p>
          </motion.div>
        </div>
      </section>

      {/* Episodes from Database */}
      <section className="py-10">
        <div className="container max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-white/5 rounded animate-pulse" />
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
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: i * 0.1 },
                    },
                  }}
                >
                  {episode.spotifyEpisodeId ? (
                    <div className="rounded overflow-hidden">
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
                    <div className="border border-white/10 rounded p-5">
                      <h3 className="text-white font-bold text-lg">{episode.title}</h3>
                      {episode.description && (
                        <p className="text-white/40 text-sm mt-2">{episode.description}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-bold text-white mb-3">Episodes Coming Soon</h2>
              <p className="text-white/40 text-sm">
                New episodes will be added here. Check back soon for the latest teachings.
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
    </div>
  );
}
