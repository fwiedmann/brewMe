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
import { RecipeFormState, saveRecipe } from "./actions";
import { useActionState, useEffect, useState } from "react";
import { phase, phaseStep } from "@/src/_lib/recipies/model";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AlertCircleIcon, Plus, Trash } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function transformPhaseStepForDisplay(step: phaseStep): string {
  return step === phaseStep.BLOOMING ? "Blooming" : "Pour Over";
}

// TODO: Add a total calculation under the table; add a validation for upper limit of proportions
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

  const [selectedPhaseType, setSelectedPhaseType] = useState(
    phaseStep.POUR_OVER.toString()
  );
  const [selectedProportion, setSelectedProportion] = useState("100");
  const [phases, setPhases] = useState([] as phase[]);

  const [state, formAction, pending] = useActionState(
    (prev: RecipeFormState, form: FormData) => {
      return saveRecipe(phases, prev, form);
    },
    {} as RecipeFormState
  );

  const addPhase = () => {
    setPhases((prev) => [
      ...prev,
      {
        proportion: Number(selectedProportion) / 100,
        step: selectedPhaseType as unknown as phaseStep,
      },
    ]);
    setSelectedPhaseType(phaseStep.POUR_OVER.toString());
    setSelectedProportion("");
  };

  useEffect(() => {
    if (!pending && state.success === true) {
      onClose(true);
    }
  }, [onClose, pending, state.success]);

  const missesPourPhase = () => {
    return (
      phases.length > 0 &&
      phases.filter((p) => p.step === phaseStep.POUR_OVER).length === 0
    );
  };

  const invalidTotalProportion = () => {
    return (
      phases.length > 0 &&
      phases.map((p) => p.proportion).reduce((prev, next) => prev + next) > 1
    );
  };

  const selectedProportionIsInvalid = () => {
    return (
      selectedProportion == "" || isNaN(selectedProportion as unknown as number)
    );
  };

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
          <div className="flex flex-row gap-4">
            <div className="flex-1 grid gap-1">
              <Label htmlFor="name">Name</Label>
              <Input name="name" defaultValue="" />
            </div>
            <div className="grid gap-1">
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
          <div className="py-5">
            <Separator />
          </div>
          <div>
            <div className="flex flex-row gap-4 pb-5">
              <div className="flex flex-col gap-1 min-w-30">
                <Label>Phase</Label>
                <Select
                  defaultValue={selectedPhaseType}
                  onValueChange={(selected) => setSelectedPhaseType(selected)}
                  value={selectedPhaseType}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={phaseStep.BLOOMING.toString()}>
                        Blooming
                      </SelectItem>
                      <SelectItem value={phaseStep.POUR_OVER.toString()}>
                        Pour Over
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 min-w-20">
                <Label>Proportion in %</Label>
                <Input
                  value={selectedProportion}
                  onChange={(e) => setSelectedProportion(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-start items-end grow">
                <Button
                  type="button"
                  variant="default"
                  onClick={addPhase}
                  disabled={selectedProportionIsInvalid()}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="pb-5">
              {phases.length === 0 ? (
                <div>
                  <p>At least one phase is required.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Step</TableCell>
                      <TableCell>Phase</TableCell>
                      <TableCell>Proportion</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phases.map((p, i) => {
                      return (
                        <TableRow key={p.step + i}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>
                            {transformPhaseStepForDisplay(p.step)}
                          </TableCell>
                          <TableCell>{`${p.proportion * 100}%`}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => {
                                setPhases(
                                  phases.filter((_, index) => index !== i)
                                );
                              }}
                            >
                              <Trash />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
              {invalidTotalProportion() || missesPourPhase() ? (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>Invalid phases</AlertTitle>
                  <AlertDescription>
                    <ul className="list-inside list-disc text-sm text-wrap">
                      {invalidTotalProportion() ? (
                        <li>
                          Your configured proportions exceeds the total of 100%
                        </li>
                      ) : (
                        <></>
                      )}
                      {missesPourPhase() ? (
                        <li>At least one Pour Over phase is required</li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-4">
            <Button
              disabled={
                pending ||
                phases.length === 0 ||
                missesPourPhase() ||
                invalidTotalProportion()
              }
              type="submit"
            >
              Create
            </Button>
            <Button
              disabled={pending}
              variant="secondary"
              onClick={() => {
                onClose(false);
              }}
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
