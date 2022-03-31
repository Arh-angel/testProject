const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5155571998:AAEB6sdTjjSNs26hjsDMgPGdz1plLs9l_4g');

bot.on('text', (ctx) => {
  setInterval(() => {
    axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: ctx.message.text,
        appid: 'e779b1719fdfba56697e1c58a4551410',
        units: 'metric',
        cnt: '2',
        lang: 'ru'
      }
    }).then((res) => {
      const arrResult = res.data.list.map((el) => {
        if (el.weather[0].main === 'Snow') {
          return res.data.city.name + ' ' + el.weather[0].description + ' до ' + el.dt_txt
        }
      });
        if(arrResult.length > 0) {
          ctx.reply(arrResult[arrResult.length - 1])
        }
    });
  }, 3600000);
});

bot.launch();