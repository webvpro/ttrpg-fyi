import fs from 'fs';
import path from 'path';

// Define the artifacts directory path
const artifactsDir = path.join('.', 'src', 'content', 'compendiums', 'csrd', 'en', 'artifacts');

// Create the artifacts directory if it doesn't exist
if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
    console.log(`Created directory: ${artifactsDir}`);
}

// Define the artifact data (from your selected text)
const artifactData = `Conspicuous Badge
Level: 1d6 + 1 
Form: Sheriff's badge that always catches the light just right 
Effect: If the wearer polishes, touches, or merely thinks about activating their worn and visible badge as part of a persuasion or intimidation task, the task is eased by two steps, or three steps if the artifact is level 5 or higher. 
Depletion: 1 in 1d10 

Deck of Second Chances 
Level: 1d6 
Form: Standard card deck; however, face cards take on strong resemblance to deck's current bearer 
Alternate Form: Sometimes a deck of second chances becomes linked with a group instead of an individual bearer; in such cases, the face cards take on the resemblance of everyone in that group 
Effect: Each time the bearer of the deck (or a member of a group linked to the deck) would otherwise die, a random card is drawn and disappears from the deck. The beneficiary of this effect immediately regains Pool points equal to the artifact's level they can allocate however they choose. 
In addition, different cards grant different effects, as follow. To determine the effect, draw a card from a standard card deck that includes jokers, or use the Midnight Deck. (If no deck is handy, the GM determines the card drawn.) 
A character can also choose to draw a card from the deck at any time (regardless of whether they face mortal peril), and gain the additional benefit noted for that card, if any. 
    • Number Card, Any Suite: No additional effect other than the bearer's survival. 
    • Gears (Diamonds) Face Card: In addition to the bearer surviving, they find a random expensive item in their possession. 
    • Guns (Clubs) Face Card: In addition to the bearer surviving, they find their weapons and bandoliers fully loaded, including one random alchemical round. 
    • Elixirs (Hearts) Face Card: In addition to the bearer surviving, they gain an alchemical protective sheen (granting them +1 to Armor) that lasts until midnight.
    • Eyes (Spades) Face Card: In addition to the bearer surviving, the creature responsible for almost killing the bearer takes a number of points of Intellect damage equal to the artifact's level. 
    • Ace, any Suit: In addition to the bearer surviving, they gain a free level of Effort that they can apply to any task, which they must use before midnight. 
    • Jackalopes (Jokers): Bearer survives, but instead of bouncing back, they are treated as if debilitated until they rest for ten hours. 
Depletion: 1 in 1d20

Demon Pistol
Level: 1d6 + 3 
Form: Six‑gun‑shaped demon; potentially self‑aware 
Effect: This firearm is often a heavy long‑range weapon (but it can take on smaller form factors, becoming a medium or light pistol in the process). Attacks with the demon pistol are eased, or eased by two steps if a light pistol. 
If the shooter wishes, a successful hit causes the bullet lodged in the wound to transform into a tiny demonic imp (level 3) with mouths for eyes. The imp automatically deals 3 points of damage each round to the target until the target removes the imp with a successful Speed‑based roll; once removed or a minute elapses, the transformation magic fades and the body is revealed as no more than a spent bullet. 
The shooter's attacks and defenses against demons are hindered while they bear this artifact. 
Depletion: 1 in 1d20

Downtime Bandana
Level: 1d6 + 2 
Form: Kerchief stitched with alchemical symbols 
Effect: When the wearer pulls the bandana up over their mouth and nose as part of another action, time stops for everyone but them, allowing the wearer to act and/or move without interruption from outside forces for one full round (or for two full rounds if the artifact is level 7 or higher). Moving or damaging objects and creatures is possible for a wearer acting during an interval of stopped time, but doing so immediately ends that interval. 
Depletion: 1 in 1d6 

Everfull Shot Glass 
Level: 1d6 
Form: Shot glass with alchemist signature or mark 
Effect: Once filled from a standard bottle of whiskey or other liquor, the shot glass refills itself with the same quality of liquor each time the previous shot is drained and the glass is set upright on a bar, table, or level surface. 
The drinker decides whether any given shot has the standard intoxicating effect, or if the shot has no effect whatsoever. 
Depletion: 1 in 1d00 

Hand of the Eclipse 
Level: 10 
Form: Sealed glass jar holding a child‑sized mummified forearm and hand that clutches a corroded silver coin 
Effect: User can summon the Tomb Moon into the sky if they spend several rounds concentrating to do so. The summoned Tomb Moon persists for 1d10 hours before returning to its previous chaotic orbit. 
Depletion: 1 in 1d20 (upon depletion, user's soul is drained away by the Tomb Moon) 

Illuck Stone
Level: 8 
Form: Head‑sized lump of crystal with red filaments running through it 
Effect (Alien): Bearer rerolls 1s (NPC bearers avoid a stroke of bad luck). 
What's not immediately obvious—though may become so with experience—is that ill luck is visited upon someone close to the bearer, whether a friend or a stranger, often in the form of a freak accident that hurts or kills them, usually within a day, as the GM determines. Examples include slipping on a wet surface, falling into a sinkhole, or being gored by a runaway bull, all the way up to drawing the attention of something terrible. The GM determines the severity of the incident, but the level of the threat is commensurate with the artifact's level (level 8). 
The bearer can't choose not to reroll 1s as long as they bear the Illuck Stone. If the bearer tries to part ways with the stone, it somehow appears among their possessions again. Only by giving it to a new bearer can the old bearer part ways, though they become the first victim of bad luck when a new user would otherwise experience bad luck. 
Depletion: 1 in 1d20 (upon depletion, recharged if brought into a proscribed zone) 

Ilu Idol
Level: 6 
Form: 2‑inch (5 cm) tall figurine of a humanoid sitting cross‑legged, densely etched with hieroglyphs 
Effect (Alien): A successfully attacked target within short range whose level is equal to or less than the artifact's disappears; the target's essence is trapped in the artifact. If a previously trapped creature was already in the artifact, it appears where the newly trapped one was located. 
No time passes for a creature trapped in the artifact. The only way for a creature to escape is if the idol is destroyed, the idol's bearer wills the trapped creature free, or the bearer traps a new creature. 
Depletion: 1 in 1d10 (check per successfully trapped creature; upon depletion, newly trapped creature remains trapped only for a few days before the fading magic releases them)

Lightning Eyes
Level: 1d6 + 1 
Form: Glimmering pearl‑sized crystal droplet 
Effect (Alien): If the artifact's bearer is damaged by electricity, the bearer regains a number of Pool points equal to the damage the electricity would normally inflict. 
In addition, the wielder can throw a long‑range lightning bolt as their action, attacking up to three creatures in a line in an electrical attack that deals damage equal to the artifact's level. 
Depletion: 1 in 1d10 (upon depletion, recharged if brought into a proscribed zone) 

Magebreak Manacles 
Level: 1d6 + 2 
Form: Metal manacles etched with alchemical symbols 
Effect: These manacles, which can be applied to both wrists of a willing or helpless target, hinder manual tasks by two steps (or four steps if the target's hands are manacled behind their back). In addition, the manacles prevent the use of alchemical, magical, or other uncanny abilities if the target's level is less than the artifact's. (PCs must succeed on an Intellect‑based roll against the manacles' level before using a supernatural ability and, on a failed attempt, take Intellect damage [ignores Armor] equal to the manacles' level.) 
Depletion: 1 in 1d00 (check per day of use) 

Nihilal Tendril Horn
Level: 1d6 + 2 
Form: Ancient stone with a twisted, conical shape (vaguely horn‑like), scribed with antediluvian etchings; potentially self‑aware 
Effect (Alien): If held like a weapon and activated by pointing the horn at a creature within long range, a writhing tendril is spat at the creature. If the targeted creature is hit with the attack, the target faces one of the following effects, different each time the horn is used. Other horns might spit tendrils with different effects, or do something else entirely.
Depletion: 1 in 1d20
Awful thing: level 5; health 18; attacks with toothed tentacles; where damaged, target's skin is discolored for several weeks

d6 	Horn Effect 
1–4 	Tendril wraps target, preventing physical tasks and dealing damage equal to the artifact's level each round until the target escapes. Either way, tendril desiccates and turns to dust after about a minute. 
5–6 	Tendril attempts to eat its way into target via mouth, ears, or eyes, inflicting damage equal to the artifact's level that ignores Armor. If the target survives, the tendril desiccates and turns to dust. If the damage kills the target, the tendril successfully enters the corpse. About a minute later, target's body tears open, and an awful thing emerges, which attacks the nearest living creature.

Persuader 
Level: 1d6 + 1 
Form: Pistol studded with intimidating spikes; produces menacing vapor and/or growls when owner attempts to intimidate; potentially self‑aware 
Effect: This firearm is a medium long‑range weapon (though lighter and heavier versions are possible). When the pistol is visible (even if still holstered), the shooter's intimidation tasks are eased by two steps. 
When the shooter wishes, a bullet fired from the gun that would otherwise strike a target instead hangs menacingly in front of the target's face, granting the shooter an immediate additional opportunity to intimidate the target, a task that gains an additional asset. After the intimidation attempt, the shooter decides whether to allow the hanging bullet to complete its trajectory and damage the target, or to fall harmlessly to the ground. 
Depletion: 1 in 1d20 (check per menacing bullet fired); upon depletion, can still be used as a normal gun of its size.

Philosopher's Gun
Level: 1d6 + 3 
Form: Oversize six‑shooter‑like glass gun featuring small reservoirs of multicolored fluids and vapors; potentially self‑aware 
Effect: This firearm is a medium long‑range weapon. In addition, when triggered by its owner, the philosopher's gun synthesizes one variety of alchemical round and adds the round to the chamber; an attack using that round is available on the character's next turn. A typical philosopher's gun can only synthesize one type of alchemical round; however, if the artifact is level 7 or higher, two different round varieties may be synthesized, which the owner chooses between when triggering the synthesis. If the artifact is level 9, the gun synthesizes one of the two fixed alchemical round varieties immediately, quickly enough that the owner can attack with it as part of the same action. 
Depletion: 1 in 1d10; upon depletion, can still be used as a normal gun of its size.

Ring of Seeping Travel
Level: 1d6 + 1 
Form: Pale crystal ring a little too large for any finger it is tried on 
Effect (Alien): As the wearer's action, the wearer and their equipment transform into a mass of quivering slime. For one minute the wearer can seep through dirt, earth, stone, structures, and other inert objects, moving up to a long range each turn while in this form. The wearer can't physically affect inert matter and objects, but can make a pseudopod melee attack against creatures that deals a number of points of damage equal to the artifact's level. 
Alternatively, a bearer not wearing the ring can peer through it to see invisible objects or creatures, as well as out-of-phase objects or creatures. 
Depletion: 1 in 1d10 (upon depletion, recharged if brought into a proscribed zone)

Salubrious Snuffbox
Level: 1d6 + 2 
Form: Small ornate container of powdered tobacco (snuff) 
Effect: Owner who takes a pinch of snuff regains a number of Pool points of their choice equal to the artifact's level. 
Depletion: 1 in 1d10

Shadow Duster
Level: 1d6 
Form: Coal‑black leather duster (long, heavy overcoat) 
Effect: A shadow duster functions normally as light armor. If a shadow is within immediate range, the wearer can slip from view for up to one minute, becoming as one with the shadow as their action, effectively easing their stealth task to hide by a number of steps equal to the artifact's level. The wearer can stay still and remain essentially invisible as long as they take no action. Alternatively, at any point before one minute elapses, they can step out of any other shadow within long range, even shadows separated by walls or terrain. (The owner gains a sort of sixth sense about other shadows while they're hiding, learning about general shape and placement, but nothing more.) 
Depletion: 1 in 1d20; upon depletion, can still be worn as a normal duster.

Spirit Reflecting Knife 
Level: 1d6 + 3 
Form: Light blade with hilt (called a "bowie" knife in some settings); potentially self‑aware 
Effect: This knife is a light melee weapon. Attacks made with it are automatically eased (two steps total). 
 In addition, the user gains two assets for noticing invisible creatures, spirits, and not‑currently‑manifested ghosts in the area by looking for their reflection in the blade. If spotted, such a creature within immediate range must answer one question put to it by the knife wielder if the creature's level is less than or equal to the knife's and if the knife wielder succeeds on an Intellect attack. 
Depletion: 1 in 1d20; check each time a spirit is spotted and questioned.

Swarm Ring
Level: 1d6 
Form: Ring made of dark crystal with strange etchings (of what might be bugs) 
Effect (Alien): Bearer summons a swarm of tiny bug‑like creatures that persist for one minute. The swarm's level is equal to the artifact's level. The swarm attacks a designated foe within short range and hinders their perception tasks for the duration. 
The bugs seem like roaches at first glance, but a closer look reveals them to have too many legs, eyes, and mouths—none are exactly like the other, and all make a sort of sickly twittering sound. 
Depletion: 1 in 1d10 (upon depletion, recharged if brought into a proscribed zone)

Tanglefoot Lariat
Level: 1d6 + 1 
Form: Rope glinting with entwined silver threads tied with a lasso at one end 
Effect: User's short‑range lasso attacks made with the lariat are eased. If an attack succeeds, the target is magically restrained, unable to take physical actions until they can escape (PCs make a Might‑based roll as their action; NPCs whose level is higher than the artifact's can use their full turn to escape), the user lets them go, or midnight comes. 
Alternatively, the lassoer can instead choose to make an eased attack with the intention of just snaring a target's arm or leg, hindering the target's physical tasks and preventing them from moving more than an immediate distance on their turn until they use their full action to remove the rope (or the lassoer drops their end). 
Tesla Lasso Variant: This electrified variety is especially effective against demons. All tasks related to restraining demons (whether immaterial or wearing stolen flesh) with the lariat are eased by two steps; treat the lariat as two levels higher for purposes of demons attempting to escape. 
Depletion: 1 in 1d10 

Tracker's Map
Level: 1d6 + 1 
Form: Basic but accurate map of the region where the map is activated 
Effect: Unfolding the map allows its bearer to locate a creature whose level is less than the artifact's, no matter where the creature is. The bearer must know or have met the target, know the target's full name (or "true" name), or have an article of clothing or other personal belonging of the target's. If they do, the target's location is pinpointed (to within a short area) on the map. The map includes locations near the map bearer as well as locations near the target, though depending on the distance separating the two, it may not be to scale. The map shows the target's location for one day per artifact level, or until a new target is named. 
Depletion: 1 in 1d20

Vorpal Six-Gun
Level: 1d6 + 1 
Form: Dull black pistol with dully glowing red barrel and chamber; potentially self‑aware 
Effect: This firearm is a medium long‑range weapon (though lighter and heavier variants are possible). Attacks made with it are automatically eased and deal an additional 2 points of damage (6 points total). 
In addition, if a PC rolls a major effect and the target's level is equal to or less than the artifact's, the PC can choose to implode the target's head. For most living creatures that possess only a single head, that's the end. 
Depletion: 1 in 1d20 (check per head implosion); upon depletion, can still be used as a normal gun 

Wheel of Consumption 
Level: 1d6 + 2 
Form: Crystal hoop about 1 foot (30 cm) in diameter 
Effect (Alien): Anything passed through the hoop whose level is less than the artifact's is disintegrated. Living creatures take damage equal to the artifact's level each round they persist in keeping any part of their body within the ambit of the wheel. This item could be used as a weapon, but it's awkward, hindering melee attacks (or a ranged attack) made with it by two steps. On a hit, the hoop deals damage equal to its level. 
Depletion: 1 in 1d10 (upon depletion, recharged if brought into a proscribed zone)`;

// Function to clean up names for filenames
function getSafeFileName(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Function to create safe ID (kebab-case)
function getSafeId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Function to extract level from level line
function getLevel(levelLine) {
    const match = levelLine.match(/Level:\s*(.+)/);
    return match ? match[1].trim() : '1d6';
}

// Function to extract form
function getForm(formLine) {
    const match = formLine.match(/Form:\s*(.+)/);
    return match ? match[1].trim() : '';
}

// Function to extract depletion
function getDepletion(depletionLine) {
    const match = depletionLine.match(/Depletion:\s*(.+)/);
    return match ? match[1].trim() : '1 in 1d20';
}

// Process artifact data
console.log('Processing artifact data...');

// Split the data into individual artifacts
const artifacts = artifactData.split(/(?=^[A-Z][a-zA-Z\s]+$)/m)
    .filter(artifact => artifact.trim() !== '');

artifacts.forEach(artifact => {
    const lines = artifact.trim().split('\n')
        .filter(line => line.trim() !== '');
    
    if (lines.length < 3) return;
    
    const name = lines[0].trim();
    const levelLine = lines[1].trim();
    const formLine = lines[2].trim();
    
    const level = getLevel(levelLine);
    const form = getForm(formLine);
    
    // Find the effect and depletion sections
    let effectStart = -1;
    let depletionLine = '';
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('Effect:')) {
            effectStart = i;
        }
        if (lines[i].startsWith('Depletion:')) {
            depletionLine = lines[i];
            break;
        }
    }
    
    if (effectStart === -1) return;
    
    // Extract effect content (everything between Effect: and Depletion:)
    let effectLines = [];
    for (let i = effectStart; i < lines.length; i++) {
        if (lines[i].startsWith('Depletion:')) {
            break;
        }
        effectLines.push(lines[i]);
    }
    
    let effect = effectLines.join('\n').trim();
    effect = effect.replace(/^Effect:\s*/, '');
    
    const depletion = getDepletion(depletionLine);
    
    const filename = getSafeFileName(name);
    const safeId = getSafeId(name);
    const filepath = path.join(artifactsDir, `${filename}.md`);
    
    // Create new file
    const markdownContent = `---
aliases:
  - ${name}
tags:
  - Compendium/CSRD/en/Artifacts
  - Artifact
title: ${name}
collection: Artifacts
kind: Artifact
id: ${safeId}
categories:
- Weird-West
---
## ${name}
  
> **Level:** ${level}  
  
> **Form:** ${form}
  
> **Depletion:** ${depletion}  
  
> **Kind:** Artifact
  
  
  
${effect}
`;
    fs.writeFileSync(filepath, markdownContent, 'utf8');
    console.log(`Created: ${filename}.md`);
});

console.log('\nScript completed! Created artifact files in', artifactsDir);