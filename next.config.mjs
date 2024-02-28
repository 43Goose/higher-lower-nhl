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
