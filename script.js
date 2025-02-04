const body = document.querySelector("body");

// Configuring Stylesheet
let styleSheet = document.styleSheets[0];
// Function to add a rule to the main stylesheet using a selector (class, id, etc...) instead of adding a rule to the element itself
function addCSSRule(selector, rules) {
    if (styleSheet.insertRule) {
        styleSheet.insertRule(selector + ' {' + rules + '\n}')
    } else if (styleSheet.addRule) { // For old IE (who even uses that bro 😭)
        styleSheet.addRule(selector, rules, -1);
    }
}

// MAIN CSS RULES
addCSSRule("body", `
    justify-content: center;`)

const numberTiles = document.createElement("input");
numberTiles.setAttribute("type", "text") // text box for number of tiles.

const numberTilesButton = document.createElement("button");
numberTilesButton.textContent = "Create my canvas!"; 

const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas-container"); // main container for tiles.

body.appendChild(numberTiles);
body.appendChild(numberTilesButton);
body.appendChild(canvasContainer);

addTiles(64, 800); 
function addTiles(n, canvasSize) { // canvasSize is a future feature to change the size of the canvas. 800x800 for now.
    for (let index = 0; index < (n); index++) { // creating all the tiles.
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile-" + index);
        tile.setAttribute("id", "tile");
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = "black";
        });
        canvasContainer.appendChild(tile);
    }

    styleSheet.deleteRule(".canvas-container"); // to delete previous setup.
    styleSheet.deleteRule("#tile");
    
    addCSSRule(".canvas-container", `
                display:flex;
                height: 800px;
                width: 800px;
                flex-wrap: wrap;
        `);
    addCSSRule("#tile", `
                width: ` + (800/Math.sqrt(n)) + `px;
                height: ` + (800/Math.sqrt(n)) + `px;
                box-sizing: border-box;
                background-color: #909090;`);
    
}

let numberTilesValue = 0; // just keep this out of the event listener. reminds me of the trauma i had to go through.
numberTilesButton.addEventListener("click", () => {
    canvasContainer.replaceChildren();
    numberTilesValue = numberTiles.value;
    let canvasSize = Math.sqrt(numberTilesValue * 2500);
    addTiles(numberTilesValue, 800);
});


