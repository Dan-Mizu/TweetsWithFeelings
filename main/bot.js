//Dependencies
var config = require('./config');
var Sentencer = require('sentencer');
var txtgen = require('txtgen');
var readline = require('readline');
var Twit = require('twit');
var T = new Twit(config);

//Variable Calling
var tweetContent;
var loopN = 1;
var eFeelings = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','☺️','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','💀','💩'];

//Randomizer Function
function getRandomInt(min, max) {
    min -= 1;
    max -= 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Bot Has Initiated
console.log (
    '********** TweetsWithFeelings Bot Init **********\n'
);

//Starts the Tweet Cycle
startLoop(60 * 60);

//Loop Function
function startLoop(loopTime) {
    tweetFeelings();
    var bufferTime = loopTime;
    var bufferAmount = 0;
    process.stdout.write('Loop Timer: ' + bufferTime);
    var countdownTimer = setInterval(function () {
        readline.cursorTo(process.stdout, 0);
        bufferTime -= 1;
        process.stdout.write('Loop Timer: ' + bufferTime);
        bufferAmount += 1;
        if (bufferTime <= 0) {
            clearInterval(countdownTimer);
            readline.clearLine(process.stdout);
            readline.cursorTo(process.stdout, 0);
            console.log('Buffer Time: ' + bufferAmount + '\n\n\n');
            loopN += 1;
            startLoop(loopTime);
        }
    }, 1000);
}

//The Actual Tweeting Part Thing
function tweetFeelings() {
    tweetContent = txtgen.sentence() + '\n\n--Feeling: ' + Sentencer.make('{{ adjective }} ') + eFeelings[getRandomInt(1, eFeelings.length)];
    T.post('statuses/update', { status: tweetContent }, tweetInfo);
}

//This tells me if the tweet sent and what it was
function tweetInfo(err, data, response) {
    if (err) {
        console.log('\n >Error Tweeting.\n');
    } else {
        console.log('__\n >Successfully Tweeted:\n' + tweetContent + '\n__\n');
    }
}