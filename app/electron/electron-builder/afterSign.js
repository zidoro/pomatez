const { notarize } = require("electron-notarize");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin" || !process.env.API_KEY_ID) {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log(`Notarizing App ${appOutDir}/${appName}.app`);

  return await notarize({
    tool: "notarytool",
    appBundleId: "com.roldanjr.pomatez",
    appPath: `${appOutDir}/${appName}.app`,
    appleApiKey: `~/private_keys/AuthKey_${process.env.API_KEY_ID}.p8`,
    appleApiKeyId: process.env.API_KEY_ID,
    appleApiIssuer: process.env.API_KEY_ISSUER_ID,
  });
};
