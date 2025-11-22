import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { SelectGroup } from "@radix-ui/react-select";

export default function RecipeDialog(props: {
  openDialog: boolean;
  onClose: () => void;
}) {
  const ratios = () => {
    const content = [];
    for (let i = 0; i < 25; i++) {
      content.push(
        <SelectItem key={i + 1} value={`${i + 1}`}>
          1:{i + 1}
        </SelectItem>
      );
    }
    return content;
  };
  return (
    <Dialog
      open={props.openDialog}
      onOpenChange={(open) => {
        if (!open) {
          props.onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Recipe</DialogTitle>
          <DialogDescription>
            Configure your own custom recipe
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue="" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="">Ratio</Label>
              <Select defaultValue="16">
                <SelectTrigger defaultValue="16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>{ratios()}</SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
