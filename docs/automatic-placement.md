# Automatic fixture placement

New shelves, machines, farms and dining tables share the same placement helper:
immutable catalogue position first, then nearest valid point in their own zone
on a 0.5 grid. The search checks fixture/decor overlap, wall bounds, a 0.5 gap,
front access from the zone entrance, and preservation of previously reachable
fixture access points. Produce footprints now include side barrel/crate bounds.

When no point works, pendingStationIds persists an unplaced fixture. The previous
pendingShelfIds format is still supported. A visible HUD list lets the player
select an unplaced fixture and place it through layout mode; invalid locations
are rejected. Moving an existing fixture/decor and finishing an unlock retries
the queue. Placed fixtures are not moved automatically. Unplaced machines and
farms are excluded from production/task discovery and scene rendering.

Technical verification covers default placement, occupied defaults, full zones,
queue/save compatibility, independent unlock positions, duplicate purchase
protection and manual placement preserving wallet/stock. The disposable
.project/placement-preview.html fixture uses in-memory saves only. Its actual HUD
queue was tested in-browser: selecting the pending shelf and clicking a free
location created the shelf and removed the queue panel without runtime errors.

Existing saved fixtures keep their locations; this change does not automatically
rearrange pre-existing overlaps. Routing clearance is a discrete 0.5-grid check.
User acceptance remains pending.
