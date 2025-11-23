import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { RecipeFormState, saveRecipe } from "./action";
import { useActionState, useEffect } from "react";

export default function RecipeDialog(props: {
  openDialog: boolean;
  onClose: (created: boolean) => void;
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

  const { openDialog, onClose } = props;
  const [state, formAction, pending] = useActionState(
    saveRecipe,
    {} as RecipeFormState
  );

  useEffect(() => {
    if (!pending && state.success === true) {
      onClose(true);
    }
  }, [onClose, pending, state.success]);

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        if (!open) {
          onClose(false);
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
        <form action={formAction}>
          <div className="grid gap-4 pb-5">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input name="name" defaultValue="" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="">Ratio</Label>
              <Select name="waterPart" defaultValue="16">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>{ratios()}</SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-4">
            <Button disabled={pending} type="submit">
              Create
            </Button>
            <Button
              disabled={pending}
              variant="secondary"
              onClick={() => onClose(false)}
              type="button"
            >
              Abort
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
