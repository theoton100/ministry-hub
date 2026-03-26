import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { MINISTRY_NAME } from "@/lib/constants";
import { fadeUp, fadeUpDelay } from "@/lib/animations";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div style={{ backgroundColor: '#201c1d', minHeight: '100vh' }}>
      <PublicLayout>
      <section className="pt-10 pb-6 border-b border-white/10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">About</h1>
            <p className="text-white/40 text-sm">The heart and vision behind {MINISTRY_NAME} Ministries.</p>
          </motion.div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-12 md:py-16 border-b border-white/10">
        <div className="container max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Theophilus Solomon</h2>
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
              <Button className="bg-brand hover:bg-brand-hover text-[#231f20] font-bold text-sm h-10 px-6 rounded-sm mt-2">
                Watch a Sermon
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">What We Believe</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px  rounded overflow-hidden max-w-4xl">
            {[
              { title: "Love God, Love People", desc: "We believe the greatest commandment is to love God with all our heart and to love our neighbors as ourselves. Everything we do flows from this foundation." },
              { title: "The Authority of Scripture", desc: "The Bible is the inspired, infallible Word of God. It is our guide for faith, practice, and daily living. We teach it boldly and apply it practically." },
              { title: "Community & Fellowship", desc: "We are not meant to walk alone. Our church is a family where every member is valued, supported, and empowered to fulfill their God-given purpose." },
              { title: "Reaching the World", desc: "Through technology, media, and missions, we are committed to taking the Gospel beyond walls and borders — reaching every heart with the message of hope." },
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpDelay(i * 0.08)}
                className="bg-card p-7 hover: transition-colors"
              >
                <h3 className="text-lg font-extrabold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
    </div>
  );
}
