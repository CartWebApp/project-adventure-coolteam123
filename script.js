const text = document.getElementById('text');
const background = document.getElementById('background');
const options = document.getElementById('options');

let timeoutID;

const start = new Object();
start.name = 'start';
start.text = [
    `You need supplies.`,
    `There is a supermarket nearby.`
];
start.textNum = 0;
start.image = `url(images/backgrounds/Abandoned-city.jpg)`;
start.options = [
    [`Go to the supermarket`, `path1`],
    [`Procrastinate`, `start`]
];

let story = start;

const path1 = new Object();
path1.name = `path1`;
path1.text = [
    `You appraoch the supermarket.`,
    `It doesn't look to be in good shape.`,
    `Maybe you should leave?`
];
path1.textNum = 0;
path1.image = `url(images/backgrounds/potential-front-view-supermaket.jpg)`;
path1.options = [
    [`Continue on`, `path1a`],
    [`Leave`, `start`]
];

const path1a = new Object();
path1a.name = `path1a`;
path1a.text = [
    `You are in the supermarket.`,
    `You probably shouldn't be here.`,
    `It feels like it could be dangerous.`
];
path1a.textNum = 0;
path1a.image = `url(images/backgrounds/Abandoned-supermarket.jpg)`;
path1a.options = [
    [`Look for supplies`, `path1aa`],
    [`Leave`, `path1`]
];

const path1aa = new Object();
path1aa.name = `path1aa`;
path1aa.text = [
    `You're looking for supplies.`,
    `You don't see much.`,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    `This is probalbly enough of a test for now.`
];
path1aa.textNum = 0;
path1aa.image = `url(images/backgrounds/Abandoned-supermarket.jpg)`;
path1aa.options = [
    // [`Look for supplies`, ``],
    // [`Leave`, `path1`]
];

let paths = [start, path1, path1a, path1aa];

function startGame(){
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