var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight.toLowerCase() === 'skip') {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            if (confirmSkip) {
                window.alert(`${playerName} has decided to skip this fight. Goodbye!`);
                playerMoney = playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
        var playerDamage = randomNumber(playerAttack - 3, playerAttack);
        console.log(playerDamage);
        enemyHealth = Math.max(0, enemyHealth - playerDamage);
        console.log(`${playerName} attacked ${enemyName}. ${enemyName} now has ${enemyHealth} health.`);
        if (enemyHealth <= 0) {
            window.alert(`${enemyName} has died!`);
            playerMoney += 20;
            break;
        } else {
            window.alert(`${enemyName} still has ${enemyHealth} health left.`);
        }
        
        var enemyDamage = randomNumber(enemyAttack - 3, enemyAttack);
        console.log(enemyDamage);
        playerHealth = Math.max(0, playerHealth - enemyDamage);
        console.log(`${enemyName} attacked ${playerName}. ${playerName} now has ${playerHealth} health.`);
        if (playerHealth <= 0) {
            window.alert(`${playerName} has died!`);
            break;
        } else {
            window.alert(`${playerName} still has ${playerHealth} health left.`);
        }
    }
};

var startGame = function() {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert(`Welcome to Robot Gladiators! Round ${i + 1}`);
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        
        var pickedEnemyName = enemyNames[i];
        enemyHealth = randomNumber(40, 60);
        fight(pickedEnemyName);
        
        if (playerHealth > 0 && i < enemyNames.length -1 ) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            if (storeConfirm) {
                shop();
            }
        }
    }
    endGame();
};

var endGame = function() {
    if (playerHealth > 0) {
        window.alert(`Great job, you've survived the game! You now have a score of ${playerMoney}.`)
    } else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL you health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    switch(shopOptionPrompt.toLowerCase()) {
        case "refill":
            if (playerMoney > 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth += 20;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars");
                playerAttack += 6;
                playerMoney -= 7;
            } else {
                window.alert("You don't have enough money!");
            }
            break;
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

startGame();