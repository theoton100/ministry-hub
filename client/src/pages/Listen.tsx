import PublicLayout from "@/components/PublicLayout";
import { SPOTIFY_SHOW_ID } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";

// Known episode IDs from the show — these can be managed from admin
const EPISODE_IDS = [
  "4mYqPRBBJFCmhIFNPVNKpB",
  "0JcMlYlJSbFBROFgDCPn5G",
];

export default function Listen() {
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

      {/* Full Show Player */}
      <section className="py-10 border-b border-white/10">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h2 className="text-xl font-extrabold text-white mb-4">Listen Now</h2>
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
            <div className="mt-4">
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

      {/* Individual Episodes */}
      <section className="py-10">
        <div className="container max-w-3xl">
          <h2 className="text-xl font-extrabold text-white mb-6">Episodes</h2>
          <div className="space-y-6">
            {EPISODE_IDS.map((episodeId, i) => (
              <motion.div
                key={episodeId}
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
                <div className="rounded overflow-hidden">
                  <iframe
                    src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 border border-white/10 rounded p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Want More Episodes?</h3>
            <p className="text-white/40 text-sm mb-4">
              Subscribe on Spotify to get notified when new episodes are released.
            </p>
            <a
              href={`https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand hover:bg-red-700 text-white font-bold text-sm px-6 py-2.5 rounded transition-colors"
            >
              Follow on Spotify
            </a>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
