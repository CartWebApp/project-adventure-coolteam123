const text = document.getElementById("text");
const saveName = document.getElementById("name");
const background = document.getElementById("background");
const options = document.getElementById("options");
const settings = document.getElementById("settings");
const loadOptions = document.getElementById("loadOptions");
const loadSection = document.getElementById("loadSection");
const homeSection = document.getElementById("homeSection");
const inventorySection = document.getElementById("inventorySection");
const saveSection = document.getElementById("saveSection");
const historySection = document.getElementById("historySection");
const titleScreen = document.getElementById("titleScreen");
const timeBar = document.getElementById("loadingBar");
const bossFight = document.getElementById("bossFight");
const bossText = document.getElementById("fightText");
const pHealth = document.getElementById("pHealth");
const pStamina = document.getElementById("pStamina");
const dHealth = document.getElementById("dHealth");
const dStamina = document.getElementById("dStamina");
const attackText = document.getElementById("attack");
const blockText = document.getElementById("block");
const playerActions = document.getElementsByClassName("playerAction");
const nextButton = document.getElementsByClassName("next");
let flickerBlur = 170;
let flickerSpread = 30;
let quickTimeCounter = 0;
let quickTimer = 3;
let playerHealth = 100;
let playerStamina = 100;
let playerDefense = 0;
let darklingHealth = 110;
let darklingStamina = 100;
let darklingDefense = 0;
let darklingPhase = 0;
let coward = false;

let timeoutID;
let timeoutID2;
let intervalId;
let timeoutID3;

let startTime = Date.now();

let inventory = [];

class Item {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
}

class Path {
  constructor(name, text, image, options, item = null) {
    this.name = name;
    this.text = text;
    this.image = image;
    this.options = options;
    this.item = item;
    this.textNum = 0;
  }
}

const start = new Path(
  `start`,
  [`Choose your character.`],
  `url(images/backgrounds/Abandoned-city.jpg)`,
  [
    [`Play as Elena`, `PathChar1`],
    [`Play as Ezekiel`, `PathChar2`],
    [`Play as Lucia`, `PathChar3`],
  ]
);

let story = start;

const PathChar1 = new Path(
  `PathChar1`,
  [
    `You've run out of supplies.`,
    `There's a supermarket nearby - it'd probably be for the best to visit.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [
    [`Go in`, `char1Supermarket`],
    [`Procrastinate`, `PathChar1`],
  ]
);

const char1Supermarket = new Path(
  `char1Supermarket`,
  [
    `You enter the supermarket.`,
    `The lights are flickering and most of the food seems expired.`,
    `Likely, there won't be much to find. You may need to focus your efforts.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Search for food`, `char1Food`],
    [`Search for medicine`, `char1Medicine`],
    [`Search for weapons`, `char1Weapon`],
  ]
);

const char1Food = new Path(
  `char1Food`,
  [
    `You look around the supermarket for food.`,
    `Everything seems expired, or has been infested with bugs.`,
    `Unfortunately you don't find anything and return from your search empty-handed.`,
  ],
  `url(images/backgrounds/food.jpg)`,
  [[`Continue on your way`, `char1Continue`]]
);

const char1Medicine = new Path(
  `char1Medicine`,
  [
    `You look around the supermarket for medicine.`,
    `You spot a first aid kit attached to a wall.`,
    `You take the first aid kit with you and return from your search.`,
  ],
  `url(images/backgrounds/firstaid.jpg)`,
  [[`Continue on your way`, `char1Continue`]],
  new Item("First-Aid Kit", "")
);

const char1Weapon = new Path(
  `char1Weapon`,
  [
    `You look around the supermarket for a weapon.`,
    `It seems unlikely, but suprisingly enough you find a fire hatchet on a wall.`,
    `You try to open the case, but it's locked.`,
    `You could try to break the lock, but the loud noise might bring trouble.`,
  ],
  `url(images/backgrounds/axe.jpg)`,
  [
    [`Leave the hatchet`, `char1Continue`],
    [`Break it open`, `dead`],
  ]
);

const dead = new Path(
  `dead`,
  [`You died.`],
  `url(images/backgrounds/dead-graves.jpg)`,
  [[`Replay`, `start`]]
);

const char1Continue = new Path(
  `char1Continue`,
  [
    `You continue on your way.`,
    `While walking you hear the faint buzz of talking, and quickly hide behind the shelves.`,
    `It's been a while since you've met people. You want to investigate...`, 
    `but it isn't impossible that the strangers are thieves or even killers.`,
    `In fact, it's likely.`,
  ], 
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Investigate`, `char1Listen`],
    [`Leave`, `char1TryLeave`],
  ]
);
const char1Listen = new Path(
  `char1Listen`,
  [
    `You creep closer to them to try and figure out what they are talking about.`,
    `You move quietly towards the direction of the voices and crouch behind some shelves. `,
    `You can't hear everything but do hear something about a camp. "A safe area", they called it.`,
    `You've heard enough.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Head back to your camp.`, `char1TryLeave`],
    [`Go say hi`, `char1Talk`],
  ]
);
const char1TryLeave = new Path(
  `char1TryLeave`,
  [
    `You turn to leave.`,
    `Your foot comes down with a loud crack on a glass bottle.`,
    `They've definetely noticed you now. Might as well introduce yourself.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [[`Go say hi`, `char1Talk`]]
);
const char1Talk = new Path(
  `char1Talk`,
  [
    `You slowly emerge from behind the shelves and see the group.`,
    `There's four of them - two male and two female.`,
    `They call out to you first.`,
    `A man, seemingly the leader, says they mean no harm, and they offer you a sandwich.`,
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [
    [`Accept the sandwich.`, `char1Sandwich`],
    [`Refuse the sandwich`, `char1NoSandwich`],
  ]
);

const char1Sandwich = new Path(
  `char1Sandwich`,
  [
    `You take a sandwich and sit down in a circle with them.`,
    `They introduce themselves - Elliot, the leader; Leah; Victor; and Tessa.`,
    `They've been traveling as a group of six, but two of them have gone missing.`,
    `The group tells you how they hope to set up a permanent shelter.`,
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence.`,
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [[`Bid them farewell.`, `char1Farewell`]]
);
const char1NoSandwich = new Path(
  `char1NoSandwich`,
  [
    `You refuse a perfectly good sandwich, but still sit down with them as they eat.`,
    `They introduce themselves - Elliot, the leader; Leah; Victor; and Tessa.`,
    `They tell you their story - they've been traveling as a group of six, but two of them have gone missing.`,
    `The group tells you how they hope to set up a permanent shelter.`,
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence.`,
  ],
  `url(images/backgrounds/peopleinstore.jpg)`,
  [[`Bid them farewell.`, `char1Farewell`]]
);
const char1Farewell = new Path(
  `char1Farewell`,
  [
    `You find an excuse and dimiss yourself.`,
    `You head back to your camp after making sure they aren't tailing you.`,
    `The camp is a little area set up in a backroom in a long-abandoned cornerstore.`,
    `Curling up in a sleeping bag, you drift to sleep.`,
  ],
  `url(images/backgrounds/Elena-corner-store-camp.jpg)`,
  [[`Wake up.`, `char1NewDay`]]
);

const char1NewDay = new Path(
  `char1NewDay`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1BeginNewDay`],
    [`Procrastinate`, `notThisAgain`],
  ]
);

const notThisAgain = new Path(
  `notThisAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Procrastinate`, `notThisAgainAgain`],
    ["Get up", `char1BeginNewDay`],
  ]
);

const notThisAgainAgain = new Path(
  `notThisAgainAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Procrastinate`, `pleaseNotThisAgain`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
  ]
);

const pleaseNotThisAgain = new Path(
  `pleaseNotThisAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    [`Procrastinate`, `pleaseNotThisAgainAgain`],
    ["Get up", `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    [`Wither away`, `dead`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
    [`Get up`, `char1BeginNewDay`],
    ["Get up", `char1BeginNewDay`],
  ]
);

const pleaseNotThisAgainAgain = new Path(
  `pleaseNotThisAgainAgain`,
  [`No.`],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [[`Get up`, `char1BeginNewDay`]]
);

const char1BeginNewDay = new Path(
  `char1BeginNewDay`,
  [
    `You decide to head back to the supermarket.`,
    `You gather up your equipment and do some light stretching to wake yourself up.`,
    `Because of your run in with the group you were unable to thoroughly search the place, and you'd like to try again.`,
  ],
  `url(images/backgrounds/cabin-inside.jpg)`,
  [
    ["Go out", "char1ReturnToSupermarket"],
    ["Procrastinate...", "whyIsThisStillAnOption"],
  ]
);

const char1ReturnToSupermarket = new Path(
  `char1ReturnToSupermarket`,
  [
    `You exit your camp and walk over to the supermarket.`,
    `You stop before heading in to take a couple deep breaths.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [["Head in", "char1EnterAgain"]]
);

const whyIsThisStillAnOption = new Path(
  `whyIsThisStillAnOption`,
  [
    `You procrastinate.`,
    `Of course you do.`,
    `...`,
    `You sit there on your sleeping bag without exiting it.`,
    `But that's not enough. That's still too tiring.`,
    `You lay down and snuggle back up in your sleeping bag`,
    `Quickly, your lazy self manages to leave the world behind to the haze of sleep.`,
    `Forever.`,
    `You have an unfortunate stroke while sleeping and never wake up.`,
    `Side Ending 1/5: Lazy`
  ],
  `url(images/backgrounds/cabin-inside.jpg)`,
  [["Accept your fate", "dead"]]
);

const char1EnterAgain = new Path(
  `char1EnterAgain`,
  [
    `You don't make it very far before a loud bang catches your attention.`,
    `It's a shrieker - a dangerous monster that roams these parts. It sounds like its getting closer.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [[`Run!`, `char1RunForIt`]]
);

const char1RunForIt = new Path(
  `char1RunForIt`,
  [
    `You're already running - but its given chase`,
    `You aren't familiar with the supermarket, and aren't sure which direction to go.`,
    `The screamer, slowly but surely, as you feel yourself starting to tire`,
    `You aren't even sure if there's an exit in the back towards where you are running.`,
    `You might just be dooming yourself.`,
    `Suddenly, a voice calls out: "Take a left, then go through the first door on your right!"`,
  ],
  `url(images/backgrounds/shrieker-supermarket.jpg)`,
  [
    ["Trust the unknown voice", "char1Survived"],
    [`Ignore the stranger's words`, `dead`],
  ]
);

const char1Survived = new Path(
  `char1Survived`,
  [
    `You take the turn and see an emergency exit.`,
    `Drawing on the last of your reserves, you sprint through the door and slam it behind you.`,
    `The shrieker continues down the hallway, unaware of your exit.`,
    `The sound of footsteps snap you out of your stupor as a man rounds a corner and walks towards you.`,
    `"Hey. You okay?" he says, looking at you worriedly.`,
    `You recognize the voice. It's the person who helped you out earlier.`
  ],
  `url(images/backgrounds/abandoned-parking-lot.jpg)`,
  [
    [`"Yeah"`, `char1TalkRomanYes`],
    [`"No"`, `char1TalkRomanNo`],
    [`"Who are you?"`, `char1TalkRomanRude`]
  ],
);

const char1TalkRomanYes = new Path(
  `char1TalkRomanYes`,
  [
    `"That's good. These times are pretty stressful, you know?"`,
    `"Oh, almost forgot to introduce myself. The name's Roman. How about you?"`,
    `"I'm with a group... well, I was. We got a little seperated a couple days back. You should join and help me find them!"`, 
    `"I'm sure being part of a group could be helpful to you as well."`
  ],
  `url(images/backgrounds/unknown-people-in-forest.jpg)`,
  [
    [`Join up with him`, `char1GoWithRoman`]
  ]
)

const char1TalkRomanNo = new Path(
  `char1TalkRomanNo`,
  [
    `He freezes, unprepared for such a frank response, but quickly shakes it off.`,
    `"I definetely feel that. Take as much time as you need, alright?`,
    `"Oh, almost forgot to introduce myself. The name's Roman. How about you?"`,
    `"I'm with a group... well, I was. We got a little seperated a couple days back. You should join and help me find them!"`, 
    `"I'm sure being part of a group could be helpful to you as well."`
  ],
  `url(images/backgrounds/unknown-people-in-forest.jpg)`,
  [
    [`Join up with him`, `char1GoWithRoman`]
  ]
)

const char1TalkRomanRude = new Path(
  `char1TalkRomanRude`,
  [
    `"He laughs. "Sorry, guess I forgot to introduce myself, huh?"`,
    `"He reaches out to shake your hand in greeting. "The name's Roman. How about you?"`,
    `"I'm with a group... well, I was. We got a little seperated a couple days back. You should join and help me find them!"`, 
    `"I'm sure being part of a group could be helpful to you as well."`
  ],
  `url(images/backgrounds/unknown-people-in-forest.jpg)`,
  [
    [`Join up with him`, `char1GoWithRoman`]
  ]
)

const char1GoWithRoman = new Path(
  `char1GoWithRoman`,
  [
    `You stay silent for a few minutes, contemplating Roman's suggestion.`,
    `"Okay," you say. Roman just smiles and nods. He offers you some food he had left.`, 
    `You take him to your camp and offer to look for his group in the morning.`,
    `So much has happened today. You should get some rest to help Roman find his group tomorrow morning.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Get some sleep`, `char1NextDay`]]
);

const char1NextDay = new Path(
  `char1NextDay`,
  [
    `You didn't get enough sleep. You stayed alert and kept waking up throughout the whole night.`, 
    `You had to make sure Roman hadn't tricked you and looted your supplies while you were asleep.`,
    `You get out of your sleeping bag and get your supplies prepared. You then look at Roman who is on the other corner, still asleep.`,
    `You wake him up and get your things ready to head out. Roman had mentioned "Foods" as the last place he saw his group.`,
  ],
  `url(images/backgrounds/cabin-inside.jpg)`,
  [[`Go to the supermarket again`, `char1BackToFoods`]]
);

const char1BackToFoods = new Path(
  `char1BackToFoods`,
  [
    `You arrive at the supermarket. You walk towards the entrance, following behind Roman.`,
    `You might as well look for more supplies now that you are here.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Go inside`, `char1Supermarket2`]]
);

const char1Supermarket2 = new Path(
  `char1Supermarket2`,
  [
    `You open the door and head inside.`,
    `You walk quietly, searching the place for any trace of what could lead to Roman's group.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Split your search`, `char1Split`],
    [`Stay together`, `char1Together`],
  ]
);

const char1Together = new Path(
  `char1Together`,
  [
    `You've watched enough horror movies to know what happens if you seperate.`,
    `Roman and you walk through the supermarket, keeping an eye out for signs of his allies.`,
    `Suddenly, he takes sight of something and runs off, leaving you behind.`,
    `You give chase, slowing down when you see Roman with a group of other people.`
  ],
  `url(images/backgrounds/Jacket-and-boots.jpg)`,
  [[`Approach`, `char1MeetGroup`]]
);

const char1Split = new Path(
  `char1Split`,
  [
    `Apparently you haven't watched many horror movies, and you suggest splitting your search for more efficiency.`,
    `You seperate from Roman and walk the supermarket alone.`,
    `A shrieker attacks you from behind and you die.`
  ],
  `url(images/backgrounds/dead-graves.jpg)`,
  [
    [`:(`, `dead`],
  ]
);

const char1MeetGroup = new Path(
  `char1MeetGroup`,
  [
    `As you walk closer to them you recognize the face of a man, around his late 20s.`,
    `It's the group from yesterday.`,
    `Roman starts to introduce you, but you interrupt and tell him you've already met.`,
    `They offer you to sit down and talk.`,
  ],
  `url(images/backgrounds/encounter-group.jpg)`,
  [[`Sit down and talk`, `char1SitDown`]]
);

const char1SitDown = new Path(
  `char1SitDown`,
  [
    `You guys go find a place to sit down.`,
    `The group introduces themselves one more time. Roman mentions how you saved him and the group thanks you.`,
    `"I invited her to join us," says Roman. "She can help us find George and help us form the safe area."`,
    `Elliot tells you about a place they heard about, guarded by a huge shrieker, but potentially safe enough to help you stay alive for years.`,
    `"The place is big and shriekers barely go there," says Leah.`,
    `"We can plant crops there too," adds Victor. They keep telling you about the place when Elliot interupts suggest discussing tomorrow instead.`,
    `He offers you to stay with them in their camp close to the supermarket - but your place would be safer.`,
  ],
  `url(images/backgrounds/encounter-group.jpg)`,
  [
    // [`Go to their camp`, `char1TheirCamp`],
    [`Offer them to stay at your place`, `char1YourCampWithGroup`],
  ]
);

const char1TheirCamp = new Path(
  `char1TheirCamp`,
  [
    `You don't mention your camp and just agree to go with them.`,
    `You will get your things some other time.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Get out of the supermarket`, `char1ParkingLot`]]
);

const char1YourCampWithGroup = new Path(
  `char1YourCampWithGroup`,
  [
    `You offer to them to stay at your camp.`,
    `"It's safer I've rarely encountered any shriekers there," you tell them.`,
    `The group agrees and you guys get out of the store.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Get out of the supermarket`, `char1ParkingLot`]]
);

const char1ParkingLot = new Path(
  `char1ParkingLot`,
  [
    `You take the lead and the group follows you behind, talking to each other and still sharing stories.`,
    `Then Victor, the guy with the spiky short hair and the black long sleeve shirt with the red T-shirt layered on top, starts talking about some George again.`,
    `Roman notices your confused expression and tells you about George.`,
    `"George has been missing for quite some time. We were in the woods and got separated."`,
    `"Tessa was with him when he left to chase a deer he apparently saw, but never came back. She was scared and came to look for us but we never found Geroge," explained Roman.`,
    `"That's the last we saw of him," said Leah.`,
    `"Now that we have found Roman, we can look for George again," said Elliot.`,
    `You stayed silent. The group kept talking about George and the crazy and fun things they did together.`,
  ],
  `url(images/backgrounds/abandoned-parking-lot.jpg)`,
  [[`Keep walking back to your camp.`, `char1HeadBack2`]]
);

const char1HeadBack2 = new Path(
  `char1HeadBack2`,
  [
    `Once you arrive at your camp you warn them about the traps you had set up, the location of the traps to catch animals, and more.`,
    `You set up a fire and they share their food with you.`,
    `Elliot starts talking.`,
    `"Elena, we've been thinking... you seem like you have some skills to have stayed alive all this time.," said Elliot.`,
    `"We'd really appreciate if you could help us look for George," adds Leah.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [
    // [`Accept`, `char2FindGeorge`],
    [`Refuse`, `char1Stay`],
  ]
);

const char1Stay = new Path(
  `char1Stay`,
  [
    `"There is no use. You're lucky enough to have found Roman, but George... is probably already dead."`,
    `"We'll scout the other place you mentioned tomorrow."`,
    `They stay silent. You thank them for the food and then head inside the cabin.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`The next day`, `char1NextDay2`]]
);

const char1NextDay2 = new Path(
  `char1NextDay2`,
  [
    `The next morning, you wake up to find the group already getting ready.`,
    `"I'll show you where the place is located at," says Roman.`,
    `You nod, gather some gear, and head out.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Go look for the safe area`, `char1Scout`]]
);

const char1Scout = new Path(
  `char1Scout`,
  [
    `The walk is long, but eventually, Roman recognizes the are and you arrive.`,
    `You hide behind some bushes in front of the building.`,
    `"You guys stay here with and guard, Roman and I will check it out." You tell them.`,
    `You approach the front door.`,
  ],
  `url(images/backgrounds/abandoned-building-forest.jpg)`,
  [[`Open the door`, `char1HeadInside`]]
);

const char1HeadInside = new Path(
  `char1HeadInside`,
  [
    `You cautiously open the door and head inside with Roman, walking silently.`,
    `Everything is going smoothly. Then-bang! You hear something fall over and a shriek soon follows.`,
  ],
  `url(images/backgrounds/safe-place-entrance.jpg)`,
  [[`Move`, `char1Slip`]]
);

const char1Slip = new Path(
  `char1Slip`,
  [
    `You're about to take a step when you slip on a piece of glass on the floor`,
  ],
  `url(images/backgrounds/front-entrance.jpg)`,
  [[`Run!`, `quickTimeStart`]]
);

const char1GotAway = new Path(
  `char1GotAway`,
  [
    `You let out a sigh of relief as you look behind you.`,
    `It seems like you've managed to get away safely.`,
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go back to the group`, `char1ReturnToGroup`]]
);

const char1ReturnToGroup = new Path(
  `char1ReturnToGroup`,
  [
    `Looking around, you see Roman just a bit away. Seems like he made it out safely as well.`,
    `With your scouting done and no desire to face that monster again, you walk over to the rest of the group and head back to the camp.`,
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [[`Formulate a plan for taking the safe area`, `char1Planning`]]
);

const char1Planning = new Path(
  `char1Planning`,
  [
    `Everyone gathers around at a nearby cornerstore.`,
    `After hours of talking, a plan has been devised. Shriekers normally drift from place to place, and it seems unlikely the darkling has any particular attachment to the place.`,
    `As such, you come up with a plan to drive it out.`,
    `However, it requires a volunteer to risk themselves to distract the monster.`,
    `Currently Roman says he'll do it, but he seems nervous.`,
    `You're a better runner than him, so it'd be safer for you to take the chance... but are you willing to risk it?`
  ],
  `url(images/backgrounds/Elena-corner-store-camp.jpg)`,
  [
    [`Volunteer in his stead`, `char1GoodPlan`],
    [`Let him do it`, `char1BadPlan`]
  ]
);

const char1BadPlan = new Path(
  `char1BadPlan`,
  [
    `You let Roman take the distraction role.`,
    `Everyone goes to bed to rest up, and when the day comes everyone heads out. No time like the present, after all.`,
    `Approaching the mansion, you give Roman a pat on the back. He takes a deep breath to calm himself, then nods to himself and starts to head to position.`
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [
    [`It's time`, `char1WorsePlan`]
  ]
);

const char1GoodPlan = new Path(
  `char1GoodPlan`,
  [
    `After taking the night to rest, everyone heads out. No time like the present, after all.`,
    `Approaching the mansion, Roman gives you a pat on the back. You take a deep breath to calm down, then nod to yourself and head to position.`
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [
    [`It's time`, `char1ContPlan`],
  ]
);

const char1DefeatDarkling1 = new Path(
  `char1DefeatDarkling1`,
  [
    `You did it! You defeated it. That thing is not going to bother you anymore.`,
    `You can finally live here in peace.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You wait a few minutes outside before heading towards the mansion again.`
  ],
  `url(images/backgrounds/place-final-fight1.jpg)`,
  [[`Go back`,`char1GreenEnding`]]
)

const char1GreenEnding = new Path(
  `char1GreenEnding`,
  [
    `When you enter the living room, you see them stand up,they are relived to see you.`,
    `You don't say anything and just smile, which surprises them and gets some laughs out of them.`,
    `Finally you sit down on the sofa and rest.`,
    `As the years pass, you guys reinforce the area with traps, cultivate crops near the backyard, and rarely encounter any shriekers.`,
    `You get closer with your group and enjoy the mansion, having fun everyday until you die of old age.`,
    `Main Ending 3/3: True Ending`
  ],
  `url(images/backgrounds/kitchen.jpg)`,
  [[`Replay`,`start`]]
)

const char1ContPlan = new Path(
  `char1ContPlan`,
  [
    `You go after the darkling. It'll be your job to try to try drive it out of the mansion.`,
    `You stealthily sneak through the mansion until you see it - it seems to be resting.`,
    `You careful line up your throw, and chuck a frying pan at it.`,
    `Startled, the darkling takes off running. It's tired, and doesn't seem to desire conflict at the moment.`,
    `Once he vanishes and all you see is trees and bushes you quickly run back inside.`
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go check on the others`,`char1MoreLore`]]
);

const char1MoreLore = new Path(
  `char1MoreLore`,
  [
    `You go outside and find the others already celebrating. Some are laying on the ground resting and catching their breaths.`,
    `"There is no time to waste, let's examine the place," you tell them. They get up and head inside.`,
    `Elliot and Leah volunteer to hunt for food while the rest of you decide to look around the rooms, verying that there is no other shrieker there.`,
    `While searching the rooms Victor starts talking and starts sharing stories about a similar shriker they encountered once, "...although not as big." he says.`,
    `They keep talking, about an hour goes by, and you finish clearing the place.`
  ],
  `url(images/backgrounds/kitchen.jpg)`,
  [[`Go to the living room`, `char1LivingRoom`]],
)

const char1LivingRoom = new Path(
  `char1LivingRoom`,
  [
    `You go to the living room and sit down on the sofas, waiting for Elliot and Leah to return.`,
    `Leah comes back first holding a dead rabbit by the ears, with a grin on her first.`,
    `She's about to say something when Elliot storms in.`,
    `"It's coming back! I saw it, that thing is heading here again," he warns.`,
    `You are going to have to fight this darkling if you want to keep this place.`
  ],
  `url(images/backgrounds/living-room.jpg)`,
  [[`Go fight the "Darkling"`, `startBossFight`]]
)

const char1WorsePlan = new Path(
  `char1WorsePlan`,
  [
    `You are posed outside the building, along with the others in the group.`,
    `It's your job to ensure the darkling actually leaves.`,
    `You wait for Roman - and wait, and wait, and wait.`,
    `After far to long passes, Victor says he's going to look for Roman.`,
    `Merely minutes later, he staggers through the door with a limp and blood running off his body, the darkling right behind him.`,
    `He only makes it a few more steps before it catches, bursting through the wall. He clearly doesn't survive.`,
    `It seems you'll have to fight.`
  ],
  `url(images/backgrounds/safe-area-inside2.jpg)`,
  [
    [`Fight!`, `startBossFight2`],
  ]
);

const char1RunAway = new Path(
  `char1RunAway`,
  [
    `You decide to run away. It is a hard decision to make but you do.`,
    `You don't think anyone else is going to make it and this is your chance to run so you do.`,
    `The rest of the group doesn't survive their injuries and they sadly pass away.`,
    `You run back to your camp.`,
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [[`Return to your camp`, `char1ReturnAlone`]]
);

const char1ReturnAlone = new Path(
  `char1ReturnAlone`,
  [
    `You run back to your camp, exhausting your feet, but rarely stopping to take breaks.`,
    `You can't belive you left everyone behind.`,
    `Once you arrive you go immediately inside the cabin and sit down in a corner, trying to process everything.`,
    `A few hours pass and you stay in the same corner, staring at the wall. The silence is suddenly interrupted when you hear the sound of someone outside.`,
    `You grab a metal teapot next to you and head outside. You find a stranger on the floor, he looks scared.`,
    `"There is a huge shrieker coming this way, run! Get out of here!" He warns you as he gets up and continues running.`,
    `It looks like you will have to confront the darkling one way or the other. You prepare yourself. You have regrets for leaving the others behind, but you put them away.`,
    `You can deal with the price of you cowardice later.`
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Go fight`, `startBossFight2`]]
);

const char1DefeatDarkling2 = new Path(
  `char1DefeatDarkling2`,
  [
    `You did it! You defeated the monster that seemed undefeatable.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You don't waste your time anymore and go back to your camp, you will move into the new safe area.`,
    `You bring the majority of your things into the new building. You look for a room and spend the night there.`,
    `You can enjoy this mansion by yourself or make it a sanctuary for other people.`,
  ],
  `url(images/backgrounds/ezekiel-room.jpg)`,
  [
    [`Live here alone`, `char1EndAlone`],
    [`Make this place a sanctuary and help other travelers`, `char1Sanctuary`],
  ]
);

const char1EndAlone = new Path(
  `char1EndAlone`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, and Roman.`, 
    `You commemorate them by decorating the rooms with their belongings.`,
    `Years pass and you cultivate crops in your backyard, reinforce your mansion with traps, and live alone until you die in your sleep peacefully.`,
    `Main Ending 1/3: All Alone`
  ],
  `url(images/backgrounds/gravestones1.jpg)`,
  [[`Replay`, `start`]]
);

const char1Sanctuary = new Path(
  `char1Sanctuary`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, and Roman.`, 
    `You commemorate them by decorating the rooms with their belongings and you lock those rooms so no one can enter.`,
    `Years pass and you cultivate crops in your backyard and reinforce your mansion with traps. You create signs to guide travelers to your mansion where you welcome them.`,
    `You meet new people, create a community and help them stay alive. As the years pass and more people come, they build new houses next to your mansion.`,
    `You visit your old group's graves every afternoon and tell stories about them to the new friends you meet.`,
    `Main Ending 2/3: Repentance`
  ],
  `url(images/backgrounds/gravestones1.jpg)`,
  [[`Replay`, `start`]]
);

// ***********Character 2(Ezekiel Valkyrie)-Path and choices***********
const PathChar2 = new Path(
  `PathChar2`,
  [
    `You've run out of supplies.`,
    `There is a supermarket nearby. You should visit. Max, your dog, can keep you company and help you in this search.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [
    [`Go in`, `char2Supermarket`],
    [`Procrastinate`, `PathChar2`],
  ]
);

const char2Supermarket = new Path(
  `char2Supermarket`,
  [
    `You enter the supermarket. Max following you behind.`,
    `The lights are flickering and most of the food seems expired.`,
    `Likely, there won't be much to find. You may need to focus your efforts.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Search for sturdy clothing`, `char2Clothing`],
    [`Search for medicine`, `char2Medicine`],
    [`Search for a weapon`, `char2Weapon`],
  ]
);

const char2Clothing = new Path(
  `char2Clothing`,
  [
    `You look around the supermarket for clothes.`,
    `You find a coat and a pair of boots.`,
  ],
  `url(images/backgrounds/Jacket-and-boots.jpg)`,
  [[`Keep looking around`, `char2Continue`]],
  new Item("Sturdy Clothing", "")
);

const char2Medicine = new Path(
  `char2Medicine`,
  [
    `You look around the supermarket for medicine. Anything that might be useful.`,
    `You find a first aid kit.`,
    `You take the first aid kit with you and return from your search.`,
  ],
  `url(images/backgrounds/firstaid.jpg)`,
  [[`Keep looking around`, `char2Continue`]],
  new Item("First-Aid Kit", "")
);

const char2Weapon = new Path(
  `char2Weapon`,
  [
    `You look around the supermarket for any sort of weapon.`,
    `It seems unlikely, but suprisingly enough you find a fire hatchet on a wall.`,
    `You try to open the case, but it's locked.`,
    `You could try to break the lock, but the loud noise might bring trouble.`,
    `Suddendly a loud bang catches your attention.`,
    `It's a shrieker - a dangerous monster that roams these parts. It sounds like its getting closer. Max starts barking.`,
  ],
  `url(images/backgrounds/axe.jpg)`,
  [
    [`Leave the hatchet. It's not worth it`, `char2Continue`],
    [`Break it open and fight`, `char2ObtainHatchet`],
  ]
);

const char2ObtainHatchet = new Path(
  `char2ObtainHatchet`,
  [
    `You break the glass and grab the hatchet just in time.`,
    `The shrieker is just around the corner of the aisle.`,
    `You run, gripping the hatchet tightly and strike the shrieker just as it was about to make the turn.`,
    `A loud screetch comes out of its mouth. It falls to the ground, wounded.`,
    `You don't think twice to stay. You get up quickly, call out for Max and run.`,
  ],
  `url(images/backgrounds/shrieker-supermarket.jpg)`,
  [[`Run before the shrieker gets up`, `char2Continue`]],
  new Item("Hatchet", "")
);

const char2Continue = new Path(
  `char2Continue`,
  [
    `Some time has passed and you keep looking around the supermarket for any other thing that may be of value.`,
    `While walking you hear the faint buzz of talking, and quickly hide behind the shelves.`,
    `It's been a while since you've met people. You want to investigate, but it isn't impossible that the strangers are thieves or even killers.`,
    `In fact, it's likely.`,
    `To your advantage, you had trained Max to be quiet in times of crisis.`,
  ],
  `url(images/backgrounds/Ezekiel-hiding.jpg)`,
  [
    [`Investigate`, `char2ListenToConv`],
    [`Leave, they could be dangerous`, `char2HeadBack`],
  ]
);

const char2ListenToConv = new Path(
  `char2ListenToConv`,
  [
    `You creep closer to them to try and figure out what they are talking about.`,
    `You command max to say and you move quietly towards the direction of the voices, crouching behind some shelves.`,
    `You can't make out some parts but hear them talking about setting up a camp. "A safe area," they called it.`,
    `You've heard enough.`,
  ],
  `url(images/backgrounds/group-silhouette.jpg)`,
  [[`Head back to your camp`, `char2HeadBack`]]
);

const char2HeadBack = new Path(
  `char2HeadBack`,
  [
    `You move quietly, avoiding the glass on the ground that could make your presence known.`,
    `You successfuly avoid getting caught and get out of the store with Max.`,
    `Your search for today has ended. Now it is time to head back to your camp.`,
    `Once you get home you remember the hunting traps you had set up nearby.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Go check on the traps`, `char2CheckTraps`]]
);

const char2CheckTraps = new Path(
  `char2CheckTraps`,
  [
    `The walking distance is not that far. Max follows right behind as you walk towards the traps.`,
    `Everything seems normal when out of nowhere a loud screetch startles you.`,
    `A cry of help soon follows.`,
    `You run towards the direction of the commotion. You see a young man on the ground and a shrieker not so far from him.`,
    `The shrieker is about to attack him.`,
  ],
  `url(images/backgrounds/Roman-being-attacked.jpg)`,
  [
    [`Leave. There is nothing you can do`, `dead`],
    [`Distract the shrieker`, `char2DistractShrieker`],
    [`Use hatchet and attack.`, `char2Attack`, `doesInventoryHave('Hatchet')`],
  ]
);

const char2Attack = new Path(
  `char2Attack`,
  [
    `You quickly run towards the shrieker, raise your hatchet and smite it.`,
    `It lets out a horrifying scream and runs away.`,
  ],
  `url(images/backgrounds/Roman-being-attacked.jpg)`,
  [[`Get the stranger and run away too`, `char2SaveAlly`]]
);

const char2DistractShrieker = new Path(
  `char2DistractShrieker`,
  [
    `You decide to help by distracting the shrieker.`,
    `You don't know exactly what to do though.`,
  ],
  `url(images/backgrounds/Roman-being-attacked.jpg)`,
  [
    [`Send Max to distract the shrieker`, `maxDead`],
    [`Distract it yourself`, `char2UseItem`],
  ]
);

const maxDead = new Path(
  `maxDead`,
  [
    `Max runs on your command but the shrieker is too fast and strikes him.`,
    `Sadly Max doesn't make it. You have lost your life-long partner and eventually you die too, from sadness.`,
    `Side Ending 2/5: How Could You?`
  ],
  `url(images/backgrounds/Max-dead.jpg)`,
  [[`Replay`, `start`]]
);

const char2UseItem = new Path(
  `char2UseItem`,
  [
    `You take off the new jacket you found today and throw at it the shrieker.`,
    `It attempts to take the jacket off its face but it is struggling.`,
  ],
  `url(images/backgrounds/Roman-being-attacked.jpg)`,
  [
    [
      `Run away with stranger before the shrieker gets the jacket off its face`,
      `char2SaveAlly`,
    ],
  ]
);

const char2SaveAlly = new Path(
  `char2SaveAlly`,
  [
    `You quickly run towards the man on the ground, grab him by the forearm, and start running away.`, 
    `You take him near your cabin and try to avoid showing your camp since he is a stranger afterall.`,
    `"Thank you," he says once you guys stop to rest, while trying to catch his breath. You stay silent.`,
    `"My name is Roman," he says, extending his hand for a handshake.`,
    `You ignore him again and just stare at Max who lays on the ground, resting too. Roman retrieves his hand and wipes the sweat of his forehead instead.`,
    `Roman starts talking once again. He says he was with a group but got lost a few days ago. He was looking for his group members today when he got attacked.`,
    `"You should join us," he suggests.`,
    `"They're probably already dead," you say not interested.`,
    `"You don't know that. They're smart and alive, I know it. If you help me find them we can set up a safe are together," Roman says.`,
    `Helping him could either bring you problems or help you stay alive.`,
    `But why should you join him when you have kept yourself alive for so long?`,
  ],
  `url(images/backgrounds/foggy-forest.jpg)`,
  [
    [`Decline his invitation. You don't need anyone but Max.`, `char2Refuse`],
    [
      `Join him and help him find his group. He can help you stay alive.`,
      `char2Join`,
    ],
  ]
);

const char2Refuse = new Path(
  `char2Refuse`,
  [
    `"No," You say firmly.`,
    `"You should find a place to stay before it gets any darker," you tell him as you start walking away from him.`,
    `You leave him behind and don't look back. A few years pass and you find a safer place to set your camp. Max dies from his old age and you eventually do too.`,
    `Side Ending 3/5: Loner`
  ],
  `url(images/backgrounds/abandoned-building-forest.jpg)`,
  [[`Replay`, `start`]]
);

const char2Join = new Path(
  `char2Join`,
  [
    `You stay silent for a few minutes, contemplating Roman's suggestion.`,
    `"Okay," you say. Roman just smiles and nods. He offers you some food he had left and you give some to Max. You offer to look for his group in the morning.`,
    `You will have to trust him.`,
    `So much has happened today. You should get some rest to help Roman find his group tomorrow morning.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Get some sleep`, `char2NextDay`]]
);

const char2NextDay = new Path(
  `char2NextDay`,
  [
    `You didn't get enough sleep. You stayed alert and kept waking up throughout the whole night.`, 
    `You had to make sure Roman hadn't tricked you and looted your supplies while you were asleep.`,
    `You get out of your sleeping bag and turn your head to check on Max who is laying next to you. You then look at Roman who is on the other corner, still asleep.`,
    `You wake him up and get your things ready to head out. Roman had mentioned "Foods", the supermarket you went to yesterday, as the last place he saw his group.`,
  ],
  `url(images/backgrounds/cabin-inside.jpg)`,
  [[`Go to the supermarket again`, `char2BackToFoods`]]
);

const char2BackToFoods = new Path(
  `char2BackToFoods`,
  [
    `You arrive at the supermarket. You walk towards the entrance with Roman and Max following you behind.`,
    `You might as well look for more supplies now that you are here.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Go inside`, `char2Supermarket2`]]
);

const char2Supermarket2 = new Path(
  `char2Supermarket2`,
  [
    `You open the door and head inside.`,
    `You walk quietly, analyzing the place for any trace of what could lead to Roman's group.`,
  ],
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
  [
    [`Split and go to "Frozen Foods" section`, `char2Split`],
    [`Stay together and go to "Canned Goods" section`, `char2Together`],
  ]
);

const char2Together = new Path(
  `char2Together`,
  [
    `You never find Roman's group, years pass but you guys become a team and die in your sleep.`,
    `Side Ending 4/5: At Least You Aren't Alone`
  ],
  `url(images/backgrounds/dead-graves.jpg)`,
  [[`Replay`, `start`]]
);

const char2Split = new Path(
  `char2Split`,
  [
    `You tell Roman to search in the "Cleaning Supplies" section while you'll search in "Frozen Foods.`,
    `You head towards "Frozen Foods" with Max.`,
    `On your way there you examine your surroundings, trying to find anything that may be helpful.`,
    `You are observing the freezers which had stopped working due to the supermarket not being in an area with electricity which was still limited either way.`,
    `Out of nowhere you hear a squeal followed by clamor. Roman could be in danger.`,
  ],
  `url(images/backgrounds/frozen-foods.jpg)`,
  [
    [`Go look for Roman`, `char2FindRoman`],
    [`Leave the supermarket, He could be dead already.`, `dead`],
  ]
);

const char2FindRoman = new Path(
  `char2FindRoman`,
  [
    `You run with Max and head towards the "Cleaning Supplies" section. You grab a long piece of metal you found on the way, getting ready to protect Roman.`,
    `You make a turn and are about to raise the weapon in your hand but you freeze. You don't see Roman getting attacked.`,
    `You see him hugging people. It's his group.`,
    `You drop your weapon.`,
  ],
  `url(images/backgrounds/encounter-group.jpg)`,
  [[`Get closer and say hi`, `char2MeetGroup`]]
);

const char2MeetGroup = new Path(
  `char2MeetGroup`,
  [
    `As you walk closer to them you recognize the face of a man, around his late 20s.`,
    `It's the group from yesterday, the one discussing the possible safe area.`,
    `Roman introduces you to Elliot, the man you recognized, Leah, a young woman around her 20s, Victor, a young man in his early 20s, and Tessa, who is the youngest.`,
    `They offer you to sit down and talk.`,
  ],
  `url(images/backgrounds/encounter-group.jpg)`,
  [[`Sit down and talk`, `char2SitDown`]]
);

const char2SitDown = new Path(
  `char2SitDown`,
  [
    `You guys go find a place to sit down.`,
    `The group introduces themselves one more time. Roman mentions how you saved him and the group thanks you.`,
    `"I invited him to join us," says Roman. "He can help us find George and help us form the safe area."`,
    `Elliot tells you about a place they heard about, guarded by a huge shrieker, but potentially save enough to help you stay alive for years.`,
    `"The place is big and shriekers barely go there," says Leah.`,
    `"We can plant crops there too," adds Victor. They keep telling you about the place when Elliot interupts. He suggests you guys head back and keep discussing tomorrow.`,
    `He offers you to stay with them in their camp close to the supermarket - but your place would be safer.`,
  ],
  `url(images/backgrounds/encounter-group.jpg)`,
  [
    [`Go to their camp`, `char2TheirCamp`],
    [`Offer them to stay at your place`, `char2YourCampWithGroup`],
  ]
);

const char2TheirCamp = new Path(
  `char2TheirCamp`,
  [
    `You don't mention your camp and just agree to go with them.`,
    `You will get your things some other time.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Get out of the supermarket`, `char2ParkingLot`]]
);

const char2YourCampWithGroup = new Path(
  `char2YourCampWithGroup`,
  [
    `You offer to them to stay at your camp.`,
    `"It's safer I've rarely encountered any shriekers there," you tell them.`,
    `The group agrees and you guys get out of the store.`,
  ],
  `url(images/backgrounds/potential-front-view-supermaket.jpg)`,
  [[`Get out of the supermarket`, `char2ParkingLot`]]
);

const char2ParkingLot = new Path(
  `char2ParkingLot`,
  [
    `You take the lead and the group follows you behind, talking to each other and still sharing stories. You notice Max playing with Tessa.`,
    `Then Victor, the guy with the spiky short hair and the black long sleeve shirt with the red T-shirt layered on top, starts talking about some George again.`,
    `Roman notices your confused expression and tells you about George.`,
    `"George has been missing for quite some time. We were in the woods and got separated.`, 
    `Tessa was with him when he left to chase a deer he apparently saw, but never came back. She was scared and came to look for us but we never found Geroge," explained Roman.`,
    `"That's the last we saw of him," said Leah.`,
    `"Now that we have found Roman, we can look for George again," said Elliot.`,
    `You stayed silent. The group kept talking about George and the crazy and fun things they did together.`,
  ],
  `url(images/backgrounds/abandoned-parking-lot.jpg)`,
  [[`Keep walking back to your camp.`, `char2HeadBack2`]]
);

const char2HeadBack2 = new Path(
  `char2HeadBack2`,
  [
    `Once you arrive at your camp you warn them about the traps you had set up, the location of the traps to catch animals, where to do your business and more.`,
    `You set up a fire and they share their food with you.`,
    `Elliot starts talking.`,
    `"Ezekiel, we've been thinking...you're a hunter and you've had some experience tracking," said Elliot.`,
    `"We'd really appreciate if you could help us look for George," interrupts Leah.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [
    // [`Accept`, `char2FindGeorge`],
    [`Refuse`, `char2Stay`],
  ]
);

const char2Stay = new Path(
  `char2Stay`,
  [
    `"There is no use. You're lucky enough to have found Roman but this George you speak of is not coming back. He's been gone for too long."`,
    `"We'll scout the other place you mentioned tomorrow.`,
    `They stay silent. You thank them for the food and then head inside the cabin.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`The next day`, `char2NextDay2`]]
);

const char2NextDay2 = new Path(
  `char2NextDay2`,
  [
    `The next morning, you wake up to find the group already getting ready.`,
    `"I'll show you where the place is located at," says Roman.`,
    `You nod, whistle for Max and head out.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Go look for the safe area`, `char2Scout`]]
);

const char2Scout = new Path(
  `char2Scout`,
  [
    `The walk is long, but eventually, Roman recognizes the are and you arrive.`,
    `You hide behind some bushes in front of the building.`,
    `"You guys stay here with Max and guard, I'll go check it out with Roman." You tell them.`,
    `You approach the front door.`,
  ],
  `url(images/backgrounds/abandoned-building-forest.jpg)`,
  [[`Open the door`, `charHeadInside`]]
);

const charHeadInside = new Path(
  `charHeadInside`,
  [
    `You cautiously open the door and head inside with Roman, walking silently.`,
    `Everything is going smoothly. Then-bang! You hear something fall over and a shriek soon follows.`,
  ],
  `url(images/backgrounds/safe-place-entrance.jpg)`,
  [[`Move`, `char2Slip`]]
);

const char2Slip = new Path(
  `char2Slip`,
  [
    `You're about to take a step when you slip on a piece of glass on the floor`,
  ],
  `url(images/backgrounds/front-entrance.jpg)`,
  [[`Run!`, `quickTimeStart`]]
);

const char2GotAway = new Path(
  `char2GotAway`,
  [
    `You let out a sigh of relief as you look behind you.`,
    `It seems like you've managed to get away safely.`,
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go back to the group`, `char2TalkPlan`]]
);

const char2TalkPlan = new Path(
  `char2TalkPlan`,
  [
    `You do a quick scan of the back and side of the place and go round it to meet with your group again.`,
    `After hours of talking, a plan has been devised. Shriekers normally drift from place to place, and its unlikely the darkling is particularly attached to the place.`,
    `You could try to drive off the darkling, but that wouldn't end the threat for good.`,
    `Or you could fight the darkling - as unmatched of a fight that seems.`
  ],
  `url(images/backgrounds/green-bushes.jpg)`,
  [
    [`Drive off the darkling`, `char2GoodPlan`],
    [`Fight the darkling`, `char2BadPlan`],
  ]
);

const char2GoodPlan = new Path(
  `char2GoodPlan`,
  [
    `You decided to go in with Max so that group can set traps around the area, leaving only one place open so that the darkling has no option but to leave from there.`,
    `You will have to lead the darkling to the back entrace and corner it so it leaves, you will try to avoid fighting.`,
    `You quickly teach some traps to the group and get ready to go isnide the building again.`,
    `You enter the building and send Max to follow the darkling's smell. You stay alert waiting for Max to come back when all of a sudden you hear a roar and a whimper.`,
    `You run towards the direction of where the sounds came from and find Max on a corner. He is still alive but he is injured.`,
  ],
  `url(images/backgrounds/safe-area-inside2.jpg)`,
  [
    [`Stay and lead the darkling to the back entrance`, `char2ContPlan`],
    [`Run away, Max was a good dog.`, `charRunAway`],
  ]
);

const char2ContPlan = new Path(
  `char2ContPlan`,
  [
    `You quickly grab the frame to your right and throw it at the darkling. It won't do any damage but you hope it makes him leave through the door behind him.`,
    `Just as you predicted, the darkling goes out the back door, it's probably tired and doesn't want to fight.`,
    `You chase him, making sure he doesn't take any unexpected turns, and lead him towards the back door that leads to the garden and into the woods.`,
    `Once he vanishes and all you see is trees and bushes you quickly run back inside. You need to help Max.`,
    `You kneel down next to him and notice his paw is bleeding. Max whimperings but he is going to be okay.`, 
    `You grab some ointment and spread it over the wound, you are not sure if it will work but its all you have. You rip a pice of clothing and wrap it around Max's wound.`
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go check on the others`,`char2MoreLore`]]
);

const char2MoreLore = new Path(
  `char2MoreLore`,
  [
    `Go outside and find the others already celebrating. Some are laying on the ground resting and catching their breaths.`,
    `"There is no time to waste, lets examine the place," you tell them. They get up and head inside.`,
    `"Where's Max?" Asks Roman. You tell him what happened and reassure him he is going to be fine.`,
    `Elliot and Leah volunteer to hunt for food while the rest of you decide to look around the rooms, verying that there is no other shrieker there.`,
    `While searching the rooms Victor starts talking and starts sharing stories about a similar shriker they encountered once, "...although not as big." he says.`,
    `They keep talking, about and hour goes by, and you finish clearing the place.`
  ],
  `url(images/backgrounds/kitchen.jpg)`,
  [[`Go to the living room`, `char2LivingRoom`]],
)

const char2LivingRoom = new Path(
  `char2LivingRoom`,
  [
    `You go to the living room and sit down on the sofas, waiting for Elliot and Leah to return.`,
    `Leah comes back first holding a dead rabbit by the ears, with a grin on her first.`,
    `She's about to say something when Elliot storms in.`,
    `"It's coming back! I saw it, that thing is heading here again," he warns.`,
    `You are going to have to fight this darkling if you want to keep this place.`
  ],
  `url(images/backgrounds/living-room.jpg)`,
  [[`Go fight the "Darkling"`, `startBossFight`]]
)

const char2DefeatDarkling1 = new Path(
  `char2DefeatDarkling1`,
  [
    `You did it! You defeated it. That thing is not going to bother you anymore.`,
    `You can finally live here in peace.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You wait a few minutes outside before heading towards the mansion again.`
  ],
  `url(images/backgrounds/place-final-fight1.jpg)`,
  [[`Go back`,`char2GreenEnding`]]
)

const char2GreenEnding = new Path(
  `char2GreenEnding`,
  [
    `When you enter the living room, you see them stand up,they are relived to see you.`,
    `You don't say anything and just smile, which surprises them and gets some laughs out of them.`,
    `Finally you sit down on the sofa next to Max, someone had brought him in, and rest.`,
    `As the years pass, Max heals and is as happy as ever,you guys reinforce the area with traps, you cultivate crops near the backyard, and rarely encounter any shriekers.`,
    `You get closer with your group and enjoy the mansions, having fun everyday until you die of old age.`,
    `Main Ending 3/3: True Ending`
  ],
  `url(images/backgrounds/green-ending.jpg)`,
  [[`Replay`,`start`]]
)

const char2BadPlan = new Path(
  `char2BadPlan`,
  [
    `You decide to confront the darkling together. You share the few weapons that you have with each other and get ready to go inside once again.`,
    `You enter quietly and send Elliot and Tessa to search for the darkling in a room to the left and send Victor and Leah to search the room to your right.`,
    `Roman, Max, and you head towards the stairs. Everything is going according to plan when out of nowhere a loud roar and screams startle you.`,
    `You go back down the stairs and head to the room on your left. Elliot and Tessa are injured and the darkling is heading towards Leah and Victor who got there before you.`,
    `Max heads towards the darkling but he gets hit.`,
  ],
  `url(images/backgrounds/safe-area-inside2.jpg)`,
  [
    [`Stay and fight`, `dead`],
    [`Run away, they were good people and Max was a good dog`, `charRunAway`],
  ]
);

const charRunAway = new Path(
  `charRunAway`,
  [
    `You decide to run away. It is a hard decision to make but you do.`,
    `You don't think anyone else is going to make it and this is your chance to run so you do.`,
    `The rest of the group and Max don't survive their injuries and they sadly pass away.`,
    `You run back to your camp.`,
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [[`Return to your camp`, `char2ReturnAlone`]]
);

const char2ReturnAlone = new Path(
  `char2ReturnAlone`,
  [
    `You run back to your camp, exhausting your feet, but rarely stopping to take breaks.`,
    `You can't belive you lost your long-life best friend, Max.`,
    `Once you arrive home you go immediately inside your carbin and sit down in a corner, trying to process everything.`,
    `A few hours pass and you stay in the same corner, staring at the wall. The silence is suddenly interrupted when you hear someone outside.`,
    `You grab a metal tea pot next to you and head outside. You find a stranger on the floor, he looks scared.`,
    `"There is a huge shrieker coming this way, run! Get out of here!" He warns you as he gets up and continues running.`,
    `It looks like you will have to confront this darkling one way or the other. You prepare yourself and go look for the darkling. You will have to fight it.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Go fight the "Darkling"`, `startBossFight2`]]
);

const char2DefeatDarkling2 = new Path(
  `char2DefeatDarkling2`,
  [
    `You did it! You defeated the monster that hurt your friends and your best friend Max.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You don't waste your time anymore and go back to your camp, you will move into the new safe area.`,
    `You bring the majority of your things into the new building. You look for a room and spend the night there.`,
    `You can enjoy this mansion by yourself or make it a sanctuary for other people.`,
  ],
  `url(images/backgrounds/ezekiel-room.jpg)`,
  [
    [`Live here alone`, `char2EndAlone`],
    [`Make this place a sanctuary and help other travelers`, `char2Sanctuary`],
  ]
);

const char2EndAlone = new Path(
  `char2EndAlone`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, Roman, and Max.`, 
    `You commemorate them by decorating the rooms with their belongings.`,
    `Years pass and you cultivate crops in your backyard, reinforce your mansion with traps, and live alone until you die in your sleep peacefully.`,
    `The last thing you dream of is Max as a puppy.`,
    `Main Ending 1/3: All Alone`
  ],
  `url(images/backgrounds/Ezekiel-dead.jpg)`,
  [[`Replay`, `start`]]
);

const char2Sanctuary = new Path(
  `char2Sanctuary`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, Roman, and Max.`, 
    `You commemorate them by decorating the rooms with their belongings and you lock those rooms so no one can enter.`,
    `Years pass and you cultivate crops in your backyard and reinforce your mansion with traps. You create signs to guide travelers to your mansion where you welcome them.`,
    `You meet new people, create a community and help them stay alive. As the years pass and more people come, they build new houses next to your mansion.`,
    `You visit your old group's graves every afternoon and tell stories about them to the new friends you meet.`,
    `Main Ending 2/3: Repentance`
  ],
  `url(images/backgrounds/gravestones.jpg)`,
  [[`Replay`, `start`]]
);
// ***********Character 3(Lucia Graves)-Path and choices***********

const PathChar3 = new Path(
  `PathChar3`,
  [
    `You are working your shift at the pizzeria.`,
    `The phone is ringing. Someone is calling.`,
  ],
  `url(images/backgrounds/potential-pizzeria-inside.jpg)`,
  [
    [`Pick up the phone`, `char3AnswerCall`],
    [`Ignore the call`, `PathChar3`],
  ]
);

const char3AnswerCall = new Path(
  `char3AnswerCall`,
  [
    `Someone wants to order a pepperoni pizza.`,
    `They say they want it delivered at xxx Fifth st. and they give you their name.`,
  ],
  `url(images/backgrounds/potential-pizzeria-inside.jpg)`,
  [
    [`Accept the order`, `char3Delivery`],
    [`Say you don't do delivery`, `char3FiredBecauseNoWork`],
  ]
);

const char3FiredBecauseNoWork = new Path(
  `char3FiredBecauseNoWork`,
  [
    `You tell them you don't feel like doing delivery right now.`,
    `Instead, you tell them very politely to come to the pizzeria to pick it up.`,
    `You are fired!`,
    `Main Ending 4/3: Fired`
  ],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

const char3Delivery = new Path(
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

const char3FiredBecauseAddress = new Path(
  `char3FiredBecauseAddress`,
  [`You went to the the wrong address.`, `You are fired!`, `Ending 4/3: Fired`],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

const char3CorrectLocation = new Path(
  `char3CorrectLocation`,
  [
    `You wrote down the correct address.`,
    `As you keep walking you notice a sketchy group of people gathered around something.`,
  ],
  `url(images/backgrounds/potential-pizzeria-outside.jpg)`,
  [
    [`Avoid them`, `char3ClientOrHomeless`],
    [`Approach them`, `char3SketchyGroup`],
  ]
);

const char3SketchyGroup = new Path(
  `char3SketchyGroup`,
  [
    `You walk closer to them and as you do they notice the pizza you are carrying.`,
    `You realize that they might be dangerous and your about to turn back but more come from the back and corner you.`,
    `One guy with a long beard and a bald head raises his hands and tries to grab the pizza box. You quickly flinch away and avoid his hands.`,
    `They want to steal your pizza.`
  ],
  `url(images/backgrounds/sketchy-group.jpg)`,
  [
    [`Threaten them with your knife`, `char3BeatUp`],
    [`Threaten to ban them from the pizzeria`, `char3LootThem`]
  ]
)

const char3BeatUp = new Path(
  `char3BeatUp`,
  [
    `They beat you up and steal the pizza. The worst thing is that you are FIRED!`,
    `Ending 4/3: Fired`
  ],
  `url(images/backgrounds/sketchy-group.jpg)`,
  [[`Replay`, `start`]]
)

const char3LootThem = new Path(
  `char3LootThem`,
  [
    `They get scared and start walking away but you notice one holding a mysterious bag.`
  ],
  `url(images/backgrounds/sketchy-group.jpg)`,
  [
    [`Leave them as quickly as you can`, `char3ClientOrHomeless`],
    [`Steal their bag and make a run for it`, `char3FirstAidKit`]
  ]
)

const char3FirstAidKit = new Path(
  `char3FirstAidKit`,
  [
    `As the man starts walking you quickly run towards him and snatch the bag from him and make a run for it.`, 
    `You tightly hold the pizza box on one hand and the bag you stole on the other while running as fast as you can.`,
    `You keep running towards the direction you were heading and after a few minutes you stop and start walking again.`,
    `You open the bag and find a beanie, but you also notice a familiar looking container, it's a first aid kit!`
  ],
  `url(images/backgrounds/lucia-walking2.jpg)`,
  [[`Keep looking for client`, `char3ClientOrHomeless`]],
  new Item("First-Aid Kit", ""),
  new Item("Beanie", "")
)

const char3ClientOrHomeless = new Path(
  `char3ClientOrHomeless`,
  [
    `You decide to keep walking and don't look back. After a few more minutes you notice your client.`,
    `However you also see someone on the side of the street. It's a young man who seems to be around his early to mid 20s.`,
    `He looks very tired.`,
    `He could really use that pizza right now.`,
  ],
  `url(images/backgrounds/lucia-walking2.jpg)`,
  [
    [`Give the pizza to the client`, `givePizzaToClient`],
    [`Give the pizza to the starving stranger`, `givePizzaToStranger`],
  ]
);

const givePizzaToClient = new Path(
  `givePizzaToClient`,
  [
    `You decide to do your job and give the pizza to your client.`,
    `Your mission is complete and you live your whole life working at the pizzeria until you die from eating too much pizzas.`,
  ],
  `url(images/backgrounds/pizza-to-client.jpg)`,
  [[`Replay`, `start`]]
);

const givePizzaToStranger = new Path(
  `givePizzaToStranger`, 
  [
  `You decide to be kind and give the pizza to the starving stranger.`,
  `Out of nowhere a van comes from the side of the street, a man sticks his head out and yells,"You're FIRED!"`,
  `The van leaves as quickly as it came, leaving the young man you met and you dumbfounded.`,
  `You sigh and sit down on the curb. The young man opens the pizza box and starts eating.`,
  `"My name is Roman. Thank you for the food," he says.`,
  `"I'm Lucia," you introduce yourself.`,
  `After he finishes eating, Roman starts talking again.`, 
  `He tells you about his group of friends and how he was on his way back to his camp after looking for some food but got too tired from walking and decided to sit down.`,
  `He was disappointed becuase he didn't find anything to eat.`,
  `"You should join us," he suggests.`
  ],
  `url(images/backgrounds/homeless-man.jpg)`,
  [
    [`Join him, you don't have anything else to do`, `char3Join`],
    [`Decline, you don't feel like walking`, `char3Decline`]
  ]
);

const char3Decline = new Path(
  `char3Decline`,
  [
    `You decline Roman's offer say goodbye.`,
    `You live the rest of your life trying to look for a job until you die of boredom.`
  ],
  `url(images/backgrounds/lucia-bored.jpg)`,
  [[`Replay`, `start`]]
)

const char3Join = new Path(
  `char3Join`,
  [
    `"okay, why not?"`,
    `"Nice!"Exclaims roman and hands you the last slice of pizza.`,
    `You guys get up and start walking. Roman takes the lead and you follow him.`,
    `"My group is staying at an abandoned house, but we constantly move places. We are looking for a safe place to stay permanently," he explains.`
  ],
  `url(images/backgrounds/homeless-man.jpg)`,
  [[`Keep walking`, `charMeetGroup`]]
)
const charMeetGroup = new Path(
  `charMeetGroup`,
  [
    `You arrive at Roman's camp. Its an old shabby house far away from everything, close to the woods. The windows are covered with pieces of paper glued to it.`,
    `Roman knocks three times on the door. There is a long pause before the door is opened. A man opens the door. He smiles at Roman but is surprised to see you.`,
    `As you walk in you notice a guy and two girls sitting around the living room. `,
    `Roman introduces you to them and they introduce themselves. The guy who opened the door is Elliot, there is also Victor, Leah, and Tessa who seems to be the youngest.`,
    `"I didn't find anything but I met Lucia and she gave me some food," explained Roman.`,
    `"Oh! So where is it?" Asked Elliot.`,
    `"I kind of finished it..."`,
    `There is a minute of silence before they laugh and keep talking. They don't seem to mind.`, 
    `Leah had also been searching for food - she said she found something at a supermarket nearby so she shared it with the rest of the group.`,
    `You spent the rest of the afternoon talking until it was time to sleep.`
  ],
  `url(images/backgrounds/group-camp.jpg)`,
  [[`Sleep on the couch`, `char3NextDay`]]
);

const char3NextDay = new Path(
  `char3NextDay`,
  [
    `You wake up to the sound of a nock on the door.`,
    `Before you could get up, Victor opens the door. It's Leah, she woke up early to go hunting and brought home a rabbit.`,
    `Everyone heads outside and into the woods to start a fire. The house doesn't have any gas.`,
    `While they start the fire Elliot starts talking. He tells you about a guy named George. He was also part of their group but got lost days ago.`,
    `"We were planning on looking for him today," he said.`,
    `"Tomorrow we were going to check out a potential safe place but we think a shrieker is staying there," added Leah.`,
    `"The place is huge, like a mansion, but the shrieker is abnormally bigger than usual," says Victor.`,
    `They call it the "Darkling."`,
    `"Anyway would you help us look for George?" Asks Elliot.`
  ],
  `url(images/backgrounds/breakfast.jpg)`,
  [
    // [`Accept`, `char3LookForGeorge`],
    [`Refuse`, `char3Refuse`]
  ]
);

const char3Refuse = new Path(
  `char3Refuse`,
  [
    `"If he has been missing for days then he's probably already dead," you say.`,
    `They just stare at each other in silence. A few minutes pass until someone starts talking again.`,
    `"We should check out the other place you were talking about instead," you suggest.`,
    `"Okay then, lets go later," agrees Leah.`,
    `No one talks until it is time to leave.`
  ],
  `url(images/backgrounds/breakfast.jpg)`,
  [
    [`Go to check out the place`, `char3WalkToArea`]
  ]
);

const char3WalkToArea = new Path(
  `char3WalkToArea`,
  [
    `You adjust your sneakers and wait for the group to get ready. Once they do Elliot starts walking and everyone follows behind.`,
    `The walk is long, but eventually, the recognizes the area and you arrive.`,
    `You hide behind some bushes in front of the building.`,
    `"Leah and I will go to the side and yous stay here," says Elliot.`,
    `"We'll go through the front door," Roman says pointing at too.`,
    `"Okay, we'll stay here and guard," says Victor.`,
    `You approach the front door.`
  ],
  `url(images/backgrounds/abandoned-building-forest.jpg)`,
  [
    [`Open the door`, `char3HeadInside`]
  ]
);

const char3HeadInside = new Path(
  `char3HeadInside`,
  [
    `You cautiously open the door and head inside with Roman, walking silently.`,
    `Everything is going smoothly. Then-bang! You hear something fall over and a shriek soon follows.`,
  ],
  `url(images/backgrounds/safe-place-entrance.jpg)`,
  [[`Move`, `char3Slip`]]
);

const char3Slip = new Path(
  `char3Slip`,
  [
    `You're about to take a step when you slip on a piece of glass on the floor`,
  ],
  `url(images/backgrounds/front-entrance.jpg)`,
  [[`Run!`, `quickTimeStart`]]
);

const char3GotAway = new Path(
  `char3GotAway`,
  [
    `You let out a sigh of relief as you look behind you.`,
    `It seems like you've managed to get away safely.`,
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go back to the group`, `char3TalkPlan`]]
);

const char3TalkPlan = new Path(
  `char3TalkPlan`,
  [
    `You do a quick scan of the back and side of the place and go round it to meet with your group again. Elliot and Leah had already head back frist.`,
    `After hours of talking, a plan has been devised. Shriekers normally drift from place to place, and its unlikely the darkling is particularly attached to the place.`,
    `You could try to drive off the darkling, but that wouldn't end the threat for good.`,
    `Or you could fight the darkling - as unmatched of a fight that seems.`
  ],
  `url(images/backgrounds/green-bushes.jpg)`,
  [
    [`Drive off the darkling`, `char3GoodPlan`],
    [`Fight the darkling`, `char3BadPlan`],
  ]
);

const char3GoodPlan = new Path(
  `char3GoodPlan`,
  [
    `You decided to go in with Roman so that group can set traps around the area, leaving only one place open so that the darkling has no option but to leave from there.`,
    `You will have to lead the darkling to the back entrace and corner it so it leaves, you will try to avoid fighting.`,
    `You quickly teach some traps to the group and get ready to go isnide the building again.`,
    `You enter the building and send Roman volunteers to search the room on the left. You decide to go search in another room when all of a sudden you hear a roar and a scream.`,
    `You run towards the direction of where the sounds came from and find Roman on a corner, applying pressure to his leg. He is still alive but he is injured.`,
  ],
  `url(images/backgrounds/safe-area-inside2.jpg)`,
  [
    [`Stay and lead the darkling to the back entrance`, `char3ContPlan`],
    [`Run away, Roman was a nice guy.`, `char3RunAway`],
  ]
);

const char3ContPlan = new Path(
  `char3ContPlan`,
  [
    `You quickly grab the frame to your right and throw it at the darkling. It won't do any damage but you hope it makes him leave through the door behind him.`,
    `Just as you predicted, the darkling goes out the back door, it's probably tired and doesn't want to fight.`,
    `You chase him, making sure he doesn't take any unexpected turns, and lead him towards the back door that leads to the garden and into the woods.`,
    `Once he vanishes and all you see is trees and bushes you quickly run back inside. You need to help Roman.`,
    `You kneel down next to him and notice his injured leg. Roman grunts in pain but he is going to be okay. You take out the first aid kit you had and attend to Roman's wound.`
  ],
  `url(images/backgrounds/safe-area-back.jpg)`,
  [[`Go check on the others`,`char3MoreLore`]]
);

const char3MoreLore = new Path(
  `char3MoreLore`,
  [
    `You go outside and find the others already celebrating. Some are laying on the ground resting and catching their breaths.`,
    `"There is no time to waste, lets examine the place," you tell them. They get up and head inside.`,
    `"Where's Roman?" Asks Victor. You tell him what happened and reassure him he is going to be fine.`,
    `Elliot and Leah volunteer to hunt for food while the rest of you decide to look around the rooms, verying that there is no other shrieker there.`,
    `While searching the rooms Victor starts talking and starts sharing stories about a similar shriker they encountered once, "...although not as big." he says.`,
    `They keep talking, about and hour goes by, and you finish clearing the place.`
  ],
  `url(images/backgrounds/kitchen.jpg)`,
  [[`Go to the living room`, `char3LivingRoom`]],
)

const char3LivingRoom = new Path(
  `char3LivingRoom`,
  [
    `You go to the living room and sit down on the sofas, waiting for Elliot and Leah to return.`,
    `Leah comes back first holding a dead rabbit by the ears, with a grin on her first.`,
    `She's about to say something when Elliot storms in.`,
    `"It's coming back! I saw it, that thing is heading here again," he warns.`,
    `You are going to have to fight this darkling if you want to keep this place.`
  ],
  `url(images/backgrounds/living-room.jpg)`,
  [[`Go fight the "Darkling"`, `startBossFight`]]
)

const char3DefeatDarkling1 = new Path(
  `char3DefeatDarkling1`,
  [
    `You did it! You defeated it. That thing is not going to bother you anymore.`,
    `You can finally live here in peace.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You wait a few minutes outside before heading towards the mansion again.`
  ],
  `url(images/backgrounds/place-final-fight1.jpg)`,
  [[`Go back`,`char3GreenEnding`]]
)

const char3GreenEnding = new Path(
  `char3GreenEnding`,
  [
    `When you enter the living room, you see them stand up,they are relived to see you.`,
    `You don't say anything and just smile, which surprises them and gets some laughs out of them.`,
    `Finally you sit down on the sofa. Roman is sitting on the sofa across from you, resting`,
    `As the years pass, Roman heals, he gets cramps on that leg sometimes, but is as happy as ever.`, 
    `You guys reinforce the area with traps, you cultivate crops near the backyard, and rarely encounter any shriekers.`,
    `You get closer with your group and enjoy the mansion, having fun everyday until you die of old age.`
  ],
  `url(images/backgrounds/green-ending.jpg)`,
  [[`Replay`,`start`]]
)

const char3BadPlan = new Path(
  `char3BadPlan`,
  [
    `You decide to confront the darkling together. You share the few weapons that you have with each other and get ready to go inside once again.`,
    `You enter quietly and send Elliot and Tessa to search for the darkling in a room to the left and send Victor and Leah to search the room to your right.`,
    `Roman and you head towards the stairs. Everything is going according to plan when out of nowhere a loud roar and screams startle you.`,
    `You go back down the stairs and head to the room on your left. Elliot and Tessa are injured and the darkling is heading towards Leah and Victor.`,
    `Roman heads towards the darkling but he gets hit.`,
  ],
  `url(images/backgrounds/safe-area-inside2.jpg)`,
  [
    [`Stay and fight`, `dead`],
    [`Run away, they were good people`, `char3RunAway`],
  ]
);

const char3RunAway = new Path(
  `char3RunAway`,
  [
    `You decide to run away. It is a hard decision to make but you do.`,
    `You don't think anyone else is going to make it and this is your chance to run so you do.`,
    `The rest of the group and Roman don't survive their injuries and they sadly pass away.`,
    `You run back to their camp.`,
  ],
  `url(images/backgrounds/close-to-mansion2.jpg)`,
  [[`Return to their camp`, `char3ReturnAlone`]]
);

const char3ReturnAlone = new Path(
  `char3ReturnAlone`,
  [
    `You start running back to their camp, exhausting your feet, but rarely stopping to take breaks.`,
    `You can't belive what just happened.`,
    `After a few minutes you start walking again, you are still not there yet. You decide to sit down on a rock, you're still in the woods, by yourself.`,
    `Minutes later, the silence is suddenly interrupted when you hear running footsteps heading here. Someone or something is here.`,
    `You grab a rock next to you and hide behind a tree. The footsepts are getting closer, they are only a few feet away from you, then you hear a thud and it stops.`, 
    `You poke your head out and find a stranger on the floor, he must've tripped,he looks scared.`,
    `He notices you. "There's a huge shrieker coming this way, run! Get out of here!" He warns you as he gets up and continues running.`,
    `It looks like you will have to confront this darkling one way or the other. You prepare yourself and go look for the darkling. You will have to fight it.`,
  ],
  `url(images/backgrounds/green-bushes.jpg)`,
  [[`Go fight the "Darkling"`, `startBossFight2`]]
);

const char3DefeatDarkling2 = new Path(
  `char3DefeatDarkling2`,
  [
    `You did it! You defeated the monster that hurt your friends, the people you met like a few days ago.`,
    `You sit down and rest, closing your eyes and feeling the wind hit your face. You feel as if a great weight has been lifted off of you.`,
    `You don't waste your time anymore and head towards the now monsterless safe place.`,
    `Once you get there, you look for a room and spend the night there.`,
    `You can enjoy this mansion by yourself or make it a sanctuary for other people.`,
  ],
  `url(images/backgrounds/lucia-room.jpg)`,
  [
    [`Live here alone`, `char3EndAlone`],
    [`Make this place a sanctuary and help other travelers`, `char3Sanctuary`],
  ]
);

const char3EndAlone = new Path(
  `char3EndAlone`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, and Roman.`, 
    `You commemorate them by decorating the rooms with their belongings.`,
    `Years pass and you cultivate crops in your backyard, reinforce your mansion with traps, and live alone until you die in your sleep peacefully.`,
    `The last thing you dream of is eating a nice warm pepperoni pizza, straight out of the oven.`,
  ],
  `url(images/backgrounds/lucia-dead.jpg)`,
  [[`Replay`, `start`]]
);

const char3Sanctuary = new Path(
  `char3Sanctuary`,
  [
    `You decide to live here by yourself.`,
    `This mansion has many rooms and as the years pass you dedicate specific rooms for Elliot, Tessa, Victor, Leah, and Roman.`, 
    `You commemorate them by decorating the rooms with their belongings and you lock those rooms so no one can enter.`,
    `Years pass and you cultivate crops in your backyard and reinforce your mansion with traps. You create signs to guide travelers to your mansion where you welcome them.`,
    `You meet new people, create a community and help them stay alive. As the years pass and more people come, they build new houses next to your mansion.`,
    `You visit your old group's graves every afternoon and tell stories about them to the new friends you meet.`,
  ],
  `url(images/backgrounds/gravestones3.jpg)`,
  [[`Replay`, `start`]]
);

// ***********Quick time event***********
const quickTimeStart = new Path(
  `quickTimeStart`,
  [
    `The monster is coming!`,
    `Run away from it - go too slow or the wrong direction and you could be in trouble!`,
  ],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [[`beginQuickTime`, `quickTime`]]
);

const quickTimeNorth = new Path(
  `quickTimeNorth`,
  [`The monster is coming from the north!`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [
    [`Go north`, `dead`],
    [`Go east`, `dead`],
    [`Go west`, `dead`],
    [`Go south`, `quickTime`],
  ]
);

const quickTimeSouth = new Path(
  `quickTimeSouth`,
  [`The monster is coming from the south!`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [
    [`Go north`, `quickTime`],
    [`Go east`, `dead`],
    [`Go west`, `dead`],
    [`Go south`, `dead`],
  ]
);

const quickTimeWest = new Path(
  `quickTimeWest`,
  [`The monster is coming from the west!`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [
    [`Go north`, `dead`],
    [`Go east`, `quickTime`],
    [`Go west`, `dead`],
    [`Go south`, `dead`],
  ]
);

const quickTimeEast = new Path(
  `quickTimeEast`,
  [`The monster is coming from the east!`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [
    [`Go north`, `dead`],
    [`Go east`, `dead`],
    [`Go west`, `quickTime`],
    [`Go south`, `dead`],
  ]
);

const wonQuickTime = new Path(
  `wonQuickTime`,
  [
    `You let out a sigh fo relief as you look behind you.`,
    `It seems like you've managed to get away safely.`,
    `This is the current end to our game.`,
  ],
  `url(images/backgrounds/foggy-forest.jpg)`,
  [[]]
);

const quickTime = new Path(
  `quickTime`,
  [`Just to keep everything happy`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [[`Perish`, `dead`]]
);

const startBossFight = new Path(
  `startBossFight`,
  [`Just to keep everything happy`],
  `url(images/backgrounds/Potential-finalboss-monster.jpg)`,
  [[`Perish`, `dead`]]
);

const startBossFight2 = new Path(
  `startBossFight2`,
  [`Just to keep everything happy`],
  `url(images/backgrounds/Potential-finalboss-monster.jpg)`,
  [[`Perish`, `dead`]]
);

const fledTwice = new Path(
  `fledTwice`,
  [
    `You turn and try to make a run for it.`,
    `But this time... there's isn't anyone to distract the darkling as you run.`,
    `It swiftly catches up to you, and with your back turned to it you stand no chance.`,
    `Side Ending 5/5: Coward`
  ],
  `url(images/backgrounds/dead-graves.jpg)`,
  [[`Replay`, `start`]]

)

// ***********Paths***********
let paths = [
  start,
  PathChar1,
  PathChar2,
  PathChar3,
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
  char1NewDay,
  char1ReturnToSupermarket,
  char1RunForIt,
  notThisAgain,
  notThisAgainAgain,
  pleaseNotThisAgain,
  pleaseNotThisAgainAgain,
  char1BeginNewDay,
  char1ReturnToSupermarket,
  whyIsThisStillAnOption,
  dead,
  char1EnterAgain,
  char1Survived,
  char1TalkRomanYes,
  char1TalkRomanNo,
  char1TalkRomanRude,
  char1GoWithRoman,
  char1NextDay,
  char1BackToFoods,
  char1Supermarket2,
  char1Together,
  char1Split,
  char1MeetGroup,
  char1SitDown,
  char1TheirCamp,
  char1YourCampWithGroup,
  char1ParkingLot,
  char1HeadBack2,
  char1Stay,
  char1NextDay2,
  char1Scout,
  char1HeadInside,
  char1Slip,
  char1GotAway,
  char1ReturnToGroup,
  char1Planning,
  char1BadPlan,
  char1GoodPlan,
  char1DefeatDarkling1,
  char1GreenEnding,
  char1ContPlan,
  char1MoreLore,
  char1LivingRoom,
  char1WorsePlan,
  char1RunAway,
  char1ReturnAlone,
  char1DefeatDarkling2,
  char1EndAlone,
  char1Sanctuary,
  char2Supermarket,
  char2Clothing,
  char2Medicine,
  char2Weapon,
  char2ObtainHatchet,
  char2Continue,
  char2ListenToConv,
  char2HeadBack,
  char2CheckTraps,
  char2Attack,
  char2DistractShrieker,
  maxDead,
  char2UseItem,
  char2SaveAlly,
  char2Refuse,
  char2Join,
  char2NextDay,
  char2BackToFoods,
  char2Supermarket2,
  char2Split,
  char2Together,
  char2FindRoman,
  char2MeetGroup,
  char2SitDown,
  char2TheirCamp,
  char2YourCampWithGroup,
  char2ParkingLot,
  char2HeadBack2,
  char2Stay,
  char2NextDay2,
  char2Scout,
  charHeadInside,
  char2Slip,
  char2GotAway,
  char2TalkPlan,
  char2GoodPlan,
  char2ContPlan,
  char2MoreLore,
  char2LivingRoom,
  char2DefeatDarkling1,
  char2GreenEnding,
  char2BadPlan,
  charRunAway,
  char2ReturnAlone,
  char2DefeatDarkling2,
  char2EndAlone,
  char2Sanctuary,
  char3AnswerCall,
  char3Delivery,
  char3FiredBecauseNoWork,
  char3CorrectLocation,
  char3FiredBecauseAddress,
  char3SketchyGroup,
  char3BeatUp,
  char3LootThem,
  char3FirstAidKit,
  char3ClientOrHomeless,
  givePizzaToClient,
  givePizzaToStranger,
  char3Decline,
  char3Join,
  charMeetGroup,
  char3NextDay,
  char3Refuse,
  char3WalkToArea,
  char3HeadInside,
  char3Slip,
  char3GotAway,
  char3TalkPlan,
  char3GoodPlan,
  char3ContPlan,
  char3MoreLore,
  char3LivingRoom,
  char3DefeatDarkling1,
  char3GreenEnding,
  char3BadPlan,
  char3RunAway,
  char3ReturnAlone,
  char3DefeatDarkling2,
  char3EndAlone,
  char3Sanctuary,
  quickTimeStart,
  quickTimeEast,
  quickTimeNorth,
  quickTimeSouth,
  quickTimeWest,
  wonQuickTime,
  quickTime,
  fledTwice
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
  quickTimeCounter = 0;
  titleScreen.className = "throughBlack";
  timeoutID = setTimeout(function () {
    startGame();
  }, 2500);
}

function startGame() {
  clearTimeout(timeoutID);
  clearTimeout(timeoutID2);
  if (story.textNum < 900) {
    typeWriter(story.text[story.textNum], text, 40);
    history.push([story.text[story.textNum], 0]);
    background.style.backgroundImage = story.image;
  }
}

function nextText() {
  if (story.name == "dead") {
    if (intervalId) {
      clearInterval(intervalId);
      timeBar.style.display = "none";
    }
  }
  if (story.textNum < 0) {
    story.textNum++;
    text.innerHTML = "";
    startGame();
    hideOptions();
  } else {
    if (story.text[story.textNum]) {
      if (text.innerHTML.length < story.text[story.textNum].length) {
        clearTimeout(timeoutID);
        text.innerText = story.text[story.textNum];
      } else {
        if (story.textNum < story.text.length - 1) {
          story.textNum++;
          text.innerText = "";
          typeWriter(story.text[story.textNum], text, 40);
          history.push([story.text[story.textNum], 0]);
        }
      }
    } else if (story.textNum >= 900) {
      clearTimeout(timeoutID);
      text.innerText = story.text[story.text.length - 1];
    }
  }
  if (story.textNum == story.text.length - 1) {
    story.textNum = 999;
    makeOptions();
  }
}

function makeOptions() {
  clearOptions();
  for (let element of story.options) {
    if (!element[2] || eval(element[2]) === true) {
      var link = document.createElement("button");
      link.id = element[1];
      link.className = `hover`;
      const text = document.createTextNode(element[0]);

      link.appendChild(text);

      if (element[0] == "quickTimeStart") {
        story.textNum = -1;
        quickTimeCounter = 0;
      }

      if (element[1] == "quickTime") {
        link.onclick = function () {
          randomQuickTimeEvent();
        };
      } else if (element[1] == "startBossFight") {
        link.onclick = function () {
          beginBossFight();
        };
      } else if (element[1] == "startBossFight2") {
        link.onclick = function () {
          beginBossFight(true);
        };
      } else {
        link.onclick = function () {
          changePath(this.id, this.innerText, Path.item);
        };
      }
        let Path = getPath(element[1]);

        if(Path){
          let txt = Path.image.split("(")[1].split(")")[0];
          const img = new Image();
          img.src = txt;
        }

      options.append(link);
    }
  }
  options.style.visibility = `visible`;
}

function showHistory() {
  if (historySection.style.zIndex == 2) {
    historySection.style.zIndex = -2;
  } else {
    hideAllOptions(historySection);
    clearHistory();
    for (each of history) {
      const text = document.createElement("p");
      const textText = document.createTextNode(each[0]);
      switch (each[1]) {
        case 0:
          text.style.fontStyle = "normal";
          text.style.color = "black";
          break;
        case 1:
          text.style.fontStyle = "italic";
          text.style.color = "blue";
          break;
        default:
          break;
      }
      text.className = `historyText`;
      text.append(textText);
      historySection.append(text);
    }
    historySection.style.zIndex = 2;
  }
}

function showInventory() {
  if (inventorySection.style.zIndex == 2) {
    inventorySection.style.zIndex = -2;
  } else {
    hideAllOptions(inventorySection);
    clearInventory();
    for (each of inventory) {
      const text = document.createElement("p");
      const textText = document.createTextNode(each.name);
      text.className = `historyText`;
      text.append(textText);
      inventorySection.append(text);
    }
    inventorySection.style.zIndex = 2;
  }
}

function hideOptions() {
  options.style.visibility = `hidden`;
}

function clearInventory() {
  let sections = document.querySelectorAll("#inventorySection p");
  for (each of sections) {
    each.remove();
  }
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

function clearLoadOptions() {
  let sections = document.querySelectorAll("#loadOptions button");
  for (each of sections) {
    each.remove();
  }
}

function changePath(newPath, optionText, item) {
  if (item) {
    inventory.push(item);
  }
  history.push([optionText, 1]);
  story = getPath(newPath);
  story.textNum = -1;
  nextText();
}

function getPath(PathName) {
  for (each of paths) {
    if (each.name == PathName) {
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

function onLoad() {
  titleShadow();
}

function hideAllOptions(section) {
  saveSection.style.zIndex = -2;
  loadSection.style.zIndex = -2;
  historySection.style.zIndex = -2;
  inventorySection.style.zIndex = -2;
  homeSection.style.zIndex = -2;
  if (section) {
    section.style.zIndex = 2;
  }
}

function createNewSave() {
  if (saveName.value) {
    localStorage.setItem(
      `game_${saveName.value}`,
      JSON.stringify([story, history, inventory])
    );
    saveName.value = "";
    hideAllOptions();
  } else {
    saveName.placeholder = "Please enter a name.";
  }
}

function saveToLocalStorage() {
  saveName.ariaPlaceholder = "";
  if (saveSection.style.zIndex == 2) {
    saveSection.style.zIndex = -2;
  } else {
    saveSection.style.zIndex = 2;
    hideAllOptions(saveSection);
  }
}

function loadFromLocalStorage() {
  if (loadSection.style.zIndex == 2) {
    loadSection.style.zIndex = -2;
  } else {
    hideAllOptions(loadSection);
    loadSection.style.zIndex = 2;
    let search = "game_";
    let values = Object.keys(localStorage)
      .filter((key) => key.startsWith(search))
      .map((str) => str.split(`_`)[1]);

    clearLoadOptions();
    for (each of values) {
      var link = document.createElement("button");
      link.id = each;
      link.className = `hover`;
      const text = document.createTextNode(each);

      link.appendChild(text);

      link.onclick = function () {
        restoreFromLocalStorage(this.id);
      };

      loadOptions.append(link);
    }
  }
}

function returnHome() {
  if (homeSection.style.zIndex == 2) {
    homeSection.style.zIndex = -2;
  } else {
    hideAllOptions(homeSection);
    homeSection.style.zIndex = 2;
  }
}

function returnHomeAnyway() {
  titleScreen.className = "backFromBlack";
  inventory = [];
  story = getPath("start");
  story.textNum = 0;
  hideAllOptions();
  background.style.backgroundImage = story.image;
  text.innerHTML = "";
  history = [];
  clearOptions();
  titleShadow();
}

function randomQuickTimeEvent() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  quickTimeCounter++;
  let path = Math.round(Math.random() * 3) + 1;
  if (quickTimeCounter < 5) {
    timeBar.style.display = "flex";
    doTimer();
    switch (path) {
      case 1:
        story = getPath("quickTimeNorth");
        break;
      case 2:
        story = getPath("quickTimeEast");
        break;
      case 3:
        story = getPath("quickTimeSouth");
        break;
      case 4:
        story = getPath("quickTimeWest");
        break;
      default:
        break;
    }
    text.innerHTML = "";
    clearOptions();

    story.textNum = -1;
    makeOptions();
    nextText();
    background.style.backgroundImage = story.image;
  } else {
    quickTimeCounter = 0;
    timeBar.style.display = "none";
    text.innerHTML = "";
    clearOptions();
    if (doesHistoryHave('Play as Ezekiel')) {
      story = getPath("char2GotAway");
    } else if(doesHistoryHave('Play as Elena')){
      story = getPath("char1GotAway");
    } else {
      story = getPath("wonQuickTime");
    }

    story.textNum = -1;
    nextText();
    background.style.backgroundImage = story.image;
  }
}

function doesHistoryHave(string) {
  for (each of history) {
    if (each[0] == string) {
      return true;
    }
  }
  return false;
}

function doesInventoryHave(string) {
  for (each of inventory) {
    if (each.name == string) {
      return true;
    }
  }
  return false;
}

function doTimer() {
  startTime = Date.now();
  intervalId = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsedTime = Date.now() / 1000.0 - startTime / 1000.0;
  timeBar.style.width = `${(quickTimer - elapsedTime) * (100 / quickTimer)}%`;

  if (elapsedTime >= quickTimer) {
    timeBar.style.width = `0%`;
    timeBar.style.display = "none";
    clearInterval(intervalId);
    text.innerHTML = "";
    story = getPath("dead");
    clearOptions();

    startGame();
  }
}

function beginQuickTime() {
  story = getPath("quickTimeStart");
  background.style.backgroundImage = story.image;
}

function quickTimeEvent() {
  beginQuickTime();
  setTimeout(() => {
    leaveMenu();
  }, 200);
}

function restoreFromLocalStorage(load) {
  story = JSON.parse(localStorage.getItem(`game_${load}`))[0];
  history = JSON.parse(localStorage.getItem(`game_${load}`))[1];
  inventory = JSON.parse(localStorage.getItem(`game_${load}`))[2];

  text.innerText = story.text[story.textNum];

  clearOptions();

  if (story.textNum == story.text.length - 1 || story.textNum > 900) {
    story.textNum = 999;
    makeOptions();
    nextText();
  }
  background.style.backgroundImage = story.image;

  loadSection.style.zIndex = -2;
}

function doFightText(text){
  bossText.innerHTML = '';
  clearTimeout(timeoutID3);
  timeoutID3 = typeWriter(text, bossText, 20);
}

function beginBossFight(ranAway = false){
  coward = ranAway;
  playerHealth = 100;
  playerDefense = 0;
  playerStamina = 100;
  darklingDefense = 0;
  darklingHealth = 200;
  darklingPhase = 0;
  darklingStamina = 100;
  titleScreen.className = "throughBlack";

  bossFight.style.display = 'flex';
  setTimeout(() => {
    doFightText(`It's time!`);
  }, 300);
  if(doesInventoryHave('Hatchet')){
    attackText.onclick = function (){useHatchet()};
    attackText.innerHTML = 'Attack with hatchet'
  }
  if(doesInventoryHave('Sturdy Clothing')||doesInventoryHave('Beanie')){
    playerDefense = 2;
  }
  if(doesInventoryHave('First-Aid Kit')){
    playerHealth = 120;
  }
  updateStats(true);
}

function useHatchet(){
  let atk = Math.round(Math.random()*13)+12;
  doFightText(`You swing the hatchet! You dealt ${atk} damage!`);
  darklingHealth -= atk;
  playerStamina -= Math.round(Math.random()*6)+17;

  updateStats();
}

function attack(){
  let atk = Math.round(Math.random()*10)+10;
  doFightText(`You swing the knife! You dealt ${atk} damage!`);
  darklingHealth -= atk;
  playerStamina -= Math.round(Math.random()*6)+17;

  updateStats();
}

function next(){
  for (each of nextButton){
    each.style.display = 'none';
  }
  for (each of playerActions){
    each.style.display = 'block';
  }
  doDarklingAction();
}

function block(){
  doFightText(`You raise your guard in anticipation!`);
  playerDefense += Math.round(Math.random()*10)+45;
  playerStamina -= Math.round(Math.random()*4)+1;

  updateStats();
}

function rest(){
  let regen = Math.round(Math.random()*15)+10;
  let hRegen = Math.round(Math.random()*10)+2;
  doFightText(`You take a moment to recover, for ${regen} stamina and ${hRegen} health!`);
  playerStamina += regen;
  playerHealth += hRegen;

  updateStats();
}

function doDarklingAction(){
  let atk;
  switch (darklingPhase) {
    case 0:
      doFightText(`The darkling prepares to launch a strong attack!`);
      break;
    case 1:
      atk = Math.round(Math.random()*20)+40;
      doFightText(`The darkling attacks with full force for ${Math.max(atk-playerDefense,0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 30;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    case 2:
      atk = Math.round(Math.random()*8)+8;
      doFightText(`The darkling quickly attacks for ${Math.max(atk-playerDefense, 0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 10;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    case 3:
      atk = Math.round(Math.random()*8)+8;
      doFightText(`The darkling quickly attacks for ${Math.max(atk-playerDefense,0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 10;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    case 4:
      doFightText(`The darkling prepares to launch a strong attack!`);
      break;
    case 5:
      atk = Math.round(Math.random()*15)+40;
      doFightText(`The darkling attacks with full force for ${Math.max(atk-playerDefense,0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 30;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    case 6:
      atk = Math.round(Math.random()*8)+8;
      doFightText(`The darkling quickly attacks for ${Math.max(atk-playerDefense, 0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 10;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    case 7:
      doFightText(`The darkling prepares to launch a strong attack!`);
      break;
    case 8:
      atk = Math.round(Math.random()*15)+40;
      doFightText(`The darkling faked you out and instead takes time to rest.`);
      darklingStamina += 50;
      break;
    case 9:
      atk = Math.round(Math.random()*8)+8;
      doFightText(`The darkling quickly attacks for ${Math.max(atk-playerDefense,0)} (${atk}-${playerDefense}) damage.`);
      darklingStamina -= 10;
      playerHealth -= Math.max(atk-playerDefense,0);
      break;
    default:
      doFightText(`The darkling takes a moment to rest.`);
      darklingStamina += 50;
      darklingHealth += 20;
      darklingPhase = -1;
      break;
  }
  updateStats(true);
  if(doesInventoryHave('Sturdy Clothing')||doesInventoryHave('Beanie')){
    playerDefense = 2;
  } else {
    playerDefense = 0;
  }
  darklingPhase++;
}

function updateStats(darklingTurn = false){
  if(playerStamina <= 10){
    if(playerStamina <= 0){
      playerStamina = 0;
    }
    attackText.style.backgroundColor = 'red';
    blockText.style.backgroundColor = 'red';
    blockText.onclick = '';
    attackText.onclick = '';
  } else {
    if(playerStamina > 100){
      playerStamina = 100;
    }
    if(playerHealth > 100 && !doesInventoryHave('First-Aid Kit')){
      playerHealth = 100;
    }
    if(playerHealth > 120){
      playerHealth = 120;
    }
    attackText.style.backgroundColor = 'white';
    blockText.style.backgroundColor = 'white';
    blockText.onclick = function (){block()};
    if(doesInventoryHave('Hatchet')){
      attackText.onclick = function (){useHatchet()};
    } else {
      attackText.onclick = function (){attack()};
    }
  }
  pHealth.innerHTML = playerHealth;
  pStamina.innerHTML = playerStamina;
  dHealth.innerHTML = darklingHealth;
  dStamina.innerHTML = darklingStamina;
  if(!darklingTurn){
    for (each of playerActions){
      each.style.display = 'none';
    }
    for (each of nextButton){
      each.style.display = 'block';
    }
  }
  if(playerHealth<=0){
    hideBossFight();
    text.innerHTML = "";
    clearOptions();
    story = getPath("dead");

    story.textNum = -1;
    nextText();
    background.style.backgroundImage = story.image;
  } else if(darklingHealth<=0){
    hideBossFight();
    text.innerHTML = "";
    clearOptions();
    if (doesHistoryHave('Play as Ezekiel')) {
      if(coward){
        story = getPath("char2DefeatDarkling2");
      } else {
        story = getPath("char2DefeatDarkling1");
      }
    } else if(doesHistoryHave('Play as Elena')){
      if(coward){
        story = getPath("char1DefeatDarkling2");
      } else {
        story = getPath("char1DefeatDarkling1");
      }
    } else if(doesHistoryHave('Play as Lucia')){
      if(coward){
        story = getPath("char3DefeatDarkling2");
      } else {
        story = getPath("char3DefeatDarkling1");
      }
    } else {
      story = getPath("char2DefeatDarkling1");
    }

    story.textNum = -1;
    nextText();
    background.style.backgroundImage = story.image;
  }
}

function flee(){
  hideBossFight()
  if(!coward){
    if (doesHistoryHave('Play as Ezekiel')) {
      story = getPath("charRunAway");
    } else if(doesHistoryHave('Play as Elena')){
      story = getPath("char1RunAway");
    } else if(doesHistoryHave('Play as Lucia')){
      story = getPath("char3RunAway");
    } else {
      story = getPath("char1RunAway");
    }
  } else {
    story = getPath("fledTwice");
  }

  story.textNum = -1;
  nextText();
  background.style.backgroundImage = story.image;
}

function hideBossFight(){
  bossFight.style.display = 'none';
}

document.addEventListener("click", function (event) {
  if (
    !homeSection.contains(event.target) &&
    !loadSection.contains(event.target) &&
    !saveSection.contains(event.target) &&
    !inventorySection.contains(event.target) &&
    !historySection.contains(event.target) &&
    !settings.contains(event.target)
  ) {
    hideAllOptions();
  }
});