type MediaSizes = {
  laptopXl: string | number;
  laptopLg: string | number;
  laptopMd: string | number;
  laptopNm: string | number;
  laptopSm: string | number;
  laptopXs: string | number;
  tabletXl: string | number;
  tabletLg: string | number;
  tabletMd: string | number;
  tabletSm: string | number;
  mobileXl: string | number;
  mobileLg: string | number;
  mobileMd: string | number;
  mobileSm: string | number;
  mobileXs: string | number;
};

const media: MediaSizes = {
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
  const query = media[key] / 16;
  media[key] = `@media screen and
                (max-width: ${query}em)`;
});

export default media;
