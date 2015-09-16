var listOfWords = ["grass","rocks","water","english","dinosaur","dinner","robot","guitar","school","camp","toy","table","juice",
                   "night","train","doctor","rabbit","dance","computer","phone","brick","hockey","sport","poster","lamp","door",
                   "javascript","html","css","internet","house","magic","librairy","bread","butter","snow","summer","happy"];
var randomWord = listOfWords[Math.floor(Math.random() * listOfWords.length)];
var letterComp = [];

for(var i = 0 ; i < randomWord.length ; i++){
    
    letterComp += "_";
}

letterComp = letterComp.split("");

console.log('Find the secret word by making less than 6 wrong guesses!');

var prompt = require('prompt');

function getSelection(fails,guesses){
    
    prompt.start();

    prompt.get(['letter'], function (err, result) {

    if(!err){
        
        if(fails < 5) {
            console.log("Try #"+guesses+": "+result.letter);
        
            for(var i = 0 ; i < randomWord.length ; i++){
            
                if(result.letter === randomWord[i]){
                    console.log("You guessed good!");
                    letterComp[i] = randomWord[i];
                    
                        for(var j = i+1 ; j < randomWord.length ; j++ ){
                            
                            if(result.letter === randomWord[j]){
                                letterComp[j] = randomWord[j];
                                
                                    for(var l = j+1 ; l < randomWord.length ; l++ ){
                                        
                                        if(result.letter === randomWord[l]){
                                            letterComp[l] = randomWord[l];
                                        }
                                    }
                            }
                        }
                    hangmanOutput(fails);
                    console.log(letterComp);
                        if(letterComp.join("") === randomWord){
                            console.log("Congratz! You found the secret word '"+randomWord+"' with "+guesses+" guesses.");
                            return;
                        } else { 
                            return getSelection(fails,guesses+1); 
                        }
                }
            }
            fails++;
            console.log("You guessed wrong!");
            hangmanOutput(fails);
            console.log(letterComp);
            return getSelection(fails,guesses+1);
        } else {
            console.log("You guessed wrong!");
            hangmanOutput(6);
            console.log("You failed to find the secret word. The answer was '"+randomWord+"'.");
        }     
    } else {
        console.log("Error: "+err);
    }
});
}

function hangmanOutput(theHangman){   
    var s = "|=====Y";
    var t = "|     O";
    var u = "|   o-|";
    var v = "|   o-|-o";
    var w = "|     |";
    var x = "|    d";
    var y = "|    d b";
    var z = "|";

    switch(theHangman){
        case 0:
            console.log(s+"\n"+z+"\n"+z+"\n"+z+"\n"+z+"\n"+z);
            break;            
        case 1:
            console.log(s+"\n"+t+"\n"+z+"\n"+z+"\n"+z+"\n"+z);
            break;               
        case 2:
            console.log(s+"\n"+t+"\n"+w+"\n"+w+"\n"+z+"\n"+z);
            break;            
        case 3:
            console.log(s+"\n"+t+"\n"+u+"\n"+w+"\n"+z+"\n"+z);
            break;            
         case 4:
            console.log(s+"\n"+t+"\n"+v+"\n"+w+"\n"+z+"\n"+z);
            break;            
        case 5:
            console.log(s+"\n"+t+"\n"+v+"\n"+w+"\n"+x+"\n"+z);
            break;           
        case 6:
            console.log(s+"\n"+t+"\n"+v+"\n"+w+"\n"+y+"\n"+z);
            break;
        default:
    }
}

getSelection(0,1);