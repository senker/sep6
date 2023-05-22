/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
    images: {
        domains: ['image.tmdb.org']
    }
};

module.exports = nextConfig;
