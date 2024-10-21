"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdFastfood } from "react-icons/md";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineHistory,
  AiOutlineDollar,
} from "react-icons/ai";

type MenuItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type User = {
  user: string;
};

const menuItems: Record<"admin" | "user", MenuItem[]> = {
  admin: [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <AiOutlineDashboard />,
    },
    {
      name: "Add Items",
      href: "/admin/addItem",
      icon: <MdFastfood />,
    },
    {
      name: "Order History",
      href: "/admin/orders",
      icon: <AiOutlineHistory />,
    },
    { name: "Earnings", href: "/admin/earnings", icon: <AiOutlineDollar /> },
  ],
  user: [
    {
      name: "Dashboard",
      href: "/user/dashboard",
      icon: <AiOutlineDashboard />,
    },
    { name: "Items", href: "/user/items", icon: <AiOutlineShoppingCart /> },
    { name: "Orders", href: "/user/orders", icon: <AiOutlineHistory /> },
    { name: "Cart", href: "/user/cart", icon: <AiOutlineDollar /> },
  ],
};

const Navbar = ({ user }: User) => {
  const [loading, setLoading] = useState<boolean>(false);
  const path = usePathname();
  const role = path.split("/")[1] as "admin" | "user";
  const items = menuItems[role] || [];
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between items-center">
      <div className="hidden md:flex gap-4">
        {items.map(({ name, href, icon }) => (
          <Link key={name} href={href}>
            <div
              className={`flex items-center px-3 py-2 rounded-md font-semibold duration-150 ${
                path === href
                  ? "text-red-500"
                  : "text-slate-800 hover:text-slate-900"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {name}
            </div>
          </Link>
        ))}
      </div>
      <div className="hidden md:block ml-4">
        <Button
          variant="default"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            await signOut();
            setLoading(false);
            router.push("/api/auth/signin");
          }}
        >
          {user === "User" ? "Login" : "Logout"}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
