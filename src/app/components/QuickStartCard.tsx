"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import RecipeDialog from "./RecipeDialog";

export default function QuickStartCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="">
      <RecipeDialog
        openDialog={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
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
