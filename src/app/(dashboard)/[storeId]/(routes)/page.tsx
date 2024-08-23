import { db } from "@/server/db";
import React from "react";

type DashboardPageProps = {
  params: { storeId: string };
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const store = await db.store.findFirst({
    where: { id: params.storeId },
  });

  return <div>Active Store: {store?.name}</div>;
}
