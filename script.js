const text = document.getElementById('text');
const background = document.getElementById('background');
const options = document.getElementById('options');

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
    [`Look for supplies`, ``],
    [`Leave`, `path1`]
];

let paths = [start, path1, path1a];

function startGame(){
    text.innerText = story.text[story.textNum];
    background.style.backgroundImage = story.image;
}

function nextText(){
    if(story.textNum <= 0){
        background.style.backgroundImage = story.image;
        hideOptions();
    }
    if(story.textNum < (story.text.length-1)){
        story.textNum++;
        text.innerText = story.text[story.textNum];
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