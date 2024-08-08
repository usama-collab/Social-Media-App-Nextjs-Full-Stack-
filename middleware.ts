export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create-post", "/post/:id+/edit"],
};
