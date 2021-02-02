const functions = require('firebase-functions');
const mailgun = require("mailgun-js");

var mailgunInfo = {
  private: functions.config().mailgun.private,
  domail: functions.config().mailgun.domain,
  sender: functions.config().mailgun.sender
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

  send () {
    const data = {
      from: mailgunInfo.sender,
      to: emailData.receiver,
      subject: emailData.subject,
      template: emailData.template,
      'h:X-Mailgun-Variables': {
        download_link: emailData.downloadLink
      }
    };
    const mg = mailgun({apiKey: mailgunInfo.private, domain: mailgunInfo.domain});
    mg.messages().send(data, function (error) {
      console.log(error);
    });
  }
}

module.exports = Mail;
