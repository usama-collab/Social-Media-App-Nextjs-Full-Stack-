// import prisma from "@/prisma/client";
// import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// const createUserSchema = z.object({
//   name: z.string().min(1).max(255),
//   email: z.string().email("Invalid email address"), // Text content
// });

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = createUserSchema.safeParse(body);

//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });

//   const newPost = await prisma.user.create({
//     data: {
//       name: body.name,
//       email: body.email,
//     },
//   });

//   return NextResponse.json(newPost, { status: 201 });
// }
