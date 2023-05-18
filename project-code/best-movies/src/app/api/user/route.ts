import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// GET ONE SPECIFIC USER
export async function GET(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // Check if email is provided
    if (!email) {
      return new NextResponse("Provide a valid email address", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // Check if user exists
    if (!user) {
      return new NextResponse("User does not exist", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new NextResponse("Could not return the user", { status: 500 });
  }
}

// CREATE A USER ACCOUNT
export async function POST(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Check if email, pass, name is provided
    if (!email || !password || !name) {
      return new NextResponse("Please fill out all the fields", {
        status: 400,
      });
    }

    // Encrypt the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse("Could not create a user account", { status: 500 });
  }
}

// EDIT AN USER ACCOUNT
export async function PATCH(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Check if ID is provided
    if (!id) {
      return new NextResponse("Provide a valid ID", { status: 400 });
    }

    const body = await request.json();
    const { email, password, name } = body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        password,
        name,
      },
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 204 });
  } catch (error) {
    return new NextResponse("Could not save the edited user", { status: 500 });
  }
}

// GET TEST USER
// export async function GET(request: NextApiRequest, response: NextApiResponse) {
//     try {
//         const user = await prisma.user.findFirst({
//             where: {
//                 email: 'dp@email.com'
//             }
//         });
//         return new Response(JSON.stringify(user), { status: 200 });
//     } catch (error) {
//         return new Response("Could not return test user", { status: 500 });
//     }
// }
