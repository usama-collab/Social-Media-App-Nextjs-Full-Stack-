"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHome, FaRegHeart } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { VscSaveAll } from "react-icons/vsc";

const SideNavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Home", icon: <FaHome size="20" /> },
    {
      href: "/create-post",
      label: "Create Post",
      icon: <MdPostAdd size="20" />,
    },
    { href: "/people", label: "People", icon: <BsFillPeopleFill size="20" /> },
    {
      href: "/saved-posts",
      label: "Saved Posts",
      icon: <VscSaveAll size="20" />,
    },
    {
      href: "/liked-posts",
      label: "Liked Posts",
      icon: <FaRegHeart size="20" />,
    },
  ];
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li
          key={link.href}
          className={
            currentPath === link.href
              ? "bg-blue-800 text-white rounded"
              : "border-l-amber-50"
          }
        >
          <Link
            href={link.href}
            className="flex items-center space-x-4 py-1 px-5 border-spacing-4"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideNavLinks;
