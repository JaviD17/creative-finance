import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  fullName: z.string().min(1),
  emailAddress: z.string().email(),
  subject: z.string().min(1).max(80),
  message: z.string().min(1),
});

const ContactForm = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName ? user.fullName : "",
      emailAddress: user?.primaryEmailAddress?.emailAddress
        ? user.primaryEmailAddress.emailAddress
        : "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    // resend
  }

  return (
    <div className="text-black-50 bg-black-950 py-8">
      <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase">
        Contact Us
      </h2>
      <div className="py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-11/12 lg:max-w-lg mx-auto border border-black-50 rounded-sm py-8 shadow-2xl shadow-black-50 space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className=" w-[328px] mx-auto rounded-sm">
                  <FormLabel>Name</FormLabel>
                  <FormControl className="text-black-50 disabled:text-black-50 bg-black-950">
                    <Input
                      className=""
                      placeholder="name"
                      disabled={user.fullName !== ""}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black-400">
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
                  <FormControl className="text-black-50 disabled:text-black-50 bg-black-950">
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      disabled={user.fullName !== ""}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black-400">
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
              name="subject"
              render={({ field }) => (
                <FormItem className=" w-[328px] mx-auto rounded-sm">
                  <FormLabel>Subject</FormLabel>
                  <FormControl className="text-black-50 disabled:text-black-50 bg-black-950">
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormDescription className="text-black-400">
                    Define the subject of your message.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className=" w-[328px] mx-auto rounded-sm">
                  <FormLabel>Message</FormLabel>
                  <FormControl className="text-black-50 disabled:text-black-50 bg-black-950">
                    <Textarea
                      placeholder="Some text..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black-400">
                    This field describes the your reason for inquiry.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-[328px] mx-auto">
              <Button
                className="w-[328px] text-black-50 bg-black-950 font-extrabold tracking-widest uppercase border border-black-50 shadow-2xl shadow-black-50"
                variant={"outline"}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {!user && <div>Log in to access this contact form</div>}
    </div>
  );
};

export default ContactForm;
