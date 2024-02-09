import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../../utils/mutations/userMutations";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

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

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import "./resetpassword.styles.css";

const formSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
});

type FormDataType = z.infer<typeof formSchema>;

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const [showLoader, setShowLoader] = useState(false);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (formData: FormDataType) => {
    setShowLoader(true);

    try {
      const res = await resetPassword({
        variables: {
          token,
          newPassword: formData.newPassword,
        },
      });

      if (res.data && res.data.resetPassword) {
        setTimeout(() => {
          toast({
            title: "Password Reset Successful",
            description: "Your password has been reset successfully.",
          });
        }, 2000);
      } else {
        console.error("Password reset failed:", res.data);
        toast({
          title: "Password Reset Failed",
          description: "Failed to reset password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Password Reset Failed",
        description:
          "An error occurred during password reset. Please try again.",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setShowLoader(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="resetPasswordContainer">
      <h1 className="resetPasswordTitle">Reset Your Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="resetPasswordForm"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="resetPasswordForm-item">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    disabled={loading || showLoader}
                  />
                </FormControl>
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className={showPassword ? "btn-visible" : "btn-hidden"}
                >
                  {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </button>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="resetPasswordForm-item">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={loading || showLoader}
                  />
                </FormControl>
                <button
                  onClick={toggleConfirmPasswordVisibility}
                  type="button"
                  className={showConfirmPassword ? "btn-visible" : "btn-hidden"}
                >
                  {showConfirmPassword ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </button>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button
            type="submit"
            className="resetPasswordBtn"
            disabled={loading || showLoader}
          >
            {showLoader ? <LoadingSpinner /> : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
