import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getUser() {
  const session = await getServerSession(authOptions);
  return session?.user?.name;
}

export default async function Header() {
  const user = await getUser();
  const restuarantName = user || "User";
  return (
    <nav className="w-full flex justify-between items-center px-16 py-4">
      <div className="font-extrabold uppercase">
        {restuarantName}&apos;s Meal
      </div>
      <aside>
        <Navbar user={restuarantName} />
      </aside>
    </nav>
  );
}
