const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
  token: 'xoxb-375466395091-376618410487-aQIS5uxf4BU1MKkLKoe27ffv',
  name: 'jokebot'
})

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  bot.postMessageToChannel('general', 'Get Ready To Laugh with @Jokebot', params)
})

// Error Handler
bot.on('error', err => console.log(err))

// Message Handler
bot.on('message', data => {
  if(data.type !== 'message'){
    return 
  }
  handleMessage(data.text)
})

// Respond to Data
function handleMessage(message){
  if(message.includes(' chucknorris')) {
    chuckJoke()
  } else if(message.includes(' yomomma')) {
    yoMommaJoke()
  } else if (message.includes(' random')) {
    randomJoke()
  } else if (message.includes(' help')) {
    runHelp()
  }
}

// Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random/')
  .then(res => {
    const joke = res.data.value.joke
    const params = {
      icon_emoji: ':laughing:'
    }
    bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params)
  })
}

// Tell Yo Momma Joke
function yoMommaJoke() {
  axios.get('http://api.yomomma.info')
  .then(res => {
    const joke = res.data.joke
    const params = {
      icon_emoji: ':laughing:'
    }
    bot.postMessageToChannel('general', `Yo Momma: ${joke}`, params)
  })
}

// Tell Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1
  if(rand === 1) {
    chuckJoke()
  } else if (rand === 2) {
    yoMommaJoke()
  }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  }

  bot.postMessageToChannel('general', `Type @jokebot with either 'chucknorris', 'yomomma' or 'random' to get a joke`, params)
}