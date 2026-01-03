import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Users,
  Trophy,
  LogOut,
  Shield,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EventFormDialog } from "@/components/admin/EventFormDialog";
import { DeleteEventDialog } from "@/components/admin/DeleteEventDialog";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  image_url: string | null;
  start_date: string;
  end_date: string;
  location: string | null;
  is_online: boolean | null;
  max_participants: number | null;
  prize_pool: string | null;
  difficulty: string | null;
  status: string;
  rules: string | null;
  timeline: unknown;
  created_at: string;
}

export default function AdminDashboard() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchEvents();
    }
  }, [user, isAdmin]);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } else {
      setEvents(data || []);
    }
    setLoadingEvents(false);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDeleteOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </motion.div>
            <div className="flex gap-3">
              <Button variant="hero" onClick={handleCreateEvent}>
                <Plus size={16} className="mr-2" />
                Create Event
              </Button>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border bg-card/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{events.length}</p>
                  <p className="text-muted-foreground text-sm">Total Events</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">
                    {events.filter((e) => e.event_type === "hackathon").length}
                  </p>
                  <p className="text-muted-foreground text-sm">Hackathons</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">
                    {events.filter((e) => e.event_type === "ctf").length}
                  </p>
                  <p className="text-muted-foreground text-sm">CTFs</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">
                    {events.filter((e) => e.event_type === "workshop").length}
                  </p>
                  <p className="text-muted-foreground text-sm">Workshops</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Table */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-xl font-semibold mb-6">
              Manage Events
            </h2>

            {loadingEvents ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : events.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No events created yet.
                </p>
                <Button variant="hero" onClick={handleCreateEvent}>
                  <Plus size={16} className="mr-2" />
                  Create Your First Event
                </Button>
              </div>
            ) : (
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Event
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {events.map((event) => (
                        <tr
                          key={event.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {event.image_url && (
                                <img
                                  src={event.image_url}
                                  alt={event.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-muted-foreground text-sm line-clamp-1">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                event.event_type === "hackathon"
                                  ? "bg-secondary/20 text-secondary"
                                  : event.event_type === "ctf"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {event.event_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(event.start_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                                event.status === "upcoming"
                                  ? "bg-primary/20 text-primary"
                                  : event.status === "ongoing"
                                  ? "bg-green-500/20 text-green-500"
                                  : event.status === "completed"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-destructive/20 text-destructive"
                              }`}
                            >
                              {event.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditEvent(event)}
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteClick(event)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />

      <EventFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        event={selectedEvent}
        onSuccess={fetchEvents}
      />

      <DeleteEventDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        event={selectedEvent}
        onSuccess={fetchEvents}
      />
    </div>
  );
}
