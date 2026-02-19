import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DocumentCard } from "@/components/dashboard/DocumentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileText,
    FolderOpen,
    Receipt,
    FileCheck,
    MapPinned,
} from "lucide-react";

const allDocuments = [
    {
        title: "Bali Trip Invoice",
        type: "invoice",
        date: "Jan 5, 2025",
        size: "245 KB",
        tripName: "Bali, Indonesia",
    },
    {
        title: "Payment Receipt #45892",
        type: "receipt",
        date: "Jan 5, 2025",
        size: "128 KB",
        tripName: "Bali, Indonesia",
    },
    {
        title: "Travel Itinerary - Bali",
        type: "itinerary",
        date: "Jan 10, 2025",
        size: "1.2 MB",
        tripName: "Bali, Indonesia",
    },
    {
        title: "Booking Confirmation",
        type: "confirmation",
        date: "Jan 5, 2025",
        size: "98 KB",
        tripName: "Bali, Indonesia",
    },
    {
        title: "Paris Trip Invoice",
        type: "invoice",
        date: "Feb 1, 2025",
        size: "312 KB",
        tripName: "Paris, France",
    },
    {
        title: "Payment Receipt #45910",
        type: "receipt",
        date: "Feb 1, 2025",
        size: "145 KB",
        tripName: "Paris, France",
    },
    {
        title: "Travel Itinerary - Paris",
        type: "itinerary",
        date: "Feb 3, 2025",
        size: "2.1 MB",
        tripName: "Paris, France",
    },
    {
        title: "Tokyo Booking Confirmation",
        type: "confirmation",
        date: "Nov 25, 2024",
        size: "112 KB",
        tripName: "Tokyo, Japan",
    },
    {
        title: "Tokyo Invoice",
        type: "invoice",
        date: "Nov 20, 2024",
        size: "287 KB",
        tripName: "Tokyo, Japan",
    },
    {
        title: "Santorini Itinerary",
        type: "itinerary",
        date: "Nov 10, 2024",
        size: "1.8 MB",
        tripName: "Santorini, Greece",
    },
];

const Documents = () => {
    const filterDocuments = (docs, type) => {
        return docs.filter((doc) => {
            const matchesTab = !type || doc.type === type;
            return matchesTab;
        });
    };

    const invoices = allDocuments.filter((d) => d.type === "invoice");
    const receipts = allDocuments.filter((d) => d.type === "receipt");
    const itineraries = allDocuments.filter((d) => d.type === "itinerary");
    const confirmations = allDocuments.filter((d) => d.type === "confirmation");

    return (
        <DashboardLayout showSearch={false}>
            {/* Page Header */}
            <section className="animate-slide-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                            <FileText className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">Documents</h1>
                            <p className="text-muted-foreground">
                                Access all your travel documents in one place
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <section
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
            >
                <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{invoices.length}</p>
                        <p className="text-sm text-muted-foreground">Invoices</p>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <FileCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{receipts.length}</p>
                        <p className="text-sm text-muted-foreground">Receipts</p>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <MapPinned className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{itineraries.length}</p>
                        <p className="text-sm text-muted-foreground">Itineraries</p>
                    </div>
                </div>
                <div className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <FolderOpen className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{allDocuments.length}</p>
                        <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                </div>
            </section>

            {/* Documents Tabs */}
            <section className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="bg-secondary">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            All ({allDocuments.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="invoices"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            Invoices ({invoices.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="receipts"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            Receipts ({receipts.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="itineraries"
                            className="data-[state=active]:bg-card data-[state=active]:shadow-soft"
                        >
                            Itineraries ({itineraries.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {filterDocuments(allDocuments).map((doc, index) => (
                                <DocumentCard
                                    key={index}
                                    title={doc.title}
                                    type={doc.type}
                                    date={doc.date}
                                    size={doc.size}
                                />
                            ))}
                            {filterDocuments(allDocuments).length === 0 && (
                                <div className="col-span-full text-center py-12 text-muted-foreground">
                                    No documents found
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="invoices" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {filterDocuments(invoices).map((doc, index) => (
                                <DocumentCard
                                    key={index}
                                    title={doc.title}
                                    type={doc.type}
                                    date={doc.date}
                                    size={doc.size}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="receipts" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {filterDocuments(receipts).map((doc, index) => (
                                <DocumentCard
                                    key={index}
                                    title={doc.title}
                                    type={doc.type}
                                    date={doc.date}
                                    size={doc.size}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="itineraries" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {filterDocuments(itineraries).map((doc, index) => (
                                <DocumentCard
                                    key={index}
                                    title={doc.title}
                                    type={doc.type}
                                    date={doc.date}
                                    size={doc.size}
                                />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>
        </DashboardLayout>
    );
};

export default Documents;
