import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader({ userName, showSearch = true }) {
    return (
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                {/* Left side - empty on mobile for menu button space */}
                <div className="w-12 lg:w-0" />

                {/* Search */}
                {showSearch && (
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search trips, destinations..."
                                className="pl-10 bg-secondary/50 border-transparent focus:border-primary"
                            />
                        </div>
                    </div>
                )}

                {/* Right side */}
                <div className="flex items-center gap-2">
                    {/* Mobile search */}
                    {showSearch && (
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>
                    )}

                    {/* Notifications */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                                    3
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                                <span className="font-medium">Trip Reminder</span>
                                <span className="text-sm text-muted-foreground">
                                    Your Bali trip starts in 3 days!
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                                <span className="font-medium">Payment Confirmed</span>
                                <span className="text-sm text-muted-foreground">
                                    Payment for Paris trip received
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
                                <span className="font-medium">New Recommendation</span>
                                <span className="text-sm text-muted-foreground">
                                    Check out our Swiss Alps package!
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2">
                                <div className="h-8 w-8 rounded-full gradient-ocean flex items-center justify-center">
                                    <User className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <span className="hidden sm:inline font-medium">{userName}</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Preferences</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
