const twilio = require('twilio');

class DeviceManager {
  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  async token(user) {
    const type = 'push';

    const accessToken = await this.client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .accessTokens.create({
        factorType: type,
        identity: user.id
      });

    return {
      token: accessToken.token,
      serviceSid: process.env.TWILIO_VERIFY_SERVICE_SID,
      identity: user.id,
      factorType: type
    };
  }
}

module.exports = DeviceManager;
