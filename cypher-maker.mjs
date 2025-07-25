import fs from 'fs';
import path from 'path';

// Define the cyphers directory path
const cyphersDir = path.join('.', 'src', 'content', 'compendiums', 'csrd', 'en', 'cyphers');

// Create the cyphers directory if it doesn't exist
if (!fs.existsSync(cyphersDir)) {
    fs.mkdirSync(cyphersDir, { recursive: true });
    console.log(`Created directory: ${cyphersDir}`);
}

// Define the cypher data (from your selected text)
const cypherData = `Answering Slug
Level: 1d6 
Form: "RETORT" scribed on bullet case 
Effect: A successful attack with an answering slug damages a target normally. In addition, for the next minute, any time another creature attacks the shooter with a ranged attack, the shooter can make an immediate extra attack against that creature using the same gun, ignoring reloading restrictions (if any apply). While the effect lasts, the shooter can make a number of additional immediate "answering" attacks equal to the cypher's level (in addition to making their normal attack for the round).

Asphyxiation Round 
Level: 1d6 + 1 
Form: Blowing wind image scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. A successful attack damages a target normally. If the damaged target is a living creature that needs to breathe, the target becomes short of breath, hindering all their tasks for a number of rounds equal to the cypher's level. If the same target is struck and damaged again within that minute with another asphyxiation round, they are stunned as air is alchemically forced from their lungs and blood. Unless at least one asphyxiation round stuck in their flesh is removed from a stunned target's flesh with a successful level 4 healing task, the stunned target asphyxiates and dies at the end of the minute the target first became short of breath.

Banishing Round 
Level: 1d6 + 1 
Form: "EXCLUDE LIFE" scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. Undead, ghosts, cursed beasts, and other supernatural targets take full damage from this attack (if successful). Affected targets gain no benefit from Armor, intangibility, or other protection, and lose any automatic healing ability for a number of minutes equal to this cypher's level. Normal targets with protective alchemical spells similarly lose that protection. If the cypher's level is 6 or higher, successful attacks deal +1 point of damage.

Dark Slug 
Level: 1d6 + 1 
Form: Round is dark as the night sky 
Effect: Firing the slug creates a region of absolute darkness from which no sound emerges. The region fills an adjacent short area (or long area if the cypher is level 5 or higher) and lasts for about a minute. 
Any creature whose level is less than the cypher's that enters (or begins their turn in) the area can see nothing (even if they can normally see in darkness), and any light source of lower level than the cypher's that is brought into or begins a turn in the darkness is deactivated. While the cypher is in effect, successfully escaping the darkness is hindered by four steps.

Entombing Round
Level: 1d6 + 2 
Form: Coffin image scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. A successful attack with an entombing round doesn't damage the target; instead, a target up to human size is held in place, still able to take actions but unable to move or leave the spot for one minute or until they escape with a successful Might‑based roll. (NPCs whose level is higher than the round's break free if they spend their next turn escaping.) 
If the same target is hit again with an entombing round while still held immobile, they are enveloped in an expanding mass that takes the shape of a closed, secured wooden casket whose level is equal to the round's level. A third successful attack against an affected target causes the casket to sink 6 feet (2 m) into the earth, buried beneath a pile of loose soil. 
A trapped target is held within the casket until the gunfighter releases them, the casket is destroyed, the target breaks free, or midnight arrives, at which time the casket dissolves to dust. If the target's casket is buried when their casket dissolves, they have until their breath expires (a minute or so) to dig their way to the surface (a level 5 task) or remain buried.
Wooden casket: level equal to entombing round cypher; dissolves at midnight

Exorcism Round 
Level: 1d6 + 4 
Form: Broken horn image scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. A successful attack with an exorcism round damages a target normally. In addition, ghosts and demons (whether immaterial or wearing someone else's flesh)—as well as other creatures strongly tied to an alternate realm—hit by this attack are exorcised if their level is less than or equal to the cypher's level. An exorcised creature disappears and is unable to remanifest physically in the same area or realm for at least one day. 
This attack is potentially as effective against a target being possessed by a ghost or demon, ending the possession, though the host is also damaged by the bullet.

Exsanguinating Round 
Level: 1d6 +1 
Form: Red blood smears bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. The target takes damage normally. If the target is living and has blood, it begins bleeding for 1 point of damage per round for one minute. Additional successful attacks increase the damage on a one‑per‑one‑basis, and extend the period of effect. 
The expelled blood forms a mystical rivulet that connects the shooter with the bleeding target. If the target dies, the shooter gains an immediate free recovery roll (or regains 10 health if an NPC). 
If the shooter who fired the round is a vampire and their bleeding target is killed, the vampire is completely healed and gains the benefit of having just drank a victim's blood to their fill.

Flaying Round 
Level: 1d6 
Form: Bullet case seems made of skin 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. A successful attack damages a target normally. The target's skin/fur/outer layer begins to peel away as if they'd gained the attention of an invisible flensing blade, hindering their tasks for one minute per cypher level. The second time a target is struck and damaged with a flaying round within a minute of first being struck, larger sections of skin peel away, hindering them by two steps. Each three steps of hindrance gained also moves the target one step down the damage track.

Ghost Round 
Level: 1d6 
Form: Round appears ghostly, translucent, not quite real 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. Unliving targets (undead, forgeborn, elementals, objects, etc.) take damage normally from a ghost round attack, or normal damage +2 if the cypher is level 5 or higher. However, the ghost round ignores living flesh, passing through it like . . . a ghost.

Glacier Slug 
Level: 1d6 + 1 
Form: Bullet case seems made of ice 
Effect: A successful attack deals damage equal to the cypher's level and freezes the target (rendering them helpless) for a number of minutes equal to the cypher's level. A PC who succeeds on a Might‑based roll as their action can thaw early (an affected NPC whose level is higher than the cypher's can use their next turn to break free). On a miss, the target still takes 2 points of damage from the cold (3 points if the cypher is level 5 or higher).

Gunlantern Slug 
Level: 1d6 + 1 
Form: Bullet case glows dim as a candle 
Effect: Firing the slug (either as an attack or into the air) causes the gun to emit a beam of light for three hours per cypher level. The beam brightly illuminates an immediate area the gun wielder points their gun at within long range. 
If the wielder points their light into a region of magical darkness, and the effect that created the darkness is of lower level than the gunlantern slug, the darkness is dispelled. If the magical darkness is higher level, the duration of the illumination effect ends.

Haunted Slug 
Level: 1d6 
Form: Slug emits ghostly whispers 
Effect: Whether the attack against the primary target hits (and deals damage normally) or misses, the bullet's malignance isn't spent—it attacks up to 3 additional targets within short range of the primary target. (The PC rolls an attack against each one.) Each additional attack successively increases the GM intrusion range by 1. If a GM intrusion is triggered, the haunted bullet hits something other than what the attacker intended, such as an ally.

Heavenly Fire Round
Level: 1d6
Form: Bullet emits a silvery glow
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. An attack with the round deals 1 additional point of damage on a successful attack (or 2 more if the cypher is level 5 or higher). If the same target is hit a total of three times by a heavenly fire round in the same minute, they are transformed into a pillar of salt, meaning they are effectively dead until alchemy or curse‑breaking magic is applied.

Hellfire Slug
Level: 1d6 + 1 
Form: Bullet casing seems to burn with red flame 
Effect: A successful attack deals damage normally. In addition to potential damage from the initial attack, the bullet explodes in an immediate radius, inflicting fire damage equal to the cypher's level (roll an attack against each creature in the area separately, including the initial target, who may or may not have already taken damage). 

Hexing Round 
Level: 1d6 + 4 
Form: "HEX" scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. 
A successful attack with a hexing round doesn't damage the target; instead, a target whose level is equal to or less than the round's level is hindered on all tasks. Additional successful attacks against the same target hinder their tasks by additional steps. If a target is struck by a number of hexing rounds equal to half or more of their level, they enter a "hexed" state for a number of days equal to the round's level. A hexed target resembles someone sleepwalking who takes whatever suggestion is given them, even if that proves harmful. A hexed PC can attempt to break the enchantment once each day at dawn, and each time they're damaged, by succeeding on an Intellect defense roll. NPCs whose level is higher than the cypher's can break free a couple of days after they're hexed, or sooner if they take damage. 

Impervious Slug 
Level: 1d6 
Form: "INVULNERABLE" scribed on bullet case 
Effect: Someone successfully attacked with the bullet gains a number of points of Armor equal to the cypher's level for one minute. The Armor is effective against all forms of damage, including those that normally ignore Armor.

Inebriating Round
Level: 1d6 
Form: Amber liquid visible through bullet case; leaves an amber, whiskey‑smelling streak in the air when fired 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. Instead of taking damage, a successfully attacked target immediately moves one step down on the intoxication track. Additional successful attacks continue moving the target on the track. 
Unlike most other alchemical rounds, an inebriating round can simply be swallowed by someone to gain the effect (however, doing so doesn't infuse the inebriating effect for one minute as it would to a gun it was fired from). 

Interrogation Round
Level: 1d6 +1 
Form: "ASK" scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. The target takes damage normally. If the target has a mind and can speak a language known to the gunfighter and the target's level is equal to or less than this cypher's, the target is compelled to truthfully answer one short question immediately put to them by the gunfighter. Additional successful attacks allow for truthfully answered follow‑up questions. (If the attack with an interrogation round kills or incapacitates them, the target uses their dying breath to answer.)

Necrotic Round
Level: 1d6 
Form: Bullet case seems like rotting bone 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. 
The necrotic round contains a core of undead flesh; it and subsequent bullets fired from the gun for the next minute mean that targets react according to their status. 
Against Undead: Undead targeted by a necrotic round regain health equal to 5 plus the cypher's level with each hit—undead cognizant enough to know what's happening usually don't evade these "attacks." 
Against the Living: The living target takes damage normally, and the necrotic flesh begins to spread through the living target's flesh; if a target whose level is equal to or less than the cypher's is successfully attacked twice with a necrotic round within a minute, the unlife overwhelms their living flesh in a horrific wave, turning them into a zombie. The zombie acts according to its nature, but it ignores the gunfighter that created it unless provoked by them. 

Otherwhere Slug
Level: 1d6 
Form: "OTHERWHERE" scribed on bullet case 
Effect: Firing the slug creates an invisible doorway within immediate range that only the shooter can see and use (plus any targets they designate). The doorway leads to a chilly, lightless cavern about 20 feet (6 m) in diameter. While the cold air is breathable, it is a bit thin, and the stone making up the periphery is charcoal‑like in color. 
The doorway to otherwhere lasts for a number of days equal to the cypher's level. When the door closes, visitors are automatically expelled back to their initial location. 

Possessing Round
Level: 1d6 
Form: Bullet burns with a reddish, heatless flame 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. An attack with the round deals 1 additional point of damage on a successful attack (or 2 points if the cypher is level 5 or higher). If the same target is hit a total of three times by a possessing round in the same minute, they become possessed by a demon. The newly demon‑possessed target ignores the shooter unless provoked. 

Sobering Round
Level: 1d6 
Form: Bullet smells like strong, bitter coffee; leaves a cloudy, coffee‑smelling streak in the air when fired 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. Instead of taking damage, a successfully attacked target immediately becomes sober, no matter their position on the intoxication track. 
Unlike most other alchemical rounds, a sobering round can simply be swallowed by someone to gain the effect (however, doing so doesn't infuse the sobering effect for one minute as it would to a gun it was fired from). 

Soul-Killing Round
Level: 1d6 
Form: "ETERNAL DEATH" scribed on bullet case 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. The target takes damage normally, or takes 2 additional points of damage if the cypher is level 5 or higher. If the target is killed by a gun infused with a soul‑killing round, their soul is destroyed permanently. That goes for demons and other animating spirits as well as for people. For instance, if a demon in stolen flesh is killed, there's no need to salt and burn the body, because the demonic presence is erased, as opposed to merely being banished. 

Sympathy Slug 
Level: 1d6 + 1 
Form: "SYMPATHY" scribed on bullet case 
Effect: Firing the round causes the gun to emit a spray of pleasingly colored lights, sounds, and scents filling a short area for one hour per cypher level. All positive interaction tasks made in the area gain an asset. Creatures who've made up their minds about a topic may be open to revisiting the issue. PCs add +1 to recovery rolls made in the area.

Thunder Slug 
Level: 1d6 
Form: Rumbles faintly like distant thunder 
Effect: Firing the slug creates a region of hazed, billowing air from which the sound of distant thunder rumbles. The region fills an adjacent short area (or long area if the cypher is level 5 or higher) and lasts for about a minute. 
Any creature that enters (or begins their turn in) the area is blasted with bone‑rattling thunder and takes 1 point of damage. 

Unraveling Round
Level: 1d6 + 2 
Form: Gray and corroded‑looking bullet; leaves an ashy streak in the air when fired 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. If an object no larger than a 10‑foot (3 m) cube is targeted, the object descends two steps on the object damage track if the object's level is equal to or less than this cypher's. (The object is immediately destroyed if its level is less than half the cypher's level.) 
If a creature is targeted, successful attacks made against the creature with unraveling rounds ignore its Armor.

WANTED SLUG
Level: 1d6 + 1
Form: "WANTED" scribed on bullet case
Effect: The bullet only fires if aimed at a WANTED poster. Assuming the poster is hit (a routine task if within short range and nothing else is distracting the shooter) the spent shell gains a special resonance with the creature indicated on the poster. If the spent slug is collected, it acts like a soul magnet, pulling in the direction of the individual shown on the poster, no matter how far away they are. The holder of the slug also has a general sense of how far their quarry is—somewhere in the same building, somewhere in town, miles away, hundreds of miles away, etc. The spent slug retains this affinity for a number of days equal to the cypher's level.

WASHING ROUND 
Level: 1d6 
Form: "BATH" scribed on bullet case; leaves a sudsy, fresh‑smelling streak in the air when fired 
Effect: When this round is fired from a gun, additional attacks made from the gun gain the same benefit for the next minute. Instead of taking damage, a successfully attacked target is immediately subject to a good scrubbing, leaving them and their clothes a bit damp, but clean and as odor‑free as if they'd washed and laundered in the finest bathhouse. If the cypher is level 5 or higher, the effect is so potent that the target's positive interaction tasks are eased for an hour afterward.

WATCHER SLUG 
Level: 1d6 + 3 
Form: "SEE UNSEEN" scribed on bullet case 
Effect: When a watcher slug is fired (whether as an attack or just into the air), the shooter immediately gains the ability to perceive creatures and objects within long range whose level is equal to or less than the cypher's that are normally invisible, out of phase, only partially in the same realm, hiding, or merely under partial physical cover for one minute.`;

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

// Function to parse a single cypher
function parseCypher(cypherText) {
    const lines = cypherText.trim().split('\n');
    if (lines.length < 4) return null;
    
    const name = lines[0].trim();
    let level = '';
    let form = '';
    let effect = '';
    
    let effectStartIndex = -1;
    
    // Parse each line
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('Level:')) {
            level = line.replace('Level:', '').trim();
        } else if (line.startsWith('Form:')) {
            form = line.replace('Form:', '').trim();
        } else if (line.startsWith('Effect:')) {
            effectStartIndex = i;
            break;
        }
    }
    
    // Extract effect content
    if (effectStartIndex !== -1) {
        const effectLines = lines.slice(effectStartIndex);
        effect = effectLines.join('\n');
        // Remove the Effect: prefix
        effect = effect.replace(/^Effect:\s*/, '').trim();
    }
    
    return {
        name,
        level,
        form,
        effect
    };
}

// Function to format effect with callouts and add Effect: label
function formatEffectAsCallout(effect, name) {
    if (!effect || effect.trim() === '') {
        return '> **Effect:** No effect description available.';
    }
    
    // Special handling for Necrotic Round with sections
    if (name === 'Necrotic Round') {
        const lines = effect.split('\n');
        let formatted = '> **Effect:** ';
        let inSection = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (line.startsWith('Against Undead:') || line.startsWith('Against the Living:')) {
                if (i > 0) formatted += '\n>';
                formatted += '\n> **' + line + '**';
                inSection = true;
            } else if (line === '') {
                formatted += '\n>';
            } else {
                if (i === 0) {
                    formatted += line;
                } else {
                    formatted += '\n> ' + line;
                }
            }
        }
        
        return formatted;
    }
    
    // Standard callout formatting with Effect: label
    const lines = effect.split('\n');
    let formatted = '> **Effect:** ';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (i === 0) {
            formatted += line;
        } else if (line === '') {
            formatted += '\n>';
        } else {
            formatted += '\n> ' + line;
        }
    }
    
    return formatted;
}

// Process cyphers
console.log('Processing cypher data...');

// Split the data using the same approach as artifacts
const cypherBlocks = [];
const lines = cypherData.split('\n');
let currentBlock = [];
let inCypher = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a new cypher name (starts with capital letter, not indented, not a field)
    if (line.match(/^[A-Z][a-zA-Z\s\-']+$/) && 
        !line.startsWith('Level:') && 
        !line.startsWith('Form:') && 
        !line.startsWith('Effect:')) {
        
        // Save previous cypher if we have one
        if (currentBlock.length > 0) {
            cypherBlocks.push(currentBlock.join('\n'));
        }
        
        // Start new cypher
        currentBlock = [line];
        inCypher = true;
    } else if (inCypher) {
        currentBlock.push(line);
    }
}

// Don't forget the last cypher
if (currentBlock.length > 0) {
    cypherBlocks.push(currentBlock.join('\n'));
}

console.log(`Found ${cypherBlocks.length} cypher blocks to process`);

// Process each cypher
cypherBlocks.forEach((block, index) => {
    const cypher = parseCypher(block);
    
    if (!cypher) {
        console.log(`Failed to parse cypher block ${index + 1}`);
        return;
    }
    
    console.log(`Processing: ${cypher.name}`);
    console.log(`  Level: ${cypher.level}`);
    console.log(`  Form: ${cypher.form}`);
    console.log(`  Effect: ${cypher.effect ? cypher.effect.substring(0, 50) + '...' : 'MISSING'}`);
    
    if (!cypher.level || !cypher.form || !cypher.effect) {
        console.log(`  Skipping due to missing required fields`);
        return;
    }
    
    const filename = getSafeFileName(cypher.name);
    const safeId = getSafeId(cypher.name);
    const filepath = path.join(cyphersDir, `${filename}.md`);
    
    // Format the effect with callouts and Effect: label
    const formattedEffect = formatEffectAsCallout(cypher.effect, cypher.name);
    
    // Create new file
    const markdownContent = `---
aliases:
  - ${cypher.name}
tags:
  - Compendium/CSRD/en/Cyphers
  - Cypher
  - Cypher/Manifest
title: ${cypher.name}
collection: Cyphers
kind: Cypher
id: ${safeId}
categories:
- Manifest
- Weird-West
---

## ${cypher.name}
  
> **Level:** ${cypher.level}  
  
> **Form:** ${cypher.form}
  
> **Kind:** Manifest Cypher
  
  
  
${formattedEffect}
`;
    
    fs.writeFileSync(filepath, markdownContent, 'utf8');
    console.log(`  Created: ${filename}.md`);
});

console.log('\nScript completed! Created cypher files in', cyphersDir);