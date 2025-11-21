import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import recipeServiceInstance from "@/src/_lib/recipies/service";

export default async function RecentCreatedRecipesCard() {
  const rcps = await recipeServiceInstance.find({
    skip: 0,
    take: 5,
  });

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Recipes</CardTitle>
        <CardDescription>Your recent recipes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-evenly lg:justify-start lg:gap-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phases</TableHead>
                <TableHead>Ratio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rcps.recipes.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.phases.length}</TableCell>
                  <TableCell>1:{r.waterPart}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
