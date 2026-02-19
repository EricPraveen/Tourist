import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Calendar,
    Search,
    MapPin,
    Clock,
    CreditCard,
    Users,
    ChevronRight,
    Plane,
    CheckCircle2,
    AlertCircle,
    Timer,
} from "lucide-react";
import { mockTrips } from "@/data/mockData";

const bookings = mockTrips.map((trip, index) => ({
    ...trip,
    bookingId: `BK${String(index + 1).padStart(5, "0")}`,
    bookedOn: "Jan 5, 2025",
    travelers: Math.floor(Math.random() * 3) + 1,
    paymentStatus: index === 0 ? "partial" : "paid",
    totalPaid: trip.price * (index === 0 ? 0.5 : 1),
}));

const Bookings = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPaymentBadge = (status) => {
        switch (status) {
            case "paid":
                return (
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Paid
                    </Badge>
                );
            case "partial":
                return (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        <Timer className="h-3 w-3 mr-1" />
                        Partial
                    </Badge>
                );
            default:
                return (
                    <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                    </Badge>
                );
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return <Badge className="bg-primary/10 text-primary">Confirmed</Badge>;
            case "in_progress":
                return <Badge className="bg-accent/10 text-accent">In Progress</Badge>;
            case "completed":
                return <Badge className="bg-muted text-muted-foreground">Completed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <DashboardLayout>
            {/* Page Header */}
            <section className="animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl gradient-sunset flex items-center justify-center shadow-card">
                            <Calendar className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">Bookings</h1>
                            <p className="text-muted-foreground">
                                View and manage your travel bookings
                            </p>
                        </div>
                    </div>
                    <Button className="gradient-ocean shadow-glow text-primary-foreground">
                        <Plane className="h-4 w-4 mr-2" />
                        New Booking
                    </Button>
                </div>
            </section>

            {/* Search */}
            <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by booking ID or destination..."
                        className="pl-10 bg-card"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* Bookings List */}
            <section className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {filteredBookings.map((booking) => (
                    <Card
                        key={booking.id}
                        className="group hover:shadow-card transition-all duration-300 cursor-pointer border-border/50"
                    >
                        <CardContent className="p-0">
                            <div className="flex flex-col lg:flex-row">
                                {/* Image */}
                                <div className="lg:w-48 h-32 lg:h-auto relative overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
                                    <img
                                        src={booking.image}
                                        alt={booking.destination}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-4 lg:p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="font-mono">#{booking.bookingId}</span>
                                                <span>•</span>
                                                <span>Booked on {booking.bookedOn}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {booking.packageName}
                                                </h3>
                                                <div className="flex items-center gap-1 text-muted-foreground mt-1">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{booking.destination}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>
                                                        {booking.startDate} - {booking.endDate}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>
                                                        {booking.travelers} Traveler
                                                        {booking.travelers > 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-start lg:items-end gap-3">
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(booking.status)}
                                                {getPaymentBadge(booking.paymentStatus)}
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <CreditCard className="h-4 w-4" />
                                                    <span>Total Amount</span>
                                                </div>
                                                <p className="text-xl font-bold text-primary">
                                                    ${booking.price.toLocaleString()}
                                                </p>
                                                {booking.paymentStatus === "partial" && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Paid: ${booking.totalPaid.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                            <Button
                                                variant="ghost"
                                                className="text-primary hover:bg-primary/10"
                                            >
                                                View Details
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No bookings found matching your search
                    </div>
                )}
            </section>
        </DashboardLayout>
    );
};

export default Bookings;
