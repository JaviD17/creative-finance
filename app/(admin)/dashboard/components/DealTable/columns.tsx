import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRightFromSquare } from "lucide-react";

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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<Doc<"deals">>[] = [
  {
    accessorKey: "_id",
    header: "Id",
    cell: ({ row }) => {
      const id: Id<"deals"> = row.getValue("_id");

      return (
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="flex flex-row justify-between group hover:cursor-pointer border border-transparent hover:border-black-950 rounded-sm transition px-3 py-1.5 hover:bg-black-300 lg:active:scale-95">
              <p className="">{id}</p>
              <ArrowUpRightFromSquare
                className="invisible group-hover:visible"
                size={20}
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
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
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amountNeeded"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "flatRate",
    header: "Return ($)",
    cell: ({ row }) => {
      const flatRate = parseFloat(row.getValue("flatRate"));
      const formatted = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(flatRate);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "returnRate",
    header: "Return (%)",
    cell: ({ row }) => {
      const returnRate = parseFloat(row.getValue("returnRate"));
      const formatted = new Intl.NumberFormat("en-us", {
        style: "percent",
      }).format(returnRate);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "time",
    header: "Time (m)",
  },
];
