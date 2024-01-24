import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations/userMutations";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "./login.style.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import AuthService from "../../utils/auth";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

type FormDataType = z.infer<typeof formSchema>;

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN_USER);
  const [showLoader, setShowLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      const res = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      if (res.data && res.data.login && res.data.login.token) {
        toast({
          title: "Login Successful",
          description: "Login successful, redirecting you to the home page...",
        });

        setTimeout(() => {
          AuthService.login(res.data.login.token);
        }, 2000);
      } else {
        console.error("Login failed:", res.data);
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="loginContainer">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="loginForm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
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
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel>Password</FormLabel>
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
          <Button
            type="submit"
            className="loginBtn"
            disabled={loading || showLoader}
          >
            {showLoader ? <LoadingSpinner /> : "Login"}
          </Button>
          <p>
            Don't have an account?
            <Link to="/signup">
              <span>Sign Up</span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default Login;
