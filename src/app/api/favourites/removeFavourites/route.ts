import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, movieIdToRemove } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return (
        new NextResponse("User not found"),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Remove the movieIdToRemove from the user's favourites array
    const updatedFavourites = user.favourites.filter(
      (id) => id !== movieIdToRemove
    );

    // Update the user's favourites in the database
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { favourites: updatedFavourites },
    });

    let json_response = {
      status: "success",
      data: {
        favourites: updatedUser,
      },
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Feedback with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* export default async function removeFavourites(
  req: NextRequest,
  res: NextResponse
) {
  switch (req.method) {
    case "POST":
      await POST(request);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  } */

/* // GET ONE SPECIFIC USER
export async function GET(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const email = JSON.stringify(session?.user?.email);
    var cleanedString = email.replace(/"/g, '');

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
 */
