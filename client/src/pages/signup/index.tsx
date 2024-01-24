/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/mutations/userMutations";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import "./form.style.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const formSchema = z
  .object({
    fullName: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters long, include one letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type FormDataType = z.infer<typeof formSchema>;

const Signup = () => {
  // useState hooks
  const [register, { loading, error }] = useMutation(REGISTER_USER);
  const [showLoader, setShowLoader] = useState(false);
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (formData: FormDataType) => {
    setShowLoader(true);
    try {
      const res = await register({
        variables: {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
      });

      if (res.data && res.data.register && res.data.register.token) {
        // Delay the toast message for 3 seconds
        setTimeout(() => {
          // Show a success toast message
          toast({
            title: "Registration Successful",
            description: "You have been successfully registered!",
          });
        }, 2000);

        // Redirect the user to the login page or perform other actions here
      } else {
        // Handle the case where the response structure is unexpected
        console.error("Unexpected response structure:", res.data);
        // Show a single error toast message for unexpected errors
        toast({
          title: "Registration Failed",
          description:
            "An error occurred during registration. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Show a single error toast message for network or server errors
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    }

    // Delay for 3 seconds before deactivating the loader and showing the form again and delay toast message for 3 seconds
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  };

  // Toggle functions
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="signupContainer">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="signupForm"
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
                      disabled={loading || showLoader}
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
                  <FormLabel>Your email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={loading || showLoader}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="form-item">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      disabled={loading || showLoader}
                    />
                  </FormControl>
                  <button onClick={togglePasswordVisibility} type="button">
                    {/* Replace with an eye/eye-off icon */}
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem className="form-item">
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
                  >
                    {showConfirmPassword ? (
                      <EyeOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )}
                  </button>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <Button
            type="submit"
            className="signupBtn"
            disabled={loading || showLoader}
          >
            {showLoader ? <LoadingSpinner /> : "Sign Up"}
          </Button>

          {error && <p className="error-text">{error.message}</p>}

          <p>
            Already have an account?
            <Link to="/login">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
