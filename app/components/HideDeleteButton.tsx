import { DropdownMenu } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React from "react";

interface Props {
  handleDelete: () => void;
}

const HideDeleteButton = ({ handleDelete }: Props) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <DropdownMenu.Item
      className="cursor-pointer p-2 hover:bg-gray-100 hover:text-black"
      onClick={handleDelete}
    >
      delete
    </DropdownMenu.Item>
  );
};

export default HideDeleteButton;
