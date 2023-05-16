import {prisma} from "@/lib/prisma";
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const data = await prisma.user.findMany();
        return response.status(200).json(data);
    } catch (error) {
        return response.status(500).json({error});
    }
}