import EditPostDialog from "@/app/components/EditPostDialog";
import CreatePostUpload from "@/app/create-post/_components/CreatePostUpload";
import { Flex } from "@radix-ui/themes";
import React from "react";

const page = () => {
  return (
    <Flex direction="column" align="center" className="w-full">
      {/* <CreatePostTopNav /> */}
      <EditPostDialog />
    </Flex>
  );
};

export default page;
