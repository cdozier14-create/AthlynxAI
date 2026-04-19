import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/useMobile";
import {
  Activity, BarChart2, BookOpen, Bot, Briefcase, Building2, Calculator,
  ChevronDown, ChevronRight, Dumbbell, FileText, Flag, Flame, Globe,
  GraduationCap, Heart, Home, LayoutDashboard, LayoutGrid, LogOut,
  MessageCircle, MessageSquare, Mic2, Music, PanelLeft, Scale, Settings,
  Shield, ShoppingBag, Sparkles, Star, TrendingUp, Trophy, Users, Wallet, Zap
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from './DashboardLayoutSkeleton';
import { Button } from "./ui/button";

type NavItem = { icon: React.ElementType; label: string; path: string };
type NavSection = { title: string; icon: React.ElementType; items: NavItem[] };

const navSections: NavSection[] = [
  {
    title: "Home",
    icon: Home,
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Activity, label: "My Feed", path: "/feed" },
      { icon: Users, label: "Profile", path: "/profile" },
      { icon: MessageCircle, label: "Messages", path: "/messenger" },
      { icon: ShoppingBag, label: "Marketplace", path: "/nil-marketplace" },
    ],
  },
  {
    title: "Platform",
    icon: LayoutGrid,
    items: [
      { icon: Trophy, label: "Athlete Playbook", path: "/athlete-playbook" },
      { icon: BookOpen, label: "Athlete Journey", path: "/athlete-journey" },
      { icon: BarChart2, label: "Athlete Dashboard", path: "/athlete-dashboard" },
      { icon: Globe, label: "Website Builder", path: "/athlete-website-builder" },
      { icon: GraduationCap, label: "Transfer Portal", path: "/transfer-portal" },
      { icon: Calculator, label: "NIL Calculator", path: "/nil-calculator" },
      { icon: Wallet, label: "NIL Vault", path: "/nil-vault" },
      { icon: FileText, label: "NIL Portal", path: "/nil-portal" },
      { icon: Scale, label: "Legal Hub", path: "/legal-hub" },
      { icon: Shield, label: "Contracts", path: "/contracts" },
    ],
  },
  {
    title: "AI Bots",
    icon: Bot,
    items: [
      { icon: Sparkles, label: "Wizard Hub", path: "/wizard-hub" },
      { icon: Bot, label: "AI Sales Bot", path: "/ai-sales" },
      { icon: Users, label: "AI Recruiter", path: "/ai-recruiter" },
      { icon: Mic2, label: "AI Content", path: "/ai-content" },
      { icon: Dumbbell, label: "Training Bot", path: "/ai-training-bot" },
      { icon: Flame, label: "Fuel Bots", path: "/fuel-bots" },
      { icon: Zap, label: "Team Bots", path: "/team-bots" },
    ],
  },
  {
    title: "Sports",
    icon: Trophy,
    items: [
      { icon: Flag, label: "Gridiron Nexus", path: "/gridiron-nexus" },
      { icon: Star, label: "Diamond Grind", path: "/diamond-grind" },
      { icon: Trophy, label: "Court Kings", path: "/court-kings" },
      { icon: Activity, label: "Net Setters", path: "/net-setters" },
      { icon: Flag, label: "Fairway Elite", path: "/fairway-elite" },
      { icon: Activity, label: "Mat Warriors", path: "/mat-warriors" },
      { icon: Activity, label: "Swim Surge", path: "/swim-surge" },
      { icon: Activity, label: "Track Elite", path: "/track-elite" },
      { icon: Activity, label: "Reel Masters", path: "/reel-masters" },
      { icon: Activity, label: "Ice Breakers", path: "/ice-breakers" },
    ],
  },
  {
    title: "Business",
    icon: Briefcase,
    items: [
      { icon: BarChart2, label: "CRM", path: "/admin/crm" },
      { icon: BarChart2, label: "Analytics", path: "/analytics" },
      { icon: Globe, label: "Athlete Store", path: "/athlete-store" },
      { icon: Globe, label: "White-Label", path: "/white-label" },
      { icon: MessageSquare, label: "Comms Hub", path: "/comms-hub" },
      { icon: Globe, label: "Social Hub", path: "/social-hub" },
      { icon: Music, label: "Studio", path: "/studio" },
      { icon: Mic2, label: "Podcast", path: "/podcast" },
      { icon: FileText, label: "Corporate Docs", path: "/corporate-documents" },
      { icon: Heart, label: "Faith", path: "/faith" },
    ],
  },
  {
    title: "Companies",
    icon: Building2,
    items: [
      { icon: Building2, label: "Dozier Holdings", path: "/dhg" },
      { icon: Settings, label: "Softmor Inc", path: "/softmor" },
      { icon: Shield, label: "Warriors Playbook", path: "/warriors-playbook" },
      { icon: Activity, label: "Pitch Pulse", path: "/pitch-pulse" },
      { icon: Globe, label: "White Label", path: "/white-label" },
      { icon: Users, label: "Partner Portal", path: "/partner-portal" },
      { icon: TrendingUp, label: "Investor Hub", path: "/investor-hub" },
    ],
  },
  {
    title: "Admin",
    icon: Shield,
    items: [
      { icon: LayoutDashboard, label: "Admin Panel", path: "/admin" },
      { icon: Users, label: "Users", path: "/admin/users" },
      { icon: BarChart2, label: "Admin CRM", path: "/admin/crm" },
      { icon: MessageSquare, label: "Broadcast", path: "/admin/broadcast" },
      { icon: Shield, label: "Master Admin", path: "/master-admin" },
    ],
  },
];

// Flat list for active detection
const allMenuItems = navSections.flatMap(s => s.items);

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 280;
const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Sign in to continue
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Access to this dashboard requires authentication. Continue to launch the login flow.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = '/signin';
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = allMenuItems.find(item => item.path === location);
  const isMobile = useIsMobile();

  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach(section => {
      const hasActive = section.items.some(item => item.path === location);
      initial[section.title] = hasActive || section.title === "Home";
    });
    return initial;
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-accent rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
                    alt="ATHLYNX"
                    className="w-6 h-6 rounded-md object-cover shrink-0"
                  />
                  <span className="font-bold tracking-tight truncate text-sm">ATHLYNX</span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 overflow-y-auto">
            {navSections.map(section => {
              const SectionIcon = section.icon;
              const isExpanded = expandedSections[section.title];
              return (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className={`flex items-center w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-accent/40 ${isCollapsed ? "justify-center" : "justify-between"}`}
                    title={isCollapsed ? section.title : undefined}
                  >
                    {isCollapsed ? (
                      <SectionIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <SectionIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground">{section.title}</span>
                        </div>
                        {isExpanded
                          ? <ChevronDown className="h-3 w-3 text-muted-foreground" />
                          : <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        }
                      </>
                    )}
                  </button>
                  {(isExpanded || isCollapsed) && (
                    <SidebarMenu className="px-2 pb-1">
                      {section.items.map(item => {
                        const isActive = location === item.path ||
                          (item.path !== "/" && location.startsWith(item.path));
                        return (
                          <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton
                              isActive={isActive}
                              onClick={() => setLocation(item.path)}
                              tooltip={item.label}
                              className={`h-9 transition-all font-normal text-sm ${isActive ? "bg-primary/10 text-primary font-medium" : ""}`}
                            >
                              <item.icon
                                className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                              />
                              <span className="truncate">{item.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  )}
                </div>
              );
            })}
          </SidebarContent>

          <SidebarFooter className="p-3">
            <a
              href="https://dozierholdingsgroup.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-1 py-2 mb-2 rounded-lg hover:bg-accent/40 transition-colors group-data-[collapsible=icon]:justify-center"
              title="Dozier Holdings Group"
            >
              <img
                src="/logos/dhg-crab-logo.png"
                alt="Dozier Holdings Group"
                className="w-7 h-7 rounded-md object-cover shrink-0"
              />
              <span className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden truncate">
                Dozier Holdings Group
              </span>
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-accent/50 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar className="h-9 w-9 border shrink-0">
                    <AvatarFallback className="text-xs font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1.5">
                      {user?.email || "-"}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset>
        {isMobile && (
          <div className="flex border-b h-14 items-center justify-between bg-background/95 px-2 backdrop-blur supports-[backdrop-filter]:backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg bg-background" />
              <div className="flex items-center gap-3">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
                  alt="ATHLYNX"
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {activeMenuItem?.label ?? "ATHLYNX"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </>
  );
}
