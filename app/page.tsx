import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { ThemeToggle } from "./components/theme-toggle";
import { CheckCircleFill, InformationFillSmall } from "@vercel/geist/icons";
import { ReactNode } from "react";

interface PricingListItemProps {
  children: ReactNode;
  tooltip?: string;
}

// Mock Tooltip component
const Tooltip = ({
  content,
  children,
}: {
  content: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-v0-gray-1000 text-v0-white text-xs rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
        {content}
      </div>
    </div>
  );
};

const PricingListItem = ({ children, tooltip }: PricingListItemProps) => {
  return (
    <li className="flex items-baseline gap-x-2 text-pretty text-sm text-v0-gray-1000 border-b pb-3">
      <CheckCircleFill
        aria-hidden
        className="shrink-0 translate-y-1 !text-v0-gray-800"
        size={16}
      />
      <span className="[&>a]:font-medium [&>a]:hover:underline flex-1">
        {children}
      </span>
      {tooltip && (
        <Tooltip content={tooltip}>
          <InformationFillSmall
            className="shrink-0 text-v0-gray-600 hover:text-v0-gray-800 cursor-help"
            size={16}
          />
        </Tooltip>
      )}
    </li>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-v0-background-200">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Theme Toggle */}
        <div className="mb-8 flex justify-end">
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="blue">Design System</Badge>
            <Badge variant="gray">v1.0</Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-v0-gray-1000">
            Component Showcase
          </h1>
          <p className="text-lg text-v0-gray-900 max-w-2xl mx-auto">
            A collection of beautifully designed components built with React and
            Tailwind CSS
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-v0-gray-1000">
            Color Palette
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gray Scale */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-v0-gray-900">
                Gray Scale
              </h3>
              <div className="flex gap-1 flex-wrap mb-4">
                <div
                  className="w-10 h-10 rounded bg-v0-gray-100 cursor-pointer relative group"
                  title="bg-v0-gray-100"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-100
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-gray-300 cursor-pointer relative group"
                  title="bg-v0-gray-300"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-300
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-gray-500 cursor-pointer relative group"
                  title="bg-v0-gray-500"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-500
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-gray-700 cursor-pointer relative group"
                  title="bg-v0-gray-700"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-700
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-gray-900 cursor-pointer relative group"
                  title="bg-v0-gray-900"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-900
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-gray-1000 cursor-pointer relative group"
                  title="bg-v0-gray-1000"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-gray-1000
                  </span>
                </div>
              </div>
            </div>

            {/* Background Colors */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-v0-gray-900">
                Backgrounds
              </h3>
              <div className="flex gap-1 flex-wrap mb-4">
                <div
                  className="w-10 h-10 rounded bg-v0-background-100 cursor-pointer relative group ring-1 ring-v0-alpha-400"
                  title="bg-v0-background-100"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-background-100
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-background-200 cursor-pointer relative group ring-1 ring-v0-alpha-400"
                  title="bg-v0-background-200"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-background-200
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-background-300 cursor-pointer relative group ring-1 ring-v0-alpha-400"
                  title="bg-v0-background-300"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-background-300
                  </span>
                </div>
              </div>
            </div>

            {/* Alpha Colors */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-v0-gray-900">
                Alpha
              </h3>
              <div className="flex gap-1 flex-wrap mb-4">
                <div
                  className="w-10 h-10 rounded bg-v0-alpha-100 cursor-pointer relative group ring-1 ring-v0-gray-400"
                  title="bg-v0-alpha-100"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-alpha-100
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-alpha-200 cursor-pointer relative group ring-1 ring-v0-gray-400"
                  title="bg-v0-alpha-200"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-alpha-200
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-alpha-300 cursor-pointer relative group ring-1 ring-v0-gray-400"
                  title="bg-v0-alpha-300"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-alpha-300
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-alpha-400 cursor-pointer relative group ring-1 ring-v0-gray-400"
                  title="bg-v0-alpha-400"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-alpha-400
                  </span>
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-v0-gray-900">
                Accents
              </h3>
              <div className="flex gap-1 flex-wrap mb-4">
                <div
                  className="w-10 h-10 rounded bg-v0-teal-700 cursor-pointer relative group"
                  title="bg-v0-teal-700"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-teal-700
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-blue-300 cursor-pointer relative group"
                  title="bg-v0-blue-300"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-blue-300
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-red-800 cursor-pointer relative group"
                  title="bg-v0-red-800"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-red-800
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-white cursor-pointer relative group ring-1 ring-v0-alpha-400"
                  title="bg-v0-white"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-white
                  </span>
                </div>
                <div
                  className="w-10 h-10 rounded bg-v0-black cursor-pointer relative group"
                  title="bg-v0-black"
                >
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-v0-gray-1000 text-v0-white px-2 py-1 rounded pointer-events-none z-10">
                    bg-v0-black
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-v0-gray-1000">
            Component Examples
          </h2>

          {/* Pricing Cards */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 text-v0-gray-1000">
              Pricing Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Team Plan */}
              <Card className="flex flex-1 flex-col bg-v0-gray-100 text-v0-gray-1000 border-none shadow-none rounded-2xl">
                <div className="w-full">
                  <CardHeader className="flex flex-col p-6 gap-3">
                    <CardTitle className="flex items-center gap-x-3 sm:text-3xl text-2xl font-semibold">
                      Team
                      <Badge variant="teal">Popular</Badge>
                    </CardTitle>
                    <span className="inline-block whitespace-nowrap leading-none">
                      <span className="text-heading-24 text-v0-gray-900">
                        $20
                      </span>
                      <span className="inline-block -translate-y-px text-sm text-v0-gray-900">
                        /user/month
                      </span>
                    </span>
                  </CardHeader>

                  <CardContent className="gap-3 pb-0">
                    <ul className="flex flex-col gap-y-3">
                      <PricingListItem tooltip="Generate unlimited designs with v0">
                        Unlimited generations
                      </PricingListItem>
                      <PricingListItem>Private projects</PricingListItem>
                      <PricingListItem tooltip="Collaborate with your team in real-time">
                        Team collaboration
                      </PricingListItem>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="gap-[10px] p-4 mt-auto">
                  <Button
                    variant="secondary"
                    className="flex w-full cursor-pointer gap-x-2 whitespace-nowrap shadow-sm border-none"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Business Plan */}
              <Card className="flex flex-1 flex-col bg-v0-gray-100 text-v0-gray-1000 border-none shadow-none rounded-2xl">
                <div className="w-full">
                  <CardHeader className="flex flex-col p-6 gap-3">
                    <CardTitle className="flex items-center gap-x-3 sm:text-3xl text-2xl font-semibold">
                      Business
                    </CardTitle>
                    <span className="inline-block whitespace-nowrap leading-none">
                      <span className="text-heading-24 text-v0-gray-900">
                        $40
                      </span>
                      <span className="inline-block -translate-y-px text-sm text-v0-gray-900">
                        /user/month
                      </span>
                    </span>
                  </CardHeader>

                  <CardContent className="gap-3 pb-0">
                    <ul className="flex flex-col gap-y-3">
                      <PricingListItem>Everything in Team</PricingListItem>
                      <PricingListItem tooltip="Get help from our support team faster">
                        Priority support
                      </PricingListItem>
                      <PricingListItem>Advanced analytics</PricingListItem>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="gap-[10px] p-4 mt-auto">
                  <Button
                    variant="secondary"
                    className="flex w-full cursor-pointer gap-x-2 whitespace-nowrap shadow-sm border-none"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-1 flex-col bg-v0-gray-100 text-v0-gray-1000 border-none shadow-none rounded-2xl">
                <div className="w-full">
                  <CardHeader className="flex flex-col p-6 gap-3">
                    <CardTitle className="flex items-center gap-x-3 sm:text-3xl text-2xl font-semibold">
                      Enterprise
                      <Badge variant="secondary">Best Value</Badge>
                    </CardTitle>
                    <span className="inline-block whitespace-nowrap leading-none">
                      <span className="text-heading-24 text-v0-gray-900">
                        Custom Pricing
                      </span>
                    </span>
                  </CardHeader>

                  <CardContent className="gap-3 pb-0">
                    <ul className="flex flex-col gap-y-3">
                      <PricingListItem>Everything in Business</PricingListItem>
                      <PricingListItem tooltip="Dedicated support team for your organization">
                        Dedicated support
                      </PricingListItem>
                      <PricingListItem tooltip="Build custom integrations with our API">
                        Custom integrations
                      </PricingListItem>
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="gap-[10px] p-4 mt-auto">
                  <Button
                    variant="default"
                    className="flex w-full cursor-pointer gap-x-2 whitespace-nowrap shadow-sm border-none"
                  >
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
