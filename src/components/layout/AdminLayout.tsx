"use client";

import { Toaster } from "react-hot-toast";
import { AuthGuard } from "../admin/AuthGuard";
import { Sidebar } from "@/components/admin/Sidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="h-screen bg-gray-50">
        <Sidebar />
        <div className="md:pl-64">
          <main className="py-5">{children}</main>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              padding: "16px",
              borderRadius: "8px",
            },
            success: {
              iconTheme: {
                primary: "#4CAF50",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#f44336",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </AuthGuard>
  );
}
