import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { mockHotels } from "@/data/mockData";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    MapPin,
    Star,
    Wifi,
    Utensils,
    Waves,
    Car,
    Coffee,
    CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeImage, setActiveImage] = useState(0);
    const [reviewFilter, setReviewFilter] = useState("all");

    // Check if we're in selection mode
    const isSelectionMode = searchParams.get("mode") === "select";
    const preferenceNumber = searchParams.get("preference");
    const returnTo = searchParams.get("returnTo");

    const hotel = mockHotels.find((h) => h.id === id);

    const handleSelectHotel = () => {
        if (isSelectionMode && returnTo && preferenceNumber && id) {
            navigate(`${decodeURIComponent(returnTo)}?selectedHotel=${id}&preference=${preferenceNumber}`);
        }
    };

    if (!hotel) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <h2 className="text-2xl font-bold mb-2">Hotel Not Found</h2>
                    <p className="text-muted-foreground mb-4">
                        The hotel you are looking for does not exist.
                    </p>
                    <Button onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    const images = hotel.images && hotel.images.length > 0 ? hotel.images : [hotel.image];

    // Helper to get icon for amenity
    const getAmenityIcon = (amenity) => {
        const lower = amenity.toLowerCase();
        if (lower.includes("wifi")) return <Wifi className="h-4 w-4" />;
        if (lower.includes("food") || lower.includes("dining") || lower.includes("restaurant") || lower.includes("breakfast")) return <Utensils className="h-4 w-4" />;
        if (lower.includes("pool") || lower.includes("spa")) return <Waves className="h-4 w-4" />;
        if (lower.includes("parking") || lower.includes("car")) return <Car className="h-4 w-4" />;
        if (lower.includes("coffee") || lower.includes("tea")) return <Coffee className="h-4 w-4" />;
        return <CheckCircle2 className="h-4 w-4" />;
    };

    return (
        <DashboardLayout>
            <div className="animate-slide-up space-y-8 max-w-6xl mx-auto pb-10">
                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="pl-0 hover:bg-transparent hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
                    </Button>
                    {isSelectionMode && (
                        <Badge variant="outline" className="border-primary text-primary">
                            Selecting for Preference {preferenceNumber}
                        </Badge>
                    )}
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                                {hotel.destination}
                            </Badge>
                            <div className="flex items-center text-sm text-yellow-500">
                                <Star className="h-4 w-4 fill-current mr-1" />
                                <span className="font-bold mr-1">{hotel.rating}</span>
                                <span className="text-muted-foreground">({hotel.reviewCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                            {hotel.packageName}
                        </h1>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1 text-primary" />
                            <span>{hotel.location}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex flex-col items-end">
                            <span className="text-sm text-muted-foreground">Starting from</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary">{hotel.priceRange?.split("-")[0]}</span>
                                <span className="text-sm text-muted-foreground">/ night</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px] lg:h-[500px]">
                    <div className="lg:col-span-2 h-full relative group rounded-2xl overflow-hidden shadow-lg border border-border">
                        <img
                            src={images[activeImage]}
                            alt={hotel.packageName}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    <div className="hidden lg:grid grid-rows-2 gap-4 h-full">
                        {images.slice(1, 3).map((img, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "rounded-2xl overflow-hidden cursor-pointer shadow-md relative group border border-border",
                                    activeImage === idx + 1 ? "ring-2 ring-primary" : ""
                                )}
                                onClick={() => setActiveImage(idx + 1)}
                            >
                                <img
                                    src={img}
                                    alt={`${hotel.packageName} ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className={cn("absolute inset-0 bg-black/20 transition-opacity hover:bg-transparent", activeImage === idx + 1 ? "bg-transparent" : "")} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Description */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">About this Hotel</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {hotel.description}
                            </p>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Popular Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-6">
                                {hotel.amenities?.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            {getAmenityIcon(amenity)}
                                        </div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Room Types */}
                        <section>
                            <h2 className="text-xl font-semibold mb-6">Room Types</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hotel.roomTypes?.map((room) => (
                                    <div key={room.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="flex flex-col">
                                            <div className="h-48 relative">
                                                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-6 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-semibold">{room.name}</h3>
                                                        <p className="font-bold text-lg text-primary">${room.price}</p>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {room.amenities.map((am, i) => (
                                                            <Badge key={i} variant="secondary" className="text-xs font-normal">
                                                                {am}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <h2 className="text-xl font-semibold">Guest Reviews</h2>
                                <div className="flex items-center text-sm text-yellow-500">
                                    <Star className="h-4 w-4 fill-current mr-1" />
                                    <span className="font-bold mr-1">{hotel.rating}</span>
                                    <span className="text-muted-foreground">({hotel.reviewCount} total reviews)</span>
                                </div>
                            </div>

                            {/* Review Filters */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {["all", 5, 4, 3, 2, 1].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => setReviewFilter(rating)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                                            reviewFilter === rating
                                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                                : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                                        )}
                                    >
                                        {rating === "all" ? "All Reviews" : `${rating} ★`}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hotel.reviews && hotel.reviews.length > 0 ? (
                                    hotel.reviews
                                        .filter(review => reviewFilter === "all" || review.rating === reviewFilter)
                                        .map((review) => (
                                            <div key={review.id} className="bg-card border border-border rounded-xl p-6 transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full gradient-ocean flex items-center justify-center text-white font-bold text-xs">
                                                            {review.userName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-sm">{review.userName}</p>
                                                            <p className="text-xs text-muted-foreground">{review.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={cn(
                                                                    "h-3 w-3",
                                                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground italic">"{review.comment}"</p>
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-span-full bg-muted/20 rounded-xl p-8 border border-dashed text-center">
                                        <p className="text-muted-foreground">No reviews available yet.</p>
                                    </div>
                                )}
                                {hotel.reviews && hotel.reviews.length > 0 && hotel.reviews.filter(review => reviewFilter === "all" || review.rating === reviewFilter).length === 0 && (
                                    <div className="col-span-full bg-muted/20 rounded-xl p-8 border border-dashed text-center">
                                        <p className="text-muted-foreground">No reviews found for this rating.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HotelDetails;
