"use client"

import {
  BarChart3,
  Package,
  Palette,
  AlertTriangle,
  Users,
  Calendar,
  Scissors,
  ShoppingCart,
  Truck,
  Home,
  Settings,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Cadastros",
    icon: Settings,
    items: [
      {
        title: "Produtos",
        url: "/cadastros/produtos",
        icon: Package,
      },
      {
        title: "Tipos de Estampa",
        url: "/cadastros/tipos-estampa",
        icon: Palette,
      },
      {
        title: "Tipos de Falhas",
        url: "/cadastros/tipos-falhas",
        icon: AlertTriangle,
      },
      {
        title: "Usuários",
        url: "/cadastros/usuarios",
        icon: Users,
      },
    ],
  },
  {
    title: "Lançamentos",
    icon: Calendar,
    items: [
      {
        title: "Impressões",
        url: "/lancamentos/impressoes",
        icon: Palette,
      },
      {
        title: "Falhas de Estampa",
        url: "/lancamentos/falhas-estampa",
        icon: AlertTriangle,
      },
      {
        title: "Falhas de Costura",
        url: "/lancamentos/falhas-costura",
        icon: Scissors,
      },
      {
        title: "Costuras",
        url: "/lancamentos/costuras",
        icon: Scissors,
      },
      {
        title: "Vendas",
        url: "/lancamentos/vendas",
        icon: ShoppingCart,
      },
      {
        title: "Envios",
        url: "/lancamentos/envios",
        icon: Truck,
      },
    ],
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader>
        <div
          className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors"
          onClick={toggleSidebar}
          title="Clique para expandir/minimizar"
        >
          <Package className="h-6 w-6 flex-shrink-0" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Controle de Produção</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
