import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Calendar, Video } from "lucide-react";

export default function Watch() {
  const { data: sermons, isLoading } = trpc.sermon.list.useQuery({ limit: 50, offset: 0 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermons?.find((s) => s.youtubeVideoId === activeVideoId) ?? sermons?.[0];

  return (
    <PublicLayout>
      {/* Page Header */}
      <section className="pt-10 pb-6 border-b border-white/10" style={{ backgroundColor: '#201c1d' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeUp} className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Messages & Teaching
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              Sermons
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/40 text-sm">
              Watch our latest messages and let the Word transform your life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Video Player */}
      <section className="py-10 border-b border-white/10">
        <div className="container">
          {isLoading ? (
            <div className="max-w-4xl">
              <div className="aspect-video rounded bg-white/5 animate-pulse mb-6" />
              <div className="h-8 bg-white/5 rounded animate-pulse w-2/3 mb-3" />
              <div className="h-4 bg-white/5 rounded animate-pulse w-full" />
            </div>
          ) : activeSermon ? (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
              <div className="aspect-video rounded overflow-hidden mb-6 shadow-2xl" style={{ backgroundColor: '#201c1d' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${activeSermon.youtubeVideoId}`}
                  title={activeSermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-white/30" />
                    <p className="text-white/30 text-xs">
                      {new Date(activeSermon.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{activeSermon.title}</h2>
                  {activeSermon.description && (
                    <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{activeSermon.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center py-20 border border-white/10 rounded max-w-2xl"
            >
              <Video className="h-14 w-14 text-white/15 mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-white mb-2">Sermons Coming Soon</h2>
              <p className="text-white/40 text-sm">We are preparing powerful messages for you. Check back soon.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Sermon Archive */}
      {sermons && sermons.length > 1 && (
        <section className="py-10">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
              <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-2">Archive</p>
              <h2 className="text-2xl font-extrabold text-white">More Sermons</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon, i) => (
                <motion.div
                  key={sermon.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.05)}
                >
                  <div
                    className={`group cursor-pointer ${activeSermon?.id === sermon.id ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => {
                      setActiveVideoId(sermon.youtubeVideoId);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="aspect-video rounded overflow-hidden mb-3 relative">
                      <img
                        src={
                          sermon.thumbnailUrl ||
                          `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`
                        }
                        alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#201c1d]/0 group-hover:bg-[#201c1d]/30 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-brand/0 group-hover:bg-brand/90 flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                          <Play className="h-5 w-5 text-[#231f20] fill-[#231f20] ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      {activeSermon?.id === sermon.id && (
                        <div className="absolute top-2 left-2 bg-brand text-[#231f20] text-[10px] font-bold px-2 py-0.5 rounded">
                          Now Playing
                        </div>
                      )}
                    </div>
                    <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-1">
                      {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-base font-bold text-white group-hover:text-brand transition-colors line-clamp-2">
                      {sermon.title}
                    </h3>
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
