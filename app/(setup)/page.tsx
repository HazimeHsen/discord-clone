import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Profile } from "@prisma/client";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  const profile = await initialProfile();

  if (!user) {
    return <RedirectToSignIn />;
  }
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });

  if (server) return redirect(`/servers/${server.id}`);

  return (
    <>
      <InitialModal />
    </>
  );
};

export default SetupPage;
