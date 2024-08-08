"use client";

import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { LogIn, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SideNavBottom = () => {
  const { status, data: session } = useSession();
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            <img
              src={session?.user?.image!}
              width="25"
              height="25"
              className="rounded-full"
            />
            Manage Account
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <button className=" flex items-center p-2 hover:bg-gray-300 rounded">
        {status === "authenticated" && (
          <Link href="/api/auth/signout">
            <Flex align="center">
              <LogOut size={20} className="mr-3" /> Logout
            </Flex>
          </Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">
            <Flex align="center">
              <LogIn size={20} className="mr-3" /> Login
            </Flex>
          </Link>
        )}
      </button>
    </>
  );
};

export default SideNavBottom;
