const express = require('express');
const mineflayer = require('mineflayer');

// سيرفر ويب صغير باش المنصة تعرف أن البوت خدام
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'حط_هنا_IP_ديال_Play_Hosting', // بلا البورت
    port: 25565, // حط البورت ديال السيرفر ديالك هنا
    username: 'AFK_Guardian',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ البوت دخل للسيرفر!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('⚠️ تقطع الاتصال، كيعاود يدخل بعد 10 ثواني...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('خطأ:', err.message));
}

createBot();