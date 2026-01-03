import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Target, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe in the power of community. Every feature we build is designed to bring developers together.",
  },
  {
    icon: Target,
    title: "High Impact",
    description:
      "We don't do mediocre. Every event on our platform is curated to deliver real value and lasting impact.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We push boundaries. From cutting-edge CTF challenges to revolutionary hackathon formats.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Tech has no borders. We connect developers from every corner of the world.",
  },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", initials: "AC" },
  { name: "Sarah Kim", role: "Head of Engineering", initials: "SK" },
  { name: "Marcus Johnson", role: "Head of Community", initials: "MJ" },
  { name: "Priya Patel", role: "Head of Design", initials: "PP" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>

        <div className="container-wide relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              About EverHack
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              We Initiate{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                The Innovations
              </span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              EverHack is the premier platform for tech communities to host and
              launch hackathons, CTFs, and workshops with high impact. We're on a
              mission to make technical events more accessible, engaging, and
              impactful for developers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-border">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at EverHack.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The passionate people behind EverHack.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-card/50 border-y border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Developers" },
              { value: "200+", label: "Events Hosted" },
              { value: "50+", label: "Countries" },
              { value: "$2M+", label: "Prizes Awarded" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
