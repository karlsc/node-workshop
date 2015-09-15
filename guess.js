var randomNumber = Math.floor(Math.random()*100)+1;

var prompt = require('prompt');

function getSelection(rounds,tryNow){
    
  prompt.start();

  prompt.get(['number'], function (err, result) {

    if(!err){
        
        if(rounds === 1){
            console.log("You failed to find the answer in "+tryNow+" tries. The answer is "+randomNumber);
        } else {
        console.log("Try #"+tryNow+": "+result.number);
        
            if(result.number > randomNumber){
                console.log("The answer is smaller than "+result.number);
                getSelection(rounds-1,tryNow+1);
            } else if (result.number < randomNumber) {
                console.log("The answer is bigger than "+result.number);
                getSelection(rounds-1,tryNow+1);
            } else {
                console.log("Well done! "+randomNumber+" is the answer!");
            }
        }
    } else {
        console.log("Error: "+err);
    }
});
}

prompt.start();

prompt.get(['numTry'], function (err, result) {

    if(!err){
        console.log('You will have '+result.numTry+' tries to find the answer!');
        return getSelection(result.numTry,1);
    } else {
        console.log("Error: "+err);
    }
});