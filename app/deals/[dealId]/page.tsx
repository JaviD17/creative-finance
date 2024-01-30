"use client";

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().min(1).email(),
  amount: z.coerce.number().nonnegative(),
});

const DealPage = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return redirect("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ? user.fullName : "",
      emailAddress: user.primaryEmailAddress?.emailAddress
        ? user.primaryEmailAddress.emailAddress
        : "",
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/");
  }

  return (
    <main className="lg:flex">
      <div className="text-black-950 bg-slate-50 py-8 lg:w-[50vw]">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Overview
        </h2>
        {/* Deal Container */}
        <div className="w-11/12 lg:max-w-7xl mx-auto">
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
              <p className="pt-3 text-black-900 text-pretty text-left">
                This is an EMD loan set out to execute on Feb 24th, 2024. If
                interest just click contact and feel free to reach out when
                funding. This is an EMD loan set out to execute on Feb 24th,
                2024. If interest just click contact and feel free to reach out
                when funding.
              </p>
            </div>
            {/* <div className="w-[328px] mx-auto">
              <Button
                className="font-extrabold tracking-widest uppercase border-black-950 shadow-2xl shadow-black-950 w-[328px]"
                variant={"outline"}
                onClick={() => router.push("/deals/123")}
              >
                Fund This Deal
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="text-black-50 bg-black-950 py-8 lg:w-[50vw]">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Terms
        </h2>
        {/* Deal Container */}
        <div className="w-11/12 lg:max-w-7xl mx-auto">
          {/* Single Deal Card */}
          <div className="py-8">
            <div className="w-[328px] mx-auto rounded-sm overflow-hidden">
              <Accordion
                type="single"
                collapsible
                className="bg-black-50 text-black-950 px-3 rounded-sm text-pretty"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is EMD?</AccordionTrigger>
                  <AccordionContent>
                    EMD stands for Earnest Money Deposit. In the context of real
                    estate transactions, an Earnest Money Deposit is a sum of
                    money provided by a buyer to the seller as a demonstration
                    of their serious intent and commitment to purchase a
                    property. The EMD is typically submitted along with an offer
                    to buy a property and is held in an escrow account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How are JV contracts structured?
                  </AccordionTrigger>
                  <AccordionContent>
                    Joint Venture (JV) contracts in the context of real estate
                    transactions outline the terms and conditions under which
                    two or more parties collaborate on a specific real estate
                    deal. These contracts vary based on the nature of the
                    venture, the roles of the parties involved, and the
                    specifics of the transaction
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What is a TC?</AccordionTrigger>
                  <AccordionContent>
                    A Transaction Coordinator is a professional who assists in
                    managing the details and paperwork involved in a real estate
                    transaction. Their role is to ensure that the process runs
                    smoothly by organizing and coordinating various elements,
                    including communication between parties, document
                    preparation, and adherence to timelines.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-[328px] mx-auto py-8">
              <h3 className="font-extrabold tracking-widest pb-1.5 uppercase">
                DEAL STATS
              </h3>
              <div className="h-1.5 w-16 bg-black-50 rounded-sm" />
              <ul className="mt-8 p-4 space-y-2 text-black-100 text-pretty text-left font-light tracking-widest text-xl border border-black-50 rounded-sm">
                <li>
                  <div className={`flex justify-between`}>
                    <p>Time:</p>
                    <p>12 Months</p>
                  </div>
                </li>
                <li>
                  <div className={`flex justify-between`}>
                    <p>Amount:</p>
                    <p>$5,000</p>
                  </div>
                </li>
                <li>
                  <div className={`flex justify-between`}>
                    <p>Return:</p>
                    <p>10%</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* <div className="w-[328px] mx-auto">
              <Button
                className="font-extrabold tracking-widest uppercase bg-black-950 border border-black-50 shadow-2xl shadow-black-50 w-[328px]"
                variant={"default"}
                onClick={() => router.push("/deals/123")}
              >
                Fund This Deal
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="text-black-950 bg-black-50 py-8 lg:w-[50vw]">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Funding Form
        </h2>
        {/* Form Container */}
        <div className="py-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-11/12 lg:max-w-7xl mx-auto border border-black-950 rounded-sm py-8 shadow-2xl shadow-black-950 space-y-4"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        disabled={user.fullName !== ""}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {user.firstName
                        ? "This field is pre-filled and deactivated by default, promoting transparency in the form."
                        : ""}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        disabled={user.fullName !== ""}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {user.primaryEmailAddress
                        ? "This field is pre-filled and deactivated by default, promoting transparency in the form."
                        : ""}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is your desired investment amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-[328px] mx-auto">
                <Button
                  className="w-[328px] font-extrabold tracking-widest uppercase border border-black-950 shadow-2xl shadow-black-950"
                  variant={"outline"}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default DealPage;
