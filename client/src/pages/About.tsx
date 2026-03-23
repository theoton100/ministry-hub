import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { PASTOR_PHOTO, ABOUT_BG, MINISTRY_NAME } from "@/lib/constants";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { Heart, BookOpen, Users, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ABOUT_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-navy-900/50" />
        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">About</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Meet Pastor {MINISTRY_NAME}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              A servant of God, called to bring hope, faith, and transformation to every heart through the power of the Gospel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img src={PASTOR_PHOTO} alt={`Pastor ${MINISTRY_NAME}`} className="w-full aspect-[3/4] object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-500/10 rounded-xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-navy-200/30 rounded-xl -z-10" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.2)} className="space-y-6">
              <div>
                <p className="text-teal-500 font-semibold tracking-widest uppercase text-xs mb-3">Our Pastor</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Theophilus Solomon</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
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
                <Button className="gap-2 mt-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold tracking-wider text-xs uppercase">
                  Watch a Sermon <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ministry Vision */}
      <section className="py-16 md:py-24 bg-navy-900 text-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-teal-400 font-semibold tracking-widest uppercase text-xs mb-3">Our Vision</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">What We Believe</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: "Love God, Love People", desc: "We believe the greatest commandment is to love God with all our heart and to love our neighbors as ourselves. Everything we do flows from this foundation.", color: "bg-red-500/10 text-red-400" },
              { icon: BookOpen, title: "The Authority of Scripture", desc: "The Bible is the inspired, infallible Word of God. It is our guide for faith, practice, and daily living. We teach it boldly and apply it practically.", color: "bg-teal-500/10 text-teal-400" },
              { icon: Users, title: "Community & Fellowship", desc: "We are not meant to walk alone. Our church is a family where every member is valued, supported, and empowered to fulfill their God-given purpose.", color: "bg-blue-500/10 text-blue-400" },
              { icon: Globe, title: "Reaching the World", desc: "Through technology, media, and missions, we are committed to taking the Gospel beyond walls and borders — reaching every heart with the message of hope.", color: "bg-amber-500/10 text-amber-400" },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}
                className="flex gap-5 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
