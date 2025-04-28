
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "@/components/ui/toaster";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-border py-4 px-4 text-center text-sm text-muted-foreground">
        <p>© 2025 ChromaCardForge. All rights reserved.</p>
      </footer>
      <Toaster />
    </div>
  );
}
