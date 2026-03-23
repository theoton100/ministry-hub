import PublicLayout from "@/components/PublicLayout";
import { SPOTIFY_SHOW_ID } from "@/lib/constants";
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
            <p className="text-white/40 text-sm">Today's Word with T.I. Solomon — be strengthened and encouraged by God's word.</p>
          </motion.div>
        </div>
      </section>

      {/* Main Spotify Show Embed */}
      <section className="py-10 border-b border-white/10">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-xl font-extrabold text-white mb-4">Latest Episodes</h2>
            <div className="rounded overflow-hidden">
              <iframe
                src={`https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded"
              />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <a
                href={`https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-brand hover:text-brand-hover transition-colors"
              >
                Open in Spotify
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Individual Episodes from Database */}
      {episodes && episodes.length > 0 && (
        <section className="py-10">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-extrabold text-white mb-6">All Episodes</h2>
            <div className="space-y-4">
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
          </div>
        </section>
      )}
    </PublicLayout>
  );
}
