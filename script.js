//PROGRAM: ELECTION MAP

//Main Variables
var winner = "";

//This is my factory function.
var makePolitician = function (theirName, theirPartyColor)
{
  var politician = {};                            //Object
  
  politician.name = theirName;                    //Property
  politician.electionResults = null;              //Property
  politician.totalVotes = 0;                      //Property
  politician.partyColor = theirPartyColor;        //Property
  politician.countVotes = function()
  {
    for (var i = 0; i < this.electionResults.length; i++)
    {
      this.totalVotes = this.totalVotes + this.electionResults[i];
    }
  }
  return politician;                             //Send new object
}


//Calling factory to make new Politician instances.
var pinkPolitician = makePolitician("Lilia",[132,17,11]);
var purplePolitician = makePolitician("Karlin",[245, 141, 136]);

//Assigning election results to each candidate using arrays.
pinkPolitician.electionResults = [5,1,7,2,33,6,4,2,1,14,8,3,1,11,11,0,5,3,3,3,7,4,8,9,3,7,2,2,4,2,8,3,15,15,2,12,0,4,13,1,3,2,8,21,3,2,11,1,3,7,2];

purplePolitician.electionResults = [4,2,4,4,22,3,3,1,2,15,8,1,3,9,0,6,1,5,5,1,3,7,8,1,3,3,1,3,2,2,6,2,14,0,1,6,7,3,7,3,6,1,3,17,3,1,2,11,2,3,1];


//Update to election results - Florida
pinkPolitician.electionResults[9] = 1;
purplePolitician.electionResults[9] = 28;

//Update to election results - California
pinkPolitician.electionResults[4] = 17;
purplePolitician.electionResults[4] = 38;

//Update to election results - Texas
pinkPolitician.electionResults[43] = 11;
purplePolitician.electionResults[43] = 27;

//Determining each state's winner
var setStateResults = function (state)
{  
  theStates[state].winner = null;
  if (pinkPolitician.electionResults[state] > purplePolitician.electionResults[state])
  {
    theStates[state].winner = pinkPolitician;
  }
  else if (purplePolitician.electionResults[state] > pinkPolitician.electionResults[state])
  {
    theStates[state].winner = purplePolitician;
  }
  else {
    theStates[state].winner = null; 
  }
  
  //After determining winner, we need to update the 
  //state with the winning party color
  var stateWinner = theStates[state].winner;
  
  if (stateWinner != null) 
  {
    theStates[state].rgbColor = stateWinner.partyColor;
  }
  else 
  {
    theStates[state].rgbColor = [11, 32, 57];
  }
  
  //Updating the statesResults Table
  //First get variables assigned to appropriate children in Table
  //Then update html
  var stateInfoTable = document.getElementById('stateResults');

  var header = stateInfoTable.children[0].children[0];
  
  var stateName = header.children[0];
  stateName.innerText = theStates[state].nameFull;
  
  var stateAbbrev = header.children[1];
  stateAbbrev.innerText = theStates[state].nameAbbrev;
  
  var body = stateInfoTable.children[1];
  
  var name1 = body.children[0].children[0];
  name1.innerText = pinkPolitician.name;
  
  var results1 = body.children[0].children[1];
  results1.innerText = pinkPolitician.electionResults[state];
  
  var name2 = body.children[1].children[0];
  name2.innerText = purplePolitician.name;
  
  var results2 = body.children[1].children[1];
  results2.innerText = purplePolitician.electionResults[state];
  
  var winnerName = body.children[2].children[1];
  if (stateWinner != null) 
  {
    winnerName.innerText = stateWinner.name;
  }
  else 
  {
    winnerName.innerText = "DRAW";
  }
}

//Count the votes!
pinkPolitician.countVotes();
purplePolitician.countVotes();

//Determine winner.
if (pinkPolitician.totalVotes >= 270 && purplePolitician.totalVotes <= 269)
{
  winner = pinkPolitician.name;
  console.log("The winner of the election is: " + winner);
}
else if (purplePolitician.totalVotes >= 270 && pinkPolitician.totalVotes <=269)
{
  winner = purplePolitician.name;
  console.log("The winner of the election is: " + winner);
}
else
{
  winner = "DRAW";
  console.log("We have a draw!");
}

//Updating countryResults Table
var table = document.getElementById('countryResults');
table.children[0].children[0].children[0].innerText = pinkPolitician.name;
table.children[0].children[0].children[1].innerText = pinkPolitician.totalVotes;
table.children[0].children[0].children[2].innerText = purplePolitician.name;
table.children[0].children[0].children[3].innerText =
purplePolitician.totalVotes;
table.children[0].children[0].children[5].innerText = winner;

//end of script