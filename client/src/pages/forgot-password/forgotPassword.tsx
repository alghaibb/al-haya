import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "../../utils/mutations/userMutations";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import LoadingSpinner from "../../components/LoadingSpinner";
import { Input } from "@/components/ui/input";

import "./forgotpassword.styles.css";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormDataType = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [requestPasswordReset, { loading }] = useMutation(
    REQUEST_PASSWORD_RESET
  );
  const [showLoader, setShowLoader] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleFormSubmit = async (formData: FormDataType) => {
    setShowLoader(true);

    try {
      const res = await requestPasswordReset({
        variables: {
          email: formData.email,
        },
      });

      if (res.data && res.data.requestPasswordReset) {
        toast({
          title: "Password Reset Email Sent",
          description:
            "An email with instructions to reset your password has been sent to your email address.",
        });
      } else {
        console.error("Password reset request failed:", res.data);
        toast({
          title: "Password Reset Request Failed",
          description: "Failed to request password reset. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Password reset request error:", error);
      toast({
        title: "Password Reset Request Failed",
        description:
          "An error occurred while requesting password reset. Please try again.",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowLoader(false);
    }
  };

  return (
    <div className="forgotPasswordFormContainer">
      <h1 className="forgotPasswordFormTitle">Forgot Password </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="forgotPasswordForm"
        >
          <p className="backToLoginLink">
            <Link to="/login">
              <MdOutlineKeyboardArrowLeft className="arrowLeft" /> Back to login
            </Link>
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled={loading || showLoader}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            className="forgotPasswordBtn"
            disabled={loading || showLoader}
          >
            {showLoader ? <LoadingSpinner /> : "Send Request"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
