import { useState, useRef } from "react";
import {
    Plane,
    CheckCircle,
    Calendar,
    TrendingUp,
    ChevronRight,
    ChevronLeft,
    Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TripCard } from "@/components/dashboard/TripCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { DocumentCard } from "@/components/dashboard/DocumentCard";
import { TripDetailsSheet } from "@/components/dashboard/TripDetailsSheet";
import { ReviewDialog } from "@/components/dashboard/ReviewDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    mockTrips,
    mockRecommendations,
    mockDocuments,
    mockStats,
    userName,
} from "@/data/mockData";

const Index = () => {
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [targetReviewName, setTargetReviewName] = useState("");
    const [showDriverRating, setShowDriverRating] = useState(false);
    const scrollContainerRef = useRef(null);

    const ongoingTrips = mockTrips.filter(
        (t) => t.status === "in_progress" || t.status === "confirmed"
    );
    const completedTrips = mockTrips.filter(
        (t) => t.status === "completed");

    const handleTripClick = (trip) => {
        setSelectedTrip(trip);
        setSheetOpen(true);
    };

    const handleReviewClick = (trip) => {
        setTargetReviewName(trip.destination);
        setShowDriverRating(true);
        setReviewDialogOpen(true);
    };

    const handleHotelReviewClick = (trip) => {
        if (trip.hotelName) {
            setTargetReviewName(trip.hotelName);
            setShowDriverRating(false);
            setReviewDialogOpen(true);
        }
    };

    const scrollRecommendations = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <DashboardLayout showSearch={false}>
            {/* Welcome Section */}
            <section className="animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold">
                            Welcome back, {userName.split(" ")[0]}! 👋
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Here's what's happening with your travels
                        </p>
                    </div>
                    <Link to="/">
                        <Button className="gradient-sunset shadow-card text-accent-foreground">
                            <Plane className="h-4 w-4 mr-2" />
                            Book New Trip
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <StatsCard
                    title="Ongoing Trips"
                    value={mockStats.ongoingTrips}
                    subtitle="Currently traveling"
                    icon={Plane}
                    variant="primary"
                />
                <StatsCard
                    title="Completed Trips"
                    value={mockStats.completedTrips}
                    subtitle="Memories made"
                    icon={CheckCircle}
                    trend={{ value: 25, isPositive: true }}
                />
                <StatsCard
                    title="Upcoming Bookings"
                    value={mockStats.upcomingBookings}
                    subtitle="Adventures await"
                    icon={Calendar}
                    variant="accent"
                />
                <StatsCard
                    title="Total Trips"
                    value={mockStats.totalTrips}
                    subtitle="All time"
                    icon={TrendingUp}
                />
            </section>

            {/* Trips Management  */}
            <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Tabs defaultValue="ongoing" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-secondary">
                            <TabsTrigger value="ongoing" className="data-[state=active]:bg-card data-[state=active]:shadow-soft">
                                Ongoing & Upcoming
                            </TabsTrigger>
                            <TabsTrigger value="completed" className="data-[state=active]:bg-card data-[state=active]:shadow-soft">
                                Completed
                            </TabsTrigger>
                        </TabsList>
                        <Link to="/trips">
                            <Button variant="ghost" className="text-primary">
                                View All
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>

                    <TabsContent value="ongoing" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {ongoingTrips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip)}
                                    onReview={() => handleReviewClick(trip)}
                                    onHotelReview={() => handleHotelReviewClick(trip)}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="completed" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {completedTrips.map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip)}
                                    onReview={() => handleReviewClick(trip)}
                                    onHotelReview={() => handleHotelReviewClick(trip)}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Documents Section */}
            <section className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Recent Documents</h2>
                    <Link to="/documents">
                        <Button variant="ghost" className="text-primary">
                            All Documents
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {mockDocuments.map((doc, index) => (
                        <DocumentCard
                            key={index}
                            title={doc.title}
                            type={doc.type}
                            date={doc.date}
                            size={doc.size}
                        />
                    ))}
                </div>
            </section>

            {/* Recommendations Section */}
            <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <h2 className="text-xl font-semibold">Recommended for You</h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => scrollRecommendations("left")}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => scrollRecommendations("right")}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {mockRecommendations.map((rec) => (
                        <RecommendationCard
                            key={rec.id}
                            recommendation={rec}
                        />
                    ))}
                </div>
            </section>
            <TripDetailsSheet
                trip={selectedTrip}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
            />
            <ReviewDialog
                open={reviewDialogOpen}
                onOpenChange={setReviewDialogOpen}
                targetName={targetReviewName}
                showDriverRating={showDriverRating}
                onSuccess={() => { }}
            />
        </DashboardLayout>
    );
};

export default Index;
