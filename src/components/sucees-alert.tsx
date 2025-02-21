import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBigIcon } from "lucide-react";

export default function AlertSuccessDemo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-100">
      <Alert className="border-emerald-600/50 text-emerald-600 dark:border-emerald-600 shadow-lg rounded-lg p-4">
        <div className="flex items-center gap-2">
          <CircleCheckBigIcon className="h-5 w-5 text-emerald-600" />
          <div>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
