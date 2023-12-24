import { Suspense } from "react";
import PlaceholderCard from "@/components/manage/placeholder-card";
// import Users from "@/components/manage/users";

import { Payment, columns } from "./columns";
import Users from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Page = async ({}) => {
  const data = await getData();

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold dark:text-white">
            All Users
          </h1>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlaceholderCard key={i} />
              ))}
            </div>
          }
        >
          <Users />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
