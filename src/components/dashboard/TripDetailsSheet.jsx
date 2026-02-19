import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
    MapPin,
    Calendar,
    Car,
    User,
    Star,
    Navigation,
    CreditCard,
    FileText,
    Download,
    CheckCircle2,
    Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
    confirmed: {
        label: "Confirmed",
        className: "bg-primary/10 text-primary border-primary/20",
    },
    in_progress: {
        label: "In Progress",
        className: "bg-success/10 text-success border-success/20",
    },
    completed: {
        label: "Completed",
        className: "bg-muted text-muted-foreground border-border",
    },
    cancelled: {
        label: "Cancelled",
        className: "bg-destructive/10 text-destructive border-destructive/20",
    },
};

// Mock detailed data
const mockDetails = {
    vehicle: {
        type: "SUV",
        model: "Toyota Fortuner",
        registration: "KA 01 AB 1234",
        capacity: "6 passengers",
    },
    driver: {
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        rating: 4.8,
        trips: 234,
    },
    route: {
        pickup: "Bangalore International Airport",
        destination: "Mysore Palace",
        distance: "145 km",
        duration: "3.5 hours",
    },
    schedule: {
        departure: "06:00 AM",
        arrival: "09:30 AM",
        checkIn: "10:00 AM",
        checkOut: "11:00 AM",
    },
    pricing: {
        package: 1200,
        taxes: 180,
        extras: 50,
        discount: -100,
        total: 1330,
    },
};

const milestones = [
    { label: "Booking Confirmed", completed: true, time: "Jan 5, 2025" },
    { label: "Payment Received", completed: true, time: "Jan 5, 2025" },
    { label: "Trip Started", completed: true, time: "Jan 15, 2025" },
    { label: "Destination Reached", completed: false, time: "Expected Jan 15, 2025" },
    { label: "Trip Completed", completed: false, time: "Expected Jan 20, 2025" },
];

export function TripDetailsSheet({ trip, open, onOpenChange }) {
    if (!trip) return null;

    const status = statusConfig[trip.status];

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <SheetTitle className="text-xl">{trip.destination}</SheetTitle>
                        <Badge variant="outline" className={cn("border", status.className)}>
                            {status.label}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground">{trip.packageName}</p>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Trip Image */}
                    <div className="relative h-48 rounded-xl overflow-hidden">
                        <img
                            src={trip.image}
                            alt={trip.destination}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-primary-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{trip.startDate} - {trip.endDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Status */}
                    {trip.status === "in_progress" && (
                        <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                            <h3 className="font-semibold flex items-center gap-2 text-success">
                                <Navigation className="h-5 w-5" />
                                Live Status
                            </h3>
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Trip Progress</span>
                                    <span className="font-medium">{trip.progress}%</span>
                                </div>
                                <Progress value={trip.progress} className="h-2" />
                            </div>
                            <div className="mt-4 space-y-2">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        {milestone.completed ? (
                                            <CheckCircle2 className="h-5 w-5 text-success" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-muted-foreground" />
                                        )}
                                        <div className="flex-1">
                                            <p className={cn("text-sm", milestone.completed ? "text-foreground" : "text-muted-foreground")}>
                                                {milestone.label}
                                            </p>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{milestone.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Itinerary Section */}
                    {trip.itinerary && trip.itinerary.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                Trip Itinerary
                            </h3>
                            <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/60">
                                {trip.itinerary.map((item, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shadow-sm">
                                            <span className="text-primary font-bold text-[10px]">{item.day}</span>
                                        </div>
                                        <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
                                            <h4 className="font-bold text-sm mb-1">Day {item.day}: {item.title}</h4>
                                            <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.activities?.map((activity, aIdx) => (
                                                    <Badge key={aIdx} variant="secondary" className="text-[10px] bg-background/50">
                                                        {activity}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Vehicle Information */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <Car className="h-5 w-5 text-primary" />
                            Vehicle Information
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <InfoItem label="Type" value={mockDetails.vehicle.type} />
                            <InfoItem label="Model" value={mockDetails.vehicle.model} />
                            <InfoItem label="Registration" value={mockDetails.vehicle.registration} />
                            <InfoItem label="Capacity" value={mockDetails.vehicle.capacity} />
                        </div>
                    </div>

                    <Separator />

                    {/* Driver Details */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Driver Details
                        </h3>
                        <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{mockDetails.driver.name}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Star className="h-4 w-4 fill-warning text-warning" />
                                    <span>{mockDetails.driver.rating}</span>
                                    <span>•</span>
                                    <span>{mockDetails.driver.trips} trips</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Route */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Travel Route
                        </h3>
                        <div className="p-3 rounded-lg bg-secondary/50 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Pickup</p>
                                    <p className="font-medium">Colombo Airport</p>
                                </div>
                            </div>
                            <div className="ml-1.5 border-l-2 border-dashed border-border h-6" />
                            <div className="flex items-start gap-3">
                                <div className="h-3 w-3 rounded-full bg-accent mt-1.5" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Destination</p>
                                    <p className="font-medium">{trip.destination}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                            Price Breakdown
                        </h3>
                        <div className="p-4 rounded-lg bg-secondary/50 space-y-2">
                            <PriceRow label="Package Cost" value={trip.price} />
                            <PriceRow label="Taxes & Fees" value={trip.price * 0.1} />
                            <Separator className="my-2" />
                            <div className="flex items-center justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span className="text-primary">${(trip.price * 1.1).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Documents
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {["Invoice", "Receipt", "Itinerary", "Confirmation"].map((doc) => (
                                <Button key={doc} variant="outline" size="sm" className="justify-start">
                                    <Download className="h-4 w-4 mr-2" />
                                    {doc}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}

function PriceRow({ label, value, isDiscount }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className={cn(isDiscount && "text-success")}>
                {isDiscount ? `-$${Math.abs(value)}` : `$${value}`}
            </span>
        </div>
    );
}
