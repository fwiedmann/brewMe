import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Recipes() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="pt-5 flex flex-row">
        <Link href="/">
          <Button size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
        </Link>
        <h1 className="text-2xl">Recipes</h1>
      </div>
      <div className="flex flex-col lg:flex-row  flex-wrap gap-5"></div>
    </div>
  );
}
