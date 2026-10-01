# East logistics verification

Scope: manager office, interactive CRT terminal, 22-item wholesale catalogue (including eight imports), paid order queue, truck/dock delivery, imported gondolas/coolers, warehouse operator and manager threshold policy.

Plan: keep authoritative orders and tick-based delivery in domain; stock transfers use existing inventory receipts/reservations; Three.js models read that state; HUD keeps a local cart and commits paid orders through GameApplication. Farming remains the first existing production source and purchased stock costs 82% of catalogue retail value.

TDD: RED checkpoint `a293c0c` confirmed missing procurement APIs. Targeted cases cover balance deductions, invalid carts, capacity, once-only delivery/reload, legacy receipts, unsafe IDs, incoming/depot stock thresholds, real worker delivery, hiring compatibility, terminal picking and layout input.

Verification (2026-10-01):

- `npm test`: **167/167 pass**, including all 123 previous tests and 44 procurement/catalogue/HUD/input/model tests. No skipped or cancelled tests.
- `npm run build`: **pass**, Vite 5.4.21, 101 modules; no new package dependency.
- Targeted Node coverage: `procurement.js` **100% lines / 87.5% branches / 93.62% functions**.
- Isolated real-browser fixture at `/tests/fixtures/procurement.html` uses actual WorldScene, HUD, InputManager and GameApplication, with memory-only saves. Clicking the real CRT mesh opened the terminal; category/cart/paid confirm worked. Cooler purchase reduced 4350 to 4230; one six-unit COLA case reduced 4230 to 4190.64.
- Truck arrival, lift unloading, once-only six-unit dock stock, departure and warehouse worker route to the cooler were visually checked. Tick 990 showed an empty dock, idle truck and worker at the cooler; the normal customers had collected the supplied goods. No nonfinite pose or floating uncommitted delivery cargo was observed. Screenshots: `procurement-crt.jpg`, `procurement-dock.jpg`.
- A second 900-tick run with the manager policy enabled produced exactly two paid deliveries after stock depletion, seven successful cooler transfers and finite actor positions; five COLA units remained on the dock. Browser console had no fatal errors; the existing optional `gblb_shipping_boxes` GLTF loader warned about a missing model and used its normal procedural fallback.

Limitations: imported containers and articulated people use the existing procedural models. The dock pickup target remains near the procedural arm's maximum reach; there is no skeletal clip/physics truck simulation. The bounded stock model uses at most 16 representative cartons with exact quantity metadata. No new 60-FPS/mobile performance guarantee is inferred from this smoke check.

Project CLI is accessible through the verified Python 3.12.14 runtime because `py -3` is unavailable. The sandbox denies ordinary `.project` access; approved CLI access was used. General `project.py check .` remains `ok=false` because previous tasks' file hashes need renewed review (20 stale/dependency warnings), not because npm tests or Vite failed. Their human acceptances were not renewed. New task evidence is submitted in `review`, with no user acceptance inferred.
