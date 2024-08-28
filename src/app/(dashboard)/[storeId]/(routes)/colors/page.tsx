import React from "react";
import { db } from "@/server/db";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";
import ColorsClient from "./components/client";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
}
