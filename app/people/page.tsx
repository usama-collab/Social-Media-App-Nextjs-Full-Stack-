import React from "react";
import UsersCards from "./_components/UsersCards";
import { Flex } from "@radix-ui/themes";

const page = () => {
  return (
    <Flex direction="column" align="center" className="w-full">
      <UsersCards />
    </Flex>
  );
};

export default page;
