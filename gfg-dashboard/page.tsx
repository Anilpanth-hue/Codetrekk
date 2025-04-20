import { GfgProfile } from "@/components/profile/gfg-profile";

export default function GfgDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">
        GeeksforGeeks Dashboard
      </h1>
      <GfgProfile />
    </div>
  );
}
