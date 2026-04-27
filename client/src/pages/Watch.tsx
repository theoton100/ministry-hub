import PublicLayout from "@/components/PublicLayout";
import { trpc } from "@/lib/trpc";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Calendar, Video, ArrowRight } from "lucide-react";

export default function Watch() {
  const { data: sermons, isLoading } = trpc.sermon.list.useQuery({ limit: 50, offset: 0 });
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermons?.find((s) => s.youtubeVideoId === activeVideoId) ?? sermons?.[0];

  return (
    <PublicLayout>
      {/* HERO SECTION — Featured Sermon */}
      {isLoading ? (
        <section className="pt-20 pb-20 bg-white min-h-screen flex items-center">
          <div className="container">
            <div className="max-w-4xl">
              <div className="aspect-video rounded-lg bg-gray-200 animate-pulse mb-8" />
              <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
              <div className="h-6 bg-gray-200 rounded animate-pulse w-full" />
            </div>
          </div>
        </section>
      ) : activeSermon ? (
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} className="max-w-5xl">
                <div className="aspect-video rounded-lg overflow-hidden mb-10 shadow-lg border border-gray-200">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeSermon.youtubeVideoId}`}
                    title={activeSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="mb-8">
                  <p className="text-gray-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Featured Message</p>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {activeSermon.title}
                  </h1>
                  
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-600" />
                      <p className="text-gray-700 font-semibold">
                        {new Date(activeSermon.publishedAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {activeSermon.description && (
                    <p className="text-gray-700 text-base leading-relaxed max-w-3xl">
                      {activeSermon.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-32 bg-white flex items-center justify-center min-h-screen">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-2xl">
            <Video className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Sermons Coming Soon</h2>
            <p className="text-gray-600 text-base">We are preparing powerful messages for you. Check back soon.</p>
          </motion.div>
        </section>
      )}

      {/* SERMON ARCHIVE SECTION */}
      {sermons && sermons.length > 1 && (
        <section className="py-20 md:py-28 bg-gray-50">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-[0.3em] mb-4">Message Archive</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">More Sermons</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sermons.map((sermon, i) => (
                <motion.div
                  key={sermon.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.08)}
                >
                  <div
                    className={`group cursor-pointer h-full transition-all duration-300 ${
                      activeSermon?.id === sermon.id ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => {
                      setActiveVideoId(sermon.youtubeVideoId);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-6 relative shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                      <img
                        src={
                          sermon.thumbnailUrl ||
                          `https://img.youtube.com/vi/${sermon.youtubeVideoId}/mqdefault.jpg`
                        }
                        alt={sermon.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/0 group-hover:bg-white/80 flex items-center justify-center transition-all scale-75 group-hover:scale-100">
                          <Play className="h-6 w-6 text-gray-900 fill-gray-900 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      {activeSermon?.id === sermon.id && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded">
                          Now Playing
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">
                      {new Date(sermon.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-3">
                      {sermon.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-700 text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Watch</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
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
