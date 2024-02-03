"use client";

import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

import useStoreUserEffect from "@/app/useStoreUserEffect";

// mobile first
// href, label, active;

const Nav = () => {
  useStoreUserEffect();
  const pathname = usePathname();
  const router = useRouter();
  // if userId ever needed for future routes
  // const userId = useStoreUserEffect();

  // if (userId === null) {
  //   return <div className="text-black-50">Storing user...</div>;
  // }

  const routes = [
    {
      href: "/deals",
      label: "Deals",
      active: pathname === `/deals`,
    },
    // {
    //   href: "/contact",
    //   label: "Contact",
    //   active: pathname === `/contact`,
    // },
  ];

  return (
    <nav className="bg-black-50 text-black-950 w-11/12 lg:max-w-7xl h-[7.5vh] rounded-sm shadow-2xl mx-auto my-8 overflow-hidden flex justify-between items-center">
      {/* Logo */}
      <div className="flex">
        <div
          className="h-[7.5vh] w-[7.5vh] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            priority
            src={"/jd-logo-2.webp"}
            alt="logo"
            height={1024}
            width={1024}
          />
        </div>
        <ul className="flex">
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
      </div>
      {/* Menu */}
      <div className="mr-4">
        <SignedOut>
          <div className="active:bg-black-100 border border-black-950 text-black-950 shadow-2xl shadow-black-950 px-3 py-1.5 rounded-sm cursor-pointer">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="shadow-2xl shadow-black-950 rounded-full">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Nav;
