import React from 'react';
import { 
  FileText, 
  FilePlus, 
  FolderOpen, 
  Sparkles, 
  PenTool,
  TrendingUp,
  MapPin,
  Settings,
  Users,
  CalendarClock,
  Home
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

interface AdminUnifiedSidebarProps {
  currentSection: string;
}

const blogItems = [
  { title: "Tutti gli Articoli", section: "blog", icon: FileText },
  { title: "Bozze", section: "bozze", icon: FolderOpen },
  { title: "Crea con AI", section: "crea-ai", icon: Sparkles },
  { title: "Crea Manualmente", section: "crea-manuale", icon: PenTool },
  { title: "Categorie", section: "categorie", icon: FilePlus },
];

const seoItems = [
  { title: "Monitor SEO", section: "seo-monitor", icon: TrendingUp },
  { title: "SEO Locale", section: "local-seo", icon: MapPin },
];

const settingsItems = [
  { title: "Contenuti Sito", section: "contenuti", icon: Settings },
  { title: "Gestione Utenti", section: "utenti", icon: Users },
  { title: "Orari Small Group", section: "small-group", icon: CalendarClock },
];

export function AdminUnifiedSidebar({ currentSection }: AdminUnifiedSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    navigate(`/admin?section=${section}`);
  };

  const isActive = (section: string) => currentSection === section;

  const renderMenuItems = (items: typeof blogItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.section}>
          <SidebarMenuButton 
            onClick={() => handleNavigation(item.section)}
            className={isActive(item.section) 
              ? "bg-primary/10 text-primary font-medium" 
              : "hover:bg-muted/50"
            }
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span className="ml-2">{item.title}</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsible="icon"
    >
      <div className="p-3 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Admin MUV</span>
          </div>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent className="pt-2">
        {/* Blog Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Blog</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(blogItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* SEO Section */}
        <SidebarGroup>
          <SidebarGroupLabel>SEO</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(seoItems)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Impostazioni</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(settingsItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
