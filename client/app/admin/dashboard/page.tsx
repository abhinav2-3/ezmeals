import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
const page = async () => {
  const { email } = await getSession();
  return <User email={email} />;
};

export default page;
