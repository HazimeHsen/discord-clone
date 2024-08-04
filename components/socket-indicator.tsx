"use client";

import React from "react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-600 text-wrap border-none">
        Fallback: Plling every 1s
      </Badge>
    );
  }
  return (
    <Badge variant={"outline"} className="bg-emerald-600 text-wrap border-none">
      Live: Real-time Updates
    </Badge>
  );
};

export default SocketIndicator;
