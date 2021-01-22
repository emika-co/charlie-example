const axios = require('axios');
const redis = require("redis");
const functions = require('firebase-functions');
const uuid = require('uuid');
const uuidv4 = uuid.v4;
const base32 = require('base32');

var thaiQR = {
  app: {
    key: '',
    secret: '',
    accessToken: ''
  },
  biller: {
    id: '',
    name: '',
    prefix: ''
  },
  endpoint: ''
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

let ThaiQR = class {
  constructor (accessToken) {
    thaiQR.app.key = functions.config().thaiqr.app.key;
    thaiQR.app.secret = functions.config().thaiqr.app.secret;
    thaiQR.app.accessToken = accessToken;
    thaiQR.biller.id = functions.config().thaiqr.biller.id;
    thaiQR.biller.name = functions.config().thaiqr.biller.name;
    thaiQR.biller.prefix = functions.config().thaiqr.biller.prefix;
    thaiQR.endpoint = functions.config().thaiqr.endpoint;
  }

  static async createInstance (accessToken) {
    if (accessToken) {
      return new ThaiQR(accessToken);
    }
    const client = redis.createClient(
      functions.config().redis.port,
      functions.config().redis.host
    );
    try {
      const accessToken = await client.get(redisKey.accessTokenKey, (error, reply) => {
        if (error) {
          throw error;
        }
        return reply.toString();
      });
      if (accessToken) {
        return new ThaiQR(accessToken);
      } else {
        // AUTH
        const response = await this.getAccessToken();
        const result = response.data;
        // TEST
        if (result.status === 1000) {
          // SET REDIS KEY
          await client.set(redisKey.accessTokenKey, result.data.accessToken, (error) => {
            throw error;
          });
          await client.expireat(redisKey.accessTokenKey, redisKey.accessTokenKeyExpAt);
          return new ThaiQR(result.data.accessToken);
        } else {
          throw new Error(`ThaiQR response code ${result.status}`);
        }
      }
    } catch (error) {
      throw error;
    }
  }
  
  async getAccessToken () {
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
