"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      {/* Hero Section */}
      <div className="text-slate-50">
        <h1 className="text-lg font-extralight tracking-widest text-center underline underline-offset-8">
          JD PRIVATE EQUITIES
        </h1>
        <div className="h-[358px] w-[358px] mx-auto my-8">
          {/* <div className="h-[394px] w-[394px] mx-auto py-2"> */}
          <Image
            priority
            src={"/jd-logo-2.webp"}
            alt="logo"
            height={1024}
            width={1024}
            className="rounded-sm"
          />
        </div>
      </div>
      {/* Deals Section */}
      <div className="text-black-950 bg-slate-50 py-8">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Deals
        </h2>
        {/* Deals Container */}
        <div className="w-11/12 lg:max-w-7xl mx-auto lg:flex lg:justify-around">
          {/* Single Deal Card */}
          <div className="py-8">
            <div className="h-[328px] w-[328px] mx-auto shadow-2xl shadow-black-950 rounded-sm">
              <Image
                src={"/cf-service-1.webp"}
                alt="service"
                height={1024}
                width={1024}
                className="rounded-sm"
              />
            </div>
            <div className="h-[328px] w-[328px] mx-auto py-4">
              <h3 className="font-extrabold tracking-widest pb-1.5 uppercase">
                EMD FUNDING
              </h3>
              <div className="h-1.5 w-16 bg-black-950 rounded-sm" />
              <p className="pt-3 text-black-600 text-pretty text-left">
                This is an EMD loan set out to execute on Feb 24th, 2024. If
                interest just click contact and feel free to reach out when
                funding. This is an EMD loan set out to execute on Feb 24th,
                2024. If interest just click contact and feel free to reach out
                when funding.
              </p>
            </div>
            <div className="w-[328px] mx-auto">
              <Button
                className="font-extrabold tracking-widest uppercase border-black-950 shadow-2xl shadow-black-950 cursor-pointer"
                variant={"outline"}
                onClick={() => router.push("/deals/123")}
              >
                View Deal
              </Button>
            </div>
          </div>

          <div className="py-8">
            <div className="h-[328px] w-[328px] mx-auto shadow-2xl shadow-black-950 rounded-sm">
              <Image
                src={"/cf-service-1.webp"}
                alt="service"
                height={1024}
                width={1024}
                className="rounded-sm"
              />
            </div>
            <div className="h-[328px] w-[328px] mx-auto py-4">
              <h3 className="font-extrabold tracking-widest pb-1.5 uppercase">
                EMD FUNDING
              </h3>
              <div className="h-1.5 w-16 bg-black-950 rounded-sm" />
              <p className="pt-3 text-black-600 text-pretty text-left">
                This is an EMD loan set out to execute on Feb 24th, 2024. If
                interest just click contact and feel free to reach out when
                funding. This is an EMD loan set out to execute on Feb 24th,
                2024. If interest just click contact and feel free to reach out
                when funding.
              </p>
            </div>
            <div className="w-[328px] mx-auto">
              <Button
                className="font-extrabold tracking-widest uppercase border-black-950 shadow-2xl shadow-black-950"
                variant={"outline"}
                onClick={() => router.push("/deals/123")}
              >
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
    </main>
  );
}
