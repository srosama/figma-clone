import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { AuthFormGenericProp } from "../../../types/AuthProps";
import { Link, useNavigate} from "react-router-dom";
import { Button } from "./button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useState } from "react";
import { logInWithEmail } from "../../../utils/auth/logInWithEmail";
import { signUpWithEmail } from "../../../utils/auth/signUpWithEmail";


const btnSubmitStyle =
  "w-full sm:w-96 text-lg h-14 bg-black text-center rounded-lg transition-all duration-200 hover:rounded-none";

// Fix this
const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must include at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must include at least one special character." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be at least 5 characters." }),
});

export function AuthFormGeneric({ loginOrRegister }: AuthFormGenericProp) {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  if (state.loading) {
    return <p>Loading...</p>;
  }

  //TODO: add user handlers events helpers e.g. you have been login successful est..
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    switch (loginOrRegister) {
      case true: {
        const userLogin = await logInWithEmail(values);
        if (userLogin) {
          dispatch({ type: "LOGIN", payload: userLogin });
          navigate("/dashboard");
        } else {
          // TODO: ERROR component handling
            //!delete this   
            console.log("Failed");
        }
        break;
      }

      case false: {
        const user = await signUpWithEmail(values);
        if (user) {
          dispatch({ type: "LOGIN", payload: user });
          alert("Registration successful")
          navigate("/verify");
        } else {
          console.log("Failed registration out");
        }
        break;
      }
      default: {
        console.log("Invalid option");
        break;
      }
    }
  };

  const [isFocusedE, setIsFocusedEmail] = useState(false);
  const [isFocusedP, setIsFocusedPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      {state.loading && <p>Loading...</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-4">
                <div className="flex relative items-center space-x-4">
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full sm:w-96 pr-16 pt-6 h-14 pb-6 bg-customGray"
                      onFocus={() => setIsFocusedEmail(true)}
                      onBlur={() => setIsFocusedEmail(field.value ? true : false)}
                    />
                  </FormControl>
                  <FormLabel
                    className={`absolute top-3 left-1 transition-all duration-200 ${isFocusedE || field.value ? "-translate-y-10 -left-2 text-sm" : "translate-y-0"
                      }`}
                  >
                    EMAIL
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col space-y-4 mt-10">
                <div className="flex relative items-center space-x-4">
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="w-full sm:w-96 pr-16 pt-6 h-14 pb-6 bg-customGray"
                      onFocus={() => setIsFocusedPassword(true)}
                      onBlur={() => setIsFocusedPassword(field.value ? true : false)}
                    />
                  </FormControl>
                  <FormLabel
                    className={`absolute top-3 left-1 transition-all duration-200 ${isFocusedP || field.value ? "-translate-y-10 -left-2 text-sm" : "translate-y-0"
                      }`}
                  >
                    PASSWORD
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={btnSubmitStyle}>
          {loginOrRegister ? "Log in" : "Create account"}
        </Button>
      </form>

      {loginOrRegister ? (
        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-blue-700 border-b-blue-700 border-b hover:border-blue-400 hover:text-blue-400">
              Sign up
            </span>
          </Link>
        </p>
      ) : (
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-700 border-b-blue-700 border-b hover:border-blue-400 hover:text-blue-400">
              Log in
            </span>
          </Link>
        </p>
      )}
    </Form>
  );
}
