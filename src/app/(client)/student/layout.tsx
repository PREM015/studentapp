import BottomNavigation from "@/components/new/BottomNavigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative pb-20">
      {children}
      <BottomNavigation />
    </div>
  );
}