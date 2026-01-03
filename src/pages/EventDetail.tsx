import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Calendar,
  Users,
  Trophy,
  MapPin,
  Clock,
  ArrowLeft,
  Check,
  ExternalLink,
} from "lucide-react";
import eventCtf from "@/assets/event-ctf.jpg";
import eventHackathon from "@/assets/event-hackathon.jpg";
import eventWorkshop from "@/assets/event-workshop.jpg";

const eventsData: Record<string, {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  prize: string;
  image: string;
  description: string;
  longDescription: string;
  rules: string[];
  timeline: { time: string; event: string }[];
  organizer: string;
}> = {
  "cyber-siege-2026": {
    id: "cyber-siege-2026",
    title: "Cyber Siege 2026",
    type: "CTF",
    date: "February 15-17, 2026",
    time: "48 Hours",
    location: "Online + San Francisco, CA",
    participants: 2500,
    maxParticipants: 5000,
    prize: "$50,000",
    image: eventCtf,
    description: "The ultimate cybersecurity capture-the-flag competition.",
    longDescription:
      "Cyber Siege 2026 is the most anticipated CTF event of the year. Join thousands of security researchers, ethical hackers, and cybersecurity enthusiasts as they compete in challenges spanning web exploitation, reverse engineering, cryptography, forensics, and more. Whether you're a seasoned pro or just starting your journey in cybersecurity, this event offers something for everyone.",
    rules: [
      "Teams of 1-4 members allowed",
      "No sharing of flags or solutions during the competition",
      "All exploits must be self-discovered",
      "Attacks on competition infrastructure are prohibited",
      "Decisions by judges are final",
    ],
    timeline: [
      { time: "Feb 15, 9:00 AM", event: "Opening Ceremony" },
      { time: "Feb 15, 10:00 AM", event: "Competition Begins" },
      { time: "Feb 16, 12:00 PM", event: "Bonus Challenges Released" },
      { time: "Feb 17, 10:00 AM", event: "Competition Ends" },
      { time: "Feb 17, 2:00 PM", event: "Awards Ceremony" },
    ],
    organizer: "CyberSec Foundation",
  },
  "buildverse-hackathon": {
    id: "buildverse-hackathon",
    title: "BuildVerse Hackathon",
    type: "Hackathon",
    date: "March 8-10, 2026",
    time: "48 Hours",
    location: "New York City, NY",
    participants: 1800,
    maxParticipants: 2500,
    prize: "$100,000",
    image: eventHackathon,
    description: "Build the future of decentralized applications.",
    longDescription:
      "BuildVerse is a 48-hour hackathon focused on building the next generation of decentralized applications. From DeFi protocols to NFT marketplaces, from DAOs to cross-chain bridges—if you can dream it, you can build it here. Work alongside industry mentors from leading Web3 companies and compete for substantial prizes.",
    rules: [
      "Teams of 2-5 members",
      "All code must be written during the hackathon",
      "Open source libraries allowed",
      "Projects must be deployed to testnet for judging",
      "Original work only",
    ],
    timeline: [
      { time: "Mar 8, 6:00 PM", event: "Check-in & Networking" },
      { time: "Mar 8, 8:00 PM", event: "Hacking Begins" },
      { time: "Mar 9, 12:00 PM", event: "Workshop Sessions" },
      { time: "Mar 10, 8:00 PM", event: "Submissions Due" },
      { time: "Mar 10, 9:00 PM", event: "Demo & Judging" },
    ],
    organizer: "Web3 Builders Alliance",
  },
  "web3-masterclass": {
    id: "web3-masterclass",
    title: "Web3 Masterclass",
    type: "Workshop",
    date: "January 20, 2026",
    time: "8 Hours",
    location: "Online",
    participants: 500,
    maxParticipants: 1000,
    prize: "Free",
    image: eventWorkshop,
    description: "Learn blockchain development from industry experts.",
    longDescription:
      "This comprehensive 8-hour workshop covers everything you need to know to start building on blockchain. From understanding smart contract fundamentals to deploying your first dApp, our expert instructors will guide you through hands-on exercises and real-world projects.",
    rules: [
      "Basic programming knowledge required",
      "Laptop with internet connection",
      "MetaMask wallet installed",
      "Node.js and npm pre-installed",
      "Attendance for full duration encouraged",
    ],
    timeline: [
      { time: "9:00 AM", event: "Introduction to Blockchain" },
      { time: "10:30 AM", event: "Smart Contract Basics" },
      { time: "12:00 PM", event: "Lunch Break" },
      { time: "1:00 PM", event: "Building Your First dApp" },
      { time: "4:00 PM", event: "Deployment & Testing" },
    ],
    organizer: "EverHack Academy",
  },
};

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = eventId ? eventsData[eventId] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (event.participants / event.maxParticipants) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-24 left-0 right-0 container-wide">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 container-wide pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {event.type}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                Upcoming
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {event.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display text-2xl font-semibold mb-4">
                  About This Event
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {event.longDescription}
                </p>
              </motion.div>

              {/* Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-display text-2xl font-semibold mb-4">
                  Rules & Requirements
                </h2>
                <ul className="space-y-3">
                  {event.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <Check
                        size={18}
                        className="text-primary mt-0.5 flex-shrink-0"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="font-display text-2xl font-semibold mb-6">
                  Event Timeline
                </h2>
                <div className="space-y-4">
                  {event.timeline.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start glass-card p-4 rounded-lg"
                    >
                      <div className="text-primary font-mono text-sm whitespace-nowrap">
                        {item.time}
                      </div>
                      <div className="w-px h-6 bg-border" />
                      <div className="text-foreground">{item.event}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl p-6 sticky top-28"
              >
                {/* Quick Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar size={18} className="text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock size={18} className="text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin size={18} className="text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Trophy size={18} className="text-secondary" />
                    <span className="font-semibold">{event.prize} in prizes</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      <Users size={14} className="inline mr-1" />
                      {event.participants.toLocaleString()} registered
                    </span>
                    <span className="text-muted-foreground">
                      {event.maxParticipants.toLocaleString()} max
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <Button variant="hero" className="w-full mb-3" asChild>
                  <Link to={`/login?signup=true&redirect=/events/${event.id}`}>
                    Register Now
                  </Link>
                </Button>
                <Button variant="glass" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" />
                    Official Website
                  </a>
                </Button>

                {/* Organizer */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Organized by
                  </p>
                  <p className="font-medium text-foreground">{event.organizer}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
