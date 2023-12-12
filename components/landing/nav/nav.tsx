"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "@/components/docs/icons";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/landing/nav/util";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "All Courses",
    href: "/courses",
    description: "View all of our courses",
  },
  {
    title: "Django Full Stack",
    href: "/courses/django",
    description: "Learn how to build a full stack application with Django",
  },
  {
    title: "Introduction to Python",
    href: "/courses/python",
    description: "Learn the fundamentals of Python",
  },
];

export default function NavigationMenuDemo() {
  const segment = useSelectedLayoutSegment();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image src="/logo.svg" alt="Logo" height="24" width="24" />
                    <div className="mb-2 mt-4 text-lg font-medium">Unidemy</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Carefully crafted keeping students in mind.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/features/nid" title="National ID API">
                Free and Paid APIs for Rapid Development
              </ListItem>
              <ListItem
                href="/features/payment-gateway"
                title="Payment Gateway"
              >
                Dummy Payment Gateway for Academic Purposes
              </ListItem>
              <ListItem href="/courses" title="Courses">
                Courses for Students who want to learn
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul
              className={cn(
                "grid w-[400px] gap-3 p-4",
                components.length > 3
                  ? "md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  : "md:w-[300px] md:grid-cols-1 lg:w-[350px]",
              )}
            >
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Docs
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/guides" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Guides
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
