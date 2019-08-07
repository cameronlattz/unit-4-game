const starWars = function() {
    const boost = 10;

    let defenderDiv;
    let attackerDiv;
    let infoDiv;
    let attackerIndex = -1;
    let defenderIndex = -1;
    let characterElements = [];
    let startingHealth;
    let kills = 0;
    let gameOver = false;
    let roundOver = false;

    const animateValue = function(obj, start, end, duration) {
        const range = end - start;
        let current = start;
        const increment = end > start? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    const getCharacterName = function(characterIndex) {
        const character = characterElements[characterIndex];
        return character.querySelector(".name").textContent;
    }
    const getCharacterHealth = function(characterIndex) {
        const character = characterElements[characterIndex];
        const health = character.querySelector(".health").textContent;
        return parseInt(health);
    }
    const getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const clickAttack = function() {
        if (gameOver) {
            location.reload();
        }
        else if (roundOver) {
            kills++;
            infoDiv.innerHTML = "";
            defenderDiv.removeChild(characterElements[defenderIndex]);
            defenderIndex = -1;
            document.getElementById("game").style.display = "none";
            if (kills === characterElements.length - 1) {
                document.getElementById("characters").style.display = "none;";
                document.getElementById("win").style.display = "block";
            } else {
                document.getElementById("characters").style.display = "block";
            }
        } else {
            document.getElementById("attackButton").style.visibility = "hidden";
            damageCharacter(attackerIndex);
            damageCharacter(defenderIndex);
        }
    }
    const clickCharacter = function(index) {
        if (attackerIndex === -1) {
            attackerDiv.appendChild(characterElements[index]);
            attackerIndex = index;
            document.getElementById("characterType").innerHTML = "enemy";
            startingHealth = getCharacterHealth(attackerIndex);
        } else if (defenderIndex === -1) {
            defenderDiv.appendChild(characterElements[index]);
            defenderIndex = index;
            document.getElementById("characters").style.display = "none";
            document.getElementById("game").style.display = "flex";
            document.getElementById("attackButton").value = "attack!";
            characterElements[attackerIndex].querySelector(".health").textContent = kills * boost + startingHealth;
            roundOver = false;
        }
    }
    const damageCharacter = function(characterIndex) {
        const character = characterElements[characterIndex];
        const damage = getRandomInt(0, 25);
        const health = getCharacterHealth(characterIndex);damage;
        const defenderName = getCharacterName(defenderIndex);
        if (characterIndex === attackerIndex) {
            infoDiv.innerHTML = defenderName + " attacked you for " + damage + " damage!<br>";
            if (health - damage <= 0) {
                infoDiv.innerHTML += "You were killed!<br>";
                document.getElementById("attackButton").value = "retry?";
                characterElements[attackerIndex].classList.add("killed");
                gameOver = true;
            }
        } else {
            infoDiv.innerHTML += "<br>You attacked " + defenderName + " for " + damage + " damage!<br>";
            if (health - damage <= 0) {
                infoDiv.innerHTML += defenderName + " was killed!<br>";
                characterElements[defenderIndex].classList.add("killed");
                if (!gameOver) {
                    document.getElementById("attackButton").value = "continue";
                    roundOver = true;
                }
            }
        }
        if (damage > 0) {
            var healthSpan = character.querySelector(".health");
            animateValue(healthSpan, health, health - damage, 1000);
        }
        setTimeout(function() {
            document.getElementById("attackButton").style.visibility = "visible";
        }, 1500);
        return damage;
    }
    return {
        init: function() {
            window.onload = function() {
                defenderDiv = document.getElementById("defender");
                attackerDiv = document.getElementById("attacker");
                infoDiv = document.getElementById("info");
                characterElements = document.querySelectorAll(".character");
                for (let i = 0; i < characterElements.length; i++) {
                    characterElements[i].addEventListener("click", function() {clickCharacter(i)});
                }
                document.getElementById("attackButton").addEventListener("click", clickAttack);
            };
        }
    }
}();
starWars.init();