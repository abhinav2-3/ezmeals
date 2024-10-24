"use client"; // Ensure this component runs on the client side

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  AiOutlineDashboard,
  AiOutlineHistory,
  AiOutlineDollar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { Button } from "./ui/button"; // Assuming you have a custom Button component
import { signOut } from "next-auth/react"; // Assuming you're using next-auth

interface User {
  user: string;
}

const Navbar = ({ user }: User) => {
  const [id, setId] = useState<string | null>(null); // Store the userId from localStorage
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const path = usePathname();
  const role = path.split("/")[1] as "admin" | "user";

  // Fetch userId from localStorage on the client side
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setId(userId);
  }, []);

  const menuItems: Record<
    "admin" | "user",
    { name: string; href: string; icon: JSX.Element }[]
  > = {
    admin: [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: <AiOutlineDashboard />,
      },
      {
        name: "Add Items",
        href: `/admin/addItem/${id}`,
        icon: <MdFastfood />,
      },
      {
        name: "Order History",
        href: `/admin/orders/${id}`,
        icon: <AiOutlineHistory />,
      },
      {
        name: "Earnings",
        href: `/admin/earnings/${id}`,
        icon: <AiOutlineDollar />,
      },
    ],
    user: [
      {
        name: "Items",
        href: `/user/items/${id}`,
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "Orders",
        href: `/user/orders/${id}`,
        icon: <AiOutlineHistory />,
      },
      {
        name: "Cart",
        href: `/user/cart/${id}`,
        icon: <AiOutlineDollar />,
      },
    ],
  };

  const items = menuItems[role] || [];

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
