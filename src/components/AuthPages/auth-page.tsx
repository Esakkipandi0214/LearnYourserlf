import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/router";
import {decodeAndSetTokenInCookies}  from "./jwtDecoder";
import Cookies from "js-cookie";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(""); // Add state for username
  const router = useRouter();
  
  useEffect(() => {
    const Auto_auth = Cookies.get("auth_token_LearnYourSelf"); // Retrieve the JWT token
    
    if (Auto_auth) {
      router.push("/dashboard"); // Redirect to "/Courses" if the token is found
    }
  }, []); 
  
  // Form submit handler
  async function onSubmit(event: React.SyntheticEvent, action: "signin" | "signup") {
    event.preventDefault();
    setIsLoading(true);

    const url = action === "signin" ? "/api/users/User_login" : "/api/users"; // Adjust your signup endpoint
    const body = action === "signin" ? { email:email, password:password } : { email:email, password:password, name:username }; // Include username for signup

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        decodeAndSetTokenInCookies(data.token);
        // console.log("decodedData",decodedData);
        
        // Handle successful login/signup, redirect to the Courses page
        router.push("/dashboard");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-8 w-8 text-purple-300" />
          <span className="text-2xl font-bold text-purple-100">Acme Inc</span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-purple-100">
              &ldquo;This platform has revolutionized the way we manage our projects. It&apos;s intuitive, powerful, and has become an essential part of our daily workflow.&rdquo;
            </p>
            <footer className="text-sm text-purple-300">Sofia Davis, Project Manager</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="border-2 border-purple-200 shadow-lg transition-all duration-300 hover:shadow-purple-100/20">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Form */}
              <TabsContent value="signin">
                <form onSubmit={(e) => onSubmit(e, "signin")}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <form onSubmit={(e) => onSubmit(e, "signup")}>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-purple-800">Create an Account</CardTitle>
                    <CardDescription>Fill in your details to get started</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="JohnDoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
