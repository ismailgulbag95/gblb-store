# Progressive construction screens

Restaurant, east logistics, bakery, orange grove, corn field and flour mill now have timber and colored tarp screens. Existing availableUpgrades controls the ready label, gold lock and catalog price; the original purchase pads remain the interaction. No purchase conditions, prices or navigation obstacles change.

Completed purchases reveal only when their required station positions exist. Pending placements retain a waiting label. Loading an already opened save skips the one-shot animation; a live opening collapses the screen in 0.55 seconds and clears 18 confetti particles after 1.3 seconds. Screens yield to relocated fixtures/decorations. Sound/applause is not included.

Verification: 11 targeted construction and automatic-placement tests passed; Vite production build passed. The isolated construction-design fixture renders locked/ready/open states without reading or changing the player save; browser console had no errors.
