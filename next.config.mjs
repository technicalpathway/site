/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: async () => {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Cross-Origin-Resource-Policy',
              value: 'cross-origin',
            }
          ],
        },
        {
          // Special header configuration for WebContainers route
          source: '/ide/:path*',
          headers: [
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            }
          ],
        }
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
  
  export default nextConfig;
  