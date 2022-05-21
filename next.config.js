/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["vickydelk.s3.us-west-1.amazonaws.com"],
    },
};

module.exports = nextConfig;
