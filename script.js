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
let flickerBlur = 170;
let flickerSpread = 30;
let quickTimeCounter = 0;
let quickTimer = 3;

let timeoutID;
let timeoutID2;
let intervalId;

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
    [`Play as char1`, `PathChar1`],
    [`Play as char2`, `PathChar2`],
    [`Play as char3`, `PathChar3`],
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
  new Item("FirstAid Kit", "")
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
    `It's been a while since you've met people. You want to investigate, but it isn't impossible that the strangers are thieves or even killers.`,
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
    `You can't make out some parts but hear them talking about setting up a camp. "A safe area", they called it.`,
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
    `A man in a dark gray shirt and black jeans, seemingly the leader, says they mean no harm, and they offer you a sandwich.`,
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
    `They tell you their story - they've been traveling as a group of six, but two of them have gone missing.`,
    `The group tells you how they hope to set up a permanent shelter.`,
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence, and small camps were easier to move.`,
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
    `You laugh to yourself at that. Nowhere was safe enough for a permanent residence, and small camps were easier to move.`,
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
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back to the supermarket.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1Supermarket`],
    [`Procrastinate`, `notThisAgain`],
  ]
);

const notThisAgain = new Path(
  `notThisAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back to the supermarket.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Procrastinate`, `notThisAgainAgain`],
    ["Get up", `char1Supermarket`],
  ]
);

const notThisAgainAgain = new Path(
  `notThisAgainAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back to the supermarket.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Procrastinate`, `pleaseNotThisAgain`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
  ]
);

const pleaseNotThisAgain = new Path(
  `pleaseNotThisAgain`,
  [
    `You wake up to a new day.`,
    `You want to stay sleeping, but you didn't get enough supplies yesterday.`,
    `Slowly you gather your will to get out of your sleeping bag and prepare yourself to go back to the supermarket.`,
  ],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    [`Procrastinate`, `pleaseNotThisAgainAgain`],
    ["Get up", `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    [`Wither away`, `dead`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
    [`Get up`, `char1Supermarket`],
    ["Get up", `char1Supermarket`],
  ]
);

const pleaseNotThisAgainAgain = new Path(
  `pleaseNotThisAgainAgain`,
  [`No.`],
  `url(images/backgrounds/abandoned-city-building.jpg)`,
  [[`Get up`, `char1Supermarket`]]
);

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
    [`Search for a hatchet`, `char2Weapon`],
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
    `It's a shrieker. It sounds like its getting closer. Max starts barking.`,
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
  new Item("Hatchtet", "")
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
    [`Use hatchet and attack.`, `char2Attack`],
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
  `url(images/backgrounds/Abandoned-supermarket.jpg)`,
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
    `You quickly run towards the man on the ground, grab him by the forearm, and start running away. You take him near your cabin and try to avoid showing your camp since he is a stranger afterall.`,
    `"Thank you," he says once you guys stop to rest, while trying to catch his breath. You stay silent.`,
    `"My name is Roman," he says, extending his hand for a handshake.`,
    `You ignore him again and just stare at Max who lays on the ground, resting too. Roman retrieves his hand and wipes the sweat of his forehead instead.`,
    `Roman starts talking once again. He says he was with a group but got lost a few days ago. He was looking for his group members today when he got attacked by the shrieker you saw.`,
    `"You should join us," he suggests.`,
    `"They're probably already dead," you say no interested.`,
    `"You don't know that. They're smart and alive, I know it. If you help me find them we can set up a safe are together," Roman says.`,
    `Helping him could either bring you problems or help you stay alive.`,
    `But why should you join him when you have kept yourself alive for so long.`,
  ],
  `url(images/backgrounds/foggy-forest.jpg)`,
  [
    [`Decline his invitation. You don't need anyone but Max.`, `char2Refuse`],
    [
      `Join him and help him find his group. You can help him stay alive.`,
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
  ],
  `url(images/backgrounds/abandoned-building-forest.jpg)`,
  [[`Replay`, `start`]]
);

const char2Join = new Path(
  `char2Join`,
  [
    `You stay silent for a few minutes, complementing Roman's suggestion.`,
    `"Okay," you say. Roman just smiles and nods. He offers you some food he had left and you give some to Max. You take him to your cabin and offer to look for his group in the morning.`,
    `You will have to trust him.`,
    `So much has happened today. You should get some rest to help Roman find his group tomorrow morning.`,
  ],
  `url(images/backgrounds/abandoned-cabin-in-woods.jpg)`,
  [[`Get some sleep`, `char2NextDay`]]
);

const char2NextDay = new Path(
  `char2NextDay`,
  [
    `You didn't get enough sleep. You stayed alert and kept waking up throughout the whole night. You had to make sure Roman hadn't tricked you and looted your supplies while you were asleep.`,
    `You get out of your sleeping bag and turn your head to check on Max who is laying next to you. You then look at Roman who is on the other corner, still asleep.`,
    `You get wake him up and get your things ready to head out. Roman had mentioned "Foods", the supermarket you went to yesterday, as the last place he saw his group.`,
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
    `You run with Max and head towards the "Cleaning Supplies" section. You grab a long piece of metal you found on the way, getting ready to hit anything that is attacking Roman.`,
    `You make a turn and are about to raise the weapon on your hand but you freeze. You don't see Roman getting attacked.`,
    `You see him hugging people. Its his group.`,
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
    `Roman introduces you to Elliot, the man you recognized, Leah, a young woman around her 20s, Victor, a young man who is probably in his early 20s, and Tessa, who appears to be the youngest.`,
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
  [[`Get out of the supermarket`, ``]]
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
    `"George has been missing for quite some time. We were in the woods and got separated. Tessa was with him when he left to chase a deer he apparently saw, but never came back. She was scared and came to look for us but we never found Geroge," explained Roman.`,
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

const char3Delivery = new Path(
  `char3Delivery`,
  [
    `You try to remember and write down the location they gave you.`,
    `You prepare the pizza and get everything ready to head out.`,
    `You are unsure if they said First Street or Fifth Street.`,
  ],
  `url(images/backgrounds/potential-pizzeria-outside.jpg)`,
  [
    [`Go to xxx First St.`, `char3FiredBecauseAddress`],
    [`Go to xxx Fifth St.`, `char3CorrectLocation`],
  ]
);

const char3CorrectLocation = new Path(
  `char3CorrectLocation`,
  [
    `You wrote down the correct address.`,
    `As you keep walking you notice a sketchy group of people gathered around something.`,
  ],
  `url(images/backgrounds/potential-pizzeria-outside.jpg)`,
  [
    [`Avoid them.`, `char3ClientOrHomeless`],
    [`Approach them`, `char3SketchyGroup`],
  ]
);

const char3FiredBecauseNoWork = new Path(
  `char3FiredBecauseNoWork`,
  [
    `You tell them you don't feel like doing delivery right now.`,
    `Instead, you tell them very politely to come to the pizzeria to pick it up.`,
    `You are fired!`,
  ],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

const char3FiredBecauseAddress = new Path(
  `char3FiredBecauseAddress`,
  [`You went to the the wrong address.`, `You are fired!`],
  `url(images/backgrounds/LuciaG-at-wrong-location.jpg)`,
  [[`Replay`, `start`]]
);

const char3ClientOrHomeless = new Path(
  `char3ClientOrHomeless`,
  [
    `You decide to ignore them and as you keep walking you notice your client.`,
    `However you also see someone on the side of the street. Its a young man around who seems to be around his early to mid 20s.`,
    `He looks very malnourished.`,
    `He could really use that pizza right now.`,
  ],
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
  [[`Replay`, `start`]]
);

const givePizzaToStranger = new Path(`givePizzaToStranger`, [
  `You decide to be kind and give the pizza to the starving stranger.`,
]);

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
  [`You let out a sigh fo relief as you look behind you.`,
  `It seems like you've managed to get away safely.`,
  `This is the current end to our game.`],
  `url(images/backgrounds/foggy-forest.jpg)`,
  [[]]
);

const quickTime = new Path(
  `quickTime`,
  [`Just to keep everything happy`],
  `url(images/backgrounds/monster&person-in-forest.jpg)`,
  [[`Perish`, `dead`]]
);

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
  notThisAgain,
  notThisAgainAgain,
  pleaseNotThisAgain,
  pleaseNotThisAgainAgain,
  dead,
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
  char3AnswerCall,
  char3Delivery,
  char3FiredBecauseAddress,
  char3FiredBecauseNoWork,
  char3ClientOrHomeless,
  givePizzaToClient,
  givePizzaToStranger,
  quickTimeStart,
  quickTimeEast,
  quickTimeNorth,
  quickTimeSouth,
  quickTimeWest,
  wonQuickTime,
  quickTime,
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
  for (each of story.options) {
    var link = document.createElement("button");
    link.id = each[1];
    link.className = `hover`;
    const text = document.createTextNode(each[0]);

    link.appendChild(text);

    if (each[0] == "quickTimeStart") {
      story.textNum = -1;
      quickTimeCounter = 0;
    }

    if (each[1] == "quickTime") {
      link.onclick = function () {
        randomQuickTimeEvent();
      };
    } else {
      link.onclick = function () {
        changePath(this.id, this.innerText, Path.item);
      };
    }
    let Path = getPath(each[1]);
    console.log(Path);
    console.log(Path.image);

    let txt = Path.image.split("(")[1].split(")")[0];
    const img = new Image();
    img.src = txt;

    options.append(link);
  }
  console.log("loading complete");
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
    story = getPath("wonQuickTime");
    clearOptions();

    story.textNum = -1;
    makeOptions();
    nextText();
    background.style.backgroundImage = story.image;
  }
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
