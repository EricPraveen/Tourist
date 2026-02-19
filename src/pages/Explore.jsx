import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Compass,
    SlidersHorizontal,
    Sparkles,
    TrendingUp,
    MapPin,
    Sun,
    Mountain,
    Palmtree,
    Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { allExplorePackages } from "@/data/mockData";

const categories = [
    { id: "all", label: "All", icon: Compass },
    { id: "beach", label: "Beach", icon: Palmtree },
    { id: "mountain", label: "Mountain", icon: Mountain },
    { id: "city", label: "City", icon: Building2 },
    { id: "tropical", label: "Tropical", icon: Sun },
    { id: "wildlife", label: "Wildlife", icon: Sparkles }, // Using Sparkles as generic placeholder or maybe something else
    { id: "culture", label: "Culture", icon: MapPin },
];

const allPackages = allExplorePackages;

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDistrict, setSelectedDistrict] = useState("all");
    const [sortBy, setSortBy] = useState("rating");

    // Extract unique districts from all packages
    const districts = Array.from(
        new Set(
            allPackages.map((pkg) => {
                const parts = pkg.destination.split(",");
                return parts.length > 1 ? parts[1].trim() : pkg.destination;
            })
        )
    ).sort();

    const filteredPackages = allPackages
        .filter((pkg) => {
            const pkgDistrict = pkg.destination.split(",")[1]?.trim() || pkg.destination;

            const matchesSearch =
                pkg.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pkg.packageName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" || pkg.category === selectedCategory;
            const matchesDistrict =
                selectedDistrict === "all" || pkgDistrict === selectedDistrict;

            return matchesSearch && matchesCategory && matchesDistrict;
        })
        .sort((a, b) => {
            if (sortBy === "price-low") {
                return (
                    parseInt(a.priceRange.replace(/[^0-9]/g, "")) -
                    parseInt(b.priceRange.replace(/[^0-9]/g, ""))
                );
            }
            if (sortBy === "price-high") {
                return (
                    parseInt(b.priceRange.replace(/[^0-9]/g, "")) -
                    parseInt(a.priceRange.replace(/[^0-9]/g, ""))
                );
            }
            if (sortBy === "rating") {
                return b.rating - a.rating;
            }
            if (sortBy === "rating-low") {
                return a.rating - b.rating;
            }
            return 0;
        });

    const trendingPackages = allPackages.filter((pkg) => pkg.trending);

    return (
        <DashboardLayout>
            {/* Page Header */}
            <section className="animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl gradient-ocean flex items-center justify-center shadow-glow">
                            <Compass className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                                Explore Destinations
                            </h1>
                            <p className="text-muted-foreground">
                                Discover your next adventure
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold">Top Picks</h2>
                    <Badge className="bg-accent/10 text-accent border-accent/20">Hot</Badge>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    {trendingPackages.slice(0, 4).map((pkg) => (
                        <div key={pkg.id} className="min-w-[280px]">
                            <RecommendationCard recommendation={pkg} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Filters & Sorting */}
            <section className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/50 p-3 rounded-2xl border border-border/50 backdrop-blur-sm">
                    {/* Category Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "ghost"}
                                className={cn(
                                    "h-10 px-4 rounded-xl transition-all flex-shrink-0",
                                    selectedCategory === category.id
                                        ? "gradient-ocean text-primary-foreground shadow-glow"
                                        : "hover:bg-accent/10"
                                )}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <category.icon className="h-4 w-4 mr-2" />
                                {category.label}
                            </Button>
                        ))}
                    </div>

                    {/* District & Sort Dropdowns */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pl-2 lg:border-l border-border/50 min-w-fit">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap hidden sm:inline">District:</span>
                            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                                <SelectTrigger className="w-full sm:w-[160px] bg-background/50 border-border/50 rounded-xl h-10">
                                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                                    <SelectValue placeholder="All Districts" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    <SelectItem value="all">All Districts</SelectItem>
                                    {districts.map((district) => (
                                        <SelectItem key={district} value={district}>
                                            {district}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap hidden sm:inline">Sort by:</span>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/50 rounded-xl h-10">
                                    <SlidersHorizontal className="h-4 w-4 mr-2 text-primary" />
                                    <SelectValue placeholder="Sort by Rating" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-border/50">
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="rating-low">Lowest Rating</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Packages */}
            <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">All Packages</h2>
                    <Badge variant="secondary">{filteredPackages.length} available</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredPackages.map((pkg) => (
                        <RecommendationCard key={pkg.id} recommendation={pkg} className="w-full" />
                    ))}
                    {filteredPackages.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No packages found matching your criteria</p>
                        </div>
                    )}
                </div>
            </section>
        </DashboardLayout>
    );
};

export default Explore;
