/**
 * Neobrutalist SVG Icon System for Tohumdan Sofraya
 * Provides crisp, high-contrast, scalable vector SVGs with 2.2px black strokes
 * and saturated geometric color fills matching neobrutalism-components.
 */

const ATLAS_URL = '/assets/ui-icon-atlas.png';
const ATLAS_WIDTH = 1448;
const ATLAS_HEIGHT = 1086;

export const ASSET_ICON_CROPS = Object.freeze({
  goal: { x: 22, y: 58, width: 108, height: 96 },
  money: { x: 139, y: 58, width: 108, height: 96 },
  capacity: { x: 257, y: 58, width: 108, height: 96 },
  orders: { x: 375, y: 58, width: 108, height: 96 },
  upgrade: { x: 495, y: 58, width: 108, height: 96 },
  decoration: { x: 610, y: 58, width: 108, height: 96 },
  settings: { x: 724, y: 58, width: 108, height: 96 },
  business: { x: 22, y: 201, width: 108, height: 96 },
  customers: { x: 139, y: 201, width: 108, height: 96 },
  staff: { x: 257, y: 201, width: 108, height: 96 },
  stock: { x: 375, y: 201, width: 108, height: 96 },
  satisfied: { x: 495, y: 201, width: 108, height: 96 },
  unhappy: { x: 610, y: 201, width: 108, height: 96 },
  decorScore: { x: 724, y: 201, width: 108, height: 96 },
  interact: { x: 22, y: 346, width: 108, height: 96 },
  warning: { x: 139, y: 346, width: 108, height: 96 },
  tip: { x: 257, y: 346, width: 108, height: 96 },
  clock: { x: 375, y: 346, width: 108, height: 96 },
  tomato: { x: 861, y: 58, width: 106, height: 96 },
  tomatoPaste: { x: 977, y: 58, width: 106, height: 96 },
  orange: { x: 1093, y: 58, width: 106, height: 96 },
  orangeJuice: { x: 1209, y: 58, width: 106, height: 96 },
  corn: { x: 1325, y: 58, width: 106, height: 96 },
  popcorn: { x: 861, y: 201, width: 106, height: 96 },
  chickenFeed: { x: 977, y: 201, width: 106, height: 96 },
  wheat: { x: 1093, y: 201, width: 106, height: 96 },
  flour: { x: 1209, y: 201, width: 106, height: 96 },
  egg: { x: 1325, y: 201, width: 106, height: 96 },
  bread: { x: 861, y: 346, width: 106, height: 96 },
  orangeTart: { x: 977, y: 346, width: 106, height: 96 },
  burger: { x: 1093, y: 346, width: 106, height: 96 },
  pizza: { x: 1209, y: 346, width: 106, height: 96 },
  cashier: { x: 20, y: 538, width: 118, height: 120 },
  chef: { x: 140, y: 538, width: 118, height: 120 },
  farm: { x: 260, y: 538, width: 158, height: 120 },
  coop: { x: 420, y: 538, width: 136, height: 120 },
  table: { x: 558, y: 538, width: 158, height: 120 },
  trashBin: { x: 20, y: 691, width: 118, height: 124 },
  shelf: { x: 140, y: 691, width: 118, height: 124 },
  register: { x: 260, y: 691, width: 158, height: 124 },
  machine: { x: 420, y: 691, width: 136, height: 124 },
  pallet: { x: 558, y: 691, width: 158, height: 124 },
});

const NEO_SVG_DEFINITIONS = {
  money: `
    <rect x="3" y="10" width="26" height="15" rx="3" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <circle cx="16" cy="17.5" r="4.5" fill="#ffd35e" stroke="#000" stroke-width="1.8"/>
    <path d="M16 15v5M14.5 16h3a1 1 0 0 1 0 2h-3a1 1 0 0 0 0 2h3" stroke="#000" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  `,
  capacity: `
    <path d="M8 11h16l-1.5 17H9.5L8 11z" fill="#3b82f6" stroke="#000" stroke-width="2.2"/>
    <path d="M12 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round"/>
  `,
  upgrade: `
    <rect x="5" y="22" width="22" height="7" rx="2" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <path d="M16 3l-8 9h5v8h6v-8h5l-8-9z" fill="#2ed573" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>
  `,
  decoration: `
    <path d="M16 4C9.4 4 4 9.4 4 16c0 6.6 5.4 12 12 12 2.5 0 4-1.5 4-3.5 0-.9-.3-1.7-.8-2.3-.5-.6-.8-1.4-.8-2.2 0-1.7 1.3-3 3-3h3.6C27.8 17 30 14.8 30 12c0-4.4-6.3-8-14-8z" fill="#a55eea" stroke="#000" stroke-width="2.2"/>
    <circle cx="9" cy="14" r="2" fill="#ffd35e" stroke="#000" stroke-width="1.5"/>
    <circle cx="14" cy="9" r="2" fill="#ff4757" stroke="#000" stroke-width="1.5"/>
    <circle cx="20" cy="10" r="2" fill="#2ed573" stroke="#000" stroke-width="1.5"/>
    <circle cx="21" cy="22" r="2.5" fill="#fff" stroke="#000" stroke-width="1.5"/>
  `,
  settings: `
    <path d="M14 3h4l1 3.5 3 1.5 3.5-1 3 3-1 3.5 1.5 3 3.5 1v4l-3.5 1-1.5 3 1 3.5-3 3-3.5-1-3 1.5-1 3.5h-4l-1-3.5-3-1.5-3.5 1-3-3 1-3.5-1.5-3-3.5-1v-4l3.5-1 1.5-3-1-3.5 3-3 3.5 1 3-1.5z" fill="#f1f5f9" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="16" cy="16" r="4.5" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  business: `
    <rect x="4" y="14" width="24" height="15" rx="2" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <path d="M2 7l3-4h22l3 4v4a4 4 0 0 1-8 0 4 4 0 0 1-8 0 4 4 0 0 1-8 0V7z" fill="#ffd35e" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="11" y="20" width="10" height="9" fill="#3b82f6" stroke="#000" stroke-width="2"/>
  `,
  goal: `
    <circle cx="16" cy="16" r="13" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <circle cx="16" cy="16" r="9" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <circle cx="16" cy="16" r="4.5" fill="#ff4757" stroke="#000" stroke-width="2"/>
  `,
  orders: `
    <rect x="6" y="6" width="20" height="23" rx="3" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <path d="M11 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <path d="M10 14h12M10 19h7" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 24l2 2 5-5" stroke="#2ed573" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `,
  customers: `
    <circle cx="16" cy="16" r="13" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M10 12c1-3 5-4 6-4s5 1 6 4" stroke="#000" stroke-width="2.2" fill="#ffa502" stroke-linejoin="round"/>
    <circle cx="12" cy="16" r="1.5" fill="#000"/>
    <circle cx="20" cy="16" r="1.5" fill="#000"/>
    <path d="M11 20c1.5 3 6.5 3 8 0" stroke="#000" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  `,
  staff: `
    <circle cx="16" cy="18" r="10" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M6 14h20c0-6-4.5-9-10-9S6 8 6 14z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <rect x="4" y="13" width="24" height="3" rx="1.5" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <circle cx="12" cy="19" r="1.5" fill="#000"/>
    <circle cx="20" cy="19" r="1.5" fill="#000"/>
  `,
  stock: `
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <line x1="4" y1="16" x2="28" y2="16" stroke="#000" stroke-width="2.2"/>
    <rect x="7" y="8" width="5" height="6" rx="1" fill="#ff4757" stroke="#000" stroke-width="1.8"/>
    <rect x="14" y="8" width="5" height="6" rx="1" fill="#2ed573" stroke="#000" stroke-width="1.8"/>
    <rect x="21" y="8" width="4" height="6" rx="1" fill="#ffd35e" stroke="#000" stroke-width="1.8"/>
    <rect x="8" y="19" width="6" height="6" rx="1" fill="#ffa502" stroke="#000" stroke-width="1.8"/>
    <rect x="18" y="19" width="6" height="6" rx="1" fill="#3b82f6" stroke="#000" stroke-width="1.8"/>
  `,
  satisfied: `
    <circle cx="16" cy="16" r="13" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <circle cx="12" cy="14" r="2" fill="#000"/>
    <circle cx="20" cy="14" r="2" fill="#000"/>
    <path d="M10 19c1.8 3.5 8.2 3.5 10 0" stroke="#000" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  `,
  unhappy: `
    <circle cx="16" cy="16" r="13" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <circle cx="12" cy="15" r="2" fill="#000"/>
    <circle cx="20" cy="15" r="2" fill="#000"/>
    <path d="M10 21c1.8-3 8.2-3 10 0" stroke="#000" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  `,
  decorScore: `
    <path d="M16 2l3.5 10.5L30 16l-10.5 3.5L16 30l-3.5-10.5L2 16l10.5-3.5z" fill="#ffd35e" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>
  `,
  warning: `
    <path d="M16 3l13 24H3L16 3z" fill="#ffd35e" stroke="#000" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="16" y1="12" x2="16" y2="18" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="16" cy="23" r="1.5" fill="#000"/>
  `,
  clock: `
    <circle cx="16" cy="17" r="11" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <path d="M16 11v6l4 2" stroke="#000" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <path d="M6 7l3 3M26 7l-3 3M9 28l-2 2M23 28l2 2" stroke="#000" stroke-width="2.2" stroke-linecap="round"/>
  `,
  tip: `
    <circle cx="15" cy="17" r="10" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <circle cx="15" cy="17" r="7" fill="#fef08a" stroke="#000" stroke-width="1.8"/>
    <path d="M23 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#ffa502" stroke="#000" stroke-width="1.5"/>
  `,
  interact: `
    <rect x="9" y="10" width="14" height="18" rx="5" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <path d="M16 5v7" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <path d="M12 7l4-4 4 4" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `,
  grid: `
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <line x1="16" y1="4" x2="16" y2="28" stroke="#000" stroke-width="2.2"/>
    <line x1="4" y1="16" x2="28" y2="16" stroke="#000" stroke-width="2.2"/>
    <rect x="6" y="6" width="8" height="8" rx="1.5" fill="#ffd35e"/>
    <rect x="18" y="18" width="8" height="8" rx="1.5" fill="#2ed573"/>
  `,
  rotate: `
    <path d="M26 14A10 10 0 1 0 24 22" fill="none" stroke="#000" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M26 7v7h-7" fill="none" stroke="#000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  close: `
    <path d="M7 7l18 18M25 7L7 25" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  `,
  cancel: `
    <path d="M7 7l18 18M25 7L7 25" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  `,
  chevronUp: `
    <path d="M6 20l10-10 10 10" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  chevronDown: `
    <path d="M6 12l10 10 10-10" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  chevronRight: `
    <path d="M11 6l10 10-10 10" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  `,

  /* Product Items */
  tomato: `
    <circle cx="16" cy="18" r="11" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <path d="M16 8V4M12 9c2-2 6-2 8 0M14 7c0-2 4-2 4 0" stroke="#2ed573" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  `,
  tomatoPaste: `
    <rect x="8" y="7" width="16" height="20" rx="3" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <rect x="8" y="12" width="16" height="8" fill="#ffffff" stroke="#000" stroke-width="1.8"/>
    <circle cx="16" cy="16" r="2.5" fill="#ff4757"/>
  `,
  orange: `
    <circle cx="16" cy="17" r="11" fill="#ffa502" stroke="#000" stroke-width="2.2"/>
    <path d="M16 6c0-2 3-3 5-1s1 5-1 5" fill="#2ed573" stroke="#000" stroke-width="1.8"/>
    <circle cx="16" cy="10" r="1" fill="#000"/>
  `,
  orangeJuice: `
    <path d="M9 10h14l-2 17H11L9 10z" fill="#ffa502" stroke="#000" stroke-width="2.2"/>
    <line x1="17" y1="3" x2="13" y2="15" stroke="#ffd35e" stroke-width="2.5" stroke-linecap="round"/>
  `,
  corn: `
    <ellipse cx="16" cy="17" rx="7" ry="12" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <path d="M9 25c2-6 5-10 5-10M23 25c-2-6-5-10-5-10" stroke="#2ed573" stroke-width="2.5" stroke-linecap="round"/>
  `,
  popcorn: `
    <path d="M9 14h14l-2 15H11L9 14z" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <path d="M8 12c-2-4 3-6 5-3 2-4 7-4 7 0 2-2 6 0 4 3z" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  chickenFeed: `
    <path d="M8 12l3-5h10l3 5v14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <circle cx="16" cy="18" r="4" fill="#2ed573" stroke="#000" stroke-width="1.8"/>
  `,
  wheat: `
    <path d="M16 28V6M16 8l-4-3M16 8l4-3M16 13l-5-3M16 13l5-3M16 18l-5-3M16 18l5-3M16 23l-4-3M16 23l4-3" stroke="#ffd35e" stroke-width="2.5" stroke-linecap="round"/>
  `,
  flour: `
    <path d="M7 13l4-5h10l4 5v13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V13z" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <path d="M12 8h8" stroke="#3b82f6" stroke-width="2"/>
    <text x="16" y="21" font-size="8" font-family="sans-serif" font-weight="900" text-anchor="middle" fill="#000">UN</text>
  `,
  egg: `
    <ellipse cx="16" cy="17" rx="9" ry="11" fill="#fff8e8" stroke="#000" stroke-width="2.2"/>
    <ellipse cx="18" cy="14" rx="2.5" ry="3.5" fill="#ffffff"/>
  `,
  bread: `
    <ellipse cx="16" cy="17" rx="12" ry="7" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <path d="M9 14l2 6M14 13l2 8M19 14l2 6" stroke="#000" stroke-width="2" stroke-linecap="round"/>
  `,
  orangeTart: `
    <path d="M5 21l2 6h18l2-6H5z" fill="#ffa502" stroke="#000" stroke-width="2.2"/>
    <ellipse cx="16" cy="17" rx="12" ry="5" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <circle cx="16" cy="16" r="3" fill="#ff4757"/>
  `,
  burger: `
    <path d="M6 14C6 9 10 7 16 7s10 2 10 7H6z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <rect x="5" y="16" width="22" height="4" rx="2" fill="#2ed573" stroke="#000" stroke-width="1.8"/>
    <rect x="5" y="21" width="22" height="4" rx="2" fill="#ffa502" stroke="#000" stroke-width="1.8"/>
    <path d="M6 26h20v2H6z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
  `,
  pizza: `
    <path d="M16 27L4 10a14 14 0 0 1 24 0L16 27z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <path d="M4 10a14 14 0 0 1 24 0" fill="none" stroke="#ffa502" stroke-width="4"/>
    <circle cx="13" cy="14" r="2" fill="#ff4757"/>
    <circle cx="19" cy="15" r="2" fill="#ff4757"/>
    <circle cx="16" cy="20" r="1.5" fill="#ff4757"/>
  `,

  /* Roles & Structures */
  cashier: `
    <rect x="5" y="12" width="22" height="15" rx="2" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <rect x="8" y="7" width="16" height="5" rx="1" fill="#ffffff" stroke="#000" stroke-width="1.8"/>
    <circle cx="11" cy="17" r="1.5" fill="#000"/>
    <circle cx="16" cy="17" r="1.5" fill="#000"/>
    <circle cx="21" cy="17" r="1.5" fill="#000"/>
    <rect x="8" y="21" width="16" height="3" fill="#ffd35e" stroke="#000" stroke-width="1.5"/>
  `,
  chef: `
    <path d="M7 18h18v7H7v-7z" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
    <path d="M7 18c-3-2-2-7 2-8 0-4 6-5 8-2 2-3 8-2 8 2 4 1 5 6 2 8H7z" fill="#ffffff" stroke="#000" stroke-width="2.2"/>
  `,
  workerAvatar: `
    <circle cx="16" cy="18" r="9" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M7 14h18c0-5-4-8-9-8s-9 3-9 8z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <rect x="5" y="13" width="22" height="3" rx="1.5" fill="#ffd35e" stroke="#000" stroke-width="1.8"/>
  `,
  courierAvatar: `
    <circle cx="16" cy="18" r="9" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M8 13h16c0-4-3-7-8-7s-8 3-8 7z" fill="#3b82f6" stroke="#000" stroke-width="2.2"/>
    <rect x="8" y="13" width="16" height="2" fill="#000"/>
  `,
  chefAvatar: `
    <circle cx="16" cy="19" r="9" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M8 12c-2-2-1-6 2-7 0-3 5-4 6-2 1-2 6-1 6 2 3 1 4 5 2 7H8z" fill="#ffffff" stroke="#000" stroke-width="2"/>
    <rect x="8" y="11" width="16" height="3" fill="#ffffff" stroke="#000" stroke-width="1.8"/>
  `,
  playerAvatar: `
    <circle cx="16" cy="18" r="10" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M7 13h18c0-5-4-8-9-8s-9 3-9 8z" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
  `,
  customerAvatar: `
    <circle cx="16" cy="18" r="10" fill="#fef08a" stroke="#000" stroke-width="2.2"/>
    <path d="M8 12c1-3 5-4 6-4s5 1 6 4" stroke="#000" stroke-width="2.2" fill="#ff4757" stroke-linejoin="round"/>
  `,
  coop: `
    <path d="M16 4l12 9v14H4V13l12-9z" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <rect x="11" y="17" width="10" height="10" rx="2" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  table: `
    <ellipse cx="16" cy="11" rx="12" ry="5" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <line x1="16" y1="16" x2="16" y2="27" stroke="#000" stroke-width="3"/>
    <path d="M10 27h12" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  `,
  shelf: `
    <rect x="5" y="5" width="22" height="22" rx="2" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <line x1="5" y1="16" x2="27" y2="16" stroke="#000" stroke-width="2.2"/>
  `,
  machine: `
    <rect x="5" y="7" width="22" height="20" rx="3" fill="#3b82f6" stroke="#000" stroke-width="2.2"/>
    <circle cx="16" cy="17" r="5" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <line x1="16" y1="7" x2="16" y2="12" stroke="#000" stroke-width="2.2"/>
  `,
  farm: `
    <path d="M4 14l12-9 12 9v13H4V14z" fill="#ff4757" stroke="#000" stroke-width="2.2"/>
    <path d="M10 27V17h12v10" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  pallet: `
    <rect x="3" y="12" width="26" height="14" rx="2" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <line x1="8" y1="18" x2="8" y2="26" stroke="#000" stroke-width="2.2"/>
    <line x1="16" y1="18" x2="16" y2="26" stroke="#000" stroke-width="2.2"/>
    <line x1="24" y1="18" x2="24" y2="26" stroke="#000" stroke-width="2.2"/>
  `,
  trashBin: `
    <path d="M8 10l2 17h12l2-17H8z" fill="#3b82f6" stroke="#000" stroke-width="2.2"/>
    <rect x="6" y="7" width="20" height="4" rx="1.5" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  register: `
    <rect x="5" y="11" width="22" height="16" rx="2" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <rect x="9" y="6" width="14" height="6" rx="1" fill="#ffffff" stroke="#000" stroke-width="1.8"/>
  `,
  shoppingCart: `
    <path d="M4 6h4l3 14h13l3-10H10" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="25" r="2" fill="#ffd35e" stroke="#000" stroke-width="2"/>
    <circle cx="21" cy="25" r="2" fill="#ffd35e" stroke="#000" stroke-width="2"/>
  `,
  lamp: `
    <path d="M8 8l4-5h8l4 5H8z" fill="#ffd35e" stroke="#000" stroke-width="2.2"/>
    <line x1="16" y1="8" x2="16" y2="28" stroke="#000" stroke-width="2.8"/>
    <rect x="11" y="26" width="10" height="3" rx="1" fill="#000"/>
  `,
  flowers: `
    <rect x="9" y="16" width="14" height="12" rx="2" fill="#ffa502" stroke="#000" stroke-width="2"/>
    <circle cx="16" cy="11" r="4" fill="#ff4757" stroke="#000" stroke-width="2"/>
    <circle cx="16" cy="11" r="1.5" fill="#ffd35e"/>
  `,
  recyclingBin: `
    <path d="M8 10l2 17h12l2-17H8z" fill="#2ed573" stroke="#000" stroke-width="2.2"/>
    <path d="M16 14l2 3h-4z" fill="#ffffff"/>
  `,
};

let atlasImage = null;
let atlasPromise = null;

export function preloadAssetAtlas() {
  if (atlasImage) return Promise.resolve(atlasImage);
  if (atlasPromise) return atlasPromise;

  atlasPromise = new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      atlasImage = image;
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = ATLAS_URL;
  });
  return atlasPromise;
}

export function assetIconMarkup(id, size = 32, className = '') {
  const content = NEO_SVG_DEFINITIONS[id] ?? NEO_SVG_DEFINITIONS.decorScore;
  const classes = ['neo-svg-icon', className].filter(Boolean).join(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" class="${classes}" aria-hidden="true">${content}</svg>`;
}

export function hydrateAssetIcons(root = document) {
  root.querySelectorAll('[data-asset-icon]').forEach((element) => {
    const id = element.dataset.assetIcon;
    const size = Number(element.dataset.assetSize) || 32;
    element.innerHTML = assetIconMarkup(id, size);
    element.setAttribute('aria-hidden', 'true');
  });
}

export function drawAssetIcon(context, id, x, y, width, height = width) {
  const crop = ASSET_ICON_CROPS[id];
  if (!crop || !atlasImage) return false;
  context.drawImage(atlasImage, crop.x, crop.y, crop.width, crop.height, x, y, width, height);
  return true;
}
