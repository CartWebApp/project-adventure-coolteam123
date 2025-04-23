const text = document.getElementById("text");
const background = document.getElementById("background");
const options = document.getElementById("options");
const historySection = document.getElementById("historySection");
const titleScreen = document.getElementById("titleScreen");
let flickerBlur = 170;
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
  [`Choose your character.`],
  `url(images/backgrounds/Abandoned-city.jpg)`,
  [
    [`Play as char1`, `pathChar1`],
    [`Play as char2`, `pathChar2`],
    [`Play as char3`, `pathChar3`],
  ]
);

let story = start;

const pathChar1 = new path(
  `pathChar1`,
  [
    `You've run out of supplies.`,
    `There's a supermarket nearby - it'd probably be for the best to visit.`
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [
    [`Go in`, `char1Supermarket`],
    [`Procrastinate`, `pathChar1`],
  ]
);

const char1Supermarket = new path(
  `char1Supermarket`,
  [
    `You enter the supermarket.`,
    `The lights are flickering and most of the food seems expired.`,
    `Likely, there won't be much to find. You may need to focus your efforts.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Search for food`, `char1Food`],
    [`Search for medicine`, `char1Medicine`],
    [`Search for weapons`, `char1Weapon`],
  ]
);

const char1Food = new path(
  `char1Food`,
  [
    `You look around the supermarket for food.`,
    `Everything seems expired, or has been infested with bugs.`,
    `Unfortunately you don't find anything and return from your search empty-handed.`
  ],
  `url(images/backgrounds/food.jpg)`,
  [[`Continue on your way`, `char1Continue`]]
);

const char1Medicine = new path(
  `char1Medicine`,
  [
    `You look around the supermarket for medicine.`,
    `You spot a first aid kit attached to a wall.`,
    `You take the first aid kit with you and return from your search.`
  ],
  `url(images/backgrounds/firstaid.jpg)`,
  [[`Continue on your way`, `char1Continue`]]
);

const char1Weapon = new path(
  `char1Weapon`,
  [
    `You look around the supermarket for a weapon.`,
    `It seems unlikely, but suprisingly enough you find a fire hatchet on a wall.`,
    `You try to open the case, but it's locked.`,
    `You could try to break the lock, but the loud noise might bring trouble.`
  ],
  `url(images/backgrounds/axe.jpg)`,
  [
    [`Leave the hatchet`, `char1Continue`],
    [`Break it open`, `dead`],
  ]
);

const dead = new path(
  `dead`,
  [`You died.`],
  `url(images/potential-character-facing-building.jpg)`,
  [[`Replay`, `start`]]
);

const char1Continue = new path(
  `char1Continue`,
  [
    `You continue on your way.`,
    `While walking you hear the faint buzz of talking, and quickly hide behind the shelves.`,
    `It's been a while since you've met people. You want to investigate, but it isn't impossible that the strangers are thieves or even killers.`,
    `In fact, it's likely.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Investigate`, `char1Listen`],
    [`Leave`, `char1Medicine`],
  ]
);
const char1Listen = new path(
  `char1Listen`,
  [
    `You get creep closer to them to try and figure out what they are talking about.`,
    `You move quietly towards the direction of the voices and crouch behind some shelves. `,
    `You can't make out some parts but hear them talking about setting up a camp. "A safe area", they called it.`,
    `You've heard enough.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Head back to your camp.`, `char1TryLeave`],
    [`Go say hi`, ``]
  ]
);
const char1TryLeave = new path(
  `char1TryLeave`,
  [
    `You turn to leave.`,
    `Your foot comes down with a loud crack on a glass bottle.`,
    `They've definetely noticed you now. Might as well introduce yourself.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Head back to your camp.`, `char1TryLeave`],
    [`Go say hi`, ``]
  ]
);

const pathChar2 = new path(
  `pathChar2`,
  [
    `You've run out of supplies.`,
    `There is a supermarket nearby. You should visit.`
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [
    [`Go in`, `char2Supermarket`],
    [`Procrastinate`, `pathChar2`],
  ]
);

const char2Supermarket = new path(
  `char2Supermarket`,
  [
    `You enter the supermarket.`,
    `The lights are flickering and most of the food seems expired.`,
    `Likely, there won't be much to find. You may need to focus your efforts.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Search for sturdy clothing`, `char2Clothing`],
    [`Search for medicine`, `char2Medicine`],
    [`Search for a hatchet`, `char2Weapon`],
  ]
);

const char2Clothing = new path(
  `char2Clothing`,
  [
    `You look around the supermarket for clothes.`,
    `You find a coat and a pair of boots.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [[`Keep looking around`, `char2Continue`]]
);

const char2Medicine = new path(
  `char2Medicine`,
  [
    `You look around the supermarket for medicine. Anything that might be useful.`,
    `You find a first aid kit.`,
    `You take the first aid kit with you and return from your search.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [[`Keep looking around`, `char2Continue`]]
);
const char2Weapon = new path(
  `char2Weapon`,
  [
    `You look around the supermarket for any sort of weapon.`,
    `It seems unlikely, but suprisingly enough you find a fire hatchet on a wall.`,
    `You try to open the case, but it's locked.`,
    `You could try to break the lock, but the loud noise might bring trouble.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Leave the hatchet`, `char2Continue`],
    [`Break it open`, `dead`],
  ]
);

const char2Continue = new path(
  `char2Continue`,
  [
    `You keep looking around the supermarket for any other thing that may be of value.`,
    `While walking you hear the faint buzz of talking, and quickly hide behind the shelves.`,
    `It's been a while since you've met people. You want to investigate, but it isn't impossible that the strangers are thieves or even killers.`,
    `In fact, it's likely.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Investigate`, `char2ListenToConv`],
    [`Leave`, `char2Medicine`],
  ]
);

const char2ListenToConv = new path(
  `char2ListenToConv`,
  [
    `You get creep closer to them to try and figure out what they are talking about.`,
    `You move quietly towards the direction of the voices and crouch behind some shelves. `,
    `You can't make out some parts but hear them talking about setting up a camp. "A safe area," they called it.`,
    `You've heard enough.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [[`Head back to your camp`, ``]]
);

const pathChar3 = new path(
  `pathChar3`,
  [
    `You are working your shift at the pizzeria.`,
    `The phone is ringing. Someone is calling.`
  ],
  `url(images/backgrounds/potential-pizzeria-inside.jpg)`,
  [
    [`Pick up the phone`, `char3AnswerCall`],
    [`Ignore the call`, `pathChar3`],
  ]
);

const char3AnswerCall = new path(
  `char3AnswerCall`,
  [
    `Someone wants to order a pepperoni pizza.`,
    `They say they want it delivered at xxx Fifth st. and they give you their name.`
  ],
  `url(images/backgrounds/potential-pizzeria-inside.jpg)`,
  [
    [`Accept the order`, `char3Delivery`],
    [`Say you don't do delivery`, ``],
  ]
);

const char3Delivery = new path(
  `char3Delivery`,
  [
    `You try to remember and write down the location they gave you.`,
    `You prepare the pizza and get everything ready to head out.`,
    `You are unsure if they said First Street or Fifth Street.`
  ],
  `url(images/backgrounds/potential-pizzeria-outside.jpg)`,
  [
    [`Go to xxx First St.`, `char3Fired`],
    [`Go to xxx Fifth St.`, `char3CorrectLocation`],
  ]
);

const char3CorrectLocation = new path(
  `char3CorrectLocation`,
  [
    `You wrote down the correct address.`,
    `As you keep walking you notice a sketchy group of people gathered around something.`
  ],
  `url(images/backgrounds/potential-pizzeria-outside.jpg)`,
  [
    [`Avoid them.`, `char3ClientOrHomeless`],
    [`Approach them`, `char3SketchyGroup`],
  ]
);

const char3Fired = new path(
  `char3Fired`,
  [
    `You wrote down the wrong address.`, 
    `You are fired!`
  ],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

let paths = [
  start,
  pathChar1,
  pathChar2,
  pathChar3,
  char1Supermarket,
  char1Food,
  char1Medicine,
  char1Weapon,
  char1Continue,
  char1Listen,
  char1TryLeave,
  dead,
  char2Supermarket,
  char2Clothing,
  char2Medicine,
  char2Weapon,
  char2Continue,
  char2ListenToConv,
  char3AnswerCall,
  char3Delivery,
  char3Fired,
];
let history = [];

document.addEventListener("mousemove", (e) => {
  const cursor = document.getElementById("cursor");
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

function titleShadow() {
  titleSpread();
  titleBlur();
}

function titleBlur() {
  timeoutID = setTimeout(function () {
    flickerBlur += Math.sin(performance.now()) * 2;
    titleScreen.style.boxShadow = `inset black 0px 0px ${flickerBlur}px ${flickerSpread}px`;
    titleBlur();
  }, 10);
}

function titleSpread() {
  timeoutID2 = setTimeout(function () {
    flickerSpread += Math.sin(performance.now()) * 2;
    titleScreen.style.boxShadow = `inset black 0px 0px ${flickerBlur}px ${flickerSpread}px`;
    titleSpread();
  }, 5);
}

function leaveMenu() {
  titleScreen.className = "throughBlack";
  setTimeout(function () {
    startGame();
  }, 2500);
}

function startGame() {
  clearTimeout(timeoutID);
  clearTimeout(timeoutID2);
  typeWriter(story.text[story.textNum], text, 40);
  background.style.backgroundImage = story.image;
}

function nextText() {
  if (story.textNum < 0) {
    story.textNum++;
    text.innerHTML = "";
    startGame();
    hideOptions();
  } else {
    if (text.innerHTML.length < story.text[story.textNum].length) {
      clearTimeout(timeoutID);
      text.innerText = story.text[story.textNum];
    } else {
      if (story.textNum < story.text.length - 1) {
        story.textNum++;
        text.innerText = "";
        typeWriter(story.text[story.textNum], text, 40);
      }
    }
  }
  if (story.textNum == story.text.length - 1) {
    makeOptions();
  }
}

function makeOptions() {
  clearOptions();
  for (each of story.options) {
    var link = document.createElement("button");
    link.id = each[1];
    link.className = `hover`;
    const text = document.createTextNode(each[0]);

    link.appendChild(text);
    link.onclick = function () {
      changePath(this.id, each[0]);
    };
    const img = new Image();
    img.backgroundImage = getPath(each[1]).image;
    options.append(link);
  }
  options.style.visibility = `visible`;
}

function showHistory() {
  if (historySection.style.zIndex == 2) {
    historySection.style.zIndex = -2;
  } else {
    clearHistory();
    for (each of history) {
      const text = document.createElement("p");
      const textText = document.createTextNode(each);
      text.className = `historyText`;
      text.append(textText);
      historySection.append(text);
    }
    historySection.style.zIndex = 2;
  }
}

function hideOptions() {
  options.style.visibility = `hidden`;
}

function clearHistory() {
  let sections = document.querySelectorAll("#historySection p");
  for (each of sections) {
    each.remove();
  }
}

function clearOptions() {
  let sections = document.querySelectorAll("#options button");
  for (each of sections) {
    each.remove();
  }
}

function changePath(newPath, optionText) {
  history.push(optionText);
  story = getPath(newPath);
  for (each of story.text) {
    history.push(each);
  }
  story.textNum = -1;
  nextText();
}

function getPath(pathName) {
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
    timeoutID = setTimeout(function () {
      typeWriter(messageToShow, targetElement, timeBetween, currentPos);
    }, timeBetween);
  }
}

// async function preloadImages(imageNames) {
//   imageNames.forEach(name => {
//       const img = new Image();
//       img.src = `${name}`;
//   });
// }

// let images = [
//   `images/backgrounds/abandoned-building-forest.jpg`,
//   `images/backgrounds/abandoned-cabin-2.0.jpg`, 
//   `images/backgrounds/abandoned-cabin-in-woods.jpg`, 
//   `images/backgrounds/abandoned-city-building.jpg`, 
//   `images/backgrounds/Abandoned-city.jpg`, 
//   `images/backgrounds/abandoned-parking lot.jpg`, 
//   `images/backgrounds/Abandoned-supermarket.jpg`, 
//   `images/backgrounds/axe.jpg`, 
//   `images/backgrounds/building-isnide.jpg`, 
//   `images/backgrounds/Elena's-corner-store-camp.jpg`, 
//   `images/backgrounds/firstaid.jpg`, 
//   `images/backgrounds/food.jpg`, 
//   `images/backgrounds/inside of potential building.jpg`, 
//   `images/backgrounds/LuciaG-at-wrong-location.jpg`, 
//   `images/backgrounds/monster&person-in-forest.jpg`, 
//   `images/backgrounds/Potential-finalboss-monster.jpg`, 
//   `images/backgrounds/potential-front-view-supermaket.jpg`, images/backgrounds/potential-hospital-room.jpg images/backgrounds/potential-pizzeria-inside.jpg images/backgrounds/potential-pizzeria-outside.jpg images/backgrounds/Potentialmonster.jpg images/backgrounds/randomTreeITookToTest.jpg images/backgrounds/skeleton-on-couch-2.0.jpg images/backgrounds/skeleton-on-couch.jpg
// ];

function onLoad(){
  titleShadow();
  // preloadImages(images);
}