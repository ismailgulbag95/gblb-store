import '/src/style.css';
import { GameApplication } from '/src/application/GameApplication.js';
import { SaveService } from '/src/infrastructure/SaveService.js';
import { WorldScene } from '/src/presentation/WorldScene.js';
import { InputManager } from '/src/presentation/InputManager.js';
import { HUD } from '/src/presentation/HUD.js';
const values=new Map();
const app=new GameApplication(new SaveService({getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)}));
app.state.unlockedProducts.push('TOMATO_PASTE');app.state.pendingStationIds=['pasteShelf'];delete app.state.layout.pasteShelf;
const world=new WorldScene();
const input=new InputManager(world.getCanvas(),world,app,()=>{});
const hud=new HUD(app,input);
document.getElementById('loading-screen').classList.add('hidden');
document.getElementById('btn-layout').onclick=()=>input.setLayoutMode(!input.layoutMode);
input.onLayoutMessage=message=>document.getElementById('layout-help-text').textContent=message;
input.onSelectionChange=()=>{};
function render(){world.render(app.state,[],null);hud.render(app.state,null);requestAnimationFrame(render);}
render();
