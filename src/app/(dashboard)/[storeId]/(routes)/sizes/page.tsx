import React from "react";
import { db } from "@/server/db";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import SizeClient from "./components/client";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}
