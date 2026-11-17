const express = require('express');
const mineflayer = require('mineflayer');

// سيرفر ويب صغير باش الاستضافة تعرف أن البوت خدام
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'mcnb.play.hosting',
    port: 25679,
    username: 'AFK_Guardian',
    version: false
  });

  bot.on('spawn', () => {
    console.log('✅ البوت دخل للسيرفر!');
    // كينقز مرة كل 30 ثانية باش السيرفر ما يعتابروش خامل
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
