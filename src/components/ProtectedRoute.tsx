"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useSyncExternalStore } from "react";
import { getToken } from "../lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const subscribe = () => {
  return () => {};
};

const getClientSnapshot = () => {
  return getToken();
};

const getServerSnapshot = () => {
  return null;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const token = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (token === null) {
      router.replace("/login");
    }
  }, [token, router]);

  if (token === null) {
    return null;
  }

  return <>{children}</>;
}