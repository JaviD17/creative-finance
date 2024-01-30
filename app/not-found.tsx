"use client";

import { useRouter } from "next/navigation";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function Error() {
  const router = useRouter();
  return (
    <main className="h-screen">
      <div className="w-11/12 lg:max-w-lg mx-auto h-[50vh] text-slate-50 flex items-center">
        <Alert className="">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <div className="py-2">
            <Separator />
          </div>

          <AlertDescription className="space-y-2">
            <p>404 | This page could not be found.</p>
            <div
              onClick={() => router.push("/")}
              className="text-center active:bg-black-100 border border-black-950 text-black-950 shadow-2xl shadow-black-950 px-3 py-1.5 rounded-sm cursor-pointer"
            >
              Home
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
