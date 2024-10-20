const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: 'codm',
    aliases: ['kambing'],
    version: '1.0',
    author: 'burat',
    countDown: 20,
    role: 2,
    shortDescription: 'call of duty random highlights',
    longDescription: 'source from api',
    category: 'other',
    guide: 'video',
  },
  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get('https://codm-api.diciper09.repl.co/codm?apikey=umaru852');
      const ext = response.data.url.substring(response.data.url.lastIndexOf('.') + 1);

      const callback = () => {
        api.sendMessage(
          {
            body: 'Call Of duty Mobile',
            attachment: fs.createReadStream(__dirname + `/cache/codm.${ext}`),
          },
          event.threadID,
          () => fs.unlinkSync(__dirname + `/cache/codm.${ext}`),
          event.messageID
        );
      };

      request(response.data.url).pipe(fs.createWriteStream(__dirname + `/cache/codm.${ext}`)).on('close', callback);
    } catch (err) {
      api.sendMessage('error na bai maya naman', event.threadID, event.messageID);
      api.setMessageReaction('❌', event.messageID, (err) => {}, true);
    }
  },
};
