import withPWA from "next-pwa";

const withPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

export default withPwa({
  reactStrictMode: true,
});
