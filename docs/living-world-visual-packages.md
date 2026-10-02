# Staged visual and living-world implementation

Both supplied reports were implemented as a presentation-only progression. Existing rounded fixtures, metal materials, cart/basket parks, diverse customer silhouettes, wind-swaying trees, product inspection, oven embers, popcorn kernels, juice motion and output pop animation were reused rather than duplicated.

## Stage 1 — Light and surface foundation

Engine explicitly uses sRGB output and ACES Filmic with exposure 1.05, calibrated to the existing lighting. LightingManager adds a non-shadow-casting cool rim that dims at night. Shared radial contact shadows anchor characters, shelves, registers, dining tables and production machines. The floor has moderate specular polish (roughness 0.32, metalness 0.04); this is direct-light shading, not screen-space or mirror reflections. A subtle CSS vignette stays below the UI.

## Stage 2 — Retail and street detail

Shelf wobblers respond to nearby shoppers/player without claiming a nonexistent discount. A stock increase triggers a restrained squash/stretch; reaching full capacity emits a pooled glint, with initial hydration excluded. Clone shelves use the same feedback. The existing zebra crossing was raised into thin 3D strips rather than duplicated. Short curbs, drain, manhole, mailbox, hydrant, decorative exterior vending and a transparent-top ice-cream chest fill the streetscape outside placement zones. The exterior vending/chest are decorative, without new sales mechanics.

## Stage 3 — Ecology and shopping life

Four procedural birds peck, flee actors within two metres, flap along bounded five-second flights and land on predefined grass patches. A resting tabby breathes, moves its tail and follows nearby players with its head; its optional synthetic chirp uses the existing sound toggle and a 20-second cooldown. Three reusable insects track actual placed farms: butterflies by day and fireflies at night. Existing tree sway is retained, with small awning motion added. New ambient motion freezes during pause and respects reduced motion.

Customer eyes blink with independent timing and compress for happiness. Shopping success shows a transient heart; prolonged checkout waits show an hourglass and a watch glance. Missing-stock bubbles retain the requested product icon with a small question mark. Paid shoppers show two paper bags and hide their transferred inventory and cart/basket. The paid decision requires leaving with a nonempty shopping history and no remaining customer inventory, so abandoned unpaid baskets remain visible. Idle cashiers make a small cleaning gesture.

## Stage 4 — Production, money and HUD feedback

Working ovens/kitchens and mills use four reusable smoke/steam/dust puffs per model; idle machines hide them. Existing popcorn/juice/oven motion remains. Cash collection is wired through the actual main event handler and uses five gold stars on curved paths toward the player, ending in a short ground ring. Player/worker steps emit small dust from the same fixed 30-mesh effect pool. Each mesh owns reusable material variants, preventing overlapping effects from sharing opacity. New upgrades produce bounded confetti and a subtle 0.12-second camera punch without replaying when loading saved progress. Money updates slide briefly; modal entry uses a small spring animation. Stock badges gain a capacity ring. Street-lamp cones/pools fade in at night without additional shadow-casting lights.

## Verification

- Full suite: 197 passed, zero failures.
- Production Vite build passed.
- Tests cover shadow sharing/placement, bird flight/landing/pause, fixed ecology budgets, day/night/reduced motion, real paid rig cargo-to-bag changes, bounded shelf effects, reusable production puffs and a single shadow-casting key light.
- The isolated memory-save preview at /.project/visual-preview.html was tested in the in-app browser in day, night, market, farm and street views. Cash and full-restock controls produced a ring/glint and drained back into the pool. Console reported no errors.
- The player's stored save was not modified by preview controls. Existing main-tab inspection temporarily timed out; visual checks used the actual WorldScene in the independent preview.
- No measured device FPS, retention uplift or zero-cost rendering claim is made. Additional meshes/transparency have real cost; budgets are finite and no post-processing library was added.
