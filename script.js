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
const mainContainer = document.createElement("div");
mainContainer.setAttribute("class", "main-container"); // main container for everything

const numberTiles = document.createElement("input");
numberTiles.setAttribute("type", "text") // text box for number of tiles.

const numberTilesButton = document.createElement("button");
numberTilesButton.textContent = "Create my canvas!"; // actual button to make canvas

const canvasContainer = document.createElement("div");
canvasContainer.setAttribute("class", "canvas-container"); // main container for tiles.

const mainText = document.createElement("h1");
mainText.textContent = "Etch-a-Sketch";
mainText.style.fontSize = "50px";

body.appendChild(mainContainer)
mainContainer.appendChild(mainText);
mainContainer.appendChild(numberTiles);
mainContainer.appendChild(numberTilesButton);
mainContainer.appendChild(canvasContainer);

function getRandomColor() { // random color for tiles
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

addTiles(8, 800); 
function addTiles(n, canvasSize) { // canvasSize is a future feature to change the size of the canvas. 800x800 for now.
    const fragment = document.createDocumentFragment();
    n = n*n;

    for (let index = 0; index < (n); index++) { // creating all the tiles.
        let tile = document.createElement("div");
        tile.setAttribute("class", "tile-" + index);
        tile.setAttribute("id", "tile");
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = getRandomColor();
        });
        fragment.appendChild(tile);
    }
    canvasContainer.appendChild(fragment);

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
                background-color: white;`);
    
}

let numberTilesValue = 0; // just keep this out of the event listener. reminds me of the trauma i had to go through.
numberTilesButton.addEventListener("click", () => {
    canvasContainer.replaceChildren();
    numberTilesValue = numberTiles.value;
    let canvasSize = Math.sqrt(numberTilesValue * 2500);
    addTiles(numberTilesValue, 800);
});


