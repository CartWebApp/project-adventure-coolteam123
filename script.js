const text = document.getElementById('text');
const background = document.getElementById('background');
const options = document.getElementById('options');
const titleScreen = document.getElementById('titleScreen');
let flickerBlur = 300;
let flickerSpread = 30;

let timeoutID;
let timeoutID2;

function path(name, text, image, options) {
    this.name = name;
    this.text = text;
    this.image = image;
    this.options = options;
    this.textNum = 0;
}

const start = new path(
    `start`,
    [
        `You need supplies.`,
        `There is a supermarket nearby.`
    ],
    `url(images/backgrounds/Abandoned-city.jpg)`,
    [
        [`Go to the supermarket`, `path1`],
        [`Procrastinate`, `start`]
    ]
);

let story = start;

const path1 = new path(
    `path1`,
    [
        `You approach the supermarket.`,
        `It doesn't look to be in good shape.`,
        `Maybe you should leave?`
    ],
    `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
    [
        [`Go in`, `path1a`],
        [`Leave`, `start`]
    ]
);

const path1a = new path(
    `path1a`,
    [
        `You are in the supermarket.`,
        `You probably shouldn't be here.`,
        `It feels like it could be dangerous.`
    ],
    `url(images/backgrounds/Abandoned-supermarket.jpg)`,
    [
        [`Look for supplies`, `path1aa`],
        [`Leave`, `path1`]
    ]
);

const path1aa = new path(
    `path1aa`,
    [
        `You're looking for supplies.`,
        `You don't see much.`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        `This is probably enough of a test for now.`
    ],
    `url(images/backgrounds/Abandoned-supermarket.jpg)`,
    [

    ]
);

let paths = [start, path1, path1a, path1aa];

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

function titleShadow(){
    titleSpread();
    titleBlur();
}

function titleBlur(){
    timeoutID = setTimeout(function() {
        flickerBlur += Math.sin(performance.now())*5;
        titleScreen.style.boxShadow = `inset black 0px 0px ${flickerBlur}px ${flickerSpread}px`
        titleBlur();
    }, 10);
    
}

function titleSpread(){
    timeoutID2 = setTimeout(function() {
        flickerSpread += Math.sin(performance.now())*5;
        titleScreen.style.boxShadow = `inset black 0px 0px ${flickerBlur}px ${flickerSpread}px`
        titleSpread();
    }, 5);
}

function leaveMenu(){
    titleScreen.className = "throughBlack";
    setTimeout(function() {
        startGame();
      }, 2500);
}

function startGame(){
    clearTimeout(timeoutID);
    clearTimeout(timeoutID2);
    typeWriter(story.text[story.textNum], text, 40);
    background.style.backgroundImage = story.image;
}

function nextText(){
    if(story.textNum < 0){
        story.textNum ++;
        text.innerHTML = "";
        startGame();
        hideOptions();
    } else{
        if(text.innerHTML.length < story.text[story.textNum].length){
            clearTimeout(timeoutID);
            text.innerText = story.text[story.textNum];
        } else {
            if(story.textNum < (story.text.length-1)){
                story.textNum++;
                text.innerText = "";
                typeWriter(story.text[story.textNum], text, 40);
            } 
        }
    }
    if (story.textNum == (story.text.length-1)) {
        makeOptions();
    }
}

function makeOptions(){
    clearOptions();
    for(each of (story.options)){
        var link = document.createElement("button");
        link.id = each[1];
        link.className = `hover`;
        const text = document.createTextNode(each[0]);

        link.appendChild(text);
        link.onclick = function() { changePath(this.id) };
        options.append(link);
    }
    options.style.visibility = `visible`;
}

function hideOptions(){
    options.style.visibility = `hidden`;
}

function clearOptions(){
    let sections = document.querySelectorAll("#options button")
    for(each of sections){
        each.remove();
    }
}

function changePath(newPath){
    story = getPath(newPath);
    story.textNum = -1;
    nextText();
}

function getPath(pathName){
    for (each of paths) {
        if (each.name == pathName) {
            return each;
        }
    }
}

function typeWriter(messageToShow, targetElement, timeBetween, currentPos = 0) {
    clearTimeout(timeoutID);
    if (currentPos < messageToShow.length) {
        targetElement.innerHTML += messageToShow.charAt(currentPos);
        currentPos++;
        timeoutID = setTimeout(function() { typeWriter(messageToShow, targetElement, timeBetween, currentPos); }, timeBetween);
    }
}