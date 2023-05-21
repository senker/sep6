import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

// GET ALL USERS
export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const data = await prisma.user.findMany();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("An error occurred", { status: 500 });
    }
}