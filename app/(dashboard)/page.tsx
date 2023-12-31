import CollectionCard from "@/components/collection-card";
import CreateCollection from "@/components/create-collection";
import SadFace from "@/components/icons/sad-face";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const collection = await prisma.collection.findMany({
    include: {
      task: true,
    },
    where: {
      userId: user?.id,
    },
  });

  if (collection.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections created yet.</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollection />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-center gap-5">
      <CreateCollection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {collection.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
