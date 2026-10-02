# Produce shelf stock display correction

Removed the produce stand's hardcoded bananas, tomatoes, oranges, cabbages,
carrots, lemons, potatoes, cucumbers, eggplants, barrel apples and side leeks.
Wooden crates, barrel, side crate and signs remain. All food on a produce shelf
now comes exclusively from its itemFactory/itemId inventory slots, initially
hidden until WorldScene applies the actual stock count.

Applies to TOMATO, ORANGE and CORN and any other produce display using this model.
No inventory or economy changes. Targeted shelf and character interaction tests:
24 passed. Vite production build passed. Test coverage includes empty, partial,
full and depleted shelves, correct product identity and no unmanaged food.
