import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TripCard } from "@/components/dashboard/TripCard";
import { TripDetailsSheet } from "@/components/dashboard/TripDetailsSheet";
import { ReviewDialog } from "@/components/dashboard/ReviewDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Map, Plane } from "lucide-react";
import { mockTrips } from "@/data/mockData";

const MyTrips = () => {
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [targetReviewName, setTargetReviewName] = useState("");
    const [showDriverRating, setShowDriverRating] = useState(false);

    const ongoingTrips = mockTrips.filter(
        (t) => t.status === "in_progress" || t.status === "confirmed"
    );
    const completedTrips = mockTrips.filter((t) => t.status === "completed");

    const filterTrips = (trips) => {
        return trips;
    };

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

    return (
        <DashboardLayout showSearch={false}>
            {/* Page Header */}
            <section className="animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl gradient-ocean flex items-center justify-center shadow-glow">
                            <Map className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">My Trips</h1>
                            <p className="text-muted-foreground">
                                Manage and view all your travel adventures
                            </p>
                        </div>
                    </div>
                    <Link to="/">
                        <Button className="gradient-sunset shadow-card text-accent-foreground">
                            <Plane className="h-4 w-4 mr-2" />
                            Plan New Trip
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Trips Tabs */}
            <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Tabs defaultValue="ongoing" className="space-y-4">
                    <TabsList className="bg-secondary">
                        <TabsTrigger
                            value="ongoing"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            Ongoing & Upcoming ({ongoingTrips.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            Completed ({completedTrips.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            All Trips ({mockTrips.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ongoing" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filterTrips(ongoingTrips).map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip)}
                                    onReview={() => handleReviewClick(trip)}
                                    onHotelReview={() => handleHotelReviewClick(trip)}
                                />
                            ))}
                            {filterTrips(ongoingTrips).length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    No trips found matching your criteria
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="completed" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filterTrips(completedTrips).map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip)}
                                    onReview={() => handleReviewClick(trip)}
                                    onHotelReview={() => handleHotelReviewClick(trip)}
                                />
                            ))}
                            {filterTrips(completedTrips).length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    No trips found matching your criteria
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {filterTrips(mockTrips).map((trip) => (
                                <TripCard
                                    key={trip.id}
                                    trip={trip}
                                    onClick={() => handleTripClick(trip)}
                                    onReview={() => handleReviewClick(trip)}
                                    onHotelReview={() => handleHotelReviewClick(trip)}
                                />
                            ))}
                            {filterTrips(mockTrips).length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    No trips found matching your criteria
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
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
                onSuccess={() => {
                    // Success handling
                }}
            />
        </DashboardLayout>
    );
};

export default MyTrips;
