import { AspectRatio, Card } from "@radix-ui/themes";
import React from "react";

const RightNav = () => {
  return (
    <div className="w-64 pt-10 px-4 top-0 left-0 sticky">
      <h2 className="text-lg font-semibold mb-4">Sponsored</h2>
      <Card className="bg-pink-100 p-4 rounded-lg">
        <div className="mb-4">
          <img
            src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
            alt="Febreze Air Freshener"
            className="object-cover rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">Febreze Air Freshener</h3>
        <p className="text-sm text-gray-600">
          Instant odor fighting and a burst of freshness. Amazing summer scent.
          It is so light and fruity and if you are a scent person it has major
          happy vibes.
        </p>
      </Card>
    </div>
  );
};

export default RightNav;
