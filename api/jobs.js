const { getSocket } = require('./socket');

let jokeCount = 0;

const jokes = [
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25.",
    "Why was the JavaScript developer sad when he used Java? Because it was a bitter 'java' indeed.",
    "What do you call a JavaScript developer who knows how to debug? A 'console' hero.",
    "Why did the JavaScript developer go to the beach? To learn about 'seashells' and 'seaside' properties.",
    "Why did the JavaScript developer keep getting lost? Because he couldn't find his 'null' pointer.",
    "Why did the JavaScript developer quit his job? Because he didn't get 'closure' on his projects.",
    "What do you get when you cross a JavaScript developer with a vampire? A 'bloody' good programmer.",
    "Why did the JavaScript developer get fired from his job at the bank? Because he kept 'withdrawing' his code.",
    "Why do JavaScript developers wear glasses? Because they can't 'C#'"
  ];

const sendJoke = () => {
    const index = jokeCount++ % jokes.length;
    getSocket().emit('user-test', { status:'success', message:jokes[index], timestamp: Date.now()} );
    console.log('Joke sent:' + jokes[index])
}

const runJobs = () => {
    setInterval(sendJoke, 5000);
}

module.exports = {
    runJobs
};
