const OktaJwtVerifier = require("@okta/jwt-verifier");
require("dotenv").config();
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER_URL,
});
const audience = process.env.OKTA_AUDIENCE;
exports.authenticationRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  if (!match) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const accessToken = match[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, audience);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
