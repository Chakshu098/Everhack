import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Calendar,
  Settings,
  LogOut,
  User,
  Trophy,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  full_name: string | null;
  email: string;
}

interface Registration {
  id: string;
  event_id: string;
  status: string;
  events: {
    id: string;
    title: string;
    event_type: string;
    start_date: string;
    image_url: string | null;
  };
}

export default function Dashboard() {
  const { user, isLoading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    } else if (!isLoading && isAdmin) {
      navigate("/admin");
    }
  }, [user, isLoading, isAdmin, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchRegistrations();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("user_id", user!.id)
      .maybeSingle();
    if (data) setProfile(data);
  };

  const fetchRegistrations = async () => {
    const { data } = await supabase
      .from("event_registrations")
      .select(`
        id,
        event_id,
        status,
        events (
          id,
          title,
          event_type,
          start_date,
          image_url
        )
      `)
      .eq("user_id", user!.id);
    if (data) setRegistrations(data as unknown as Registration[]);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || "U";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const achievements = [
    { icon: Trophy, label: "Events Registered", value: registrations.length.toString() },
    { icon: Clock, label: "Hours Hacked", value: "0" },
    { icon: Calendar, label: "Member Since", value: new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 border-b border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {getInitials()}
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">
                  Welcome back, {profile?.full_name?.split(" ")[0] || "User"}
                </h1>
                <p className="text-muted-foreground">{profile?.email || user.email}</p>
              </div>
            </motion.div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Settings size={16} className="mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Registered Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">
                    Your Registered Events
                  </h2>
                  <Link
                    to="/events"
                    className="text-primary text-sm hover:underline flex items-center gap-1"
                  >
                    Browse Events <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {registrations.map((reg) => (
                    <Link
                      key={reg.id}
                      to={`/events/${reg.events.id}`}
                      className="group flex gap-4 glass-card rounded-xl p-4 hover-lift"
                    >
                      <div className="w-24 h-24 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                        {reg.events.image_url ? (
                          <img
                            src={reg.events.image_url}
                            alt={reg.events.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Calendar size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium capitalize">
                            {reg.events.event_type}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs font-medium capitalize">
                            {reg.status}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors truncate">
                          {reg.events.title}
                        </h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1">
                          <Calendar size={14} />
                          {new Date(reg.events.start_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <ChevronRight
                          size={20}
                          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </Link>
                  ))}
                </div>

                {registrations.length === 0 && (
                  <div className="glass-card rounded-xl p-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any events yet.
                    </p>
                    <Button asChild>
                      <Link to="/events">Explore Events</Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto mb-4">
                    {getInitials()}
                  </div>
                  <h3 className="font-display font-semibold text-lg">
                    {profile?.full_name || "User"}
                  </h3>
                  <p className="text-muted-foreground text-sm">Developer</p>
                </div>

                <div className="space-y-4">
                  {achievements.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className="text-primary" />
                        <span className="text-muted-foreground text-sm">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  <User size={16} className="mr-2" />
                  Edit Profile
                </Button>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="glass" className="w-full justify-start" asChild>
                    <Link to="/events">
                      <Calendar size={16} className="mr-2" />
                      Browse Events
                    </Link>
                  </Button>
                  <Button variant="glass" className="w-full justify-start" asChild>
                    <Link to="/events?type=hackathon">
                      <Trophy size={16} className="mr-2" />
                      Join Hackathon
                    </Link>
                  </Button>
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
