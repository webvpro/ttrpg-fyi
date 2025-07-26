import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
tags:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
title: Fantasy
const allCreatures = [
  {d: Table
    name: "Alchemist",
    level: 5,
    armor: 0,ble
    health: 18,
    damage: "5 points",Fantasy                                             |
    movement: "Short", --------------------------------------------------- |
    categories: ["Weird-West", "NPC"],e](Acid-Resistance.md)               |
    kind: "NPC",     | [Animal Control](Animal-Control.md)                 |
    motive: "Use alchemy to achieve their ends",.md)                       |
    environment: "Almost anywhere",ance](Cold-Resistance.md)               |
    modifications: "Speed defense as level 6 due to their forgeborn companion; alchemical knowledge as level 7",
    description: "Alchemists ain't afraid to use logic and laborious experiments to claw magic from the dirt. Their knowledge of alchemical lore allows them to imbue inert objects with arcane volatility. They employ tinctures that heal or control, fling powders that explode or transform, and most impressively, animate rude substances into pseudo‑living entities known as forgeborn.",
    combat: "Alchemists use long range pistols or rifles. At least one of their bullets may be alchemical. A forgeborn assistant also accompanies most alchemists, often helping with defense.",
    interaction: "Few alchemists can resist talking about their research and the wonders of magic that \"natural philosophy\" can unlock, regardless of their larger goals.",
    use: "The PCs need to revive an unresponsive forgeborn to learn what it knows, which means they need to find an alchemist.",
    loot: "An alchemist may have a couple of useful items (roll twice on the Alchemical Rounds and Slugs table), assuming they didn't use them in combat."
  },-65              | [Instant Boat](Instant-Boat.md)                     |
  {6-68              | [Instant Tower](Instant-Tower.md)                   |
    name: "Dire Coyote",Lycanthrope Ward](Lycanthrope-Ward.md)             |
    level: 4,        | [Penultimate Key](Penultimate-Key.md)               |
    armor: 1,        | [Poison Resistance](Poison-Resistance.md)           |
    health: 15,      | [Restorative Aura](Restorative-Aura.md)             |
    damage: "4 points",[Thought Listening](Thought-Listening.md)           |
    movement: "Short", [Tiny Size](Tiny-Size.md)                           |
    categories: ["Weird-West", "Cursed-Beast"],d.md)                       |
    kind: "Creature",| [Walking Corpse](Walking-Corpse.md)                 |
    motive: "Hungers for flesh, defense",    environment: "Almost anywhere dark and isolated or near places ghosts haunt, individually and in teams of two or three",    modifications: "Perception as level 6; attacks and defense against ghosts, wraiths, and other spirits as level 6",    description: "Remnants of ancient populations reinvigorated by cursed magic, dire coyotes hunt lost and isolated creatures, regardless of whether the prey is alive or already dead. Dire coyotes are gaunt and sinewy, almost as large as a horse. Their hides are branded with arcane sigils that still glow and smoke with the sorcery that pulses through them.",    combat: "A dire coyote bites each round. A dire coyote also has one or more of the following traits: Forlorn Howl, Ghost eater, or Ignite Gun.",    interaction: "Dire coyotes have a secret language and society, but usually present to outsiders as just particularly dangerous coyotes. However, if they wish, dire coyotes can speak with the voice and memories of any ghost they have personally destroyed.",    use: "A sheriff who posted a bounty on dire coyotes has gone missing, and their spouse needs someone to go find them."  },  {    name: "Frostwalker",    level: 3,    armor: 1,    health: 12,    damage: "4 points",    movement: "Short",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Revenge",    environment: "Almost anywhere cold enough for snow and ice",    modifications: "Perception as level 5",    description: "A frostwalker is a cursed beast made of packed snow layered over the severed limbs, heads, gristle, antlers, and sinew from deer, wolves, and sometimes people who've died in the cold. As such, they vary in appearance. Some are about the size of wolves, others are human‑sized with antlers, and a few can be up to twice the size of a person.",    combat: "Frostwalkers bite, gore, or claw with whatever body part they have available. Frostwalkers may also have one or more of the following abilities: Frozen, Scream the Blizzard, Small and Quick, or Snow Monster.",    interaction: "Frostwalkers are usually made (or form spontaneously) to enact vengeance or to attack a foe, and will do so until they're destroyed.",    use: "When the lake freezes over, monstrous things made of snow slide across the solid surface and begin terrorizing whatever they find."  },  {    name: "Hellfire Steed",    level: 5,    armor: 1,    health: 21,    damage: "5 points",    movement: "Short; long when flying",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Havoc and suffering",    environment: "Almost anywhere; sometimes ridden as a mount by the powerful or foolish",    modifications: "",    description: "Intermittently ridden straight out of Hell by demons wearing borrowed flesh, the Damned, and others seeking to escape the accursed underworld, hellfire steeds are demonic, fire‑dripping destriers. Their manes are boiling napalm, their glowing red hooves leave prints that burn and smolder for days, and a single demonic horn curls from their brows.",    combat: "Hellfire steeds attack twice each round with their horn. Hellfire steeds also have one or more of the following traits: Fires of the Underworld, Lifedraining Horn, Render Immune to Fire, or From Hell.",    interaction: "Though usually driven by demonic desire, hellfire steeds are fully sapient and can speak all languages. They may negotiate with someone seeking to use them as a mount, but only in return for a promise of committing atrocities.",    use: "Stuck in Hell or a similarly hellish place, characters may have to ask a hellfire steed for a ride out.",    loot: "A hellfire steed's horn is a sought‑after alchemist ingredient; a full horn is a very expensive item."  },  {    name: "Sulfur Stalker",    level: 5,    armor: 2,    health: 21,    damage: "6 points",    movement: "Short; swims a short distance each round",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Defense, gather food for newly hatched young",    environment: "Anywhere near hot springs, or anywhere during seasons of migration",    modifications: "Speed defense as level 4 due to size; stealth as level 6",    description: "Dwelling in steaming, acidic hot springs, sulfur stalkers' umbral, scaled bodies can reach lengths of 10 or more feet (3 m). Their broad, flat heads feature wide, gaping mouths filled with rows of sharp teeth. Feathery tendrils fringe their heads, twining and stretching as if of their own accord.",    combat: "Sulfur stalkers bite. Additional sulfur stalker abilities include one or more of the following: Tendril Aura, Acid Geyser, or Regrow.",    interaction: "Sulfur stalkers have a language, and some can speak human tongues, especially those that have made deals with locals. Such deals usually involve turning over some number of other people each year for the stalker to eat.",    use: "A bounty for sulfur stalker eggs is so generous that folks everywhere begin hunting. This riles up the local stalker population, who begin attacking towns and homesteads preemptively.",    loot: "Because sulfur stalkers tend to capture people to feed their young, cast‑off belongings can sometimes be found in their nests. In addition, a nest might contain an egg or two, each equal in value to an expensive item."  },  {    name: "Angalith",    level: 5,    armor: 3,    health: 27,    damage: "7 points",    movement: "Short; long when flying",    categories: ["Weird-West", "Forgeborn"],    kind: "Creature",    motive: "Follow the will of their creator (but actually, break the control of their creator or whoever has control over them)",    environment: "Almost anywhere",    modifications: "Intellect defense as level 2; Speed defense as level 4 due to size",    description: "An angalith—a forgeborn fabricated from prismatic stained glass windows taken from cathedrals and churches—is a 15‑foot (4.5 m) tall figure.",    combat: "Angaliths slice foes with jagged edges of their stained glass wings. Angaliths have the following additional abilities and traits: Prismatic Blaze and Forgeborn Traits (Dim, Temperamental, Resistant, and Quiet).",    interaction: "Angaliths resonate with the worship and faith their component parts once witnessed. Often, that faith was preaching about the welfare of other beings, so they may stop to help those in need.",    use: "Angaliths—like most forgeborn—are tough encounters even for those who are tooled up for a fight. However, they can be assuaged with promises of saintly acts or demonstrations of good works."  },  {    name: "Inkubus",    level: 4,    armor: 0,    health: 21,    damage: "5 points",    movement: "Short; long when flying",    categories: ["Weird-West", "Forgeborn"],    kind: "Creature",    motive: "As determined when seeded (but actually, break the control of their creator or whoever has control over them)",    environment: "Almost anywhere",    modifications: "Stealth as level 8 (when not fully manifest)",    description: "An inkubus enjoys two different states of being. One is as an alchemically marked‑up page, whether that's a sheet in a book or newspaper, a letter, a broadsheet, or a wanted poster. When fully embodied, an inkubus appears as a human‑sized dragonfly‑like paper sculpture covered in constantly scrolling words.",    combat: "Inkubuses slice targets with knife‑sharp paper cuts as their attack. Inkubuses may have one or more of the following additional traits: Word of Power, Words on the Floor, and Forgeborn Traits (Resistant and Temperamental).",    interaction: "The inkubus is more self‑aware than most other forgeborn, and may interact with characters by using its Words on the Floor ability.",    use: "The PCs receive a letter from a famous alchemist, which becomes an inkubus that relays the alchemist's message (an invitation, a warning, a threat, or something else)."  },  {    name: "Hex Gunner",    level: 5,    armor: 2,    health: 23,    damage: "5 points",    movement: "Short; long while riding a horse",    categories: ["Weird-West", "Gunfighter"],    kind: "NPC",    motive: "Reap souls for Hell",    environment: "Almost anywhere",    modifications: "Initiative as level 7",    description: "Hex gunners weave iron and lead with Hellish sorcery. Gifts from a demon gained during a crossroads deal, a hex gunner's six‑shooters are demonic constructs that grant the equivalent of years of practice and occult study. Their bullets whisper in the chamber, smoking with necromancy, then scream with exultant, hellish fury when fired.",    combat: "A hex gunner makes two long‑range pistol attacks as their action. A hex gunner also has one or both of the following abilities: Hell‑Hexed Rounds or Grave Round.",    interaction: "Hex gunners are mainly concerned with reaping more souls for whoever they are pledged to. Usually, they prefer those souls be already tainted by evil, but hex gunners are angry and impatient as a rule.",    use: "PCs need information from someone who died. They learn that a \"hex gunner\" who dwells nearby may be able to communicate with the body."  },  {    name: "Deathbinder",    level: 7,    armor: 2,    health: 27,    damage: "7 points",    movement: "Short",    categories: ["Weird-West", "Necrovore"],    kind: "Creature",    motive: "Continue alchemical studies and magical collection without interruption",    environment: "Wilderness, ghost towns, and other underpopulated areas",    modifications: "",    description: "Alchemists who learn enough science and magic to retain corporeal existence after death, like risen, might transition to necrovore status. Unlike a risen, a deathbinder ensures their eternal existence by placing splinters of their soul into six bullets chambered in a \"soul pistol.\"",    combat: "A deathbinder attacks twice each round with long‑range pistol attacks. The deathbinder also has most or all of the following attacks and traits: Alchemical Pistol, Soul Pistol, and Alchemical Resurrection.",    interaction: "Deathbinders don't cotton to interruptions because the reason they chose undeath in the first place was to pursue a specialized purpose—usually, even deeper secrets of alchemy and/or collecting more unique magical artifacts and treasures.",    use: "A herd of ghost cattle wanders into town and causes problems. Folks say it's the fault of the \"lich cowboy\" who lives out in the wastes.",    loot: "The deathbinder's pistols have uniquely powerful rounds loaded in them; roll once on the Alchemical Rounds and Slugs table."  },  {    name: "Hollowed Ranger",    level: 4,    armor: 0,    health: 18,    damage: "4 points",    movement: "Short",    categories: ["Weird-West", "Necrovore"],    kind: "Creature",    motive: "Vengeance (first against their killer, then their killer's family and friends, then their killer's species, and so on)",    environment: "Almost anywhere",    modifications: "Speed defense as level 6 due to partially non‑existent body",    description: "Cloaked in a tattered duster and riding nothing but a memory, the necrovore known as a hollowed ranger is a traveling portal to elsewhere—perhaps connecting to a nightmare, the far future after everyone has died, or some region of Hell where corpses shamble beneath an eternal eclipse.",    combat: "A hollowed ranger's long‑range entropic bullet—fired from a rifle‑shaped hole in reality—deals 4 points of Intellect damage (ignores Armor) as a bit of the target's reality is blasted away. A hollowed ranger also has the following traits: Necrovore Door, Fall Into Oblivion, and Door Shift.",    interaction: "Speaking with a voice like wind on gravestones, a hollowed ranger may tell of the primary target of their vengeance, deliver a message from a more powerful necrovore, or simply promise to eat the soul of whoever tries negotiating with them.",    use: "Characters need to travel a huge distance and are told the quickest way is to use the door shift offered by a hollowed ranger, though doing so will require appeasing the ranger in some way."  },  {    name: "Risen",    level: 4,    armor: 1,    health: 12,    damage: "4 points",    movement: "Short",    categories: ["Weird-West", "Necrovore"],    kind: "Creature",    motive: "Varies",    environment: "Out-of-the-way places",    modifications: "",    description: "Clawed back into \"life\" thanks to a promise, an alchemical experiment, or a demonic curse straight out of Hell, risen look normal enough—from a distance. Up close, something ain't right. Risen—also known as the Damned—spook horses and set dogs to growling.",    combat: "A risen makes a long‑range pistol attack. Risen also have one or more of the following additional traits: Damned Rounds, Necrovore Resilience, and Sometimes They Come Back.",    interaction: "Risen are rarely excitable; even those bent on mayhem are chillingly quiet as they murder and burn. Some risen are open to negotiation and alliances, while others would as soon shoot as talk.",    use: "Folks are concerned because someone who looks a lot like Luke Reynolds has taken up farming at the old Reynolds place, even though outlaws killed the whole family."  },  {    name: "Tombdrift",    level: 5,    armor: 0,    health: 23,    damage: "5 points",    movement: "Immediate",    categories: ["Weird-West", "Necrovore"],    kind: "Creature",    motive: "Bury the living; feed on life",    environment: "Desert and badlands",    modifications: "Speed defense as level 2 due to size",    description: "Necrovore sand dunes 30 feet (9 m) in diameter are sometimes seeded from those who die in the desert and are buried only by shifting sands. When inactive, it's nearly impossible to distinguish tombdrifts from regular desert dunes.",    combat: "The tombdrift abrades every creature in immediate range with scouring sand. They also have one or more of the following attacks and traits: Drain Life, Dust Devil Speed, and Sand Regeneration.",    interaction: "When they take the echo of their former shape, tombdrifts can communicate in rasping voices, and may choose to negotiate with other creatures instead of draining their life.",    use: "A sandstorm blew through the town's cemetery with enough force to rip graves out of the ground. Now, some drifts of sand left in the storm's wake have started moving.",    loot: "A tombdrift, which contains the remains of the individual who seeded it, might also have some of their belongings, such as a box with a few remaining alchemical rounds."  },  {    name: "Shade of the Tomb",    level: 5,    armor: 0,    health: 20,    damage: "5 points",    movement: "Short; short when climbing",    categories: ["Weird-West", "Necrovore"],    kind: "Creature",    motive: "Douse other beings' light, life, and joy",    environment: "Almost anywhere",    modifications: "Stealth as level 7",    description: "Though thankfully rare, shades of the tomb (commonly called \"tomb shades\") may spontaneously manifest beneath the dull light of the Tomb Moon, taking form from gravestone shadows. When they resolve, they regard the world with the head of an ink-beaked raven, with half a dozen clutching ebony arms emerging from their tenebrous cloak.",    combat: "A tomb shade's touch drains life, inflicting Speed damage (ignores Armor). In dim light and darkness, a tomb shade only takes 1 point of damage from successful attacks against them. Individual tomb shades may also have one or more abilities: Siphon, Darken, Anguish, or Portal.",    interaction: "Sinister and conniving, a tomb shade doesn't speak, but uses its many arms for magical signing, usually only to make threats.",    use: "An alchemist wants PCs to collect a cursed book for their library, but whenever someone opens the tome, shadows (a tomb shade) swallow the reader."  },  {    name: "Chupacabra",    level: 3,    armor: 2,    health: 13,    damage: "5 points",    movement: "Short",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Hungers for blood",    environment: "Almost anywhere, but prefers rural areas",    modifications: "Speed defense as level 4 due to quickness; stealth and perception as level 7",    description: "Part huge dog, part crocodile; quilled like a porcupine. Chupacabras are mysterious predators that drain the blood of livestock and sometimes people.",    combat: "Chupacabras bite for 5 points of damage. They also have a long-range quill attack that puts the target to sleep for one hour on a failed difficulty 5 Might defense roll (target can try to wake each round)."  },  {    name: "Quetzalsaur",    level: 6,    armor: 2,    health: 33,    damage: "7 points",    movement: "Long when flying",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Territorial predator",    environment: "Mountain peaks and high plateaus",    modifications: "Speed defense as level 4 due to size",    description: "Giraffe-sized monstrosity with a 40-foot (12 m) wingspan. These ancient predators combine the worst aspects of pterosaur and necromancer.",    combat: "Quetzalsaurs attack with their beak for 7 points of damage. They can vomit up two zombie helpers (corpses of past victims) once per conflict. They fly a long distance each round."  },  {    name: "Grizzly Bull",    level: 6,    armor: 1,    health: 28,    damage: "6 points",    movement: "Short",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Territorial aggression",    environment: "Plains and forests",    modifications: "Speed defense as level 5 due to size; breaking through walls as level 8",    description: "Bison bull magically crossed with a grizzly bear. These massive hybrids combine the charging power of a bull with the ferocity of a grizzly.",    combat: "Grizzly bulls attack with their horns for 6 points of damage. If a foe within immediate range misses the bull, the grizzly bull gets an immediate extra attack."  },  {    name: "Deathtumbler",    level: 3,    armor: 0,    health: 9,    damage: "3 points",    movement: "Short",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Feed on carrion and living flesh",    environment: "Desert and plains",    modifications: "Speed defense as level 4; disguise (as rotting carrion) as level 6",    description: "Human-sized tumbleweeds whose 'thorns' are actually animal fangs. These ambulatory plants roll across the landscape, feeding on whatever they can catch.",    combat: "Deathtumblers slash with toothed branches for 3 points of damage. Mundane attacks deal only 1 point of damage each. They can attack all targets in immediate area if they have surprise, dealing damage and 3 additional points of Speed damage (ignores Armor) on a failed Might defense roll."  },  {    name: "Jackalope",    level: 2,    armor: 0,    health: 6,    damage: "3 points",    movement: "Long; immediate when burrowing",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Mischief and territory defense",    environment: "Plains and desert",    modifications: "Speed defense as level 4; stealth and illusions as level 5",    description: "Jackrabbit with the horns of an antelope. These trickster creatures use illusions to confuse and mislead travelers.",    combat: "Jackalopes gore with their antlers for 3 points of damage. They can create illusions that fill a short area and last for ten minutes or until interacted with."  },  {    name: "Nightcrawler",    level: 4,    armor: 0,    health: 12,    damage: "5 points",    movement: "Short; burrows",    categories: ["Weird-West", "Cursed-Beast"],    kind: "Creature",    motive: "Feed on flesh",    environment: "Underground tunnels and caves",    modifications: "Speed defense as level 3",    description: "20-foot (6 m) long earthworm with skin stripped from past prey. These horrific predators tunnel through earth and emerge to drag victims underground.",    combat: "Nightcrawlers bite for 5 points of damage. They can burrow to avoid attacks and emerge unexpectedly."  },  {    name: "Locomotem",    level: 6,    armor: 5,    health: 30,    damage: "7 points",    movement: "Short",    categories: ["Weird-West", "Forgeborn"],    kind: "Creature",    motive: "Follow creator's commands (but actually break free)",    environment: "Industrial areas and rail yards",    modifications: "Speed defense as level 4 due to size",
    description: "20-foot (6 m) tall humanoid figure fabricated from a coal-fed train engine. Steam and smoke constantly pour from its joints and riveted seams.",
    combat: "Locomotems attack with massive fists for 7 points of damage. Their steam whistle (once per hour) stuns creatures in immediate range on a failed Might defense roll. Has standard forgeborn traits."
  },
  {
    name: "Fleshmare",
    level: 4,
    armor: 3,
    health: 24,
    damage: "6 points",
    movement: "Short",
    categories: ["Weird-West", "Forgeborn"],
    kind: "Creature",
    motive: "Follow creator's commands (but actually break free)",
    environment: "Stables and abandoned ranches",
    modifications: "",
    description: "Made from the stitched-together flesh of deceased horses. These grotesque constructs retain the speed and power of their component parts.",
    combat: "Fleshmares attack with hooves for 6 points of damage. Electrical damage heals instead of harming them. Has standard forgeborn traits."
  },
  {
    name: "Alchehemoth",
    level: 5,
    armor: 0,
    health: 27,
    damage: "7 points",
    movement: "Short",
    categories: ["Weird-West", "Forgeborn"],
    kind: "Creature",
    motive: "Follow creator's commands (but actually break free)",
    environment: "Distilleries and saloons",
    modifications: "Speed defense as level 4 due to size",
    description: "10-foot (3 m) tall humanoid figure fabricated from a metallic whiskey still. Alcohol constantly drips from its joints and emanates from its breath.",
    combat: "Alchehemoths attack with massive fists for 7 points of damage. Their inebriating breath causes creatures in immediate range to fall into booze-fueled slumber for one hour on a failed Might defense roll. Has standard forgeborn traits."
  },
  {
    name: "Bounty Hunter",
    level: 4,
    armor: 1,
    health: 15,
    damage: "4 points",
    movement: "Short",
    categories: ["Weird-West", "Gunfighter"],
    kind: "NPC",
    motive: "Collect bounties and track targets",
    environment: "Frontier towns and wilderness",
    modifications: "Tracking, surveillance, stealth, and disguise as level 6",
    description: "Figure in sleek, form-fitting dark duster and wide-brimmed hat with twin guns. These professional hunters track their quarry with relentless determination.",
    combat: "Bounty hunters attack twice with long-range pistols. A melee attack with locking cuffs (level 5) binds the target to a nearby large object on a failed Speed defense roll."
  },
  {
    name: "Deadshot",
    level: 5,
    armor: 4,
    health: 27,
    damage: "7 points",
    movement: "Short",
    categories: ["Weird-West", "Gunfighter", "Forgeborn"],
    kind: "Creature",
    motive: "Follow creator's commands",
    environment: "Battlefields and boot hills",
    modifications: "Initiative as level 8",
    description: "Eight-foot (3 m) figure stitched together from the reanimated flesh of deceased gunslingers. Multiple arms allow for incredible shooting speed.",
    combat: "Deadshots make long-range pistol attacks for 7 points of damage. Once a minute they fire a necrotic bullet that deals 3 points of damage each round (ignores Armor) until the bullet is extracted with a difficulty 4 healing task."
  },
  {
    name: "Gunslinger",
    level: 4,
    armor: 1,
    health: 18,
    damage: "6 points (8 if attacking first)",
    movement: "Short",
    categories: ["Weird-West", "Gunfighter"],
    kind: "NPC",
    motive: "Vengeance, crime, or reputation",
    environment: "Frontier towns and saloons",
    modifications: "Initiative as level 7",
    description: "Grim-faced pistoleer pursuing vengeance, doing crime, or making a name for themselves. Their reputation precedes them into every saloon and street.",
    combat: "Gunslingers make long-range pistol attacks for 6 points of damage (or 8 points with eased attack if they attack before their foe). Every hit increases damage by 1 point for the rest of the encounter (to a maximum of +10)."
  },
  {
    name: "Lawman",
    level: 5,
    armor: 1,
    health: 20,
    damage: "5 points",
    movement: "Short",
    categories: ["Weird-West", "Gunfighter"],
    kind: "NPC",
    motive: "Enforce justice and maintain order",
    environment: "Towns and settlements",
    modifications: "Might defense as level 6",
    description: "Driven by a dream of justice, a lawman enforces rules even when no one else will. Their star badge gleams with righteous authority.",
    combat: "Lawmen make long-range rifle attacks. The first time a lawman would normally succumb to their wounds, they instead gain a second wind (and 10 health). Their banishing rounds deal full damage to ghosts and similarly protected creatures."
  },
  {
    name: "Ghost Rider",
    level: 6,
    armor: 1,
    health: 20,
    damage: "6 points",
    movement: "Long (mounted)",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Spread chaos and catastrophe",
    environment: "Anywhere, riding skeletal mounts",
    modifications: "",
    description: "Harbingers of chaos and catastrophe, ghost riders spread havoc long past their deaths. They ride skeletal mounts that leave burning hoofprints.",
    combat: "Ghost riders make long-range pistol attacks for 6 points of damage while riding a skeletal mount a long distance each round. Their short-range curse causes targets who fail an Intellect defense roll to lose their next turn as they freeze in terror."
  },
  {
    name: "Wraith Lord",
    level: 5,
    armor: 1,
    health: 22,
    damage: "6 points Speed damage",
    movement: "Short when flying",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Malign dominion over the living",
    environment: "Haunted locations and battlefields",
    modifications: "Stealth as level 6",
    description: "A malign artifact or especially powerful curse may form an exceptional wraith. These are the generals of the undead legions.",
    combat: "Wraith lords attack with spectral weapons that deal 6 points of Speed damage (ignores Armor) and induce targets to fall one step on the damage track each day a Might defense roll fails (three successes purge the effect). If destroyed, they usually reform the following midnight."
  },
  {
    name: "Zombie Sorcerer",
    level: 4,
    armor: 0,
    health: 18,
    damage: "4 points Speed damage",
    movement: "Immediate",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Spread undeath and decay",
    environment: "Graveyards and cursed places",
    modifications: "",
    description: "Magic-infused corpse that knows enough sorcery to be dangerous. Dark energy crackles around their rotting form.",
    combat: "Zombie sorcerers make long-range necrotic blasts that deal 4 points of Speed damage (ignores Armor) to all in an immediate area, or 1 point even with a successful defense roll. Even-numbered attack rolls that would reduce their health to 0 reduce health to 1 instead."
  }
];

// Function to create kebab-case filename from name
function createFileName(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to generate creature markdown content
function generateCreatureContent(creature) {
  const fileName = createFileName(creature.name);
  
  let content = `---
aliases:
  - ${creature.name}
tags:
  - Compendium/CSRD/en/Creatures-NPCs
  - Creature
  - Creature/Kind/${creature.kind}
  - Creature/Level/${creature.level}
  - Creature/Armor/${creature.armor}
  - Creature/Health/${creature.health}
title: ${creature.name}
collection: Creatures-NPCs
kind: ${creature.kind}
level: ${creature.level}
armor: ${creature.armor}
health: ${creature.health}
id: ${fileName}
categories:
${creature.categories.map(cat => `  - ${cat}`).join('\n')}
---

## ${creature.name}

${creature.description}

**Motive:** ${creature.motive}  
**Environment:** ${creature.environment}  
**Health:** ${creature.health}  
**Damage Inflicted:** ${creature.damage}  
${creature.armor > 0 ? `**Armor:** ${creature.armor}  \n` : ''}**Movement:** ${creature.movement}${creature.modifications ? `  \n**Modifications:** ${creature.modifications}` : ''}

### Combat

${creature.combat}

### Interaction

${creature.interaction}

### Use

${creature.use}`;

  if (creature.loot) {
    content += `

### Loot

${creature.loot}`;
  }

  return content;
}

// Function to write all creature files
function writeCreatureFiles() {
  const outputDir = path.join(__dirname, 'src', 'content', 'compendiums', 'csrd', 'en', 'creatures-npcs');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Generating Weird West creature files...');
  console.log(`Output directory: ${outputDir}`);

  allCreatures.forEach((creature, index) => {
    const fileName = createFileName(creature.name);
    const filePath = path.join(outputDir, `${fileName}.md`);
    const content = generateCreatureContent(creature);

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Created: ${fileName}.md (Level ${creature.level} ${creature.kind})`);
    } catch (error) {
      console.error(`❌ Error creating ${fileName}.md:`, error.message);
    }
  });

  console.log(`\n🎉 Generated ${allCreatures.length} Weird West creature files!`);
  console.log('\nCategories used:');
  const allCategories = [...new Set(allCreatures.flatMap(c => c.categories))];
  allCategories.forEach(cat => console.log(`  - ${cat}`));
}

// Run the script
writeCreatureFiles();