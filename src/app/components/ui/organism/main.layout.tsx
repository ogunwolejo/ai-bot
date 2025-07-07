import SideBar from "@/app/components/ui/atoms/sidebar/sidebar";

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex h-screen w-full bg-background box-border relative">
      <SideBar />
      <main className="flex-1 overflow-y-auto px-4 pt-6">{children}</main>
    </div>
  );
}
