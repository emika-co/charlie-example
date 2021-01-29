const axios = require('axios');
const redis = require("redis");
const functions = require('firebase-functions');
const uuid = require('uuid');
const uuidv4 = uuid.v4;
const base32 = require('base32');
const { promisify } = require('util');

var thaiQR = {
  app: {
    key: functions.config().thaiqr.app.key,
    secret: functions.config().thaiqr.app.secret,
    accessToken: ''
  },
  biller: {
    id: functions.config().thaiqr.biller.id,
    name: functions.config().thaiqr.biller.name,
    prefix: functions.config().thaiqr.biller.prefix
  },
  endpoint: functions.config().thaiqr.endpoint
};

var ref3Name = 'CHL1';

var qr = {
  // FIXED QR CODE TYPE
  type: 'PP'
};

var pp = {
  // FIXED PP TYPE
  type: 'BILLERID'
};

var redisKey = {
  accessTokenKey: 'ThaiQRAccessToken',
  // exp 5hr
  accessTokenKeyExpAt: parseInt((+new Date)/1000) + 18000
};

// redis client
const client = redis.createClient(
  functions.config().redis.port,
  functions.config().redis.host
);
client.on('error', (err) => {
  console.error(err);
});
const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
const redisExpireAt = promisify(client.expireat).bind(client);

let ThaiQR = class {
  constructor (accessToken) {
    thaiQR.app.accessToken = accessToken;
  }

  static async createInstance (accessToken) {
    if (accessToken) {
      return new ThaiQR(accessToken);
    }
    try {
      const reply = await redisGet(redisKey.accessTokenKey);
      if (reply) {
        const accessToken = reply.toString();
        if (accessToken) {
          return new ThaiQR(accessToken);
        }
      }
      const response = await this.getAccessToken();
      const result = response.data;
      if (result.status.code === 1000) {
        // SET REDIS KEY
        await redisSet(redisKey.accessTokenKey, result.data.accessToken)
        await redisExpireAt(redisKey.accessTokenKey, redisKey.accessTokenKeyExpAt);
        return new ThaiQR(result.data.accessToken);
      } else {
        throw new Error(`ThaiQR response code ${result.status.code}`);
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAccessToken () {
    const data = JSON.stringify({
      applicationKey: thaiQR.app.key,
      applicationSecret: thaiQR.app.secret
    });
    const headers = {
      'Content-Type': 'application/json',
      'accept-language': 'EN',
      resourceOwnerId: thaiQR.app.key,
      requestUId: uuidv4()
    };
    const config = {
      method: 'post',
      url: `${thaiQR.endpoint}/partners/sandbox/v1/oauth/token`,
      headers: headers,
      data: data
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          throw new Error(error.response.data.description);
        }
      }
      throw error;
    }
  }

  async createQRCode (order) {
    if (!thaiQR.app.accessToken) {
      throw new Error('AccessToken is not found');
    }
    let oid = '';
    let cost = 0;
    if (order) {
      if (order.id && order.item) {
        oid = order.id;
        if (order.item.cost) {
          cost = order.item.cost;
        }
      }
    }
    if (!oid || !cost) {
      throw new Error('Invalid Order');
    }

    const lastFour = oid.substr(oid.length - 4);
    const ref = Math.floor(Date.now() / 1000) + lastFour;
    const source = base32.encode(ref).toUpperCase();
    const ref1 = source.substr(0, source.length / 2);
    const ref2 = source.substr(source.length / 2);
    const ref3 = thaiQR.biller.prefix + ref3Name;
    if (ref1 + ref2 !== source) {
      throw new Error('Invalid Reference');
    }
    const data = {
      qrType: qr.type,
      ppType: pp.type,
      ppId: thaiQR.biller.id,
      amount: cost.toString(),
      ref1: ref1,
      ref2: ref2,
      ref3: ref3
    };
    const headers = {
      'Content-Type': 'application/json',
      'accept-language': 'EN',
      'authorization': `Bearer ${thaiQR.app.accessToken}`,
      'resourceOwnerId': thaiQR.app.key,
      'requestUId': uuidv4()
    };
    const config = {
      method: 'post',
      url: `${thaiQR.endpoint}/partners/sandbox/v1/payment/qrcode/create`,
      headers: headers,
      data: data
    };
    try {
      const response = await axios(config);
      response.data.data.ref1 = ref1;
      response.data.data.ref2 = ref2;
      response.data.data.ref3 = ref3;
      return response;
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          throw new Error(error.response.data.status.description);
        }
      }
      throw error;
    }
  }
}

module.exports = ThaiQR;
