"use client";

import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { clsx } from "clsx";

import { fontKappal } from "@/config/fonts";

interface BasicCardProps {
  title: string;
  description: string;
}
export const BasicCard: React.FC<BasicCardProps> = ({ title, description }) => {
  return (
    <Card className="col-span-1 max-w-md mx-5 px-5 hover:bg-transparent/10 bg-slate-100 dark:bg-slate-800 border border-teal-400 rounded-2xl">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p
            className={clsx(
              "text-3xl font-kappal text-brandprimary tracking-wide",
              fontKappal.variable,
            )}
          >
            {title}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter />
    </Card>
  );
};
