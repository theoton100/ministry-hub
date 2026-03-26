import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_NAME } from "@/lib/constants";
import { fadeUp, fadeUpDelay, staggerContainer } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, BookOpen, Users, Globe, ArrowRight, Play } from "lucide-react";

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

export default function About() {
  return (
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
        {/* Page Header */}
        <section className="pt-10 pb-6 border-b border-white/10">
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p variants={fadeUp} className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">
                Our Story
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                About
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/40 text-sm">
                The heart and vision behind {MINISTRY_NAME} Ministries.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Bio */}
        <section className="py-14 md:py-20 border-b border-white/10">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="md:col-span-3 space-y-5"
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Theophilus Solomon
                </h2>
                <p className="text-brand text-xs font-bold uppercase tracking-[0.15em]">
                  Pastor · Technologist · Educator
                </p>
                <div className="space-y-4 text-white/60 leading-relaxed text-base">
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
                  <Button className="bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-11 px-7 rounded-sm gap-2 mt-2 group">
                    <Play className="h-4 w-4 fill-[#231f20] group-hover:scale-110 transition-transform" />
                    Watch a Sermon
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpDelay(0.15)}
                className="md:col-span-2 space-y-4"
              >
                <div className="border border-white/10 rounded p-6 space-y-4">
                  <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest">Quick Facts</h3>
                  {[
                    { label: "Origin", value: "Kogi State, Nigeria" },
                    { label: "Based in", value: "Ghana" },
                    { label: "Role", value: "Pastor & Technologist" },
                    { label: "Ministry", value: "T.I. Solomon Ministries" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-white/40 text-sm">{item.label}</span>
                      <span className="text-white text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/give">
                  <div className="border border-brand/30 rounded p-5 hover:border-brand/60 transition-colors cursor-pointer group">
                    <Heart className="h-6 w-6 text-brand mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-bold text-sm mb-1">Support the Ministry</h4>
                    <p className="text-white/40 text-xs leading-relaxed">Your generosity helps us reach more hearts with the Gospel.</p>
                    <div className="mt-3 flex items-center gap-1 text-brand text-xs font-bold">
                      Give Today <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-14 md:py-20">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
              <p className="text-brand text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Foundation</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">What We Believe</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded overflow-hidden border border-white/10 max-w-4xl">
              {beliefs.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUpDelay(i * 0.08)}
                    className="bg-card p-7 hover:bg-white/5 transition-colors group border-r border-b border-white/10"
                    style={{ backgroundColor: '#201c1d' }}
                  >
                    <div className="w-10 h-10 rounded-sm bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white mb-2 group-hover:text-brand transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </PublicLayout>
    </div>
  );
}
