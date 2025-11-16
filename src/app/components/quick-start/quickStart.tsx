import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QuickStart() {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Start creating your next great recipe or brew
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-evenly lg:justify-start lg:gap-5">
            <Button variant="outline">+ New Recipe</Button>
            <Button variant="outline">+ New Brew</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
