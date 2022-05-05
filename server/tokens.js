const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = config => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

const videoToken = (userIdentity, roomSID, config) => {
  const videoGrant = new VideoGrant({ roomSID });

  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = userIdentity;

  return token;
};

module.exports = { videoToken };
