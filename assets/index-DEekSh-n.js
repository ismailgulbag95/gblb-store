var Ha=i=>{throw TypeError(i)};var ql=(i,e,t)=>e.has(i)||Ha("Cannot "+t);var Rn=(i,e,t)=>e.has(i)?Ha("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t);var B=(i,e,t)=>(ql(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Va=1e4,Qe=Object.freeze({TOMATO:{id:"TOMATO",name:"Domates",icon:"🍅",price:3,color:15680580},TOMATO_PASTE:{id:"TOMATO_PASTE",name:"Salça",icon:"🥫",price:12,color:12730636},ORANGE:{id:"ORANGE",name:"Portakal",icon:"🍊",price:4,color:16347926},ORANGE_JUICE:{id:"ORANGE_JUICE",name:"Portakal suyu",icon:"🧃",price:16,color:16498468},CORN:{id:"CORN",name:"Mısır",icon:"🌽",price:5,color:16436245},POPCORN:{id:"POPCORN",name:"Popcorn",icon:"🍿",price:20,color:16639626},CHICKEN_FEED:{id:"CHICKEN_FEED",name:"Tavuk yemi",icon:"🌾",price:8,color:10576391},EGG:{id:"EGG",name:"Yumurta",icon:"🥚",price:18,color:16708551},WHEAT:{id:"WHEAT",name:"Buğday",icon:"🌾",price:4,color:16498468},BREAD:{id:"BREAD",name:"Ekmek",icon:"🍞",price:24,color:12730636},BURGER:{id:"BURGER",name:"Gurme burger",icon:"🍔",price:75,color:16486972},PIZZA:{id:"PIZZA",name:"Pizza",icon:"🍕",price:90,color:14427686}}),Yt=Object.freeze({paste:{inputs:{TOMATO:2},output:"TOMATO_PASTE",seconds:3},juice:{inputs:{ORANGE:2},output:"ORANGE_JUICE",seconds:3.5},popcorn:{inputs:{CORN:1},output:"POPCORN",seconds:2.5},feed:{inputs:{CORN:1},output:"CHICKEN_FEED",seconds:2.2},bakery:{inputs:{WHEAT:2,EGG:1},output:"BREAD",seconds:4},burger:{inputs:{BREAD:1,TOMATO:1},output:"BURGER",seconds:4.5},pizza:{inputs:{WHEAT:1,TOMATO:2},output:"PIZZA",seconds:5}}),at=Object.freeze({tomatoFarm:{kind:"farm",item:"TOMATO",x:-10,z:5,title:"Domates tarlası"},tomatoFarm2:{kind:"farm",item:"TOMATO",x:-6.5,z:5,title:"2. domates tarlası"},paste:{kind:"machine",recipe:"paste",x:-10,z:1.8,title:"Salça kazanı"},orangeFarm:{kind:"farm",item:"ORANGE",x:-10,z:-7,title:"Portakal bahçesi"},orangeFarm2:{kind:"farm",item:"ORANGE",x:-6.5,z:-7,title:"2. portakal bahçesi"},juice:{kind:"machine",recipe:"juice",x:-10,z:-1.8,title:"Meyve sıkacağı"},cornFarm:{kind:"farm",item:"CORN",x:-18,z:5,title:"Mısır tarlası"},popcorn:{kind:"machine",recipe:"popcorn",x:-18,z:1.8,title:"Popcorn makinesi"},feed:{kind:"machine",recipe:"feed",x:-18,z:-1.8,title:"Yem değirmeni"},coop:{kind:"coop",x:-23,z:3.5,title:"Tavuk kümesi"},wheatFarm:{kind:"farm",item:"WHEAT",x:-18,z:-7,title:"Buğday tarlası"},bakery:{kind:"machine",recipe:"bakery",x:-23,z:0,title:"Taş fırın"},burgerKitchen:{kind:"machine",recipe:"burger",x:-30,z:4,title:"Burger mutfağı"},pizzaKitchen:{kind:"machine",recipe:"pizza",x:-30,z:-4,title:"Pizza fırını"},register:{kind:"register",x:5,z:-4,title:"Kasa"},tomatoShelf:{kind:"shelf",item:"TOMATO",x:3,z:2,title:"Domates reyonu"},pasteShelf:{kind:"shelf",item:"TOMATO_PASTE",x:7.5,z:2,title:"Salça reyonu"},orangeShelf:{kind:"shelf",item:"ORANGE",x:3,z:-1,title:"Portakal reyonu"},juiceShelf:{kind:"shelf",item:"ORANGE_JUICE",x:7.5,z:-1,title:"Meyve suyu reyonu"},cornShelf:{kind:"shelf",item:"CORN",x:11,z:2,title:"Mısır reyonu"},popcornShelf:{kind:"shelf",item:"POPCORN",x:11,z:0,title:"Popcorn reyonu"},eggShelf:{kind:"shelf",item:"EGG",x:11,z:-2,title:"Yumurta reyonu"},breadShelf:{kind:"shelf",item:"BREAD",x:8.6,z:-2.2,title:"Ekmek reyonu"},table1:{kind:"table",x:-38,z:4,title:"Masa 1"},table2:{kind:"table",x:-38,z:-4,title:"Masa 2"},table3:{kind:"table",x:-44,z:4,title:"Masa 3"},table4:{kind:"table",x:-44,z:-4,title:"Masa 4"}}),_t=Object.freeze({TOMATO:{id:"shelf:TOMATO",x:3,z:2,capacity:8},TOMATO_PASTE:{id:"shelf:TOMATO_PASTE",x:7.5,z:2,capacity:6},ORANGE:{id:"shelf:ORANGE",x:3,z:-1,capacity:8},ORANGE_JUICE:{id:"shelf:ORANGE_JUICE",x:7.5,z:-1,capacity:6},CORN:{id:"shelf:CORN",x:11,z:2,capacity:8},POPCORN:{id:"shelf:POPCORN",x:11,z:0,capacity:6},EGG:{id:"shelf:EGG",x:11,z:-2,capacity:6},BREAD:{id:"shelf:BREAD",x:8.6,z:-2.2,capacity:6}}),Ni=Object.freeze([{id:"tomatoFarm2",title:"2. Domates tarlası",price:25,x:-6.5,z:5,visible:!0,unlocks:["tomatoFarm2"]},{id:"cashier",title:"Kasiyer işe al",price:35,x:8.5,z:-4,when:"tomatoSold",unlocks:["cashier"]},{id:"paste",title:"Salça kazanı ve reyon",price:45,x:0,z:-4,when:"tomatoSold",unlocks:["paste"]},{id:"harvester",title:"Tarla işçisi işe al",price:60,x:-5,z:-4,when:"pasteSold",unlocks:["harvester"]},{id:"orange",title:"Portakal bahçesi ve sıkacak",price:85,x:-10,z:-7,when:"pasteSold",unlocks:["orange"]},{id:"factoryFeeder",title:"Fabrika lojistikçisi işe al",price:90,x:-8,z:-1,when:"juiceSold",unlocks:["factoryFeeder"]},{id:"orangeFarm2",title:"2. portakal bahçesi",price:45,x:-6.5,z:-7,when:"juiceSold",unlocks:["orangeFarm2"]},{id:"corn",title:"Mısır tarlası ve reyon",price:110,x:-18,z:5,when:"juiceSold",unlocks:["corn"]},{id:"popcorn",title:"Popcorn makinesi ve reyon",price:125,x:-18,z:1.8,when:"cornSold",unlocks:["popcorn"]},{id:"feed",title:"Yem değirmeni",price:135,x:-18,z:-1.8,when:"popcornSold",unlocks:["feed"]},{id:"coop",title:"Tavuk kümesi ve yumurta reyonu",price:150,x:-23,z:3.5,when:"feedProduced",unlocks:["coop"]},{id:"chicken2",title:"İkinci tavuk",price:70,x:-23,z:6.2,when:"eggSold",unlocks:["chicken2"]},{id:"chicken3",title:"Üçüncü tavuk",price:95,x:-23,z:6.2,when:"chicken2",unlocks:["chicken3"]},{id:"caretaker",title:"Çiftlik bakıcısı işe al",price:150,x:-18,z:0,when:"eggSold",unlocks:["caretaker"]},{id:"bakery",title:"Buğday tarlası ve taş fırın",price:180,x:-23,z:0,when:"eggSold",unlocks:["bakery"]},{id:"restaurant",title:"Gurme restoran",price:250,x:-30,z:0,when:"breadSold",unlocks:["restaurant"]},{id:"chefWaiter",title:"Şef ve garson işe al",price:220,x:-34,z:0,when:"tipCollected",unlocks:["chefWaiter"]}]),_r=Object.freeze({cashier:{title:"Kasiyer",icon:"🧑‍💼"},harvester:{title:"Hasat işçisi",icon:"🧑‍🌾"},factoryFeeder:{title:"Fabrika lojistikçisi",icon:"🧑‍🔧"},caretaker:{title:"Çiftlik bakıcısı",icon:"🧑‍🌾"},chefWaiter:{title:"Şef ve garson",icon:"🧑‍🍳"}}),Wa=Object.freeze([{upgradeId:"cashier",staffTypes:["cashier"],effect:"Kasada müşteri ödemelerini otomatik alır.",unlock:"İlk domates satışından sonra açılır."},{upgradeId:"harvester",staffTypes:["harvester"],effect:"Tarladaki ürünü uygun reyonlara taşır.",unlock:"İlk salça satışından sonra açılır."},{upgradeId:"factoryFeeder",staffTypes:["factoryFeeder"],effect:"Üretim hatlarına malzeme taşır.",unlock:"İlk portakal suyu satışından sonra açılır."},{upgradeId:"caretaker",staffTypes:["caretaker"],effect:"Yemi kümese, yumurtaları reyona taşır.",unlock:"İlk yumurta satışından sonra açılır."},{upgradeId:"chefWaiter",staffTypes:["chefWaiter","waiter"],effect:"Restoran mutfağını ve masa servisini otomatikleştirir.",unlock:"Restoran müşterisinden bahşiş alınca açılır."}]);class $l extends Error{constructor(e,t){super(`Yetersiz bakiye: ${e} atom gerekiyor, ${t} atom var.`),this.name="InsufficientBalanceError",this.requiredAtoms=e,this.balanceAtoms=t}}class Xa extends Error{constructor(e){super(`Transaction ID tekrar kullanıldı: ${e}`),this.name="TransactionIdConflictError"}}var ln,ta,na,ia;class Vs{constructor(e){Rn(this,ln);this.economy=e}getBalance(){return this.economy.balanceAtoms/Va}debit(e,t,n){if(typeof e!="string"||!e)throw new TypeError("Transaction ID gerekir.");const s=B(this,ln,na).call(this,t),r=B(this,ln,ta).call(this,e);if(r){if(r.type==="DEBIT"&&r.amountAtoms===s&&r.reason===n)return{duplicate:!0,balance:this.getBalance()};throw new Xa(e)}if(this.economy.balanceAtoms<s)throw new $l(s,this.economy.balanceAtoms);return B(this,ln,ia).call(this,{id:e,type:"DEBIT",amountAtoms:s,reason:n}),{duplicate:!1,balance:this.getBalance()}}credit(e,t,n){if(typeof e!="string"||!e)throw new TypeError("Transaction ID gerekir.");const s=B(this,ln,na).call(this,t),r=B(this,ln,ta).call(this,e);if(r){if(r.type==="CREDIT"&&r.amountAtoms===s&&r.reason===n)return{duplicate:!0,balance:this.getBalance()};throw new Xa(e)}return B(this,ln,ia).call(this,{id:e,type:"CREDIT",amountAtoms:s,reason:n}),{duplicate:!1,balance:this.getBalance()}}}ln=new WeakSet,ta=function(e){return this.economy.entries.find(t=>t.id===e)},na=function(e){if(!Number.isFinite(e)||e<=0)throw new RangeError("İşlem tutarı sıfırdan büyük olmalı.");const t=Math.round(e*Va);if(!Number.isSafeInteger(t)||t<=0)throw new RangeError("İşlem tutarı güvenli sayı sınırını aşıyor.");return t},ia=function(e){const t=this.economy.balanceAtoms+(e.type==="CREDIT"?e.amountAtoms:-e.amountAtoms);if(!Number.isSafeInteger(t)||t<0)throw new RangeError("İşlem bakiyeyi güvenli sınırın dışına çıkarıyor.");this.economy.balanceAtoms=t,this.economy.entries.push({...e,balanceAtoms:this.economy.balanceAtoms}),this.economy.entries.length>2e3&&this.economy.entries.splice(0,1)};const Yl=500;function En(i,e,t=Yl){var n,s;return i[e]?(i[e].capacity=t,(n=i[e]).reserved??(n.reserved={}),(s=i[e]).reservedCapacity??(s.reservedCapacity=0)):i[e]={capacity:t,items:{},reserved:{},reservedCapacity:0},i[e]}function nt(i,e,t){var n,s;return((s=(n=i[e])==null?void 0:n.items)==null?void 0:s[t])??0}function li(i,e){var t;return((t=i[e])==null?void 0:t.capacity)??0}function pn(i,e){var t;return Object.values(((t=i[e])==null?void 0:t.items)??{}).reduce((n,s)=>n+s,0)}function $s(i,{transactionId:e,from:t,to:n,item:s,quantity:r,reservationId:o}){var m;if(typeof e!="string"||!e)return{ok:!1,reason:"invalid-transaction-id"};const a=i.stockTransactions.find(p=>(typeof p=="string"?p:p.id)===e);if(a)return typeof a=="string"||a.from===t&&a.to===n&&a.item===s&&a.quantity===r?{ok:!0,duplicate:!0}:{ok:!1,reason:"transaction-id-conflict"};if(!Number.isInteger(r)||r<=0||!i.stock[t]||!i.stock[n])return{ok:!1,reason:"invalid-transfer"};const c=i.stock[t],l=i.stock[n],u=o?i.reservations[o]:null;if(o&&(!u||u.from!==t||u.to!==n||u.item!==s||u.quantity!==r))return{ok:!1,reason:"invalid-reservation"};const d=(u==null?void 0:u.from)===t&&u.item===s?u.quantity:0;if((c.items[s]??0)-(((m=c.reserved)==null?void 0:m[s])??0)+d<r)return{ok:!1,reason:"insufficient-stock"};const h=l.reservedCapacity??0,g=(u==null?void 0:u.to)===n?u.quantity:0;return l.capacity-pn(i.stock,n)-h+g<r?{ok:!1,reason:"destination-full"}:(c.items[s]=(c.items[s]??0)-r,c.items[s]<=0&&delete c.items[s],l.items[s]=(l.items[s]??0)+r,u&&Lc(i,o),i.stockTransactions.push({id:e,from:t,to:n,item:s,quantity:r}),i.stockTransactions.length>4e3&&i.stockTransactions.splice(0,1),{ok:!0,duplicate:!1,quantity:r})}function jl(i,e,t,n,s=1){var o,a,c;return nt(i.stock,e,n)-(((a=(o=i.stock[e])==null?void 0:o.reserved)==null?void 0:a[n])??0)>=s&&li(i.stock,t)-pn(i.stock,t)-(((c=i.stock[t])==null?void 0:c.reservedCapacity)??0)>=s}function Cc(i,{reservationId:e,from:t,to:n,item:s,quantity:r}){var u;if(typeof e!="string"||!e)return{ok:!1,reason:"invalid-reservation-id"};const o=i.stock[t],a=i.stock[n];if(!o||!a||!Number.isInteger(r)||r<1)return{ok:!1,reason:"invalid-reservation"};if(i.reservations[e]){const d=i.reservations[e];return d.from===t&&d.to===n&&d.item===s&&d.quantity===r?{ok:!0,duplicate:!0}:{ok:!1,reason:"reservation-id-conflict"}}return(o.items[s]??0)-(((u=o.reserved)==null?void 0:u[s])??0)<r?{ok:!1,reason:"insufficient-stock"}:a.capacity-pn(i.stock,n)-(a.reservedCapacity??0)<r?{ok:!1,reason:"destination-full"}:(o.reserved??(o.reserved={}),a.reservedCapacity??(a.reservedCapacity=0),o.reserved[s]=(o.reserved[s]??0)+r,a.reservedCapacity+=r,i.reservations[e]={from:t,to:n,origin:t,item:s,quantity:r},{ok:!0,duplicate:!1})}function Kl(i,e,t){var a;const n=i.reservations[e],s=i.stock[t];if(!n||!s)return{ok:!1,reason:"missing-reservation-or-carrier"};if(n.from===t)return{ok:!0,duplicate:!0};const r=i.stock[n.from];return!r||(((a=r.reserved)==null?void 0:a[n.item])??0)<n.quantity||nt(i.stock,n.from,n.item)<n.quantity?{ok:!1,reason:"reserved-stock-missing"}:s.capacity-pn(i.stock,t)-(s.reservedCapacity??0)<n.quantity?{ok:!1,reason:"carrier-full"}:(r.items[n.item]-=n.quantity,r.items[n.item]||delete r.items[n.item],r.reserved[n.item]-=n.quantity,r.reserved[n.item]||delete r.reserved[n.item],s.items[n.item]=(s.items[n.item]??0)+n.quantity,s.reserved[n.item]=(s.reserved[n.item]??0)+n.quantity,n.from=t,{ok:!0,duplicate:!1})}function Lc(i,e){const t=i.reservations[e];if(!t)return!1;const n=i.stock[t.from],s=i.stock[t.to];return n.reserved[t.item]-=t.quantity,n.reserved[t.item]<=0&&delete n.reserved[t.item],s.reservedCapacity=Math.max(0,(s.reservedCapacity??0)-t.quantity),delete i.reservations[e],!0}function Ys(i){var t,n;const e=new Map;for(const[s,r]of Object.entries(i.farms)){const o=(t=at[s])==null?void 0:t.item;o&&(r.readyCount=Number.isSafeInteger(r.readyCount)&&r.readyCount>=0?r.readyCount:0,e.has(o)||e.set(o,[]),e.get(o).push(r))}for(const[s,r]of e){let a=(((n=i.stock[`farm:${s}`])==null?void 0:n.items[s])??0)-r.reduce((c,l)=>c+l.readyCount,0);if(a>0){for(const c of r){const l=Math.min(a,Math.max(0,3-c.readyCount));if(c.readyCount+=l,a-=l,!a)break}a&&(r[0].readyCount+=a)}else if(a<0){a=-a;for(const c of r){const l=Math.min(c.readyCount,a);if(c.readyCount-=l,a-=l,!a)break}}}}const Ea=2;function Mn(i){return{capacity:i,items:{},reserved:{},reservedCapacity:0}}function sa(i=5370206){var s,r;const e={player:Mn(6),"farm:TOMATO":Mn(60),"shelf:TOMATO":Mn(_t.TOMATO.capacity),"checkout:queue":Mn(12)},t={tomatoFarm:{progressTicks:0,harvestCount:0,readyCount:0}},n={saveVersion:Ea,revision:0,tick:0,customerSpawnTicks:0,customerDemandBag:[],rng:i>>>0,paused:!1,speedMultiplier:1,economy:{balanceAtoms:100*1e4,entries:[]},stock:e,stockTransactions:[],reservations:{},player:{x:5,z:6,facing:0,capacity:6,character:"shopkeeper"},farms:t,machines:{},coops:{},diningTables:{},customers:[],workers:[],nextEntityId:1,unlocked:{tomatoFarm:!0,register:!0,tomatoShelf:!0},availableUpgrades:["tomatoFarm2"],completedUpgrades:[],unlockedProducts:["TOMATO"],stats:{tomatoSold:0,pasteProduced:0,pasteSold:0,juiceProduced:0,juiceSold:0,cornSold:0,popcornProduced:0,popcornSold:0,feedProduced:0,eggSold:0,breadProduced:0,breadSold:0,burgerCooked:0,pizzaCooked:0,tablesServed:0,tipsCollected:0},quest:"Domates topla, reyonu doldur ve ilk satışını yap.",settings:{language:"tr",sound:!0,haptics:!0}};for(const[o,a]of Object.entries(_t))n.stock[a.id]=Mn(a.capacity),o==="TOMATO"&&(n.stock[a.id].items.TOMATO=0);for(const[o,a]of Object.entries(at))a.kind==="farm"&&((s=n.stock)[r=`farm:${a.item}`]??(s[r]=Mn(60))),a.kind==="machine"&&(n.stock[`machine:${o}:input`]=Mn(12),n.stock[`machine:${o}:output`]=Mn(8));return n}function Zl(i){var a;if(!i||typeof i!="object")throw new Error("Kayıt boş veya bozuk.");if(i.saveVersion!==Ea)throw new Error(`Bu kayıt sürümü desteklenmiyor (${i.saveVersion??"bilinmiyor"}).`);const e=sa(i.rng),t={...e,...i};t.player={...e.player,...i.player??{}},t.economy={...e.economy,...i.economy??{}},t.settings={...e.settings,...i.settings??{}},t.unlocked={...e.unlocked,...i.unlocked??{}},t.stats={...e.stats,...i.stats??{}},t.availableUpgrades=Array.isArray(i.availableUpgrades)?[...i.availableUpgrades]:[...e.availableUpgrades],t.completedUpgrades=Array.isArray(i.completedUpgrades)?[...i.completedUpgrades]:[],t.stock={...e.stock,...i.stock??{}},t.farms={...e.farms,...i.farms??{}},t.machines={...e.machines,...i.machines??{}},t.coops={...e.coops,...i.coops??{}},t.diningTables={...e.diningTables,...i.diningTables??{}},t.reservations={...e.reservations,...i.reservations??{}},t.customerDemandBag=Array.isArray(i.customerDemandBag)?[...i.customerDemandBag]:[],t.customers=(Array.isArray(i.customers)?i.customers:[]).map((c,l)=>{var h;const u=typeof c.demand=="string"?c.demand:(h=c.demand)==null?void 0:h.id,d=Array.isArray(c.shoppingList)?c.shoppingList:Array.isArray(c.desiredItemTypes)?c.desiredItemTypes.map(g=>typeof g=="string"?g:g.id):u&&c.kind!=="diner"?[u]:[],f=Number(String(c.id??"").split("-").at(-1));return{...c,id:c.id??`customer-migrated-${l}`,demand:u??d[0]??"TOMATO",shoppingList:d,shoppingIndex:c.shoppingIndex??0,basket:Array.isArray(c.basket)?[...c.basket]:Array.isArray(c.carriedItems)?[...c.carriedItems]:[],checkoutOrder:Number.isFinite(c.checkoutOrder)?c.checkoutOrder:Number.isFinite(f)?f:l,routeIndex:c.routeIndex??0}}),t.farms=Object.fromEntries(Object.entries(t.farms).map(([c,l])=>[c,{progressTicks:l.progressTicks??l.progress??0,harvestCount:l.harvestCount??0,readyCount:l.readyCount??0}])),t.workers=t.workers.map(c=>({...c,task:c.task==="idle"?null:c.task??null}));for(const[c,l]of Object.entries(t.player))if(["x","z","facing","capacity"].includes(c)&&!Number.isFinite(l))throw new Error(`Oyuncu kaydındaki ${c} değeri geçerli değil.`);if(!Number.isSafeInteger(t.tick)||t.tick<0||!Number.isSafeInteger(t.revision)||t.revision<0)throw new Error("Kayıttaki saat veya sürüm sayacı geçerli değil.");if(!Number.isSafeInteger(t.rng)||t.rng<0||t.rng>4294967295)throw new Error("Kayıttaki rastgele sayı tohumu geçerli değil.");for(const[c,l]of Object.entries(e.stock)){const u=t.stock[c];!u||typeof u.items!="object"?t.stock[c]=structuredClone(l):t.stock[c]={...l,...u,items:{...u.items}}}for(const c of t.customers){if(!c.id||!["shopper","diner"].includes(c.kind)||!Number.isFinite(c.x)||!Number.isFinite(c.z))throw new Error("Kayıttaki müşteri bilgisi geçersiz.");const l=`customer:${c.id}`,u=t.stock[l];if((c.kind==="shopper"||["to-table","waiting-meal","eating","ready-tip"].includes(c.phase))&&(u?u.capacity=Math.max(4,u.capacity):t.stock[l]=Mn(4)),[...c.shoppingList,...c.basket].some(f=>!Qe[f]))throw new Error(`Müşteri ${c.id} sepetinde bilinmeyen ürün var.`);if(c.kind==="diner"&&!Qe[c.demand])throw new Error(`Müşteri ${c.id} yemek talebi geçersiz.`)}if(!Number.isSafeInteger(t.economy.balanceAtoms)||t.economy.balanceAtoms<0)throw new Error("Kayıttaki bakiye geçerli değil.");for(const c of Object.keys(Qe))for(const l of Object.values(t.stock))if(l.items[c]!==void 0&&(!Number.isInteger(l.items[c])||l.items[c]<0))throw new Error(`Kayıttaki ${c} stoğu geçerli değil.`);for(const[c,l]of Object.entries(t.stock)){if(!Number.isSafeInteger(l.capacity)||l.capacity<0)throw new Error(`Kayıttaki ${c} kapasitesi geçerli değil.`);l.reserved??(l.reserved={}),l.reservedCapacity??(l.reservedCapacity=0);const u=Object.values(l.items).reduce((f,h)=>f+h,0),d=Object.values(l.reserved).reduce((f,h)=>f+h,0);if(!Number.isSafeInteger(l.reservedCapacity)||l.reservedCapacity<0||u+l.reservedCapacity>l.capacity||!Number.isSafeInteger(d)||d<0)throw new Error(`Kayıttaki ${c} stok veya rezervasyon sınırı geçersiz.`);for(const[f,h]of Object.entries(l.reserved))if(!Qe[f]||!Number.isSafeInteger(h)||h<0||h>(l.items[f]??0))throw new Error(`Kayıttaki ${c} rezervasyonu geçerli değil.`);for(const f of Object.keys(l.items))if(!Qe[f])throw new Error(`Bilinmeyen ürün kaydı: ${f}`)}if(!Array.isArray(t.economy.entries)||t.economy.entries.some(c=>!c||typeof c.id!="string"||!Number.isSafeInteger(c.amountAtoms)||c.amountAtoms<=0||!["CREDIT","DEBIT"].includes(c.type)))throw new Error("Kayıttaki işlem günlüğü geçerli değil.");const n=t.economy.entries.map(c=>c.id);if(new Set(n).size!==n.length)throw new Error("Kayıttaki işlem kimlikleri yineleniyor.");if(t.economy.entries.length&&t.economy.entries.at(-1).balanceAtoms!==t.economy.balanceAtoms)throw new Error("Kayıt bakiyesi ile son işlem bakiyesi eşleşmiyor.");if(t.player.capacity!==((a=t.stock.player)==null?void 0:a.capacity))throw new Error("Oyuncu kapasitesi ile çanta stoğu eşleşmiyor.");const s=new Map,r=new Map;for(const[c,l]of Object.entries(t.reservations)){if(typeof c!="string"||!t.stock[l.from]||!t.stock[l.to]||!t.stock[l.origin]||!Qe[l.item]||!Number.isSafeInteger(l.quantity)||l.quantity<1)throw new Error("Kayıttaki stok rezervasyonu geçersiz.");const u=`${l.from}|${l.item}`;s.set(u,(s.get(u)??0)+l.quantity),r.set(l.to,(r.get(l.to)??0)+l.quantity)}for(const[c,l]of Object.entries(t.stock)){for(const[u,d]of Object.entries(l.reserved))if(d!==(s.get(`${c}|${u}`)??0))throw new Error(`Kayıttaki ${c} ürün rezervasyonu eşleşmiyor.`);for(const[u,d]of s)if(u.startsWith(`${c}|`)&&d!==(l.reserved[u.slice(c.length+1)]??0))throw new Error(`Kayıttaki ${c} kaynak rezervasyonu kayıp.`);if((l.reservedCapacity??0)!==(r.get(c)??0))throw new Error(`Kayıttaki ${c} hedef kapasitesi rezervasyonla eşleşmiyor.`)}for(const c of t.workers){if(!c.task)continue;const l=c.task,u=t.reservations[l.reservationId];if(!u||u.origin!==l.from||u.to!==l.to||u.item!==l.item||u.quantity!==l.quantity||!["to-source","to-target"].includes(l.phase))throw new Error(`Çalışan ${c.id} görevi ile rezervasyonu uyuşmuyor.`)}const o=t.stockTransactions.map(c=>typeof c=="string"?c:c==null?void 0:c.id);if(new Set(o).size!==o.length||o.some(c=>typeof c!="string"))throw new Error("Kayıttaki stok işlem kimlikleri yineleniyor veya geçersiz.");return Ys(t),t}const Jl=10,qa=22,Ql=40,eu=8,ns=.36,tu=[{min:{x:-4.2,z:8.8},max:{x:.9,z:9.2}},{min:{x:9.1,z:8.8},max:{x:14.2,z:9.2}},{min:{x:-4.2,z:-9.2},max:{x:14.2,z:-8.8}},{min:{x:13.8,z:-9.2},max:{x:14.2,z:9.2}},{min:{x:-48.2,z:8.8},max:{x:-42.2,z:9.2}},{min:{x:-31.8,z:8.8},max:{x:-25.8,z:9.2}},{min:{x:-48.2,z:-9.2},max:{x:-25.8,z:-8.8}},{min:{x:-48.2,z:-9.2},max:{x:-47.8,z:9.2}}];function rn(i){let e=i.rng+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),i.rng>>>=0,((e^e>>>14)>>>0)/4294967296}function nu(i,e,t,n,s,r){var f;if(!i.stock[e]||!i.stock[t])return 0;const o=li(i.stock,t)-pn(i.stock,t),a=nt(i.stock,e,n)-(((f=i.stock[e].reserved)==null?void 0:f[n])??0),c=Math.min(s,o,a);if(c<=0)return 0;const l=`reservation:${i.tick}:${r}`;if(!Cc(i,{reservationId:l,from:e,to:t,item:n,quantity:c}).ok)return 0;const d=$s(i,{transactionId:`sim:${i.tick}:${r}`,from:e,to:t,item:n,quantity:c,reservationId:l});return d.ok||Lc(i,l),d.ok?c:0}function iu(i){let e=!1;for(const[t,n]of Object.entries(i.farms)){const s=at[t];if(!s)continue;const r=`farm:${s.item}`;if(n.readyCount>0){n.progressTicks=0;continue}if(li(i.stock,r)-pn(i.stock,r)<1||(n.progressTicks+=1,n.progressTicks<qa))continue;n.progressTicks-=qa;const o=Math.min(3,li(i.stock,r)-pn(i.stock,r));i.stock[r].items[s.item]=nt(i.stock,r,s.item)+o,n.harvestCount+=o,n.readyCount=o,e=!0}return e}function su(i,e){var n;let t=!1;for(const[s,r]of Object.entries(i.machines)){const o=at[s],a=Yt[r.recipe];if(!o||!a)continue;const c=`machine:${s}:input`,l=`machine:${s}:output`,u=li(i.stock,l)-pn(i.stock,l)-(((n=i.stock[l])==null?void 0:n.reservedCapacity)??0),d=Object.entries(a.inputs).every(([h,g])=>nt(i.stock,c,h)>=g);if(u<1){r.blocked="output-full",r.progressTicks=0;continue}if(!d){r.blocked="missing-input",r.progressTicks=0;continue}if(r.blocked=!1,r.progressTicks+=1,r.progressTicks<Math.round(a.seconds*Jl))continue;r.progressTicks=0;for(const[h,g]of Object.entries(a.inputs))i.stock[c].items[h]-=g,i.stock[c].items[h]===0&&delete i.stock[c].items[h];i.stock[l].items[a.output]=nt(i.stock,l,a.output)+1;const f={TOMATO_PASTE:"pasteProduced",ORANGE_JUICE:"juiceProduced",POPCORN:"popcornProduced",CHICKEN_FEED:"feedProduced",BREAD:"breadProduced",BURGER:"burgerCooked",PIZZA:"pizzaCooked"}[a.output];f&&(i.stats[f]=(i.stats[f]??0)+1),e.push({type:"production",item:a.output,message:`${Qe[a.output].icon} ${Qe[a.output].name} hazır.`}),t=!0}return t}function ru(i,e){if(e.startsWith("farm:")){const t=e.slice(5),n=Object.values(i.farms).length&&Object.entries(i.farms).map(([s])=>at[s]).find(s=>(s==null?void 0:s.item)===t);return n?{x:n.x,z:n.z}:{x:-10,z:5}}if(e.startsWith("shelf:")){const t=e.slice(6);return _t[t]?{x:_t[t].x,z:_t[t].z}:null}if(e.startsWith("machine:")){const t=e.slice(8).split(":")[0],n=at[t];return n?{x:n.x,z:n.z}:null}if(e.startsWith("customer:")){const t=i.customers.find(n=>n.id===e.slice(9));return t?{x:t.x,z:t.z}:null}return e.startsWith("coop:")?{x:at.coop.x,z:at.coop.z}:null}function au(i,e){var t,n,s,r,o,a,c;if(e.type==="harvester")for(const[l,u]of Object.entries(i.farms)){const d=(t=at[l])==null?void 0:t.item,f=(n=_t[d])==null?void 0:n.id,h=i.workers.filter(g=>{var _;return((_=g.task)==null?void 0:_.farmId)===l&&g.task.phase==="to-source"}).length;if(f&&u.readyCount>h&&di(i,`farm:${d}`,f,d))return{from:`farm:${d}`,to:f,item:d,farmId:l}}if(e.type==="factoryFeeder"){const l=Object.entries(i.machines);for(const[f,h]of l){const g=(s=Yt[h.recipe])==null?void 0:s.output,_=`machine:${f}:output`;for(const[m,p]of l){const x=(r=Yt[p.recipe])==null?void 0:r.inputs[g],v=`machine:${m}:input`;if(x&&nt(i.stock,v,g)<x&&di(i,_,v,g))return{from:_,to:v,item:g}}}const u=Math.floor(i.tick/8)%Math.max(1,l.length),d=[...l.slice(u),...l.slice(0,u)];for(const[f,h]of d){const g=Yt[h.recipe],_=`machine:${f}:input`,m=`machine:${f}:output`,p=(o=_t[g.output])==null?void 0:o.id;if(!Object.entries(i.machines).some(([v,S])=>{var R;return v!==f&&((R=Yt[S.recipe])==null?void 0:R.inputs[g.output])&&nt(i.stock,`machine:${v}:input`,g.output)<Yt[S.recipe].inputs[g.output]})&&p&&nt(i.stock,m,g.output)>0&&di(i,m,p,g.output))return{from:m,to:p,item:g.output};for(const[v,S]of Object.entries(g.inputs)){const R=Object.values(i.reservations).filter(y=>y.to===_&&y.item===v).length;if(nt(i.stock,_,v)+R>=S)continue;const T=`farm:${v}`,k=[T,...Object.entries(i.machines).filter(([,y])=>{var E;return((E=Yt[y.recipe])==null?void 0:E.output)===v}).map(([y])=>`machine:${y}:output`),(a=_t[v])==null?void 0:a.id].find(y=>y&&di(i,y,_,v));if(k)return{from:k,to:_,item:v,farmId:k===T?Object.keys(i.farms).find(y=>{var E;return((E=at[y])==null?void 0:E.item)===v&&i.farms[y].readyCount>0}):void 0}}}}if(e.type==="caretaker"){if(di(i,"coop:eggs",_t.EGG.id,"EGG"))return{from:"coop:eggs",to:_t.EGG.id,item:"EGG"};if(di(i,"machine:feed:output","coop:feed","CHICKEN_FEED"))return{from:"machine:feed:output",to:"coop:feed",item:"CHICKEN_FEED"}}if(e.type==="chefWaiter")for(const l of["burgerKitchen","pizzaKitchen"]){const u=i.machines[l];if(!u)continue;const d=Yt[u.recipe],f=`machine:${l}:input`;for(const[h,g]of Object.entries(d.inputs)){if(nt(i.stock,f,h)>=g)continue;const _=`farm:${h}`,m=(c=_t[h])==null?void 0:c.id,p=nt(i.stock,_,h)>0?_:m;if(p&&nt(i.stock,p,h)>0)return{from:p,to:f,item:h,farmId:p===_?Object.keys(i.farms).find(x=>{var v;return((v=at[x])==null?void 0:v.item)===h&&i.farms[x].readyCount>0}):void 0}}}if(e.type==="waiter")for(const[l,u]of Object.entries(i.diningTables)){const d=i.customers.find(g=>g.id===u.customerId&&g.phase==="waiting-meal");if(!d)continue;const h=`machine:${d.demand==="BURGER"?"burgerKitchen":"pizzaKitchen"}:output`;if(nt(i.stock,h,d.demand)>0)return{from:h,to:`customer:${d.id}`,item:d.demand,tableId:l,customerId:d.id}}return null}function di(i,e,t,n){var o;const s=i.stock[e],r=i.stock[t];return!!(s&&r&&nt(i.stock,e,n)-(((o=s.reserved)==null?void 0:o[n])??0)>0&&li(i.stock,t)-pn(i.stock,t)-(r.reservedCapacity??0)>0)}function ou(i,e){const t=au(i,e);if(!t)return!1;const n=`worker-task:${e.id}:${i.nextEntityId++}`;if(!Cc(i,{reservationId:n,...t,quantity:1}).ok)return!1;const r=`worker:${e.id}`;return En(i.stock,r,6),e.task={...t,reservationId:n,carrier:r,quantity:1,phase:"to-source"},!0}function cu(i){let e=!1;for(const t of i.workers){if(!t.task&&(i.tick%8===0&&ou(i,t)&&(e=!0),!t.task))continue;const n=t.task,s=n.phase==="to-source"?n.from:n.to,r=n.phase==="to-source"&&n.farmId?at[n.farmId]:ru(i,s);if(!r||(t.facing=Math.atan2(r.x-t.x,r.z-t.z),!Ui(t,r.x,r.z,.34)))continue;if(n.phase==="to-source"){Kl(i,n.reservationId,n.carrier).ok&&(n.farmId&&i.farms[n.farmId]&&(i.farms[n.farmId].readyCount-=n.quantity),n.phase="to-target",e=!0);continue}if($s(i,{transactionId:`worker-delivery:${n.reservationId}`,from:n.carrier,to:n.to,item:n.item,quantity:n.quantity,reservationId:n.reservationId}).ok){if(n.customerId){const a=i.customers.find(l=>l.id===n.customerId),c=i.diningTables[n.tableId];a&&c&&(a.phase="eating",a.meal=n.item,a.eatTicks=0,c.meal=n.item,c.eatTicks=0,i.stats.tablesServed+=1)}t.task=null,e=!0}}return e}function Ui(i,e,t,n){const s=e-i.x,r=t-i.z,o=Math.hypot(s,r);return o>1e-4&&(i.facing=Math.atan2(s,r)),o<=n?(i.x=e,i.z=t,!0):(i.x+=s/o*n,i.z+=r/o*n,!1)}function fn(i,e,t){i.route=e.map(({x:n,z:s})=>({x:n,z:s})),i.routeIndex=0,i.phase=t}function Kn(i){var e;for(;i.routeIndex<(((e=i.route)==null?void 0:e.length)??0);){const t=i.route[i.routeIndex];if(Ui(i,t.x,t.z,ns))return!1;i.routeIndex+=1}return!0}function lu(i){for(const t of tu){const n=Math.max(t.min.x,Math.min(t.max.x,i.x)),s=Math.max(t.min.z,Math.min(t.max.z,i.z)),r=i.x-n,o=i.z-s,a=r*r+o*o;if(!(a>=.32*.32))if(a>1e-4){const c=Math.sqrt(a);i.x+=r/c*(.32-c),i.z+=o/c*(.32-c)}else{const c=[{d:Math.abs(i.x-t.min.x),x:t.min.x-.32,z:i.z},{d:Math.abs(t.max.x-i.x),x:t.max.x+.32,z:i.z},{d:Math.abs(i.z-t.min.z),x:i.x,z:t.min.z-.32},{d:Math.abs(t.max.z-i.z),x:i.x,z:t.max.z+.32}].sort((l,u)=>l.d-u.d)[0];i.x=c.x,i.z=c.z}}i.x=Math.max(-52,Math.min(18,i.x)),i.z=Math.max(-8.6,Math.min(22,i.z))}function uu(i,e){if(!(e.phase==="seated"||e.phase==="eating"||e.phase==="ready-tip")){for(const t of i.customers){if(t===e||t.phase==="seated"||t.phase==="eating"||t.phase==="ready-tip")continue;const n=e.x-t.x,s=e.z-t.z,r=Math.hypot(n,s);if(r>=.72)continue;const o=r>1e-4?Math.atan2(s,n):Number(e.id.split("-").at(-1))%2?0:Math.PI,a=(.72-r)*.42;e.x+=Math.cos(o)*a,e.z+=Math.sin(o)*a}lu(e)}}function ms(i,e){const t=_t[i];return{x:t.x,z:t.z+1.3+e*.85}}function hu(i,e){if(i.customerDemandBag=(i.customerDemandBag??[]).filter(t=>e.includes(t)),!i.customerDemandBag.length){i.customerDemandBag=[...e];for(let t=i.customerDemandBag.length-1;t>0;t-=1){const n=Math.floor(rn(i)*(t+1));[i.customerDemandBag[t],i.customerDemandBag[n]]=[i.customerDemandBag[n],i.customerDemandBag[t]]}}return i.customerDemandBag.pop()??e[0]}function du(i){const e=i.unlockedProducts.filter(u=>_t[u]);if(!e.length)return;const t=`customer-${i.nextEntityId++}`;if(!!(i.unlocked.restaurant&&Object.keys(i.diningTables).length)&&rn(i)<.35){const u={id:t,kind:"diner",x:-37+(rn(i)-.5)*1.8,z:16+rn(i)*2,phase:"entering",demand:rn(i)<.5?"BURGER":"PIZZA",tableId:null,eatTicks:0,waitTicks:0,facing:Math.PI};fn(u,[{x:-37,z:10.4},{x:-37,z:6.6}],"entering"),i.customers.push(u);return}const r=hu(i,e),o=e.length>=3?rn(i)<.35?1:rn(i)<.54?2:3:e.length===2&&rn(i)<.5?2:1,a=e.filter(u=>u!==r);for(let u=a.length-1;u>0;u-=1){const d=Math.floor(rn(i)*(u+1));[a[u],a[d]]=[a[d],a[u]]}const c=[r,...a.slice(0,o-1)],l={id:t,kind:"shopper",x:5+(rn(i)-.5)*1.4,z:16+rn(i)*2,phase:"entering",shoppingList:c,shoppingIndex:0,demand:r,basket:[],payTicks:0,waitTicks:0,checkoutOrder:i.nextEntityId,facing:Math.PI};fn(l,[{x:l.x,z:10.4},{x:5,z:6.6}],"entering"),En(i.stock,`customer:${t}`,4),i.customers.push(l)}function vr(i){fn(i,[{x:5,z:i.z},{x:5,z:3.5},{x:5,z:8},{x:5,z:10.4},{x:5,z:16}],"leaving")}function xr(i,e){e.checkoutOrder=i.nextEntityId++,e.registerAisleReached=!1,fn(e,[{x:5,z:e.z},{x:5,z:3.5}],"to-register")}function yr(i,e){const t=e.tableId?i.diningTables[e.tableId]:null;(t==null?void 0:t.customerId)===e.id&&(t.customerId=null),e.tableId=null,fn(e,[{x:-37,z:7},{x:-37,z:10.4},{x:-37,z:16}],"leaving")}function $a(i,e){const t=Object.entries(i.diningTables).find(([,o])=>!o.customerId);if(!t)return fn(e,[{x:-37,z:10.8+(e.tableWaitIndex??0)*.85}],"waiting-table"),!1;const[n,s]=t;e.tableId=n,s.customerId=e.id,En(i.stock,`customer:${e.id}`,4);const r=at[n];return fn(e,[{x:r.x,z:r.z}],"to-table"),!0}function fu(i,e){var o,a,c,l,u,d;let t=!1;i.customerSpawnTicks+=1,i.customerSpawnTicks>=Ql&&(i.customerSpawnTicks=0,i.customers.length<eu&&du(i));const n=new Map;for(const f of i.customers){if(f.kind!=="shopper"||!["to-shelf","waiting-stock"].includes(f.phase))continue;const h=((o=f.shoppingList)==null?void 0:o[f.shoppingIndex??0])??f.demand,g=n.get(h)??[];g.push(f),n.set(h,g)}for(const f of n.values())f.sort((h,g)=>h.checkoutOrder-g.checkoutOrder);const s=i.customers.filter(f=>f.kind==="shopper"&&["to-register","queueing","paying"].includes(f.phase)).sort((f,h)=>f.checkoutOrder-h.checkoutOrder);for(let f=0;f<s.length;f+=1)s[f].queueIndex=f;i.customers.filter(f=>f.kind==="diner"&&f.phase==="waiting-table").forEach((f,h)=>{f.tableWaitIndex=h});for(let f=i.customers.length-1;f>=0;f-=1){const h=i.customers[f];if(h.phase==="leaving"&&!Array.isArray(h.route)&&(h.kind==="diner"?yr(i,h):vr(h)),uu(i,h),h.kind==="diner"){if(h.phase==="entering"&&Kn(h))t=$a(i,h)||t;else if(h.phase==="waiting-table"){h.waitTicks=(h.waitTicks??0)+1;const g=10.8+(h.tableWaitIndex??0)*.85;Ui(h,-37,g,ns)&&(h.phase="waiting-table"),(h.tableWaitIndex??0)===0&&$a(i,h)?t=!0:h.waitTicks>450&&(yr(i,h),t=!0)}else if(h.phase==="to-table"&&Kn(h))h.phase="waiting-meal",h.waitTicks=0;else if(h.phase==="waiting-meal"){h.waitTicks=(h.waitTicks??0)+1;const g=Object.values(i.reservations).some(_=>_.to===`customer:${h.id}`&&_.item===h.demand);h.waitTicks>300&&!g&&(yr(i,h),t=!0)}else if(h.phase==="eating"){h.eatTicks+=1;const g=i.diningTables[h.tableId];if(g&&(g.eatTicks=h.eatTicks),h.eatTicks>=80&&g&&g.tipAtoms===0){g.tipAtoms=12*1e4,h.phase="ready-tip";const _=i.stock[`customer:${h.id}`];(a=_==null?void 0:_.items)!=null&&a[h.meal]&&(_.items[h.meal]-=1,_.items[h.meal]||delete _.items[h.meal]),e.push({type:"tip-ready",message:"💵 Müşterinin bahşişi hazır."}),t=!0}}else h.phase==="leaving"&&Kn(h)&&(delete i.stock[`customer:${h.id}`],i.customers.splice(f,1));continue}if(h.phase==="entering"&&Kn(h)){const g=h.shoppingList[h.shoppingIndex],_=ms(g,((c=n.get(g))==null?void 0:c.indexOf(h))??0);fn(h,[{x:5,z:3.5},_],"to-shelf")}else if(h.phase==="to-next-shelf"&&Kn(h)){const g=h.shoppingList[h.shoppingIndex],_=ms(g,((l=n.get(g))==null?void 0:l.indexOf(h))??0);fn(h,[_],"to-shelf")}else if(h.phase==="to-shelf"){const g=h.shoppingList[h.shoppingIndex]??h.demand,_=((u=n.get(g))==null?void 0:u.indexOf(h))??0,m=ms(g,Math.max(0,_));Ui(h,m.x,m.z,ns)&&(h.phase="waiting-stock",h.waitTicks=0)}else if(h.phase==="waiting-stock"){const g=h.shoppingList[h.shoppingIndex]??h.demand,m=(n.get(g)??[]).indexOf(h),p=ms(g,Math.max(0,m));Ui(h,p.x,p.z,ns),h.waitTicks+=1;const x=(d=_t[g])==null?void 0:d.id;m===0&&nt(i.stock,x,g)>0?nu(i,x,`customer:${h.id}`,g,1,`customer-pickup:${h.id}:${h.shoppingIndex}`)&&(h.basket.push(g),h.shoppingIndex+=1,h.waitTicks=0,t=!0,h.shoppingIndex<h.shoppingList.length?(h.demand=h.shoppingList[h.shoppingIndex],fn(h,[{x:5,z:h.z},{x:5,z:3.5}],"to-next-shelf")):(h.demand=h.basket[0],xr(i,h))):h.waitTicks>180&&(h.basket.length?(h.demand=h.basket[0],xr(i,h)):vr(h))}else if(h.phase==="to-register"||h.phase==="queueing"){const g={x:5,z:-2.8+(h.queueIndex??0)*1.1};h.phase==="to-register"&&!h.registerAisleReached?(Array.isArray(h.route)||xr(i,h),Kn(h)&&(h.registerAisleReached=!0)):Ui(h,g.x,g.z,ns)&&(h.phase=h.queueIndex===0?"paying":"queueing",h.payTicks=0)}else if(h.phase==="paying"){const g=i.workers.some(_=>_.type==="cashier")||Math.hypot(i.player.x-at.register.x,i.player.z-(at.register.z-1.1))<=1.8;if(h.queueIndex===0&&g&&(h.payTicks+=1),h.payTicks>=(i.workers.some(_=>_.type==="cashier")?5:14)){const _=new Vs(i.economy),m=[...h.basket];let p=0;for(let x=0;x<m.length;x+=1){const v=m[x],S=i.stock[`customer:${h.id}`];if(nt(i.stock,`customer:${h.id}`,v)<1)continue;S.items[v]-=1,S.items[v]||delete S.items[v],_.credit(`sale:${h.id}:${x}`,Qe[v].price,`sale:${v}`),p+=Qe[v].price;const R={TOMATO:"tomatoSold",TOMATO_PASTE:"pasteSold",ORANGE_JUICE:"juiceSold",CORN:"cornSold",POPCORN:"popcornSold",EGG:"eggSold",BREAD:"breadSold"};R[v]&&(i.stats[R[v]]+=1)}if(p){const x=m[0];e.push({type:"sale",item:x,items:m,amount:p,message:`+ $${p} · ${m.map(v=>Qe[v].icon).join(" ")} satıldı.`}),t=!0}vr(h)}}else h.phase==="leaving"&&Kn(h)&&(delete i.stock[`customer:${h.id}`],i.customers.splice(f,1))}return t}function pu(i){const e=i.coops.coop;if(!e)return!1;if(nt(i.stock,"coop:feed","CHICKEN_FEED")<1)return e.progressTicks=0,!1;e.progressTicks+=1;const n=Math.max(60,Math.round(180/e.chickens));return e.progressTicks<n||li(i.stock,"coop:eggs")-pn(i.stock,"coop:eggs")<1?!1:(e.progressTicks=0,i.stock["coop:feed"].items.CHICKEN_FEED-=1,i.stock["coop:feed"].items.CHICKEN_FEED||delete i.stock["coop:feed"].items.CHICKEN_FEED,i.stock["coop:eggs"].items.EGG=nt(i.stock,"coop:eggs","EGG")+1,!0)}function mu(i){const e=[];Ys(i);let t=iu(i);return t=su(i,e)||t,t=pu(i)||t,t=cu(i)||t,Ys(i),t=fu(i,e)||t,{events:e,durable:t}}function Mr(i){return structuredClone(i)}const gu={tomatoFarm2:"İkinci domates tarlası açıldı. Hasat kapasiten arttı.",cashier:"Kasiyer işe alındı. Ödemeler daha hızlı işleniyor.",paste:"Salça kazanı ve yeni reyon açıldı.",harvester:"Hasat işçisi rafları otomatik dolduruyor.",orange:"Portakal bahçesi ve meyve sıkacağı açıldı.",factoryFeeder:"Fabrika lojistikçisi üretim hatlarını besliyor.",orangeFarm2:"İkinci portakal bahçesi açıldı.",corn:"Mısır tarlası ve reyon açıldı.",popcorn:"Popcorn makinesi ve reyon açıldı.",feed:"Yem değirmeni kuruldu.",coop:"Tavuk kümesi ve yumurta reyonu açıldı.",chicken2:"İkinci tavuk kümese katıldı.",chicken3:"Üçüncü tavuk kümese katıldı.",caretaker:"Çiftlik bakıcısı işe alındı.",bakery:"Buğday tarlası ve taş fırın açıldı.",restaurant:"Gurme restoran ve masalar açıldı.",chefWaiter:"Şef ve garson işe alındı. Restoran otomasyona geçti."},$i={x:at.register.x,z:at.register.z-1.75};var Ie,Dn,kn,Pc,ni,is,ra,Nn,Ic;class _u{constructor(e,t){Rn(this,Ie);var u;this.saveService=e;const n=e.load();this.state=n.state??sa(t);const s=(u=e.storage)==null?void 0:u.getItem("player_character"),o=["shopkeeper","cat","robot","panda","penguin"].includes(s)&&this.state.player.character==="shopkeeper"&&s!=="shopkeeper";o&&(this.state.player.character=s);const a=this.state.availableUpgrades.join(",");B(this,Ie,is).call(this,this.state);const c=a!==this.state.availableUpgrades.join(","),l=this.state.workers.some(d=>d.type==="cashier"&&(d.x!==$i.x||d.z!==$i.z));if(l)for(const d of this.state.workers)d.type==="cashier"&&Object.assign(d,$i,{facing:0});this.recovered=n.recovered,this.onEvent=()=>{},this.lastDurableTick=this.state.tick,n.state?(o||c||l)&&B(this,Ie,Dn).call(this,`migration:${this.state.tick}:${s??"none"}:${this.state.availableUpgrades.join(",")}`):B(this,Ie,Dn).call(this,"new-game"),n.recovered&&this.onEvent({type:"toast",message:"Yedek kayıttan devam edildi."})}setEventHandler(e){this.onEvent=e}getState(){return this.state}getBalance(){return this.state.economy.balanceAtoms/1e4}getAvailableUpgrades(){return Ni.filter(e=>this.state.availableUpgrades.includes(e.id)&&!this.state.completedUpgrades.includes(e.id))}buyUpgrade(e){const t=Ni.find(n=>n.id===e);return t?B(this,Ie,kn).call(this,`upgrade:${e}:${this.state.revision+1}`,n=>{if(!n.availableUpgrades.includes(e)||n.completedUpgrades.includes(e))return{ok:!1,reason:"locked"};new Vs(n.economy).debit(`purchase:${e}`,t.price,`upgrade:${e}`),n.completedUpgrades.push(e);for(const s of t.unlocks)n.unlocked[s]=!0;return B(this,Ie,Pc).call(this,n,e),n.quest=B(this,Ie,ra).call(this,n),{ok:!0,message:gu[e]}}):{ok:!1,reason:"unknown-upgrade"}}interact(e){const t=this.state,n=t.player;if(Ni.find(c=>c.id===e)&&!t.completedUpgrades.includes(e))return this.buyUpgrade(e);const r=at[e];return r?(r.kind==="farm"?!!t.farms[e]:r.kind==="machine"?!!t.machines[e]:r.kind==="shelf"?t.unlockedProducts.includes(r.item):r.kind==="coop"?!!t.coops.coop:r.kind==="table"?!!t.diningTables[e]:!!t.unlocked.register)?Math.hypot(n.x-r.x,n.z-r.z)>2.2?{ok:!1,reason:"too-far"}:B(this,Ie,kn).call(this,`interact:${e}:${t.revision+1}`,c=>{let l=0;if(r.kind==="farm"){Ys(c);const u=`farm:${r.item}`;return l+=B(this,Ie,Nn).call(this,c,u,"player",r.item,c.farms[e].readyCount),c.farms[e].readyCount-=l,l?{ok:!0,message:`${Qe[r.item].icon} ${l} ürün alındı.`}:{ok:!1,reason:"empty"}}if(r.kind==="machine"){if(!c.machines[e])return{ok:!1,reason:"locked"};const d=Yt[r.recipe],f=`machine:${e}:output`,h=d.output;if(l=B(this,Ie,Nn).call(this,c,f,"player",h,c.player.capacity),l)return{ok:!0,message:`${Qe[h].icon} ${l} ${Qe[h].name} alındı.`};if(!l){const g=`machine:${e}:input`;for(const[_]of Object.entries(d.inputs)){const m=nt(c.stock,"player",_);m>0&&(l+=B(this,Ie,Nn).call(this,c,"player",g,_,m))}}return l?{ok:!0,message:`${l} malzeme ${r.title} girişine yüklendi.`}:{ok:!1,reason:"no-compatible-stock"}}if(r.kind==="coop")return l+=B(this,Ie,Nn).call(this,c,"coop:eggs","player","EGG",c.player.capacity),l||(l+=B(this,Ie,Nn).call(this,c,"player","coop:feed","CHICKEN_FEED",c.player.capacity)),l?{ok:!0,message:"Kümes stoğu aktarıldı."}:{ok:!1,reason:"no-compatible-stock"};if(r.kind==="shelf"){const d=_t[r.item].id,f=nt(c.stock,"player",r.item);return f>0?(l=B(this,Ie,Nn).call(this,c,"player",d,r.item,f),l?{ok:!0,message:`${Qe[r.item].icon} Reyon dolduruldu.`}:{ok:!1,reason:"destination-full"}):(l=B(this,Ie,Nn).call(this,c,d,"player",r.item,c.player.capacity),l?{ok:!0,message:`${Qe[r.item].icon} ${l} ürün alındı.`}:{ok:!1,reason:"empty"})}return r.kind==="table"?B(this,Ie,Ic).call(this,c,e):r.kind==="register"?{ok:!1,reason:"passive-station"}:{ok:!1,reason:"no-action"}}):{ok:!1,reason:"locked"}:{ok:!1,reason:"unknown-station"}}setPlayerMove(e,t){const n={...this.state.player},s=7.5*(this.state.speedMultiplier||1);let r=e.x*s*t,o=e.z*s*t;const a=Math.hypot(r,o);a>s*t&&(r*=s*t/a,o*=s*t/a);const c=this.obstacles??[],l=Math.max(1,Math.ceil(Math.hypot(r,o)/.18)),u=r/l,d=o/l,f=(h,g)=>c.some(_=>h>_.min.x-.45&&h<_.max.x+.45&&g>_.min.z-.45&&g<_.max.z+.45);for(let h=0;h<l;h+=1){const g=n.x+u,_=n.z+d;f(g,n.z)||(n.x=g),f(n.x,_)||(n.z=_)}(e.x||e.z)&&(n.facing=Math.atan2(e.x,e.z)),n.x=Math.max(-49,Math.min(13.2,n.x)),n.z=Math.max(-8.2,Math.min(11.8,n.z)),this.state.player=n}setPlayerTarget(e,t){this.target={x:e,z:t}}clearPlayerTarget(){this.target=null}updateTargetMove(e){if(!this.target)return;const t=this.target.x-this.state.player.x,n=this.target.z-this.state.player.z,s=Math.hypot(t,n);if(s<.25){this.target=null;return}const r=Math.min(s,7.5*(this.state.speedMultiplier||1)*e);this.setPlayerMove({x:t/s,z:n/s},r/(7.5*(this.state.speedMultiplier||1)))}getNearbyAction(){const e=this.state.player,t=[];for(const[r,o]of Object.entries(at))(o.kind==="farm"?!!this.state.farms[r]:o.kind==="machine"?!!this.state.machines[r]:o.kind==="shelf"?this.state.unlockedProducts.includes(o.item):o.kind==="coop"?!!this.state.coops.coop:o.kind==="table"?!!this.state.diningTables[r]:!0)&&t.push({id:r,...o,distance:Math.hypot(e.x-o.x,e.z-o.z)});for(const r of this.getAvailableUpgrades())t.push({...r,kind:"upgrade",distance:Math.hypot(e.x-r.x,e.z-r.z)});t.sort((r,o)=>r.distance-o.distance);const n=t[0];if(!n||n.distance>2.2)return null;if(n.kind==="upgrade")return{...n,label:`${n.title} · $${n.price}`};const s=this.state;if(n.kind==="farm")return{...n,label:`Hasat et · ${n.title}`};if(n.kind==="machine"){const r=Yt[n.recipe],o=nt(s.stock,`machine:${n.id}:output`,r.output),a=Object.keys(r.inputs).some(u=>nt(s.stock,"player",u)>0),c=Object.entries(r.inputs).filter(([u,d])=>nt(s.stock,`machine:${n.id}:input`,u)<d),l=o>0?`${Qe[r.output].icon} ${o} ürün hazır · al`:a?"Malzemeleri makineye yükle":c.length?`Gerekli: ${c.map(([u,d])=>`${d} ${Qe[u].name}`).join(" + ")}`:`Üretiliyor · ${Math.round(s.machines[n.id].progressTicks/(r.seconds*10)*100)}%`;return{...n,label:l,actionable:o>0||a}}if(n.kind==="shelf"){const r=nt(s.stock,"player",n.item),o=nt(s.stock,_t[n.item].id,n.item);return{...n,label:r>0?"Reyonu doldur":o>0?`${Qe[n.item].icon} Ürünü al`:"Reyon boş"}}if(n.kind==="coop")return{...n,label:nt(s.stock,"coop:eggs","EGG")?"🥚 Yumurtaları al":"Kümese yem bırak"};if(n.kind==="table"){const r=s.diningTables[n.id];return{...n,label:r.tipAtoms?"💵 Bahşişi al":r.customerId?"Yemeği servis et":n.title}}return{...n,label:"Müşteriler kasada ödeme yapıyor",actionable:!1}}tick(){const e=Mr(this.state),{events:t,durable:n}=mu(e);if(e.tick+=1,B(this,Ie,is).call(this,e),e.quest=B(this,Ie,ra).call(this,e),n){e.revision+=1;try{B(this,Ie,Dn).call(this,`simulation:${e.tick}`,e)}catch(s){this.onEvent({type:"save-error",message:s.message});return}}else this.state=e;for(const s of t)this.onEvent(s);if(e.tick-this.lastDurableTick>=300)try{B(this,Ie,Dn).call(this,`checkpoint:${e.tick}:${this.saveService.sequence+1}`,this.state)}catch(s){this.onEvent({type:"save-error",message:s.message})}}setObstacles(e){this.obstacles=e}setPaused(e){this.state.paused=e}checkpoint(){const e=Mr(this.state);e.revision+=1,B(this,Ie,Dn).call(this,`checkpoint:${e.tick}:${this.saveService.sequence+1}`,e)}setLanguage(e){return["tr","en"].includes(e)?B(this,Ie,kn).call(this,`language:${e}:${this.state.revision+1}`,t=>(t.settings.language=e,{ok:!0})):{ok:!1,reason:"unsupported-language"}}setSetting(e,t){if(["sound","haptics"].includes(e))return B(this,Ie,kn).call(this,`setting:${e}:${this.state.revision+1}`,n=>(n.settings[e]=!!t,{ok:!0}))}setCharacter(e){var n;if(!["shopkeeper","cat","robot","panda","penguin"].includes(e))return{ok:!1,reason:"unsupported-character"};const t=B(this,Ie,kn).call(this,`character:${e}:${this.state.revision+1}`,s=>(s.player.character=e,{ok:!0}));if(t.ok)try{(n=this.saveService.storage)==null||n.setItem("player_character",e)}catch{}return t}setSpeedMultiplier(e){[1,2,5].includes(e)&&(this.state.speedMultiplier=e)}debugCredit(e){return B(this,Ie,kn).call(this,`debug-credit:${this.state.revision+1}`,t=>(new Vs(t.economy).credit(`debug-credit:${t.revision+1}`,e,"debug"),{ok:!0,message:`$${e.toLocaleString("tr-TR")} eklendi.`}))}debugCapacity(e){return B(this,Ie,kn).call(this,`debug-capacity:${this.state.revision+1}`,t=>(t.player.capacity=e,t.stock.player.capacity=e,{ok:!0,message:`🎒 Taşıma kapasitesi ${e} oldu.`}))}reset(){this.saveService.clear(),this.state=sa(),this.target=null,B(this,Ie,Dn).call(this,"new-game"),this.onEvent({type:"reset"})}}Ie=new WeakSet,Dn=function(e,t=this.state){this.saveService.commit(t,e),this.state=t,this.lastDurableTick=t.tick},kn=function(e,t){const n=Mr(this.state);try{const s=t(n);return s!=null&&s.ok?(n.revision+=1,B(this,Ie,Dn).call(this,e,n),s.message&&this.onEvent({type:"toast",message:s.message}),{...s,state:this.state}):s??{ok:!1,reason:"rejected"}}catch(s){return this.onEvent({type:"toast",message:s.message,tone:"error"}),{ok:!1,reason:"command-failed",error:s}}},Pc=function(e,t){const n=a=>{const c=_t[a];c&&(En(e.stock,c.id,c.capacity),e.unlocked[`${a.toLowerCase()}Shelf`]=!0)},s=a=>{const c=at[a],l=Yt[c.recipe];e.machines[a]={progressTicks:0,recipe:c.recipe,blocked:!1},En(e.stock,`machine:${a}:input`,12),En(e.stock,`machine:${a}:output`,8),l.output!=="CHICKEN_FEED"&&n(l.output)},r=a=>{const c=at[a];e.farms[a]={progressTicks:0,harvestCount:0,readyCount:0},En(e.stock,`farm:${c.item}`,60)},o=a=>{e.unlockedProducts.includes(a)||e.unlockedProducts.push(a),n(a)};t==="tomatoFarm2"&&r("tomatoFarm2"),t==="cashier"&&B(this,Ie,ni).call(this,e,"cashier"),t==="paste"&&(s("paste"),o("TOMATO_PASTE")),t==="harvester"&&B(this,Ie,ni).call(this,e,"harvester"),t==="orange"&&(r("orangeFarm"),s("juice"),o("ORANGE"),o("ORANGE_JUICE")),t==="factoryFeeder"&&B(this,Ie,ni).call(this,e,"factoryFeeder"),t==="orangeFarm2"&&r("orangeFarm2"),t==="corn"&&(r("cornFarm"),o("CORN")),t==="popcorn"&&(s("popcorn"),o("POPCORN")),t==="feed"&&s("feed"),t==="coop"&&(En(e.stock,"coop:feed",20),En(e.stock,"coop:eggs",20),e.coops.coop={chickens:1,progressTicks:0},o("EGG")),t==="chicken2"&&(e.coops.coop.chickens=2),t==="chicken3"&&(e.coops.coop.chickens=3),t==="caretaker"&&B(this,Ie,ni).call(this,e,"caretaker"),t==="bakery"&&(r("wheatFarm"),s("bakery"),o("BREAD")),t==="restaurant"&&(s("burgerKitchen"),s("pizzaKitchen"),e.unlockedProducts.push("BURGER","PIZZA"),e.diningTables=Object.fromEntries(["table1","table2","table3","table4"].map(a=>[a,{customerId:null,meal:null,tipAtoms:0,eatTicks:0}]))),t==="chefWaiter"&&(B(this,Ie,ni).call(this,e,"chefWaiter"),B(this,Ie,ni).call(this,e,"waiter")),B(this,Ie,is).call(this,e)},ni=function(e,t){const n={cashier:[$i.x,$i.z],harvester:[-10,5],factoryFeeder:[-10,0],caretaker:[-18,0],chefWaiter:[-30,0],waiter:[-35,0]},[s,r]=n[t]??[-8,0];e.workers.push({id:`worker-${e.nextEntityId++}`,type:t,x:s,z:r,facing:0,task:null})},is=function(e){const t={cashier:e.stats.tomatoSold>0,paste:e.stats.tomatoSold>0,harvester:e.stats.pasteSold>0,orange:e.stats.pasteSold>0,factoryFeeder:e.stats.juiceSold>0,orangeFarm2:e.stats.juiceSold>0,corn:e.stats.juiceSold>0,popcorn:e.stats.cornSold>0,feed:e.stats.popcornSold>0,coop:e.stats.feedProduced>0,chicken2:e.stats.eggSold>0,caretaker:e.stats.eggSold>0,bakery:e.stats.eggSold>0,chicken3:e.completedUpgrades.includes("chicken2"),restaurant:e.stats.breadSold>0,chefWaiter:e.stats.tipsCollected>0};for(const[n,s]of Object.entries(t))s&&!e.completedUpgrades.includes(n)&&!e.availableUpgrades.includes(n)&&e.availableUpgrades.push(n)},ra=function(e){return e.unlocked.paste?e.stats.pasteSold===0?"2 domatesi salça kazanına bırak, salçayı rafa taşı ve sat.":e.unlocked.orange?e.stats.juiceSold===0?"Portakalları sıkıp meyve suyunu rafa taşı.":e.unlocked.corn?e.stats.cornSold===0?"Mısır hasat et, reyona koy ve sat.":e.unlocked.popcorn?e.stats.popcornSold===0?"Mısırı popcorn makinesine yükle; popcorn üretip sat.":e.unlocked.feed?e.stats.feedProduced===0?"Mısırı değirmene yükle ve tavuk yemi üret.":e.unlocked.coop?e.stats.eggSold===0?"Yemi kümese bırak, yumurtaları toplayıp sat.":e.unlocked.bakery?e.stats.breadSold===0?"2 buğday ve 1 yumurtayı fırına yükle; ekmek üretip sat.":e.unlocked.restaurant?e.unlocked.chefWaiter?"Tebrikler! GBLB STORE ve Gurme Restoran işletmen tamamlandı.":"Burger veya pizza pişir, müşteriye servis et ve bahşiş topla.":"Gurme restoranı aç.":"Buğday tarlası ve taş fırını aç.":"Tavuk kümesini aç.":"Yem değirmenini aç.":"Popcorn makinesini aç.":"Mısır tarlasını ve reyonunu aç.":"Portakal bahçesi ve meyve sıkacağını aç.":e.stats.tomatoSold>0?"Salça kazanı ve reyonu aç.":"İlk domates satışını yap."},Nn=function(e,t,n,s,r){var u;const o=nt(e.stock,t,s)-(((u=e.stock[t].reserved)==null?void 0:u[s])??0),a=e.stock[n].capacity-Object.values(e.stock[n].items).reduce((d,f)=>d+f,0)-(e.stock[n].reservedCapacity??0),c=Math.min(o,Math.max(0,a),r);if(c<1||!jl(e,t,n,s,c))return 0;const l=`transfer:${e.tick}:${e.revision}:${t}:${n}:${s}`;return $s(e,{transactionId:l,from:t,to:n,item:s,quantity:c}).ok?c:0},Ic=function(e,t){const n=e.diningTables[t];if(!n)return{ok:!1,reason:"locked"};if(n.tipAtoms>0){new Vs(e.economy).credit(`tip:${t}:${e.tick}`,n.tipAtoms/1e4,"restaurant-tip");const c=e.customers.find(l=>l.id===n.customerId);return c&&(c.phase="leaving",c.route=[{x:-37,z:7},{x:-37,z:10.4},{x:-37,z:16}],c.routeIndex=0,c.tableId=null),n.customerId=null,n.meal=null,n.tipAtoms=0,e.stats.tipsCollected+=1,B(this,Ie,is).call(this,e),{ok:!0,message:"💵 Bahşiş alındı."}}if(!n.customerId)return{ok:!1,reason:"table-empty"};const s=e.customers.find(a=>a.id===n.customerId);if(!s||s.phase!=="waiting-meal")return{ok:!1,reason:"customer-not-waiting"};const r=s.demand;return nt(e.stock,"player",r)<1?{ok:!1,reason:"meal-needed",item:r}:$s(e,{transactionId:`serve:${s.id}:${e.tick}`,from:"player",to:`customer:${s.id}`,item:r,quantity:1}).ok?(s.phase="eating",s.eatTicks=0,s.meal=r,n.meal=r,n.eatTicks=0,n.customerId=s.id,e.stats.tablesServed+=1,{ok:!0,message:`${Qe[r].icon} Yemek servis edildi.`}):{ok:!1,reason:"meal-transfer-failed"}};const Zn={current:"gblb.orbit.save.current",backup:"gblb.orbit.save.backup",journal:"gblb.orbit.save.journal"};function js(i){let e=2166136261;for(let t=0;t<i.length;t+=1)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0).toString(16).padStart(8,"0")}function vu(i,e,t="checkpoint"){const n=JSON.stringify({payload:i,sequence:e,transactionId:t,saveVersion:Ea});return JSON.stringify({body:n,checksum:js(n)})}function Ya(i){if(!i)return null;const e=JSON.parse(i);if(!e||typeof e.body!="string"||js(e.body)!==e.checksum)return null;const t=JSON.parse(e.body);return!Number.isSafeInteger(t.sequence)||t.sequence<0?null:t}class gs extends Error{constructor(e){super(e),this.name="SaveRecoveryError"}}var rr,Uc;class xu{constructor(e=globalThis.localStorage){Rn(this,rr);this.storage=e,this.sequence=0,this.lastTransactionId=null,this.lastPayloadChecksum=null}load(){const e=Object.values(Zn).map(r=>this.storage.getItem(r));if(e.every(r=>r===null))return{state:null,recovered:!1};const t=e.map(r=>{try{return Ya(r)}catch{return null}}).filter(Boolean).sort((r,o)=>o.sequence-r.sequence);if(!t.length)throw new gs("Kayıt, yedek ve işlem günlüğü doğrulanamadı.");const n=B(this,rr,Uc).call(this);let s=null;for(const r of t)try{const o=Zl(r.payload);return this.sequence=r.sequence,this.lastTransactionId=r.transactionId,this.lastPayloadChecksum=js(JSON.stringify(r.payload)),{state:o,recovered:!n||r.sequence!==n.sequence,sequence:this.sequence}}catch(o){s=o}throw new gs(`Kayıt doğrulaması başarısız: ${(s==null?void 0:s.message)??"geçerli yedek bulunamadı"}`)}commit(e,t){if(!t)throw new TypeError("Kalıcı işlem için transactionId gerekir.");const n=js(JSON.stringify(e));if(t===this.lastTransactionId){if(n===this.lastPayloadChecksum)return{duplicate:!0,sequence:this.sequence};throw new gs(`Transaction ID farklı içerikle tekrar kullanıldı: ${t}`)}const s=this.sequence+1,r=vu(e,s,t),o=this.storage.getItem(Zn.current);if(o)try{this.storage.setItem(Zn.backup,o)}catch{}try{this.storage.setItem(Zn.current,r)}catch(a){throw new gs(`Kayıt yazılamadı: ${a.message}`)}this.sequence=s,this.lastTransactionId=t,this.lastPayloadChecksum=n;try{this.storage.setItem(Zn.journal,r)}catch{}return{duplicate:!1,sequence:s}}checkpoint(e){return this.commit(e,`checkpoint:${e.tick}`)}clear(){for(const e of Object.values(Zn))this.storage.removeItem(e);this.sequence=0,this.lastTransactionId=null,this.lastPayloadChecksum=null}}rr=new WeakSet,Uc=function(){try{return Ya(this.storage.getItem(Zn.current))}catch{return null}};const yu={tomatoFarm2:"🍅",cashier:"🧑‍💼",paste:"🥫",harvester:"🧑‍🌾",orange:"🍊",factoryFeeder:"🧑‍🔧",orangeFarm2:"🍊",corn:"🌽",popcorn:"🍿",feed:"🌾",coop:"🐔",chicken2:"🐔",chicken3:"🐔",caretaker:"🧑‍🌾",bakery:"🍞",restaurant:"🍽️",chefWaiter:"🧑‍🍳"},tt={business:"BUSINESS",customers:"Customers",workers:"Staff",shelfStock:"Shelf stock",viewProducts:"View products",upgrades:"Business upgrades",settings:"Settings",nextGoal:"NEXT GOAL",inventory:"Inventory",language:"Interface language",resume:"▶ Resume game",noUpgrade:"No upgrades available right now. Make a sale to unlock the next step.",live:"LIVE",grow:"GROW YOUR BUSINESS",newUpgrades:"New upgrades",stock:"STOCK STATUS",general:"General",character:"Character",developer:"Developer",sound:"Sound effects",haptics:"Haptic feedback",backgroundNote:"The simulation pauses while the app is in the background. Tap resume when you return.",resetGame:"Start a new game",orTap:"or tap to move",businessTab:"Business",staffTab:"Staff",staffEffect:{cashier:"Handles customer payments at the register.",harvester:"Moves farm produce to matching shelves.",factoryFeeder:"Carries ingredients between production stations.",caretaker:"Supplies the coop and stocks eggs on the shelf.",chefWaiter:"Automates restaurant cooking and table service."},staffUnlock:{cashier:"Unlocks after your first tomato sale.",harvester:"Unlocks after your first paste sale.",factoryFeeder:"Unlocks after your first orange juice sale.",caretaker:"Unlocks after your first egg sale.",chefWaiter:"Unlocks after collecting a restaurant tip."}};var Ke,Dc,kc,Nc,Oc,aa,oa,Fc,zc,ca,Bc,Gc,la,Hc,Ws;class Mu{constructor(e,t,n=()=>{}){Rn(this,Ke);this.app=e,this.input=t,this.onModalChange=n,this.modals=["expansion-modal","settings-modal","inventory-modal","recovery-modal"],this.lastUpgradeSignature="",this.lastInventorySignature="",this.lastLanguage=null,B(this,Ke,Dc).call(this)}open(e){this.modals.forEach(t=>document.getElementById(t).classList.toggle("hidden",t!==e)),this.onModalChange(!0),e==="expansion-modal"&&this.render(this.app.getState(),this.app.getNearbyAction(),!0),e==="inventory-modal"&&this.renderInventory(this.app.getState(),!0),e==="settings-modal"&&B(this,Ke,ca).call(this,this.app.getState())}close(e){var t;(t=document.getElementById(e))==null||t.classList.add("hidden"),B(this,Ke,oa).call(this)}closeAll(){this.modals.forEach(e=>document.getElementById(e).classList.add("hidden")),B(this,Ke,oa).call(this)}render(e,t,n=!1){const s=e.settings.language;B(this,Ke,Bc).call(this,s);const r=e.economy.balanceAtoms/1e4;document.getElementById("money-display").textContent=`$${r.toLocaleString(s==="tr"?"tr-TR":"en-US",{maximumFractionDigits:2})}`;const o=Object.values(e.stock.player.items).reduce((d,f)=>d+f,0);document.getElementById("stack-display").textContent=`${o} / ${e.player.capacity}`,document.getElementById("customer-count").textContent=String(e.customers.length),document.getElementById("worker-count").textContent=String(e.workers.length);let a=0;for(const[d,f]of Object.entries(e.stock))d.startsWith("shelf:")&&(a+=Object.values(f.items).reduce((h,g)=>h+g,0));document.getElementById("shelf-count").textContent=String(a),document.getElementById("quest-text").textContent=B(this,Ke,Gc).call(this,e,s),document.getElementById("progress-count").textContent=`${e.completedUpgrades.length} / ${Ni.length}`,document.getElementById("progress-fill").style.width=`${Math.min(100,e.completedUpgrades.length/Ni.length*100)}%`;const c=document.getElementById("btn-interact"),l=document.getElementById("action-label");c.disabled=!t||t.actionable===!1,l.textContent=t?B(this,Ke,Hc).call(this,t,e):s==="en"?"Move closer to a station":"Bir istasyona yaklaş",document.getElementById("upgrade-count").textContent=String(this.app.getAvailableUpgrades().length),B(this,Ke,ca).call(this,e);const u=`${e.revision}:${r}:${this.app.getAvailableUpgrades().map(d=>d.id).join(",")}:${e.completedUpgrades.join(",")}:${e.workers.map(d=>d.type).join(",")}`;(n||u!==this.lastUpgradeSignature)&&(this.lastUpgradeSignature=u,this.renderUpgrades(e),this.renderStaff(e)),n&&this.renderInventory(e,!0)}renderUpgrades(e){const t=new Set(Wa.map(r=>r.upgradeId)),n=this.app.getAvailableUpgrades().filter(r=>!t.has(r.id)),s=document.getElementById("upgrade-list");if(!n.length){s.innerHTML=`<div class="empty-upgrades">${e.settings.language==="en"?tt.noUpgrade:"Şimdilik yeni geliştirme yok. Yeni aşamalar satış yaptıkça açılır."}</div>`;return}s.innerHTML=n.map(r=>{const o=e.economy.balanceAtoms>=r.price*1e4,a=e.settings.language==="en"?B(this,Ke,la).call(this,r.id,r.title):r.title;return`<article class="upgrade-card"><div class="upgrade-icon">${yu[r.id]??"✨"}</div><div class="upgrade-copy"><strong>${a}</strong><small>${e.settings.language==="en"?"Unlock a new production step":"Yeni bir üretim aşaması aç"}</small></div><button class="buy-button" data-buy-upgrade="${r.id}" ${o?"":"disabled"}>$${r.price}</button></article>`}).join("")}renderStaff(e){const t=document.getElementById("staff-list");t&&(t.innerHTML=Wa.map(n=>{var _,m;const s=Ni.find(p=>p.id===n.upgradeId),r=e.workers.filter(p=>n.staffTypes.includes(p.type)).length,o=r>0||e.completedUpgrades.includes(n.upgradeId),a=e.availableUpgrades.includes(n.upgradeId)&&!e.completedUpgrades.includes(n.upgradeId),c=e.economy.balanceAtoms>=s.price*1e4,l=((_=_r[n.upgradeId])==null?void 0:_.title)??n.staffTypes.map(p=>{var x;return((x=_r[p])==null?void 0:x.title)??p}).join(" ve "),u=n.staffTypes.length>1?"Chef and waiter":{cashier:"Cashier",harvester:"Harvester",factoryFeeder:"Factory feeder",caretaker:"Farm caretaker"}[n.staffTypes[0]],d=e.settings.language==="en"?tt.staffEffect[n.upgradeId]:n.effect,f=e.settings.language==="en"?tt.staffUnlock[n.upgradeId]:n.unlock,h=o?e.settings.language==="en"?`On staff · ${r||n.staffTypes.length}`:`Ekibinde · ${r||n.staffTypes.length} kişi`:a?d:f,g=o?`<button class="buy-button staff-status" disabled>${e.settings.language==="en"?"Hired":"İşe alındı"}</button>`:`<button class="buy-button" data-buy-upgrade="${n.upgradeId}" ${a&&c?"":"disabled"}>${a?c?e.settings.language==="en"?"Hire":"İşe al":e.settings.language==="en"?"Need funds":"Bakiye yok":e.settings.language==="en"?"Locked":"Kilitli"} · $${s.price}</button>`;return`<article class="upgrade-card staff-card${o?" hired":""}"><div class="upgrade-icon">${((m=_r[n.staffTypes[0]])==null?void 0:m.icon)??"🧑‍🔧"}</div><div class="upgrade-copy"><strong>${e.settings.language==="en"?u:l}</strong><small>${h}</small></div>${g}</article>`}).join(""))}renderInventory(e,t=!1){const n=new Map;for(const[o,a]of Object.entries(e.stock.player.items))a>0&&n.set(o,{carried:a,shelf:0,machine:0});for(const[o,a]of Object.entries(e.stock))if(!(!o.startsWith("shelf:")&&!o.startsWith("machine:")))for(const[c,l]of Object.entries(a.items)){const u=n.get(c)??{carried:0,shelf:0,machine:0};o.startsWith("shelf:")?u.shelf+=l:u.machine+=l,n.set(c,u)}const s=JSON.stringify([...n.entries()]);if(!t&&s===this.lastInventorySignature)return;this.lastInventorySignature=s;const r=document.getElementById("inventory-list");if(!n.size){r.innerHTML=`<div class="empty-upgrades">${e.settings.language==="en"?"No goods in stock yet.":"Henüz stokta ürün yok."}</div>`;return}r.innerHTML=[...n.entries()].map(([o,a])=>{const c=Qe[o],l=a.carried+a.shelf+a.machine,u=e.settings.language==="en"?`bag ${a.carried} · shelves ${a.shelf} · machines ${a.machine}`:`çanta ${a.carried} · raf ${a.shelf} · makine ${a.machine}`;return`<div class="inventory-row"><span>${c.icon} ${e.settings.language==="en"?B(this,Ke,Ws).call(this,o,c.name):c.name}<small>${u}</small></span><strong>${l}</strong></div>`}).join("")}toast(e,t="success"){const n=document.getElementById("toast-container"),s=document.createElement("div");s.className=`toast-msg${t==="error"?" error":""}`,s.textContent=e,n.appendChild(s),window.setTimeout(()=>s.remove(),2600)}showEvent(e){var n,s;let t=e.message;if(this.app.getState().settings.language==="en"){if(e.type==="sale"){const r=(e.items??[e.item]).map(o=>{var a,c;return`${((a=Qe[o])==null?void 0:a.icon)??"📦"} ${B(this,Ke,Ws).call(this,o,((c=Qe[o])==null?void 0:c.name)??o)}`});t=`+$${e.amount} · ${r.join(", ")} sold.`}e.type==="production"&&(t=`${((n=Qe[e.item])==null?void 0:n.icon)??"📦"} ${B(this,Ke,Ws).call(this,e.item,((s=Qe[e.item])==null?void 0:s.name)??e.item)} ready.`),e.type==="tip-ready"&&(t="💵 A customer left a tip."),t==="Yedek kayıttan devam edildi."&&(t="Recovered from the backup save."),t==="Yeni oyun hazır."&&(t="A new game is ready."),t==="Müşteriler kasada ödeme yapıyor."&&(t="Customers are paying at the register."),t.includes("ürün alındı.")&&(t="Products collected."),t.includes("Reyon dolduruldu.")&&(t="Shelf restocked."),t.includes("Ürün makineye aktarıldı")&&(t="Ingredients moved to the machine."),t.includes("Bahşiş alındı.")&&(t="Tip collected."),t.includes("Yemek servis edildi.")&&(t="Meal served."),t.includes("eklendi.")&&(t="Credits added.")}this.toast(t,e.tone)}showRecovery(e){document.getElementById("recovery-message").textContent=e,this.open("recovery-modal")}}Ke=new WeakSet,Dc=function(){document.getElementById("btn-expansions").addEventListener("click",()=>this.open("expansion-modal")),document.getElementById("btn-settings").addEventListener("click",()=>this.open("settings-modal")),document.getElementById("btn-inventory").addEventListener("click",()=>this.open("inventory-modal")),document.getElementById("btn-interact").addEventListener("click",()=>B(this,Ke,kc).call(this)),document.getElementById("btn-resume").addEventListener("click",()=>this.closeAll()),document.getElementById("btn-reset").addEventListener("click",()=>B(this,Ke,aa).call(this)),document.getElementById("btn-recovery-reset").addEventListener("click",()=>B(this,Ke,aa).call(this,!0)),document.querySelectorAll("[data-close]").forEach(e=>{e.addEventListener("click",()=>this.close(e.dataset.close))}),this.modals.forEach(e=>{const t=document.getElementById(e);t.addEventListener("pointerdown",n=>{n.target===t&&e!=="recovery-modal"&&this.close(e)})}),document.querySelectorAll(".settings-tab").forEach(e=>e.addEventListener("click",()=>B(this,Ke,Fc).call(this,e.dataset.tab))),document.querySelectorAll("[data-language]").forEach(e=>e.addEventListener("click",()=>{this.app.setLanguage(e.dataset.language),this.render(this.app.getState(),this.app.getNearbyAction())})),document.querySelectorAll("[data-character]").forEach(e=>e.addEventListener("click",()=>{this.app.setCharacter(e.dataset.character),document.querySelectorAll("[data-character]").forEach(t=>t.classList.toggle("active",t.dataset.character===e.dataset.character))})),document.getElementById("setting-sound").addEventListener("change",e=>this.app.setSetting("sound",e.target.checked)),document.getElementById("setting-haptics").addEventListener("change",e=>this.app.setSetting("haptics",e.target.checked)),document.querySelectorAll("[data-debug]").forEach(e=>e.addEventListener("click",()=>B(this,Ke,Nc).call(this,e.dataset.debug))),document.getElementById("expansion-modal").addEventListener("click",e=>{const t=e.target.closest("[data-buy-upgrade]");if(!t)return;const n=this.app.buyUpgrade(t.dataset.buyUpgrade);n.ok?this.render(this.app.getState(),this.app.getNearbyAction(),!0):this.toast(n.reason==="locked"?"Bu geliştirme henüz açılmadı.":"Bakiye yetersiz.","error")}),document.querySelectorAll("[data-upgrade-tab]").forEach(e=>e.addEventListener("click",()=>B(this,Ke,zc).call(this,e.dataset.upgradeTab))),window.addEventListener("keydown",e=>{e.code==="Escape"&&(e.preventDefault(),this.modals.some(n=>!document.getElementById(n).classList.contains("hidden"))?this.closeAll():this.open("settings-modal"))})},kc=function(){var s;const e=this.app.getNearbyAction();if(!e)return;const t=this.app.interact(e.id);if(t.ok){B(this,Ke,Oc).call(this);return}const n={empty:"Burada alınacak ürün yok.","no-compatible-stock":"Çantanda bu istasyon için uygun ürün yok.",locked:"Bu istasyon henüz açılmadı.","meal-needed":`Servis için ${((s=Qe[t.item])==null?void 0:s.name)??"ürün"} gerekli.`,"table-empty":"Bu masa şu anda boş.","customer-not-waiting":"Müşteri sipariş beklemiyor.","too-far":"Biraz daha yaklaş."};this.toast(n[t.reason]??"Bu işlem şu anda yapılamıyor.","error")},Nc=function(e){e==="credit"&&this.app.debugCredit(1e3),e==="creditLarge"&&this.app.debugCredit(99999),e==="capacity"&&this.app.debugCapacity(this.app.getState().player.capacity+50),e==="speed2"&&this.app.setSpeedMultiplier(2),e==="speed5"&&this.app.setSpeedMultiplier(5),e==="speed1"&&this.app.setSpeedMultiplier(1),this.render(this.app.getState(),this.app.getNearbyAction(),!0)},Oc=function(){const e=this.app.getState().settings;if(e.haptics&&navigator.vibrate&&navigator.vibrate(12),!e.sound)return;const t=window.AudioContext||window.webkitAudioContext;if(t)try{this.audioContext??(this.audioContext=new t),this.audioContext.state==="suspended"&&this.audioContext.resume();const n=this.audioContext.createOscillator(),s=this.audioContext.createGain();n.type="sine",n.frequency.value=680,s.gain.setValueAtTime(.025,this.audioContext.currentTime),s.gain.exponentialRampToValueAtTime(.001,this.audioContext.currentTime+.055),n.connect(s),s.connect(this.audioContext.destination),n.start(),n.stop(this.audioContext.currentTime+.055)}catch{}},aa=function(e=!1){const t=this.app.getState().settings.language==="en"?"The current save will be erased. Start a new game?":"Mevcut oyun kaydı silinecek. Yeni oyun başlatılsın mı?";if(window.confirm(t))try{this.app.reset(),this.closeAll(),e&&document.getElementById("recovery-modal").classList.add("hidden")}catch(n){this.toast(n.message,"error")}},oa=function(){const e=this.modals.some(t=>!document.getElementById(t).classList.contains("hidden"));this.onModalChange(e)},Fc=function(e){document.querySelectorAll(".settings-tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===e)),document.querySelectorAll(".settings-content").forEach(t=>t.classList.toggle("hidden",t.dataset.panel!==e))},zc=function(e){document.querySelectorAll("[data-upgrade-tab]").forEach(t=>{const n=t.dataset.upgradeTab===e;t.classList.toggle("active",n),t.setAttribute("aria-selected",String(n))}),document.querySelectorAll("[data-upgrade-panel]").forEach(t=>t.classList.toggle("hidden",t.dataset.upgradePanel!==e))},ca=function(e){document.getElementById("setting-sound").checked=e.settings.sound,document.getElementById("setting-haptics").checked=e.settings.haptics,document.querySelectorAll("[data-character]").forEach(t=>t.classList.toggle("active",t.dataset.character===e.player.character)),document.querySelectorAll("[data-language]").forEach(t=>t.classList.toggle("active",t.dataset.language===e.settings.language))},Bc=function(e){if(e===this.lastLanguage)return;this.lastLanguage=e;const t=e==="en";document.querySelector(".business-heading strong").textContent=t?tt.business:"İŞLETME",document.querySelector(".business-heading small").textContent=t?tt.live:"CANLI",document.querySelectorAll(".business-row")[0].children[0].textContent=`🧑‍🤝‍🧑 ${t?tt.customers:"Müşteriler"}`,document.querySelectorAll(".business-row")[1].children[0].textContent=`🧑‍🔧 ${t?tt.workers:"Çalışanlar"}`,document.querySelectorAll(".business-row")[2].children[0].textContent=`📦 ${t?tt.shelfStock:"Reyon stoğu"}`,document.getElementById("btn-inventory").innerHTML=`${t?tt.viewProducts:"Ürünleri gör"} <span>›</span>`,document.querySelector("#btn-settings").setAttribute("aria-label",t?tt.settings:"Ayarlar"),document.getElementById("btn-expansions").setAttribute("aria-label",t?tt.upgrades:"İşletme geliştirmeleri"),document.querySelector(".quest-copy .eyebrow").textContent=t?tt.nextGoal:"SIRADAKİ HEDEF",document.querySelector("#inventory-title").textContent=t?tt.inventory:"Ürünler",document.querySelector("#settings-title").textContent=t?tt.settings:"Ayarlar",document.querySelector('.settings-content[data-panel="language"] .modal-intro').textContent=t?tt.language:"Arayüz dili",document.querySelector('.settings-tabs [data-tab="general"]').textContent=t?tt.general:"Genel",document.querySelector('.settings-tabs [data-tab="character"]').textContent=t?tt.character:"Karakter",document.querySelector('.settings-tabs [data-tab="language"]').textContent=t?"Language":"Dil",document.querySelector('.settings-tabs [data-tab="debug"]').textContent=t?tt.developer:"Geliştirici",document.querySelectorAll('.settings-content[data-panel="general"] .setting-row span').forEach((n,s)=>{n.textContent=t?s===0?tt.sound:tt.haptics:s===0?"Ses efektleri":"Dokunsal geri bildirim"}),document.querySelector('.settings-content[data-panel="general"] .setting-note').textContent=t?tt.backgroundNote:"Oyun arka plana geçtiğinde simülasyon durur. Döndüğünde kaldığın yerden devam eder.",document.getElementById("btn-reset").textContent=t?tt.resetGame:"Yeni oyuna başla",document.querySelector('.settings-content[data-panel="character"] .modal-intro').textContent=t?"Choose your character":"Oyuncu karakterini seç",document.querySelectorAll("[data-character] span").forEach((n,s)=>{n.textContent=t?["Shopkeeper","Cat","Robot","Panda","Penguin"][s]:["Marketçi","Kedi","Robot","Panda","Penguen"][s]}),document.getElementById("btn-recovery-reset").textContent=t?"Erase saves and start a new game":"Yedekleri sil ve yeni oyun başlat",document.querySelector("#expansion-modal .modal-header .eyebrow").textContent=t?tt.grow:"İŞLETMEYİ BÜYÜT",document.querySelector("#settings-modal .modal-header .eyebrow").textContent=t?"GAME MENU":"OYUN MENÜSÜ",document.querySelector("#inventory-modal .modal-header .eyebrow").textContent=t?tt.stock:"STOK DURUMU",document.querySelector("#expansion-modal .modal-intro").textContent=t?"Invest earnings in production and staff. Every purchase adds a station to the world.":"Kazancını yeni üretim hatlarına ve ekibe yatır. Açılan her istasyon dünyaya eklenir.",document.querySelector('[data-upgrade-tab="business"]').textContent=t?tt.businessTab:"İşletme",document.querySelector('[data-upgrade-tab="staff"]').textContent=t?tt.staffTab:"Personel",document.querySelector(".control-hint span").textContent=t?tt.orTap:"veya dokunup yürü",document.getElementById("btn-resume").textContent=t?tt.resume:"▶ Oyuna dön",document.getElementById("expansion-title").textContent=t?tt.newUpgrades:"Yeni geliştirmeler"},Gc=function(e,t){return t!=="en"?e.quest:e.unlocked.paste?e.stats.pasteSold===0?"Load two tomatoes into the paste vat, stock the shelf, and make a sale.":e.unlocked.orange?e.stats.juiceSold===0?"Harvest oranges, make juice, and stock its shelf.":e.unlocked.corn?e.stats.cornSold===0?"Harvest corn, stock its shelf, and sell it.":e.unlocked.popcorn?e.stats.popcornSold===0?"Load corn, make popcorn, and sell it.":e.unlocked.feed?e.stats.feedProduced===0?"Load corn into the mill and make chicken feed.":e.unlocked.coop?e.stats.eggSold===0?"Feed the coop, collect eggs, and sell one.":e.unlocked.bakery?e.stats.breadSold===0?"Bake bread from two wheat and one egg, then sell it.":e.unlocked.restaurant?e.unlocked.chefWaiter?"Well done! Your market and gourmet restaurant are open.":"Cook a burger or pizza, serve a guest, and collect a tip.":"Open the gourmet restaurant.":"Open the wheat field and stone oven.":"Open the chicken coop.":"Open the chicken feed mill.":"Open the popcorn machine.":"Open the corn field and shelf.":"Open the orange grove and juicer.":"Make your first tomato sale to unlock the paste kitchen."},la=function(e,t){return{tomatoFarm2:"Second tomato field",cashier:"Hire a cashier",paste:"Tomato paste kitchen",harvester:"Hire a harvester",orange:"Orange grove and juicer",factoryFeeder:"Hire a factory feeder",orangeFarm2:"Second orange grove",corn:"Corn field and shelf",popcorn:"Popcorn machine and shelf",feed:"Chicken feed grinder",coop:"Chicken coop and egg shelf",chicken2:"Second chicken",chicken3:"Third chicken",caretaker:"Hire a farm caretaker",bakery:"Wheat field and stone oven",restaurant:"Gourmet restaurant",chefWaiter:"Hire chef and waiter"}[e]??t},Hc=function(e,t){var n,s,r,o,a,c;if(t.settings.language!=="en")return e.label;if(e.kind==="upgrade")return`${B(this,Ke,la).call(this,e.id,e.title)} · $${e.price}`;if(e.kind==="farm")return{TOMATO:"Harvest tomatoes",ORANGE:"Harvest oranges",CORN:"Harvest corn",WHEAT:"Harvest wheat"}[e.item]??"Harvest";if(e.kind==="machine"){const u={paste:"TOMATO_PASTE",juice:"ORANGE_JUICE",popcorn:"POPCORN",feed:"CHICKEN_FEED",bakery:"BREAD",burgerKitchen:"BURGER",pizzaKitchen:"PIZZA"}[e.id];return(s=(n=t.stock[`machine:${e.id}:output`])==null?void 0:n.items)!=null&&s[u]?"Collect product":"Load ingredients"}if(e.kind==="shelf")return t.stock.player.items[e.item]?"Restock shelf":(o=(r=t.stock[_t[e.item].id])==null?void 0:r.items)!=null&&o[e.item]?"Collect product":"Shelf empty";if(e.kind==="coop")return(c=(a=t.stock["coop:eggs"])==null?void 0:a.items)!=null&&c.EGG?"Collect eggs":"Add chicken feed";if(e.kind==="table"){const l=t.diningTables[e.id];return l!=null&&l.tipAtoms?"Collect tip":l!=null&&l.customerId?"Serve meal":`Table ${e.id.slice(-1)}`}return e.kind==="register"?"Register":e.label},Ws=function(e,t){return{TOMATO:"Tomato",TOMATO_PASTE:"Tomato paste",ORANGE:"Orange",ORANGE_JUICE:"Orange juice",CORN:"Corn",POPCORN:"Popcorn",CHICKEN_FEED:"Chicken feed",EGG:"Egg",WHEAT:"Wheat",BREAD:"Bread",BURGER:"Gourmet burger",PIZZA:"Pizza"}[e]??t};const ja={KeyW:{x:0,z:-1},ArrowUp:{x:0,z:-1},KeyS:{x:0,z:1},ArrowDown:{x:0,z:1},KeyA:{x:-1,z:0},ArrowLeft:{x:-1,z:0},KeyD:{x:1,z:0},ArrowRight:{x:1,z:0}};var Ht,Vc,Wc,ua,ha,Xc;class Su{constructor(e,t,n,s){Rn(this,Ht);this.canvas=e,this.world=t,this.app=n,this.onInteract=s,this.enabled=!0,this.keys=new Set,this.joystick={active:!1,pointerId:null,x:0,z:0},this.joystickBase=document.getElementById("joystick-base"),this.joystickZone=document.getElementById("joystick-zone"),this.joystickThumb=document.getElementById("joystick-thumb"),this.pointerStart=null,B(this,Ht,Vc).call(this),B(this,Ht,Wc).call(this),B(this,Ht,Xc).call(this)}getMovementVector(){if(!this.enabled)return{x:0,z:0};let e=this.joystick.x,t=this.joystick.z;for(const s of this.keys){const r=ja[s];r&&(e+=r.x,t+=r.z)}const n=Math.hypot(e,t);return n>1&&(e/=n,t/=n),{x:e,z:t}}reset(){this.keys.clear(),this.pointerStart=null,B(this,Ht,ha).call(this)}setEnabled(e){this.enabled=e,e||this.reset()}}Ht=new WeakSet,Vc=function(){window.addEventListener("keydown",e=>{ja[e.code]&&(e.preventDefault(),this.keys.add(e.code)),this.enabled&&(e.code==="KeyE"||e.code==="Space")&&!e.repeat&&(e.preventDefault(),this.onInteract())}),window.addEventListener("keyup",e=>this.keys.delete(e.code)),window.addEventListener("blur",()=>this.reset()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.reset()})},Wc=function(){this.joystickZone.addEventListener("pointerdown",t=>{this.joystick.active||(t.preventDefault(),this.joystick.active=!0,this.joystick.pointerId=t.pointerId,this.joystickZone.setPointerCapture(t.pointerId),B(this,Ht,ua).call(this,t))}),this.joystickZone.addEventListener("pointermove",t=>{this.joystick.active&&t.pointerId===this.joystick.pointerId&&(t.preventDefault(),B(this,Ht,ua).call(this,t))});const e=t=>{this.joystick.active&&(t.pointerId===void 0||t.pointerId===this.joystick.pointerId)&&B(this,Ht,ha).call(this)};this.joystickZone.addEventListener("pointerup",e),this.joystickZone.addEventListener("pointercancel",e),this.joystickZone.addEventListener("lostpointercapture",e)},ua=function(e){const t=this.joystickBase.getBoundingClientRect(),n=t.left+t.width/2,s=t.top+t.height/2,r=t.width*.36;let o=e.clientX-n,a=e.clientY-s;const c=Math.hypot(o,a);c>r&&(o*=r/c,a*=r/c),this.joystick.x=o/r,this.joystick.z=a/r,this.joystickThumb.style.transform=`translate(${o}px, ${a}px)`},ha=function(){this.joystick.active=!1,this.joystick.pointerId=null,this.joystick.x=0,this.joystick.z=0,this.joystickThumb.style.transform="translate(0, 0)"},Xc=function(){this.canvas.addEventListener("pointerdown",e=>{!this.enabled||e.target.closest("[data-ui]")||e.pointerType==="mouse"&&e.button!==0||(this.pointerStart={x:e.clientX,y:e.clientY,pointerId:e.pointerId})}),this.canvas.addEventListener("pointerup",e=>{if(!this.enabled||!this.pointerStart||this.pointerStart.pointerId!==e.pointerId)return;const t=Math.hypot(e.clientX-this.pointerStart.x,e.clientY-this.pointerStart.y);if(this.pointerStart=null,t>18||e.target.closest("[data-ui]"))return;const n=this.world.screenToWorld(e.clientX,e.clientY);n&&n.x>-55&&n.x<18&&n.z>-16&&n.z<30&&this.app.setPlayerTarget(n.x,n.z)}),this.canvas.addEventListener("pointercancel",()=>{this.pointerStart=null})};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wa="160",Eu=0,Ka=1,wu=2,qc=1,$c=2,Sn=3,$n=0,Bt=1,wn=2,Wn=0,Oi=1,Za=2,Ja=3,Qa=4,bu=5,si=100,Tu=101,Au=102,eo=103,to=104,Ru=200,Cu=201,Lu=202,Pu=203,da=204,fa=205,Iu=206,Uu=207,Du=208,ku=209,Nu=210,Ou=211,Fu=212,zu=213,Bu=214,Gu=0,Hu=1,Vu=2,Ks=3,Wu=4,Xu=5,qu=6,$u=7,Yc=0,Yu=1,ju=2,Xn=0,Ku=1,Zu=2,Ju=3,Qu=4,eh=5,th=6,jc=300,zi=301,Bi=302,pa=303,ma=304,or=306,ga=1e3,an=1001,_a=1002,Ot=1003,no=1004,Sr=1005,jt=1006,nh=1007,cs=1008,qn=1009,ih=1010,sh=1011,ba=1012,Kc=1013,Hn=1014,Vn=1015,ls=1016,Zc=1017,Jc=1018,ai=1020,rh=1021,on=1023,ah=1024,oh=1025,oi=1026,Gi=1027,ch=1028,Qc=1029,lh=1030,el=1031,tl=1033,Er=33776,wr=33777,br=33778,Tr=33779,io=35840,so=35841,ro=35842,ao=35843,nl=36196,oo=37492,co=37496,lo=37808,uo=37809,ho=37810,fo=37811,po=37812,mo=37813,go=37814,_o=37815,vo=37816,xo=37817,yo=37818,Mo=37819,So=37820,Eo=37821,Ar=36492,wo=36494,bo=36495,uh=36283,To=36284,Ao=36285,Ro=36286,il=3e3,ci=3001,hh=3200,dh=3201,sl=0,fh=1,Jt="",Ct="srgb",An="srgb-linear",Ta="display-p3",cr="display-p3-linear",Zs="linear",ht="srgb",Js="rec709",Qs="p3",fi=7680,Co=519,ph=512,mh=513,gh=514,rl=515,_h=516,vh=517,xh=518,yh=519,va=35044,Lo="300 es",xa=1035,bn=2e3,er=2001;class Vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Po=1234567;const ss=Math.PI/180,us=180/Math.PI;function Tn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function Aa(i,e){return(i%e+e)%e}function Mh(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Sh(i,e,t){return i!==e?(t-i)/(e-i):0}function rs(i,e,t){return(1-t)*i+t*e}function Eh(i,e,t,n){return rs(i,e,1-Math.exp(-t*n))}function wh(i,e=1){return e-Math.abs(Aa(i,e*2)-e)}function bh(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Th(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ah(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Rh(i,e){return i+Math.random()*(e-i)}function Ch(i){return i*(.5-Math.random())}function Lh(i){i!==void 0&&(Po=i);let e=Po+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ph(i){return i*ss}function Ih(i){return i*us}function ya(i){return(i&i-1)===0&&i!==0}function Uh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tr(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dh(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),f=o((e-n)/2),h=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*u,c*d,c*f,a*l);break;case"YZY":i.set(c*f,a*u,c*d,a*l);break;case"ZXZ":i.set(c*d,c*f,a*u,a*l);break;case"XZX":i.set(a*u,c*g,c*h,a*l);break;case"YXY":i.set(c*h,a*u,c*g,a*l);break;case"ZYZ":i.set(c*g,c*h,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Gn={DEG2RAD:ss,RAD2DEG:us,generateUUID:Tn,clamp:Ft,euclideanModulo:Aa,mapLinear:Mh,inverseLerp:Sh,lerp:rs,damp:Eh,pingpong:wh,smoothstep:bh,smootherstep:Th,randInt:Ah,randFloat:Rh,randFloatSpread:Ch,seededRandom:Lh,degToRad:Ph,radToDeg:Ih,isPowerOfTwo:ya,ceilPowerOfTwo:Uh,floorPowerOfTwo:tr,setQuaternionFromProperEuler:Dh,normalize:st,denormalize:dn};class ke{constructor(e=0,t=0){ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $e{constructor(e,t,n,s,r,o,a,c,l){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],_=s[0],m=s[3],p=s[6],x=s[1],v=s[4],S=s[7],R=s[2],T=s[5],A=s[8];return r[0]=o*_+a*x+c*R,r[3]=o*m+a*v+c*T,r[6]=o*p+a*S+c*A,r[1]=l*_+u*x+d*R,r[4]=l*m+u*v+d*T,r[7]=l*p+u*S+d*A,r[2]=f*_+h*x+g*R,r[5]=f*m+h*v+g*T,r[8]=f*p+h*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*r,h=l*r-o*c,g=t*d+n*f+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*l-u*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(u*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=h*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Rr.makeScale(e,t)),this}rotate(e){return this.premultiply(Rr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Rr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rr=new $e;function al(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function kh(){const i=nr("canvas");return i.style.display="block",i}const Io={};function as(i){i in Io||(Io[i]=!0,console.warn(i))}const Uo=new $e().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Do=new $e().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_s={[An]:{transfer:Zs,primaries:Js,toReference:i=>i,fromReference:i=>i},[Ct]:{transfer:ht,primaries:Js,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[cr]:{transfer:Zs,primaries:Qs,toReference:i=>i.applyMatrix3(Do),fromReference:i=>i.applyMatrix3(Uo)},[Ta]:{transfer:ht,primaries:Qs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Do),fromReference:i=>i.applyMatrix3(Uo).convertLinearToSRGB()}},Nh=new Set([An,cr]),rt={enabled:!0,_workingColorSpace:An,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Nh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=_s[e].toReference,s=_s[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return _s[i].primaries},getTransfer:function(i){return i===Jt?Zs:_s[i].transfer}};function Fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let pi;class ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{pi===void 0&&(pi=nr("canvas")),pi.width=e.width,pi.height=e.height;const n=pi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=pi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fi(t[n]/255)*255):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Oh=0;class cl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=Tn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Lr(s[o].image)):r.push(Lr(s[o]))}else r=Lr(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Lr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fh=0;class Gt extends Vi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=an,s=an,r=jt,o=cs,a=on,c=qn,l=Gt.DEFAULT_ANISOTROPY,u=Jt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Tn(),this.name="",this.source=new cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===ci?Ct:Jt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ga:e.x=e.x-Math.floor(e.x);break;case an:e.x=e.x<0?0:1;break;case _a:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ga:e.y=e.y-Math.floor(e.y);break;case an:e.y=e.y<0?0:1;break;case _a:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ct?ci:il}set encoding(e){as("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ci?Ct:Jt}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=jc;Gt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,s=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,S=(h+1)/2,R=(p+1)/2,T=(u+f)/4,A=(d+_)/4,k=(g+m)/4;return v>S&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=A/n):S>R?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=k/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=k/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-_)/x,this.z=(f-u)/x,this.w=Math.acos((l+h+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zh extends Vi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(as("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ci?Ct:Jt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Gt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new cl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ui extends zh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ll extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bh extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=an,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hs{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3];const f=r[o+0],h=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==f||l!==h||u!==g){let m=1-a;const p=c*f+l*h+u*g+d*_,x=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const R=Math.sqrt(v),T=Math.atan2(R,p*x);m=Math.sin(m*T)/R,a=Math.sin(a*T)/R}const S=a*x;if(c=c*m+f*S,l=l*m+h*S,u=u*m+g*S,d=d*m+_*S,m===1-a){const R=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=R,l*=R,u*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[o],f=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+u*d+c*h-l*f,e[t+1]=c*g+u*f+l*d-a*h,e[t+2]=l*g+u*h+a*f-c*d,e[t+3]=u*g-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),d=a(r/2),f=c(n/2),h=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d+f*h*g;break;case"YZX":this._x=f*u*d+l*h*g,this._y=l*h*d+f*u*g,this._z=l*u*g-f*h*d,this._w=l*u*d-f*h*g;break;case"XZY":this._x=f*u*d-l*h*g,this._y=l*h*d-f*u*g,this._z=l*u*g+f*h*d,this._w=l*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(o-s)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+l)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(r-l)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(c+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),d=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ko.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ko.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),u=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*u,this.y=n+c*u+a*l-r*d,this.z=s+c*d+r*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pr.copy(this).projectOnVector(e),this.sub(Pr)}reflect(e){return this.sub(Pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pr=new I,ko=new hs;class ds{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,tn):tn.fromBufferAttribute(r,o),tn.applyMatrix4(e.matrixWorld),this.expandByPoint(tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(e.matrixWorld),this.union(vs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,tn),tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),xs.subVectors(this.max,Yi),mi.subVectors(e.a,Yi),gi.subVectors(e.b,Yi),_i.subVectors(e.c,Yi),Cn.subVectors(gi,mi),Ln.subVectors(_i,gi),Jn.subVectors(mi,_i);let t=[0,-Cn.z,Cn.y,0,-Ln.z,Ln.y,0,-Jn.z,Jn.y,Cn.z,0,-Cn.x,Ln.z,0,-Ln.x,Jn.z,0,-Jn.x,-Cn.y,Cn.x,0,-Ln.y,Ln.x,0,-Jn.y,Jn.x,0];return!Ir(t,mi,gi,_i,xs)||(t=[1,0,0,0,1,0,0,0,1],!Ir(t,mi,gi,_i,xs))?!1:(ys.crossVectors(Cn,Ln),t=[ys.x,ys.y,ys.z],Ir(t,mi,gi,_i,xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new I,new I,new I,new I,new I,new I,new I,new I],tn=new I,vs=new ds,mi=new I,gi=new I,_i=new I,Cn=new I,Ln=new I,Jn=new I,Yi=new I,xs=new I,ys=new I,Qn=new I;function Ir(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Qn.fromArray(i,r);const a=s.x*Math.abs(Qn.x)+s.y*Math.abs(Qn.y)+s.z*Math.abs(Qn.z),c=e.dot(Qn),l=t.dot(Qn),u=n.dot(Qn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Gh=new ds,ji=new I,Ur=new I;class Ra{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ji.subVectors(e,this.center);const t=ji.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ji,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ur.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ji.copy(e.center).add(Ur)),this.expandByPoint(ji.copy(e.center).sub(Ur))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new I,Dr=new I,Ms=new I,Pn=new I,kr=new I,Ss=new I,Nr=new I;class ul{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Dr.copy(e).add(t).multiplyScalar(.5),Ms.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(Dr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ms),a=Pn.dot(this.direction),c=-Pn.dot(Ms),l=Pn.lengthSq(),u=Math.abs(1-o*o);let d,f,h,g;if(u>0)if(d=o*c-a,f=o*a-c,g=r*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),h=f*(f+2*c)+l):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-c),r),h=-d*d+f*(f+2*c)+l);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Dr).addScaledVector(Ms,f),h}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),u>=0?(r=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(r=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,s,r){kr.subVectors(t,e),Ss.subVectors(n,e),Nr.crossVectors(kr,Ss);let o=this.direction.dot(Nr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Pn.subVectors(this.origin,e);const c=a*this.direction.dot(Ss.crossVectors(Pn,Ss));if(c<0)return null;const l=a*this.direction.dot(kr.cross(Pn));if(l<0||c+l>o)return null;const u=-a*Pn.dot(Nr);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,n,s,r,o,a,c,l,u,d,f,h,g,_,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,u,d,f,h,g,_,m)}set(e,t,n,s,r,o,a,c,l,u,d,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),o=1/vi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+h*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*u,h=c*d,g=l*u,_=l*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*u,h=o*d,g=a*u,_=a*d;t[0]=c*u,t[4]=g*l-h,t[8]=f*l+_,t[1]=c*d,t[5]=_*l+f,t[9]=h*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*c,h=o*l,g=a*c,_=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hh,e,Vh)}lookAt(e,t,n){const s=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),In.crossVectors(n,Wt),In.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),In.crossVectors(n,Wt)),In.normalize(),Es.crossVectors(Wt,In),s[0]=In.x,s[4]=Es.x,s[8]=Wt.x,s[1]=In.y,s[5]=Es.y,s[9]=Wt.y,s[2]=In.z,s[6]=Es.z,s[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],x=n[3],v=n[7],S=n[11],R=n[15],T=s[0],A=s[4],k=s[8],y=s[12],E=s[1],D=s[5],H=s[9],ee=s[13],L=s[2],N=s[6],W=s[10],$=s[14],q=s[3],Y=s[7],K=s[11],se=s[15];return r[0]=o*T+a*E+c*L+l*q,r[4]=o*A+a*D+c*N+l*Y,r[8]=o*k+a*H+c*W+l*K,r[12]=o*y+a*ee+c*$+l*se,r[1]=u*T+d*E+f*L+h*q,r[5]=u*A+d*D+f*N+h*Y,r[9]=u*k+d*H+f*W+h*K,r[13]=u*y+d*ee+f*$+h*se,r[2]=g*T+_*E+m*L+p*q,r[6]=g*A+_*D+m*N+p*Y,r[10]=g*k+_*H+m*W+p*K,r[14]=g*y+_*ee+m*$+p*se,r[3]=x*T+v*E+S*L+R*q,r[7]=x*A+v*D+S*N+R*Y,r[11]=x*k+v*H+S*W+R*K,r[15]=x*y+v*ee+S*$+R*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*a*f+n*l*f+s*a*h-n*c*h)+_*(+t*c*h-t*l*f+r*o*f-s*o*h+s*l*u-r*c*u)+m*(+t*l*d-t*a*h-r*o*d+n*o*h+r*a*u-n*l*u)+p*(-s*a*u-t*c*d+t*a*f+s*o*d-n*o*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],x=d*m*l-_*f*l+_*c*h-a*m*h-d*c*p+a*f*p,v=g*f*l-u*m*l-g*c*h+o*m*h+u*c*p-o*f*p,S=u*_*l-g*d*l+g*a*h-o*_*h-u*a*p+o*d*p,R=g*d*c-u*_*c-g*a*f+o*_*f+u*a*m-o*d*m,T=t*x+n*v+s*S+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=x*A,e[1]=(_*f*r-d*m*r-_*s*h+n*m*h+d*s*p-n*f*p)*A,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*p+n*c*p)*A,e[3]=(d*c*r-a*f*r-d*s*l+n*f*l+a*s*h-n*c*h)*A,e[4]=v*A,e[5]=(u*m*r-g*f*r+g*s*h-t*m*h-u*s*p+t*f*p)*A,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*p-t*c*p)*A,e[7]=(o*f*r-u*c*r+u*s*l-t*f*l-o*s*h+t*c*h)*A,e[8]=S*A,e[9]=(g*d*r-u*_*r-g*n*h+t*_*h+u*n*p-t*d*p)*A,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*p+t*a*p)*A,e[11]=(u*a*r-o*d*r-u*n*l+t*d*l+o*n*h-t*a*h)*A,e[12]=R*A,e[13]=(u*_*s-g*d*s+g*n*f-t*_*f-u*n*m+t*d*m)*A,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*A,e[15]=(o*d*s-u*a*s+u*n*c-t*d*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,u=o+o,d=a+a,f=r*l,h=r*u,g=r*d,_=o*u,m=o*d,p=a*d,x=c*l,v=c*u,S=c*d,R=n.x,T=n.y,A=n.z;return s[0]=(1-(_+p))*R,s[1]=(h+S)*R,s[2]=(g-v)*R,s[3]=0,s[4]=(h-S)*T,s[5]=(1-(f+p))*T,s[6]=(m+x)*T,s[7]=0,s[8]=(g+v)*A,s[9]=(m-x)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=vi.set(s[0],s[1],s[2]).length();const o=vi.set(s[4],s[5],s[6]).length(),a=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],nn.copy(this);const l=1/r,u=1/o,d=1/a;return nn.elements[0]*=l,nn.elements[1]*=l,nn.elements[2]*=l,nn.elements[4]*=u,nn.elements[5]*=u,nn.elements[6]*=u,nn.elements[8]*=d,nn.elements[9]*=d,nn.elements[10]*=d,t.setFromRotationMatrix(nn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=bn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s);let h,g;if(a===bn)h=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===er)h=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=h,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=bn){const c=this.elements,l=1/(t-e),u=1/(n-s),d=1/(o-r),f=(t+e)*l,h=(n+s)*u;let g,_;if(a===bn)g=(o+r)*d,_=-2*d;else if(a===er)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-h,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const vi=new I,nn=new vt,Hh=new I(0,0,0),Vh=new I(1,1,1),In=new I,Es=new I,Wt=new I,No=new vt,Oo=new hs;class lr{constructor(e=0,t=0,n=0,s=lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return No.makeRotationFromQuaternion(e),this.setFromRotationMatrix(No,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}lr.DEFAULT_ORDER="XYZ";class Ca{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wh=0;const Fo=new I,xi=new hs,vn=new vt,ws=new I,Ki=new I,Xh=new I,qh=new hs,zo=new I(1,0,0),Bo=new I(0,1,0),Go=new I(0,0,1),$h={type:"added"},Yh={type:"removed"};class Rt extends Vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Tn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new I,t=new lr,n=new hs,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new $e}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(zo,e)}rotateY(e){return this.rotateOnAxis(Bo,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return Fo.copy(e).applyQuaternion(this.quaternion),this.position.add(Fo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zo,e)}translateY(e){return this.translateOnAxis(Bo,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ws.copy(e):ws.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Ki,ws,this.up):vn.lookAt(ws,Ki,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),xi.setFromRotationMatrix(vn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($h)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,Xh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,qh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++){const a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Rt.DEFAULT_UP=new I(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new I,xn=new I,Or=new I,yn=new I,yi=new I,Mi=new I,Ho=new I,Fr=new I,zr=new I,Br=new I;let bs=!1;class Kt{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),sn.subVectors(e,t),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){sn.subVectors(s,t),xn.subVectors(n,t),Or.subVectors(e,t);const o=sn.dot(sn),a=sn.dot(xn),c=sn.dot(Or),l=xn.dot(xn),u=xn.dot(Or),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-h-g,g,h)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getUV(e,t,n,s,r,o,a,c){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),this.getInterpolation(e,t,n,s,r,o,a,c)}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yn.x),c.addScaledVector(o,yn.y),c.addScaledVector(a,yn.z),c)}static isFrontFacing(e,t,n,s){return sn.subVectors(n,t),xn.subVectors(e,t),sn.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),sn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;yi.subVectors(s,n),Mi.subVectors(r,n),Fr.subVectors(e,n);const c=yi.dot(Fr),l=Mi.dot(Fr);if(c<=0&&l<=0)return t.copy(n);zr.subVectors(e,s);const u=yi.dot(zr),d=Mi.dot(zr);if(u>=0&&d<=u)return t.copy(s);const f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(n).addScaledVector(yi,o);Br.subVectors(e,r);const h=yi.dot(Br),g=Mi.dot(Br);if(g>=0&&h<=g)return t.copy(r);const _=h*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Mi,a);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Ho.subVectors(r,s),a=(d-u)/(d-u+(h-g)),t.copy(s).addScaledVector(Ho,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(yi,o).addScaledVector(Mi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Gr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ct){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=rt.workingColorSpace){if(e=Aa(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Gr(o,r,e+1/3),this.g=Gr(o,r,e),this.b=Gr(o,r,e-1/3)}return rt.toWorkingColorSpace(this,s),this}setStyle(e,t=Ct){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ct){const n=hl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ct){return rt.fromWorkingColorSpace(It.copy(this),e),Math.round(Ft(It.r*255,0,255))*65536+Math.round(Ft(It.g*255,0,255))*256+Math.round(Ft(It.b*255,0,255))}getHexString(e=Ct){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.fromWorkingColorSpace(It.copy(this),t);const n=It.r,s=It.g,r=It.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=rt.workingColorSpace){return rt.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Ct){rt.fromWorkingColorSpace(It.copy(this),e);const t=It.r,n=It.g,s=It.b;return e!==Ct?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(Ts);const n=rs(Un.h,Ts.h,t),s=rs(Un.s,Ts.s,t),r=rs(Un.l,Ts.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new Ze;Ze.NAMES=hl;let jh=0;class Wi extends Vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Tn(),this.name="",this.type="Material",this.blending=Oi,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=da,this.blendDst=fa,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Co,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fi,this.stencilZFail=fi,this.stencilZPass=fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oi&&(n.blending=this.blending),this.side!==$n&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==da&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Co&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class yt extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new I,As=new ke;class cn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=va,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==va&&(e.usage=this.usage),e}}class dl extends cn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class fl extends cn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Mt extends cn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kh=0;const $t=new vt,Hr=new Rt,Si=new I,Xt=new ds,Zi=new ds,At=new I;class en extends Vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Tn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(al(e)?fl:dl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return Hr.lookAt(e),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Si).negate(),this.translate(Si.x,Si.y,Si.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Mt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ds);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Xt.setFromBufferAttribute(r),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ra);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Zi.setFromBufferAttribute(a),this.morphTargetsRelative?(At.addVectors(Xt.min,Zi.min),Xt.expandByPoint(At),At.addVectors(Xt.max,Zi.max),Xt.expandByPoint(At)):(Xt.expandByPoint(Zi.min),Xt.expandByPoint(Zi.max))}Xt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)At.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(At));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)At.fromBufferAttribute(a,l),c&&(Si.fromBufferAttribute(e,l),At.add(Si)),s=Math.max(s,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,o=t.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let E=0;E<a;E++)l[E]=new I,u[E]=new I;const d=new I,f=new I,h=new I,g=new ke,_=new ke,m=new ke,p=new I,x=new I;function v(E,D,H){d.fromArray(s,E*3),f.fromArray(s,D*3),h.fromArray(s,H*3),g.fromArray(o,E*2),_.fromArray(o,D*2),m.fromArray(o,H*2),f.sub(d),h.sub(d),_.sub(g),m.sub(g);const ee=1/(_.x*m.y-m.x*_.y);isFinite(ee)&&(p.copy(f).multiplyScalar(m.y).addScaledVector(h,-_.y).multiplyScalar(ee),x.copy(h).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(ee),l[E].add(p),l[D].add(p),l[H].add(p),u[E].add(x),u[D].add(x),u[H].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let E=0,D=S.length;E<D;++E){const H=S[E],ee=H.start,L=H.count;for(let N=ee,W=ee+L;N<W;N+=3)v(n[N+0],n[N+1],n[N+2])}const R=new I,T=new I,A=new I,k=new I;function y(E){A.fromArray(r,E*3),k.copy(A);const D=l[E];R.copy(D),R.sub(A.multiplyScalar(A.dot(D))).normalize(),T.crossVectors(k,D);const ee=T.dot(u[E])<0?-1:1;c[E*4]=R.x,c[E*4+1]=R.y,c[E*4+2]=R.z,c[E*4+3]=ee}for(let E=0,D=S.length;E<D;++E){const H=S[E],ee=H.start,L=H.count;for(let N=ee,W=ee+L;N<W;N+=3)y(n[N+0]),y(n[N+1]),y(n[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,u=new I,d=new I;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(a,c){const l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u);let h=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[h++]}return new cn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new en,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,d=l.length;u<d;u++){const f=l[u],h=e(f,n);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){const h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],d=r[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,u=o.length;l<u;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vo=new vt,ei=new ul,Rs=new Ra,Wo=new I,Ei=new I,wi=new I,bi=new I,Vr=new I,Cs=new I,Ls=new ke,Ps=new ke,Is=new ke,Xo=new I,qo=new I,$o=new I,Us=new I,Ds=new I;class P extends Rt{constructor(e=new en,t=new yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Cs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],d=r[c];u!==0&&(Vr.fromBufferAttribute(d,e),o?Cs.addScaledVector(Vr,u):Cs.addScaledVector(Vr.sub(t),u))}t.add(Cs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(r),ei.copy(e.ray).recast(e.near),!(Rs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Rs,Wo)===null||ei.origin.distanceToSquared(Wo)>(e.far-e.near)**2))&&(Vo.copy(r).invert(),ei.copy(e.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,h.start),v=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let S=x,R=v;S<R;S+=3){const T=a.getX(S),A=a.getX(S+1),k=a.getX(S+2);s=ks(this,p,e,n,l,u,d,T,A,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const x=a.getX(m),v=a.getX(m+1),S=a.getX(m+2);s=ks(this,o,e,n,l,u,d,x,v,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],x=Math.max(m.start,h.start),v=Math.min(c.count,Math.min(m.start+m.count,h.start+h.count));for(let S=x,R=v;S<R;S+=3){const T=S,A=S+1,k=S+2;s=ks(this,p,e,n,l,u,d,T,A,k),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const x=m,v=m+1,S=m+2;s=ks(this,o,e,n,l,u,d,x,v,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Zh(i,e,t,n,s,r,o,a){let c;if(e.side===Bt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===$n,a),c===null)return null;Ds.copy(a),Ds.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ds);return l<t.near||l>t.far?null:{distance:l,point:Ds.clone(),object:i}}function ks(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Ei),i.getVertexPosition(c,wi),i.getVertexPosition(l,bi);const u=Zh(i,e,t,n,Ei,wi,bi,Us);if(u){s&&(Ls.fromBufferAttribute(s,a),Ps.fromBufferAttribute(s,c),Is.fromBufferAttribute(s,l),u.uv=Kt.getInterpolation(Us,Ei,wi,bi,Ls,Ps,Is,new ke)),r&&(Ls.fromBufferAttribute(r,a),Ps.fromBufferAttribute(r,c),Is.fromBufferAttribute(r,l),u.uv1=Kt.getInterpolation(Us,Ei,wi,bi,Ls,Ps,Is,new ke),u.uv2=u.uv1),o&&(Xo.fromBufferAttribute(o,a),qo.fromBufferAttribute(o,c),$o.fromBufferAttribute(o,l),u.normal=Kt.getInterpolation(Us,Ei,wi,bi,Xo,qo,$o,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};Kt.getNormal(Ei,wi,bi,d.normal),u.face=d}return u}class ve extends en{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function g(_,m,p,x,v,S,R,T,A,k,y){const E=S/A,D=R/k,H=S/2,ee=R/2,L=T/2,N=A+1,W=k+1;let $=0,q=0;const Y=new I;for(let K=0;K<W;K++){const se=K*D-ee;for(let re=0;re<N;re++){const X=re*E-H;Y[_]=X*x,Y[m]=se*v,Y[p]=L,l.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[p]=T>0?1:-1,u.push(Y.x,Y.y,Y.z),d.push(re/A),d.push(1-K/k),$+=1}}for(let K=0;K<k;K++)for(let se=0;se<A;se++){const re=f+se+N*K,X=f+se+N*(K+1),Q=f+(se+1)+N*(K+1),ue=f+(se+1)+N*K;c.push(re,X,ue),c.push(X,Q,ue),q+=6}a.addGroup(h,q,y),h+=q,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ve(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Hi(i[t]);for(const s in n)e[s]=n[s]}return e}function Jh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function pl(i){return i.getRenderTarget()===null?i.outputColorSpace:rt.workingColorSpace}const Qh={clone:Hi,merge:Nt};var ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ed,this.fragmentShader=td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Jh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ml extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Zt extends ml{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return us*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ss*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ti=-90,Ai=1;class nd extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Zt(Ti,Ai,e,t);s.layers=this.layers,this.add(s);const r=new Zt(Ti,Ai,e,t);r.layers=this.layers,this.add(r);const o=new Zt(Ti,Ai,e,t);o.layers=this.layers,this.add(o);const a=new Zt(Ti,Ai,e,t);a.layers=this.layers,this.add(a);const c=new Zt(Ti,Ai,e,t);c.layers=this.layers,this.add(c);const l=new Zt(Ti,Ai,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===er)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gl extends Gt{constructor(e,t,n,s,r,o,a,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:zi,super(e,t,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class id extends ui{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(as("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ci?Ct:Jt),this.texture=new gl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ve(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:Wn});r.uniforms.tEquirect.value=t;const o=new P(s,r),a=t.minFilter;return t.minFilter===cs&&(t.minFilter=jt),new nd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Wr=new I,sd=new I,rd=new $e;class Bn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Wr.subVectors(n,t).cross(sd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Wr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rd.getNormalMatrix(e),s=this.coplanarPoint(Wr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new Ra,Ns=new I;class La{constructor(e=new Bn,t=new Bn,n=new Bn,s=new Bn,r=new Bn,o=new Bn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],d=s[6],f=s[7],h=s[8],g=s[9],_=s[10],m=s[11],p=s[12],x=s[13],v=s[14],S=s[15];if(n[0].setComponents(c-r,f-l,m-h,S-p).normalize(),n[1].setComponents(c+r,f+l,m+h,S+p).normalize(),n[2].setComponents(c+o,f+u,m+g,S+x).normalize(),n[3].setComponents(c-o,f-u,m-g,S-x).normalize(),n[4].setComponents(c-a,f-d,m-_,S-v).normalize(),t===bn)n[5].setComponents(c+a,f+d,m+_,S+v).normalize();else if(t===er)n[5].setComponents(a,d,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ns.x=s.normal.x>0?e.max.x:e.min.x,Ns.y=s.normal.y>0?e.max.y:e.min.y,Ns.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _l(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ad(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,u){const d=l.array,f=l.usage,h=d.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,d,f),l.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:h}}function r(l,u,d){const f=u.array,h=u._updateRange,g=u.updateRanges;if(i.bindBuffer(d,l),h.count===-1&&g.length===0&&i.bufferSubData(d,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(d,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):i.bufferSubData(d,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}h.count!==-1&&(t?i.bufferSubData(d,h.offset*f.BYTES_PER_ELEMENT,f,h.offset,h.count):i.bufferSubData(d,h.offset*f.BYTES_PER_ELEMENT,f.subarray(h.offset,h.offset+h.count)),h.count=-1),u.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=n.get(l);if(d===void 0)n.set(l,s(l,u));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,l,u),d.version=l.version}}return{get:o,remove:a,update:c}}class zt extends en{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,d=e/a,f=t/c,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const x=p*f-o;for(let v=0;v<l;v++){const S=v*d-r;g.push(S,-x,0),_.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const v=x+l*p,S=x+l*(p+1),R=x+1+l*(p+1),T=x+1+l*p;h.push(v,S,T),h.push(S,R,T)}this.setIndex(h),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zt(e.width,e.height,e.widthSegments,e.heightSegments)}}var od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ud=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,md=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Md=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ld=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Id=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ud=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Od="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,zd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$d=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Kd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ef=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,af=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,of=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,uf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,df=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ff=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,pf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,mf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Ef=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,wf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Af=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,If=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Uf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Df=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Of=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Hf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$f=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ep=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,tp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,np=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const op=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,up=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,mp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ep=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Rp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Cp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ip=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Up=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Np=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Op=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:od,alphahash_pars_fragment:cd,alphamap_fragment:ld,alphamap_pars_fragment:ud,alphatest_fragment:hd,alphatest_pars_fragment:dd,aomap_fragment:fd,aomap_pars_fragment:pd,batching_pars_vertex:md,batching_vertex:gd,begin_vertex:_d,beginnormal_vertex:vd,bsdfs:xd,iridescence_fragment:yd,bumpmap_pars_fragment:Md,clipping_planes_fragment:Sd,clipping_planes_pars_fragment:Ed,clipping_planes_pars_vertex:wd,clipping_planes_vertex:bd,color_fragment:Td,color_pars_fragment:Ad,color_pars_vertex:Rd,color_vertex:Cd,common:Ld,cube_uv_reflection_fragment:Pd,defaultnormal_vertex:Id,displacementmap_pars_vertex:Ud,displacementmap_vertex:Dd,emissivemap_fragment:kd,emissivemap_pars_fragment:Nd,colorspace_fragment:Od,colorspace_pars_fragment:Fd,envmap_fragment:zd,envmap_common_pars_fragment:Bd,envmap_pars_fragment:Gd,envmap_pars_vertex:Hd,envmap_physical_pars_fragment:ef,envmap_vertex:Vd,fog_vertex:Wd,fog_pars_vertex:Xd,fog_fragment:qd,fog_pars_fragment:$d,gradientmap_pars_fragment:Yd,lightmap_fragment:jd,lightmap_pars_fragment:Kd,lights_lambert_fragment:Zd,lights_lambert_pars_fragment:Jd,lights_pars_begin:Qd,lights_toon_fragment:tf,lights_toon_pars_fragment:nf,lights_phong_fragment:sf,lights_phong_pars_fragment:rf,lights_physical_fragment:af,lights_physical_pars_fragment:of,lights_fragment_begin:cf,lights_fragment_maps:lf,lights_fragment_end:uf,logdepthbuf_fragment:hf,logdepthbuf_pars_fragment:df,logdepthbuf_pars_vertex:ff,logdepthbuf_vertex:pf,map_fragment:mf,map_pars_fragment:gf,map_particle_fragment:_f,map_particle_pars_fragment:vf,metalnessmap_fragment:xf,metalnessmap_pars_fragment:yf,morphcolor_vertex:Mf,morphnormal_vertex:Sf,morphtarget_pars_vertex:Ef,morphtarget_vertex:wf,normal_fragment_begin:bf,normal_fragment_maps:Tf,normal_pars_fragment:Af,normal_pars_vertex:Rf,normal_vertex:Cf,normalmap_pars_fragment:Lf,clearcoat_normal_fragment_begin:Pf,clearcoat_normal_fragment_maps:If,clearcoat_pars_fragment:Uf,iridescence_pars_fragment:Df,opaque_fragment:kf,packing:Nf,premultiplied_alpha_fragment:Of,project_vertex:Ff,dithering_fragment:zf,dithering_pars_fragment:Bf,roughnessmap_fragment:Gf,roughnessmap_pars_fragment:Hf,shadowmap_pars_fragment:Vf,shadowmap_pars_vertex:Wf,shadowmap_vertex:Xf,shadowmask_pars_fragment:qf,skinbase_vertex:$f,skinning_pars_vertex:Yf,skinning_vertex:jf,skinnormal_vertex:Kf,specularmap_fragment:Zf,specularmap_pars_fragment:Jf,tonemapping_fragment:Qf,tonemapping_pars_fragment:ep,transmission_fragment:tp,transmission_pars_fragment:np,uv_pars_fragment:ip,uv_pars_vertex:sp,uv_vertex:rp,worldpos_vertex:ap,background_vert:op,background_frag:cp,backgroundCube_vert:lp,backgroundCube_frag:up,cube_vert:hp,cube_frag:dp,depth_vert:fp,depth_frag:pp,distanceRGBA_vert:mp,distanceRGBA_frag:gp,equirect_vert:_p,equirect_frag:vp,linedashed_vert:xp,linedashed_frag:yp,meshbasic_vert:Mp,meshbasic_frag:Sp,meshlambert_vert:Ep,meshlambert_frag:wp,meshmatcap_vert:bp,meshmatcap_frag:Tp,meshnormal_vert:Ap,meshnormal_frag:Rp,meshphong_vert:Cp,meshphong_frag:Lp,meshphysical_vert:Pp,meshphysical_frag:Ip,meshtoon_vert:Up,meshtoon_frag:Dp,points_vert:kp,points_frag:Np,shadow_vert:Op,shadow_frag:Fp,sprite_vert:zp,sprite_frag:Bp},oe={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},hn={basic:{uniforms:Nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Nt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Nt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Nt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Nt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Nt([oe.points,oe.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Nt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Nt([oe.common,oe.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Nt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Nt([oe.sprite,oe.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Nt([oe.common,oe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Nt([oe.lights,oe.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};hn.physical={uniforms:Nt([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Os={r:0,b:0,g:0};function Gp(i,e,t,n,s,r,o){const a=new Ze(0);let c=r===!0?0:1,l,u,d=null,f=0,h=null;function g(m,p){let x=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),x=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===or)?(u===void 0&&(u=new P(new ve(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Hi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=rt.getTransfer(v.colorSpace)!==ht,(d!==v||f!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new P(new zt(2,2),new hi({name:"BackgroundMaterial",uniforms:Hi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=rt.getTransfer(v.colorSpace)!==ht,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(Os,pl(i)),n.buffers.color.setClear(Os.r,Os.g,Os.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function Hp(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,u=!1;function d(L,N,W,$,q){let Y=!1;if(o){const K=_($,W,N);l!==K&&(l=K,h(l.object)),Y=p(L,$,W,q),Y&&x(L,$,W,q)}else{const K=N.wireframe===!0;(l.geometry!==$.id||l.program!==W.id||l.wireframe!==K)&&(l.geometry=$.id,l.program=W.id,l.wireframe=K,Y=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(Y||u)&&(u=!1,k(L,N,W,$),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function h(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,N,W){const $=W.wireframe===!0;let q=a[L.id];q===void 0&&(q={},a[L.id]=q);let Y=q[N.id];Y===void 0&&(Y={},q[N.id]=Y);let K=Y[$];return K===void 0&&(K=m(f()),Y[$]=K),K}function m(L){const N=[],W=[],$=[];for(let q=0;q<s;q++)N[q]=0,W[q]=0,$[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:W,attributeDivisors:$,object:L,attributes:{},index:null}}function p(L,N,W,$){const q=l.attributes,Y=N.attributes;let K=0;const se=W.getAttributes();for(const re in se)if(se[re].location>=0){const Q=q[re];let ue=Y[re];if(ue===void 0&&(re==="instanceMatrix"&&L.instanceMatrix&&(ue=L.instanceMatrix),re==="instanceColor"&&L.instanceColor&&(ue=L.instanceColor)),Q===void 0||Q.attribute!==ue||ue&&Q.data!==ue.data)return!0;K++}return l.attributesNum!==K||l.index!==$}function x(L,N,W,$){const q={},Y=N.attributes;let K=0;const se=W.getAttributes();for(const re in se)if(se[re].location>=0){let Q=Y[re];Q===void 0&&(re==="instanceMatrix"&&L.instanceMatrix&&(Q=L.instanceMatrix),re==="instanceColor"&&L.instanceColor&&(Q=L.instanceColor));const ue={};ue.attribute=Q,Q&&Q.data&&(ue.data=Q.data),q[re]=ue,K++}l.attributes=q,l.attributesNum=K,l.index=$}function v(){const L=l.newAttributes;for(let N=0,W=L.length;N<W;N++)L[N]=0}function S(L){R(L,0)}function R(L,N){const W=l.newAttributes,$=l.enabledAttributes,q=l.attributeDivisors;W[L]=1,$[L]===0&&(i.enableVertexAttribArray(L),$[L]=1),q[L]!==N&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,N),q[L]=N)}function T(){const L=l.newAttributes,N=l.enabledAttributes;for(let W=0,$=N.length;W<$;W++)N[W]!==L[W]&&(i.disableVertexAttribArray(W),N[W]=0)}function A(L,N,W,$,q,Y,K){K===!0?i.vertexAttribIPointer(L,N,W,q,Y):i.vertexAttribPointer(L,N,W,$,q,Y)}function k(L,N,W,$){if(n.isWebGL2===!1&&(L.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const q=$.attributes,Y=W.getAttributes(),K=N.defaultAttributeValues;for(const se in Y){const re=Y[se];if(re.location>=0){let X=q[se];if(X===void 0&&(se==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),se==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){const Q=X.normalized,ue=X.itemSize,ye=t.get(X);if(ye===void 0)continue;const xe=ye.buffer,Ue=ye.type,Ne=ye.bytesPerElement,we=n.isWebGL2===!0&&(Ue===i.INT||Ue===i.UNSIGNED_INT||X.gpuType===Kc);if(X.isInterleavedBufferAttribute){const je=X.data,O=je.stride,wt=X.offset;if(je.isInstancedInterleavedBuffer){for(let Se=0;Se<re.locationSize;Se++)R(re.location+Se,je.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=je.meshPerAttribute*je.count)}else for(let Se=0;Se<re.locationSize;Se++)S(re.location+Se);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let Se=0;Se<re.locationSize;Se++)A(re.location+Se,ue/re.locationSize,Ue,Q,O*Ne,(wt+ue/re.locationSize*Se)*Ne,we)}else{if(X.isInstancedBufferAttribute){for(let je=0;je<re.locationSize;je++)R(re.location+je,X.meshPerAttribute);L.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let je=0;je<re.locationSize;je++)S(re.location+je);i.bindBuffer(i.ARRAY_BUFFER,xe);for(let je=0;je<re.locationSize;je++)A(re.location+je,ue/re.locationSize,Ue,Q,ue*Ne,ue/re.locationSize*je*Ne,we)}}else if(K!==void 0){const Q=K[se];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(re.location,Q);break;case 3:i.vertexAttrib3fv(re.location,Q);break;case 4:i.vertexAttrib4fv(re.location,Q);break;default:i.vertexAttrib1fv(re.location,Q)}}}}T()}function y(){H();for(const L in a){const N=a[L];for(const W in N){const $=N[W];for(const q in $)g($[q].object),delete $[q];delete N[W]}delete a[L]}}function E(L){if(a[L.id]===void 0)return;const N=a[L.id];for(const W in N){const $=N[W];for(const q in $)g($[q].object),delete $[q];delete N[W]}delete a[L.id]}function D(L){for(const N in a){const W=a[N];if(W[L.id]===void 0)continue;const $=W[L.id];for(const q in $)g($[q].object),delete $[q];delete W[L.id]}}function H(){ee(),u=!0,l!==c&&(l=c,h(l.object))}function ee(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:H,resetDefaultState:ee,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:S,disableUnusedAttributes:T}}function Vp(i,e,t,n){const s=n.isWebGL2;let r;function o(u){r=u}function a(u,d){i.drawArrays(r,u,d),t.update(d,r,1)}function c(u,d,f){if(f===0)return;let h,g;if(s)h=i,g="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[g](r,u,d,f),t.update(d,r,f)}function l(u,d,f){if(f===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<f;g++)this.render(u[g],d[g]);else{h.multiDrawArraysWEBGL(r,u,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Wp(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=o||e.has("OES_texture_float"),R=v&&S,T=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:R,maxSamples:T}}function Xp(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Bn,a=new $e,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):l();else{const x=r?0:n,v=x*4;let S=p.clippingState||null;c.value=S,S=u(g,f,v,h);for(let R=0;R!==v;++R)S[R]=t[R];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=h+_*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,S=h;v!==_;++v,S+=4)o.copy(d[v]).applyMatrix4(x,a),o.normal.toArray(m,S),m[S+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function qp(i){let e=new WeakMap;function t(o,a){return a===pa?o.mapping=zi:a===ma&&(o.mapping=Bi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===pa||a===ma)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new id(c.height/2);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Pa extends ml{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Di=4,Yo=[.125,.215,.35,.446,.526,.582],ri=20,Xr=new Pa,jo=new Ze;let qr=null,$r=0,Yr=0;const ii=(1+Math.sqrt(5))/2,Ri=1/ii,Ko=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,ii,Ri),new I(0,ii,-Ri),new I(Ri,0,ii),new I(-Ri,0,ii),new I(ii,Ri,0),new I(-ii,Ri,0)];class Zo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){qr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(qr,$r,Yr),e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===Bi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Yr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:ls,format:on,colorSpace:An,depthBuffer:!1},s=Jo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jo(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=$p(r)),this._blurMaterial=Yp(r,e,t)}return s}_compileMaterial(e){const t=new P(this._lodPlanes[0],e);this._renderer.compile(t,Xr)}_sceneToCubeUV(e,t,n,s){const a=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(jo),u.toneMapping=Xn,u.autoClear=!1;const h=new yt({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),g=new P(new ve,h);let _=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,_=!0):(h.color.copy(jo),_=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Fs(s,x*v,p>2?v:0,v,v),u.setRenderTarget(s),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===zi||e.mapping===Bi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qo());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new P(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Fs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Xr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ko[(s-1)%Ko.length];this._blur(e,s-1,s,r,o)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new P(this._lodPlanes[s],l),f=l.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*ri-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):ri;m>ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ri}`);const p=[];let x=0;for(let A=0;A<ri;++A){const k=A/_,y=Math.exp(-k*k/2);p.push(y),A===0?x+=y:A<m&&(x+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const S=this._sizeLods[s],R=3*S*(s>v-Di?s-v+Di:0),T=4*(this._cubeSize-S);Fs(t,R,T,3*S,2*S),c.setRenderTarget(t),c.render(d,Xr)}}function $p(i){const e=[],t=[],n=[];let s=i;const r=i-Di+1+Yo.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-Di?c=Yo[o-i+Di-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,x=new Float32Array(_*g*h),v=new Float32Array(m*g*h),S=new Float32Array(p*g*h);for(let T=0;T<h;T++){const A=T%3*2/3-1,k=T>2?0:-1,y=[A,k,0,A+2/3,k,0,A+2/3,k+1,0,A,k,0,A+2/3,k+1,0,A,k+1,0];x.set(y,_*g*T),v.set(f,m*g*T);const E=[T,T,T,T,T,T];S.set(E,p*g*T)}const R=new en;R.setAttribute("position",new cn(x,_)),R.setAttribute("uv",new cn(v,m)),R.setAttribute("faceIndex",new cn(S,p)),e.push(R),s>Di&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Jo(i,e,t){const n=new ui(i,e,t);return n.texture.mapping=or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Yp(i,e,t){const n=new Float32Array(ri),s=new I(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Qo(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ec(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ia(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Ia(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jp(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===pa||c===ma,u=c===zi||c===Bi;if(l||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new Zo(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(l&&d&&d.height>0||u&&d&&s(d)){t===null&&(t=new Zo(i));const f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Kp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zp(i,e,t,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(e.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const h=d.morphAttributes;for(const g in h){const _=h[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(d){const f=[],h=d.index,g=d.attributes.position;let _=0;if(h!==null){const x=h.array;_=h.version;for(let v=0,S=x.length;v<S;v+=3){const R=x[v+0],T=x[v+1],A=x[v+2];f.push(R,T,T,A,A,R)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const R=v+0,T=v+1,A=v+2;f.push(R,T,T,A,A,R)}}else return;const m=new(al(f)?fl:dl)(f,1);m.version=_;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function u(d){const f=r.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Jp(i,e,t,n){const s=n.isWebGL2;let r;function o(h){r=h}let a,c;function l(h){a=h.type,c=h.bytesPerElement}function u(h,g){i.drawElements(r,g,a,h*c),t.update(g,r,1)}function d(h,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,h*c,_),t.update(g,r,_)}function f(h,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(h[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,h,0,_);let p=0;for(let x=0;x<_;x++)p+=g[x];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function Qp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function em(i,e){return i[0]-e[0]}function tm(i,e){return Math.abs(e[1])-Math.abs(i[1])}function nm(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,o=new dt,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,u,d){const f=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(u);if(m===void 0||m.count!==_){let N=function(){ee.dispose(),r.delete(u),u.removeEventListener("dispose",N)};var h=N;m!==void 0&&m.texture.dispose();const v=u.morphAttributes.position!==void 0,S=u.morphAttributes.normal!==void 0,R=u.morphAttributes.color!==void 0,T=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],k=u.morphAttributes.color||[];let y=0;v===!0&&(y=1),S===!0&&(y=2),R===!0&&(y=3);let E=u.attributes.position.count*y,D=1;E>e.maxTextureSize&&(D=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const H=new Float32Array(E*D*4*_),ee=new ll(H,E,D,_);ee.type=Vn,ee.needsUpdate=!0;const L=y*4;for(let W=0;W<_;W++){const $=T[W],q=A[W],Y=k[W],K=E*D*4*W;for(let se=0;se<$.count;se++){const re=se*L;v===!0&&(o.fromBufferAttribute($,se),H[K+re+0]=o.x,H[K+re+1]=o.y,H[K+re+2]=o.z,H[K+re+3]=0),S===!0&&(o.fromBufferAttribute(q,se),H[K+re+4]=o.x,H[K+re+5]=o.y,H[K+re+6]=o.z,H[K+re+7]=0),R===!0&&(o.fromBufferAttribute(Y,se),H[K+re+8]=o.x,H[K+re+9]=o.y,H[K+re+10]=o.z,H[K+re+11]=Y.itemSize===4?o.w:1)}}m={count:_,texture:ee,size:new ke(E,D)},r.set(u,m),u.addEventListener("dispose",N)}let p=0;for(let v=0;v<f.length;v++)p+=f[v];const x=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(i,"morphTargetBaseInfluence",x),d.getUniforms().setValue(i,"morphTargetInfluences",f),d.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let S=0;S<g;S++)_[S]=[S,0];n[u.id]=_}for(let S=0;S<g;S++){const R=_[S];R[0]=S,R[1]=f[S]}_.sort(tm);for(let S=0;S<8;S++)S<g&&_[S][1]?(a[S][0]=_[S][0],a[S][1]=_[S][1]):(a[S][0]=Number.MAX_SAFE_INTEGER,a[S][1]=0);a.sort(em);const m=u.morphAttributes.position,p=u.morphAttributes.normal;let x=0;for(let S=0;S<8;S++){const R=a[S],T=R[0],A=R[1];T!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+S)!==m[T]&&u.setAttribute("morphTarget"+S,m[T]),p&&u.getAttribute("morphNormal"+S)!==p[T]&&u.setAttribute("morphNormal"+S,p[T]),s[S]=A,x+=A):(m&&u.hasAttribute("morphTarget"+S)===!0&&u.deleteAttribute("morphTarget"+S),p&&u.hasAttribute("morphNormal"+S)===!0&&u.deleteAttribute("morphNormal"+S),s[S]=0)}const v=u.morphTargetsRelative?1:1-x;d.getUniforms().setValue(i,"morphTargetBaseInfluence",v),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function im(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class vl extends Gt{constructor(e,t,n,s,r,o,a,c,l,u){if(u=u!==void 0?u:oi,u!==oi&&u!==Gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===oi&&(n=Hn),n===void 0&&u===Gi&&(n=ai),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ot,this.minFilter=c!==void 0?c:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const xl=new Gt,yl=new vl(1,1);yl.compareFunction=rl;const Ml=new ll,Sl=new Bh,El=new gl,tc=[],nc=[],ic=new Float32Array(16),sc=new Float32Array(9),rc=new Float32Array(4);function Xi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=tc[s];if(r===void 0&&(r=new Float32Array(s),tc[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function St(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ur(i,e){let t=nc[e];t===void 0&&(t=new Int32Array(e),nc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function sm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function om(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function cm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;rc.set(n),i.uniformMatrix2fv(this.addr,!1,rc),Et(t,n)}}function lm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;sc.set(n),i.uniformMatrix3fv(this.addr,!1,sc),Et(t,n)}}function um(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;ic.set(n),i.uniformMatrix4fv(this.addr,!1,ic),Et(t,n)}}function hm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function mm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function _m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function vm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function xm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?yl:xl;t.setTexture2D(e||r,s)}function ym(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Sl,s)}function Mm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||El,s)}function Sm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ml,s)}function Em(i){switch(i){case 5126:return sm;case 35664:return rm;case 35665:return am;case 35666:return om;case 35674:return cm;case 35675:return lm;case 35676:return um;case 5124:case 35670:return hm;case 35667:case 35671:return dm;case 35668:case 35672:return fm;case 35669:case 35673:return pm;case 5125:return mm;case 36294:return gm;case 36295:return _m;case 36296:return vm;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return Mm;case 36289:case 36303:case 36311:case 36292:return Sm}}function wm(i,e){i.uniform1fv(this.addr,e)}function bm(i,e){const t=Xi(e,this.size,2);i.uniform2fv(this.addr,t)}function Tm(i,e){const t=Xi(e,this.size,3);i.uniform3fv(this.addr,t)}function Am(i,e){const t=Xi(e,this.size,4);i.uniform4fv(this.addr,t)}function Rm(i,e){const t=Xi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cm(i,e){const t=Xi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Lm(i,e){const t=Xi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Pm(i,e){i.uniform1iv(this.addr,e)}function Im(i,e){i.uniform2iv(this.addr,e)}function Um(i,e){i.uniform3iv(this.addr,e)}function Dm(i,e){i.uniform4iv(this.addr,e)}function km(i,e){i.uniform1uiv(this.addr,e)}function Nm(i,e){i.uniform2uiv(this.addr,e)}function Om(i,e){i.uniform3uiv(this.addr,e)}function Fm(i,e){i.uniform4uiv(this.addr,e)}function zm(i,e,t){const n=this.cache,s=e.length,r=ur(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||xl,r[o])}function Bm(i,e,t){const n=this.cache,s=e.length,r=ur(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Sl,r[o])}function Gm(i,e,t){const n=this.cache,s=e.length,r=ur(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||El,r[o])}function Hm(i,e,t){const n=this.cache,s=e.length,r=ur(t,s);St(n,r)||(i.uniform1iv(this.addr,r),Et(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ml,r[o])}function Vm(i){switch(i){case 5126:return wm;case 35664:return bm;case 35665:return Tm;case 35666:return Am;case 35674:return Rm;case 35675:return Cm;case 35676:return Lm;case 5124:case 35670:return Pm;case 35667:case 35671:return Im;case 35668:case 35672:return Um;case 35669:case 35673:return Dm;case 5125:return km;case 36294:return Nm;case 36295:return Om;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return Bm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Hm}}class Wm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Em(t.type)}}class Xm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Vm(t.type)}}class qm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const jr=/(\w+)(\])?(\[|\.)?/g;function ac(i,e){i.seq.push(e),i.map[e.id]=e}function $m(i,e,t){const n=i.name,s=n.length;for(jr.lastIndex=0;;){const r=jr.exec(n),o=jr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){ac(t,l===void 0?new Wm(a,i,e):new Xm(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new qm(a),ac(t,d)),t=d}}}class Xs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);$m(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function oc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Ym=37297;let jm=0;function Km(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Zm(i){const e=rt.getPrimaries(rt.workingColorSpace),t=rt.getPrimaries(i);let n;switch(e===t?n="":e===Qs&&t===Js?n="LinearDisplayP3ToLinearSRGB":e===Js&&t===Qs&&(n="LinearSRGBToLinearDisplayP3"),i){case An:case cr:return[n,"LinearTransferOETF"];case Ct:case Ta:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function cc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Km(i.getShaderSource(e),o)}else return s}function Jm(i,e){const t=Zm(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Qm(i,e){let t;switch(e){case Ku:t="Linear";break;case Zu:t="Reinhard";break;case Ju:t="OptimizedCineon";break;case Qu:t="ACESFilmic";break;case th:t="AgX";break;case eh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function eg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ki).join(`
`)}function tg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ki).join(`
`)}function ng(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ig(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function ki(i){return i!==""}function lc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ma(i){return i.replace(sg,ag)}const rg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ag(i,e){let t=He[e];if(t===void 0){const n=rg.get(e);if(n!==void 0)t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ma(t)}const og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hc(i){return i.replace(og,cg)}function cg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dc(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===$c?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function ug(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case zi:case Bi:e="ENVMAP_TYPE_CUBE";break;case or:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bi:e="ENVMAP_MODE_REFRACTION";break}return e}function dg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yc:e="ENVMAP_BLENDING_MULTIPLY";break;case Yu:e="ENVMAP_BLENDING_MIX";break;case ju:e="ENVMAP_BLENDING_ADD";break}return e}function fg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function pg(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=lg(t),l=ug(t),u=hg(t),d=dg(t),f=fg(t),h=t.isWebGL2?"":eg(t),g=tg(t),_=ng(r),m=s.createProgram();let p,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ki).join(`
`),p.length>0&&(p+=`
`),x=[h,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ki).join(`
`),x.length>0&&(x+=`
`)):(p=[dc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ki).join(`
`),x=[h,dc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?He.tonemapping_pars_fragment:"",t.toneMapping!==Xn?Qm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Jm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ki).join(`
`)),o=Ma(o),o=lc(o,t),o=uc(o,t),a=Ma(a),a=lc(a,t),a=uc(a,t),o=hc(o),a=hc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+p+o,R=v+x+a,T=oc(s,s.VERTEX_SHADER,S),A=oc(s,s.FRAGMENT_SHADER,R);s.attachShader(m,T),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function k(H){if(i.debug.checkShaderErrors){const ee=s.getProgramInfoLog(m).trim(),L=s.getShaderInfoLog(T).trim(),N=s.getShaderInfoLog(A).trim();let W=!0,$=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,T,A);else{const q=cc(s,T,"vertex"),Y=cc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+q+`
`+Y)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(L===""||N==="")&&($=!1);$&&(H.diagnostics={runnable:W,programLog:ee,vertexShader:{log:L,prefix:p},fragmentShader:{log:N,prefix:x}})}s.deleteShader(T),s.deleteShader(A),y=new Xs(s,m),E=ig(s,m)}let y;this.getUniforms=function(){return y===void 0&&k(this),y};let E;this.getAttributes=function(){return E===void 0&&k(this),E};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(m,Ym)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}let mg=0;class gg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _g(e),t.set(e,n)),n}}class _g{constructor(e){this.id=mg++,this.code=e,this.usedTimes=0}}function vg(i,e,t,n,s,r,o){const a=new Ca,c=new gg,l=[],u=s.isWebGL2,d=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,E,D,H,ee){const L=H.fog,N=ee.geometry,W=y.isMeshStandardMaterial?H.environment:null,$=(y.isMeshStandardMaterial?t:e).get(y.envMap||W),q=$&&$.mapping===or?$.image.height:null,Y=g[y.type];y.precision!==null&&(h=s.getMaxPrecision(y.precision),h!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const K=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,se=K!==void 0?K.length:0;let re=0;N.morphAttributes.position!==void 0&&(re=1),N.morphAttributes.normal!==void 0&&(re=2),N.morphAttributes.color!==void 0&&(re=3);let X,Q,ue,ye;if(Y){const Ut=hn[Y];X=Ut.vertexShader,Q=Ut.fragmentShader}else X=y.vertexShader,Q=y.fragmentShader,c.update(y),ue=c.getVertexShaderID(y),ye=c.getFragmentShaderID(y);const xe=i.getRenderTarget(),Ue=ee.isInstancedMesh===!0,Ne=ee.isBatchedMesh===!0,we=!!y.map,je=!!y.matcap,O=!!$,wt=!!y.aoMap,Se=!!y.lightMap,Re=!!y.bumpMap,me=!!y.normalMap,ot=!!y.displacementMap,Oe=!!y.emissiveMap,b=!!y.metalnessMap,M=!!y.roughnessMap,F=y.anisotropy>0,Z=y.clearcoat>0,j=y.iridescence>0,J=y.sheen>0,ge=y.transmission>0,he=F&&!!y.anisotropyMap,fe=Z&&!!y.clearcoatMap,Ae=Z&&!!y.clearcoatNormalMap,Ve=Z&&!!y.clearcoatRoughnessMap,te=j&&!!y.iridescenceMap,it=j&&!!y.iridescenceThicknessMap,Ye=J&&!!y.sheenColorMap,Fe=J&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,pe=!!y.specularColorMap,Ge=!!y.specularIntensityMap,et=ge&&!!y.transmissionMap,pt=ge&&!!y.thicknessMap,Xe=!!y.gradientMap,ae=!!y.alphaMap,C=y.alphaTest>0,ce=!!y.alphaHash,le=!!y.extensions,Ce=!!N.attributes.uv1,be=!!N.attributes.uv2,ct=!!N.attributes.uv3;let lt=Xn;return y.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(lt=i.toneMapping),{isWebGL2:u,shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:X,fragmentShader:Q,defines:y.defines,customVertexShaderID:ue,customFragmentShaderID:ye,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ne,instancing:Ue,instancingColor:Ue&&ee.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:An,map:we,matcap:je,envMap:O,envMapMode:O&&$.mapping,envMapCubeUVHeight:q,aoMap:wt,lightMap:Se,bumpMap:Re,normalMap:me,displacementMap:f&&ot,emissiveMap:Oe,normalMapObjectSpace:me&&y.normalMapType===fh,normalMapTangentSpace:me&&y.normalMapType===sl,metalnessMap:b,roughnessMap:M,anisotropy:F,anisotropyMap:he,clearcoat:Z,clearcoatMap:fe,clearcoatNormalMap:Ae,clearcoatRoughnessMap:Ve,iridescence:j,iridescenceMap:te,iridescenceThicknessMap:it,sheen:J,sheenColorMap:Ye,sheenRoughnessMap:Fe,specularMap:Ee,specularColorMap:pe,specularIntensityMap:Ge,transmission:ge,transmissionMap:et,thicknessMap:pt,gradientMap:Xe,opaque:y.transparent===!1&&y.blending===Oi,alphaMap:ae,alphaTest:C,alphaHash:ce,combine:y.combine,mapUv:we&&_(y.map.channel),aoMapUv:wt&&_(y.aoMap.channel),lightMapUv:Se&&_(y.lightMap.channel),bumpMapUv:Re&&_(y.bumpMap.channel),normalMapUv:me&&_(y.normalMap.channel),displacementMapUv:ot&&_(y.displacementMap.channel),emissiveMapUv:Oe&&_(y.emissiveMap.channel),metalnessMapUv:b&&_(y.metalnessMap.channel),roughnessMapUv:M&&_(y.roughnessMap.channel),anisotropyMapUv:he&&_(y.anisotropyMap.channel),clearcoatMapUv:fe&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ve&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:it&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(y.sheenRoughnessMap.channel),specularMapUv:Ee&&_(y.specularMap.channel),specularColorMapUv:pe&&_(y.specularColorMap.channel),specularIntensityMapUv:Ge&&_(y.specularIntensityMap.channel),transmissionMapUv:et&&_(y.transmissionMap.channel),thicknessMapUv:pt&&_(y.thicknessMap.channel),alphaMapUv:ae&&_(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(me||F),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Ce,vertexUv2s:be,vertexUv3s:ct,pointsUvs:ee.isPoints===!0&&!!N.attributes.uv&&(we||ae),fog:!!L,useFog:y.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:ee.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:re,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:lt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:we&&y.map.isVideoTexture===!0&&rt.getTransfer(y.map.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===wn,flipSided:y.side===Bt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:le&&y.extensions.derivatives===!0,extensionFragDepth:le&&y.extensions.fragDepth===!0,extensionDrawBuffers:le&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:le&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:le&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)E.push(D),E.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(x(E,y),v(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function x(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function v(y,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function S(y){const E=g[y.type];let D;if(E){const H=hn[E];D=Qh.clone(H.uniforms)}else D=y.uniforms;return D}function R(y,E){let D;for(let H=0,ee=l.length;H<ee;H++){const L=l[H];if(L.cacheKey===E){D=L,++D.usedTimes;break}}return D===void 0&&(D=new pg(i,E,y,r),l.push(D)),D}function T(y){if(--y.usedTimes===0){const E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),y.destroy()}}function A(y){c.remove(y)}function k(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:R,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:k}}function xg(){let i=new WeakMap;function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function t(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function yg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function fc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function pc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,f,h,g,_,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function a(d,f,h,g,_,m){const p=o(d,f,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):t.push(p)}function c(d,f,h,g,_,m){const p=o(d,f,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,f){t.length>1&&t.sort(d||yg),n.length>1&&n.sort(f||fc),s.length>1&&s.sort(f||fc)}function u(){for(let d=e,f=i.length;d<f;d++){const h=i[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function Mg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new pc,i.set(n,[o])):s>=r.length?(o=new pc,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Sg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ze};break;case"SpotLight":t={position:new I,direction:new I,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function Eg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let wg=0;function bg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tg(i,e){const t=new Sg,n=Eg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new I);const r=new I,o=new vt,a=new vt;function c(u,d){let f=0,h=0,g=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let _=0,m=0,p=0,x=0,v=0,S=0,R=0,T=0,A=0,k=0,y=0;u.sort(bg);const E=d===!0?Math.PI:1;for(let H=0,ee=u.length;H<ee;H++){const L=u[H],N=L.color,W=L.intensity,$=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)f+=N.r*W*E,h+=N.g*W*E,g+=N.b*W*E;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(L.sh.coefficients[Y],W);y++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){const K=L.shadow,se=n.get(L);se.shadowBias=K.bias,se.shadowNormalBias=K.normalBias,se.shadowRadius=K.radius,se.shadowMapSize=K.mapSize,s.directionalShadow[_]=se,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=L.shadow.matrix,S++}s.directional[_]=Y,_++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(N).multiplyScalar(W*E),Y.distance=$,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,s.spot[p]=Y;const K=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,K.updateMatrices(L),L.castShadow&&k++),s.spotLightMatrix[p]=K.matrix,L.castShadow){const se=n.get(L);se.shadowBias=K.bias,se.shadowNormalBias=K.normalBias,se.shadowRadius=K.radius,se.shadowMapSize=K.mapSize,s.spotShadow[p]=se,s.spotShadowMap[p]=q,T++}p++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(N).multiplyScalar(W),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),s.rectArea[x]=Y,x++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity*E),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const K=L.shadow,se=n.get(L);se.shadowBias=K.bias,se.shadowNormalBias=K.normalBias,se.shadowRadius=K.radius,se.shadowMapSize=K.mapSize,se.shadowCameraNear=K.camera.near,se.shadowCameraFar=K.camera.far,s.pointShadow[m]=se,s.pointShadowMap[m]=q,s.pointShadowMatrix[m]=L.shadow.matrix,R++}s.point[m]=Y,m++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(W*E),Y.groundColor.copy(L.groundColor).multiplyScalar(W*E),s.hemi[v]=Y,v++}}x>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_FLOAT_1,s.rectAreaLTC2=oe.LTC_FLOAT_2):(s.rectAreaLTC1=oe.LTC_HALF_1,s.rectAreaLTC2=oe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_FLOAT_1,s.rectAreaLTC2=oe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=oe.LTC_HALF_1,s.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=h,s.ambient[2]=g;const D=s.hash;(D.directionalLength!==_||D.pointLength!==m||D.spotLength!==p||D.rectAreaLength!==x||D.hemiLength!==v||D.numDirectionalShadows!==S||D.numPointShadows!==R||D.numSpotShadows!==T||D.numSpotMaps!==A||D.numLightProbes!==y)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=x,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=T+A-k,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=k,s.numLightProbes=y,D.directionalLength=_,D.pointLength=m,D.spotLength=p,D.rectAreaLength=x,D.hemiLength=v,D.numDirectionalShadows=S,D.numPointShadows=R,D.numSpotShadows=T,D.numSpotMaps=A,D.numLightProbes=y,s.version=wg++)}function l(u,d){let f=0,h=0,g=0,_=0,m=0;const p=d.matrixWorldInverse;for(let x=0,v=u.length;x<v;x++){const S=u[x];if(S.isDirectionalLight){const R=s.directional[f];R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),f++}else if(S.isSpotLight){const R=s.spot[g];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),g++}else if(S.isRectAreaLight){const R=s.rectArea[_];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),a.identity(),o.copy(S.matrixWorld),o.premultiply(p),a.extractRotation(o),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const R=s.point[h];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(p),h++}else if(S.isHemisphereLight){const R=s.hemi[m];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function mc(i,e){const t=new Tg(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function o(d){n.push(d)}function a(d){s.push(d)}function c(d){t.setup(n,d)}function l(d){t.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Ag(i,e){let t=new WeakMap;function n(r,o=0){const a=t.get(r);let c;return a===void 0?(c=new mc(i,e),t.set(r,[c])):o>=a.length?(c=new mc(i,e),a.push(c)):c=a[o],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class Rg extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cg extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Lg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ig(i,e,t){let n=new La;const s=new ke,r=new ke,o=new dt,a=new Rg({depthPacking:dh}),c=new Cg,l={},u=t.maxTextureSize,d={[$n]:Bt,[Bt]:$n,[wn]:wn},f=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Lg,fragmentShader:Pg}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new en;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new P(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qc;let p=this.type;this.render=function(T,A,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=i.getRenderTarget(),E=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Wn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const ee=p!==Sn&&this.type===Sn,L=p===Sn&&this.type!==Sn;for(let N=0,W=T.length;N<W;N++){const $=T[N],q=$.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const Y=q.getFrameExtents();if(s.multiply(Y),r.copy(q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Y.x),s.x=r.x*Y.x,q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Y.y),s.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||ee===!0||L===!0){const se=this.type!==Sn?{minFilter:Ot,magFilter:Ot}:{};q.map!==null&&q.map.dispose(),q.map=new ui(s.x,s.y,se),q.map.texture.name=$.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const K=q.getViewportCount();for(let se=0;se<K;se++){const re=q.getViewport(se);o.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),H.viewport(o),q.updateMatrices($,se),n=q.getFrustum(),S(A,k,q.camera,$,this.type)}q.isPointLightShadow!==!0&&this.type===Sn&&x(q,k),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,E,D)};function x(T,A){const k=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ui(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,k,f,_,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,k,h,_,null)}function v(T,A,k,y){let E=null;const D=k.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)E=D;else if(E=k.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=E.uuid,ee=A.uuid;let L=l[H];L===void 0&&(L={},l[H]=L);let N=L[ee];N===void 0&&(N=E.clone(),L[ee]=N,A.addEventListener("dispose",R)),E=N}if(E.visible=A.visible,E.wireframe=A.wireframe,y===Sn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:d[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,k.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=i.properties.get(E);H.light=k}return E}function S(T,A,k,y,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Sn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,T.matrixWorld);const ee=e.update(T),L=T.material;if(Array.isArray(L)){const N=ee.groups;for(let W=0,$=N.length;W<$;W++){const q=N[W],Y=L[q.materialIndex];if(Y&&Y.visible){const K=v(T,Y,y,E);T.onBeforeShadow(i,T,A,k,ee,K,q),i.renderBufferDirect(k,null,ee,K,T,q),T.onAfterShadow(i,T,A,k,ee,K,q)}}}else if(L.visible){const N=v(T,L,y,E);T.onBeforeShadow(i,T,A,k,ee,N,null),i.renderBufferDirect(k,null,ee,N,T,null),T.onAfterShadow(i,T,A,k,ee,N,null)}}const H=T.children;for(let ee=0,L=H.length;ee<L;ee++)S(H[ee],A,k,y,E)}function R(T){T.target.removeEventListener("dispose",R);for(const k in l){const y=l[k],E=T.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}function Ug(i,e,t){const n=t.isWebGL2;function s(){let C=!1;const ce=new dt;let le=null;const Ce=new dt(0,0,0,0);return{setMask:function(be){le!==be&&!C&&(i.colorMask(be,be,be,be),le=be)},setLocked:function(be){C=be},setClear:function(be,ct,lt,bt,Ut){Ut===!0&&(be*=bt,ct*=bt,lt*=bt),ce.set(be,ct,lt,bt),Ce.equals(ce)===!1&&(i.clearColor(be,ct,lt,bt),Ce.copy(ce))},reset:function(){C=!1,le=null,Ce.set(-1,0,0,0)}}}function r(){let C=!1,ce=null,le=null,Ce=null;return{setTest:function(be){be?Ne(i.DEPTH_TEST):we(i.DEPTH_TEST)},setMask:function(be){ce!==be&&!C&&(i.depthMask(be),ce=be)},setFunc:function(be){if(le!==be){switch(be){case Gu:i.depthFunc(i.NEVER);break;case Hu:i.depthFunc(i.ALWAYS);break;case Vu:i.depthFunc(i.LESS);break;case Ks:i.depthFunc(i.LEQUAL);break;case Wu:i.depthFunc(i.EQUAL);break;case Xu:i.depthFunc(i.GEQUAL);break;case qu:i.depthFunc(i.GREATER);break;case $u:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=be}},setLocked:function(be){C=be},setClear:function(be){Ce!==be&&(i.clearDepth(be),Ce=be)},reset:function(){C=!1,ce=null,le=null,Ce=null}}}function o(){let C=!1,ce=null,le=null,Ce=null,be=null,ct=null,lt=null,bt=null,Ut=null;return{setTest:function(ut){C||(ut?Ne(i.STENCIL_TEST):we(i.STENCIL_TEST))},setMask:function(ut){ce!==ut&&!C&&(i.stencilMask(ut),ce=ut)},setFunc:function(ut,Dt,un){(le!==ut||Ce!==Dt||be!==un)&&(i.stencilFunc(ut,Dt,un),le=ut,Ce=Dt,be=un)},setOp:function(ut,Dt,un){(ct!==ut||lt!==Dt||bt!==un)&&(i.stencilOp(ut,Dt,un),ct=ut,lt=Dt,bt=un)},setLocked:function(ut){C=ut},setClear:function(ut){Ut!==ut&&(i.clearStencil(ut),Ut=ut)},reset:function(){C=!1,ce=null,le=null,Ce=null,be=null,ct=null,lt=null,bt=null,Ut=null}}}const a=new s,c=new r,l=new o,u=new WeakMap,d=new WeakMap;let f={},h={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,R=null,T=null,A=null,k=null,y=new Ze(0,0,0),E=0,D=!1,H=null,ee=null,L=null,N=null,W=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(K)[1]),q=Y>=1):K.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),q=Y>=2);let se=null,re={};const X=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),ue=new dt().fromArray(X),ye=new dt().fromArray(Q);function xe(C,ce,le,Ce){const be=new Uint8Array(4),ct=i.createTexture();i.bindTexture(C,ct),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let lt=0;lt<le;lt++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(ce,0,i.RGBA,1,1,Ce,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(ce+lt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return ct}const Ue={};Ue[i.TEXTURE_2D]=xe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ue[i.TEXTURE_CUBE_MAP]=xe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ue[i.TEXTURE_2D_ARRAY]=xe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ue[i.TEXTURE_3D]=xe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ne(i.DEPTH_TEST),c.setFunc(Ks),Oe(!1),b(Ka),Ne(i.CULL_FACE),me(Wn);function Ne(C){f[C]!==!0&&(i.enable(C),f[C]=!0)}function we(C){f[C]!==!1&&(i.disable(C),f[C]=!1)}function je(C,ce){return h[C]!==ce?(i.bindFramebuffer(C,ce),h[C]=ce,n&&(C===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ce),C===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ce)),!0):!1}function O(C,ce){let le=_,Ce=!1;if(C)if(le=g.get(ce),le===void 0&&(le=[],g.set(ce,le)),C.isWebGLMultipleRenderTargets){const be=C.texture;if(le.length!==be.length||le[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,lt=be.length;ct<lt;ct++)le[ct]=i.COLOR_ATTACHMENT0+ct;le.length=be.length,Ce=!0}}else le[0]!==i.COLOR_ATTACHMENT0&&(le[0]=i.COLOR_ATTACHMENT0,Ce=!0);else le[0]!==i.BACK&&(le[0]=i.BACK,Ce=!0);Ce&&(t.isWebGL2?i.drawBuffers(le):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(le))}function wt(C){return m!==C?(i.useProgram(C),m=C,!0):!1}const Se={[si]:i.FUNC_ADD,[Tu]:i.FUNC_SUBTRACT,[Au]:i.FUNC_REVERSE_SUBTRACT};if(n)Se[eo]=i.MIN,Se[to]=i.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(Se[eo]=C.MIN_EXT,Se[to]=C.MAX_EXT)}const Re={[Ru]:i.ZERO,[Cu]:i.ONE,[Lu]:i.SRC_COLOR,[da]:i.SRC_ALPHA,[Nu]:i.SRC_ALPHA_SATURATE,[Du]:i.DST_COLOR,[Iu]:i.DST_ALPHA,[Pu]:i.ONE_MINUS_SRC_COLOR,[fa]:i.ONE_MINUS_SRC_ALPHA,[ku]:i.ONE_MINUS_DST_COLOR,[Uu]:i.ONE_MINUS_DST_ALPHA,[Ou]:i.CONSTANT_COLOR,[Fu]:i.ONE_MINUS_CONSTANT_COLOR,[zu]:i.CONSTANT_ALPHA,[Bu]:i.ONE_MINUS_CONSTANT_ALPHA};function me(C,ce,le,Ce,be,ct,lt,bt,Ut,ut){if(C===Wn){p===!0&&(we(i.BLEND),p=!1);return}if(p===!1&&(Ne(i.BLEND),p=!0),C!==bu){if(C!==x||ut!==D){if((v!==si||T!==si)&&(i.blendEquation(i.FUNC_ADD),v=si,T=si),ut)switch(C){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Za:i.blendFunc(i.ONE,i.ONE);break;case Ja:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Za:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ja:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}S=null,R=null,A=null,k=null,y.set(0,0,0),E=0,x=C,D=ut}return}be=be||ce,ct=ct||le,lt=lt||Ce,(ce!==v||be!==T)&&(i.blendEquationSeparate(Se[ce],Se[be]),v=ce,T=be),(le!==S||Ce!==R||ct!==A||lt!==k)&&(i.blendFuncSeparate(Re[le],Re[Ce],Re[ct],Re[lt]),S=le,R=Ce,A=ct,k=lt),(bt.equals(y)===!1||Ut!==E)&&(i.blendColor(bt.r,bt.g,bt.b,Ut),y.copy(bt),E=Ut),x=C,D=!1}function ot(C,ce){C.side===wn?we(i.CULL_FACE):Ne(i.CULL_FACE);let le=C.side===Bt;ce&&(le=!le),Oe(le),C.blending===Oi&&C.transparent===!1?me(Wn):me(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),c.setFunc(C.depthFunc),c.setTest(C.depthTest),c.setMask(C.depthWrite),a.setMask(C.colorWrite);const Ce=C.stencilWrite;l.setTest(Ce),Ce&&(l.setMask(C.stencilWriteMask),l.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),l.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),F(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Ne(i.SAMPLE_ALPHA_TO_COVERAGE):we(i.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(C){H!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),H=C)}function b(C){C!==Eu?(Ne(i.CULL_FACE),C!==ee&&(C===Ka?i.cullFace(i.BACK):C===wu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):we(i.CULL_FACE),ee=C}function M(C){C!==L&&(q&&i.lineWidth(C),L=C)}function F(C,ce,le){C?(Ne(i.POLYGON_OFFSET_FILL),(N!==ce||W!==le)&&(i.polygonOffset(ce,le),N=ce,W=le)):we(i.POLYGON_OFFSET_FILL)}function Z(C){C?Ne(i.SCISSOR_TEST):we(i.SCISSOR_TEST)}function j(C){C===void 0&&(C=i.TEXTURE0+$-1),se!==C&&(i.activeTexture(C),se=C)}function J(C,ce,le){le===void 0&&(se===null?le=i.TEXTURE0+$-1:le=se);let Ce=re[le];Ce===void 0&&(Ce={type:void 0,texture:void 0},re[le]=Ce),(Ce.type!==C||Ce.texture!==ce)&&(se!==le&&(i.activeTexture(le),se=le),i.bindTexture(C,ce||Ue[C]),Ce.type=C,Ce.texture=ce)}function ge(){const C=re[se];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function he(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function fe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ae(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ve(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function te(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function it(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ye(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Fe(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ee(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function pe(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ge(C){ue.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),ue.copy(C))}function et(C){ye.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ye.copy(C))}function pt(C,ce){let le=d.get(ce);le===void 0&&(le=new WeakMap,d.set(ce,le));let Ce=le.get(C);Ce===void 0&&(Ce=i.getUniformBlockIndex(ce,C.name),le.set(C,Ce))}function Xe(C,ce){const Ce=d.get(ce).get(C);u.get(ce)!==Ce&&(i.uniformBlockBinding(ce,Ce,C.__bindingPointIndex),u.set(ce,Ce))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},se=null,re={},h={},g=new WeakMap,_=[],m=null,p=!1,x=null,v=null,S=null,R=null,T=null,A=null,k=null,y=new Ze(0,0,0),E=0,D=!1,H=null,ee=null,L=null,N=null,W=null,ue.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Ne,disable:we,bindFramebuffer:je,drawBuffers:O,useProgram:wt,setBlending:me,setMaterial:ot,setFlipSided:Oe,setCullFace:b,setLineWidth:M,setPolygonOffset:F,setScissorTest:Z,activeTexture:j,bindTexture:J,unbindTexture:ge,compressedTexImage2D:he,compressedTexImage3D:fe,texImage2D:Ee,texImage3D:pe,updateUBOMapping:pt,uniformBlockBinding:Xe,texStorage2D:Ye,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:Ve,compressedTexSubImage2D:te,compressedTexSubImage3D:it,scissor:Ge,viewport:et,reset:ae}}function Dg(i,e,t,n,s,r,o){const a=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,M){return h?new OffscreenCanvas(b,M):nr("canvas")}function _(b,M,F,Z){let j=1;if((b.width>Z||b.height>Z)&&(j=Z/Math.max(b.width,b.height)),j<1||M===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const J=M?tr:Math.floor,ge=J(j*b.width),he=J(j*b.height);d===void 0&&(d=g(ge,he));const fe=F?g(ge,he):d;return fe.width=ge,fe.height=he,fe.getContext("2d").drawImage(b,0,0,ge,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+ge+"x"+he+")."),fe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return ya(b.width)&&ya(b.height)}function p(b){return a?!1:b.wrapS!==an||b.wrapT!==an||b.minFilter!==Ot&&b.minFilter!==jt}function x(b,M){return b.generateMipmaps&&M&&b.minFilter!==Ot&&b.minFilter!==jt}function v(b){i.generateMipmap(b)}function S(b,M,F,Z,j=!1){if(a===!1)return M;if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let J=M;if(M===i.RED&&(F===i.FLOAT&&(J=i.R32F),F===i.HALF_FLOAT&&(J=i.R16F),F===i.UNSIGNED_BYTE&&(J=i.R8)),M===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(J=i.R8UI),F===i.UNSIGNED_SHORT&&(J=i.R16UI),F===i.UNSIGNED_INT&&(J=i.R32UI),F===i.BYTE&&(J=i.R8I),F===i.SHORT&&(J=i.R16I),F===i.INT&&(J=i.R32I)),M===i.RG&&(F===i.FLOAT&&(J=i.RG32F),F===i.HALF_FLOAT&&(J=i.RG16F),F===i.UNSIGNED_BYTE&&(J=i.RG8)),M===i.RGBA){const ge=j?Zs:rt.getTransfer(Z);F===i.FLOAT&&(J=i.RGBA32F),F===i.HALF_FLOAT&&(J=i.RGBA16F),F===i.UNSIGNED_BYTE&&(J=ge===ht?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function R(b,M,F){return x(b,F)===!0||b.isFramebufferTexture&&b.minFilter!==Ot&&b.minFilter!==jt?Math.log2(Math.max(M.width,M.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?M.mipmaps.length:1}function T(b){return b===Ot||b===no||b===Sr?i.NEAREST:i.LINEAR}function A(b){const M=b.target;M.removeEventListener("dispose",A),y(M),M.isVideoTexture&&u.delete(M)}function k(b){const M=b.target;M.removeEventListener("dispose",k),D(M)}function y(b){const M=n.get(b);if(M.__webglInit===void 0)return;const F=b.source,Z=f.get(F);if(Z){const j=Z[M.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(b),Object.keys(Z).length===0&&f.delete(F)}n.remove(b)}function E(b){const M=n.get(b);i.deleteTexture(M.__webglTexture);const F=b.source,Z=f.get(F);delete Z[M.__cacheKey],o.memory.textures--}function D(b){const M=b.texture,F=n.get(b),Z=n.get(M);if(Z.__webglTexture!==void 0&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(F.__webglFramebuffer[j]))for(let J=0;J<F.__webglFramebuffer[j].length;J++)i.deleteFramebuffer(F.__webglFramebuffer[j][J]);else i.deleteFramebuffer(F.__webglFramebuffer[j]);F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer[j])}else{if(Array.isArray(F.__webglFramebuffer))for(let j=0;j<F.__webglFramebuffer.length;j++)i.deleteFramebuffer(F.__webglFramebuffer[j]);else i.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&i.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&i.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let j=0;j<F.__webglColorRenderbuffer.length;j++)F.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(F.__webglColorRenderbuffer[j]);F.__webglDepthRenderbuffer&&i.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let j=0,J=M.length;j<J;j++){const ge=n.get(M[j]);ge.__webglTexture&&(i.deleteTexture(ge.__webglTexture),o.memory.textures--),n.remove(M[j])}n.remove(M),n.remove(b)}let H=0;function ee(){H=0}function L(){const b=H;return b>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),H+=1,b}function N(b){const M=[];return M.push(b.wrapS),M.push(b.wrapT),M.push(b.wrapR||0),M.push(b.magFilter),M.push(b.minFilter),M.push(b.anisotropy),M.push(b.internalFormat),M.push(b.format),M.push(b.type),M.push(b.generateMipmaps),M.push(b.premultiplyAlpha),M.push(b.flipY),M.push(b.unpackAlignment),M.push(b.colorSpace),M.join()}function W(b,M){const F=n.get(b);if(b.isVideoTexture&&ot(b),b.isRenderTargetTexture===!1&&b.version>0&&F.__version!==b.version){const Z=b.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(F,b,M);return}}t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+M)}function $(b,M){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ue(F,b,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+M)}function q(b,M){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ue(F,b,M);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+M)}function Y(b,M){const F=n.get(b);if(b.version>0&&F.__version!==b.version){ye(F,b,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+M)}const K={[ga]:i.REPEAT,[an]:i.CLAMP_TO_EDGE,[_a]:i.MIRRORED_REPEAT},se={[Ot]:i.NEAREST,[no]:i.NEAREST_MIPMAP_NEAREST,[Sr]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[nh]:i.LINEAR_MIPMAP_NEAREST,[cs]:i.LINEAR_MIPMAP_LINEAR},re={[ph]:i.NEVER,[yh]:i.ALWAYS,[mh]:i.LESS,[rl]:i.LEQUAL,[gh]:i.EQUAL,[xh]:i.GEQUAL,[_h]:i.GREATER,[vh]:i.NOTEQUAL};function X(b,M,F){if(F?(i.texParameteri(b,i.TEXTURE_WRAP_S,K[M.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,K[M.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,K[M.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,se[M.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,se[M.minFilter])):(i.texParameteri(b,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(b,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==an||M.wrapT!==an)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(b,i.TEXTURE_MAG_FILTER,T(M.magFilter)),i.texParameteri(b,i.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==Ot&&M.minFilter!==jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,re[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Z=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Ot||M.minFilter!==Sr&&M.minFilter!==cs||M.type===Vn&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===ls&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(b,Z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function Q(b,M){let F=!1;b.__webglInit===void 0&&(b.__webglInit=!0,M.addEventListener("dispose",A));const Z=M.source;let j=f.get(Z);j===void 0&&(j={},f.set(Z,j));const J=N(M);if(J!==b.__cacheKey){j[J]===void 0&&(j[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,F=!0),j[J].usedTimes++;const ge=j[b.__cacheKey];ge!==void 0&&(j[b.__cacheKey].usedTimes--,ge.usedTimes===0&&E(M)),b.__cacheKey=J,b.__webglTexture=j[J].texture}return F}function ue(b,M,F){let Z=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=i.TEXTURE_3D);const j=Q(b,M),J=M.source;t.bindTexture(Z,b.__webglTexture,i.TEXTURE0+F);const ge=n.get(J);if(J.version!==ge.__version||j===!0){t.activeTexture(i.TEXTURE0+F);const he=rt.getPrimaries(rt.workingColorSpace),fe=M.colorSpace===Jt?null:rt.getPrimaries(M.colorSpace),Ae=M.colorSpace===Jt||he===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Ve=p(M)&&m(M.image)===!1;let te=_(M.image,Ve,!1,s.maxTextureSize);te=Oe(M,te);const it=m(te)||a,Ye=r.convert(M.format,M.colorSpace);let Fe=r.convert(M.type),Ee=S(M.internalFormat,Ye,Fe,M.colorSpace,M.isVideoTexture);X(Z,M,it);let pe;const Ge=M.mipmaps,et=a&&M.isVideoTexture!==!0&&Ee!==nl,pt=ge.__version===void 0||j===!0,Xe=R(M,te,it);if(M.isDepthTexture)Ee=i.DEPTH_COMPONENT,a?M.type===Vn?Ee=i.DEPTH_COMPONENT32F:M.type===Hn?Ee=i.DEPTH_COMPONENT24:M.type===ai?Ee=i.DEPTH24_STENCIL8:Ee=i.DEPTH_COMPONENT16:M.type===Vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===oi&&Ee===i.DEPTH_COMPONENT&&M.type!==ba&&M.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Hn,Fe=r.convert(M.type)),M.format===Gi&&Ee===i.DEPTH_COMPONENT&&(Ee=i.DEPTH_STENCIL,M.type!==ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=ai,Fe=r.convert(M.type))),pt&&(et?t.texStorage2D(i.TEXTURE_2D,1,Ee,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,Ee,te.width,te.height,0,Ye,Fe,null));else if(M.isDataTexture)if(Ge.length>0&&it){et&&pt&&t.texStorage2D(i.TEXTURE_2D,Xe,Ee,Ge[0].width,Ge[0].height);for(let ae=0,C=Ge.length;ae<C;ae++)pe=Ge[ae],et?t.texSubImage2D(i.TEXTURE_2D,ae,0,0,pe.width,pe.height,Ye,Fe,pe.data):t.texImage2D(i.TEXTURE_2D,ae,Ee,pe.width,pe.height,0,Ye,Fe,pe.data);M.generateMipmaps=!1}else et?(pt&&t.texStorage2D(i.TEXTURE_2D,Xe,Ee,te.width,te.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,te.width,te.height,Ye,Fe,te.data)):t.texImage2D(i.TEXTURE_2D,0,Ee,te.width,te.height,0,Ye,Fe,te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){et&&pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Xe,Ee,Ge[0].width,Ge[0].height,te.depth);for(let ae=0,C=Ge.length;ae<C;ae++)pe=Ge[ae],M.format!==on?Ye!==null?et?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,te.depth,Ye,pe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ae,Ee,pe.width,pe.height,te.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,te.depth,Ye,Fe,pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ae,Ee,pe.width,pe.height,te.depth,0,Ye,Fe,pe.data)}else{et&&pt&&t.texStorage2D(i.TEXTURE_2D,Xe,Ee,Ge[0].width,Ge[0].height);for(let ae=0,C=Ge.length;ae<C;ae++)pe=Ge[ae],M.format!==on?Ye!==null?et?t.compressedTexSubImage2D(i.TEXTURE_2D,ae,0,0,pe.width,pe.height,Ye,pe.data):t.compressedTexImage2D(i.TEXTURE_2D,ae,Ee,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?t.texSubImage2D(i.TEXTURE_2D,ae,0,0,pe.width,pe.height,Ye,Fe,pe.data):t.texImage2D(i.TEXTURE_2D,ae,Ee,pe.width,pe.height,0,Ye,Fe,pe.data)}else if(M.isDataArrayTexture)et?(pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Xe,Ee,te.width,te.height,te.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Ye,Fe,te.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,te.width,te.height,te.depth,0,Ye,Fe,te.data);else if(M.isData3DTexture)et?(pt&&t.texStorage3D(i.TEXTURE_3D,Xe,Ee,te.width,te.height,te.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Ye,Fe,te.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,te.width,te.height,te.depth,0,Ye,Fe,te.data);else if(M.isFramebufferTexture){if(pt)if(et)t.texStorage2D(i.TEXTURE_2D,Xe,Ee,te.width,te.height);else{let ae=te.width,C=te.height;for(let ce=0;ce<Xe;ce++)t.texImage2D(i.TEXTURE_2D,ce,Ee,ae,C,0,Ye,Fe,null),ae>>=1,C>>=1}}else if(Ge.length>0&&it){et&&pt&&t.texStorage2D(i.TEXTURE_2D,Xe,Ee,Ge[0].width,Ge[0].height);for(let ae=0,C=Ge.length;ae<C;ae++)pe=Ge[ae],et?t.texSubImage2D(i.TEXTURE_2D,ae,0,0,Ye,Fe,pe):t.texImage2D(i.TEXTURE_2D,ae,Ee,Ye,Fe,pe);M.generateMipmaps=!1}else et?(pt&&t.texStorage2D(i.TEXTURE_2D,Xe,Ee,te.width,te.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ye,Fe,te)):t.texImage2D(i.TEXTURE_2D,0,Ee,Ye,Fe,te);x(M,it)&&v(Z),ge.__version=J.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function ye(b,M,F){if(M.image.length!==6)return;const Z=Q(b,M),j=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+F);const J=n.get(j);if(j.version!==J.__version||Z===!0){t.activeTexture(i.TEXTURE0+F);const ge=rt.getPrimaries(rt.workingColorSpace),he=M.colorSpace===Jt?null:rt.getPrimaries(M.colorSpace),fe=M.colorSpace===Jt||ge===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ae=M.isCompressedTexture||M.image[0].isCompressedTexture,Ve=M.image[0]&&M.image[0].isDataTexture,te=[];for(let ae=0;ae<6;ae++)!Ae&&!Ve?te[ae]=_(M.image[ae],!1,!0,s.maxCubemapSize):te[ae]=Ve?M.image[ae].image:M.image[ae],te[ae]=Oe(M,te[ae]);const it=te[0],Ye=m(it)||a,Fe=r.convert(M.format,M.colorSpace),Ee=r.convert(M.type),pe=S(M.internalFormat,Fe,Ee,M.colorSpace),Ge=a&&M.isVideoTexture!==!0,et=J.__version===void 0||Z===!0;let pt=R(M,it,Ye);X(i.TEXTURE_CUBE_MAP,M,Ye);let Xe;if(Ae){Ge&&et&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pt,pe,it.width,it.height);for(let ae=0;ae<6;ae++){Xe=te[ae].mipmaps;for(let C=0;C<Xe.length;C++){const ce=Xe[C];M.format!==on?Fe!==null?Ge?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C,0,0,ce.width,ce.height,Fe,ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C,pe,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C,0,0,ce.width,ce.height,Fe,Ee,ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C,pe,ce.width,ce.height,0,Fe,Ee,ce.data)}}}else{Xe=M.mipmaps,Ge&&et&&(Xe.length>0&&pt++,t.texStorage2D(i.TEXTURE_CUBE_MAP,pt,pe,te[0].width,te[0].height));for(let ae=0;ae<6;ae++)if(Ve){Ge?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,te[ae].width,te[ae].height,Fe,Ee,te[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,te[ae].width,te[ae].height,0,Fe,Ee,te[ae].data);for(let C=0;C<Xe.length;C++){const le=Xe[C].image[ae].image;Ge?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C+1,0,0,le.width,le.height,Fe,Ee,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C+1,pe,le.width,le.height,0,Fe,Ee,le.data)}}else{Ge?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Fe,Ee,te[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,pe,Fe,Ee,te[ae]);for(let C=0;C<Xe.length;C++){const ce=Xe[C];Ge?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C+1,0,0,Fe,Ee,ce.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,C+1,pe,Fe,Ee,ce.image[ae])}}}x(M,Ye)&&v(i.TEXTURE_CUBE_MAP),J.__version=j.version,M.onUpdate&&M.onUpdate(M)}b.__version=M.version}function xe(b,M,F,Z,j,J){const ge=r.convert(F.format,F.colorSpace),he=r.convert(F.type),fe=S(F.internalFormat,ge,he,F.colorSpace);if(!n.get(M).__hasExternalTextures){const Ve=Math.max(1,M.width>>J),te=Math.max(1,M.height>>J);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,J,fe,Ve,te,M.depth,0,ge,he,null):t.texImage2D(j,J,fe,Ve,te,0,ge,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),me(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,j,n.get(F).__webglTexture,0,Re(M)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,j,n.get(F).__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(b,M,F){if(i.bindRenderbuffer(i.RENDERBUFFER,b),M.depthBuffer&&!M.stencilBuffer){let Z=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(F||me(M)){const j=M.depthTexture;j&&j.isDepthTexture&&(j.type===Vn?Z=i.DEPTH_COMPONENT32F:j.type===Hn&&(Z=i.DEPTH_COMPONENT24));const J=Re(M);me(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,Z,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,J,Z,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,b)}else if(M.depthBuffer&&M.stencilBuffer){const Z=Re(M);F&&me(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,M.width,M.height):me(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,b)}else{const Z=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let j=0;j<Z.length;j++){const J=Z[j],ge=r.convert(J.format,J.colorSpace),he=r.convert(J.type),fe=S(J.internalFormat,ge,he,J.colorSpace),Ae=Re(M);F&&me(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,fe,M.width,M.height):me(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,fe,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,fe,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ne(b,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),W(M.depthTexture,0);const Z=n.get(M.depthTexture).__webglTexture,j=Re(M);if(M.depthTexture.format===oi)me(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(M.depthTexture.format===Gi)me(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function we(b){const M=n.get(b),F=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!M.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ne(M.__webglFramebuffer,b)}else if(F){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]=i.createRenderbuffer(),Ue(M.__webglDepthbuffer[Z],b,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Ue(M.__webglDepthbuffer,b,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(b,M,F){const Z=n.get(b);M!==void 0&&xe(Z.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&we(b)}function O(b){const M=b.texture,F=n.get(b),Z=n.get(M);b.addEventListener("dispose",k),b.isWebGLMultipleRenderTargets!==!0&&(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=M.version,o.memory.textures++);const j=b.isWebGLCubeRenderTarget===!0,J=b.isWebGLMultipleRenderTargets===!0,ge=m(b)||a;if(j){F.__webglFramebuffer=[];for(let he=0;he<6;he++)if(a&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer[he]=[];for(let fe=0;fe<M.mipmaps.length;fe++)F.__webglFramebuffer[he][fe]=i.createFramebuffer()}else F.__webglFramebuffer[he]=i.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){F.__webglFramebuffer=[];for(let he=0;he<M.mipmaps.length;he++)F.__webglFramebuffer[he]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(J)if(s.drawBuffers){const he=b.texture;for(let fe=0,Ae=he.length;fe<Ae;fe++){const Ve=n.get(he[fe]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&me(b)===!1){const he=J?M:[M];F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let fe=0;fe<he.length;fe++){const Ae=he[fe];F.__webglColorRenderbuffer[fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[fe]);const Ve=r.convert(Ae.format,Ae.colorSpace),te=r.convert(Ae.type),it=S(Ae.internalFormat,Ve,te,Ae.colorSpace,b.isXRRenderTarget===!0),Ye=Re(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye,it,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,F.__webglColorRenderbuffer[fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Ue(F.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),X(i.TEXTURE_CUBE_MAP,M,ge);for(let he=0;he<6;he++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)xe(F.__webglFramebuffer[he][fe],b,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,fe);else xe(F.__webglFramebuffer[he],b,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);x(M,ge)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(J){const he=b.texture;for(let fe=0,Ae=he.length;fe<Ae;fe++){const Ve=he[fe],te=n.get(Ve);t.bindTexture(i.TEXTURE_2D,te.__webglTexture),X(i.TEXTURE_2D,Ve,ge),xe(F.__webglFramebuffer,b,Ve,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,0),x(Ve,ge)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?he=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,Z.__webglTexture),X(he,M,ge),a&&M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)xe(F.__webglFramebuffer[fe],b,M,i.COLOR_ATTACHMENT0,he,fe);else xe(F.__webglFramebuffer,b,M,i.COLOR_ATTACHMENT0,he,0);x(M,ge)&&v(he),t.unbindTexture()}b.depthBuffer&&we(b)}function wt(b){const M=m(b)||a,F=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let Z=0,j=F.length;Z<j;Z++){const J=F[Z];if(x(J,M)){const ge=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,he=n.get(J).__webglTexture;t.bindTexture(ge,he),v(ge),t.unbindTexture()}}}function Se(b){if(a&&b.samples>0&&me(b)===!1){const M=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],F=b.width,Z=b.height;let j=i.COLOR_BUFFER_BIT;const J=[],ge=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(b),fe=b.isWebGLMultipleRenderTargets===!0;if(fe)for(let Ae=0;Ae<M.length;Ae++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Ae=0;Ae<M.length;Ae++){J.push(i.COLOR_ATTACHMENT0+Ae),b.depthBuffer&&J.push(ge);const Ve=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(Ve===!1&&(b.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),fe&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[Ae]),Ve===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ge]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ge])),fe){const te=n.get(M[Ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,F,Z,0,0,F,Z,j,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),fe)for(let Ae=0;Ae<M.length;Ae++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,he.__webglColorRenderbuffer[Ae]);const Ve=n.get(M[Ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,Ve,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Re(b){return Math.min(s.maxSamples,b.samples)}function me(b){const M=n.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ot(b){const M=o.render.frame;u.get(b)!==M&&(u.set(b,M),b.update())}function Oe(b,M){const F=b.colorSpace,Z=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===xa||F!==An&&F!==Jt&&(rt.getTransfer(F)===ht?a===!1?e.has("EXT_sRGB")===!0&&Z===on?(b.format=xa,b.minFilter=jt,b.generateMipmaps=!1):M=ol.sRGBToLinear(M):(Z!==on||j!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),M}this.allocateTextureUnit=L,this.resetTextureUnits=ee,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=je,this.setupRenderTarget=O,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=me}function kg(i,e,t){const n=t.isWebGL2;function s(r,o=Jt){let a;const c=rt.getTransfer(o);if(r===qn)return i.UNSIGNED_BYTE;if(r===Zc)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Jc)return i.UNSIGNED_SHORT_5_5_5_1;if(r===ih)return i.BYTE;if(r===sh)return i.SHORT;if(r===ba)return i.UNSIGNED_SHORT;if(r===Kc)return i.INT;if(r===Hn)return i.UNSIGNED_INT;if(r===Vn)return i.FLOAT;if(r===ls)return n?i.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===rh)return i.ALPHA;if(r===on)return i.RGBA;if(r===ah)return i.LUMINANCE;if(r===oh)return i.LUMINANCE_ALPHA;if(r===oi)return i.DEPTH_COMPONENT;if(r===Gi)return i.DEPTH_STENCIL;if(r===xa)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===ch)return i.RED;if(r===Qc)return i.RED_INTEGER;if(r===lh)return i.RG;if(r===el)return i.RG_INTEGER;if(r===tl)return i.RGBA_INTEGER;if(r===Er||r===wr||r===br||r===Tr)if(c===ht)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Er)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===wr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===br)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Tr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Er)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===wr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===br)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Tr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===io||r===so||r===ro||r===ao)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===io)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===so)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ro)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ao)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===nl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===oo||r===co)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===oo)return c===ht?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===co)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===lo||r===uo||r===ho||r===fo||r===po||r===mo||r===go||r===_o||r===vo||r===xo||r===yo||r===Mo||r===So||r===Eo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===lo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===uo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ho)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===fo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===po)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===mo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===go)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===_o)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===vo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===yo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Mo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===So)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Eo)return c===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ar||r===wo||r===bo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Ar)return c===ht?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===wo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===bo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===uh||r===To||r===Ao||r===Ro)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Ar)return a.COMPRESSED_RED_RGTC1_EXT;if(r===To)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ao)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ro)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ai?n?i.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Ng extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _e extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Og={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _e,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _e,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _e,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;l.inputState.pinching&&f>h+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Og)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _e;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Fg extends Vi{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const x=[],v=[],S=new ke;let R=null;const T=new Zt;T.layers.enable(1),T.viewport=new dt;const A=new Zt;A.layers.enable(2),A.viewport=new dt;const k=[T,A],y=new Ng;y.layers.enable(1),y.layers.enable(2);let E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=x[X];return Q===void 0&&(Q=new Kr,x[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=x[X];return Q===void 0&&(Q=new Kr,x[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=x[X];return Q===void 0&&(Q=new Kr,x[X]=Q),Q.getHandSpace()};function H(X){const Q=v.indexOf(X.inputSource);if(Q===-1)return;const ue=x[Q];ue!==void 0&&(ue.update(X.inputSource,X.frame,l||o),ue.dispatchEvent({type:X.type,data:X.inputSource}))}function ee(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",L);for(let X=0;X<x.length;X++){const Q=v[X];Q!==null&&(v[X]=null,x[X].disconnect(Q))}E=null,D=null,e.setRenderTarget(m),h=null,f=null,d=null,s=null,p=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Q={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),p=new ui(h.framebufferWidth,h.framebufferHeight,{format:on,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Q=null,ue=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=_.stencil?Gi:oi,ue=_.stencil?ai:Hn);const xe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=new XRWebGLBinding(s,t),f=d.createProjectionLayer(xe),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new ui(f.textureWidth,f.textureHeight,{format:on,type:qn,depthTexture:new vl(f.textureWidth,f.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ue=e.properties.get(p);Ue.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(X){for(let Q=0;Q<X.removed.length;Q++){const ue=X.removed[Q],ye=v.indexOf(ue);ye>=0&&(v[ye]=null,x[ye].disconnect(ue))}for(let Q=0;Q<X.added.length;Q++){const ue=X.added[Q];let ye=v.indexOf(ue);if(ye===-1){for(let Ue=0;Ue<x.length;Ue++)if(Ue>=v.length){v.push(ue),ye=Ue;break}else if(v[Ue]===null){v[Ue]=ue,ye=Ue;break}if(ye===-1)break}const xe=x[ye];xe&&xe.connect(ue)}}const N=new I,W=new I;function $(X,Q,ue){N.setFromMatrixPosition(Q.matrixWorld),W.setFromMatrixPosition(ue.matrixWorld);const ye=N.distanceTo(W),xe=Q.projectionMatrix.elements,Ue=ue.projectionMatrix.elements,Ne=xe[14]/(xe[10]-1),we=xe[14]/(xe[10]+1),je=(xe[9]+1)/xe[5],O=(xe[9]-1)/xe[5],wt=(xe[8]-1)/xe[0],Se=(Ue[8]+1)/Ue[0],Re=Ne*wt,me=Ne*Se,ot=ye/(-wt+Se),Oe=ot*-wt;Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Oe),X.translateZ(ot),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const b=Ne+ot,M=we+ot,F=Re-Oe,Z=me+(ye-Oe),j=je*we/M*b,J=O*we/M*b;X.projectionMatrix.makePerspective(F,Z,j,J,b,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function q(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;y.near=A.near=T.near=X.near,y.far=A.far=T.far=X.far,(E!==y.near||D!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,D=y.far);const Q=X.parent,ue=y.cameras;q(y,Q);for(let ye=0;ye<ue.length;ye++)q(ue[ye],Q);ue.length===2?$(y,T,A):y.projectionMatrix.copy(T.projectionMatrix),Y(X,y,Q)};function Y(X,Q,ue){ue===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(ue.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=us*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=X)};let K=null;function se(X,Q){if(u=Q.getViewerPose(l||o),g=Q,u!==null){const ue=u.views;h!==null&&(e.setRenderTargetFramebuffer(p,h.framebuffer),e.setRenderTarget(p));let ye=!1;ue.length!==y.cameras.length&&(y.cameras.length=0,ye=!0);for(let xe=0;xe<ue.length;xe++){const Ue=ue[xe];let Ne=null;if(h!==null)Ne=h.getViewport(Ue);else{const je=d.getViewSubImage(f,Ue);Ne=je.viewport,xe===0&&(e.setRenderTargetTextures(p,je.colorTexture,f.ignoreDepthValues?void 0:je.depthStencilTexture),e.setRenderTarget(p))}let we=k[xe];we===void 0&&(we=new Zt,we.layers.enable(xe),we.viewport=new dt,k[xe]=we),we.matrix.fromArray(Ue.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Ue.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),xe===0&&(y.matrix.copy(we.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ye===!0&&y.cameras.push(we)}}for(let ue=0;ue<x.length;ue++){const ye=v[ue],xe=x[ue];ye!==null&&xe!==void 0&&xe.update(ye,Q,l||o)}K&&K(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const re=new _l;re.setAnimationLoop(se),this.setAnimationLoop=function(X){K=X},this.dispose=function(){}}}function zg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,pl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,v,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Bg(i,e,t,n){let s={},r={},o=[];const a=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,v){const S=v.program;n.uniformBlockBinding(x,S)}function l(x,v){let S=s[x.id];S===void 0&&(g(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",m));const R=v.program;n.updateUBOMapping(x,R);const T=e.render.frame;r[x.id]!==T&&(f(x),r[x.id]=T)}function u(x){const v=d();x.__bindingPointIndex=v;const S=i.createBuffer(),R=x.__size,T=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const v=s[x.id],S=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,A=S.length;T<A;T++){const k=Array.isArray(S[T])?S[T]:[S[T]];for(let y=0,E=k.length;y<E;y++){const D=k[y];if(h(D,T,y,R)===!0){const H=D.__offset,ee=Array.isArray(D.value)?D.value:[D.value];let L=0;for(let N=0;N<ee.length;N++){const W=ee[N],$=_(W);typeof W=="number"||typeof W=="boolean"?(D.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,H+L,D.__data)):W.isMatrix3?(D.__data[0]=W.elements[0],D.__data[1]=W.elements[1],D.__data[2]=W.elements[2],D.__data[3]=0,D.__data[4]=W.elements[3],D.__data[5]=W.elements[4],D.__data[6]=W.elements[5],D.__data[7]=0,D.__data[8]=W.elements[6],D.__data[9]=W.elements[7],D.__data[10]=W.elements[8],D.__data[11]=0):(W.toArray(D.__data,L),L+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(x,v,S,R){const T=x.value,A=v+"_"+S;if(R[A]===void 0)return typeof T=="number"||typeof T=="boolean"?R[A]=T:R[A]=T.clone(),!0;{const k=R[A];if(typeof T=="number"||typeof T=="boolean"){if(k!==T)return R[A]=T,!0}else if(k.equals(T)===!1)return k.copy(T),!0}return!1}function g(x){const v=x.uniforms;let S=0;const R=16;for(let A=0,k=v.length;A<k;A++){const y=Array.isArray(v[A])?v[A]:[v[A]];for(let E=0,D=y.length;E<D;E++){const H=y[E],ee=Array.isArray(H.value)?H.value:[H.value];for(let L=0,N=ee.length;L<N;L++){const W=ee[L],$=_(W),q=S%R;q!==0&&R-q<$.boundary&&(S+=R-q),H.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=$.storage}}}const T=S%R;return T>0&&(S+=R-T),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function m(x){const v=x.target;v.removeEventListener("dispose",m);const S=o.indexOf(v.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class wl{constructor(e={}){const{canvas:t=kh(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;const h=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ct,this._useLegacyLights=!1,this.toneMapping=Xn,this.toneMappingExposure=1;const v=this;let S=!1,R=0,T=0,A=null,k=-1,y=null;const E=new dt,D=new dt;let H=null;const ee=new Ze(0);let L=0,N=t.width,W=t.height,$=1,q=null,Y=null;const K=new dt(0,0,N,W),se=new dt(0,0,N,W);let re=!1;const X=new La;let Q=!1,ue=!1,ye=null;const xe=new vt,Ue=new ke,Ne=new I,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function je(){return A===null?$:1}let O=n;function wt(w,U){for(let G=0;G<w.length;G++){const V=w[G],z=t.getContext(V,U);if(z!==null)return z}return null}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wa}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",ce,!1),O===null){const U=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&U.shift(),O=wt(U,w),O===null)throw wt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Se,Re,me,ot,Oe,b,M,F,Z,j,J,ge,he,fe,Ae,Ve,te,it,Ye,Fe,Ee,pe,Ge,et;function pt(){Se=new Kp(O),Re=new Wp(O,Se,e),Se.init(Re),pe=new kg(O,Se,Re),me=new Ug(O,Se,Re),ot=new Qp(O),Oe=new xg,b=new Dg(O,Se,me,Oe,Re,pe,ot),M=new qp(v),F=new jp(v),Z=new ad(O,Re),Ge=new Hp(O,Se,Z,Re),j=new Zp(O,Z,ot,Ge),J=new im(O,j,Z,ot),Ye=new nm(O,Re,b),Ve=new Xp(Oe),ge=new vg(v,M,F,Se,Re,Ge,Ve),he=new zg(v,Oe),fe=new Mg,Ae=new Ag(Se,Re),it=new Gp(v,M,F,me,J,f,c),te=new Ig(v,J,Re),et=new Bg(O,ot,Re,me),Fe=new Vp(O,Se,ot,Re),Ee=new Jp(O,Se,ot,Re),ot.programs=ge.programs,v.capabilities=Re,v.extensions=Se,v.properties=Oe,v.renderLists=fe,v.shadowMap=te,v.state=me,v.info=ot}pt();const Xe=new Fg(v,O);this.xr=Xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const w=Se.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Se.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(w){w!==void 0&&($=w,this.setSize(N,W,!1))},this.getSize=function(w){return w.set(N,W)},this.setSize=function(w,U,G=!0){if(Xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=w,W=U,t.width=Math.floor(w*$),t.height=Math.floor(U*$),G===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(N*$,W*$).floor()},this.setDrawingBufferSize=function(w,U,G){N=w,W=U,$=G,t.width=Math.floor(w*G),t.height=Math.floor(U*G),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(E)},this.getViewport=function(w){return w.copy(K)},this.setViewport=function(w,U,G,V){w.isVector4?K.set(w.x,w.y,w.z,w.w):K.set(w,U,G,V),me.viewport(E.copy(K).multiplyScalar($).floor())},this.getScissor=function(w){return w.copy(se)},this.setScissor=function(w,U,G,V){w.isVector4?se.set(w.x,w.y,w.z,w.w):se.set(w,U,G,V),me.scissor(D.copy(se).multiplyScalar($).floor())},this.getScissorTest=function(){return re},this.setScissorTest=function(w){me.setScissorTest(re=w)},this.setOpaqueSort=function(w){q=w},this.setTransparentSort=function(w){Y=w},this.getClearColor=function(w){return w.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor.apply(it,arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha.apply(it,arguments)},this.clear=function(w=!0,U=!0,G=!0){let V=0;if(w){let z=!1;if(A!==null){const de=A.texture.format;z=de===tl||de===el||de===Qc}if(z){const de=A.texture.type,Me=de===qn||de===Hn||de===ba||de===ai||de===Zc||de===Jc,Te=it.getClearColor(),Pe=it.getClearAlpha(),We=Te.r,ze=Te.g,Be=Te.b;Me?(h[0]=We,h[1]=ze,h[2]=Be,h[3]=Pe,O.clearBufferuiv(O.COLOR,0,h)):(g[0]=We,g[1]=ze,g[2]=Be,g[3]=Pe,O.clearBufferiv(O.COLOR,0,g))}else V|=O.COLOR_BUFFER_BIT}U&&(V|=O.DEPTH_BUFFER_BIT),G&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),fe.dispose(),Ae.dispose(),Oe.dispose(),M.dispose(),F.dispose(),J.dispose(),Ge.dispose(),et.dispose(),ge.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",Ut),Xe.removeEventListener("sessionend",ut),ye&&(ye.dispose(),ye=null),Dt.stop()};function ae(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=ot.autoReset,U=te.enabled,G=te.autoUpdate,V=te.needsUpdate,z=te.type;pt(),ot.autoReset=w,te.enabled=U,te.autoUpdate=G,te.needsUpdate=V,te.type=z}function ce(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function le(w){const U=w.target;U.removeEventListener("dispose",le),Ce(U)}function Ce(w){be(w),Oe.remove(w)}function be(w){const U=Oe.get(w).programs;U!==void 0&&(U.forEach(function(G){ge.releaseProgram(G)}),w.isShaderMaterial&&ge.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,G,V,z,de){U===null&&(U=we);const Me=z.isMesh&&z.matrixWorld.determinant()<0,Te=Hl(w,U,G,V,z);me.setMaterial(V,Me);let Pe=G.index,We=1;if(V.wireframe===!0){if(Pe=j.getWireframeAttribute(G),Pe===void 0)return;We=2}const ze=G.drawRange,Be=G.attributes.position;let gt=ze.start*We,Vt=(ze.start+ze.count)*We;de!==null&&(gt=Math.max(gt,de.start*We),Vt=Math.min(Vt,(de.start+de.count)*We)),Pe!==null?(gt=Math.max(gt,0),Vt=Math.min(Vt,Pe.count)):Be!=null&&(gt=Math.max(gt,0),Vt=Math.min(Vt,Be.count));const Tt=Vt-gt;if(Tt<0||Tt===1/0)return;Ge.setup(z,V,Te,G,Pe);let mn,ft=Fe;if(Pe!==null&&(mn=Z.get(Pe),ft=Ee,ft.setIndex(mn)),z.isMesh)V.wireframe===!0?(me.setLineWidth(V.wireframeLinewidth*je()),ft.setMode(O.LINES)):ft.setMode(O.TRIANGLES);else if(z.isLine){let qe=V.linewidth;qe===void 0&&(qe=1),me.setLineWidth(qe*je()),z.isLineSegments?ft.setMode(O.LINES):z.isLineLoop?ft.setMode(O.LINE_LOOP):ft.setMode(O.LINE_STRIP)}else z.isPoints?ft.setMode(O.POINTS):z.isSprite&&ft.setMode(O.TRIANGLES);if(z.isBatchedMesh)ft.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)ft.renderInstances(gt,Tt,z.count);else if(G.isInstancedBufferGeometry){const qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,fr=Math.min(G.instanceCount,qe);ft.renderInstances(gt,Tt,fr)}else ft.render(gt,Tt)};function ct(w,U,G){w.transparent===!0&&w.side===wn&&w.forceSinglePass===!1?(w.side=Bt,w.needsUpdate=!0,ps(w,U,G),w.side=$n,w.needsUpdate=!0,ps(w,U,G),w.side=wn):ps(w,U,G)}this.compile=function(w,U,G=null){G===null&&(G=w),m=Ae.get(G),m.init(),x.push(m),G.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),w!==G&&w.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(v._useLegacyLights);const V=new Set;return w.traverse(function(z){const de=z.material;if(de)if(Array.isArray(de))for(let Me=0;Me<de.length;Me++){const Te=de[Me];ct(Te,G,z),V.add(Te)}else ct(de,G,z),V.add(de)}),x.pop(),m=null,V},this.compileAsync=function(w,U,G=null){const V=this.compile(w,U,G);return new Promise(z=>{function de(){if(V.forEach(function(Me){Oe.get(Me).currentProgram.isReady()&&V.delete(Me)}),V.size===0){z(w);return}setTimeout(de,10)}Se.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let lt=null;function bt(w){lt&&lt(w)}function Ut(){Dt.stop()}function ut(){Dt.start()}const Dt=new _l;Dt.setAnimationLoop(bt),typeof self<"u"&&Dt.setContext(self),this.setAnimationLoop=function(w){lt=w,Xe.setAnimationLoop(w),w===null?Dt.stop():Dt.start()},Xe.addEventListener("sessionstart",Ut),Xe.addEventListener("sessionend",ut),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(U),U=Xe.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,U,A),m=Ae.get(w,x.length),m.init(),x.push(m),xe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(xe),ue=this.localClippingEnabled,Q=Ve.init(this.clippingPlanes,ue),_=fe.get(w,p.length),_.init(),p.push(_),un(w,U,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,Y),this.info.render.frame++,Q===!0&&Ve.beginShadows();const G=m.state.shadowsArray;if(te.render(G,w,U),Q===!0&&Ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),it.render(_,w),m.setupLights(v._useLegacyLights),U.isArrayCamera){const V=U.cameras;for(let z=0,de=V.length;z<de;z++){const Me=V[z];Na(_,w,Me,Me.viewport)}}else Na(_,w,U);A!==null&&(b.updateMultisampleRenderTarget(A),b.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(v,w,U),Ge.resetDefaultState(),k=-1,y=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function un(w,U,G,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)G=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){V&&Ne.setFromMatrixPosition(w.matrixWorld).applyMatrix4(xe);const Me=J.update(w),Te=w.material;Te.visible&&_.push(w,Me,Te,G,Ne.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){const Me=J.update(w),Te=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ne.copy(w.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ne.copy(Me.boundingSphere.center)),Ne.applyMatrix4(w.matrixWorld).applyMatrix4(xe)),Array.isArray(Te)){const Pe=Me.groups;for(let We=0,ze=Pe.length;We<ze;We++){const Be=Pe[We],gt=Te[Be.materialIndex];gt&&gt.visible&&_.push(w,Me,gt,G,Ne.z,Be)}}else Te.visible&&_.push(w,Me,Te,G,Ne.z,null)}}const de=w.children;for(let Me=0,Te=de.length;Me<Te;Me++)un(de[Me],U,G,V)}function Na(w,U,G,V){const z=w.opaque,de=w.transmissive,Me=w.transparent;m.setupLightsView(G),Q===!0&&Ve.setGlobalState(v.clippingPlanes,G),de.length>0&&Gl(z,de,U,G),V&&me.viewport(E.copy(V)),z.length>0&&fs(z,U,G),de.length>0&&fs(de,U,G),Me.length>0&&fs(Me,U,G),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function Gl(w,U,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const de=Re.isWebGL2;ye===null&&(ye=new ui(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?ls:qn,minFilter:cs,samples:de?4:0})),v.getDrawingBufferSize(Ue),de?ye.setSize(Ue.x,Ue.y):ye.setSize(tr(Ue.x),tr(Ue.y));const Me=v.getRenderTarget();v.setRenderTarget(ye),v.getClearColor(ee),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Te=v.toneMapping;v.toneMapping=Xn,fs(w,G,V),b.updateMultisampleRenderTarget(ye),b.updateRenderTargetMipmap(ye);let Pe=!1;for(let We=0,ze=U.length;We<ze;We++){const Be=U[We],gt=Be.object,Vt=Be.geometry,Tt=Be.material,mn=Be.group;if(Tt.side===wn&&gt.layers.test(V.layers)){const ft=Tt.side;Tt.side=Bt,Tt.needsUpdate=!0,Oa(gt,G,V,Vt,Tt,mn),Tt.side=ft,Tt.needsUpdate=!0,Pe=!0}}Pe===!0&&(b.updateMultisampleRenderTarget(ye),b.updateRenderTargetMipmap(ye)),v.setRenderTarget(Me),v.setClearColor(ee,L),v.toneMapping=Te}function fs(w,U,G){const V=U.isScene===!0?U.overrideMaterial:null;for(let z=0,de=w.length;z<de;z++){const Me=w[z],Te=Me.object,Pe=Me.geometry,We=V===null?Me.material:V,ze=Me.group;Te.layers.test(G.layers)&&Oa(Te,U,G,Pe,We,ze)}}function Oa(w,U,G,V,z,de){w.onBeforeRender(v,U,G,V,z,de),w.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(v,U,G,V,w,de),z.transparent===!0&&z.side===wn&&z.forceSinglePass===!1?(z.side=Bt,z.needsUpdate=!0,v.renderBufferDirect(G,U,V,z,w,de),z.side=$n,z.needsUpdate=!0,v.renderBufferDirect(G,U,V,z,w,de),z.side=wn):v.renderBufferDirect(G,U,V,z,w,de),w.onAfterRender(v,U,G,V,z,de)}function ps(w,U,G){U.isScene!==!0&&(U=we);const V=Oe.get(w),z=m.state.lights,de=m.state.shadowsArray,Me=z.state.version,Te=ge.getParameters(w,z.state,de,U,G),Pe=ge.getProgramCacheKey(Te);let We=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?F:M).get(w.envMap||V.environment),We===void 0&&(w.addEventListener("dispose",le),We=new Map,V.programs=We);let ze=We.get(Pe);if(ze!==void 0){if(V.currentProgram===ze&&V.lightsStateVersion===Me)return za(w,Te),ze}else Te.uniforms=ge.getUniforms(w),w.onBuild(G,Te,v),w.onBeforeCompile(Te,v),ze=ge.acquireProgram(Te,Pe),We.set(Pe,ze),V.uniforms=Te.uniforms;const Be=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Be.clippingPlanes=Ve.uniform),za(w,Te),V.needsLights=Wl(w),V.lightsStateVersion=Me,V.needsLights&&(Be.ambientLightColor.value=z.state.ambient,Be.lightProbe.value=z.state.probe,Be.directionalLights.value=z.state.directional,Be.directionalLightShadows.value=z.state.directionalShadow,Be.spotLights.value=z.state.spot,Be.spotLightShadows.value=z.state.spotShadow,Be.rectAreaLights.value=z.state.rectArea,Be.ltc_1.value=z.state.rectAreaLTC1,Be.ltc_2.value=z.state.rectAreaLTC2,Be.pointLights.value=z.state.point,Be.pointLightShadows.value=z.state.pointShadow,Be.hemisphereLights.value=z.state.hemi,Be.directionalShadowMap.value=z.state.directionalShadowMap,Be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Be.spotShadowMap.value=z.state.spotShadowMap,Be.spotLightMatrix.value=z.state.spotLightMatrix,Be.spotLightMap.value=z.state.spotLightMap,Be.pointShadowMap.value=z.state.pointShadowMap,Be.pointShadowMatrix.value=z.state.pointShadowMatrix),V.currentProgram=ze,V.uniformsList=null,ze}function Fa(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=Xs.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function za(w,U){const G=Oe.get(w);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Hl(w,U,G,V,z){U.isScene!==!0&&(U=we),b.resetTextureUnits();const de=U.fog,Me=V.isMeshStandardMaterial?U.environment:null,Te=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:An,Pe=(V.isMeshStandardMaterial?F:M).get(V.envMap||Me),We=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ze=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Be=!!G.morphAttributes.position,gt=!!G.morphAttributes.normal,Vt=!!G.morphAttributes.color;let Tt=Xn;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Tt=v.toneMapping);const mn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ft=mn!==void 0?mn.length:0,qe=Oe.get(V),fr=m.state.lights;if(Q===!0&&(ue===!0||w!==y)){const qt=w===y&&V.id===k;Ve.setState(V,w,qt)}let mt=!1;V.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==fr.state.version||qe.outputColorSpace!==Te||z.isBatchedMesh&&qe.batching===!1||!z.isBatchedMesh&&qe.batching===!0||z.isInstancedMesh&&qe.instancing===!1||!z.isInstancedMesh&&qe.instancing===!0||z.isSkinnedMesh&&qe.skinning===!1||!z.isSkinnedMesh&&qe.skinning===!0||z.isInstancedMesh&&qe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&qe.instancingColor===!1&&z.instanceColor!==null||qe.envMap!==Pe||V.fog===!0&&qe.fog!==de||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Ve.numPlanes||qe.numIntersection!==Ve.numIntersection)||qe.vertexAlphas!==We||qe.vertexTangents!==ze||qe.morphTargets!==Be||qe.morphNormals!==gt||qe.morphColors!==Vt||qe.toneMapping!==Tt||Re.isWebGL2===!0&&qe.morphTargetsCount!==ft)&&(mt=!0):(mt=!0,qe.__version=V.version);let Yn=qe.currentProgram;mt===!0&&(Yn=ps(V,U,z));let Ba=!1,qi=!1,pr=!1;const Lt=Yn.getUniforms(),jn=qe.uniforms;if(me.useProgram(Yn.program)&&(Ba=!0,qi=!0,pr=!0),V.id!==k&&(k=V.id,qi=!0),Ba||y!==w){Lt.setValue(O,"projectionMatrix",w.projectionMatrix),Lt.setValue(O,"viewMatrix",w.matrixWorldInverse);const qt=Lt.map.cameraPosition;qt!==void 0&&qt.setValue(O,Ne.setFromMatrixPosition(w.matrixWorld)),Re.logarithmicDepthBuffer&&Lt.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Lt.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),y!==w&&(y=w,qi=!0,pr=!0)}if(z.isSkinnedMesh){Lt.setOptional(O,z,"bindMatrix"),Lt.setOptional(O,z,"bindMatrixInverse");const qt=z.skeleton;qt&&(Re.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),Lt.setValue(O,"boneTexture",qt.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(Lt.setOptional(O,z,"batchingTexture"),Lt.setValue(O,"batchingTexture",z._matricesTexture,b));const mr=G.morphAttributes;if((mr.position!==void 0||mr.normal!==void 0||mr.color!==void 0&&Re.isWebGL2===!0)&&Ye.update(z,G,Yn),(qi||qe.receiveShadow!==z.receiveShadow)&&(qe.receiveShadow=z.receiveShadow,Lt.setValue(O,"receiveShadow",z.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(jn.envMap.value=Pe,jn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),qi&&(Lt.setValue(O,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&Vl(jn,pr),de&&V.fog===!0&&he.refreshFogUniforms(jn,de),he.refreshMaterialUniforms(jn,V,$,W,ye),Xs.upload(O,Fa(qe),jn,b)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Xs.upload(O,Fa(qe),jn,b),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Lt.setValue(O,"center",z.center),Lt.setValue(O,"modelViewMatrix",z.modelViewMatrix),Lt.setValue(O,"normalMatrix",z.normalMatrix),Lt.setValue(O,"modelMatrix",z.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const qt=V.uniformsGroups;for(let gr=0,Xl=qt.length;gr<Xl;gr++)if(Re.isWebGL2){const Ga=qt[gr];et.update(Ga,Yn),et.bind(Ga,Yn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Yn}function Vl(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Wl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,U,G){Oe.get(w.texture).__webglTexture=U,Oe.get(w.depthTexture).__webglTexture=G;const V=Oe.get(w);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,U){const G=Oe.get(w);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,G=0){A=w,R=U,T=G;let V=!0,z=null,de=!1,Me=!1;if(w){const Pe=Oe.get(w);Pe.__useDefaultFramebuffer!==void 0?(me.bindFramebuffer(O.FRAMEBUFFER,null),V=!1):Pe.__webglFramebuffer===void 0?b.setupRenderTarget(w):Pe.__hasExternalTextures&&b.rebindTextures(w,Oe.get(w.texture).__webglTexture,Oe.get(w.depthTexture).__webglTexture);const We=w.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Me=!0);const ze=Oe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(ze[U])?z=ze[U][G]:z=ze[U],de=!0):Re.isWebGL2&&w.samples>0&&b.useMultisampledRTT(w)===!1?z=Oe.get(w).__webglMultisampledFramebuffer:Array.isArray(ze)?z=ze[G]:z=ze,E.copy(w.viewport),D.copy(w.scissor),H=w.scissorTest}else E.copy(K).multiplyScalar($).floor(),D.copy(se).multiplyScalar($).floor(),H=re;if(me.bindFramebuffer(O.FRAMEBUFFER,z)&&Re.drawBuffers&&V&&me.drawBuffers(w,z),me.viewport(E),me.scissor(D),me.setScissorTest(H),de){const Pe=Oe.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Pe.__webglTexture,G)}else if(Me){const Pe=Oe.get(w.texture),We=U||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Pe.__webglTexture,G||0,We)}k=-1},this.readRenderTargetPixels=function(w,U,G,V,z,de,Me){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Oe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Me!==void 0&&(Te=Te[Me]),Te){me.bindFramebuffer(O.FRAMEBUFFER,Te);try{const Pe=w.texture,We=Pe.format,ze=Pe.type;if(We!==on&&pe.convert(We)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Be=ze===ls&&(Se.has("EXT_color_buffer_half_float")||Re.isWebGL2&&Se.has("EXT_color_buffer_float"));if(ze!==qn&&pe.convert(ze)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ze===Vn&&(Re.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Be){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-V&&G>=0&&G<=w.height-z&&O.readPixels(U,G,V,z,pe.convert(We),pe.convert(ze),de)}finally{const Pe=A!==null?Oe.get(A).__webglFramebuffer:null;me.bindFramebuffer(O.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(w,U,G=0){const V=Math.pow(2,-G),z=Math.floor(U.image.width*V),de=Math.floor(U.image.height*V);b.setTexture2D(U,0),O.copyTexSubImage2D(O.TEXTURE_2D,G,0,0,w.x,w.y,z,de),me.unbindTexture()},this.copyTextureToTexture=function(w,U,G,V=0){const z=U.image.width,de=U.image.height,Me=pe.convert(G.format),Te=pe.convert(G.type);b.setTexture2D(G,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,G.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,V,w.x,w.y,z,de,Me,Te,U.image.data):U.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,V,w.x,w.y,U.mipmaps[0].width,U.mipmaps[0].height,Me,U.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,V,w.x,w.y,Me,Te,U.image),V===0&&G.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),me.unbindTexture()},this.copyTextureToTexture3D=function(w,U,G,V,z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=w.max.x-w.min.x+1,Me=w.max.y-w.min.y+1,Te=w.max.z-w.min.z+1,Pe=pe.convert(V.format),We=pe.convert(V.type);let ze;if(V.isData3DTexture)b.setTexture3D(V,0),ze=O.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)b.setTexture2DArray(V,0),ze=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const Be=O.getParameter(O.UNPACK_ROW_LENGTH),gt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Vt=O.getParameter(O.UNPACK_SKIP_PIXELS),Tt=O.getParameter(O.UNPACK_SKIP_ROWS),mn=O.getParameter(O.UNPACK_SKIP_IMAGES),ft=G.isCompressedTexture?G.mipmaps[z]:G.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,ft.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ft.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,w.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,w.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,w.min.z),G.isDataTexture||G.isData3DTexture?O.texSubImage3D(ze,z,U.x,U.y,U.z,de,Me,Te,Pe,We,ft.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(ze,z,U.x,U.y,U.z,de,Me,Te,Pe,ft.data)):O.texSubImage3D(ze,z,U.x,U.y,U.z,de,Me,Te,Pe,We,ft),O.pixelStorei(O.UNPACK_ROW_LENGTH,Be),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,gt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Vt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Tt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,mn),z===0&&V.generateMipmaps&&O.generateMipmap(ze),me.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?b.setTextureCube(w,0):w.isData3DTexture?b.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?b.setTexture2DArray(w,0):b.setTexture2D(w,0),me.unbindTexture()},this.resetState=function(){R=0,T=0,A=null,me.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ta?"display-p3":"srgb",t.unpackColorSpace=rt.workingColorSpace===cr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ct?ci:il}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ci?Ct:An}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Gg extends wl{}Gg.prototype.isWebGL1Renderer=!0;class Ua{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ze(e),this.near=t,this.far=n}clone(){return new Ua(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hg extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Vg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=va,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Tn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Tn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new I;class ir{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new cn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ir(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bl extends Wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ci;const Ji=new I,Li=new I,Pi=new I,Ii=new ke,Qi=new ke,Tl=new vt,zs=new I,es=new I,Bs=new I,gc=new ke,Zr=new ke,_c=new ke;class Wg extends Rt{constructor(e=new bl){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new en;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Vg(t,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new ir(n,3,0,!1)),Ci.setAttribute("uv",new ir(n,2,3,!1))}this.geometry=Ci,this.material=e,this.center=new ke(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Li.setFromMatrixScale(this.matrixWorld),Tl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Pi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Li.multiplyScalar(-Pi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Gs(zs.set(-.5,-.5,0),Pi,o,Li,s,r),Gs(es.set(.5,-.5,0),Pi,o,Li,s,r),Gs(Bs.set(.5,.5,0),Pi,o,Li,s,r),gc.set(0,0),Zr.set(1,0),_c.set(1,1);let a=e.ray.intersectTriangle(zs,es,Bs,!1,Ji);if(a===null&&(Gs(es.set(-.5,.5,0),Pi,o,Li,s,r),Zr.set(0,1),a=e.ray.intersectTriangle(zs,Bs,es,!1,Ji),a===null))return;const c=e.ray.origin.distanceTo(Ji);c<e.near||c>e.far||t.push({distance:c,point:Ji.clone(),uv:Kt.getInterpolation(Ji,zs,es,Bs,gc,Zr,_c,new ke),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Gs(i,e,t,n,s,r){Ii.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Qi.x=r*Ii.x-s*Ii.y,Qi.y=s*Ii.x+r*Ii.y):Qi.copy(Ii),i.copy(e),i.x+=Qi.x,i.y+=Qi.y,i.applyMatrix4(Tl)}class Da extends Gt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Le extends en{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],h=[];let g=0;const _=[],m=n/2;let p=0;x(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Mt(d,3)),this.setAttribute("normal",new Mt(f,3)),this.setAttribute("uv",new Mt(h,2));function x(){const S=new I,R=new I;let T=0;const A=(t-e)/n;for(let k=0;k<=r;k++){const y=[],E=k/r,D=E*(t-e)+e;for(let H=0;H<=s;H++){const ee=H/s,L=ee*c+a,N=Math.sin(L),W=Math.cos(L);R.x=D*N,R.y=-E*n+m,R.z=D*W,d.push(R.x,R.y,R.z),S.set(N,A,W).normalize(),f.push(S.x,S.y,S.z),h.push(ee,1-E),y.push(g++)}_.push(y)}for(let k=0;k<s;k++)for(let y=0;y<r;y++){const E=_[y][k],D=_[y+1][k],H=_[y+1][k+1],ee=_[y][k+1];u.push(E,D,ee),u.push(D,H,ee),T+=6}l.addGroup(p,T,0),p+=T}function v(S){const R=g,T=new ke,A=new I;let k=0;const y=S===!0?e:t,E=S===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,m*E,0),f.push(0,E,0),h.push(.5,.5),g++;const D=g;for(let H=0;H<=s;H++){const L=H/s*c+a,N=Math.cos(L),W=Math.sin(L);A.x=y*W,A.y=m*E,A.z=y*N,d.push(A.x,A.y,A.z),f.push(0,E,0),T.x=N*.5+.5,T.y=W*.5*E+.5,h.push(T.x,T.y),g++}for(let H=0;H<s;H++){const ee=R+H,L=D+H;S===!0?u.push(L,L+1,ee):u.push(L+1,L,ee),k+=3}l.addGroup(p,k,S===!0?1:2),p+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Le(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qt extends Le{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Qt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hr extends en{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),u(),this.setAttribute("position",new Mt(r,3)),this.setAttribute("normal",new Mt(r.slice(),3)),this.setAttribute("uv",new Mt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const v=new I,S=new I,R=new I;for(let T=0;T<t.length;T+=3)h(t[T+0],v),h(t[T+1],S),h(t[T+2],R),c(v,S,R,x)}function c(x,v,S,R){const T=R+1,A=[];for(let k=0;k<=T;k++){A[k]=[];const y=x.clone().lerp(S,k/T),E=v.clone().lerp(S,k/T),D=T-k;for(let H=0;H<=D;H++)H===0&&k===T?A[k][H]=y:A[k][H]=y.clone().lerp(E,H/D)}for(let k=0;k<T;k++)for(let y=0;y<2*(T-k)-1;y++){const E=Math.floor(y/2);y%2===0?(f(A[k][E+1]),f(A[k+1][E]),f(A[k][E])):(f(A[k][E+1]),f(A[k+1][E+1]),f(A[k+1][E]))}}function l(x){const v=new I;for(let S=0;S<r.length;S+=3)v.x=r[S+0],v.y=r[S+1],v.z=r[S+2],v.normalize().multiplyScalar(x),r[S+0]=v.x,r[S+1]=v.y,r[S+2]=v.z}function u(){const x=new I;for(let v=0;v<r.length;v+=3){x.x=r[v+0],x.y=r[v+1],x.z=r[v+2];const S=m(x)/2/Math.PI+.5,R=p(x)/Math.PI+.5;o.push(S,1-R)}g(),d()}function d(){for(let x=0;x<o.length;x+=6){const v=o[x+0],S=o[x+2],R=o[x+4],T=Math.max(v,S,R),A=Math.min(v,S,R);T>.9&&A<.1&&(v<.2&&(o[x+0]+=1),S<.2&&(o[x+2]+=1),R<.2&&(o[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function h(x,v){const S=x*3;v.x=e[S+0],v.y=e[S+1],v.z=e[S+2]}function g(){const x=new I,v=new I,S=new I,R=new I,T=new ke,A=new ke,k=new ke;for(let y=0,E=0;y<r.length;y+=9,E+=6){x.set(r[y+0],r[y+1],r[y+2]),v.set(r[y+3],r[y+4],r[y+5]),S.set(r[y+6],r[y+7],r[y+8]),T.set(o[E+0],o[E+1]),A.set(o[E+2],o[E+3]),k.set(o[E+4],o[E+5]),R.copy(x).add(v).add(S).divideScalar(3);const D=m(R);_(T,E+0,x,D),_(A,E+2,v,D),_(k,E+4,S,D)}}function _(x,v,S,R){R<0&&x.x===1&&(o[v]=x.x-1),S.x===0&&S.z===0&&(o[v]=R/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.vertices,e.indices,e.radius,e.details)}}class os extends hr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new os(e.radius,e.detail)}}class ka extends hr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ka(e.radius,e.detail)}}class De extends en{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],d=new I,f=new I,h=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const x=[],v=p/n;let S=0;p===0&&o===0?S=.5/t:p===n&&c===Math.PI&&(S=-.5/t);for(let R=0;R<=t;R++){const T=R/t;d.x=-e*Math.cos(s+T*r)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(s+T*r)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),m.push(T+S,1-v),x.push(l++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const v=u[p][x+1],S=u[p][x],R=u[p+1][x],T=u[p+1][x+1];(p!==0||o>0)&&h.push(v,S,T),(p!==n-1||c<Math.PI)&&h.push(S,R,T)}this.setIndex(h),this.setAttribute("position",new Mt(g,3)),this.setAttribute("normal",new Mt(_,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new De(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class sr extends en{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new I,d=new I,f=new I;for(let h=0;h<=n;h++)for(let g=0;g<=s;g++){const _=g/s*r,m=h/n*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),a.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),f.subVectors(d,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(h/n)}for(let h=1;h<=n;h++)for(let g=1;g<=s;g++){const _=(s+1)*h+g-1,m=(s+1)*(h-1)+g-1,p=(s+1)*(h-1)+g,x=(s+1)*h+g;o.push(_,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ne extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dr extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Xg extends dr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Jr=new vt,vc=new I,xc=new I;class Al{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new La,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;vc.setFromMatrixPosition(e.matrixWorld),t.position.copy(vc),xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xc),t.updateMatrixWorld(),Jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const yc=new vt,ts=new I,Qr=new I;class qg extends Al{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ke(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ts.setFromMatrixPosition(e.matrixWorld),n.position.copy(ts),Qr.copy(n.position),Qr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qr),n.updateMatrixWorld(),s.makeTranslation(-ts.x,-ts.y,-ts.z),yc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yc)}}class $g extends dr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new qg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Yg extends Al{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jg extends dr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Yg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Kg extends dr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Zg{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Mc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Mc(){return(typeof performance>"u"?Date:performance).now()}class Jg{constructor(e,t,n=0,s=1/0){this.ray=new ul(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Sa(e,this,n,t),n.sort(Sc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Sa(e[s],this,n,t);return n.sort(Sc),n}}function Sc(i,e){return i.distance-e.distance}function Sa(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,o=s.length;r<o;r++)Sa(s[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wa);class Qg{constructor(e="game-container"){this.container=document.getElementById(e),this.scene=new Hg,this.scene.background=new Ze(7395071),this.scene.fog=new Ua(7395071,40,75);const t=window.innerWidth/window.innerHeight,n=window.innerHeight>window.innerWidth?29:24;this.camera=new Pa(-(n*t)/2,n*t/2,n/2,-n/2,.1,1e3),this.cameraOffset=new I(14,18,14),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new wl({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=$c,this.container.appendChild(this.renderer.domElement),this.setupLights(),window.addEventListener("resize",()=>this.onWindowResize())}setupLights(){const e=new Kg(16777215,.75);this.scene.add(e);const t=new Xg(7395071,3069299,.45);t.position.set(0,40,0),this.scene.add(t);const n=new jg(16775912,1.15);n.position.set(22,32,16),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,n.shadow.camera.near=.5,n.shadow.camera.far=85;const s=26;n.shadow.camera.left=-s,n.shadow.camera.right=s,n.shadow.camera.top=s,n.shadow.camera.bottom=-s,n.shadow.bias=-5e-4,this.scene.add(n),this.sunLight=n}followTarget(e,t=.1){const n=e.clone().add(this.cameraOffset);this.camera.position.lerp(n,t*6),this.camera.lookAt(e.x,e.y+.5,e.z)}onWindowResize(){const e=window.innerWidth/window.innerHeight,t=window.innerHeight>window.innerWidth?29:24;this.camera.left=-(t*e)/2,this.camera.right=t*e/2,this.camera.top=t/2,this.camera.bottom=-t/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5))}render(){this.renderer.render(this.scene,this.camera)}}const Hs=Object.freeze({COLORS:Object.freeze({FLOOR_STORE:16777215,FLOOR_FARM:1092740,FLOOR_RESTAURANT:7162945,WALLS:3094080})});class e0{constructor(e){this.scene=e,this.animatedTrees=[]}createOakTree(e,t,n=1){const s=new _e;s.position.set(e,0,t),s.scale.set(n,n,n);const r=new Le(.18,.28,1.4,6),o=new ne({color:7951688,roughness:.9}),a=new P(r,o);a.position.y=.7,a.castShadow=!0,s.add(a);const c=new ne({color:3069299,roughness:.5,flatShading:!0}),l=new ne({color:1092740,roughness:.5,flatShading:!0}),u=new P(new os(.9,1),c);u.position.y=1.8,u.castShadow=!0;const d=new P(new os(.75,1),l);d.position.set(.2,2.3,.1),d.castShadow=!0;const f=new P(new os(.6,1),c);return f.position.set(-.25,2,-.2),f.castShadow=!0,s.add(u,d,f),this.scene.add(s),this.animatedTrees.push(s),s}createPineTree(e,t,n=1){const s=new _e;s.position.set(e,0,t),s.scale.set(n,n,n);const r=new Le(.15,.22,1,6),o=new ne({color:6111287,roughness:.9}),a=new P(r,o);a.position.y=.5,a.castShadow=!0,s.add(a);const c=new ne({color:37938,roughness:.5,flatShading:!0}),l=new P(new Qt(1.1,1.2,6),c);l.position.y=1.4,l.castShadow=!0;const u=new P(new Qt(.85,1,6),c);u.position.y=2.1,u.castShadow=!0;const d=new P(new Qt(.55,.8,6),c);return d.position.y=2.7,d.castShadow=!0,s.add(l,u,d),this.scene.add(s),this.animatedTrees.push(s),s}createHedge(e,t,n=3,s=.8,r=.6){const o=new ve(n,s,r),a=new ne({color:1092740,roughness:.7,flatShading:!0}),c=new P(o,a);return c.position.set(e,s/2,t),c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),c}createStoreAwning(e,t,n,s=8,r=1.8){const o=new _e;o.position.set(e,t,n);const a=10,c=s/a;for(let f=0;f<a;f++){const g=f%2===0?16729943:16777215,_=new ne({color:g,roughness:.3}),m=new ve(c*.96,.12,r),p=new P(m,_);p.position.set((f-a/2+.5)*c,0,r/2),p.rotation.x=.35,p.castShadow=!0,o.add(p);const x=new ve(c*.96,.25,.08),v=new P(x,_);v.position.set((f-a/2+.5)*c,-.15-r*.32,r*.9),o.add(v)}const l=new ne({color:3094080,metalness:.7}),u=new P(new Le(.04,.04,1.4),l);u.position.set(-s/2+.2,-.4,r*.6),u.rotation.x=-.7;const d=u.clone();return d.position.x=s/2-.2,o.add(u,d),this.scene.add(o),o}createStoreSign(e,t,n){const s=new _e;s.position.set(e,t,n);const r=new ve(5.2,1.1,.3),o=new ne({color:1976110,roughness:.3}),a=new P(r,o);a.castShadow=!0,s.add(a);const c=new ve(5.4,1.25,.2),l=new ne({color:16760904,metalness:.85,roughness:.15}),u=new P(c,l);s.add(u);const d=document.createElement("canvas");d.width=512,d.height=128;const f=d.getContext("2d");f.fillStyle="#1e272e",f.fillRect(0,0,512,128),f.fillStyle="#ffc048",f.font='bold 52px "Fredoka", sans-serif',f.textAlign="center",f.textBaseline="middle",f.fillText("🛒 GBLB STORE",256,64);const h=new Da(d),g=new yt({map:h}),_=new P(new zt(4.8,.9),g);return _.position.z=.16,s.add(_),this.scene.add(s),s}createCar(e,t,n=0,s=15158332){const r=new _e;r.position.set(e,0,t),r.rotation.y=n;const o=new ne({color:s,roughness:.2,metalness:.3}),a=new ve(2.2,.6,1.2),c=new P(a,o);c.position.y=.45,c.castShadow=!0,c.receiveShadow=!0,r.add(c);const l=new ne({color:3426654,roughness:.1}),u=new ve(1.2,.55,1.05),d=new P(u,l);d.position.set(-.15,.95,0),d.castShadow=!0,r.add(d);const f=new ne({color:8514796,roughness:.1,metalness:.8}),h=new zt(.9,.4),g=new P(h,f);g.rotation.y=Math.PI/2,g.position.set(.46,.92,0),r.add(g);const _=new yt({color:16775781}),m=new P(new ve(.08,.14,.2),_);m.position.set(1.11,.48,.38);const p=m.clone();p.position.z=-.38,r.add(m,p);const x=new yt({color:16726072}),v=new P(new ve(.08,.12,.18),x);v.position.set(-1.11,.52,.4);const S=v.clone();S.position.z=-.4,r.add(v,S);const R=new Le(.24,.24,.16,12),T=new ne({color:1976110,roughness:.8}),A=new ne({color:14474721,metalness:.8});return[{x:.65,z:.6},{x:-.65,z:.6},{x:.65,z:-.6},{x:-.65,z:-.6}].forEach(y=>{const E=new P(R,T);E.rotation.x=Math.PI/2,E.position.set(y.x,.24,y.z),E.castShadow=!0;const D=new P(new Le(.12,.12,.17,8),A);D.rotation.x=Math.PI/2,D.position.set(y.x,.24,y.z),r.add(E,D)}),this.scene.add(r),r}createStreetLamp(e,t){const n=new _e;n.position.set(e,0,t);const s=new Le(.08,.12,3.2,8),r=new ne({color:2899536,metalness:.8}),o=new P(s,r);o.position.y=1.6,o.castShadow=!0,n.add(o);const a=new ve(.45,.35,.45),c=new ne({color:1713455,metalness:.9}),l=new P(a,c);l.position.set(.2,3.2,0),n.add(l);const u=new P(new De(.16,8,8),new yt({color:16775781}));u.position.set(.2,3.05,0),n.add(u);const d=new $g(16775781,.6,6);return d.position.set(.2,3,0),n.add(d),this.scene.add(n),n}createWoodenFence(e,t,n=6,s=0){const r=new _e;r.position.set(e,0,t),r.rotation.y=s;const o=new ne({color:9268835,roughness:.8}),a=Math.floor(n/1.5)+1;for(let u=0;u<a;u++){const d=new P(new ve(.12,.75,.12),o);d.position.set((u-(a-1)/2)*1.5,.375,0),d.castShadow=!0,r.add(d)}const c=new P(new ve(n,.08,.06),o);c.position.set(0,.5,0),c.castShadow=!0;const l=c.clone();return l.position.y=.25,r.add(c,l),this.scene.add(r),r}update(e,t){const n=Math.sin(t*1.5)*.03;this.animatedTrees.forEach((s,r)=>{s.rotation.z=n*(r%2===0?1:-.8)})}}class t0{constructor(e){this.scene=e,this.obstacles=[],this.props=new e0(e),this.buildEnvironment()}buildEnvironment(){const e=new zt(160,100),t=new ne({color:3069299,roughness:.75}),n=new P(e,t);n.rotation.x=-Math.PI/2,n.position.set(-15,-.06,0),n.receiveShadow=!0,this.scene.add(n);const s=new zt(80,18),r=new ne({color:3094080,roughness:.6}),o=new P(s,r);o.rotation.x=-Math.PI/2,o.position.set(-10,-.04,19),o.receiveShadow=!0,this.scene.add(o);const a=new yt({color:16777215});[-24,-17,-10,-3,4,11,18].forEach(S=>{const R=new P(new zt(.2,5),a);R.rotation.x=-Math.PI/2,R.position.set(S,-.03,16),this.scene.add(R)});const c=new zt(74,2.2),l=new ne({color:15856374,roughness:.4}),u=new P(c,l);u.rotation.x=-Math.PI/2,u.position.set(-17,-.02,10),u.receiveShadow=!0,this.scene.add(u);const d=new zt(18,18),f=new ne({color:Hs.COLORS.FLOOR_STORE,roughness:.2,metalness:.05}),h=new P(d,f);h.rotation.x=-Math.PI/2,h.position.set(5,0,0),h.receiveShadow=!0,this.scene.add(h);const g=new zt(22,18),_=new ne({color:Hs.COLORS.FLOOR_FARM,roughness:.8}),m=new P(g,_);m.rotation.x=-Math.PI/2,m.position.set(-15,0,0),m.receiveShadow=!0,this.scene.add(m);const p=new zt(22,18),x=new ne({color:Hs.COLORS.FLOOR_RESTAURANT,roughness:.3}),v=new P(p,x);v.rotation.x=-Math.PI/2,v.position.set(-37,0,0),v.receiveShadow=!0,this.scene.add(v),this.createPath(-4,0,2,18),this.createPath(-26,0,2,18),this.createStoreWalls(),this.createRestaurantWalls(),this.props.createStoreAwning(5,2.3,9.1,10,1.8),this.props.createStoreSign(5,3.4,9),this.props.createStoreAwning(-37,2.3,9.1,12,1.8),this.createRestaurantSign(-37,3.4,9),this.props.createCar(4,16.5,-Math.PI/2,16729943),this.props.createCar(11,16.5,-Math.PI/2,16753922),this.props.createCar(-10,16.5,-Math.PI/2,2003199),this.props.createCar(-24,16.5,-Math.PI/2,10837738),this.props.createStreetLamp(14,10.5),this.props.createStreetLamp(-4,10.5),this.props.createStreetLamp(-26,10.5),this.props.createStreetLamp(-47,10.5),this.props.createWoodenFence(-15,9,22,0),this.props.createWoodenFence(-15,-9,22,0),this.registerObstacle(-15,9,22,.4),this.registerObstacle(-15,-9,22,.4),this.props.createOakTree(-52,4,1.3),this.props.createOakTree(-51,-6,1.2),this.props.createOakTree(-8,-14,1.1),this.props.createOakTree(2,-14,1.2),this.props.createOakTree(12,-14,1),this.props.createPineTree(17,-5,1.1),this.props.createPineTree(18,4,1.2),this.props.createPineTree(-30,-14,1.2),this.props.createPineTree(-42,-14,1.1)}createPath(e,t,n,s){const r=new zt(n,s),o=new ne({color:15528177,roughness:.6}),a=new P(r,o);a.rotation.x=-Math.PI/2,a.position.set(e,.005,t),a.receiveShadow=!0,this.scene.add(a)}createStoreWalls(){const e=new ne({color:Hs.COLORS.WALLS,roughness:.4}),t=1.1,n=.4;this.addWall(5,-9,18,t,n,e),this.addWall(11.5,9,5,t,n,e),this.addWall(-1.5,9,5,t,n,e),this.addWall(14,0,n,t,18,e)}createRestaurantWalls(){const e=new ne({color:2899536,roughness:.3}),t=1.1,n=.4;this.addWall(-37,-9,22,t,n,e),this.addWall(-45,9,6,t,n,e),this.addWall(-29,9,6,t,n,e),this.addWall(-48,0,n,t,18,e)}createRestaurantSign(e,t,n){const s=new _e;s.position.set(e,t,n);const r=new ve(6.2,1.1,.3),o=new ne({color:4073251,roughness:.3}),a=new P(r,o);a.castShadow=!0,s.add(a);const c=new ve(6.4,1.25,.2),l=new ne({color:15844367,metalness:.8});s.add(new P(c,l));const u=document.createElement("canvas");u.width=512,u.height=128;const d=u.getContext("2d");d.fillStyle="#3e2723",d.fillRect(0,0,512,128),d.fillStyle="#f1c40f",d.font='bold 44px "Fredoka", sans-serif',d.textAlign="center",d.textBaseline="middle",d.fillText("🍕 GOURMET BISTRO",256,64);const f=new Da(u),h=new yt({map:f}),g=new P(new zt(5.8,.9),h);g.position.z=.16,s.add(g),this.scene.add(s)}addWall(e,t,n,s,r,o){const a=new ve(n,s,r),c=new P(a,o);c.position.set(e,s/2,t),c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),this.registerObstacle(e,t,n,r)}registerObstacle(e,t,n,s){this.obstacles.push({min:{x:e-n/2,z:t-s/2},max:{x:e+n/2,z:t+s/2}})}getObstacles(){return this.obstacles}update(e,t){this.props&&this.props.update(e,t)}}var ar,Rl;class Ec{constructor(e="shopkeeper"){Rn(this,ar);this.type=e,this.walkCycle=0,this.leftLeg=null,this.rightLeg=null,this.leftArm=null,this.rightArm=null,this.tailGroup=null,this.antennaGroup=null,this.group=B(this,ar,Rl).call(this,e)}animate(e,t){if(t)this.walkCycle+=e*(this.type==="penguin"?16:14),this.leftLeg&&(this.leftLeg.rotation.x=Math.sin(this.walkCycle)*.65),this.rightLeg&&(this.rightLeg.rotation.x=-Math.sin(this.walkCycle)*.65),this.leftArm&&(this.leftArm.rotation.x=-Math.sin(this.walkCycle)*.5),this.rightArm&&(this.rightArm.rotation.x=Math.sin(this.walkCycle)*.5),this.type==="cat"&&this.tailGroup&&(this.tailGroup.rotation.y=Math.sin(this.walkCycle*1.2)*.35,this.tailGroup.rotation.z=Math.cos(this.walkCycle*.8)*.2,this.tailGroup.rotation.x=-.2+Math.abs(Math.sin(this.walkCycle))*.15),this.type==="penguin"&&(this.leftArm&&(this.leftArm.rotation.z=.3+Math.abs(Math.sin(this.walkCycle))*.25),this.rightArm&&(this.rightArm.rotation.z=-.3-Math.abs(Math.sin(this.walkCycle))*.25)),this.type==="robot"&&this.antennaGroup&&(this.antennaGroup.rotation.z=Math.sin(this.walkCycle*2)*.2),this.group.position.y=Math.abs(Math.sin(this.walkCycle*2))*.06;else{for(const n of[this.leftLeg,this.rightLeg,this.leftArm,this.rightArm])n&&(n.rotation.x=Gn.lerp(n.rotation.x,0,e*10));this.group.rotation.z=Gn.lerp(this.group.rotation.z,0,e*10),this.type==="cat"&&this.tailGroup&&(this.walkCycle+=e*3,this.tailGroup.rotation.y=Math.sin(this.walkCycle)*.2,this.tailGroup.rotation.z=Math.cos(this.walkCycle*.5)*.1),this.group.position.y=Gn.lerp(this.group.position.y,0,e*10)}}createShopkeeperMesh(){const e=new _e,t=new Le(.32,.28,.7,10),n=new ne({color:3447003,roughness:.5}),s=new P(t,n);s.position.y=.65,s.castShadow=!0,e.add(s);const r=new ve(.35,.45,.1),o=new ne({color:2600544}),a=new P(r,o);a.position.set(0,.6,.22),e.add(a);const c=new De(.3,12,10),l=new ne({color:16767916,roughness:.6}),u=new P(c,l);u.position.y=1.25,u.castShadow=!0,e.add(u);const d=new Le(.32,.32,.12,10),f=new ne({color:15158332}),h=new P(d,f);h.position.y=1.45,h.castShadow=!0;const g=new ve(.28,.04,.2),_=new P(g,f);_.position.set(0,1.42,.22),e.add(h,_);const m=new yt({color:2899536}),p=new P(new De(.04,6,6),m);p.position.set(-.1,1.28,.26);const x=p.clone();x.position.x=.1,e.add(p,x);const v=new Le(.08,.07,.45,8),S=new ne({color:3447003});this.leftArm=new _e,this.leftArm.position.set(-.35,.85,0);const R=new P(v,S);R.position.y=-.2,this.leftArm.add(R),this.rightArm=new _e,this.rightArm.position.set(.35,.85,0);const T=new P(v,S);T.position.y=-.2,this.rightArm.add(T),e.add(this.leftArm,this.rightArm);const A=new Le(.1,.09,.35,8),k=new ne({color:2899536});this.leftLeg=new _e,this.leftLeg.position.set(-.16,.35,0);const y=new P(A,k);y.position.y=-.17,y.castShadow=!0,this.leftLeg.add(y),this.rightLeg=new _e,this.rightLeg.position.set(.16,.35,0);const E=new P(A,k);return E.position.y=-.17,E.castShadow=!0,this.rightLeg.add(E),e.add(this.leftLeg,this.rightLeg),e}createCatMesh(){const e=new _e,t=new ne({color:15371335,roughness:.6}),n=new ne({color:16119290,roughness:.5}),s=new ne({color:2054553,roughness:.4}),r=new ne({color:15908659,metalness:.7,roughness:.3}),o=new ne({color:5844500,roughness:.7}),a=new ne({color:8406820,roughness:.8}),c=new ne({color:2700109,roughness:.6}),l=new ne({color:6370068,roughness:.7}),u=new ne({color:14037041,roughness:.5}),d=new ne({color:15425914,roughness:.4}),f=new ne({color:16756408,roughness:.6}),h=new ne({color:2017182,roughness:.1}),g=new yt({color:1973796}),_=new yt({color:16777215}),m=new yt({color:2962486}),p=new P(new ve(.38,.18,.28),c);p.position.y=.48,e.add(p);const x=new P(new Le(.24,.24,.08,12),o);x.position.y=.58,e.add(x);const v=new P(new ve(.12,.09,.04),r);v.position.set(0,.58,.22),e.add(v);const S=new P(new ve(.09,.12,.12),a);S.position.set(.24,.56,-.02),e.add(S);const R=new P(new Le(.25,.22,.42,10),n);R.position.y=.8,R.castShadow=!0,e.add(R);const T=new P(new ve(.14,.44,.32),s);T.position.set(-.14,.8,.02);const A=new P(new ve(.14,.44,.32),s);A.position.set(.14,.8,.02),e.add(T,A),[-.08,0,.08].forEach(Z=>{const j=new P(new De(.025,6,6),r);j.position.set(-.06,.8+Z,.16);const J=j.clone();J.position.x=.06,e.add(j,J)});const k=new P(new Le(.24,.22,.08,10),u);k.position.y=1.02,e.add(k);const y=new _e;y.position.set(0,1.26,0);const E=new P(new De(.29,14,12),t);E.castShadow=!0,y.add(E);const D=new P(new De(.12,8,8),t);D.position.set(-.24,-.05,.05);const H=D.clone();H.position.x=.24,y.add(D,H);const ee=new P(new De(.09,8,8),n);ee.position.set(-.06,-.1,.22);const L=ee.clone();L.position.x=.06;const N=new P(new De(.07,6,6),n);N.position.set(0,-.16,.2),y.add(ee,L,N);const W=new P(new De(.035,6,6),d);W.position.set(0,-.06,.27),y.add(W);const $=new Qt(.12,.22,4),q=new Qt(.08,.16,4),Y=new P($,t);Y.position.set(-.16,.26,.02),Y.rotation.set(.1,-.2,.3);const K=new P(q,f);K.position.set(-.15,.25,.04),K.rotation.set(.1,-.2,.3);const se=new P($,t);se.position.set(.16,.26,.02),se.rotation.set(.1,.2,-.3);const re=new P(q,f);re.position.set(.15,.25,.04),re.rotation.set(.1,.2,-.3),y.add(Y,K,se,re),[-.12,.12].forEach(Z=>{const j=new P(new De(.075,10,8),h);j.position.set(Z,.02,.24);const J=new P(new ve(.035,.08,.02),g);J.position.set(Z,.02,.3);const ge=new P(new De(.02,6,6),_);ge.position.set(Z+.02,.04,.31),y.add(j,J,ge)});const X=new Le(.008,.008,.18,4);[-1,1].forEach(Z=>{const j=new P(X,m);j.rotation.z=Math.PI/2+Z*.15,j.position.set(Z*.22,-.08,.22);const J=new P(X,m);J.rotation.z=Math.PI/2-Z*.15,J.position.set(Z*.22,-.12,.22),y.add(j,J)}),e.add(y);const Q=new Le(.08,.07,.28,8),ue=new De(.09,8,8);this.leftArm=new _e,this.leftArm.position.set(-.32,.9,0);const ye=new P(Q,s);ye.position.y=-.12;const xe=new P(ue,n);xe.position.y=-.28,this.leftArm.add(ye,xe),this.rightArm=new _e,this.rightArm.position.set(.32,.9,0);const Ue=new P(Q,s);Ue.position.y=-.12;const Ne=new P(ue,n);Ne.position.y=-.28,this.rightArm.add(Ue,Ne),e.add(this.leftArm,this.rightArm);const we=new Le(.09,.08,.2,8),je=new Le(.1,.09,.18,8),O=new ve(.16,.1,.24);this.leftLeg=new _e,this.leftLeg.position.set(-.16,.38,0);const wt=new P(we,c);wt.position.y=-.08;const Se=new P(je,l);Se.position.y=-.2;const Re=new P(O,l);Re.position.set(0,-.28,.04),Re.castShadow=!0,this.leftLeg.add(wt,Se,Re),this.rightLeg=new _e,this.rightLeg.position.set(.16,.38,0);const me=new P(we,c);me.position.y=-.08;const ot=new P(je,l);ot.position.y=-.2;const Oe=new P(O,l);Oe.position.set(0,-.28,.04),Oe.castShadow=!0,this.rightLeg.add(me,ot,Oe),e.add(this.leftLeg,this.rightLeg),this.tailGroup=new _e,this.tailGroup.position.set(0,.5,-.16);const b=new P(new Le(.06,.07,.22,8),t);b.position.set(0,.1,-.08),b.rotation.x=-.6;const M=new P(new Le(.05,.06,.24,8),t);M.position.set(0,.24,-.18),M.rotation.x=-1.1;const F=new P(new De(.07,8,8),n);return F.position.set(0,.36,-.24),this.tailGroup.add(b,M,F),e.add(this.tailGroup),e}createRobotMesh(){const e=new _e,t=new ne({color:15462645,metalness:.3,roughness:.3}),n=new ne({color:3027778,metalness:.6,roughness:.4}),s=new yt({color:55807}),r=new yt({color:16750848}),o=new ne({color:15908659,metalness:.8}),a=new P(new ve(.42,.16,.28),n);a.position.y=.48,e.add(a);const c=new P(new ve(.46,.46,.34),t);c.position.y=.78,c.castShadow=!0,e.add(c);const l=new P(new ve(.32,.3,.06),n);l.position.set(0,.78,.18),e.add(l);const u=new P(new Le(.08,.08,.04,12),s);u.rotation.x=Math.PI/2,u.position.set(0,.78,.21),e.add(u);const d=new _e;d.position.set(0,1.25,0);const f=new P(new ve(.44,.36,.34),t);f.castShadow=!0,d.add(f);const h=new P(new ve(.36,.18,.04),n);h.position.set(0,0,.18),d.add(h),[-.09,.09].forEach(W=>{const $=new P(new ve(.06,.06,.02),s);$.position.set(W,0,.2),d.add($)}),this.antennaGroup=new _e,this.antennaGroup.position.set(.18,.18,0);const g=new P(new Le(.015,.015,.22,6),o);g.position.y=.11;const _=new P(new De(.035,8,8),r);_.position.y=.22,this.antennaGroup.add(g,_),d.add(this.antennaGroup),e.add(d);const m=new Le(.07,.07,.26,8),p=new ve(.08,.1,.09);this.leftArm=new _e,this.leftArm.position.set(-.32,.9,0);const x=new P(new De(.09,8,8),n),v=new P(m,t);v.position.y=-.12;const S=new P(p,n);S.position.y=-.26,this.leftArm.add(x,v,S),this.rightArm=new _e,this.rightArm.position.set(.32,.9,0);const R=new P(new De(.09,8,8),n),T=new P(m,t);T.position.y=-.12;const A=new P(p,n);A.position.y=-.26,this.rightArm.add(R,T,A),e.add(this.leftArm,this.rightArm);const k=new Le(.08,.07,.22,8),y=new ve(.16,.08,.24);this.leftLeg=new _e,this.leftLeg.position.set(-.16,.38,0);const E=new P(k,t);E.position.y=-.1;const D=new P(y,n);D.position.set(0,-.22,.02),D.castShadow=!0;const H=new P(new Le(.05,.05,.02,8),s);H.position.set(0,-.26,.02),this.leftLeg.add(E,D,H),this.rightLeg=new _e,this.rightLeg.position.set(.16,.38,0);const ee=new P(k,t);ee.position.y=-.1;const L=new P(y,n);L.position.set(0,-.22,.02),L.castShadow=!0;const N=new P(new Le(.05,.05,.02,8),s);return N.position.set(0,-.26,.02),this.rightLeg.add(ee,L,N),e.add(this.leftLeg,this.rightLeg),e}createPandaMesh(){const e=new _e,t=new ne({color:16119546,roughness:.7}),n=new ne({color:1976110,roughness:.8}),s=new ne({color:15158332,roughness:.5}),r=new ne({color:2962486,roughness:.6}),o=new P(new De(.32,14,12),t);o.position.y=.65,o.castShadow=!0,e.add(o);const a=new P(new ve(.34,.35,.1),s);a.position.set(0,.6,.26),e.add(a);const c=new _e;c.position.set(0,1.2,0);const l=new P(new De(.3,14,12),t);l.castShadow=!0,c.add(l),[-.22,.22].forEach(E=>{const D=new P(new De(.1,8,8),n);D.position.set(E,.24,0),c.add(D)}),[-.11,.11].forEach(E=>{const D=new P(new De(.08,8,8),n);D.position.set(E,.02,.22);const H=new P(new De(.03,6,6),new yt({color:16777215}));H.position.set(E,.02,.28);const ee=new P(new De(.018,6,6),new yt({color:0}));ee.position.set(E,.02,.3),c.add(D,H,ee)});const u=new P(new De(.1,8,8),t);u.position.set(0,-.08,.24);const d=new P(new De(.04,6,6),r);d.position.set(0,-.05,.32),c.add(u,d);const f=new P(new Le(.24,.24,.08,12),s);f.position.y=.26;const h=new P(new De(.24,10,8),t);h.position.y=.38,c.add(f,h),e.add(c);const g=new Le(.09,.08,.28,8),_=new De(.09,8,8);this.leftArm=new _e,this.leftArm.position.set(-.34,.85,0);const m=new P(g,n);m.position.y=-.12;const p=new P(_,t);p.position.y=-.28,this.leftArm.add(m,p),this.rightArm=new _e,this.rightArm.position.set(.34,.85,0);const x=new P(g,n);x.position.y=-.12;const v=new P(_,t);v.position.y=-.28,this.rightArm.add(x,v),e.add(this.leftArm,this.rightArm);const S=new Le(.11,.1,.25,8),R=new ve(.18,.1,.26);this.leftLeg=new _e,this.leftLeg.position.set(-.16,.35,0);const T=new P(S,n);T.position.y=-.1;const A=new P(R,n);A.position.set(0,-.22,.04),A.castShadow=!0,this.leftLeg.add(T,A),this.rightLeg=new _e,this.rightLeg.position.set(.16,.35,0);const k=new P(S,n);k.position.y=-.1;const y=new P(R,n);return y.position.set(0,-.22,.04),y.castShadow=!0,this.rightLeg.add(k,y),e.add(this.leftLeg,this.rightLeg),e}createPenguinMesh(){const e=new _e,t=new ne({color:1976110,roughness:.5}),n=new ne({color:16119546,roughness:.4}),s=new ne({color:15844367,roughness:.4}),r=new ne({color:15158332,roughness:.4}),o=new ne({color:15965202,metalness:.8,roughness:.2}),a=new P(new Le(.28,.32,.7,12),t);a.position.y=.65,a.castShadow=!0,e.add(a);const c=new P(new Le(.24,.27,.66,12),n);c.position.set(0,.65,.08),e.add(c);const l=new P(new ve(.14,.07,.05),r);l.position.set(0,.95,.26),e.add(l),[-.08,-.18].forEach(S=>{const R=new P(new De(.02,6,6),t);R.position.set(0,.8+S,.28),e.add(R)});const u=new _e;u.position.set(0,1.2,0);const d=new P(new De(.26,12,10),t);d.castShadow=!0,u.add(d);const f=new P(new Qt(.09,.18,4),s);f.rotation.x=Math.PI/2,f.position.set(0,-.04,.3),u.add(f),[-.1,.1].forEach(S=>{const R=new P(new De(.06,8,8),new yt({color:16777215}));R.position.set(S,.05,.22);const T=new P(new De(.035,6,6),new yt({color:0}));T.position.set(S,.05,.26),u.add(R,T)});const h=new P(new Le(.16,.16,.06,10),o);h.position.y=.26,u.add(h);for(let S=0;S<5;S++){const R=S/5*Math.PI*2,T=new P(new Qt(.035,.08,4),o);T.position.set(Math.cos(R)*.13,.32,Math.sin(R)*.13),u.add(T)}e.add(u);const g=new ve(.08,.45,.2);this.leftArm=new _e,this.leftArm.position.set(-.32,.85,0);const _=new P(g,t);_.position.y=-.18,_.rotation.z=.2,this.leftArm.add(_),this.rightArm=new _e,this.rightArm.position.set(.32,.85,0);const m=new P(g,t);m.position.y=-.18,m.rotation.z=-.2,this.rightArm.add(m),e.add(this.leftArm,this.rightArm);const p=new ve(.18,.06,.26);this.leftLeg=new _e,this.leftLeg.position.set(-.14,.16,0);const x=new P(p,s);x.position.set(0,0,.05),x.castShadow=!0,this.leftLeg.add(x),this.rightLeg=new _e,this.rightLeg.position.set(.14,.16,0);const v=new P(p,s);return v.position.set(0,0,.05),v.castShadow=!0,this.rightLeg.add(v),e.add(this.leftLeg,this.rightLeg),e}}ar=new WeakSet,Rl=function(e){const t={shopkeeper:this.createShopkeeperMesh,cat:this.createCatMesh,robot:this.createRobotMesh,panda:this.createPandaMesh,penguin:this.createPenguinMesh};return(t[e]??t.shopkeeper).call(this)};const wc=[16729943,16753922,3069299,2003199,10837738,16739201,53971,16760904],bc=[2899536,7162945,14673641,15844367,11745593];var ie,Cl,Ll,Pl,On,Fn,Je,Il,Ul,Dl,kl,Nl,Ol,Fl,zl,Bl,zn,qs;class n0{constructor(e="game-container"){Rn(this,ie);this.engine=new Qg(e),this.scene=this.engine.scene,this.environment=new t0(this.scene),this.farms=new Map,this.machines=new Map,this.shelves=new Map,this.customers=new Map,this.workers=new Map,this.tables=new Map,this.coop=null,this.upgradeMarkers=new Map,this.itemGeometry=new Map,this.itemMaterials=new Map,this.raycaster=new Jg,this.pointer=new ke,this.groundPlane=new Bn(new I(0,1,0),0),this.clock=new Zg,B(this,ie,Cl).call(this),B(this,ie,Ll).call(this),B(this,ie,Pl).call(this)}setObstacles(e){e.setObstacles(this.environment.getObstacles())}render(e,t=[]){var l,u,d,f;const n=Math.min(this.clock.getDelta(),.05),s=this.clock.elapsedTime;this.environment.update(n,s);const r=Math.hypot(e.player.x-this.playerMesh.position.x,e.player.z-this.playerMesh.position.z)>.001;this.playerCharacter.type!==e.player.character&&(B(this,ie,qs).call(this,this.playerMesh),this.scene.remove(this.playerMesh),this.playerCharacter=new Ec(e.player.character),this.playerMesh=this.playerCharacter.group,this.scene.add(this.playerMesh)),this.playerMesh.position.set(e.player.x,0,e.player.z),this.playerMesh.rotation.y=e.player.facing,this.playerCharacter.animate(n,r),this.engine.followTarget(this.playerMesh.position,n),B(this,ie,zn).call(this,this.farms,Object.keys(e.farms),h=>B(this,ie,Il).call(this,h));for(const[h,g]of this.farms){const _=((l=e.farms[h])==null?void 0:l.readyCount)??0;g.produce.forEach((m,p)=>{m.visible=p<_})}B(this,ie,zn).call(this,this.machines,Object.keys(e.machines),h=>B(this,ie,Ul).call(this,h));const o=e.unlockedProducts.filter(h=>_t[h]);o.includes("TOMATO")||o.push("TOMATO"),B(this,ie,zn).call(this,this.shelves,o,h=>B(this,ie,Dl).call(this,h)),B(this,ie,zn).call(this,this.tables,Object.keys(e.diningTables),h=>B(this,ie,kl).call(this,h)),e.coops.coop&&!this.coop&&B(this,ie,Nl).call(this),!e.coops.coop&&this.coop&&(this.scene.remove(this.coop.group),this.coop=null),this.coop&&this.coop.chickens.forEach((h,g)=>{h.visible=g<e.coops.coop.chickens,h.rotation.y=Math.sin(s*2+g*2)*.1}),B(this,ie,zn).call(this,this.upgradeMarkers,t.map(h=>h.id),h=>{const g=t.find(_=>_.id===h);g&&B(this,ie,Bl).call(this,g)},h=>B(this,ie,qs).call(this,h));for(const[h,g]of this.shelves){const _=((u=e.stock[g.id])==null?void 0:u.items[h])??0;g.productMeshes.forEach((m,p)=>{m.visible=p<_})}for(const[h,g]of this.machines){const _=((d=e.stock[`machine:${h}:output`])==null?void 0:d.items[g.outputItem])??0,m=Math.min(_,5);for(;g.output.children.length<m;){const x=new P(B(this,ie,On).call(this,g.outputItem),B(this,ie,Fn).call(this,g.outputItem));g.output.add(x)}g.output.children.forEach((x,v)=>{x.visible=v<m,x.position.set(v%2*.34,.15+Math.floor(v/2)*.3,Math.floor(v/2)*.2)});const p=e.machines[h];for(const{mesh:x,itemId:v,index:S}of g.inputMeshes)x.visible=S<(((f=e.stock[`machine:${h}:input`])==null?void 0:f.items[v])??0);g.lamp.material.color.setHex((p==null?void 0:p.blocked)==="output-full"?16730955:p!=null&&p.progressTicks?16762880:5819394),g.group.rotation.y=Math.sin(s*1.5)*(p&&p.progressTicks?.025:0)}const a=e.customers.map(h=>h.id);B(this,ie,zn).call(this,this.customers,a,h=>{const g=e.customers.find(_=>_.id===h);g&&this.customers.set(h,B(this,ie,Fl).call(this,g))},h=>B(this,ie,qs).call(this,h));for(const h of e.customers){const g=this.customers.get(h.id);g&&B(this,ie,zl).call(this,g,h,s,n)}const c=e.workers.map(h=>h.id);B(this,ie,zn).call(this,this.workers,c,h=>{const g=e.workers.find(_=>_.id===h);g&&this.workers.set(h,B(this,ie,Ol).call(this,g.type))}),e.workers.forEach((h,g)=>{var R;const _=this.workers.get(h.id);if(!_)return;const m=h.x??-8+g%3*.65,p=h.z??(g%2?.7:-.7);Math.hypot(m-_.group.position.x,p-_.group.position.z)>.025?(_.walkCycle+=n*12,_.legs[0].rotation.x=Math.sin(_.walkCycle)*.48,_.legs[1].rotation.x=-Math.sin(_.walkCycle)*.48,_.group.position.y=Math.abs(Math.sin(_.walkCycle*2))*.045):(_.legs[0].rotation.x=Gn.lerp(_.legs[0].rotation.x,0,n*10),_.legs[1].rotation.x=Gn.lerp(_.legs[1].rotation.x,0,n*10),_.group.position.y=Gn.lerp(_.group.position.y,0,n*10)),_.group.position.x=m,_.group.position.z=p,_.group.rotation.y=h.facing??0;const v=((R=e.stock[`worker:${h.id}`])==null?void 0:R.items)??{},S=Object.keys(v)[0];_.cargo.visible=!!S,S&&(_.cargo.geometry=B(this,ie,On).call(this,S),_.cargo.material=B(this,ie,Fn).call(this,S))});for(const h of this.upgradeMarkers.values())h.gem.position.y=.98+Math.sin(s*2.5)*.12,h.gem.rotation.y+=n;this.engine.render()}screenToWorld(e,t){const n=this.engine.renderer.domElement.getBoundingClientRect();this.pointer.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.engine.camera);const s=new I;return this.raycaster.ray.intersectPlane(this.groundPlane,s)?{x:s.x,z:s.z}:null}getCanvas(){return this.engine.renderer.domElement}}ie=new WeakSet,Cl=function(){this.playerCharacter=new Ec("shopkeeper"),this.playerMesh=this.playerCharacter.group,this.scene.add(this.playerMesh)},Ll=function(){const e=new P(new De(2.5,16,12),new yt({color:16774343}));e.position.set(-54,24,-36),this.scene.add(e)},Pl=function(){const e=new _e;e.position.set(at.register.x,0,at.register.z);const t=new P(new ve(2.1,.85,.95),new ne({color:2652359,roughness:.48}));t.position.y=.44,t.castShadow=!0,t.receiveShadow=!0;const n=new P(new ve(2.2,.12,1.05),new ne({color:15397623,roughness:.35}));n.position.y=.93;const s=new P(new ve(.42,.32,.12),new ne({color:1976635,emissive:729907}));s.position.set(-.5,1.17,-.2),e.add(t,n,s),this.scene.add(e),this.registerMesh=e},On=function(e){if(!this.itemGeometry.has(e)){const n=["TOMATO","ORANGE","EGG","CORN"].includes(e)?new De(.17,8,7):new ve(.28,.28,.28);n.userData.sharedAsset=!0,this.itemGeometry.set(e,n)}return this.itemGeometry.get(e)},Fn=function(e){if(!this.itemMaterials.has(e)){const t=new ne({color:Qe[e].color,roughness:.66});t.userData.sharedAsset=!0,this.itemMaterials.set(e,t)}return this.itemMaterials.get(e)},Je=function(e,t,n,s,r,o,a={}){const c=new P(t,new ne({color:n,roughness:a.metal?.35:.78,metalness:a.metal?.5:0,emissive:a.glow?n:0,emissiveIntensity:a.glow?.25:0}));return c.position.set(s,r,o),c.castShadow=!0,c.receiveShadow=!0,e.add(c),c},Il=function(e){if(this.farms.has(e))return;const t=at[e],n=new _e;n.position.set(t.x,0,t.z);const s=new P(new ve(3.8,.22,2.5),new ne({color:8739131,roughness:1}));s.position.y=.14,s.receiveShadow=!0,s.castShadow=!0,n.add(s);const r=new P(new ve(3.3,.08,2.05),new ne({color:5912619,roughness:1}));r.position.y=.29,n.add(r);const o=[];if(t.item==="ORANGE")for(const c of[-.88,.88]){B(this,ie,Je).call(this,n,new Le(.14,.19,1.35,8),8540460,c,.91,0);for(const[l,u,d,f]of[[0,1.69,0,.75],[-.3,1.48,.22,.5],[.3,1.51,-.2,.5]])B(this,ie,Je).call(this,n,new De(f,10,8),5024310,c+l,u,d);for(const[l,u,d]of[[-.5,1.38,.4],[.45,1.52,.42],[-.2,1.88,.52],[.25,1.25,-.48],[.05,2.05,-.15],[-.48,1.7,-.26]])o.push(B(this,ie,Je).call(this,n,new De(.17,9,8),16750080,c+l,u,d))}else for(const c of[-1.12,-.38,.38,1.12])for(const l of[-.57,.57]){const u=t.item==="WHEAT",d=u?.8:t.item==="CORN"?1.05:.6;B(this,ie,Je).call(this,n,new Le(.04,.07,d,6),u?10467905:4825908,c,.29+d/2,l);for(const g of[-1,1]){const _=B(this,ie,Je).call(this,n,new Qt(.16,.44,5),6339906,c+g*.15,.44+d*.4,l);_.rotation.z=g*.9}const f=t.item==="TOMATO"?16730955:t.item==="CORN"?16765226:16108648,h=u?new Qt(.13,.4,7):t.item==="CORN"?new Le(.11,.13,.38,8):new De(.21,9,8);o.push(B(this,ie,Je).call(this,n,h,f,c,.34+d,l+.13))}const a=new P(new sr(1.25,.045,6,28),new yt({color:9492585}));a.rotation.x=-Math.PI/2,a.position.y=.06,n.add(a),this.scene.add(n),this.farms.set(e,{group:n,produce:o,item:t.item})},Ul=function(e){var p;if(this.machines.has(e))return;const t=at[e],n=Yt[t.recipe],s=((p=Qe[n.output])==null?void 0:p.color)??16096779,r=new _e;r.position.set(t.x,0,t.z);const o=new P(new ve(2.1,.42,1.65),new ne({color:6584195,roughness:.55,metalness:.18}));o.position.y=.22,o.castShadow=!0,o.receiveShadow=!0;const a=new P(new ve(1.55,1.4,1.2),new ne({color:s,roughness:.5,metalness:.12}));a.position.y=1.05,a.castShadow=!0;const c=new P(new Le(.38,.42,.25,10),new ne({color:16317180,roughness:.25,metalness:.25}));c.rotation.x=Math.PI/2,c.position.set(0,1.35,.63),r.add(o,a,c);const l=14280425,u=3359061,d=(x,v,S,R=12)=>new Le(x,v,S,R),f=(x,v,S)=>new ve(x,v,S);if(e==="paste"){B(this,ie,Je).call(this,r,d(.7,.63,.58),12142629,0,1.65,0),B(this,ie,Je).call(this,r,d(.76,.76,.1),l,0,1.97,0,{metal:!0}),B(this,ie,Je).call(this,r,d(.08,.08,.42),l,0,2.22,0,{metal:!0});for(const x of[-.42,.42])B(this,ie,Je).call(this,r,d(.06,.06,.72),l,x,1.72,.35,{metal:!0});B(this,ie,Je).call(this,r,f(.5,.12,.15),u,0,1.35,.88)}else if(e==="juice")B(this,ie,Je).call(this,r,d(.45,.3,.42),16317180,0,1.67,0),B(this,ie,Je).call(this,r,d(.1,.4,.37),16762880,0,1.98,0),B(this,ie,Je).call(this,r,f(.82,.13,.12),u,0,2.32,0),B(this,ie,Je).call(this,r,d(.24,.22,.36),16767094,.52,.72,.48);else if(e==="popcorn"){B(this,ie,Je).call(this,r,f(1.38,1.28,.12),16774619,0,1.08,.68),B(this,ie,Je).call(this,r,f(1.15,.88,.08),10213616,0,1.12,.75,{metal:!0}),B(this,ie,Je).call(this,r,f(1.62,.18,1.36),16730955,0,1.84,0);for(const x of[-.53,.53])B(this,ie,Je).call(this,r,f(.13,1.25,.14),16777215,x,1.08,.72);for(const x of[-.3,0,.3])B(this,ie,Je).call(this,r,new De(.15,7,6),16774614,x,1.26,.83)}else if(e==="feed"){B(this,ie,Je).call(this,r,d(.53,.2,.72),14922836,0,1.75,0);const x=B(this,ie,Je).call(this,r,new sr(.34,.09,8,16),u,.86,1.19,0,{metal:!0});x.rotation.y=Math.PI/2,B(this,ie,Je).call(this,r,f(.25,.6,.37),9724216,.42,.76,.55)}else if(e==="bakery"||e==="pizzaKitchen")B(this,ie,Je).call(this,r,f(1.65,.16,1.48),15181403,0,1.83,0),B(this,ie,Je).call(this,r,f(1.04,.58,.1),6042661,0,.96,.66),B(this,ie,Je).call(this,r,new De(.25,8,7),16750080,0,.88,.73,{glow:!0}).scale.set(1.3,.65,.35),B(this,ie,Je).call(this,r,d(.2,.24,.72),u,-.5,2.2,-.37),e==="pizzaKitchen"&&B(this,ie,Je).call(this,r,d(.45,.45,.07),16106620,.4,1.94,.25);else if(e==="burgerKitchen"){B(this,ie,Je).call(this,r,f(1.3,.16,1.13),u,0,1.8,0),B(this,ie,Je).call(this,r,f(1.1,.08,.4),2435893,0,1.9,.37,{metal:!0});for(const x of[-.36,.36])B(this,ie,Je).call(this,r,d(.2,.2,.05),6830887,x,1.95,.32);B(this,ie,Je).call(this,r,f(.3,.09,.3),16762880,-.45,1.88,-.24)}const h=B(this,ie,Je).call(this,r,new De(.1,8,6),5819394,-.63,1.55,.68,{glow:!0}),g=new _e;g.position.set(-.9,.42,.72);const _=[];for(const[x,v]of Object.entries(n.inputs))for(let S=0;S<v;S+=1){const R=new P(B(this,ie,On).call(this,x),B(this,ie,Fn).call(this,x));R.position.set(_.length%2*.34,Math.floor(_.length/2)*.29,0),R.castShadow=!0,g.add(R),_.push({mesh:R,itemId:x,index:S})}r.add(g);const m=new _e;m.position.set(1.1,.5,.5),r.add(m),this.scene.add(r),this.machines.set(e,{group:r,inputMeshes:_,output:m,outputItem:n.output,lamp:h})},Dl=function(e){if(this.shelves.has(e)||!_t[e])return;const t=_t[e],n=new _e;n.position.set(t.x,0,t.z);const s=new ne({color:10118717,roughness:.85}),r=new ne({color:13934699,roughness:.75});for(const c of[-.65,.65]){const l=new P(new ve(.13,1.75,.13),s);l.position.set(c,.95,0),l.castShadow=!0,n.add(l)}const o=[];for(const c of[.48,.94,1.4]){const l=new P(new ve(1.55,.12,.78),r);l.position.set(0,c,-.02),l.castShadow=!0,l.receiveShadow=!0,n.add(l),o.push(c+.2)}const a=[];for(let c=0;c<t.capacity;c+=1){const l=new P(B(this,ie,On).call(this,e),B(this,ie,Fn).call(this,e)),u=Math.floor(c/3),d=c%3;l.position.set(-.45+d*.45,o[u%o.length],.02),l.scale.setScalar(e==="CORN"?1.2:.9),l.castShadow=!0,n.add(l),a.push(l)}this.scene.add(n),this.shelves.set(e,{group:n,productMeshes:a,id:t.id})},kl=function(e){if(this.tables.has(e))return;const t=at[e],n=new _e;n.position.set(t.x,0,t.z);const s=new P(new ve(1.9,.18,1.35),new ne({color:10312501,roughness:.65}));s.position.y=.92,s.castShadow=!0,n.add(s);for(const o of[-.68,.68])for(const a of[-.43,.43]){const c=new P(new ve(.13,.85,.13),new ne({color:5978412}));c.position.set(o,.45,a),n.add(c)}const r=new P(new ve(.62,.55,.62),new ne({color:8273710}));r.position.set(0,.46,1.1),n.add(r),this.scene.add(n),this.tables.set(e,n)},Nl=function(){const e=at.coop,t=new _e;t.position.set(e.x,0,e.z);const n=new P(new ve(2.6,.25,2.2),new ne({color:10186821,roughness:.9}));n.position.y=.15,n.receiveShadow=!0,t.add(n);const s=new ne({color:15189389,roughness:.88});for(let o=0;o<4;o+=1){const a=new P(new ve(.12,.78,.12),s);a.position.set(o<2?o?1.15:-1.15:0,.54,o<2||o===2?-.92:.92),t.add(a)}const r=[];for(let o=0;o<3;o+=1){const a=new _e,c=new P(new De(.25,9,8),new ne({color:16776171,roughness:.9})),l=new P(new Qt(.07,.14,5),new ne({color:16347926}));l.rotation.z=-Math.PI/2,l.position.set(.22,.07,0),c.position.y=.18,a.add(c,l),a.position.set(-.55+o*.55,.3,o%2?.38:-.3),t.add(a),r.push(a)}this.scene.add(t),this.coop={group:t,chickens:r}},Ol=function(e){const t=new _e,n={cashier:[1880310,1612246],harvester:[5819394,4629250],factoryFeeder:[16750080,15041792],caretaker:[16762880,15053312],chefWaiter:[16777215,16729943],waiter:[3094080,10837738]},[s,r]=n[e]??n.cashier,o=new P(new Le(.3,.26,.65,10),new ne({color:s,roughness:.5}));o.position.y=.6,o.castShadow=!0;const a=new P(new De(.28,10,10),new ne({color:16767916,roughness:.6}));a.position.y=1.18,a.castShadow=!0;const c=e==="chefWaiter"?new P(new Le(.3,.26,.45,10),new ne({color:16777215})):new P(new Le(.3,.32,.12,10),new ne({color:r}));c.position.y=e==="chefWaiter"?1.55:1.4;const l=new _e,u=new ne({color:2962486}),d=new P(new Le(.09,.08,.32,6),u);d.position.set(-.14,.16,0);const f=d.clone();f.position.x=.14,l.add(d,f);const h=new P(B(this,ie,On).call(this,"TOMATO"),B(this,ie,Fn).call(this,"TOMATO"));return h.name="worker-cargo",h.position.set(.36,.68,.05),h.scale.setScalar(.8),t.add(o,a,c,l,h),this.scene.add(t),{group:t,cargo:h,legs:[d,f],walkCycle:0}},Fl=function(e){const t=new _e,n=[...e.id].reduce((m,p)=>Math.imul(m,31)+p.charCodeAt(0)>>>0,7),s=new P(new Le(.3,.26,.65,10),new ne({color:wc[n%wc.length],roughness:.4}));s.position.y=.6,s.castShadow=!0;const r=new P(new De(.28,10,10),new ne({color:16767916,roughness:.6}));r.position.y=1.18,r.castShadow=!0;const o=new P(new De(.3,8,8),new ne({color:bc[(n>>>4)%bc.length]}));o.position.set(0,1.25,-.04);const a=new _e,c=new ne({color:2962486}),l=new P(new Le(.09,.08,.32,6),c);l.position.set(-.14,.16,0);const u=l.clone();u.position.x=.14,a.add(l,u);const d=new _e;d.position.set(0,1.75,0);const f=document.createElement("canvas");f.width=128,f.height=128;const h=new Da(f),g=new Wg(new bl({map:h,transparent:!0}));g.scale.set(.65,.65,1),d.add(g);const _=[];for(let m=0;m<3;m+=1){const p=new P(B(this,ie,On).call(this,"TOMATO"),B(this,ie,Fn).call(this,"TOMATO"));p.scale.setScalar(.58),p.position.set(-.22+m*.2,.48+m*.12,.36),p.visible=!1,_.push(p),t.add(p)}return t.add(s,r,o,a,d),this.scene.add(t),{group:t,legs:[l,u],bubble:d,bubbleCanvas:f,bubbleTexture:h,cargo:_,walkCycle:0,lastWish:null}},zl=function(e,t,n,s){var a,c;e.group.position.set(t.x,0,t.z),e.group.rotation.y=t.facing??0,!["paying","waiting-stock","waiting-meal","waiting-table","eating","ready-tip"].includes(t.phase)?(e.walkCycle+=s*12,e.legs[0].rotation.x=Math.sin(e.walkCycle)*.5,e.legs[1].rotation.x=-Math.sin(e.walkCycle)*.5,e.group.position.y=Math.abs(Math.sin(e.walkCycle*2))*.05):(e.legs[0].rotation.x=Gn.lerp(e.legs[0].rotation.x,0,s*10),e.legs[1].rotation.x=Gn.lerp(e.legs[1].rotation.x,0,s*10)),e.group.position.y+=Math.sin(n*3+t.id.length)*.012;const o=t.kind==="diner"?t.phase==="waiting-meal"?t.demand:null:["entering","to-shelf","waiting-stock","to-next-shelf"].includes(t.phase)?((a=t.shoppingList)==null?void 0:a[t.shoppingIndex??0])??t.demand:null;if(o!==e.lastWish){const l=e.bubbleCanvas.getContext("2d");l.clearRect(0,0,128,128),o&&Qe[o]&&(l.beginPath(),l.arc(64,60,48,0,Math.PI*2),l.fillStyle="#fff",l.fill(),l.lineWidth=6,l.strokeStyle="#2c3e50",l.stroke(),l.font="52px sans-serif",l.textAlign="center",l.textBaseline="middle",l.fillText(Qe[o].icon,64,62),e.bubbleTexture.needsUpdate=!0),e.bubble.visible=!!o,e.lastWish=o}(t.basket??[]).forEach((l,u)=>{const d=e.cargo[u];!d||!Qe[l]||(d.geometry=B(this,ie,On).call(this,l),d.material=B(this,ie,Fn).call(this,l),d.visible=!0)});for(let l=((c=t.basket)==null?void 0:c.length)??0;l<e.cargo.length;l+=1)e.cargo[l].visible=!1},Bl=function(e){if(this.upgradeMarkers.has(e.id))return;const t=new _e;t.position.set(e.x,0,e.z);const n=new P(new Le(.78,.92,.18,12),new ne({color:16762880,roughness:.45,metalness:.16}));n.position.y=.12,n.castShadow=!0;const s=new P(new ka(.42),new ne({color:5819394,emissive:1325824,roughness:.3}));s.position.y=.95,s.castShadow=!0,t.add(n,s),this.scene.add(t),this.upgradeMarkers.set(e.id,{group:t,gem:s})},zn=function(e,t,n,s){const r=new Set(t);for(const[o,a]of e)r.has(o)||(s==null||s(a),this.scene.remove(a.group??a),e.delete(o));for(const o of t)e.has(o)||n(o)},qs=function(e){(e.group??e).traverse(n=>{var s,r,o,a;(r=(s=n.geometry)==null?void 0:s.userData)!=null&&r.sharedAsset||(o=n.geometry)==null||o.dispose();for(const c of Array.isArray(n.material)?n.material:[n.material])(a=c==null?void 0:c.userData)!=null&&a.sharedAsset||c==null||c.dispose()})};const ea=.1,Tc=5;function Ac(i){const e=document.getElementById("game-container");e.innerHTML='<section class="fatal-card"><span>⚠️</span><h1>Oyun başlatılamadı</h1><p></p><small>Sayfayı yenileyip tekrar deneyebilirsin.</small></section>',e.querySelector("p").textContent=i}function i0(i,e){document.getElementById("recovery-modal").classList.remove("hidden"),document.getElementById("recovery-message").textContent=e.message,document.getElementById("btn-recovery-reset").addEventListener("click",()=>{if(window.confirm("Kayıt ve yedekleri silip yeni oyun başlatmak istiyor musun?"))try{i.clear(),window.location.reload()}catch(n){document.getElementById("recovery-message").textContent=`${e.message} ${n.message}`}},{once:!0})}function Rc(){let i,e;try{i=new xu,e=new _u(i)}catch(g){i&&g.name==="SaveRecoveryError"?i0(i,g):Ac(g.message);return}let t;try{t=new n0}catch(g){Ac(`3B sahne oluşturulamadı. ${g.message}`);return}t.setObstacles(e);const n=new Set;let s;const r=()=>{const g=n.size>0;e.setPaused(g),s==null||s.setEnabled(!g)},o=new Mu(e,null,g=>{g?n.add("modal"):(n.delete("modal"),n.delete("resume-required")),r()});s=new Su(t.getCanvas(),t,e,()=>document.getElementById("btn-interact").click()),e.recovered&&o.toast("Yedek kayıttan devam edildi."),e.getState().paused&&(n.add("resume-required"),r(),o.open("settings-modal"),o.toast("Oyun duraklatılmış olarak kaydedilmiş. Devam etmek için “Oyuna dön” düğmesine bas.")),e.setEventHandler(g=>{(g.type==="toast"||g.type==="sale"||g.type==="production"||g.type==="tip-ready")&&o.showEvent(g),g.type==="save-error"&&(n.add("save-error"),r(),o.toast(`Kayıt başarısız. Simülasyon duraklatıldı: ${g.message}`,"error")),g.type==="reset"&&(n.delete("save-error"),r(),o.toast("Yeni oyun hazır."))});let a=0;document.addEventListener("visibilitychange",()=>{if(document.hidden){a=Date.now(),n.add("background"),r();try{e.checkpoint()}catch(g){o.toast(`Kayıt başarısız: ${g.message}`,"error")}s.reset()}else a&&(a=0,n.delete("background"),n.add("resume-required"),r(),o.open("settings-modal"),o.toast("Oyun duraklatıldı. Devam etmek için “Oyuna dön” düğmesine bas."))});const c=()=>{try{e.checkpoint()}catch{}};window.addEventListener("pagehide",c);const l=t.getCanvas();l.addEventListener("webglcontextlost",g=>{g.preventDefault(),n.add("webgl"),r(),o.toast("3B görüntü durakladı; ekran geri geldiğinde yeniden bağlanacak.","error")}),l.addEventListener("webglcontextrestored",()=>{n.delete("webgl"),r(),o.toast("3B görüntü yeniden bağlandı.")});let u=performance.now(),d=0,f=0;function h(g){const _=Math.min((g-u)/1e3,.1);if(u=g,!(n.size>0)){const v=s.getMovementVector();Math.hypot(v.x,v.z)>.02?(e.clearPlayerTarget(),e.setPlayerMove(v,_)):e.updateTargetMove(_),d=Math.min(.5,d+_*e.getState().speedMultiplier);let S=0;for(;d>=ea&&S<Tc&&(e.tick(),d-=ea,S+=1,!(n.size>0)););S===Tc&&d>=ea&&(d=0)}const p=e.getState(),x=e.getAvailableUpgrades();try{!n.has("render-error")&&!n.has("webgl")&&t.render(p,x)}catch(v){n.add("render-error"),r(),o.toast(`Sahne çizilemedi: ${v.message}`,"error")}f+=_,f>=.12&&(f=0,o.render(p,e.getNearbyAction())),window.requestAnimationFrame(h)}window.requestAnimationFrame(h)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",Rc,{once:!0}):Rc();
