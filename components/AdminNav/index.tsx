"use client";

import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

import useStoreUserEffect from "@/app/useStoreUserEffect";

// mobile first
// href, label, active;

const Nav = () => {
  useStoreUserEffect();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  // if userId ever needed for future routes
  // const userId = useStoreUserEffect();

  // if (userId === null) {
  //   return <div className="text-black-50">Storing user...</div>;
  // }

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === `/dashboard`,
    },
    {
      href: "/create",
      label: "Create",
      active: pathname === `/create`,
    },
  ];

  if (user?.publicMetadata.adminUser !== true) {
    return null;
  }

  return (
    <nav className="bg-black-50 text-black-950 w-fit h-[7.5vh] rounded-sm shadow-2xl mx-auto my-8 overflow-hidden flex justify-between items-center">
      {/* Logo */}
      <ul className="flex w-full justify-center">
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            <li
              className={`h-[7.5vh] w-fit px-4 flex items-center ${
                route.active ? "bg-black-200 " : ""
              }`}
            >
              <p className="font-medium tracking-widest uppercase">
                {route.label}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
