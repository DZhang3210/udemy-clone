"use client";

import { Heading } from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type OrderClientProps = {
  data: OrderColumn[];
};

export default function OrderClient({ data }: OrderClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="product" />
    </>
  );
}
