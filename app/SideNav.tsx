import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { TiSocialGithubCircular } from "react-icons/ti";
import SideNavProfile from "./components/SideNavProfile";
import SideNavLinks from "./components/SideNavLinks";
import SideNavBottom from "./components/SideNavBottom";

const SideNav = () => {
  return (
    <Flex
      minWidth="300px"
      justify="start"
      align="center"
      direction="column"
      gap="5"
      // ml="5"
      height="100vh"
      top="0"
      left="0"
      bottom="0"
      position="sticky"
      // className="bg-gray-100"
    >
      <Link href="/" className="flex items-center mt-4 text-lg">
        <TiSocialGithubCircular size={40} />
        UsamaSocial
      </Link>
      <SideNavProfile />
      <SideNavLinks />
      <SideNavBottom />
    </Flex>
  );
};

export default SideNav;
