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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
