"use client";
import { LayoutDashboardIcon, MailIcon } from "lucide-react";
import { Button, Card, CardHeader, CardBody } from "@heroui/react";
import { Link } from "@heroui/link";
import { clsx } from "clsx";
import { useState } from "react";

import { fontKappal } from "@/config/fonts";
import { DomainLinks } from "@/config/data/data";
import { FeatureCard } from "@/components/containers/product-cards/feature-card";
import { products } from "@/config/data/main/products";

export default function AdminPortal() {
  const [email, setEmail] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the magic link to the user's email
    // console.log("Magic link sent to:", email);
    setEmailSent(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <LayoutDashboardIcon className="h-8 w-8 text-brandsecondary mr-2" />
            <h1
              className={clsx(
                "text-2xl font-bold text-header",
                fontKappal.variable,
              )}
            >
              Priyalakshmi.in Admin Portal
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              as={Link}
              className="bg-secondary text-content"
              href={DomainLinks.Email.CompanyEmail.href}
              isExternal={true}
              variant="flat"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 my-16">
        {/* Products Section */}
        <div className="lg:w-2/3">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-header mb-4">
              Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <FeatureCard key={index} feature={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Login/Signup Section */}
        <div className="lg:w-1/3">
          <Card className="sticky top-6">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-center">
                {isLoginView ? "Welcome Back" : "Create Account"}
              </h3>
            </CardHeader>
            <CardBody>
              {emailSent ? (
                <div className="text-center py-8">
                  <MailIcon className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">
                    Check Your Email
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    We&apos;ve sent a magic link to{" "}
                    <span className="font-semibold">{email}</span>. Click the
                    link to {isLoginView ? "login" : "complete your signup"}.
                  </p>
                  <Button
                    className="w-full bg-brandsecondary text-highlight"
                    variant="flat"
                    onPress={() => {
                      setEmailSent(false);
                      setEmail("");
                    }}
                  >
                    Back to {isLoginView ? "Login" : "Signup"}
                  </Button>
                </div>
              ) : (
                <>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <input
                        required
                        className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-slate-800 dark:text-white"
                        id="email"
                        placeholder="your@email.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full bg-brandsecondary text-highlight"
                      type="submit"
                    >
                      {isLoginView ? "Send Magic Link" : "Sign Up"}
                    </Button>
                  </form>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="w-full border-slate-300 dark:border-slate-600"
                      variant="flat"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.167-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z" />
                      </svg>
                      Google
                    </Button>
                    <Button
                      className="w-full border-slate-300 dark:border-slate-600"
                      variant="flat"
                    >
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {isLoginView
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                      <button
                        className="text-green-600 dark:text-green-400 font-medium hover:underline"
                        type="button"
                        onClick={() => setIsLoginView(!isLoginView)}
                      >
                        {isLoginView ? "Sign up" : "Log in"}
                      </button>
                    </p>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
