import React from "react";
import prisma from "@/prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import { Box } from "lucide-react";

// This is a server component because it's inside the "app" directory and does not use client-specific hooks or features
const UsersPage = async () => {
  // Fetch users from the database
  const users = await prisma.user.findMany();

  return (
    <div className="w-full max-w-md">
      <Text size="6">Users</Text>
      {users.map((user) => (
        <Card key={user.id} className="my-2">
          <Flex gap="3" align="center">
            <img
              src={user.image!}
              alt="responsive"
              width={40}
              height={40}
              className="rounded-full"
            />
            <Text as="div" size="2" weight="bold">
              {user.name}
            </Text>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default UsersPage;
