import ProfileSettings from "@/src/_components/ProfileSettings";
import { auth } from "@/src/_lib/auth";
import { getUser } from "@/src/_lib/data-service";





export default async function Page() {
    const session = await auth()
      if (!session) throw new Error("You must be logged in.");
     const customer = await getUser(session.user.email);
    return (
        <div>
            <ProfileSettings session={session} customer={customer}/>
        </div>
    );
}