"use client";

import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import toast from "react-hot-toast";

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
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().min(1).email(),
  title: z.string().min(1),
  description: z.string().min(1).max(320, {
    message: "Order description must not be longer than 320 characters",
  }),
  terms: z.string().min(1),
  returnRate: z.coerce.number().nonnegative(),
  amount: z.coerce.number().nonnegative(),
  status: z.union([z.literal("open"), z.literal("closed")]),
});

const CreatePage = () => {
  const { user } = useUser();
  const create = useMutation(api.deals.create);

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
      title: "",
      description: "",
      terms: "",
      returnRate: 0,
      amount: 0,
      status: "open",
    },
  });

  const { reset } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (user?.publicMetadata.userAdmin) {
      create({
        fullName: values.fullName,
        emailAddress: values.emailAddress,
        title: values.title,
        description: values.description,
        terms: values.terms,
        returnRate: values.returnRate,
        amount: values.amount,
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

    // router.push("/");
  }

  return (
    <main>
      <div className="text-black-950 bg-slate-50 py-8">
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
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is for your title.
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
                        placeholder="Description..."
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
                        placeholder="Terms..."
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
                name="amount"
                render={({ field }) => (
                  <FormItem className=" w-[328px] mx-auto rounded-sm">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormDescription>
                      This field is required capital amount for deal.
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
