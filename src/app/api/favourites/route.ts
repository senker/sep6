import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


// GET ONE SPECIFIC USER
export async function GET(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const email = JSON.stringify(session?.user?.email);
    var cleanedString = email.replace(/"/g, '');
    console.log('LOGGED CLEANED STRING', cleanedString)

    // Check if email is provided
    if (!email) {
      return new NextResponse("Provide a valid email address", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: cleanedString,
      },
    });

    // Check if user exists
    if (!user) {
      return new NextResponse("User does not exist", { status: 404 });
    }

    return new NextResponse(JSON.stringify(user.favourites), { status: 200 });
  } catch (error) {
    return new NextResponse("Could not return the user", { status: 500 });
  }
}
