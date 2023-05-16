import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const id = request.query.id as string;
        const { email, password, name } = request.body;
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                email,
                password,
                name,
            },
        })
        return response.status(200).json(updatedUser);
    } catch (error) {
        return response.status(500).json({ error });
    }
}
