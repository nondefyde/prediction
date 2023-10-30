const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants');
/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    const isProd =
        (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) &&
        process.env.STAGING !== '1';
    // when `next build` or `npm run build` is used
    const isStaging =
        (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) &&
        process.env.STAGING === '1';

    console.log(
        `isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}   phase:${phase}`
    );

    const env = {
        NEXT_PUBLIC_APP_BASE_URL: (() => {
            if (isDev) {
                return 'http://localhost:4000/v1';
            }
            if (isProd) {
                return 'https://cntci-service.weoutsyde.app/v1';
            }
            return 'https://cntci-service.weoutsyde.app/v1';
        })(),
    };
    return {
        env,
        webpack: (
            config,
            { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
        ) => {
            config.resolve.alias.canvas = false;
            config.resolve.alias.encoding = false;
            config.module.rules.push({
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
              });
            // Important: return the modified config
            return config;
        },
    };
};

module.exports = nextConfig
