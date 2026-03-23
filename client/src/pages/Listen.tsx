import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { motion } from "framer-motion";

export default function Listen() {
  const { data: episodes } = trpc.podcast.list.useQuery({ limit: 50, offset: 0 });

  return (
    <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Podcast</h1>
            <p className="text-white/40 text-sm">Listen to our messages wherever you are — on Spotify, Apple Podcasts, or right here.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          {episodes && episodes.length > 0 ? (
            <div className="space-y-4 max-w-3xl">
              {episodes.map((ep, i) => (
                <motion.div key={ep.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                  <div className="border border-white/10 rounded p-5 hover:border-white/20 transition-colors">
                    {ep.spotifyEpisodeId && (
                      <div className="rounded overflow-hidden mb-4">
                        <iframe
                          src={`https://open.spotify.com/embed/episode/${ep.spotifyEpisodeId}?utm_source=generator&theme=0`}
                          width="100%"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-1">{ep.title}</h3>
                    {ep.description && (
                      <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{ep.description}</p>
                    )}
                    <p className="text-white/25 text-xs mt-2">
                      {new Date(ep.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-extrabold text-white mb-2">Podcast Coming Soon</h2>
              <p className="text-white/40 text-sm">We are preparing episodes for you. Check back soon or subscribe on Spotify.</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
