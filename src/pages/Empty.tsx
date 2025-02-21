import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DraftForm } from "@/components/form";
export default function Empty() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Empty Page</PageHeaderHeading>
      </PageHeader>
      <DraftForm />
    </>
  );
}
