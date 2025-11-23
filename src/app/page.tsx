import QuickStart from "./components/QuickStartCard";
import RecipesRecentCreatedCard from "./recipes/RecipesRecentCreatedCard";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 overflow-y-auto p-5">
        <QuickStart />
        <div className="row-span-2">
          <RecipesRecentCreatedCard />
        </div>
        <QuickStart />
        <QuickStart />
      </div>
    </div>
  );
}
