//Checks for saved game data
const gameData = {
    money: parseInt(localStorage.getItem("money")) || 0,
    moneyPerSecond:parseInt(localStorage.getItem("moneyPerSecond")) || 0,
    clickPower: parseInt(localStorage.getItem("clickPower")) || 1,
    autoMoney: parseInt(localStorage.getItem("autoMoney")) || 0,
    pressureWasher: parseInt(localStorage.getItem("pressureWasher")) || 0,
    refinery:parseInt(localStorage.getItem("refinery")) || 0,
    clickPowerCost: parseInt(localStorage.getItem("clickPowerCost")) || 20,
    autoMoneyCost:parseInt(localStorage.getItem("autoMoneyCost")) || 100,
    pressureWasherCost: parseInt(localStorage.getItem("pressureWasherCost")) || 1100,
    refineryCost: parseInt(localStorage.getItem("refineryCost")) || 13000,
};

//Text Displays
const moneyDisplay = document.getElementById("currMoney"); 
const moneyPersecondDisplay = document.getElementById("moneyPersecond"); 
const moneyPerClick = document.getElementById("moneyPerClick"); 
const clickPowerupDisplay = document.getElementById("clickPowerupCost");
const autoClickDisplay = document.getElementById("autoClickCost");
const pressureWasherDisplay = document.getElementById("pressureWasherCost"); 
const refineryDisplay = document.getElementById("refineryCost"); 
const upgrade1Owned = document.getElementById("upgrade1amount"); 
const upgrade2Owned = document.getElementById("upgrade2amount"); 
const upgrade3Owned = document.getElementById("upgrade3amount"); 
const upgrade4Owned = document.getElementById("upgrade4amount"); 

//Buttons
const dropperImage = document.querySelector("#funnel");
const clickPowerup = document.querySelector("#clickPower");
const autoClicker = document.querySelector("#autoClicker");
const pressureWasher = document.querySelector("#pressureWasher");
const refinery = document.querySelector("#refinery");
const titleDiv = document.querySelector(".header");

//Sends game data to display

//Statistics
moneyDisplay.textContent = gameData.money;
moneyPerClick.textContent = gameData.clickPower;
moneyPersecondDisplay.textContent = gameData.moneyPerSecond;
//Costs
clickPowerupDisplay.textContent = gameData.clickPowerCost;
autoClickDisplay.textContent = gameData.autoMoneyCost;
pressureWasherDisplay.textContent = gameData.pressureWasherCost;
refineryDisplay.textContent = gameData.refineryCost;
//Owned
upgrade1Owned.textContent = gameData.clickPower;
upgrade2Owned.textContent = gameData.autoMoney;
upgrade3Owned.textContent = gameData.pressureWasher;
upgrade4Owned.textContent = gameData.refinery;

function moneyAdd (profit){
    gameData.money += profit;
    localStorage.setItem("money", gameData.money); 
    moneyDisplay.textContent = Math.trunc(gameData.money);
}
function moneySubtract (amount){
    gameData.money -= amount;
    localStorage.setItem("money", gameData.money);
    moneyDisplay.textContent = Math.trunc(gameData.money);
}
function EnoughMoney(){
    if (gameData.clickPowerCost < gameData.money){
        clickPowerup.style.opacity = 1
    }
    else{
        clickPowerup.style.opacity = 0.5
    }
    if (gameData.autoMoneyCost < gameData.money){
        autoClicker.style.opacity = 1
    }
    else{
        autoClicker.style.opacity = 0.5
    }
    if (gameData.pressureWasherCost < gameData.money){
        pressureWasher.style.opacity = 1
    }
    else{
        pressureWasher.style.opacity = 0.5
    }
    if (gameData.refineryCost < gameData.money){
        refinery.style.opacity = 1
    }
    else{
        refinery.style.opacity = 0.5
    }
}


//Clicking funnel which drops ores into fire
const container = document.querySelector(".main-container");
    dropperImage.addEventListener("click", () => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("ore");
        newSquare.style.left = `${event.clientX}px`; // X position where the square will start
    
        container.appendChild(newSquare);
    
        // Animate the falling effect
        let position = dropperImage.offsetHeight - (dropperImage.offsetHeight * 0.4) ;
        const fallInterval = setInterval(() => {
            position += 2; // Increase the position to simulate falling
            newSquare.style.top = `${position}px`;
    
            if (position >= container.clientHeight - 1) {
                clearInterval(fallInterval); // Stop the animation when square reaches the bottom
                newSquare.remove(); // Remove the square when it reaches the bottom
                moneyAdd(gameData.clickPower);
            }
        }, 1); // Adjust the interval and speed as needed
    }  )

//Clicking ClickPowerUp Upgrade
clickPowerup.addEventListener("click", ()=> {
    if (gameData.money >= gameData.clickPowerCost){
        moneySubtract(gameData.clickPowerCost);
        gameData.clickPower++;
        localStorage.setItem("clickPower", gameData.clickPower); //Saves data for clicking power
        gameData.clickPowerCost = Math.ceil(gameData.clickPowerCost * 1.3);
        localStorage.setItem("clickPowerCost", gameData.clickPowerCost) //Saves data for cost of clicking power upgrade
        clickPowerupDisplay.textContent = gameData.clickPowerCost;
        moneyPerClick.textContent = gameData.clickPower;
        upgrade1Owned.textContent = gameData.clickPower;
    }
})

//Clicking AutoClicker Upgrade
autoClicker.addEventListener("click", ()=> {
    if (gameData.money >= gameData.autoMoneyCost){
        moneySubtract(gameData.autoMoneyCost);
        gameData.moneyPerSecond++;
        gameData.autoMoney++;
        localStorage.setItem("autoMoney", gameData.autoMoney); //Saves data for autoClicker
        localStorage.setItem("moneyPerSecond", gameData.moneyPerSecond);
        gameData.autoMoneyCost = Math.ceil(gameData.autoMoneyCost * 1.15);//Increase price after buying auto clicker
        localStorage.setItem("autoMoneyCost", gameData.autoMoneyCost) //Saves data for cost of autoclicker upgrade
        autoClickDisplay.textContent = gameData.autoMoneyCost;
        moneyPersecondDisplay.textContent = gameData.moneyPerSecond;
        upgrade2Owned.textContent = gameData.autoMoney;
    }
})

//Clicking Pressure Washer Upgrade
pressureWasher.addEventListener("click", ()=> {
    if (gameData.money >= gameData.pressureWasherCost){
        moneySubtract(gameData.pressureWasherCost);
        gameData.moneyPerSecond += 10;
        gameData.pressureWasher++;
        localStorage.setItem("pressureWasher", gameData.pressureWasher); //Saves data for auto money
        localStorage.setItem("moneyPerSecond", gameData.moneyPerSecond);
        gameData.pressureWasherCost = Math.ceil(gameData.pressureWasherCost * 1.15); //Increase price after buying pressure washer
        localStorage.setItem("pressureWasherCost", gameData.pressureWasherCost) //Saves data for cost of autoclicker upgrade
        pressureWasherDisplay.textContent = gameData.pressureWasherCost;
        moneyPersecondDisplay.textContent = gameData.moneyPerSecond;
        upgrade3Owned.textContent = gameData.pressureWasher;
    }
})

//Refinery Upgrade
refinery.addEventListener("click", ()=> {
    if (gameData.money >= gameData.refineryCost){
        moneySubtract(gameData.refineryCost);
        gameData.moneyPerSecond += 95;
        gameData.refinery++;
        localStorage.setItem("refinery", gameData.refinery); //Saves data for auto money
        localStorage.setItem("moneyPerSecond", gameData.moneyPerSecond);
        gameData.refineryCost = Math.ceil(gameData.refineryCost * 1.15); //Increase price after buying pressure washer
        localStorage.setItem("refineryCost", gameData.refineryCost) //Saves data for cost of autoclicker upgrade
        refineryDisplay.textContent = gameData.refineryCost;
        moneyPersecondDisplay.textContent = gameData.moneyPerSecond;
        upgrade4Owned.textContent = gameData.refinery;
    }
})


//Updates money every second based on autoMoney
setInterval(() => {
    moneyAdd(gameData.moneyPerSecond/10);
    EnoughMoney();
}, 100);






