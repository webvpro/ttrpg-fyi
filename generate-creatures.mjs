import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const creatures = [
  {
    name: "Alchemist",
    level: 5,
    armor: 0,
    health: 18,
    damage: "5 points",
    movement: "Short",
    categories: ["Weird-West", "NPC"],
    kind: "NPC",
    motive: "Use alchemy to achieve their ends",
    environment: "Almost anywhere",
    modifications: "Speed defense as level 6 due to their forgeborn companion; alchemical knowledge as level 7",
    description: "Alchemists ain't afraid to use logic and laborious experiments to claw magic from the dirt. Their knowledge of alchemical lore allows them to imbue inert objects with arcane volatility. They employ tinctures that heal or control, fling powders that explode or transform, and most impressively, animate rude substances into pseudo‑living entities known as forgeborn. Many alchemists pursue their craft merely from a desire to push back the boundaries of ignorance. Others have a specific goal in mind, such as to gain riches or power, to bring back a loved one, or merely to make a friend.",
    combat: `Alchemists use long range pistols or rifles. At least one of their bullets may be alchemical. A forgeborn assistant also accompanies most alchemists, often helping with defense. Forgeborn assistant: level 3; health 15; Armor 1. Especially accomplished alchemists may have a far more powerful forgeborn assistant, such as a deadshot or angalith.

A given alchemist also has one or two of the following alchemical resources available in combat:

- **Empower:** The alchemist uses a tincture to regain 11 points of health and gain +3 to Armor for one minute (or gives this tincture to an ally).
- **Petrify:** The alchemist flings a powder that turns up to two targets in immediate range to stone on a failed Might defense roll. Targets remain stone for one minute, then regain their flesh.
- **Flummox:** The alchemist flings a powder causing two targets in immediate range to randomly attack their allies on a failed Intellect defense roll. Affected targets remain flummoxed for one minute or until they succeed on an Intellect defense roll on their turn.
- **Blast:** The alchemist flings a flask a short range that detonates in an acidic blast on impact, dealing damage to all creatures in an immediate area on a failed Speed defense roll, or 1 point of damage on a successful roll.
- **Non-Combat Alchemy:** A given alchemist could create tinctures able to revive the recently dead, animate dead flesh, transform lead into gold, and so on, if given many hours or days.`,
    interaction: "Few alchemists can resist talking about their research and the wonders of magic that \"natural philosophy\" can unlock, regardless of their larger goals.",
    use: "The PCs need to revive an unresponsive forgeborn to learn what it knows, which means they need to find an alchemist.",
    loot: "An alchemist may have a couple of useful items (roll twice on the Alchemical Rounds and Slugs table), assuming they didn't use them in combat.",
    gmIntrusion: "The alchemist's round has a chemical load that expands and hardens when exposed to air, trapping the target in the resulting crust until they can escape."
  },
  {
    name: "Dire Coyote",
    level: 4,
    armor: 1,
    health: 15,
    damage: "4 points",
    movement: "Short",
    categories: ["Weird-West", "Cursed-Beast"],
    kind: "Creature",
    motive: "Hungers for flesh, defense",
    environment: "Almost anywhere dark and isolated or near places ghosts haunt, individually and in teams of two or three",
    modifications: "Perception as level 6; attacks and defense against ghosts, wraiths, and other spirits as level 6",
    description: "Remnants of ancient populations reinvigorated by cursed magic, dire coyotes hunt lost and isolated creatures, regardless of whether the prey is alive or already dead. Dire coyotes are gaunt and sinewy, almost as large as a horse. Their hides are branded with arcane sigils that still glow and smoke with the sorcery that pulses through them. Dire coyotes usually hunt in teams of two or three. However, their howls give the impression of a far larger number of individuals in the night.",
    combat: `A dire coyote bites each round.

A dire coyote also has one or more of the following traits:
- **Forlorn Howl:** The dire coyote unleashes a forlorn howl that magically resonates within an adjacent short area (no more than once every few minutes). Creatures in the area take 4 points of Intellect damage (ignores Armor), causing them to run terrified in a random direction determined by the GM for several minutes, unless they succeed on an Intellect defense roll to end the effect early.
- **Ghost eater:** A dire coyote's attacks affect incorporeal ghosts, wraiths, and similar spirits. If a dire coyote destroys a ghost or wraith, that usually ends the haunting, even if the spirit normally returns. Destroying a ghost heals a dire coyote to full health, but afterward the dire coyote must sleep for a few hours to "digest" the essence.
- **Ignite Gun:** If a dire coyote is damaged by a gun attack (or bow, or similar mechanism), the gun wielder must immediately succeed on an Intellect defense roll or their gun ignites, burning anyone holding it for 4 points of damage each round for three rounds.`,
    interaction: "Dire coyotes have a secret language and society, but usually present to outsiders as just particularly dangerous coyotes. However, if they wish, dire coyotes can speak with the voice and memories of any ghost they have personally destroyed.",
    use: "A sheriff who posted a bounty on dire coyotes has gone missing, and their spouse needs someone to go find them.",
    gmIntrusion: "The dire coyote takes on the likeness of a ghost of someone the character knew—the ghost is someone the dire coyote has recently destroyed."
  },
  {
    name: "Frostwalker",
    level: 3,
    armor: 1,
    health: 12,
    damage: "4 points",
    movement: "Short",
    categories: ["Weird-West", "Cursed-Beast"],
    kind: "Creature",
    motive: "Revenge",
    environment: "Almost anywhere cold enough for snow and ice",
    modifications: "Perception as level 5",
    description: "A frostwalker is a cursed beast made of packed snow layered over the severed limbs, heads, gristle, antlers, and sinew from deer, wolves, and sometimes people who've died in the cold. As such, they vary in appearance. Some are about the size of wolves, others are human‑sized with antlers, and a few—especially those with more limbs and/or heads than normal—can be up to twice the size of a person. Frostwalkers may be creations of dire sorcery, though some gain motive force from the spirits of blizzards, ice, and enmity earned through past atrocity.",
    combat: `Frostwalkers bite, gore, or claw with whatever body part they have available.

Frostwalkers may also have one or more of the following abilities:
- **Frozen:** The frostwalker regains 1 point of health for each point of damage they would otherwise take from cold. In freezing temperatures and lower, they regain 1 point of health each round (assuming they're not destroyed).
- **Scream the Blizzard:** The frostwalker can expel screaming cold winds (no more than once every few minutes), filling an adjacent short area. Creatures in the area take 4 points of ambient damage from the cold and, on a failed Might defense roll, are frozen in place for one minute or until they succeed on a Might‑based roll as their action. Even a successful Might defense roll dazes the target with cold, hindering their tasks for one minute.
- **Small and Quick:** About the size of a wolf, this frostwalker only has 1 Armor but can move a long distance each round.
- **Snow Monster:** Twice the size of a person, this frostwalker might have two or more heads (one wolf, one deer) and extra arms. It attacks twice per round, moves an immediate distance each round, and has 24 health.`,
    interaction: "Frostwalkers are usually made (or form spontaneously) to enact vengeance or to attack a foe, and will do so until they're destroyed.",
    use: "When the lake freezes over, monstrous things made of snow slide across the solid surface and begin terrorizing whatever they find.",
    gmIntrusion: "An important piece of the character's equipment freezes solid, rendering it unusable until it's thawed."
  },
  {
    name: "Hellfire Steed",
    level: 5,
    armor: 1,
    health: 21,
    damage: "5 points",
    movement: "Short",
    categories: ["Weird-West", "Cursed-Beast"],
    kind: "Creature",
    motive: "Havoc and suffering",
    environment: "Almost anywhere; sometimes ridden as a mount by the powerful or foolish",
    modifications: "",
    description: "Intermittently ridden straight out of Hell by demons wearing borrowed flesh, the Damned, and others seeking to escape the accursed underworld, hellfire steeds are demonic, fire‑dripping destriers. Their manes are boiling napalm, their glowing red hooves leave prints that burn and smolder for days, and a single demonic horn curls from their brows. Once free of Hell, these steeds typically buck their riders and race off across the prairielands, setting blazes as they go, apparently seeking to wreak as much havoc as they can before they're reclaimed by Hell.",
    combat: `Hellfire steeds attack twice each round with their horn.

Hellfire steeds also have one or more of the following traits:
- **Fires of the Underworld:** Anyone not chosen as a rider by the hellfire steed that ends a turn within immediate range of the creature takes 2 points of damage from hellish heat.
- **Lifedraining Horn:** The hellfire steed deals an additional 5 points of Speed damage (ignores Armor) with its horn attack once every few minutes, gaining that drained life as health.
- **Render Immune to Fire:** If the hellfire steed is compelled or agrees to serve as a mount, the steed's rider takes no damage from the steed's Fires of the Underworld and gains +2 Armor against fire from other sources while riding.
- **From Hell:** Once per year, a hellfire steed can emerge from or enter Hell through a transitory portal, bearing riders if it chooses.

**Death Gallop:** If killed, a hellfire steed's body animates one last time, galloping a long distance before turning to ash. Everyone along its final route takes 5 points of fire damage on a failed Speed defense roll.`,
    interaction: "Though usually driven by demonic desire, hellfire steeds are fully sapient and can speak all languages. They may negotiate with someone seeking to use them as a mount, but only in return for a promise of committing atrocities.",
    use: "Stuck in Hell or a similarly hellish place, characters may have to ask a hellfire steed for a ride out.",
    loot: "A hellfire steed's horn is a sought‑after alchemist ingredient; a full horn is a very expensive item.",
    gmIntrusion: "The steed decides it no longer wants the character as a rider and takes back their immunity to fire."
  },
  {
    name: "Sulfur Stalker",
    level: 5,
    armor: 2,
    health: 21,
    damage: "6 points",
    movement: "Short; swims a short distance each round",
    categories: ["Weird-West", "Cursed-Beast"],
    kind: "Creature",
    motive: "Defense, gather food for newly hatched young",
    environment: "Anywhere near hot springs, or anywhere during seasons of migration",
    modifications: "Speed defense as level 4 due to size; stealth as level 6",
    description: "Dwelling in steaming, acidic hot springs, sulfur stalkers' umbral, scaled bodies can reach lengths of 10 or more feet (3 m). Their broad, flat heads feature wide, gaping mouths filled with rows of sharp teeth. Feathery tendrils fringe their heads, twining and stretching as if of their own accord. Powerful clawed limbs and an eel‑like tail mean they're equally adept on land and in liquid—even boiling hot, acrid springs. The overpowering smell of sulfur—like rotten eggs—precedes and follows them. Sulfur stalkers periodically emerge from their pools and migrate long distances, presumably to mate. During this migration, they grow ravenously hungry, preying on anything. They also drag away people, which they feed to their newly hatched young.",
    combat: `Sulfur stalkers bite.

Additional sulfur stalker abilities include one or more of the following:
- **Tendril Aura:** Any creature that begins their turn within immediate range of a sulfur stalker must succeed on a Speed defense roll or be grazed by a feathery tendril for 3 points of damage from dripping acid.
- **Acid Geyser:** A boiling‑hot acid stream sprays all creatures in a short‑range line, dealing 9 points of damage on a failed Speed defense roll, and 2 points of damage even if successful. (The sulfur stalker can't make this attack more than once every few minutes.)
- **Regrow:** If damaged, a sulfur stalker regains 2 health each round on any round it hasn't taken damage from cold or magic. This ability is so pernicious that an entirely new sulfur stalker could grow from a severed portion.`,
    interaction: "Sulfur stalkers have a language, and some can speak human tongues, especially those that have made deals with locals. Such deals usually involve turning over some number of other people each year for the stalker to eat—culled from a local jail, taken in outlaw raids, etc.",
    use: "A bounty for sulfur stalker eggs is so generous that folks everywhere begin hunting. This riles up the local stalker population, who begin attacking towns and homesteads preemptively.",
    loot: "Because sulfur stalkers tend to capture people to feed their young, cast‑off belongings can sometimes be found in their nests—which are well‑hidden locations near hot springs, but not under them. In addition, a nest might contain an egg or two, each equal in value to an expensive item.",
    gmIntrusion: "A severed segment of a sulfur stalker animates as a half‑size, level 3 sulfur stalker that attacks the character. The stalker might have to bite off its tail to start this process."
  },
  {
    name: "Angalith",
    level: 5,
    armor: 3,
    health: 27,
    damage: "7 points",
    movement: "Short; long when flying",
    categories: ["Weird-West", "Forgeborn"],
    kind: "Creature",
    motive: "Follow the will of their creator (but actually, break the control of their creator or whoever has control over them)",
    environment: "Almost anywhere",
    modifications: "Intellect defense as level 2; Speed defense as level 4 due to size",
    description: "An angalith—a forgeborn fabricated from prismatic stained glass windows taken from cathedrals and churches—is a 15‑foot (4.5 m) tall figure.",
    combat: `Angaliths slice foes with jagged edges of their stained glass wings.

Angaliths have the following additional abilities and traits:
- **Prismatic Blaze:** Six prismatic shafts of light shine from the angalith's core as their action, illuminating the sins of all creatures within short range (no more than once each minute). A given target is subject to only one shaft of light, which they must make an Intellect defense roll to resist. Choose or roll for which sin is brought to light for each target:
  1. Red (Wrath): Target attacks an ally on their next turn.
  2. Orange (Envy): Target throws mud/dung/etc. in the face of an ally on their next turn.
  3. Yellow (Apathy): Target sits down and stares into space on their next turn.
  4. Green (Greed): Target attempts to steal something from an ally on their next turn.
  5. Blue (Gluttony): Target chows down nearest food—or goes looking for some—on their next turn.
  6. Indigo (Pride): Target sniffs disdainfully and walks away from the combat on their next turn.
- **Forgeborn Traits:** Angaliths are Dim, Temperamental, Resistant, and Quiet.`,
    interaction: "Angaliths resonate with the worship and faith their component parts once witnessed. Often, that faith was preaching about the welfare of other beings, so they may stop to help those in need. But if they see someone act against the common good, in an angalith's estimation, that someone is due only hellfire.",
    use: "Angaliths—like most forgeborn—are tough encounters even for those who are tooled up for a fight. However, they can be assuaged with promises of saintly acts or demonstrations of good works, which could turn an angry angalith found in a demolished church into a temporary ally.",
    gmIntrusion: "The character sliced by the jagged edge of a stained glass wing begins bleeding for 1 ambient damage each round until someone succeeds on a difficulty 3 healing task to stop the flow."
  },
  {
    name: "Inkubus",
    level: 4,
    armor: 0,
    health: 21,
    damage: "5 points",
    movement: "Short; long when flying",
    categories: ["Weird-West", "Forgeborn"],
    kind: "Creature",
    motive: "As determined when seeded (but actually, break the control of their creator or whoever has control over them)",
    environment: "Almost anywhere",
    modifications: "Stealth as level 8 (when not fully manifest)",
    description: "An inkubus enjoys two different states of being. One is as an alchemically marked‑up page, whether that's a sheet in a book or newspaper, a letter, a broadsheet, or a wanted poster. There's little to distinguish this inkubus 'seed' from regular paper without a concerted search for magical influence. Each seed has a trigger, set by the alchemist who created it. The trigger could be when the page is read, when a certain amount of time is expired, when a specified individual sees the page, or something else. A triggered inkubus takes on substance either immediately, as nearby paper swirls in and accretes around the seed, or gradually, if the inkubus is meant to remain unobtrusive (as often happens when the seed is a wanted poster whose target just wandered by). When fully embodied, an inkubus appears as a human‑sized dragonfly‑like paper sculpture covered in constantly scrolling words.",
    combat: `Inkubuses slice targets with knife‑sharp paper cuts as their attack.

Inkubuses may have one or more of the following additional traits, depending on their purpose:
- **Word of Power:** An inkubus contains a "word of power" that it can display as an action once per day. A target in short range who sees it and fails an Intellect defense roll is affected as indicated for one minute (or longer for Forget):
  - Stunned: Target takes no action.
  - Confess: Target starts with their most egregious crimes/secrets, one per turn.
  - Betray: Target attacks nearby allies.
  - Forget: Target goes back to whatever they were doing and doesn't remember meeting the inkubus unless or until they meet again.
- **Words on the Floor:** The inkubus can send written words to their creator (or anyone), such as a warning, an update on their status, or some other predetermined signal. Words appear on a surface near the creator.
- **Forgeborn Traits:** Inkubuses are Resistant and Temperamental.`,
    interaction: "The inkubus is more self‑aware than most other forgeborn, and may interact with characters by using its Words on the Floor ability.",
    use: "The PCs receive a letter from a famous alchemist, which becomes an inkubus that relays the alchemist's message (an invitation, a warning, a threat, or something else).",
    gmIntrusion: "Important documents or other papers the character carries flap away and become part of the inkubus."
  },
  {
    name: "Hex Gunner",
    level: 5,
    armor: 2,
    health: 23,
    damage: "5 points",
    movement: "Short; long while riding a horse",
    categories: ["Weird-West", "Gunfighter"],
    kind: "NPC",
    motive: "Reap souls for Hell",
    environment: "Almost anywhere",
    modifications: "Initiative as level 7",
    description: "Hex gunners weave iron and lead with Hellish sorcery. Gifts from a demon gained during a crossroads deal, a hex gunner's six‑shooters are demonic constructs that grant the equivalent of years of practice and occult study. Their bullets whisper in the chamber, smoking with necromancy, then scream with exultant, hellish fury when fired. Each round is imbued with fragments of souls from those the hex gunner has previously defeated in gunfights. Hex gunners may be pledged to a literal lord of Hell (or some other occult being of damnation and pain, such as a ghost rider). Only if they harvest a certain number of souls during their gunfighting career is their own soul safe from being claimed when their life ends. That value may be visible as a glowing number burning in their eyes.",
    combat: `A hex gunner makes two long‑range pistol attacks as their action.

A hex gunner also has one or both of the following abilities:
- **Hell‑Hexed Rounds:** A bullet that deals damage stays in the wound on a hit, cursing the target until the bullet is surgically removed (each requiring a successful difficulty 6 healing task and inflicting 1 point of ambient damage). Curses vary, including:
  - Soul of damned previous target possesses the new target once per day for one minute on a failed Intellect defense roll. Possessing spirit may work against target, or simply take off seeking some goal of their own.
  - Wound leaks a horrific smell and discharge; target's pleasant interaction tasks are hindered by two steps.
  - Target's GM intrusion range increases by 1 until bullet is removed.
- **Grave Round:** If they shoot a corpse, the corpse rises as a zombie that serves the hex gunner for a day. During this period, the zombie can reveal secrets it knew in life to the hex gunner.`,
    interaction: "Hex gunners are mainly concerned with reaping more souls for whoever they are pledged to. Usually, they prefer those souls be already tainted by evil, but hex gunners are angry and impatient as a rule and have nearly as little sympathy for the innocent as they do for the damned.",
    use: "PCs need information from someone who died. They learn that a \"hex gunner\" who dwells nearby may be able to communicate with the body.",
    gmIntrusion: "The hex gunner releases a demon from their gun that immediately attacks the character."
  },
  {
    name: "Deathbinder",
    level: 7,
    armor: 2,
    health: 27,
    damage: "7 points",
    movement: "Short",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Continue alchemical studies and magical collection without interruption",
    environment: "Wilderness, ghost towns, and other underpopulated areas",
    modifications: "",
    description: "Alchemists who learn enough science and magic to retain corporeal existence after death, like risen, might transition to necrovore status. Unlike a risen, a deathbinder ensures their eternal existence by placing splinters of their soul into six bullets chambered in a \"soul pistol.\" If all six bullets are fired, the deathbinder is finally destroyed. Two pistols are holstered on a deathbinder's gun belt: the deathbinder's soul pistol, which they reserve for special circumstances, and their \"workaday\" six‑shooter, loaded with unique alchemical rounds. A deathbinder usually resides alone, herding cursed beasts or forgeborn creatures of their own creation, probably astride a fleshmare.",
    combat: `A deathbinder attacks twice each round with long‑range pistol attacks.

The deathbinder also has most or all of the following attacks and traits:
- **Alchemical Pistol:** Targets hit by a "workaday" pistol shot take damage and, on a failed Might or Intellect defense roll, suffer one additional effect:
  - Target is frozen in amber until they can escape.
  - Deathbinder learns one of the target's secrets.
  - Target is teleported to a pre‑prepared nearby location.
- **Soul Pistol:** Under extreme circumstances, a deathbinder may fire a precious bullet from their soul pistol, hoping they'll have a chance later to rebind the liberated soul energy. A bullet from the soul gun has all of the following deadly traits:
  - Automatically hits target within long range—a targeted PC should get a GM intrusion for this attack.
  - The soul round deals damage and the character descends two steps on the damage track, or one step on a successful Might defense roll.
  - Target is cursed on a failed Intellect defense roll.
- **Alchemical Resurrection:** If destroyed, a deathbinder usually reforms within 1d6 days unless all six bullets from their soul pistol are fired.`,
    interaction: "Deathbinders don't cotton to interruptions because the reason they chose undeath in the first place was to pursue a specialized purpose—usually, even deeper secrets of alchemy and/or collecting more unique magical artifacts and treasures.",
    use: "A herd of ghost cattle wanders into town and causes problems. Folks say it's the fault of the \"lich cowboy\" who lives out in the wastes.",
    loot: "The deathbinder's pistols have uniquely powerful rounds loaded in them; roll once on the Alchemical Rounds and Slugs table.",
    gmIntrusion: "The deathbinder makes an extra pistol attack even if it's not their turn."
  },
  {
    name: "Hollowed Ranger",
    level: 4,
    armor: 0,
    health: 18,
    damage: "4 points",
    movement: "Short",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Vengeance (first against their killer, then their killer's family and friends, then their killer's species, and so on)",
    environment: "Almost anywhere",
    modifications: "Speed defense as level 6 due to partially non‑existent body",
    description: "Cloaked in a tattered duster and riding nothing but a memory, the necrovore known as a hollowed ranger is a traveling portal to elsewhere—perhaps connecting to a nightmare, the far future after everyone has died, or some region of Hell where corpses shamble beneath an eternal eclipse. Hollowed rangers ride forth where good people were gunned down in cold blood and then dumped in shallow, unmarked graves. The injustice rips a hole in the world, which the murdered spirit possesses and becomes. Unfortunately, a hollowed ranger's desire for vengeance doesn't restrict them from visiting horror on most everything they encounter.",
    combat: `A hollowed ranger's long‑range entropic bullet—fired from a rifle‑shaped hole in reality—deals 4 points of Intellect damage (ignores Armor) as a bit of the target's reality is blasted away.

A hollowed ranger also has the following traits:
- **Necrovore Door:** As their action, the ranger shudders as a wraith lord emerges from their body, acting as the ranger wishes for one minute. After one minute, the wraith is drawn back into the ranger, or it just fades. (Other necrovores could instead be called from the deathly realms a hollowed ranger is connected to, but anything level 3 or higher takes two actions to disgorge.)
- **Fall Into Oblivion:** On a failed Might defense roll, a living creature starting their turn in immediate range of a hollowed ranger is sucked through the hollowed ranger's form into the deathly realm beyond. This realm is anathema to life—the affected target immediately takes 4 points of Intellect damage (ignores Armor) from the necrotic energy draining their soul. Affected targets are drained of life each additional round they spend in the deathly realm, but can attempt a Might‑based task to pull themselves back to their reality. The hollowed ranger regains 1 point of health each time an affected target's soul is so drained.
- **Door Shift:** A hollowed ranger can instantly transport themself miles away as its action, if they have previously been to or seen the other location.`,
    interaction: "Speaking with a voice like wind on gravestones, a hollowed ranger may tell of the primary target of their vengeance, deliver a message from a more powerful necrovore, or simply promise to eat the soul of whoever tries negotiating with them.",
    use: "Characters need to travel a huge distance and are told the quickest way is to use the door shift offered by a hollowed ranger, though doing so will require appeasing the ranger in some way.",
    gmIntrusion: "The character drawn through the hollowed ranger's form to a deathly realm is attacked by a ghost lurking there."
  },
  {
    name: "Risen",
    level: 4,
    armor: 1,
    health: 12,
    damage: "4 points",
    movement: "Short",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Varies",
    environment: "Out-of-the-way places",
    modifications: "",
    description: "Clawed back into \"life\" thanks to a promise, an alchemical experiment, or a demonic curse straight out of Hell, risen look normal enough—from a distance. Up close, something ain't right. That's all the more obvious if the risen is someone folks knew before they died. Risen—also known as the Damned—spook horses and set dogs to growling. They have unblinking eyes like coins and skin the color of a snake's belly, and are naturally as motionless as a corpse when not engaged in an activity. A risen may just want to be left alone, or they could seek to right a wrong, serve as a deathbinder's herald, or ride in an undead posse looking to take as much as they can from a world they know would just as soon put them back in their grave.",
    combat: `A risen makes a long‑range pistol attack.

Risen also have one or more of the following additional traits:
- **Damned Rounds:** Every other attack against PCs is Hell‑tainted, blazing with hellfire. If one of these bullets strikes true, the target combusts for an additional 3 points of damage (ignores Armor) each round until an action is taken to smother the flames.
- **Necrovore Resilience:** The first time in an encounter that a risen would normally succumb to their wounds (having lost all their health), they instead remain active and regain 1 health. In addition, risen don't breathe—drowning, suffocation, and similar threats don't faze them.
- **Sometimes They Come Back:** A destroyed risen might reanimate within a few days, unless its head is removed from its body and separated by a couple of miles, or the body is burned to ash.`,
    interaction: "Risen are rarely excitable; even those bent on mayhem are chillingly quiet as they murder and burn. Some risen are open to negotiation and alliances, while others would as soon shoot as talk.",
    use: "Folks are concerned because someone who looks a lot like Luke Reynolds has taken up farming at the old Reynolds place, even though outlaws killed the whole family.",
    gmIntrusion: "The character recognizes the risen as someone they personally killed and is dazed with surprise until the end of their next turn, hindering all tasks."
  },
  {
    name: "Tombdrift",
    level: 5,
    armor: 0,
    health: 23,
    damage: "5 points",
    movement: "Immediate",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Bury the living; feed on life",
    environment: "Desert and badlands",
    modifications: "Speed defense as level 2 due to size",
    description: "Necrovore sand dunes 30 feet (9 m) in diameter are sometimes seeded from those who die in the desert and are buried only by shifting sands. When inactive, it's nearly impossible to distinguish tombdrifts from regular desert dunes. But when one senses life, the necrovore rolls forward like a slow ocean wave, or alternatively, condenses into the shape of the spirit that seeded the undead thing. When assuming the echo of the person who seeded them, tombdrifts might speak. However, keeping such a shape requires energy—the assumed shape is constantly crumbling away and reforming, until it collapses once again into an unquiet, hungry dune.",
    combat: `The tombdrift abrades every creature in immediate range with scouring sand. The tombdrift is immune to poison, disease, and life‑draining effects.

They also have one or more of the following attacks and traits:
- **Drain Life:** One target damaged by the tombdrift is subject to life drain, taking 3 points of Speed damage (ignores Armor) on a failed Might defense roll. In addition, the target is sickened until the end of their next turn, hindering all tasks. On a successful defense roll, the target still takes 1 point of Speed damage, but isn't sickened.
- **Dust Devil Speed:** The tombdrift spins up into a dust devil of sand that speeds forward a long distance (no more than once every minute), attacking all creatures along the line of travel. On a failed Might defense roll, damaged targets are also blinded on their next turn.
- **Sand Regeneration:** Tombdrifts regain 1 health each round they are in a desert or badlands region, unless they've taken damage from banishing rounds or similar anti‑undead attacks (in which case they don't begin regaining health again for a couple of minutes).`,
    interaction: "When they take the echo of their former shape, tombdrifts can communicate in rasping voices, and may choose to negotiate with other creatures instead of draining their life. Tombdrifts may want their remains properly buried, or something else. Some tombdrifts don't care or don't remember their lives and simply wish to feed.",
    use: "A sandstorm blew through the town's cemetery with enough force to rip graves out of the ground. Now, some drifts of sand left in the storm's wake have started moving.",
    loot: "A tombdrift, which contains the remains of the individual who seeded it (maybe just a few eroded bones), might also have some of their belongings, such as a box with a few remaining alchemical rounds.",
    gmIntrusion: "The character is pulled into the dune and is crushed and suffocated for 5 points of ambient damage each round until they can escape with a Might‑based roll as their action."
  },
  {
    name: "Shade of the Tomb",
    level: 5,
    armor: 0,
    health: 20,
    damage: "5 points",
    movement: "Short; short when climbing",
    categories: ["Weird-West", "Necrovore"],
    kind: "Creature",
    motive: "Douse other beings' light, life, and joy",
    environment: "Almost anywhere",
    modifications: "Stealth as level 7",
    description: "Though thankfully rare, shades of the tomb (commonly called \"tomb shades\") may spontaneously manifest beneath the dull light of the Tomb Moon, taking form from gravestone shadows. Other times tomb shades are called into brief existence by a summoning spell. When they resolve, they regard the world with the head of an ink-beaked raven, with half a dozen clutching ebony arms emerging from their tenebrous cloak. If need be, a tomb shade can seep through cracks and around barriers that would stymie most corporeal beings.",
    combat: `A tomb shade's touch drains life, inflicting Speed damage (ignores Armor). In dim light and darkness, a tomb shade only takes 1 point of damage from successful attacks against them.

Individual tomb shades may also have one or more of the following abilities they can use as their action:
- **Siphon:** On a failed Might defense task, a short‑range necrotic ray deals 5 points of Speed damage (ignores Armor), which the shade gains as health, up to their maximum.
- **Darken:** The shade summons magical darkness that blooms from a point within long range (no more than once every ten minutes). The darkness fills an area an immediate distance across and lasts for ten minutes. Even creatures that can normally see in darkness can't see in this magical murk, except for tomb shades and undead.
- **Anguish:** The shade drains happiness and joy from all creatures within immediate range (no more than once per minute). Targets that fail an Intellect defense roll take 5 points of Intellect damage (ignores Armor) and are disconsolate, losing their next turn. Each turn after that they can attempt another Intellect defense roll to regain their composure and act normally.
- **Portal:** The tomb shade dissolves, their animus departing (possibly back to the Tomb Moon). The resulting implosive burst of necrotic energy deals 3 points of Speed damage (ignores Armor) to all creatures within immediate range that fail a Speed defense task. Damaged targets must also succeed on a Might defense roll or be pulled partially through the portal, sustaining 5 points of Speed damage (ignores Armor) each round from the necrotic contact until they can pull free with a successful Might roll as their action. When the last target pulls free (or dies and is pulled through), the portal closes.`,
    interaction: "Sinister and conniving, a tomb shade doesn't speak, but uses its many arms for magical signing, usually only to make threats.",
    use: "An alchemist wants PCs to collect a cursed book for their library, but whenever someone opens the tome, shadows (a tomb shade) swallow the reader."
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

${creature.combat}`;

  if (creature.interaction) {
    content += `

### Interaction

${creature.interaction}`;
  }

  if (creature.use) {
    content += `

### Use

${creature.use}`;
  }

  if (creature.loot) {
    content += `

### Loot

${creature.loot}`;
  }

  if (creature.gmIntrusion) {
    content += `

### GM Intrusion

${creature.gmIntrusion}`;
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

  console.log('🚀 Generating Weird West creature files (OVERWRITING EXISTING)...');
  console.log(`Output directory: ${outputDir}`);

  let createdCount = 0;
  let overwrittenCount = 0;

  creatures.forEach((creature, index) => {
    const fileName = createFileName(creature.name);
    const filePath = path.join(outputDir, `${fileName}.md`);
    const content = generateCreatureContent(creature);

    const fileExists = fs.existsSync(filePath);

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      if (fileExists) {
        console.log(`✅ Overwritten: ${fileName}.md (Level ${creature.level} ${creature.kind})`);
        overwrittenCount++;
      } else {
        console.log(`✅ Created: ${fileName}.md (Level ${creature.level} ${creature.kind})`);
        createdCount++;
      }
    } catch (error) {
      console.error(`❌ Error writing ${fileName}.md:`, error.message);
    }
  });

  console.log(`\n🎉 Processing complete!`);
  console.log(`📝 Created: ${createdCount} new files`);
  console.log(`🔄 Overwritten: ${overwrittenCount} existing files`);
  console.log(`📊 Total: ${creatures.length} creature files`);
  
  console.log('\n📋 Categories used:');
  const allCategories = [...new Set(creatures.flatMap(c => c.categories))];
  allCategories.forEach(cat => console.log(`  - ${cat}`));
}

// Run the script
writeCreatureFiles();