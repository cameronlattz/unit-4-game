const starWars = function() {
    let defenderDiv;
    let enemiesDiv;
    let attackDiv;
    let character = -1;
    let defender = -1;
    let characterElements = [];
    const getCharacterName = function(index) {
        if (index === void 0) {
            index = defender;
        }
        const character = characterElements[index];
        return character.querySelector(".name").textContent;
    }
    const getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const clickCharacter = function(characterElement) {

    }
    const findParent = function(element, id) {
        if (element.parentNode.id === id) {
            return element.parentNode;
        } else {
            findParent(element.parentNode, id);
        }
    }
    window.onload = function() {
        enemiesDiv = document.getElementById("enemies");
        defenderDiv = document.getElementById("defender");
        attackDiv = document.getElementById("attack");
        characterElements = document.getElementsByClassName("character");
        for (let i = 0; i < characterElements.length; i++) {
            characterElements[i].addEventListener("click", function() {
                this.setAttribute("disabled", "disabled");
                if (character === -1) {
                    character = i;
                } else {
                    defenderDiv.append(this);
                    defender = i;
                    enemiesDiv.querySelectorAll(".character").forEach(function(enemyCharacter) {
                        enemyCharacter.setAttribute("disabled", "disabled");
                    });
                }
                for (let j = 0; j < characterElements.length; j++) {
                    if (characterElements[j] !== this) {
                        enemiesDiv.append(characterElements[j]);
                    }
                }
            });
        }
        document.getElementById("attackButton").addEventListener("click", function() {
            var damageOut = getRandomInt(0, 25);
            attackDiv.innerHTML = "You attacked " + getCharacterName() + " for " + damageOut + " damage!<br>";
            var damageIn = getRandomInt(0, 25);
            attackDiv.innerHTML += getCharacterName() + " attacked you for " + damageIn + " damage!";
        });
    };
}();