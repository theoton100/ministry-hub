import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_NAME, HERO_IMAGE } from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Globe, ArrowRight, Play, Zap, Target } from "lucide-react";

const beliefs = [
  {
    icon: Heart,
    title: "Love God, Love People",
    desc: "We believe the greatest commandment is to love God with all our heart and to love our neighbours as ourselves. Everything we do flows from this foundation.",
  },
  {
    icon: BookOpen,
    title: "The Authority of Scripture",
    desc: "The Bible is the inspired, infallible Word of God. It is our guide for faith, practice, and daily living. We teach it boldly and apply it practically.",
  },
  {
    icon: Users,
    title: "Community & Fellowship",
    desc: "We are not meant to walk alone. Our church is a family where every member is valued, supported, and empowered to fulfil their God-given purpose.",
  },
  {
    icon: Globe,
    title: "Reaching the World",
    desc: "Through technology, media, and missions, we are committed to taking the Gospel beyond walls and borders — reaching every heart with the message of hope.",
  },
];

const pillars = [
  {
    icon: Zap,
    title: "Deep Intimacy with God",
    desc: "The foundation of everything — knowing God personally and experiencing His presence daily.",
  },
  {
    icon: Target,
    title: "Clarity & Purpose",
    desc: "Moving from confusion to confidence through organized prayer, hearing God's voice, and understanding your vision.",
  },
  {
    icon: BookOpen,
    title: "Scriptural Teaching",
    desc: "Bold, practical, and transformative teaching grounded in the Word of God.",
  },
];

export default function About() {
  return (
    <PublicLayout>
      {/* PAGE HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Pastor T.I. Solomon" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/40" />
        </div>
        
        <div className="container relative z-10 py-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Our Story
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              About Pastor Theo
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-700 text-base leading-relaxed max-w-xl">
              A devoted Christian leader, technologist, and educator committed to helping people move from confusion to clarity through deep intimacy with God.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PASTOR BIO SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Who is Pastor Theo?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Theophilus Solomon
              </h2>
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-6">
                Pastor · Technologist · Educator
              </p>
              <div className="space-y-5 text-gray-700 leading-relaxed text-base mb-8">
                <p>
                  Pastor Theophilus Solomon is a devoted Christian leader originally from Kogi State, Nigeria, now serving faithfully in Ghana. With a heart ablaze for God and a deep love for His people, Pastor Theo leads a growing church community dedicated to worship, the Word, and service.
                </p>
                <p>
                  Beyond the pulpit, Pastor Theo brings a unique blend of technology and ministry together. As a skilled technologist and educator, he builds digital platforms that extend the reach of the Gospel, making the Word of God accessible to believers wherever they are.
                </p>
                <p>
                  His preaching style blends the warmth and encouragement of uplifting storytelling with the bold, scripturally grounded authority of sound doctrine. Every message is designed to inspire faith, ignite hope, and equip believers for victorious living.
                </p>
              </div>
              <Link href="/watch">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-base h-12 px-8 rounded-sm gap-2 group">
                  <Play className="h-5 w-5 fill-gray-900" />
                  Watch a Sermon
                </Button>
              </Link>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.1)} className="space-y-6">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  {[
                    { label: "Origin", value: "Kogi State, Nigeria" },
                    { label: "Based in", value: "Ghana" },
                    { label: "Role", value: "Pastor & Technologist" },
                    { label: "Ministry", value: "T.I. Solomon Ministries" },
                    { label: "Focus", value: "Intimacy with God" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <span className="text-gray-600 text-sm">{item.label}</span>
                      <span className="text-gray-900 text-sm font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/give">
                <div className="bg-yellow-400 rounded-lg p-8 text-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <Heart className="h-8 w-8 text-gray-900 mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-bold mb-2">Support the Ministry</h4>
                  <p className="text-gray-800 text-sm leading-relaxed mb-4">Your generosity helps us reach more hearts with the Gospel and provide free resources.</p>
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    Give Today <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MINISTRY PILLARS SECTION */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Core Message</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ministry Pillars</h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Everything we do is built on these three foundational pillars that guide our teaching and ministry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)} className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-lg bg-yellow-100 flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                    <Icon className="h-7 w-7 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BELIEFS SECTION */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Foundation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What We Believe</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpDelay(i * 0.08)}
                  className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-28 bg-yellow-400">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Deepen Your Walk with God?
            </h2>
            <p className="text-gray-800 text-base leading-relaxed mb-10">
              Explore our sermons, blog articles, and resources to help you move from confusion to clarity and develop deep intimacy with God.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/watch">
                <Button className="bg-white hover:bg-gray-100 text-yellow-600 font-bold text-base h-12 px-8 rounded-sm gap-2">
                  <Play className="h-5 w-5 fill-yellow-600" />
                  Watch Sermons
                </Button>
              </Link>
              <Link href="/blog">
                <Button className="border-2 border-white text-white hover:bg-white/20 font-bold text-base h-12 px-8 rounded-sm bg-transparent gap-2">
                  <BookOpen className="h-5 w-5" />
                  Read Articles
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
}
