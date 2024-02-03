"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const router = useRouter();
  const data = useQuery(api.deals.getAll);
  return (
    <main className="">
      {/* Hero Section */}
      <div className="text-black-50">
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
      <div className="text-black-950 bg-black-50 py-8">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Deals
        </h2>
        {/* Deals Container */}
        <div className="w-11/12 lg:max-w-7xl mx-auto lg:flex lg:justify-around">
          {/* Single Deal Card */}
          {data?.map((deal) => (
            <div key={deal._id} className="py-8">
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
                  {deal.title}
                </h3>
                <div className="h-1.5 w-16 bg-black-950 rounded-sm" />
                <p className="pt-3 text-black-600 text-pretty text-left">
                  {deal.description}
                </p>
              </div>
              <div className="w-[328px] mx-auto">
                <Button
                  className="font-extrabold tracking-widest uppercase border-black-950 shadow-2xl shadow-black-950 cursor-pointer"
                  variant={"outline"}
                  onClick={() => router.push(`/deals/${deal._id}`)}
                >
                  View Deal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
