import { Doc } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";

// const deals: {
//   _id: Id<"deals">;
//   _creationTime: number;
//   userId: Id<"users">;
//   fullName: string;
//   emailAddress: string;
//   title: string;
//   description: string;
//   terms: string;
//   time: number;
//   amountNeeded: number;
//   returnRate: number;
//   flatRate: number;
//   status: "open" | ... 1 more ... | "completed";
// }[] | undefined

export const columns: ColumnDef<Doc<"deals">>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: "Type",
  },
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "amountNeeded",
    header: "Amount",
  },
  {
    accessorKey: "flatRate",
    header: "Return ($)",
  },
  {
    accessorKey: "returnRate",
    header: "Return (%)",
  },
  {
    accessorKey: "time",
    header: "Time (m)",
  },
];
