import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { PASTOR_PHOTO, ABOUT_BG } from "@/lib/constants";
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Meet Pastor Theo
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
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={PASTOR_PHOTO} alt="Pastor Theophilus Solomon" className="w-full aspect-[3/4] object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(0.2)} className="space-y-6">
              <div>
                <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Our Pastor</p>
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
                <Button className="gap-2 mt-2">Watch a Sermon <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ministry Vision */}
      <section className="py-16 md:py-24 bg-warm-50">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Our Vision</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">What We Believe</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: "Love God, Love People", desc: "We believe the greatest commandment is to love God with all our heart and to love our neighbors as ourselves. Everything we do flows from this foundation." },
              { icon: BookOpen, title: "The Authority of Scripture", desc: "The Bible is the inspired, infallible Word of God. It is our guide for faith, practice, and daily living. We teach it boldly and apply it practically." },
              { icon: Users, title: "Community & Fellowship", desc: "We are not meant to walk alone. Our church is a family where every member is valued, supported, and empowered to fulfill their God-given purpose." },
              { icon: Globe, title: "Reaching the World", desc: "Through technology, media, and missions, we are committed to taking the Gospel beyond walls and borders — reaching every heart with the message of hope." },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.1)}
                className="flex gap-5 p-6 rounded-2xl bg-background border border-border/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
