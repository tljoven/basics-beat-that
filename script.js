//set max players
//u can change max players number to take in how many players you want
var MAXPLAYERS = 3;
//set current player number
var PLAYERNUMBER = 1;
//set gamestates --> 0 = new roll, 1= choose order
var GAMESTATE = 0;
//set final array results
var FINAL = [];
//set variables to store dice rolls
var DICEONE = 0;
var DICETWO = 0;

//Generate dice roll function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//Generate 2 random numbers for current player
var playerRolls = function () {
  DICEONE = rollDice();
  DICETWO = rollDice();
  return DICEONE, DICETWO;
};

//check if the user needs to order his/her numbers generated
//increase player number and states accordingly is rolls are the same
//append results to FINAL array if rolls are the same
//check if it is last user and if need to append
var checkForOrdering = function () {
  if (DICEONE == DICETWO && PLAYERNUMBER < MAXPLAYERS) {
    let results = parseInt("" + DICEONE + DICETWO);
    FINAL.push(results);
    GAMESTATE = 0;
    let output = `Hi player ${PLAYERNUMBER}. You rolled ${DICEONE} and ${DICETWO}. Your final result is ${
      FINAL[PLAYERNUMBER - 1]
    }. It is now ${PLAYERNUMBER + 1}'s turn`;
    PLAYERNUMBER += 1;
    return output;
  }

  if (DICEONE != DICETWO) {
    GAMESTATE = 1;
    let output = `Hi player ${PLAYERNUMBER}. You rolled ${DICEONE} for diceroll one and ${DICETWO} for dice roll two. Please choose which number you would like to go first by inputting 1 or 2.`;
    return output;
  }

  if (DICEONE == DICETWO && PLAYERNUMBER == MAXPLAYERS) {
    let results = parseInt("" + DICEONE + DICETWO);
    FINAL.push(results);
    let finalWinner = findWinner();
    let output = `Hi player ${PLAYERNUMBER}. You rolled ${DICEONE} and ${DICETWO}. Your final result is ${
      FINAL[PLAYERNUMBER - 1]
    }. The winner is player ${finalWinner}!`;
    GAMESTATE = 0;
    PLAYERNUMBER = 1;
    FINAL = [];
    DICEONE = 0;
    DICETWO = 0;
    return output;
  }
};

//generate final number based on user input and push to final array
let orderNumbers = function (index) {
  if (index == 1) {
    let results = parseInt("" + DICEONE + DICETWO);
    FINAL.push(results);
    GAMESTATE = 0;
    return results;
  }

  if (index == 2) {
    let results = parseInt("" + DICETWO + DICEONE);
    FINAL.push(results);
    GAMESTATE = 0;
    return results;
  }
};

//find the max value of array to find winner: i will do the lazy version cause no time
//not completed: check for draw results and return multiple winners.
//for this case: i will just assume the first person that got the max value wins!
let findWinner = function () {
  let max = Math.max(...FINAL);
  let index = FINAL.indexOf(max);
  let winningPlayer = index + 1;
  return winningPlayer;
};

//check for gamestates to return the correct Output value
//not completed: input validation --> what if inputs not 1 or 2
var main = function (input) {
  var myOutputValue = "";

  if (GAMESTATE == 0 && PLAYERNUMBER < MAXPLAYERS) {
    let rolls = playerRolls();
    let outputString = checkForOrdering();
    myOutputValue = outputString;
    return myOutputValue;
  }

  if (GAMESTATE == 1 && PLAYERNUMBER < MAXPLAYERS) {
    let resultsOrder = orderNumbers(input);
    myOutputValue = `Player ${PLAYERNUMBER}, you have chosen ${input}. Your final number is ${resultsOrder}. It is now player ${
      PLAYERNUMBER + 1
    }'s turn.`;
    PLAYERNUMBER += 1;
    return myOutputValue;
  }

  if (GAMESTATE == 0 && PLAYERNUMBER == MAXPLAYERS) {
    let rolls = playerRolls();
    let outputString = checkForOrdering();
    myOutputValue = outputString;
    return myOutputValue;
  }

  if (GAMESTATE == 1 && PLAYERNUMBER == MAXPLAYERS) {
    let resultsOrder = orderNumbers(input);
    let finalWinner = findWinner();
    let myOutputValue = `Hi player ${PLAYERNUMBER}, you have chose ${input}. Your final number is ${resultsOrder}. Your final result is ${
      FINAL[PLAYERNUMBER - 1]
    }. The winner is ${finalWinner}! Click submit to play again!`;

    PLAYERNUMBER = 1;
    FINAL = [];
    DICEONE = 0;
    DICETWO = 0;

    return myOutputValue;
  }
};
