/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.nhle.com'
            },
        ],
    },
    env: {
        MONGO_URI: process.env.MONGO_URI,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        API_URL: process.env.API_URL,
        URL: process.env.URL
    },
    async rewrites() {
        return [
            {
                source: '/api/nhl/:path*',
                destination: 'https://api-web.nhle.com/v1/player/:path*'
            }
        ]
    }
};

export default nextConfig;
