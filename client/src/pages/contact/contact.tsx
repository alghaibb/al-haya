import React, { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import "./contact.styles.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters long"),
  message: z.string().min(3, "Message must be at least 3 characters long"),
});

type FormDataType = z.infer<typeof formSchema>;

const Contact = () => {
  const [showLoader, setShowLoader] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleFormSubmit = async (
    formData: FormDataType,
    e?: React.BaseSyntheticEvent
  ) => {
    if (e) {
      e.preventDefault();
    }

    setShowLoader(true);

    try {
      const res = await axios.post(
        import.meta.env.VITE_CONTACT_API_KEY,
        formData
      );

      if (res.status === 200) {
        setTimeout(() => {
          toast({
            title: "Success",
            description: "Message sent successfully",
          });
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        form.reset();
        setShowLoader(false);
      }, 2000);
    }
  };

  return (
    <div className="contactContainer">
      <h1 className="contactPageTitle">Contact Us</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((formData, e) =>
            handleFormSubmit(formData, e)
          )}
          className="contactForm"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      disabled={showLoader}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={showLoader}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={showLoader}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={showLoader} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <Button
            type="submit"
            className="sendMessageBtn"
            disabled={showLoader}
          >
            {showLoader ? <LoadingSpinner /> : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
