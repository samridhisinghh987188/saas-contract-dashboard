"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Loader2, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setIsLoggingOut(false)
      setIsDropdownOpen(false)
    }
  }

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-10 w-10 rounded-full hover:bg-accent"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">Contract Manager</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent"
                onClick={() => router.push('/dashboard/settings')}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile & Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-accent"
                onClick={() => router.push('/dashboard/settings/notifications')}
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
                <Badge variant="outline" className="ml-auto">3</Badge>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive hover:bg-destructive/10 focus:text-destructive"
                onClick={handleLogout} 
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
