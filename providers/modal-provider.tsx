"use client";

import { StoreModal } from "@/components/modals/store-modal";
import React, { useEffect, useState } from "react";

export default function ModalProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return <StoreModal />;
}
