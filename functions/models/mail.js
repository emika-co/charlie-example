const functions = require('firebase-functions');
const axios = require('axios');
const FormData = require('form-data');

var mailgunInfo = {
  private: functions.config().mailgun.private,
  domail: functions.config().mailgun.domain,
  sender: functions.config().mailgun.sender,
  endpoint: functions.config().mailgun.endpoint
};

var emailData = {
  receiver: '',
  subject: 'การสั่งซื้อสำเร็จ',
  template: 'download-file',
  downloadLink: ''
}

let Mail = class {
  constructor (data) {
    if (data) {
      emailData.receiver = data.receiver
      emailData.downloadLink = data.downloadLink
    }
  }

  async send () {
    const data = new FormData();
    data.append('from', mailgunInfo.sender);
    data.append('to', emailData.receiver);
    data.append('subject', emailData.subject);
    data.append('template', emailData.template);
    data.append('h:X-Mailgun-Variables', JSON.stringify({download_link: emailData.downloadLink}));
    var config = {
      method: 'post',
      url: mailgunInfo.endpoint,
      headers: data.getHeaders(),
      auth: {
        username: 'api',
        password: mailgunInfo.private
      },
      data: data
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.data) {
          throw new Error(error.response.data);
        }
      }
      throw error;
    }
  }
}

module.exports = Mail;
