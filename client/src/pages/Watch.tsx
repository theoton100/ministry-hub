import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Watch() {
  const { data: sermons } = trpc.sermon.list.useQuery({ limit: 50, offset: 0 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermons?.find((s) => s.youtubeVideoId === activeVideoId) ?? sermons?.[0];

  return (
    <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Sermons</h1>
            <p className="text-white/40 text-sm">Watch our latest messages and let the Word transform your life.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 border-b border-white/10">
        <div className="container">
          {activeSermon ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
              <div className="aspect-video rounded overflow-hidden mb-6" style={{ backgroundColor: '#201c1d' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeSermon.youtubeVideoId}`}
                  title={activeSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{activeSermon.title}</h2>
              {activeSermon.description && (
                <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{activeSermon.description}</p>
              )}
              <p className="text-white/25 text-xs mt-2">
                {new Date(activeSermon.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-extrabold text-white mb-2">Sermons Coming Soon</h2>
              <p className="text-white/40 text-sm">We are preparing powerful messages for you. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {sermons && sermons.length > 1 && (
        <section className="py-10">
          <div className="container">
            <h2 className="text-2xl font-extrabold text-white mb-8">Sermon Archive</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon, i) => (
                <motion.div key={sermon.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.05)}>
                  <div
                    className={`group cursor-pointer ${activeSermon?.id === sermon.id ? "opacity-60" : ""}`}
                    onClick={() => { setActiveVideoId(sermon.youtubeVideoId); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
                    <div className="aspect-video rounded overflow-hidden bg-white/5 mb-3">
                      <img
                        src={sermon.thumbnailUrl || `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`}
                        alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-1">
                      {new Date(sermon.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors line-clamp-2">{sermon.title}</h3>
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
