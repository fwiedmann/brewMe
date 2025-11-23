"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useState } from "react";
import RecipeDialog from "../recipes/RecipeDialog";
import { useRouter } from "next/navigation";

export default function QuickStartCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    router.refresh();
  }, [router]);
  return (
    <div className="">
      <RecipeDialog openDialog={dialogOpen} onClose={handleDialogClose} />
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Start creating your next great recipe or brew
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-evenly lg:justify-start lg:gap-5">
            <Button variant="outline" onClick={() => setDialogOpen(true)}>
              + New Recipe
            </Button>
            <Button variant="outline">+ New Brew</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
