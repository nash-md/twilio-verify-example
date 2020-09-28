const twilio = require('twilio');

class ChallengeManager {
  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.challenges = new Map();
  }

  async create(user, fields) {
    console.log('identity: ', user.id);

    const details = JSON.stringify({
      message: 'Please approve the login request',
      fields: fields
    });

    const challenge = await this.client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .entities(user.id)
      .challenges.create({
        factorSid: user.factor.sid,
        details: details
      });

    this.challenges.set(challenge.sid, challenge.status);

    return challenge;
  }
  // TODO, get from API?
  async getFromApi(user, sid) {
    return await this.client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .entities(user.id)
      .challenges(sid)
      .fetch();
  }

  get(sid) {
    return this.challenges.get(sid);
  }

  update(sid, status) {
    this.challenges.set(sid, status);
  }
}

module.exports = ChallengeManager;
