import { Doc, Id } from "@/convex/_generated/dataModel";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const DealTable = ({ deals }: { deals: Doc<"deals">[] }) => {
  return <DataTable columns={columns} data={deals} />;
};

export default DealTable;
