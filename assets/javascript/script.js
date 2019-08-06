const starWars = function() {
    let defenderDiv;
    let attackerDiv;
    let infoDiv;
    let attackerIndex = -1;
    let defenderIndex = -1;
    let characterElements = [];

    const getCharacterName = function(index) {
        const character = characterElements[index];
        return character.querySelector(".name").textContent;
    }
    const getCharacterHealth = function(index) {
        const character = characterElements[index];
        var health = character.querySelector(".health").textContent;
        return parseInt(health);
    }
    const getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const clickAttack = function() {
        var damageOut = getRandomInt(0, 25);
        infoDiv.innerHTML = "You attacked " + getCharacterName(defenderIndex) + " for " + damageOut + " damage!<br>";
        character[defenderIndex].querySelector(".health").textContent = getCharacterHealth(defenderIndex) - damageOut;
        var damageIn = getRandomInt(0, 25);
        infoDiv.innerHTML += getCharacterName(defenderIndex) + " attacked you for " + damageIn + " damage!";
    }
    const clickCharacter = function(index) {
        if (attackerIndex === -1) {
            attackerDiv.append(characterElements[index]);
            attackerIndex = index;
            document.getElementById("characterType").innerHTML = "enemy";
        } else if (defenderIndex === -1) {
            defenderDiv.append(characterElements[index]);
            defenderIndex = index;
            document.getElementById("characters").style.display = "none";
            document.getElementById("game").style.display = "flex";
        }
    }
    window.onload = function() {
        defenderDiv = document.getElementById("defender");
        attackerDiv = document.getElementById("attacker");
        infoDiv = document.getElementById("info");
        characterElements = document.getElementsByClassName("character");
        for (let i = 0; i < characterElements.length; i++) {
            characterElements[i].addEventListener("click", function() {clickCharacter(i)});
        }
        document.getElementById("attackButton").addEventListener("click", clickAttack);
    };
}();