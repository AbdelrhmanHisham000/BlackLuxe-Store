import WishlistOverview from "@/src/_components/WishlistOverview";
import { auth } from "@/src/_lib/auth";

export default async function Page() {
  const session = await auth()
    if (!session) {
    return <div className="text-white p-6">Please sign in to view your wishlist.</div>;
  }

  // Convert userId to string
  const sessionForWishlist = {
    user: {
      userId: String(session.user.userId),
    },
  };
  return (
    <div>
      <WishlistOverview session={sessionForWishlist} />
    </div>
  );
}
