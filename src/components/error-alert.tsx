import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";

export default function DestructiveAlertDemo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-100">
      <Alert variant="destructive" className="shadow-lg rounded-lg p-4">
        <div className="flex items-center gap-2">
          <OctagonAlertIcon className="h-4 w-4 text-red-600" />
          <div>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
