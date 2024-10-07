import { Loader } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="loader w-full h-full centered">
      <div>
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    </div>
  );
}
