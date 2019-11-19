const SlackBots =require('slackbots');
const axios = require('axios');

const bot= new SlackBots({
    token:'',
    name:'botEcatepunk'
});

bot.on('open',()=>console.log('mi bot esta vivo'));

bot.on('start',()=>{
    bot.postMessageToChannel('general',"esta vivo el bot :smile: ");
});

bot.on('message',async(data)=>{
    if(data.type !=='message' || data.subtype == 'bot_message'
    || !data.text) return
    const args = data.text.split(" ");
    const command = args.splice(1, 1)[0];
    const user_ide = args.splice(0, 1)[0];
    const params = args.join(' ');
    console.log(command,params);

    const res = await axios.get(`http://www.omdbapi.com/?t=${params}&apikey=23ae1e76`);
    if(res.data.Response === 'False') return bot.postMessageToChannel('general','movie not found');
    bot.postMessageToChannel('general', `${res.data.Title}: ${res.data.Poster}`);
    console.log(res.data);
});
