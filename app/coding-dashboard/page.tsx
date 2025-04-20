import { CombinedProfile } from "@/components/profile/combined-profile";

export default function CodingDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Coding Dashboard</h1>
      <CombinedProfile />
    </div>
  );
}
