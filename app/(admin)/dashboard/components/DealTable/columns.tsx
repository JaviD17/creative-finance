import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRightFromSquare, Copy, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";

// const deals: {
//   _id: Id<"deals">;
//   _creationTime: number;
//   userId: Id<"users">;
//   fullName: string;
//   emailAddress: string;
//   type: string;
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Doc<"deals">>[] = [
  {
    accessorKey: "_id",
    header: "Id",
    cell: ({ row }) => {
      const id: Id<"deals"> = row.getValue("_id");
      const data = row.original;

      const formattedTime = format(new Date(data._creationTime), "MM/dd/yyyy");

      const amountNeeded = data.amountNeeded;
      const formattedAmount = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(amountNeeded);

      const flatRate = data.flatRate;
      const formattedFlatRate = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(flatRate);

      const returnRate = data.returnRate;
      const formattedReturnRate = new Intl.NumberFormat("en-us", {
        style: "percent",
      }).format(returnRate);

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
          <DialogContent className="w-[95.8%] h-[475px] rounded-sm shadow-2xl shadow-black-950 border border-black-950">
            <ScrollArea>
              <DialogHeader>
                <DialogTitle className="w-full">
                  <div className="font-extrabold text-center uppercase tracking-widest">
                    Deal View
                  </div>
                </DialogTitle>
                <DialogDescription className="space-y-3">
                  <div className="flex items-center gap-x-1.5">
                    <p>Id:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${id}`);
                        navigator.clipboard.writeText(id);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {id}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Status: </p>
                    <p className="text-left uppercase border border-transparent px-3 py-1.5 rounded-sm">
                      {data.status}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Type: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.type}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Created On:</p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedTime}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Amount: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedAmount}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Time: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.time} months
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Flat Rate: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedFlatRate}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Return Rate: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedReturnRate}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Terms:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${data.terms}`);
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between lg:active:scale-95"
                    >
                      {data.terms}
                      <div className="grow">
                        <Copy
                          size={20}
                          className="invisible group-hover:visible"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Description:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${data.description}`);
                        navigator.clipboard.writeText(data.description);
                      }}
                      className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between items-start gap-x-3 lg:active:scale-95"
                    >
                      {data.description}
                      <div className="grow">
                        <Copy
                          size={20}
                          className="invisible group-hover:visible"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>User Id: </p>
                    <div
                      onClick={() => {
                        toast.success("copied");
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {data.userId}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Name: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.fullName}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Email: </p>
                    <div
                      onClick={() => {
                        toast.success("copied");
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {data.emailAddress}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return <div className="uppercase">{status}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
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
    accessorKey: "time",
    header: "Time (m)",
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
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id: Id<"deals"> = row.getValue("_id");
      const data = row.original;

      const formattedTime = format(new Date(data._creationTime), "MM/dd/yyyy");

      const amountNeeded = data.amountNeeded;
      const formattedAmount = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(amountNeeded);

      const flatRate = data.flatRate;
      const formattedFlatRate = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(flatRate);

      const returnRate = data.returnRate;
      const formattedReturnRate = new Intl.NumberFormat("en-us", {
        style: "percent",
      }).format(returnRate);

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:bg-black-300 hover:border hover:border-black-950 transition"
            >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border border-black-950 shadow-2xl shadow-black-950"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toast.success(`Copied ${data._id}`);
                  navigator.clipboard.writeText(data._id);
                }}
                className="cursor-pointer"
              >
                Copy deal ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Edit deal
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem className="cursor-pointer">
                View payment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="w-[95.8%] h-[475px] rounded-sm shadow-2xl shadow-black-950 border border-black-950">
            <ScrollArea>
              <DialogHeader>
                <DialogTitle className="w-full">
                  <div className="font-extrabold text-center uppercase tracking-widest">
                    Deal View
                  </div>
                </DialogTitle>
                <DialogDescription className="space-y-3">
                  <div className="flex items-center gap-x-1.5">
                    <p>Id:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${id}`);
                        navigator.clipboard.writeText(id);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {id}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Status: </p>
                    <p className="text-left uppercase border border-transparent px-3 py-1.5 rounded-sm">
                      {data.status}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Type: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.type}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Created On:</p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedTime}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Amount: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedAmount}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Time: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.time} months
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Flat Rate: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedFlatRate}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Return Rate: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {formattedReturnRate}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Terms:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${data.terms}`);
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between lg:active:scale-95"
                    >
                      {data.terms}
                      <div className="grow">
                        <Copy
                          size={20}
                          className="invisible group-hover:visible"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Description:</p>
                    <div
                      onClick={() => {
                        toast.success(`Copied ${data.description}`);
                        navigator.clipboard.writeText(data.description);
                      }}
                      className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between items-start gap-x-3 lg:active:scale-95"
                    >
                      {data.description}
                      <div className="grow">
                        <Copy
                          size={20}
                          className="invisible group-hover:visible"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>User Id: </p>
                    <div
                      onClick={() => {
                        toast.success("copied");
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {data.userId}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Name: </p>
                    <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
                      {data.fullName}
                    </p>
                  </div>
                  <div className="flex gap-x-1.5 items-center">
                    <p>Email: </p>
                    <div
                      onClick={() => {
                        toast.success("copied");
                        navigator.clipboard.writeText(data.terms);
                      }}
                      className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
                    >
                      {data.emailAddress}
                      <Copy
                        size={20}
                        className="invisible group-hover:visible"
                      />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </ScrollArea>
            <DialogFooter>
              <div className="w-full cursor-pointer text-center border border-transparent hover:shadow-2xl hover:shadow-black-950 hover:border-black-950 rounded-sm hover:bg-black-300 py-1.5 transition active:scale-95">
                Save changes
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

{
  /* <Dialog>
<DialogTrigger className="w-full">
  <div className="flex flex-row justify-between group hover:cursor-pointer border border-transparent hover:border-black-950 rounded-sm transition px-3 py-1.5 hover:bg-black-300 lg:active:scale-95">
    <p className="">{id}</p>
    <ArrowUpRightFromSquare
      className="invisible group-hover:visible"
      size={20}
    />
  </div>
</DialogTrigger>
<DialogContent className="w-[95.8%] h-[475px] rounded-sm shadow-2xl shadow-black-950 border border-black-950">
  <ScrollArea>
    <DialogHeader>
      <DialogTitle className="w-full">
        <div className="font-extrabold text-center uppercase tracking-widest">
          Deal View
        </div>
      </DialogTitle>
      <DialogDescription className="space-y-3">
        <div className="flex items-center gap-x-1.5">
          <p>Id:</p>
          <div
            onClick={() => {
              toast.success(`Copied ${id}`);
              navigator.clipboard.writeText(id);
            }}
            className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
          >
            {id}
            <Copy
              size={20}
              className="invisible group-hover:visible"
            />
          </div>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Status: </p>
          <p className="text-left uppercase border border-transparent px-3 py-1.5 rounded-sm">
            {data.status}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Type: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {data.type}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Created On:</p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {formattedTime}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Amount: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {formattedAmount}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Time: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {data.time} months
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Flat Rate: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {formattedFlatRate}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Return Rate: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {formattedReturnRate}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Terms:</p>
          <div
            onClick={() => {
              toast.success(`Copied ${data.terms}`);
              navigator.clipboard.writeText(data.terms);
            }}
            className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between lg:active:scale-95"
          >
            {data.terms}
            <div className="grow">
              <Copy
                size={20}
                className="invisible group-hover:visible"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Description:</p>
          <div
            onClick={() => {
              toast.success(`Copied ${data.description}`);
              navigator.clipboard.writeText(data.description);
            }}
            className="text-left group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between items-start gap-x-3 lg:active:scale-95"
          >
            {data.description}
            <div className="grow">
              <Copy
                size={20}
                className="invisible group-hover:visible"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>User Id: </p>
          <div
            onClick={() => {
              toast.success("copied");
              navigator.clipboard.writeText(data.terms);
            }}
            className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
          >
            {data.userId}
            <Copy
              size={20}
              className="invisible group-hover:visible"
            />
          </div>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Name: </p>
          <p className="text-left border border-transparent px-3 py-1.5 rounded-sm">
            {data.fullName}
          </p>
        </div>
        <div className="flex gap-x-1.5 items-center">
          <p>Email: </p>
          <div
            onClick={() => {
              toast.success("copied");
              navigator.clipboard.writeText(data.terms);
            }}
            className="group border border-transparent hover:text-black-950 hover:bg-black-300 hover:cursor-pointer hover:border-black-950 px-3 py-1.5 rounded-sm transition flex justify-between gap-x-3 lg:active:scale-95"
          >
            {data.emailAddress}
            <Copy
              size={20}
              className="invisible group-hover:visible"
            />
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </ScrollArea>
</DialogContent>
</Dialog> */
}
