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
    [`Leave`, `char1TryLeave`],
  ]
);
const char1Listen = new path(
  `char1Listen`,
  [
    `You creep closer to them to try and figure out what they are talking about.`,
    `You move quietly towards the direction of the voices and crouch behind some shelves. `,
    `You can't make out some parts but hear them talking about setting up a camp. "A safe area", they called it.`,
    `You've heard enough.`
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Head back to your camp.`, `char1TryLeave`],
    [`Go say hi`, `char1Talk`]
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
    [`Go say hi`, `char1Talk`]
  ]
);
const char1Talk = new path(
  `char1Talk`,
  [
    `You slowly emerge from behind the shelves and see the group.`,
    `There's four of them - two male and two female.`,
    `They call out to you first.`,
    `A man in a dark gray shirt and black jeans, seemingly the leader, says they mean no harm, and they offer you a sandwich.`
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [
    [`Accept the sandwich.`, `char1Sandwich`],
    [`Refuse the sandwich`, `char1NoSandwich`]
  ]
);

const char1Sandwich = new path(
  `char1Sandwich`,
  [
    `You take a sandwich and sit down in a circle with them.`,
    `They introduce themselves - Elliot, the leader; Leah; Victor; and Tessa.`,
    `They tell you their story - they've been traveling as a group of six, but two of them have gone missing.`,
    `The group tells you how they hope to set up a permanent shelter.`,
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence, and small camps were easier to move.`
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [
    [`Bid them farewell.`, `char1Farewell`]
  ]
);
const char1NoSandwich = new path(
  `char1NoSandwich`,
  [
    `You refuse a perfectly good sandwich, but still sit down with them as they eat.`,
    `They introduce themselves - Elliot, the leader; Leah; Victor; and Tessa.`,
    `They tell you their story - they've been traveling as a group of six, but two of them have gone missing.`,
    `The group tells you how they hope to set up a permanent shelter.`,
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence, and small camps were easier to move.`
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [
    [`Bid them farewell.`, `char1Farewell`]
  ]
);
const char1Farewell = new path(
  `char1Farewell`,
  [
    `You find an excuse and dimiss yourself.`,
    `You head back to your camp after making sure they aren't tailing you.`,
    `The camp is a little area set up in a backroom in a long-abandoned cornerstore.`,
    `Curling up in a sleeping bag, you drift to sleep.`
  ],
  `url(images/backgrounds/Elena's-corner-store-camp.jpg)`,
  [
    [`You die in your sleep.`, `dead`]
  ]
);

const pathChar2 = new path(
  `pathChar2`,
  [
    `You've run out of supplies.`,
    `There is a supermarket nearby. You should visit. Dog can keep you company and help you in this search`,
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
    [`Break it open`, `char2ObtainHatchet`],
  ]
);

const char2ObtainHatchet = new path(
  `charObtainHatchet`,
  [
    `You break the glass and grab the hatchet. Just as you start to walk away you hear a loud unsettling sound.`,
    `It's a shrieker and it's blocking your way.`
  ],
  [
    [``]
  ]
)

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

const char2BackToCamp = new path(
  `char2BackToCamp`,
  [
    `You move quietly, avoiding the glass on the ground that could make your presence known.`,
    `You successfuly avoid getting caught and get out of the store.`,
    `Your search for today has ended. Now it is time to head back to your camp.`,
    `Once you get home you remember the hunting traps you had set up nearby.`
  ],
  [
    [`Go check on the traps`, `char2CheckTraps`]
  ]
)

const char2CheckTraps = new path(
  `charCheckTraps`,
  [
    `The walking distance is not that far. Dogs follows right behind as you walk towards the traps.`,
    `Everything seems normal when out of nowhere a loud sound catches your attention.`,
    `A cry of help soon follows.`,
    `You run towards the direction of the commotion. You see a young man on the ground and a shrieker not so far from him.`,
    `The shrieker is about to attack him.`
  ],
  [
    [`Leave. There is nothing you can do`, `char2Ignore`],
    [`Distract the shrieker`, `charDistractShrieker`]
  ]
)

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
    [`Say you don't do delivery`, `char3FiredBecauseNoWork`],
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
    [`Go to xxx First St.`, `char3FiredBecauseAddress`],
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

const char3FiredBecauseNoWork = new path(
  `char3FiredBecauseNoWork`,
  [
    `You tell them you don't feel like doing delivery right now.`,
    `Instead, you tell them very politely to come to the pizzeria to pick it up.`, 
    `You are fired!`
  ],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

const char3FiredBecauseAddress = new path(
  `char3FiredBecauseAddress`,
  [
    `You went to the the wrong address.`, 
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
  char1Talk,
  char1Sandwich,
  char1NoSandwich,
  char1Farewell,
  dead,
  char2Supermarket,
  char2Clothing,
  char2Medicine,
  char2Weapon,
  char2Continue,
  char2ListenToConv,
  char2BackToCamp,
  char2CheckTraps,
  char3AnswerCall,
  char3Delivery,
  char3FiredBecauseAddress,
  char3FiredBecauseNoWork
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
    let txt = getPath(each[1]).image.split('(')[1].split(')')[0];
    const img = new Image();
    img.src = txt;
    options.append(link);
  }
  console.log('loading complete');
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

function onLoad(){
  titleShadow();
}