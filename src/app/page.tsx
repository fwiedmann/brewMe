import QuickStart from "./components/quick-start/quickStart";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row justify-items-center sticky top-0 z-50 bg-background p-5 shadow">
        <h1 className="text-2xl">BrewMe ☕</h1>
      </div>
      <div className="flex-1">
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 overflow-y-auto p-5">
          <QuickStart />
          <QuickStart />
          <QuickStart />
        </div>
      </div>
      <div className="py-5 px-5">
        <p>footer</p>
      </div>
    </div>
  );
}
