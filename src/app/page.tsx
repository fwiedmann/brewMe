import Header from "./components/Header";
import QuickStart from "./components/QuickStartCard";
import RecentCreatedRecipesCard from "./components/RecentCreatedRecipesCard";

export default function Home() {
  return (
    <div className="flex-1">
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 overflow-y-auto p-5">
        <QuickStart />
        <div className="row-span-2">
          <RecentCreatedRecipesCard />
        </div>
        <QuickStart />
        <QuickStart />
      </div>
    </div>
  );
}
