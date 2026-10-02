# Low-poly player avatars

Shopkeeper, cat, robot, panda and penguin now share a large block head, short
beveled torso, flat shading and articulated block limbs. Their existing IDs,
factory entry points and walk/idle animation remain compatible. Cat ears/tail,
robot screen/antenna/core, panda patches/chef hat and penguin beak/crown remain.

Triangle counts: shopkeeper 2612, cat 2658, robot 2308, panda 2172, penguin 2100.
The player-design browser gallery was visually inspected with walking enabled.
Vite build passed. Targeted avatar tests cover all IDs, geometry budgets, finite
vertices, independent animation pivots, idle recovery and resting floor bounds.

Broader orbit/archetype run: 64/65 passed. Unrelated rewarded-order callback test
at tests/orbit-core.test.js:1015 failed with reward 48 vs 24; no economy code was
changed by this work. User visual acceptance remains pending.
