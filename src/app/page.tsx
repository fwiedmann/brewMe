import RecipeHomeCard from "./recipes/homeCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="pt-5">
        <h1 className="text-2xl">Hey Felix, welcome back 👋</h1>
      </div>
      <div className="flex flex-col lg:flex-row  flex-wrap gap-5">
        <RecipeHomeCard></RecipeHomeCard>
        <RecipeHomeCard></RecipeHomeCard>
      </div>
    </div>
  );
}
