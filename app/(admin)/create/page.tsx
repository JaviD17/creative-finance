"use client";

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";

import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().min(1).email(),
  title: z.string().min(1),
  description: z.string().min(1).max(320, {
    message: "Order description must not be longer than 320 characters",
  }),
  terms: z.string().min(1),
  time: z.coerce.number().nonnegative(),
  amountNeeded: z.coerce.number().nonnegative(),
  returnRate: z.coerce.number().nonnegative(),
  flatRate: z.coerce.number().nonnegative(),
  status: z.union([z.literal("open"), z.literal("closed")]),
});

const CreatePage = () => {
  const { user } = useUser();
  const create = useMutation(api.deals.create);

  if (!user?.publicMetadata.adminUser) {
    redirect("/");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user.fullName ? user.fullName : "",
      emailAddress: user.primaryEmailAddress?.emailAddress
        ? user.primaryEmailAddress.emailAddress
        : "",
      title: "",
      description: "",
      terms: "",
      time: 0,
      amountNeeded: 0,
      returnRate: 0,
      flatRate: 0,
      status: "open",
    },
  });

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    if (user?.publicMetadata.adminUser) {
      create({
        fullName: values.fullName,
        emailAddress: values.emailAddress,
        title: values.title,
        description: values.description,
        terms: values.terms,
        time: values.time,
        amountNeeded: values.amountNeeded,
        returnRate: values.returnRate,
        flatRate: values.flatRate,
        status: values.status,
      }).then((response) => {
        console.log(response);
        toast.success(`Deal ${response} posted.`);
        reset();
      });
    } else {
      throw new Error(
        "This account is not authorized to access this endpoint."
      );
    }
  }

  return (
    <main>
      <div className="text-black-950 bg-black-50 py-8">
        <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
          Create Deal
        </h2>
        {/* Form Container */}

        <div className="py-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-11/12 lg:max-w-lg mx-auto border border-black-950 rounded-sm py-8 shadow-2xl shadow-black-950 space-y-4"
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
                name="title"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="EMD, PML, etc..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is the title of your deal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What's it for and what's the exit strategy? Is there a Top Tier TC involved?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This field describes the deal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Terms</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Terms... how long are funds needed?"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This field lays out deal terms.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Time needed (months)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is the required time for deal. Example: if 6 -
                      8 months, go with 8.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amountNeeded"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Amount Needed ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the required capital amount for this deal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="returnRate"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Return Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} step={0.01} {...field} />
                    </FormControl>
                    <FormDescription>
                      Example: 20% = 0.2, leave at 0% if for EMD.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="flatRate"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Flat Rate ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is typically for EMD. Leave at 0 if return rate
                      is {">"} 0%
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

export default CreatePage;
