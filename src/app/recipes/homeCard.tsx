import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function RecipeHomeCard() {
  return (
    <Card className="w-48">
      <CardHeader>
        <CardTitle>Recipes</CardTitle>
        <CardDescription>See your current recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/recipes">
          <Button variant="default">Manage recipes</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
