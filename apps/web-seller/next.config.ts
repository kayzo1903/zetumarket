// next.config.ts
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

// Create the plugin instance
const withNextIntl = createNextIntlPlugin();

// Wrap your NextConfig with the plugin
export default withNextIntl(nextConfig);