type MediaSizes =
  | "laptopXl"
  | "laptopLg"
  | "laptopMd"
  | "laptopNm"
  | "laptopSm"
  | "laptopXs"
  | "tabletXl"
  | "tabletLg"
  | "tabletMd"
  | "tabletSm"
  | "mobileXl"
  | "mobileLg"
  | "mobileMd"
  | "mobileSm"
  | "mobileXs";

const media: Record<MediaSizes, number> = {
  laptopXl: 1920,
  laptopLg: 1600,
  laptopMd: 1440,
  laptopNm: 1360,
  laptopSm: 1280,
  laptopXs: 1024,
  tabletXl: 900,
  tabletLg: 768,
  tabletMd: 600,
  tabletSm: 480,
  mobileXl: 460,
  mobileLg: 425,
  mobileMd: 375,
  mobileSm: 360,
  mobileXs: 320,
};

Object.keys(media).forEach((key) => {
  const query = (media as any)[key] / 16;
  (media as any)[key] = `@media screen and
                (max-width: ${query}em)`;
});

export default media;
