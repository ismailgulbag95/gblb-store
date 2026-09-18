(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ba="160",$u=0,Sc=1,ju=2,dh=1,fh=2,Yn=3,_i=0,tn=1,pn=2,di=0,Ms=1,wc=2,yc=3,Ec=4,Ju=5,Ui=100,Qu=101,td=102,Tc=103,bc=104,ed=200,nd=201,id=202,sd=203,ma=204,ga=205,rd=206,od=207,ad=208,cd=209,ld=210,hd=211,ud=212,dd=213,fd=214,pd=0,md=1,gd=2,Jr=3,_d=4,xd=5,vd=6,Md=7,ph=0,Sd=1,wd=2,fi=0,yd=1,Ed=2,Td=3,bd=4,Ad=5,Rd=6,mh=300,Ts=301,bs=302,_a=303,xa=304,po=306,va=1e3,Ln=1001,Ma=1002,$e=1003,Ac=1004,Co=1005,Je=1006,Cd=1007,ir=1008,pi=1009,Pd=1010,Ld=1011,Ga=1012,gh=1013,ai=1014,ci=1015,sr=1016,_h=1017,xh=1018,ki=1020,Id=1021,In=1023,Dd=1024,Ud=1025,Fi=1026,As=1027,Od=1028,vh=1029,Nd=1030,Mh=1031,Sh=1033,Po=33776,Lo=33777,Io=33778,Do=33779,Rc=35840,Cc=35841,Pc=35842,Lc=35843,wh=36196,Ic=37492,Dc=37496,Uc=37808,Oc=37809,Nc=37810,kc=37811,Fc=37812,Bc=37813,Gc=37814,zc=37815,Hc=37816,Vc=37817,Wc=37818,Xc=37819,qc=37820,Yc=37821,Uo=36492,Zc=36494,Kc=36495,kd=36283,$c=36284,jc=36285,Jc=36286,yh=3e3,Bi=3001,Fd=3200,Bd=3201,Eh=0,Gd=1,Tn="",ke="srgb",Jn="srgb-linear",za="display-p3",mo="display-p3-linear",Qr="linear",le="srgb",to="rec709",eo="p3",Yi=7680,Qc=519,zd=512,Hd=513,Vd=514,Th=515,Wd=516,Xd=517,qd=518,Yd=519,Sa=35044,tl="300 es",wa=1035,$n=2e3,no=2001;class Us{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let el=1234567;const $s=Math.PI/180,rr=180/Math.PI;function jn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[r&255]+ze[r>>8&255]+ze[r>>16&255]+ze[r>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function je(r,t,e){return Math.max(t,Math.min(e,r))}function Ha(r,t){return(r%t+t)%t}function Zd(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function Kd(r,t,e){return r!==t?(e-r)/(t-r):0}function js(r,t,e){return(1-e)*r+e*t}function $d(r,t,e,n){return js(r,t,1-Math.exp(-e*n))}function jd(r,t=1){return t-Math.abs(Ha(r,t*2)-t)}function Jd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Qd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function tf(r,t){return r+Math.floor(Math.random()*(t-r+1))}function ef(r,t){return r+Math.random()*(t-r)}function nf(r){return r*(.5-Math.random())}function sf(r){r!==void 0&&(el=r);let t=el+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rf(r){return r*$s}function of(r){return r*rr}function ya(r){return(r&r-1)===0&&r!==0}function af(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function io(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function cf(r,t,e,n,i){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),f=s((n-t)/2),_=a((n-t)/2);switch(i){case"XYX":r.set(o*h,c*u,c*d,o*l);break;case"YZY":r.set(c*d,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*d,o*h,o*l);break;case"XZX":r.set(o*h,c*_,c*f,o*l);break;case"YXY":r.set(c*f,o*h,c*_,o*l);break;case"ZYZ":r.set(c*_,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function kn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ee(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Ve={DEG2RAD:$s,RAD2DEG:rr,generateUUID:jn,clamp:je,euclideanModulo:Ha,mapLinear:Zd,inverseLerp:Kd,lerp:js,damp:$d,pingpong:jd,smoothstep:Jd,smootherstep:Qd,randInt:tf,randFloat:ef,randFloatSpread:nf,seededRandom:sf,degToRad:rf,radToDeg:of,isPowerOfTwo:ya,ceilPowerOfTwo:af,floorPowerOfTwo:io,setQuaternionFromProperEuler:cf,normalize:ee,denormalize:kn};class Ct{constructor(t=0,e=0){Ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,i,s,a,o,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l)}set(t,e,n,i,s,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],_=n[8],g=i[0],m=i[3],p=i[6],v=i[1],x=i[4],S=i[7],T=i[2],b=i[5],E=i[8];return s[0]=a*g+o*v+c*T,s[3]=a*m+o*x+c*b,s[6]=a*p+o*S+c*E,s[1]=l*g+h*v+u*T,s[4]=l*m+h*x+u*b,s[7]=l*p+h*S+u*E,s[2]=d*g+f*v+_*T,s[5]=d*m+f*x+_*b,s[8]=d*p+f*S+_*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,_=e*u+n*d+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(i*l-h*n)*g,t[2]=(o*n-i*a)*g,t[3]=d*g,t[4]=(h*e-i*c)*g,t[5]=(i*s-o*e)*g,t[6]=f*g,t[7]=(n*c-l*e)*g,t[8]=(a*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Oo.makeScale(t,e)),this}rotate(t){return this.premultiply(Oo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Oo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Oo=new qt;function bh(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function so(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function lf(){const r=so("canvas");return r.style.display="block",r}const nl={};function Js(r){r in nl||(nl[r]=!0,console.warn(r))}const il=new qt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sl=new qt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Mr={[Jn]:{transfer:Qr,primaries:to,toReference:r=>r,fromReference:r=>r},[ke]:{transfer:le,primaries:to,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[mo]:{transfer:Qr,primaries:eo,toReference:r=>r.applyMatrix3(sl),fromReference:r=>r.applyMatrix3(il)},[za]:{transfer:le,primaries:eo,toReference:r=>r.convertSRGBToLinear().applyMatrix3(sl),fromReference:r=>r.applyMatrix3(il).convertLinearToSRGB()}},hf=new Set([Jn,mo]),ne={enabled:!0,_workingColorSpace:Jn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!hf.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Mr[t].toReference,i=Mr[e].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Mr[r].primaries},getTransfer:function(r){return r===Tn?Qr:Mr[r].transfer}};function Ss(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function No(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Zi;class Ah{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=so("canvas")),Zi.width=t.width,Zi.height=t.height;const n=Zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=so("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Ss(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ss(e[n]/255)*255):e[n]=Ss(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let uf=0;class Rh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=jn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ko(i[a].image)):s.push(ko(i[a]))}else s=ko(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function ko(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ah.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let df=0;class en extends Us{constructor(t=en.DEFAULT_IMAGE,e=en.DEFAULT_MAPPING,n=Ln,i=Ln,s=Je,a=ir,o=In,c=pi,l=en.DEFAULT_ANISOTROPY,h=Tn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=jn(),this.name="",this.source=new Rh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Bi?ke:Tn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case va:t.x=t.x-Math.floor(t.x);break;case Ln:t.x=t.x<0?0:1;break;case Ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case va:t.y=t.y-Math.floor(t.y);break;case Ln:t.y=t.y<0?0:1;break;case Ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ke?Bi:yh}set encoding(t){Js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Bi?ke:Tn}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=mh;en.DEFAULT_ANISOTROPY=1;class de{constructor(t=0,e=0,n=0,i=1){de.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],_=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,S=(f+1)/2,T=(p+1)/2,b=(h+d)/4,E=(u+g)/4,I=(_+m)/4;return x>S&&x>T?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=b/n,s=E/n):S>T?S<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(S),n=b/i,s=I/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=E/s,i=I/s),this.set(n,i,s,e),this}let v=Math.sqrt((m-_)*(m-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(u-g)/v,this.z=(d-h)/v,this.w=Math.acos((l+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ff extends Us{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Js("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Bi?ke:Tn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new en(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Rh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wi extends ff{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ch extends en{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pf extends en{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=$e,this.minFilter=$e,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],_=s[a+2],g=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=_,t[e+3]=g;return}if(u!==g||c!==d||l!==f||h!==_){let m=1-o;const p=c*d+l*f+h*_+u*g,v=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const T=Math.sqrt(x),b=Math.atan2(T,p*v);m=Math.sin(m*b)/T,o=Math.sin(o*b)/T}const S=o*v;if(c=c*m+d*S,l=l*m+f*S,h=h*m+_*S,u=u*m+g*S,m===1-o){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],_=s[a+3];return t[e]=o*_+h*u+c*f-l*d,t[e+1]=c*_+h*d+l*u-o*f,t[e+2]=l*_+h*f+o*d-c*u,t[e+3]=h*_-o*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),f=c(i/2),_=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*_,this._y=l*f*u-d*h*_,this._z=l*h*_+d*f*u,this._w=l*h*u-d*f*_;break;case"YXZ":this._x=d*h*u+l*f*_,this._y=l*f*u-d*h*_,this._z=l*h*_-d*f*u,this._w=l*h*u+d*f*_;break;case"ZXY":this._x=d*h*u-l*f*_,this._y=l*f*u+d*h*_,this._z=l*h*_+d*f*u,this._w=l*h*u-d*f*_;break;case"ZYX":this._x=d*h*u-l*f*_,this._y=l*f*u+d*h*_,this._z=l*h*_-d*f*u,this._w=l*h*u+d*f*_;break;case"YZX":this._x=d*h*u+l*f*_,this._y=l*f*u+d*h*_,this._z=l*h*_-d*f*u,this._w=l*h*u-d*f*_;break;case"XZY":this._x=d*h*u-l*f*_,this._y=l*f*u-d*h*_,this._z=l*h*_+d*f*u,this._w=l*h*u+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(s),n*Math.cos(s),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fo.copy(this).projectOnVector(t),this.sub(Fo)}reflect(t){return this.sub(Fo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fo=new P,rl=new mr;class gr{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Rn):Rn.fromBufferAttribute(s,a),Rn.applyMatrix4(t.matrixWorld),this.expandByPoint(Rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Sr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(t.matrixWorld),this.union(Sr)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Rn),Rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fs),wr.subVectors(this.max,Fs),Ki.subVectors(t.a,Fs),$i.subVectors(t.b,Fs),ji.subVectors(t.c,Fs),ei.subVectors($i,Ki),ni.subVectors(ji,$i),Ti.subVectors(Ki,ji);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-Ti.z,Ti.y,ei.z,0,-ei.x,ni.z,0,-ni.x,Ti.z,0,-Ti.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-Ti.y,Ti.x,0];return!Bo(e,Ki,$i,ji,wr)||(e=[1,0,0,0,1,0,0,0,1],!Bo(e,Ki,$i,ji,wr))?!1:(yr.crossVectors(ei,ni),e=[yr.x,yr.y,yr.z],Bo(e,Ki,$i,ji,wr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Hn=[new P,new P,new P,new P,new P,new P,new P,new P],Rn=new P,Sr=new gr,Ki=new P,$i=new P,ji=new P,ei=new P,ni=new P,Ti=new P,Fs=new P,wr=new P,yr=new P,bi=new P;function Bo(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){bi.fromArray(r,s);const o=i.x*Math.abs(bi.x)+i.y*Math.abs(bi.y)+i.z*Math.abs(bi.z),c=t.dot(bi),l=e.dot(bi),h=n.dot(bi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const mf=new gr,Bs=new P,Go=new P;class Va{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mf.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);const e=Bs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Bs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(Go)),this.expandByPoint(Bs.copy(t.center).sub(Go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Vn=new P,zo=new P,Er=new P,ii=new P,Ho=new P,Tr=new P,Vo=new P;class gf{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zo.copy(t).add(e).multiplyScalar(.5),Er.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(zo);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Er),o=ii.dot(this.direction),c=-ii.dot(Er),l=ii.lengthSq(),h=Math.abs(1-a*a);let u,d,f,_;if(h>0)if(u=a*c-o,d=a*o-c,_=s*h,u>=0)if(d>=-_)if(d<=_){const g=1/h;u*=g,d*=g,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-_?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=_?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(zo).addScaledVector(Er,d),f}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);const n=Vn.dot(this.direction),i=Vn.dot(Vn)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,n,i,s){Ho.subVectors(e,t),Tr.subVectors(n,t),Vo.crossVectors(Ho,Tr);let a=this.direction.dot(Vo),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ii.subVectors(this.origin,t);const c=o*this.direction.dot(Tr.crossVectors(ii,Tr));if(c<0)return null;const l=o*this.direction.dot(Ho.cross(ii));if(l<0||c+l>a)return null;const h=-o*ii.dot(Vo);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ye{constructor(t,e,n,i,s,a,o,c,l,h,u,d,f,_,g,m){ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l,h,u,d,f,_,g,m)}set(t,e,n,i,s,a,o,c,l,h,u,d,f,_,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ye().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ji.setFromMatrixColumn(t,0).length(),s=1/Ji.setFromMatrixColumn(t,1).length(),a=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,_=o*h,g=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+_*l,e[5]=d-g*l,e[9]=-o*c,e[2]=g-d*l,e[6]=_+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,_=l*h,g=l*u;e[0]=d+g*o,e[4]=_*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-_,e[6]=g+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,_=l*h,g=l*u;e[0]=d-g*o,e[4]=-a*u,e[8]=_+f*o,e[1]=f+_*o,e[5]=a*h,e[9]=g-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,f=a*u,_=o*h,g=o*u;e[0]=c*h,e[4]=_*l-f,e[8]=d*l+g,e[1]=c*u,e[5]=g*l+d,e[9]=f*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,_=o*c,g=o*l;e[0]=c*h,e[4]=g-d*u,e[8]=_*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=a*c,f=a*l,_=o*c,g=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+g,e[5]=a*h,e[9]=f*u-_,e[2]=_*u-f,e[6]=o*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_f,t,xf)}lookAt(t,e,n){const i=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),si.crossVectors(n,hn),si.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),si.crossVectors(n,hn)),si.normalize(),br.crossVectors(hn,si),i[0]=si.x,i[4]=br.x,i[8]=hn.x,i[1]=si.y,i[5]=br.y,i[9]=hn.y,i[2]=si.z,i[6]=br.z,i[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],_=n[2],g=n[6],m=n[10],p=n[14],v=n[3],x=n[7],S=n[11],T=n[15],b=i[0],E=i[4],I=i[8],M=i[12],w=i[1],U=i[5],k=i[9],Y=i[13],L=i[2],O=i[6],B=i[10],q=i[14],Z=i[3],K=i[7],$=i[11],nt=i[15];return s[0]=a*b+o*w+c*L+l*Z,s[4]=a*E+o*U+c*O+l*K,s[8]=a*I+o*k+c*B+l*$,s[12]=a*M+o*Y+c*q+l*nt,s[1]=h*b+u*w+d*L+f*Z,s[5]=h*E+u*U+d*O+f*K,s[9]=h*I+u*k+d*B+f*$,s[13]=h*M+u*Y+d*q+f*nt,s[2]=_*b+g*w+m*L+p*Z,s[6]=_*E+g*U+m*O+p*K,s[10]=_*I+g*k+m*B+p*$,s[14]=_*M+g*Y+m*q+p*nt,s[3]=v*b+x*w+S*L+T*Z,s[7]=v*E+x*U+S*O+T*K,s[11]=v*I+x*k+S*B+T*$,s[15]=v*M+x*Y+S*q+T*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],_=t[3],g=t[7],m=t[11],p=t[15];return _*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*f-n*c*f)+g*(+e*c*f-e*l*d+s*a*d-i*a*f+i*l*h-s*c*h)+m*(+e*l*u-e*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+p*(-i*o*h-e*c*u+e*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],_=t[12],g=t[13],m=t[14],p=t[15],v=u*m*l-g*d*l+g*c*f-o*m*f-u*c*p+o*d*p,x=_*d*l-h*m*l-_*c*f+a*m*f+h*c*p-a*d*p,S=h*g*l-_*u*l+_*o*f-a*g*f-h*o*p+a*u*p,T=_*u*c-h*g*c-_*o*d+a*g*d+h*o*m-a*u*m,b=e*v+n*x+i*S+s*T;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/b;return t[0]=v*E,t[1]=(g*d*s-u*m*s-g*i*f+n*m*f+u*i*p-n*d*p)*E,t[2]=(o*m*s-g*c*s+g*i*l-n*m*l-o*i*p+n*c*p)*E,t[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*f-n*c*f)*E,t[4]=x*E,t[5]=(h*m*s-_*d*s+_*i*f-e*m*f-h*i*p+e*d*p)*E,t[6]=(_*c*s-a*m*s-_*i*l+e*m*l+a*i*p-e*c*p)*E,t[7]=(a*d*s-h*c*s+h*i*l-e*d*l-a*i*f+e*c*f)*E,t[8]=S*E,t[9]=(_*u*s-h*g*s-_*n*f+e*g*f+h*n*p-e*u*p)*E,t[10]=(a*g*s-_*o*s+_*n*l-e*g*l-a*n*p+e*o*p)*E,t[11]=(h*o*s-a*u*s-h*n*l+e*u*l+a*n*f-e*o*f)*E,t[12]=T*E,t[13]=(h*g*i-_*u*i+_*n*d-e*g*d-h*n*m+e*u*m)*E,t[14]=(_*o*i-a*g*i-_*n*c+e*g*c+a*n*m-e*o*m)*E,t[15]=(a*u*i-h*o*i+h*n*c-e*u*c-a*n*d+e*o*d)*E,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,_=s*u,g=a*h,m=a*u,p=o*u,v=c*l,x=c*h,S=c*u,T=n.x,b=n.y,E=n.z;return i[0]=(1-(g+p))*T,i[1]=(f+S)*T,i[2]=(_-x)*T,i[3]=0,i[4]=(f-S)*b,i[5]=(1-(d+p))*b,i[6]=(m+v)*b,i[7]=0,i[8]=(_+x)*E,i[9]=(m-v)*E,i[10]=(1-(d+g))*E,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ji.set(i[0],i[1],i[2]).length();const a=Ji.set(i[4],i[5],i[6]).length(),o=Ji.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Cn.copy(this);const l=1/s,h=1/a,u=1/o;return Cn.elements[0]*=l,Cn.elements[1]*=l,Cn.elements[2]*=l,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=u,Cn.elements[9]*=u,Cn.elements[10]*=u,e.setFromRotationMatrix(Cn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=$n){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,_;if(o===$n)f=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===no)f=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=$n){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(a-s),d=(e+t)*l,f=(n+i)*h;let _,g;if(o===$n)_=(a+s)*u,g=-2*u;else if(o===no)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new P,Cn=new ye,_f=new P(0,0,0),xf=new P(1,1,1),si=new P,br=new P,hn=new P,ol=new ye,al=new mr;class go{constructor(t=0,e=0,n=0,i=go.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ol.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ol,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return al.setFromEuler(this),this.setFromQuaternion(al,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}go.DEFAULT_ORDER="XYZ";class Ph{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let vf=0;const cl=new P,Qi=new mr,Wn=new ye,Ar=new P,Gs=new P,Mf=new P,Sf=new mr,ll=new P(1,0,0),hl=new P(0,1,0),ul=new P(0,0,1),wf={type:"added"},yf={type:"removed"};class Ue extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ue.DEFAULT_UP.clone();const t=new P,e=new go,n=new mr,i=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ye},normalMatrix:{value:new qt}}),this.matrix=new ye,this.matrixWorld=new ye,this.matrixAutoUpdate=Ue.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(ll,t)}rotateY(t){return this.rotateOnAxis(hl,t)}rotateZ(t){return this.rotateOnAxis(ul,t)}translateOnAxis(t,e){return cl.copy(t).applyQuaternion(this.quaternion),this.position.add(cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ll,t)}translateY(t){return this.translateOnAxis(hl,t)}translateZ(t){return this.translateOnAxis(ul,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ar.copy(t):Ar.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wn.lookAt(Gs,Ar,this.up):Wn.lookAt(Ar,Gs,this.up),this.quaternion.setFromRotationMatrix(Wn),i&&(Wn.extractRotation(i.matrixWorld),Qi.setFromRotationMatrix(Wn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(wf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,t,Mf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,Sf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ue.DEFAULT_UP=new P(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new P,Xn=new P,Wo=new P,qn=new P,ts=new P,es=new P,dl=new P,Xo=new P,qo=new P,Yo=new P;let Rr=!1;class En{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Pn.subVectors(t,e),i.cross(Pn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){Pn.subVectors(i,e),Xn.subVectors(n,e),Wo.subVectors(t,e);const a=Pn.dot(Pn),o=Pn.dot(Xn),c=Pn.dot(Wo),l=Xn.dot(Xn),h=Xn.dot(Wo),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,_=(a*h-o*c)*d;return s.set(1-f-_,_,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getUV(t,e,n,i,s,a,o,c){return Rr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rr=!0),this.getInterpolation(t,e,n,i,s,a,o,c)}static getInterpolation(t,e,n,i,s,a,o,c){return this.getBarycoord(t,e,n,i,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qn.x),c.addScaledVector(a,qn.y),c.addScaledVector(o,qn.z),c)}static isFrontFacing(t,e,n,i){return Pn.subVectors(n,e),Xn.subVectors(t,e),Pn.cross(Xn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),Xn.subVectors(this.a,this.b),Pn.cross(Xn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return En.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return En.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,s){return Rr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Rr=!0),En.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}getInterpolation(t,e,n,i,s){return En.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return En.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return En.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;ts.subVectors(i,n),es.subVectors(s,n),Xo.subVectors(t,n);const c=ts.dot(Xo),l=es.dot(Xo);if(c<=0&&l<=0)return e.copy(n);qo.subVectors(t,i);const h=ts.dot(qo),u=es.dot(qo);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ts,a);Yo.subVectors(t,s);const f=ts.dot(Yo),_=es.dot(Yo);if(_>=0&&f<=_)return e.copy(s);const g=f*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(es,o);const m=h*_-f*u;if(m<=0&&u-h>=0&&f-_>=0)return dl.subVectors(s,i),o=(u-h)/(u-h+(f-_)),e.copy(i).addScaledVector(dl,o);const p=1/(m+g+d);return a=g*p,o=d*p,e.copy(n).addScaledVector(ts,a).addScaledVector(es,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function Zo(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ne.workingColorSpace){if(t=Ha(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Zo(a,s,t+1/3),this.g=Zo(a,s,t),this.b=Zo(a,s,t-1/3)}return ne.toWorkingColorSpace(this,i),this}setStyle(t,e=ke){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Lh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}copyLinearToSRGB(t){return this.r=No(t.r),this.g=No(t.g),this.b=No(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return ne.fromWorkingColorSpace(He.copy(this),t),Math.round(je(He.r*255,0,255))*65536+Math.round(je(He.g*255,0,255))*256+Math.round(je(He.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(He.copy(this),e);const n=He.r,i=He.g,s=He.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=ke){ne.fromWorkingColorSpace(He.copy(this),t);const e=He.r,n=He.g,i=He.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(Cr);const n=js(ri.h,Cr.h,e),i=js(ri.s,Cr.s,e),s=js(ri.l,Cr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new Kt;Kt.NAMES=Lh;let Ef=0;class Os extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=jn(),this.name="",this.type="Material",this.blending=Ms,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=Ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Jr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(n.blending=this.blending),this.side!==_i&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==Ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Jr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Qt extends Os{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new P,Pr=new Ct;class Dn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Sa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pr.fromBufferAttribute(this,e),Pr.applyMatrix3(t),this.setXY(e,Pr.x,Pr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=kn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=kn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=kn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=kn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=kn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sa&&(t.usage=this.usage),t}}class Ih extends Dn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Dh extends Dn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends Dn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tf=0;const wn=new ye,Ko=new Ue,ns=new P,un=new gr,zs=new gr,De=new P;class cn extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bh(t)?Dh:Ih)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new qt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return wn.makeRotationFromQuaternion(t),this.applyMatrix4(wn),this}rotateX(t){return wn.makeRotationX(t),this.applyMatrix4(wn),this}rotateY(t){return wn.makeRotationY(t),this.applyMatrix4(wn),this}rotateZ(t){return wn.makeRotationZ(t),this.applyMatrix4(wn),this}translate(t,e,n){return wn.makeTranslation(t,e,n),this.applyMatrix4(wn),this}scale(t,e,n){return wn.makeScale(t,e,n),this.applyMatrix4(wn),this}lookAt(t){return Ko.lookAt(t),Ko.updateMatrix(),this.applyMatrix4(Ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new he(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Va);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];zs.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(un.min,zs.min),un.expandByPoint(De),De.addVectors(un.max,zs.max),un.expandByPoint(De)):(un.expandByPoint(zs.min),un.expandByPoint(zs.max))}un.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)De.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(De));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)De.fromBufferAttribute(o,l),c&&(ns.fromBufferAttribute(t,l),De.add(ns)),i=Math.max(i,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,s=e.normal.array,a=e.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Dn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let w=0;w<o;w++)l[w]=new P,h[w]=new P;const u=new P,d=new P,f=new P,_=new Ct,g=new Ct,m=new Ct,p=new P,v=new P;function x(w,U,k){u.fromArray(i,w*3),d.fromArray(i,U*3),f.fromArray(i,k*3),_.fromArray(a,w*2),g.fromArray(a,U*2),m.fromArray(a,k*2),d.sub(u),f.sub(u),g.sub(_),m.sub(_);const Y=1/(g.x*m.y-m.x*g.y);isFinite(Y)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-g.y).multiplyScalar(Y),v.copy(f).multiplyScalar(g.x).addScaledVector(d,-m.x).multiplyScalar(Y),l[w].add(p),l[U].add(p),l[k].add(p),h[w].add(v),h[U].add(v),h[k].add(v))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let w=0,U=S.length;w<U;++w){const k=S[w],Y=k.start,L=k.count;for(let O=Y,B=Y+L;O<B;O+=3)x(n[O+0],n[O+1],n[O+2])}const T=new P,b=new P,E=new P,I=new P;function M(w){E.fromArray(s,w*3),I.copy(E);const U=l[w];T.copy(U),T.sub(E.multiplyScalar(E.dot(U))).normalize(),b.crossVectors(I,U);const Y=b.dot(h[w])<0?-1:1;c[w*4]=T.x,c[w*4+1]=T.y,c[w*4+2]=T.z,c[w*4+3]=Y}for(let w=0,U=S.length;w<U;++w){const k=S[w],Y=k.start,L=k.count;for(let O=Y,B=Y+L;O<B;O+=3)M(n[O+0]),M(n[O+1]),M(n[O+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Dn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new P,s=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){const _=t.getX(d+0),g=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,_=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?f=c[g]*o.data.stride+o.offset:f=c[g]*h;for(let p=0;p<h;p++)d[_++]=l[f++]}return new Dn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new cn,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fl=new ye,Ai=new gf,Lr=new Va,pl=new P,is=new P,ss=new P,rs=new P,$o=new P,Ir=new P,Dr=new Ct,Ur=new Ct,Or=new Ct,ml=new P,gl=new P,_l=new P,Nr=new P,kr=new P;class R extends Ue{constructor(t=new cn,e=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){Ir.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&($o.fromBufferAttribute(u,t),a?Ir.addScaledVector($o,h):Ir.addScaledVector($o.sub(e),h))}e.add(Ir)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(s),Ai.copy(t.ray).recast(t.near),!(Lr.containsPoint(Ai.origin)===!1&&(Ai.intersectSphere(Lr,pl)===null||Ai.origin.distanceToSquared(pl)>(t.far-t.near)**2))&&(fl.copy(s).invert(),Ai.copy(t.ray).applyMatrix4(fl),!(n.boundingBox!==null&&Ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ai)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const m=d[_],p=a[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,T=x;S<T;S+=3){const b=o.getX(S),E=o.getX(S+1),I=o.getX(S+2);i=Fr(this,p,t,n,l,h,u,b,E,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=o.getX(m),x=o.getX(m+1),S=o.getX(m+2);i=Fr(this,a,t,n,l,h,u,v,x,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const m=d[_],p=a[m.materialIndex],v=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=v,T=x;S<T;S+=3){const b=S,E=S+1,I=S+2;i=Fr(this,p,t,n,l,h,u,b,E,I),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const v=m,x=m+1,S=m+2;i=Fr(this,a,t,n,l,h,u,v,x,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function bf(r,t,e,n,i,s,a,o){let c;if(t.side===tn?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,t.side===_i,o),c===null)return null;kr.copy(o),kr.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(kr);return l<e.near||l>e.far?null:{distance:l,point:kr.clone(),object:r}}function Fr(r,t,e,n,i,s,a,o,c,l){r.getVertexPosition(o,is),r.getVertexPosition(c,ss),r.getVertexPosition(l,rs);const h=bf(r,t,e,n,is,ss,rs,Nr);if(h){i&&(Dr.fromBufferAttribute(i,o),Ur.fromBufferAttribute(i,c),Or.fromBufferAttribute(i,l),h.uv=En.getInterpolation(Nr,is,ss,rs,Dr,Ur,Or,new Ct)),s&&(Dr.fromBufferAttribute(s,o),Ur.fromBufferAttribute(s,c),Or.fromBufferAttribute(s,l),h.uv1=En.getInterpolation(Nr,is,ss,rs,Dr,Ur,Or,new Ct),h.uv2=h.uv1),a&&(ml.fromBufferAttribute(a,o),gl.fromBufferAttribute(a,c),_l.fromBufferAttribute(a,l),h.normal=En.getInterpolation(Nr,is,ss,rs,ml,gl,_l,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new P,materialIndex:0};En.getNormal(is,ss,rs,u.normal),h.face=u}return h}class st extends cn{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;_("z","y","x",-1,-1,n,e,t,a,s,0),_("z","y","x",1,-1,n,e,-t,a,s,1),_("x","z","y",1,1,t,n,e,i,a,2),_("x","z","y",1,-1,t,n,-e,i,a,3),_("x","y","z",1,-1,t,e,n,i,s,4),_("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2));function _(g,m,p,v,x,S,T,b,E,I,M){const w=S/E,U=T/I,k=S/2,Y=T/2,L=b/2,O=E+1,B=I+1;let q=0,Z=0;const K=new P;for(let $=0;$<B;$++){const nt=$*U-Y;for(let it=0;it<O;it++){const X=it*w-k;K[g]=X*v,K[m]=nt*x,K[p]=L,l.push(K.x,K.y,K.z),K[g]=0,K[m]=0,K[p]=b>0?1:-1,h.push(K.x,K.y,K.z),u.push(it/E),u.push(1-$/I),q+=1}}for(let $=0;$<I;$++)for(let nt=0;nt<E;nt++){const it=d+nt+O*$,X=d+nt+O*($+1),j=d+(nt+1)+O*($+1),ot=d+(nt+1)+O*$;c.push(it,X,ot),c.push(X,j,ot),Z+=6}o.addGroup(f,Z,M),f+=Z,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new st(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ke(r){const t={};for(let e=0;e<r.length;e++){const n=Rs(r[e]);for(const i in n)t[i]=n[i]}return t}function Af(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Uh(r){return r.getRenderTarget()===null?r.outputColorSpace:ne.workingColorSpace}const Rf={clone:Rs,merge:Ke};var Cf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Xi extends Os{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cf,this.fragmentShader=Pf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=Af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Oh extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ye,this.projectionMatrix=new ye,this.projectionMatrixInverse=new ye,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class fn extends Oh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rr*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($s*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const os=-90,as=1;class Lf extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new fn(os,as,t,e);i.layers=this.layers,this.add(i);const s=new fn(os,as,t,e);s.layers=this.layers,this.add(s);const a=new fn(os,as,t,e);a.layers=this.layers,this.add(a);const o=new fn(os,as,t,e);o.layers=this.layers,this.add(o);const c=new fn(os,as,t,e);c.layers=this.layers,this.add(c);const l=new fn(os,as,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===no)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Nh extends en{constructor(t,e,n,i,s,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ts,super(t,e,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class If extends Wi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Js("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Bi?ke:Tn),this.texture=new Nh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new st(5,5,5),s=new Xi({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:di});s.uniforms.tEquirect.value=e;const a=new R(i,s),o=e.minFilter;return e.minFilter===ir&&(e.minFilter=Je),new Lf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const jo=new P,Df=new P,Uf=new qt;class Li{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=jo.subVectors(n,e).cross(Df.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(jo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Uf.getNormalMatrix(t),i=this.coplanarPoint(jo).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new Va,Br=new P;class Wa{constructor(t=new Li,e=new Li,n=new Li,i=new Li,s=new Li,a=new Li){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){const n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],_=i[9],g=i[10],m=i[11],p=i[12],v=i[13],x=i[14],S=i[15];if(n[0].setComponents(c-s,d-l,m-f,S-p).normalize(),n[1].setComponents(c+s,d+l,m+f,S+p).normalize(),n[2].setComponents(c+a,d+h,m+_,S+v).normalize(),n[3].setComponents(c-a,d-h,m-_,S-v).normalize(),n[4].setComponents(c-o,d-u,m-g,S-x).normalize(),e===$n)n[5].setComponents(c+o,d+u,m+g,S+x).normalize();else if(e===no)n[5].setComponents(o,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){return Ri.center.set(0,0,0),Ri.radius=.7071067811865476,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Br.x=i.normal.x>0?t.max.x:t.min.x,Br.y=i.normal.y>0?t.max.y:t.min.y,Br.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Br)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kh(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Of(r,t){const e=t.isWebGL2,n=new WeakMap;function i(l,h){const u=l.array,d=l.usage,f=u.byteLength,_=r.createBuffer();r.bindBuffer(h,_),r.bufferData(h,u,d),l.onUploadCallback();let g;if(u instanceof Float32Array)g=r.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=r.SHORT;else if(u instanceof Uint32Array)g=r.UNSIGNED_INT;else if(u instanceof Int32Array)g=r.INT;else if(u instanceof Int8Array)g=r.BYTE;else if(u instanceof Uint8Array)g=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function s(l,h,u){const d=h.array,f=h._updateRange,_=h.updateRanges;if(r.bindBuffer(u,l),f.count===-1&&_.length===0&&r.bufferSubData(u,0,d),_.length!==0){for(let g=0,m=_.length;g<m;g++){const p=_[g];e?r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(r.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}class Ae extends cn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=t/o,d=e/c,f=[],_=[],g=[],m=[];for(let p=0;p<h;p++){const v=p*d-a;for(let x=0;x<l;x++){const S=x*u-s;_.push(S,-v,0),g.push(0,0,1),m.push(x/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const x=v+l*p,S=v+l*(p+1),T=v+1+l*(p+1),b=v+1+l*p;f.push(x,S,b),f.push(S,T,b)}this.setIndex(f),this.setAttribute("position",new he(_,3)),this.setAttribute("normal",new he(g,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ae(t.width,t.height,t.widthSegments,t.heightSegments)}}var Nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kf=`#ifdef USE_ALPHAHASH
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
#endif`,Ff=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,zf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hf=`#ifdef USE_AOMAP
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
#endif`,Vf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wf=`#ifdef USE_BATCHING
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
#endif`,Xf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,qf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
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
#endif`,$f=`#ifdef USE_BUMPMAP
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
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ep=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,rp=`#define PI 3.141592653589793
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
} // validated`,op=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ap=`vec3 transformedNormal = objectNormal;
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
#endif`,cp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",fp=`
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
}`,pp=`#ifdef USE_ENVMAP
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
#endif`,mp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yp=`#ifdef USE_GRADIENTMAP
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
}`,Ep=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
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
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
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
#endif`,Op=`struct PhysicalMaterial {
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
}`,Np=`
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qp=`#if defined( USE_POINTS_UV )
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
#endif`,Yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$p=`#ifdef USE_MORPHNORMALS
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
#endif`,jp=`#ifdef USE_MORPHTARGETS
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
#endif`,Jp=`#ifdef USE_MORPHTARGETS
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
#endif`,Qp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,im=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sm=`#ifdef USE_NORMALMAP
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
#endif`,rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,om=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,am=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Mm=`float getShadowMask() {
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
}`,Sm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wm=`#ifdef USE_SKINNING
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
#endif`,ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Em=`#ifdef USE_SKINNING
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
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Pm=`#ifdef USE_TRANSMISSION
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
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
}`,Hm=`#if DEPTH_PACKING == 3200
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
}`,Vm=`#define DISTANCE
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
}`,Wm=`#define DISTANCE
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
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`uniform float scale;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Km=`#include <common>
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
}`,$m=`uniform vec3 diffuse;
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
}`,jm=`#define LAMBERT
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
}`,Jm=`#define LAMBERT
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
}`,Qm=`#define MATCAP
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
}`,t0=`#define MATCAP
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
}`,e0=`#define NORMAL
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
}`,n0=`#define NORMAL
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
}`,i0=`#define PHONG
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
}`,s0=`#define PHONG
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
}`,r0=`#define STANDARD
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
}`,o0=`#define STANDARD
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
}`,a0=`#define TOON
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
}`,c0=`#define TOON
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
}`,l0=`uniform float size;
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
}`,h0=`uniform vec3 diffuse;
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
}`,u0=`#include <common>
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
}`,d0=`uniform vec3 color;
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
}`,f0=`uniform float rotation;
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
}`,p0=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:Nf,alphahash_pars_fragment:kf,alphamap_fragment:Ff,alphamap_pars_fragment:Bf,alphatest_fragment:Gf,alphatest_pars_fragment:zf,aomap_fragment:Hf,aomap_pars_fragment:Vf,batching_pars_vertex:Wf,batching_vertex:Xf,begin_vertex:qf,beginnormal_vertex:Yf,bsdfs:Zf,iridescence_fragment:Kf,bumpmap_pars_fragment:$f,clipping_planes_fragment:jf,clipping_planes_pars_fragment:Jf,clipping_planes_pars_vertex:Qf,clipping_planes_vertex:tp,color_fragment:ep,color_pars_fragment:np,color_pars_vertex:ip,color_vertex:sp,common:rp,cube_uv_reflection_fragment:op,defaultnormal_vertex:ap,displacementmap_pars_vertex:cp,displacementmap_vertex:lp,emissivemap_fragment:hp,emissivemap_pars_fragment:up,colorspace_fragment:dp,colorspace_pars_fragment:fp,envmap_fragment:pp,envmap_common_pars_fragment:mp,envmap_pars_fragment:gp,envmap_pars_vertex:_p,envmap_physical_pars_fragment:Cp,envmap_vertex:xp,fog_vertex:vp,fog_pars_vertex:Mp,fog_fragment:Sp,fog_pars_fragment:wp,gradientmap_pars_fragment:yp,lightmap_fragment:Ep,lightmap_pars_fragment:Tp,lights_lambert_fragment:bp,lights_lambert_pars_fragment:Ap,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Lp,lights_phong_fragment:Ip,lights_phong_pars_fragment:Dp,lights_physical_fragment:Up,lights_physical_pars_fragment:Op,lights_fragment_begin:Np,lights_fragment_maps:kp,lights_fragment_end:Fp,logdepthbuf_fragment:Bp,logdepthbuf_pars_fragment:Gp,logdepthbuf_pars_vertex:zp,logdepthbuf_vertex:Hp,map_fragment:Vp,map_pars_fragment:Wp,map_particle_fragment:Xp,map_particle_pars_fragment:qp,metalnessmap_fragment:Yp,metalnessmap_pars_fragment:Zp,morphcolor_vertex:Kp,morphnormal_vertex:$p,morphtarget_pars_vertex:jp,morphtarget_vertex:Jp,normal_fragment_begin:Qp,normal_fragment_maps:tm,normal_pars_fragment:em,normal_pars_vertex:nm,normal_vertex:im,normalmap_pars_fragment:sm,clearcoat_normal_fragment_begin:rm,clearcoat_normal_fragment_maps:om,clearcoat_pars_fragment:am,iridescence_pars_fragment:cm,opaque_fragment:lm,packing:hm,premultiplied_alpha_fragment:um,project_vertex:dm,dithering_fragment:fm,dithering_pars_fragment:pm,roughnessmap_fragment:mm,roughnessmap_pars_fragment:gm,shadowmap_pars_fragment:_m,shadowmap_pars_vertex:xm,shadowmap_vertex:vm,shadowmask_pars_fragment:Mm,skinbase_vertex:Sm,skinning_pars_vertex:wm,skinning_vertex:ym,skinnormal_vertex:Em,specularmap_fragment:Tm,specularmap_pars_fragment:bm,tonemapping_fragment:Am,tonemapping_pars_fragment:Rm,transmission_fragment:Cm,transmission_pars_fragment:Pm,uv_pars_fragment:Lm,uv_pars_vertex:Im,uv_vertex:Dm,worldpos_vertex:Um,background_vert:Om,background_frag:Nm,backgroundCube_vert:km,backgroundCube_frag:Fm,cube_vert:Bm,cube_frag:Gm,depth_vert:zm,depth_frag:Hm,distanceRGBA_vert:Vm,distanceRGBA_frag:Wm,equirect_vert:Xm,equirect_frag:qm,linedashed_vert:Ym,linedashed_frag:Zm,meshbasic_vert:Km,meshbasic_frag:$m,meshlambert_vert:jm,meshlambert_frag:Jm,meshmatcap_vert:Qm,meshmatcap_frag:t0,meshnormal_vert:e0,meshnormal_frag:n0,meshphong_vert:i0,meshphong_frag:s0,meshphysical_vert:r0,meshphysical_frag:o0,meshtoon_vert:a0,meshtoon_frag:c0,points_vert:l0,points_frag:h0,shadow_vert:u0,shadow_frag:d0,sprite_vert:f0,sprite_frag:p0},ct={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},Nn={basic:{uniforms:Ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ke([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ke([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ke([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ke([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ke([ct.points,ct.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ke([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ke([ct.common,ct.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ke([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ke([ct.sprite,ct.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:Ke([ct.common,ct.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:Ke([ct.lights,ct.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Nn.physical={uniforms:Ke([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Gr={r:0,b:0,g:0};function m0(r,t,e,n,i,s,a){const o=new Kt(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function _(m,p){let v=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?e:t).get(x)),x===null?g(o,c):x&&x.isColor&&(g(x,1),v=!0);const S=r.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===po)?(h===void 0&&(h=new R(new st(1,1,1),new Xi({name:"BackgroundCubeMaterial",uniforms:Rs(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,b,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new R(new Ae(2,2),new Xi({name:"BackgroundMaterial",uniforms:Rs(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=ne.getTransfer(x.colorSpace)!==le,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,p){m.getRGB(Gr,Uh(r)),n.buffers.color.setClear(Gr.r,Gr.g,Gr.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(o,c)},render:_}}function g0(r,t,e,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},c=m(null);let l=c,h=!1;function u(L,O,B,q,Z){let K=!1;if(a){const $=g(q,B,O);l!==$&&(l=$,f(l.object)),K=p(L,q,B,Z),K&&v(L,q,B,Z)}else{const $=O.wireframe===!0;(l.geometry!==q.id||l.program!==B.id||l.wireframe!==$)&&(l.geometry=q.id,l.program=B.id,l.wireframe=$,K=!0)}Z!==null&&e.update(Z,r.ELEMENT_ARRAY_BUFFER),(K||h)&&(h=!1,I(L,O,B,q),Z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function _(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,O,B){const q=B.wireframe===!0;let Z=o[L.id];Z===void 0&&(Z={},o[L.id]=Z);let K=Z[O.id];K===void 0&&(K={},Z[O.id]=K);let $=K[q];return $===void 0&&($=m(d()),K[q]=$),$}function m(L){const O=[],B=[],q=[];for(let Z=0;Z<i;Z++)O[Z]=0,B[Z]=0,q[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:B,attributeDivisors:q,object:L,attributes:{},index:null}}function p(L,O,B,q){const Z=l.attributes,K=O.attributes;let $=0;const nt=B.getAttributes();for(const it in nt)if(nt[it].location>=0){const j=Z[it];let ot=K[it];if(ot===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(ot=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(ot=L.instanceColor)),j===void 0||j.attribute!==ot||ot&&j.data!==ot.data)return!0;$++}return l.attributesNum!==$||l.index!==q}function v(L,O,B,q){const Z={},K=O.attributes;let $=0;const nt=B.getAttributes();for(const it in nt)if(nt[it].location>=0){let j=K[it];j===void 0&&(it==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),it==="instanceColor"&&L.instanceColor&&(j=L.instanceColor));const ot={};ot.attribute=j,j&&j.data&&(ot.data=j.data),Z[it]=ot,$++}l.attributes=Z,l.attributesNum=$,l.index=q}function x(){const L=l.newAttributes;for(let O=0,B=L.length;O<B;O++)L[O]=0}function S(L){T(L,0)}function T(L,O){const B=l.newAttributes,q=l.enabledAttributes,Z=l.attributeDivisors;B[L]=1,q[L]===0&&(r.enableVertexAttribArray(L),q[L]=1),Z[L]!==O&&((n.isWebGL2?r:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,O),Z[L]=O)}function b(){const L=l.newAttributes,O=l.enabledAttributes;for(let B=0,q=O.length;B<q;B++)O[B]!==L[B]&&(r.disableVertexAttribArray(B),O[B]=0)}function E(L,O,B,q,Z,K,$){$===!0?r.vertexAttribIPointer(L,O,B,Z,K):r.vertexAttribPointer(L,O,B,q,Z,K)}function I(L,O,B,q){if(n.isWebGL2===!1&&(L.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();const Z=q.attributes,K=B.getAttributes(),$=O.defaultAttributeValues;for(const nt in K){const it=K[nt];if(it.location>=0){let X=Z[nt];if(X===void 0&&(nt==="instanceMatrix"&&L.instanceMatrix&&(X=L.instanceMatrix),nt==="instanceColor"&&L.instanceColor&&(X=L.instanceColor)),X!==void 0){const j=X.normalized,ot=X.itemSize,Mt=e.get(X);if(Mt===void 0)continue;const vt=Mt.buffer,Dt=Mt.type,Ut=Mt.bytesPerElement,Et=n.isWebGL2===!0&&(Dt===r.INT||Dt===r.UNSIGNED_INT||X.gpuType===gh);if(X.isInterleavedBufferAttribute){const Zt=X.data,G=Zt.stride,Pe=X.offset;if(Zt.isInstancedInterleavedBuffer){for(let wt=0;wt<it.locationSize;wt++)T(it.location+wt,Zt.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Zt.meshPerAttribute*Zt.count)}else for(let wt=0;wt<it.locationSize;wt++)S(it.location+wt);r.bindBuffer(r.ARRAY_BUFFER,vt);for(let wt=0;wt<it.locationSize;wt++)E(it.location+wt,ot/it.locationSize,Dt,j,G*Ut,(Pe+ot/it.locationSize*wt)*Ut,Et)}else{if(X.isInstancedBufferAttribute){for(let Zt=0;Zt<it.locationSize;Zt++)T(it.location+Zt,X.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Zt=0;Zt<it.locationSize;Zt++)S(it.location+Zt);r.bindBuffer(r.ARRAY_BUFFER,vt);for(let Zt=0;Zt<it.locationSize;Zt++)E(it.location+Zt,ot/it.locationSize,Dt,j,ot*Ut,ot/it.locationSize*Zt*Ut,Et)}}else if($!==void 0){const j=$[nt];if(j!==void 0)switch(j.length){case 2:r.vertexAttrib2fv(it.location,j);break;case 3:r.vertexAttrib3fv(it.location,j);break;case 4:r.vertexAttrib4fv(it.location,j);break;default:r.vertexAttrib1fv(it.location,j)}}}}b()}function M(){k();for(const L in o){const O=o[L];for(const B in O){const q=O[B];for(const Z in q)_(q[Z].object),delete q[Z];delete O[B]}delete o[L]}}function w(L){if(o[L.id]===void 0)return;const O=o[L.id];for(const B in O){const q=O[B];for(const Z in q)_(q[Z].object),delete q[Z];delete O[B]}delete o[L.id]}function U(L){for(const O in o){const B=o[O];if(B[L.id]===void 0)continue;const q=B[L.id];for(const Z in q)_(q[Z].object),delete q[Z];delete B[L.id]}}function k(){Y(),h=!0,l!==c&&(l=c,f(l.object))}function Y(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:k,resetDefaultState:Y,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:S,disableUnusedAttributes:b}}function _0(r,t,e,n){const i=n.isWebGL2;let s;function a(h){s=h}function o(h,u){r.drawArrays(s,h,u),e.update(u,s,1)}function c(h,u,d){if(d===0)return;let f,_;if(i)f=r,_="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[_](s,h,u,d),e.update(u,s,d)}function l(h,u,d){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<d;_++)this.render(h[_],u[_]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g];e.update(_,s,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function x0(r,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const c=s(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,S=a||t.has("OES_texture_float"),T=x&&S,b=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:x,floatFragmentTextures:S,floatVertexTextures:T,maxSamples:b}}function v0(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new Li,o=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const _=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||_===null||_.length===0||s&&!m)s?h(null):l();else{const v=s?0:n,x=v*4;let S=p.clippingState||null;c.value=S,S=h(_,d,x,f);for(let T=0;T!==x;++T)S[T]=e[T];p.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,_){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=c.value,_!==!0||m===null){const p=f+g*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=f;x!==g;++x,S+=4)a.copy(u[x]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function M0(r){let t=new WeakMap;function e(a,o){return o===_a?a.mapping=Ts:o===xa&&(a.mapping=bs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===_a||o===xa)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new If(c.height/2);return l.fromEquirectangularTexture(r,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Fh extends Oh{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const gs=4,xl=[.125,.215,.35,.446,.526,.582],Oi=20,Jo=new Fh,vl=new Kt;let Qo=null,ta=0,ea=0;const Ii=(1+Math.sqrt(5))/2,cs=1/Ii,Ml=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,Ii,cs),new P(0,Ii,-cs),new P(cs,0,Ii),new P(-cs,0,Ii),new P(Ii,cs,0),new P(-Ii,cs,0)];class Sl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Qo=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=El(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qo,ta,ea),t.scissorTest=!1,zr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ts||t.mapping===bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qo=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:sr,format:In,colorSpace:Jn,depthBuffer:!1},i=wl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=S0(s)),this._blurMaterial=w0(s,t,e)}return i}_compileMaterial(t){const e=new R(this._lodPlanes[0],t);this._renderer.compile(e,Jo)}_sceneToCubeUV(t,e,n,i){const o=new fn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(vl),h.toneMapping=fi,h.autoClear=!1;const f=new Qt({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),_=new R(new st,f);let g=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,g=!0):(f.color.copy(vl),g=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):v===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const x=this._cubeSize;zr(i,v*x,p>2?x:0,x,x),h.setRenderTarget(i),g&&h.render(_,o),h.render(t,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Ts||t.mapping===bs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=El()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yl());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new R(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;zr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Jo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Ml[(i-1)%Ml.length];this._blur(t,i-1,i,s,a)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new R(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),g=s/_,m=isFinite(s)?1+Math.floor(h*g):Oi;m>Oi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const p=[];let v=0;for(let E=0;E<Oi;++E){const I=E/g,M=Math.exp(-I*I/2);p.push(M),E===0?v+=M:E<m&&(v+=2*M)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const S=this._sizeLods[i],T=3*S*(i>x-gs?i-x+gs:0),b=4*(this._cubeSize-S);zr(e,T,b,3*S,2*S),c.setRenderTarget(e),c.render(u,Jo)}}function S0(r){const t=[],e=[],n=[];let i=r;const s=r-gs+1+xl.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>r-gs?c=xl[a-r+gs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,_=6,g=3,m=2,p=1,v=new Float32Array(g*_*f),x=new Float32Array(m*_*f),S=new Float32Array(p*_*f);for(let b=0;b<f;b++){const E=b%3*2/3-1,I=b>2?0:-1,M=[E,I,0,E+2/3,I,0,E+2/3,I+1,0,E,I,0,E+2/3,I+1,0,E,I+1,0];v.set(M,g*_*b),x.set(d,m*_*b);const w=[b,b,b,b,b,b];S.set(w,p*_*b)}const T=new cn;T.setAttribute("position",new Dn(v,g)),T.setAttribute("uv",new Dn(x,m)),T.setAttribute("faceIndex",new Dn(S,p)),t.push(T),i>gs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wl(r,t,e){const n=new Wi(r,t,e);return n.texture.mapping=po,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function w0(r,t,e){const n=new Float32Array(Oi),i=new P(0,1,0);return new Xi({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function yl(){return new Xi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:di,depthTest:!1,depthWrite:!1})}function El(){return new Xi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:di,depthTest:!1,depthWrite:!1})}function Xa(){return`

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
	`}function y0(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===_a||c===xa,h=c===Ts||c===bs;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Sl(r)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{const u=o.image;if(l&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new Sl(r));const d=l?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function E0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function T0(r,t,e,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const _ in d)t.update(d[_],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const _ in f){const g=f[_];for(let m=0,p=g.length;m<p;m++)t.update(g[m],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,_=u.attributes.position;let g=0;if(f!==null){const v=f.array;g=f.version;for(let x=0,S=v.length;x<S;x+=3){const T=v[x+0],b=v[x+1],E=v[x+2];d.push(T,b,b,E,E,T)}}else if(_!==void 0){const v=_.array;g=_.version;for(let x=0,S=v.length/3-1;x<S;x+=3){const T=x+0,b=x+1,E=x+2;d.push(T,b,b,E,E,T)}}else return;const m=new(bh(d)?Dh:Ih)(d,1);m.version=g;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function b0(r,t,e,n){const i=n.isWebGL2;let s;function a(f){s=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function h(f,_){r.drawElements(s,_,o,f*c),e.update(_,s,1)}function u(f,_,g){if(g===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,_,o,f*c,g),e.update(_,s,g)}function d(f,_,g){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<g;p++)this.render(f[p]/c,_[p]);else{m.multiDrawElementsWEBGL(s,_,0,o,f,0,g);let p=0;for(let v=0;v<g;v++)p+=_[v];e.update(p,s,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function A0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function R0(r,t){return r[0]-t[0]}function C0(r,t){return Math.abs(t[1])-Math.abs(r[1])}function P0(r,t,e){const n={},i=new Float32Array(8),s=new WeakMap,a=new de,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(t.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let m=s.get(h);if(m===void 0||m.count!==g){let O=function(){Y.dispose(),s.delete(h),h.removeEventListener("dispose",O)};var f=O;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],I=h.morphAttributes.color||[];let M=0;x===!0&&(M=1),S===!0&&(M=2),T===!0&&(M=3);let w=h.attributes.position.count*M,U=1;w>t.maxTextureSize&&(U=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const k=new Float32Array(w*U*4*g),Y=new Ch(k,w,U,g);Y.type=ci,Y.needsUpdate=!0;const L=M*4;for(let B=0;B<g;B++){const q=b[B],Z=E[B],K=I[B],$=w*U*4*B;for(let nt=0;nt<q.count;nt++){const it=nt*L;x===!0&&(a.fromBufferAttribute(q,nt),k[$+it+0]=a.x,k[$+it+1]=a.y,k[$+it+2]=a.z,k[$+it+3]=0),S===!0&&(a.fromBufferAttribute(Z,nt),k[$+it+4]=a.x,k[$+it+5]=a.y,k[$+it+6]=a.z,k[$+it+7]=0),T===!0&&(a.fromBufferAttribute(K,nt),k[$+it+8]=a.x,k[$+it+9]=a.y,k[$+it+10]=a.z,k[$+it+11]=K.itemSize===4?a.w:1)}}m={count:g,texture:Y,size:new Ct(w,U)},s.set(h,m),h.addEventListener("dispose",O)}let p=0;for(let x=0;x<d.length;x++)p+=d[x];const v=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(r,"morphTargetBaseInfluence",v),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,e),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const _=d===void 0?0:d.length;let g=n[h.id];if(g===void 0||g.length!==_){g=[];for(let S=0;S<_;S++)g[S]=[S,0];n[h.id]=g}for(let S=0;S<_;S++){const T=g[S];T[0]=S,T[1]=d[S]}g.sort(C0);for(let S=0;S<8;S++)S<_&&g[S][1]?(o[S][0]=g[S][0],o[S][1]=g[S][1]):(o[S][0]=Number.MAX_SAFE_INTEGER,o[S][1]=0);o.sort(R0);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let v=0;for(let S=0;S<8;S++){const T=o[S],b=T[0],E=T[1];b!==Number.MAX_SAFE_INTEGER&&E?(m&&h.getAttribute("morphTarget"+S)!==m[b]&&h.setAttribute("morphTarget"+S,m[b]),p&&h.getAttribute("morphNormal"+S)!==p[b]&&h.setAttribute("morphNormal"+S,p[b]),i[S]=E,v+=E):(m&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),p&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),i[S]=0)}const x=h.morphTargetsRelative?1:1-v;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:c}}function L0(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}class Bh extends en{constructor(t,e,n,i,s,a,o,c,l,h){if(h=h!==void 0?h:Fi,h!==Fi&&h!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fi&&(n=ai),n===void 0&&h===As&&(n=ki),super(null,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Gh=new en,zh=new Bh(1,1);zh.compareFunction=Th;const Hh=new Ch,Vh=new pf,Wh=new Nh,Tl=[],bl=[],Al=new Float32Array(16),Rl=new Float32Array(9),Cl=new Float32Array(4);function Ns(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Tl[i];if(s===void 0&&(s=new Float32Array(i),Tl[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Re(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ce(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function _o(r,t){let e=bl[t];e===void 0&&(e=new Int32Array(t),bl[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function I0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function D0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;r.uniform2fv(this.addr,t),Ce(e,t)}}function U0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;r.uniform3fv(this.addr,t),Ce(e,t)}}function O0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;r.uniform4fv(this.addr,t),Ce(e,t)}}function N0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Cl.set(n),r.uniformMatrix2fv(this.addr,!1,Cl),Ce(e,n)}}function k0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Rl.set(n),r.uniformMatrix3fv(this.addr,!1,Rl),Ce(e,n)}}function F0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Al.set(n),r.uniformMatrix4fv(this.addr,!1,Al),Ce(e,n)}}function B0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function G0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;r.uniform2iv(this.addr,t),Ce(e,t)}}function z0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;r.uniform3iv(this.addr,t),Ce(e,t)}}function H0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;r.uniform4iv(this.addr,t),Ce(e,t)}}function V0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function W0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;r.uniform2uiv(this.addr,t),Ce(e,t)}}function X0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;r.uniform3uiv(this.addr,t),Ce(e,t)}}function q0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;r.uniform4uiv(this.addr,t),Ce(e,t)}}function Y0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?zh:Gh;e.setTexture2D(t||s,i)}function Z0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Vh,i)}function K0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Wh,i)}function $0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Hh,i)}function j0(r){switch(r){case 5126:return I0;case 35664:return D0;case 35665:return U0;case 35666:return O0;case 35674:return N0;case 35675:return k0;case 35676:return F0;case 5124:case 35670:return B0;case 35667:case 35671:return G0;case 35668:case 35672:return z0;case 35669:case 35673:return H0;case 5125:return V0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return Z0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return $0}}function J0(r,t){r.uniform1fv(this.addr,t)}function Q0(r,t){const e=Ns(t,this.size,2);r.uniform2fv(this.addr,e)}function tg(r,t){const e=Ns(t,this.size,3);r.uniform3fv(this.addr,e)}function eg(r,t){const e=Ns(t,this.size,4);r.uniform4fv(this.addr,e)}function ng(r,t){const e=Ns(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function ig(r,t){const e=Ns(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function sg(r,t){const e=Ns(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function rg(r,t){r.uniform1iv(this.addr,t)}function og(r,t){r.uniform2iv(this.addr,t)}function ag(r,t){r.uniform3iv(this.addr,t)}function cg(r,t){r.uniform4iv(this.addr,t)}function lg(r,t){r.uniform1uiv(this.addr,t)}function hg(r,t){r.uniform2uiv(this.addr,t)}function ug(r,t){r.uniform3uiv(this.addr,t)}function dg(r,t){r.uniform4uiv(this.addr,t)}function fg(r,t,e){const n=this.cache,i=t.length,s=_o(e,i);Re(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Gh,s[a])}function pg(r,t,e){const n=this.cache,i=t.length,s=_o(e,i);Re(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Vh,s[a])}function mg(r,t,e){const n=this.cache,i=t.length,s=_o(e,i);Re(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Wh,s[a])}function gg(r,t,e){const n=this.cache,i=t.length,s=_o(e,i);Re(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Hh,s[a])}function _g(r){switch(r){case 5126:return J0;case 35664:return Q0;case 35665:return tg;case 35666:return eg;case 35674:return ng;case 35675:return ig;case 35676:return sg;case 5124:case 35670:return rg;case 35667:case 35671:return og;case 35668:case 35672:return ag;case 35669:case 35673:return cg;case 5125:return lg;case 36294:return hg;case 36295:return ug;case 36296:return dg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return pg;case 35680:case 36300:case 36308:case 36293:return mg;case 36289:case 36303:case 36311:case 36292:return gg}}class xg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=j0(e.type)}}class vg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_g(e.type)}}class Mg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Pl(r,t){r.seq.push(t),r.map[t.id]=t}function Sg(r,t,e){const n=r.name,i=n.length;for(na.lastIndex=0;;){const s=na.exec(n),a=na.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Pl(e,l===void 0?new xg(o,r,t):new vg(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new Mg(o),Pl(e,u)),e=u}}}class Zr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);Sg(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Ll(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const wg=37297;let yg=0;function Eg(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Tg(r){const t=ne.getPrimaries(ne.workingColorSpace),e=ne.getPrimaries(r);let n;switch(t===e?n="":t===eo&&e===to?n="LinearDisplayP3ToLinearSRGB":t===to&&e===eo&&(n="LinearSRGBToLinearDisplayP3"),r){case Jn:case mo:return[n,"LinearTransferOETF"];case ke:case za:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Il(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+Eg(r.getShaderSource(t),a)}else return i}function bg(r,t){const e=Tg(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ag(r,t){let e;switch(t){case yd:e="Linear";break;case Ed:e="Reinhard";break;case Td:e="OptimizedCineon";break;case bd:e="ACESFilmic";break;case Rd:e="AgX";break;case Ad:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Rg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(_s).join(`
`)}function Cg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(_s).join(`
`)}function Pg(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lg(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function _s(r){return r!==""}function Dl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ul(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ig=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(r){return r.replace(Ig,Ug)}const Dg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ug(r,t){let e=Gt[t];if(e===void 0){const n=Dg.get(t);if(n!==void 0)e=Gt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const Og=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(r){return r.replace(Og,Ng)}function Ng(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Nl(r){let t="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function kg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===dh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===fh?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Yn&&(t="SHADOWMAP_TYPE_VSM"),t}function Fg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Ts:case bs:t="ENVMAP_TYPE_CUBE";break;case po:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bg(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case bs:t="ENVMAP_MODE_REFRACTION";break}return t}function Gg(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ph:t="ENVMAP_BLENDING_MULTIPLY";break;case Sd:t="ENVMAP_BLENDING_MIX";break;case wd:t="ENVMAP_BLENDING_ADD";break}return t}function zg(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Hg(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=kg(e),l=Fg(e),h=Bg(e),u=Gg(e),d=zg(e),f=e.isWebGL2?"":Rg(e),_=Cg(e),g=Pg(s),m=i.createProgram();let p,v,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_s).join(`
`),p.length>0&&(p+=`
`),v=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_s).join(`
`),v.length>0&&(v+=`
`)):(p=[Nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),v=[f,Nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==fi?"#define TONE_MAPPING":"",e.toneMapping!==fi?Gt.tonemapping_pars_fragment:"",e.toneMapping!==fi?Ag("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,bg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_s).join(`
`)),a=Ea(a),a=Dl(a,e),a=Ul(a,e),o=Ea(o),o=Dl(o,e),o=Ul(o,e),a=Ol(a),o=Ol(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===tl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===tl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const S=x+p+a,T=x+v+o,b=Ll(i,i.VERTEX_SHADER,S),E=Ll(i,i.FRAGMENT_SHADER,T);i.attachShader(m,b),i.attachShader(m,E),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function I(k){if(r.debug.checkShaderErrors){const Y=i.getProgramInfoLog(m).trim(),L=i.getShaderInfoLog(b).trim(),O=i.getShaderInfoLog(E).trim();let B=!0,q=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(B=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,b,E);else{const Z=Il(i,b,"vertex"),K=Il(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+Z+`
`+K)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(L===""||O==="")&&(q=!1);q&&(k.diagnostics={runnable:B,programLog:Y,vertexShader:{log:L,prefix:p},fragmentShader:{log:O,prefix:v}})}i.deleteShader(b),i.deleteShader(E),M=new Zr(i,m),w=Lg(i,m)}let M;this.getUniforms=function(){return M===void 0&&I(this),M};let w;this.getAttributes=function(){return w===void 0&&I(this),w};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(m,wg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=yg++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=E,this}let Vg=0;class Wg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Xg(t),e.set(t,n)),n}}class Xg{constructor(t){this.id=Vg++,this.code=t,this.usedTimes=0}}function qg(r,t,e,n,i,s,a){const o=new Ph,c=new Wg,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return M===0?"uv":`uv${M}`}function m(M,w,U,k,Y){const L=k.fog,O=Y.geometry,B=M.isMeshStandardMaterial?k.environment:null,q=(M.isMeshStandardMaterial?e:t).get(M.envMap||B),Z=q&&q.mapping===po?q.image.height:null,K=_[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const $=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,nt=$!==void 0?$.length:0;let it=0;O.morphAttributes.position!==void 0&&(it=1),O.morphAttributes.normal!==void 0&&(it=2),O.morphAttributes.color!==void 0&&(it=3);let X,j,ot,Mt;if(K){const qe=Nn[K];X=qe.vertexShader,j=qe.fragmentShader}else X=M.vertexShader,j=M.fragmentShader,c.update(M),ot=c.getVertexShaderID(M),Mt=c.getFragmentShaderID(M);const vt=r.getRenderTarget(),Dt=Y.isInstancedMesh===!0,Ut=Y.isBatchedMesh===!0,Et=!!M.map,Zt=!!M.matcap,G=!!q,Pe=!!M.aoMap,wt=!!M.lightMap,Pt=!!M.bumpMap,_t=!!M.normalMap,re=!!M.displacementMap,Ot=!!M.emissiveMap,C=!!M.metalnessMap,y=!!M.roughnessMap,z=M.anisotropy>0,Q=M.clearcoat>0,J=M.iridescence>0,tt=M.sheen>0,xt=M.transmission>0,ut=z&&!!M.anisotropyMap,pt=Q&&!!M.clearcoatMap,Rt=Q&&!!M.clearcoatNormalMap,Ht=Q&&!!M.clearcoatRoughnessMap,et=J&&!!M.iridescenceMap,te=J&&!!M.iridescenceThicknessMap,Yt=tt&&!!M.sheenColorMap,Nt=tt&&!!M.sheenRoughnessMap,yt=!!M.specularMap,mt=!!M.specularColorMap,Bt=!!M.specularIntensityMap,Jt=xt&&!!M.transmissionMap,xe=xt&&!!M.thicknessMap,Wt=!!M.gradientMap,at=!!M.alphaMap,D=M.alphaTest>0,lt=!!M.alphaHash,ht=!!M.extensions,Lt=!!O.attributes.uv1,Tt=!!O.attributes.uv2,oe=!!O.attributes.uv3;let ae=fi;return M.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(ae=r.toneMapping),{isWebGL2:h,shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:X,fragmentShader:j,defines:M.defines,customVertexShaderID:ot,customFragmentShaderID:Mt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ut,instancing:Dt,instancingColor:Dt&&Y.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:vt===null?r.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Jn,map:Et,matcap:Zt,envMap:G,envMapMode:G&&q.mapping,envMapCubeUVHeight:Z,aoMap:Pe,lightMap:wt,bumpMap:Pt,normalMap:_t,displacementMap:d&&re,emissiveMap:Ot,normalMapObjectSpace:_t&&M.normalMapType===Gd,normalMapTangentSpace:_t&&M.normalMapType===Eh,metalnessMap:C,roughnessMap:y,anisotropy:z,anisotropyMap:ut,clearcoat:Q,clearcoatMap:pt,clearcoatNormalMap:Rt,clearcoatRoughnessMap:Ht,iridescence:J,iridescenceMap:et,iridescenceThicknessMap:te,sheen:tt,sheenColorMap:Yt,sheenRoughnessMap:Nt,specularMap:yt,specularColorMap:mt,specularIntensityMap:Bt,transmission:xt,transmissionMap:Jt,thicknessMap:xe,gradientMap:Wt,opaque:M.transparent===!1&&M.blending===Ms,alphaMap:at,alphaTest:D,alphaHash:lt,combine:M.combine,mapUv:Et&&g(M.map.channel),aoMapUv:Pe&&g(M.aoMap.channel),lightMapUv:wt&&g(M.lightMap.channel),bumpMapUv:Pt&&g(M.bumpMap.channel),normalMapUv:_t&&g(M.normalMap.channel),displacementMapUv:re&&g(M.displacementMap.channel),emissiveMapUv:Ot&&g(M.emissiveMap.channel),metalnessMapUv:C&&g(M.metalnessMap.channel),roughnessMapUv:y&&g(M.roughnessMap.channel),anisotropyMapUv:ut&&g(M.anisotropyMap.channel),clearcoatMapUv:pt&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:Rt&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&g(M.sheenRoughnessMap.channel),specularMapUv:yt&&g(M.specularMap.channel),specularColorMapUv:mt&&g(M.specularColorMap.channel),specularIntensityMapUv:Bt&&g(M.specularIntensityMap.channel),transmissionMapUv:Jt&&g(M.transmissionMap.channel),thicknessMapUv:xe&&g(M.thicknessMap.channel),alphaMapUv:at&&g(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(_t||z),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:Tt,vertexUv3s:oe,pointsUvs:Y.isPoints===!0&&!!O.attributes.uv&&(Et||at),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Y.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:it,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:ae,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Et&&M.map.isVideoTexture===!0&&ne.getTransfer(M.map.colorSpace)===le,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===pn,flipSided:M.side===tn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ht&&M.extensions.derivatives===!0,extensionFragDepth:ht&&M.extensions.fragDepth===!0,extensionDrawBuffers:ht&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ht&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ht&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const U in M.defines)w.push(U),w.push(M.defines[U]);return M.isRawShaderMaterial===!1&&(v(w,M),x(w,M),w.push(r.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function v(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function x(M,w){o.disableAll(),w.isWebGL2&&o.enable(0),w.supportsVertexTextures&&o.enable(1),w.instancing&&o.enable(2),w.instancingColor&&o.enable(3),w.matcap&&o.enable(4),w.envMap&&o.enable(5),w.normalMapObjectSpace&&o.enable(6),w.normalMapTangentSpace&&o.enable(7),w.clearcoat&&o.enable(8),w.iridescence&&o.enable(9),w.alphaTest&&o.enable(10),w.vertexColors&&o.enable(11),w.vertexAlphas&&o.enable(12),w.vertexUv1s&&o.enable(13),w.vertexUv2s&&o.enable(14),w.vertexUv3s&&o.enable(15),w.vertexTangents&&o.enable(16),w.anisotropy&&o.enable(17),w.alphaHash&&o.enable(18),w.batching&&o.enable(19),M.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.skinning&&o.enable(4),w.morphTargets&&o.enable(5),w.morphNormals&&o.enable(6),w.morphColors&&o.enable(7),w.premultipliedAlpha&&o.enable(8),w.shadowMapEnabled&&o.enable(9),w.useLegacyLights&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function S(M){const w=_[M.type];let U;if(w){const k=Nn[w];U=Rf.clone(k.uniforms)}else U=M.uniforms;return U}function T(M,w){let U;for(let k=0,Y=l.length;k<Y;k++){const L=l[k];if(L.cacheKey===w){U=L,++U.usedTimes;break}}return U===void 0&&(U=new Hg(r,w,M,s),l.push(U)),U}function b(M){if(--M.usedTimes===0){const w=l.indexOf(M);l[w]=l[l.length-1],l.pop(),M.destroy()}}function E(M){c.remove(M)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:T,releaseProgram:b,releaseShaderCache:E,programs:l,dispose:I}}function Yg(){let r=new WeakMap;function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function e(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Zg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function kl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Fl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,_,g,m){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=g,p.group=m),t++,p}function o(u,d,f,_,g,m){const p=a(u,d,f,_,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,_,g,m){const p=a(u,d,f,_,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Zg),n.length>1&&n.sort(d||kl),i.length>1&&i.sort(d||kl)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:h,sort:l}}function Kg(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new Fl,r.set(n,[a])):i>=s.length?(a=new Fl,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function $g(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Kt};break;case"SpotLight":e={position:new P,direction:new P,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function jg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Jg=0;function Qg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function t_(r,t){const e=new $g,n=jg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new P);const s=new P,a=new ye,o=new ye;function c(h,u){let d=0,f=0,_=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let g=0,m=0,p=0,v=0,x=0,S=0,T=0,b=0,E=0,I=0,M=0;h.sort(Qg);const w=u===!0?Math.PI:1;for(let k=0,Y=h.length;k<Y;k++){const L=h[k],O=L.color,B=L.intensity,q=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=O.r*B*w,f+=O.g*B*w,_+=O.b*B*w;else if(L.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(L.sh.coefficients[K],B);M++}else if(L.isDirectionalLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){const $=L.shadow,nt=n.get(L);nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,i.directionalShadow[g]=nt,i.directionalShadowMap[g]=Z,i.directionalShadowMatrix[g]=L.shadow.matrix,S++}i.directional[g]=K,g++}else if(L.isSpotLight){const K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(O).multiplyScalar(B*w),K.distance=q,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,i.spot[p]=K;const $=L.shadow;if(L.map&&(i.spotLightMap[E]=L.map,E++,$.updateMatrices(L),L.castShadow&&I++),i.spotLightMatrix[p]=$.matrix,L.castShadow){const nt=n.get(L);nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,i.spotShadow[p]=nt,i.spotShadowMap[p]=Z,b++}p++}else if(L.isRectAreaLight){const K=e.get(L);K.color.copy(O).multiplyScalar(B),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),i.rectArea[v]=K,v++}else if(L.isPointLight){const K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*w),K.distance=L.distance,K.decay=L.decay,L.castShadow){const $=L.shadow,nt=n.get(L);nt.shadowBias=$.bias,nt.shadowNormalBias=$.normalBias,nt.shadowRadius=$.radius,nt.shadowMapSize=$.mapSize,nt.shadowCameraNear=$.camera.near,nt.shadowCameraFar=$.camera.far,i.pointShadow[m]=nt,i.pointShadowMap[m]=Z,i.pointShadowMatrix[m]=L.shadow.matrix,T++}i.point[m]=K,m++}else if(L.isHemisphereLight){const K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(B*w),K.groundColor.copy(L.groundColor).multiplyScalar(B*w),i.hemi[x]=K,x++}}v>0&&(t.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_FLOAT_1,i.rectAreaLTC2=ct.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ct.LTC_HALF_1,i.rectAreaLTC2=ct.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=_;const U=i.hash;(U.directionalLength!==g||U.pointLength!==m||U.spotLength!==p||U.rectAreaLength!==v||U.hemiLength!==x||U.numDirectionalShadows!==S||U.numPointShadows!==T||U.numSpotShadows!==b||U.numSpotMaps!==E||U.numLightProbes!==M)&&(i.directional.length=g,i.spot.length=p,i.rectArea.length=v,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=b+E-I,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=M,U.directionalLength=g,U.pointLength=m,U.spotLength=p,U.rectAreaLength=v,U.hemiLength=x,U.numDirectionalShadows=S,U.numPointShadows=T,U.numSpotShadows=b,U.numSpotMaps=E,U.numLightProbes=M,i.version=Jg++)}function l(h,u){let d=0,f=0,_=0,g=0,m=0;const p=u.matrixWorldInverse;for(let v=0,x=h.length;v<x;v++){const S=h[v];if(S.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),d++}else if(S.isSpotLight){const T=i.spot[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),_++}else if(S.isRectAreaLight){const T=i.rectArea[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),o.identity(),a.copy(S.matrixWorld),a.premultiply(p),o.extractRotation(a),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const T=i.point[f];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(p),f++}else if(S.isHemisphereLight){const T=i.hemi[m];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function Bl(r,t){const e=new t_(r,t),n=[],i=[];function s(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function c(u){e.setup(n,u)}function l(u){e.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function e_(r,t){let e=new WeakMap;function n(s,a=0){const o=e.get(s);let c;return o===void 0?(c=new Bl(r,t),e.set(s,[c])):a>=o.length?(c=new Bl(r,t),o.push(c)):c=o[a],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class n_ extends Os{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class i_ extends Os{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const s_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
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
}`;function o_(r,t,e){let n=new Wa;const i=new Ct,s=new Ct,a=new de,o=new n_({depthPacking:Bd}),c=new i_,l={},h=e.maxTextureSize,u={[_i]:tn,[tn]:_i,[pn]:pn},d=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:s_,fragmentShader:r_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new cn;_.setAttribute("position",new Dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new R(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dh;let p=this.type;this.render=function(b,E,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const M=r.getRenderTarget(),w=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),k=r.state;k.setBlending(di),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Y=p!==Yn&&this.type===Yn,L=p===Yn&&this.type!==Yn;for(let O=0,B=b.length;O<B;O++){const q=b[O],Z=q.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);const K=Z.getFrameExtents();if(i.multiply(K),s.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/K.x),i.x=s.x*K.x,Z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/K.y),i.y=s.y*K.y,Z.mapSize.y=s.y)),Z.map===null||Y===!0||L===!0){const nt=this.type!==Yn?{minFilter:$e,magFilter:$e}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Wi(i.x,i.y,nt),Z.map.texture.name=q.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();const $=Z.getViewportCount();for(let nt=0;nt<$;nt++){const it=Z.getViewport(nt);a.set(s.x*it.x,s.y*it.y,s.x*it.z,s.y*it.w),k.viewport(a),Z.updateMatrices(q,nt),n=Z.getFrustum(),S(E,I,Z.camera,q,this.type)}Z.isPointLightShadow!==!0&&this.type===Yn&&v(Z,I),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(M,w,U)};function v(b,E){const I=t.update(g);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Wi(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(E,null,I,d,g,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(E,null,I,f,g,null)}function x(b,E,I,M){let w=null;const U=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(U!==void 0)w=U;else if(w=I.isPointLight===!0?c:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=w.uuid,Y=E.uuid;let L=l[k];L===void 0&&(L={},l[k]=L);let O=L[Y];O===void 0&&(O=w.clone(),L[Y]=O,E.addEventListener("dispose",T)),w=O}if(w.visible=E.visible,w.wireframe=E.wireframe,M===Yn?w.side=E.shadowSide!==null?E.shadowSide:E.side:w.side=E.shadowSide!==null?E.shadowSide:u[E.side],w.alphaMap=E.alphaMap,w.alphaTest=E.alphaTest,w.map=E.map,w.clipShadows=E.clipShadows,w.clippingPlanes=E.clippingPlanes,w.clipIntersection=E.clipIntersection,w.displacementMap=E.displacementMap,w.displacementScale=E.displacementScale,w.displacementBias=E.displacementBias,w.wireframeLinewidth=E.wireframeLinewidth,w.linewidth=E.linewidth,I.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const k=r.properties.get(w);k.light=I}return w}function S(b,E,I,M,w){if(b.visible===!1)return;if(b.layers.test(E.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&w===Yn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);const Y=t.update(b),L=b.material;if(Array.isArray(L)){const O=Y.groups;for(let B=0,q=O.length;B<q;B++){const Z=O[B],K=L[Z.materialIndex];if(K&&K.visible){const $=x(b,K,M,w);b.onBeforeShadow(r,b,E,I,Y,$,Z),r.renderBufferDirect(I,null,Y,$,b,Z),b.onAfterShadow(r,b,E,I,Y,$,Z)}}}else if(L.visible){const O=x(b,L,M,w);b.onBeforeShadow(r,b,E,I,Y,O,null),r.renderBufferDirect(I,null,Y,O,b,null),b.onAfterShadow(r,b,E,I,Y,O,null)}}const k=b.children;for(let Y=0,L=k.length;Y<L;Y++)S(k[Y],E,I,M,w)}function T(b){b.target.removeEventListener("dispose",T);for(const I in l){const M=l[I],w=b.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function a_(r,t,e){const n=e.isWebGL2;function i(){let D=!1;const lt=new de;let ht=null;const Lt=new de(0,0,0,0);return{setMask:function(Tt){ht!==Tt&&!D&&(r.colorMask(Tt,Tt,Tt,Tt),ht=Tt)},setLocked:function(Tt){D=Tt},setClear:function(Tt,oe,ae,Le,qe){qe===!0&&(Tt*=Le,oe*=Le,ae*=Le),lt.set(Tt,oe,ae,Le),Lt.equals(lt)===!1&&(r.clearColor(Tt,oe,ae,Le),Lt.copy(lt))},reset:function(){D=!1,ht=null,Lt.set(-1,0,0,0)}}}function s(){let D=!1,lt=null,ht=null,Lt=null;return{setTest:function(Tt){Tt?Ut(r.DEPTH_TEST):Et(r.DEPTH_TEST)},setMask:function(Tt){lt!==Tt&&!D&&(r.depthMask(Tt),lt=Tt)},setFunc:function(Tt){if(ht!==Tt){switch(Tt){case pd:r.depthFunc(r.NEVER);break;case md:r.depthFunc(r.ALWAYS);break;case gd:r.depthFunc(r.LESS);break;case Jr:r.depthFunc(r.LEQUAL);break;case _d:r.depthFunc(r.EQUAL);break;case xd:r.depthFunc(r.GEQUAL);break;case vd:r.depthFunc(r.GREATER);break;case Md:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ht=Tt}},setLocked:function(Tt){D=Tt},setClear:function(Tt){Lt!==Tt&&(r.clearDepth(Tt),Lt=Tt)},reset:function(){D=!1,lt=null,ht=null,Lt=null}}}function a(){let D=!1,lt=null,ht=null,Lt=null,Tt=null,oe=null,ae=null,Le=null,qe=null;return{setTest:function(ce){D||(ce?Ut(r.STENCIL_TEST):Et(r.STENCIL_TEST))},setMask:function(ce){lt!==ce&&!D&&(r.stencilMask(ce),lt=ce)},setFunc:function(ce,Ye,Un){(ht!==ce||Lt!==Ye||Tt!==Un)&&(r.stencilFunc(ce,Ye,Un),ht=ce,Lt=Ye,Tt=Un)},setOp:function(ce,Ye,Un){(oe!==ce||ae!==Ye||Le!==Un)&&(r.stencilOp(ce,Ye,Un),oe=ce,ae=Ye,Le=Un)},setLocked:function(ce){D=ce},setClear:function(ce){qe!==ce&&(r.clearStencil(ce),qe=ce)},reset:function(){D=!1,lt=null,ht=null,Lt=null,Tt=null,oe=null,ae=null,Le=null,qe=null}}}const o=new i,c=new s,l=new a,h=new WeakMap,u=new WeakMap;let d={},f={},_=new WeakMap,g=[],m=null,p=!1,v=null,x=null,S=null,T=null,b=null,E=null,I=null,M=new Kt(0,0,0),w=0,U=!1,k=null,Y=null,L=null,O=null,B=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,K=0;const $=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec($)[1]),Z=K>=1):$.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Z=K>=2);let nt=null,it={};const X=r.getParameter(r.SCISSOR_BOX),j=r.getParameter(r.VIEWPORT),ot=new de().fromArray(X),Mt=new de().fromArray(j);function vt(D,lt,ht,Lt){const Tt=new Uint8Array(4),oe=r.createTexture();r.bindTexture(D,oe),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ae=0;ae<ht;ae++)n&&(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)?r.texImage3D(lt,0,r.RGBA,1,1,Lt,0,r.RGBA,r.UNSIGNED_BYTE,Tt):r.texImage2D(lt+ae,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Tt);return oe}const Dt={};Dt[r.TEXTURE_2D]=vt(r.TEXTURE_2D,r.TEXTURE_2D,1),Dt[r.TEXTURE_CUBE_MAP]=vt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Dt[r.TEXTURE_2D_ARRAY]=vt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Dt[r.TEXTURE_3D]=vt(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ut(r.DEPTH_TEST),c.setFunc(Jr),Ot(!1),C(Sc),Ut(r.CULL_FACE),_t(di);function Ut(D){d[D]!==!0&&(r.enable(D),d[D]=!0)}function Et(D){d[D]!==!1&&(r.disable(D),d[D]=!1)}function Zt(D,lt){return f[D]!==lt?(r.bindFramebuffer(D,lt),f[D]=lt,n&&(D===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=lt),D===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=lt)),!0):!1}function G(D,lt){let ht=g,Lt=!1;if(D)if(ht=_.get(lt),ht===void 0&&(ht=[],_.set(lt,ht)),D.isWebGLMultipleRenderTargets){const Tt=D.texture;if(ht.length!==Tt.length||ht[0]!==r.COLOR_ATTACHMENT0){for(let oe=0,ae=Tt.length;oe<ae;oe++)ht[oe]=r.COLOR_ATTACHMENT0+oe;ht.length=Tt.length,Lt=!0}}else ht[0]!==r.COLOR_ATTACHMENT0&&(ht[0]=r.COLOR_ATTACHMENT0,Lt=!0);else ht[0]!==r.BACK&&(ht[0]=r.BACK,Lt=!0);Lt&&(e.isWebGL2?r.drawBuffers(ht):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(ht))}function Pe(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const wt={[Ui]:r.FUNC_ADD,[Qu]:r.FUNC_SUBTRACT,[td]:r.FUNC_REVERSE_SUBTRACT};if(n)wt[Tc]=r.MIN,wt[bc]=r.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(wt[Tc]=D.MIN_EXT,wt[bc]=D.MAX_EXT)}const Pt={[ed]:r.ZERO,[nd]:r.ONE,[id]:r.SRC_COLOR,[ma]:r.SRC_ALPHA,[ld]:r.SRC_ALPHA_SATURATE,[ad]:r.DST_COLOR,[rd]:r.DST_ALPHA,[sd]:r.ONE_MINUS_SRC_COLOR,[ga]:r.ONE_MINUS_SRC_ALPHA,[cd]:r.ONE_MINUS_DST_COLOR,[od]:r.ONE_MINUS_DST_ALPHA,[hd]:r.CONSTANT_COLOR,[ud]:r.ONE_MINUS_CONSTANT_COLOR,[dd]:r.CONSTANT_ALPHA,[fd]:r.ONE_MINUS_CONSTANT_ALPHA};function _t(D,lt,ht,Lt,Tt,oe,ae,Le,qe,ce){if(D===di){p===!0&&(Et(r.BLEND),p=!1);return}if(p===!1&&(Ut(r.BLEND),p=!0),D!==Ju){if(D!==v||ce!==U){if((x!==Ui||b!==Ui)&&(r.blendEquation(r.FUNC_ADD),x=Ui,b=Ui),ce)switch(D){case Ms:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wc:r.blendFunc(r.ONE,r.ONE);break;case yc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ec:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ms:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case wc:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case yc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ec:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,T=null,E=null,I=null,M.set(0,0,0),w=0,v=D,U=ce}return}Tt=Tt||lt,oe=oe||ht,ae=ae||Lt,(lt!==x||Tt!==b)&&(r.blendEquationSeparate(wt[lt],wt[Tt]),x=lt,b=Tt),(ht!==S||Lt!==T||oe!==E||ae!==I)&&(r.blendFuncSeparate(Pt[ht],Pt[Lt],Pt[oe],Pt[ae]),S=ht,T=Lt,E=oe,I=ae),(Le.equals(M)===!1||qe!==w)&&(r.blendColor(Le.r,Le.g,Le.b,qe),M.copy(Le),w=qe),v=D,U=!1}function re(D,lt){D.side===pn?Et(r.CULL_FACE):Ut(r.CULL_FACE);let ht=D.side===tn;lt&&(ht=!ht),Ot(ht),D.blending===Ms&&D.transparent===!1?_t(di):_t(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),o.setMask(D.colorWrite);const Lt=D.stencilWrite;l.setTest(Lt),Lt&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),z(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ut(r.SAMPLE_ALPHA_TO_COVERAGE):Et(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(D){k!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),k=D)}function C(D){D!==$u?(Ut(r.CULL_FACE),D!==Y&&(D===Sc?r.cullFace(r.BACK):D===ju?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Et(r.CULL_FACE),Y=D}function y(D){D!==L&&(Z&&r.lineWidth(D),L=D)}function z(D,lt,ht){D?(Ut(r.POLYGON_OFFSET_FILL),(O!==lt||B!==ht)&&(r.polygonOffset(lt,ht),O=lt,B=ht)):Et(r.POLYGON_OFFSET_FILL)}function Q(D){D?Ut(r.SCISSOR_TEST):Et(r.SCISSOR_TEST)}function J(D){D===void 0&&(D=r.TEXTURE0+q-1),nt!==D&&(r.activeTexture(D),nt=D)}function tt(D,lt,ht){ht===void 0&&(nt===null?ht=r.TEXTURE0+q-1:ht=nt);let Lt=it[ht];Lt===void 0&&(Lt={type:void 0,texture:void 0},it[ht]=Lt),(Lt.type!==D||Lt.texture!==lt)&&(nt!==ht&&(r.activeTexture(ht),nt=ht),r.bindTexture(D,lt||Dt[D]),Lt.type=D,Lt.texture=lt)}function xt(){const D=it[nt];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ut(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Yt(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function mt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Bt(D){ot.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),ot.copy(D))}function Jt(D){Mt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Mt.copy(D))}function xe(D,lt){let ht=u.get(lt);ht===void 0&&(ht=new WeakMap,u.set(lt,ht));let Lt=ht.get(D);Lt===void 0&&(Lt=r.getUniformBlockIndex(lt,D.name),ht.set(D,Lt))}function Wt(D,lt){const Lt=u.get(lt).get(D);h.get(lt)!==Lt&&(r.uniformBlockBinding(lt,Lt,D.__bindingPointIndex),h.set(lt,Lt))}function at(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},nt=null,it={},f={},_=new WeakMap,g=[],m=null,p=!1,v=null,x=null,S=null,T=null,b=null,E=null,I=null,M=new Kt(0,0,0),w=0,U=!1,k=null,Y=null,L=null,O=null,B=null,ot.set(0,0,r.canvas.width,r.canvas.height),Mt.set(0,0,r.canvas.width,r.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Ut,disable:Et,bindFramebuffer:Zt,drawBuffers:G,useProgram:Pe,setBlending:_t,setMaterial:re,setFlipSided:Ot,setCullFace:C,setLineWidth:y,setPolygonOffset:z,setScissorTest:Q,activeTexture:J,bindTexture:tt,unbindTexture:xt,compressedTexImage2D:ut,compressedTexImage3D:pt,texImage2D:yt,texImage3D:mt,updateUBOMapping:xe,uniformBlockBinding:Wt,texStorage2D:Yt,texStorage3D:Nt,texSubImage2D:Rt,texSubImage3D:Ht,compressedTexSubImage2D:et,compressedTexSubImage3D:te,scissor:Bt,viewport:Jt,reset:at}}function c_(r,t,e,n,i,s,a){const o=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,y){return f?new OffscreenCanvas(C,y):so("canvas")}function g(C,y,z,Q){let J=1;if((C.width>Q||C.height>Q)&&(J=Q/Math.max(C.width,C.height)),J<1||y===!0)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap){const tt=y?io:Math.floor,xt=tt(J*C.width),ut=tt(J*C.height);u===void 0&&(u=_(xt,ut));const pt=z?_(xt,ut):u;return pt.width=xt,pt.height=ut,pt.getContext("2d").drawImage(C,0,0,xt,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+xt+"x"+ut+")."),pt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function m(C){return ya(C.width)&&ya(C.height)}function p(C){return o?!1:C.wrapS!==Ln||C.wrapT!==Ln||C.minFilter!==$e&&C.minFilter!==Je}function v(C,y){return C.generateMipmaps&&y&&C.minFilter!==$e&&C.minFilter!==Je}function x(C){r.generateMipmap(C)}function S(C,y,z,Q,J=!1){if(o===!1)return y;if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let tt=y;if(y===r.RED&&(z===r.FLOAT&&(tt=r.R32F),z===r.HALF_FLOAT&&(tt=r.R16F),z===r.UNSIGNED_BYTE&&(tt=r.R8)),y===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(tt=r.R8UI),z===r.UNSIGNED_SHORT&&(tt=r.R16UI),z===r.UNSIGNED_INT&&(tt=r.R32UI),z===r.BYTE&&(tt=r.R8I),z===r.SHORT&&(tt=r.R16I),z===r.INT&&(tt=r.R32I)),y===r.RG&&(z===r.FLOAT&&(tt=r.RG32F),z===r.HALF_FLOAT&&(tt=r.RG16F),z===r.UNSIGNED_BYTE&&(tt=r.RG8)),y===r.RGBA){const xt=J?Qr:ne.getTransfer(Q);z===r.FLOAT&&(tt=r.RGBA32F),z===r.HALF_FLOAT&&(tt=r.RGBA16F),z===r.UNSIGNED_BYTE&&(tt=xt===le?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(tt=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(tt=r.RGB5_A1)}return(tt===r.R16F||tt===r.R32F||tt===r.RG16F||tt===r.RG32F||tt===r.RGBA16F||tt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function T(C,y,z){return v(C,z)===!0||C.isFramebufferTexture&&C.minFilter!==$e&&C.minFilter!==Je?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function b(C){return C===$e||C===Ac||C===Co?r.NEAREST:r.LINEAR}function E(C){const y=C.target;y.removeEventListener("dispose",E),M(y),y.isVideoTexture&&h.delete(y)}function I(C){const y=C.target;y.removeEventListener("dispose",I),U(y)}function M(C){const y=n.get(C);if(y.__webglInit===void 0)return;const z=C.source,Q=d.get(z);if(Q){const J=Q[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&w(C),Object.keys(Q).length===0&&d.delete(z)}n.remove(C)}function w(C){const y=n.get(C);r.deleteTexture(y.__webglTexture);const z=C.source,Q=d.get(z);delete Q[y.__cacheKey],a.memory.textures--}function U(C){const y=C.texture,z=n.get(C),Q=n.get(y);if(Q.__webglTexture!==void 0&&(r.deleteTexture(Q.__webglTexture),a.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(z.__webglFramebuffer[J]))for(let tt=0;tt<z.__webglFramebuffer[J].length;tt++)r.deleteFramebuffer(z.__webglFramebuffer[J][tt]);else r.deleteFramebuffer(z.__webglFramebuffer[J]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[J])}else{if(Array.isArray(z.__webglFramebuffer))for(let J=0;J<z.__webglFramebuffer.length;J++)r.deleteFramebuffer(z.__webglFramebuffer[J]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let J=0;J<z.__webglColorRenderbuffer.length;J++)z.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[J]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let J=0,tt=y.length;J<tt;J++){const xt=n.get(y[J]);xt.__webglTexture&&(r.deleteTexture(xt.__webglTexture),a.memory.textures--),n.remove(y[J])}n.remove(y),n.remove(C)}let k=0;function Y(){k=0}function L(){const C=k;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),k+=1,C}function O(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function B(C,y){const z=n.get(C);if(C.isVideoTexture&&re(C),C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){const Q=C.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ot(z,C,y);return}}e.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+y)}function q(C,y){const z=n.get(C);if(C.version>0&&z.__version!==C.version){ot(z,C,y);return}e.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+y)}function Z(C,y){const z=n.get(C);if(C.version>0&&z.__version!==C.version){ot(z,C,y);return}e.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+y)}function K(C,y){const z=n.get(C);if(C.version>0&&z.__version!==C.version){Mt(z,C,y);return}e.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+y)}const $={[va]:r.REPEAT,[Ln]:r.CLAMP_TO_EDGE,[Ma]:r.MIRRORED_REPEAT},nt={[$e]:r.NEAREST,[Ac]:r.NEAREST_MIPMAP_NEAREST,[Co]:r.NEAREST_MIPMAP_LINEAR,[Je]:r.LINEAR,[Cd]:r.LINEAR_MIPMAP_NEAREST,[ir]:r.LINEAR_MIPMAP_LINEAR},it={[zd]:r.NEVER,[Yd]:r.ALWAYS,[Hd]:r.LESS,[Th]:r.LEQUAL,[Vd]:r.EQUAL,[qd]:r.GEQUAL,[Wd]:r.GREATER,[Xd]:r.NOTEQUAL};function X(C,y,z){if(z?(r.texParameteri(C,r.TEXTURE_WRAP_S,$[y.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,$[y.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,$[y.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,nt[y.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,nt[y.minFilter])):(r.texParameteri(C,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(C,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(y.wrapS!==Ln||y.wrapT!==Ln)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(C,r.TEXTURE_MAG_FILTER,b(y.magFilter)),r.texParameteri(C,r.TEXTURE_MIN_FILTER,b(y.minFilter)),y.minFilter!==$e&&y.minFilter!==Je&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,it[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const Q=t.get("EXT_texture_filter_anisotropic");if(y.magFilter===$e||y.minFilter!==Co&&y.minFilter!==ir||y.type===ci&&t.has("OES_texture_float_linear")===!1||o===!1&&y.type===sr&&t.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(r.texParameterf(C,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function j(C,y){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",E));const Q=y.source;let J=d.get(Q);J===void 0&&(J={},d.set(Q,J));const tt=O(y);if(tt!==C.__cacheKey){J[tt]===void 0&&(J[tt]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[tt].usedTimes++;const xt=J[C.__cacheKey];xt!==void 0&&(J[C.__cacheKey].usedTimes--,xt.usedTimes===0&&w(y)),C.__cacheKey=tt,C.__webglTexture=J[tt].texture}return z}function ot(C,y,z){let Q=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Q=r.TEXTURE_3D);const J=j(C,y),tt=y.source;e.bindTexture(Q,C.__webglTexture,r.TEXTURE0+z);const xt=n.get(tt);if(tt.version!==xt.__version||J===!0){e.activeTexture(r.TEXTURE0+z);const ut=ne.getPrimaries(ne.workingColorSpace),pt=y.colorSpace===Tn?null:ne.getPrimaries(y.colorSpace),Rt=y.colorSpace===Tn||ut===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);const Ht=p(y)&&m(y.image)===!1;let et=g(y.image,Ht,!1,i.maxTextureSize);et=Ot(y,et);const te=m(et)||o,Yt=s.convert(y.format,y.colorSpace);let Nt=s.convert(y.type),yt=S(y.internalFormat,Yt,Nt,y.colorSpace,y.isVideoTexture);X(Q,y,te);let mt;const Bt=y.mipmaps,Jt=o&&y.isVideoTexture!==!0&&yt!==wh,xe=xt.__version===void 0||J===!0,Wt=T(y,et,te);if(y.isDepthTexture)yt=r.DEPTH_COMPONENT,o?y.type===ci?yt=r.DEPTH_COMPONENT32F:y.type===ai?yt=r.DEPTH_COMPONENT24:y.type===ki?yt=r.DEPTH24_STENCIL8:yt=r.DEPTH_COMPONENT16:y.type===ci&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Fi&&yt===r.DEPTH_COMPONENT&&y.type!==Ga&&y.type!==ai&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=ai,Nt=s.convert(y.type)),y.format===As&&yt===r.DEPTH_COMPONENT&&(yt=r.DEPTH_STENCIL,y.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=ki,Nt=s.convert(y.type))),xe&&(Jt?e.texStorage2D(r.TEXTURE_2D,1,yt,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,yt,et.width,et.height,0,Yt,Nt,null));else if(y.isDataTexture)if(Bt.length>0&&te){Jt&&xe&&e.texStorage2D(r.TEXTURE_2D,Wt,yt,Bt[0].width,Bt[0].height);for(let at=0,D=Bt.length;at<D;at++)mt=Bt[at],Jt?e.texSubImage2D(r.TEXTURE_2D,at,0,0,mt.width,mt.height,Yt,Nt,mt.data):e.texImage2D(r.TEXTURE_2D,at,yt,mt.width,mt.height,0,Yt,Nt,mt.data);y.generateMipmaps=!1}else Jt?(xe&&e.texStorage2D(r.TEXTURE_2D,Wt,yt,et.width,et.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,et.width,et.height,Yt,Nt,et.data)):e.texImage2D(r.TEXTURE_2D,0,yt,et.width,et.height,0,Yt,Nt,et.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Jt&&xe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Wt,yt,Bt[0].width,Bt[0].height,et.depth);for(let at=0,D=Bt.length;at<D;at++)mt=Bt[at],y.format!==In?Yt!==null?Jt?e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,at,0,0,0,mt.width,mt.height,et.depth,Yt,mt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,at,yt,mt.width,mt.height,et.depth,0,mt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage3D(r.TEXTURE_2D_ARRAY,at,0,0,0,mt.width,mt.height,et.depth,Yt,Nt,mt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,at,yt,mt.width,mt.height,et.depth,0,Yt,Nt,mt.data)}else{Jt&&xe&&e.texStorage2D(r.TEXTURE_2D,Wt,yt,Bt[0].width,Bt[0].height);for(let at=0,D=Bt.length;at<D;at++)mt=Bt[at],y.format!==In?Yt!==null?Jt?e.compressedTexSubImage2D(r.TEXTURE_2D,at,0,0,mt.width,mt.height,Yt,mt.data):e.compressedTexImage2D(r.TEXTURE_2D,at,yt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?e.texSubImage2D(r.TEXTURE_2D,at,0,0,mt.width,mt.height,Yt,Nt,mt.data):e.texImage2D(r.TEXTURE_2D,at,yt,mt.width,mt.height,0,Yt,Nt,mt.data)}else if(y.isDataArrayTexture)Jt?(xe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Wt,yt,et.width,et.height,et.depth),e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,Yt,Nt,et.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,yt,et.width,et.height,et.depth,0,Yt,Nt,et.data);else if(y.isData3DTexture)Jt?(xe&&e.texStorage3D(r.TEXTURE_3D,Wt,yt,et.width,et.height,et.depth),e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,Yt,Nt,et.data)):e.texImage3D(r.TEXTURE_3D,0,yt,et.width,et.height,et.depth,0,Yt,Nt,et.data);else if(y.isFramebufferTexture){if(xe)if(Jt)e.texStorage2D(r.TEXTURE_2D,Wt,yt,et.width,et.height);else{let at=et.width,D=et.height;for(let lt=0;lt<Wt;lt++)e.texImage2D(r.TEXTURE_2D,lt,yt,at,D,0,Yt,Nt,null),at>>=1,D>>=1}}else if(Bt.length>0&&te){Jt&&xe&&e.texStorage2D(r.TEXTURE_2D,Wt,yt,Bt[0].width,Bt[0].height);for(let at=0,D=Bt.length;at<D;at++)mt=Bt[at],Jt?e.texSubImage2D(r.TEXTURE_2D,at,0,0,Yt,Nt,mt):e.texImage2D(r.TEXTURE_2D,at,yt,Yt,Nt,mt);y.generateMipmaps=!1}else Jt?(xe&&e.texStorage2D(r.TEXTURE_2D,Wt,yt,et.width,et.height),e.texSubImage2D(r.TEXTURE_2D,0,0,0,Yt,Nt,et)):e.texImage2D(r.TEXTURE_2D,0,yt,Yt,Nt,et);v(y,te)&&x(Q),xt.__version=tt.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function Mt(C,y,z){if(y.image.length!==6)return;const Q=j(C,y),J=y.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+z);const tt=n.get(J);if(J.version!==tt.__version||Q===!0){e.activeTexture(r.TEXTURE0+z);const xt=ne.getPrimaries(ne.workingColorSpace),ut=y.colorSpace===Tn?null:ne.getPrimaries(y.colorSpace),pt=y.colorSpace===Tn||xt===ut?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Rt=y.isCompressedTexture||y.image[0].isCompressedTexture,Ht=y.image[0]&&y.image[0].isDataTexture,et=[];for(let at=0;at<6;at++)!Rt&&!Ht?et[at]=g(y.image[at],!1,!0,i.maxCubemapSize):et[at]=Ht?y.image[at].image:y.image[at],et[at]=Ot(y,et[at]);const te=et[0],Yt=m(te)||o,Nt=s.convert(y.format,y.colorSpace),yt=s.convert(y.type),mt=S(y.internalFormat,Nt,yt,y.colorSpace),Bt=o&&y.isVideoTexture!==!0,Jt=tt.__version===void 0||Q===!0;let xe=T(y,te,Yt);X(r.TEXTURE_CUBE_MAP,y,Yt);let Wt;if(Rt){Bt&&Jt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,xe,mt,te.width,te.height);for(let at=0;at<6;at++){Wt=et[at].mipmaps;for(let D=0;D<Wt.length;D++){const lt=Wt[D];y.format!==In?Nt!==null?Bt?e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D,0,0,lt.width,lt.height,Nt,lt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D,mt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D,0,0,lt.width,lt.height,Nt,yt,lt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D,mt,lt.width,lt.height,0,Nt,yt,lt.data)}}}else{Wt=y.mipmaps,Bt&&Jt&&(Wt.length>0&&xe++,e.texStorage2D(r.TEXTURE_CUBE_MAP,xe,mt,et[0].width,et[0].height));for(let at=0;at<6;at++)if(Ht){Bt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,et[at].width,et[at].height,Nt,yt,et[at].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,mt,et[at].width,et[at].height,0,Nt,yt,et[at].data);for(let D=0;D<Wt.length;D++){const ht=Wt[D].image[at].image;Bt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D+1,0,0,ht.width,ht.height,Nt,yt,ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D+1,mt,ht.width,ht.height,0,Nt,yt,ht.data)}}else{Bt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Nt,yt,et[at]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,mt,Nt,yt,et[at]);for(let D=0;D<Wt.length;D++){const lt=Wt[D];Bt?e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D+1,0,0,Nt,yt,lt.image[at]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+at,D+1,mt,Nt,yt,lt.image[at])}}}v(y,Yt)&&x(r.TEXTURE_CUBE_MAP),tt.__version=J.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function vt(C,y,z,Q,J,tt){const xt=s.convert(z.format,z.colorSpace),ut=s.convert(z.type),pt=S(z.internalFormat,xt,ut,z.colorSpace);if(!n.get(y).__hasExternalTextures){const Ht=Math.max(1,y.width>>tt),et=Math.max(1,y.height>>tt);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?e.texImage3D(J,tt,pt,Ht,et,y.depth,0,xt,ut,null):e.texImage2D(J,tt,pt,Ht,et,0,xt,ut,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),_t(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,0,Pt(y)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,tt),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Dt(C,y,z){if(r.bindRenderbuffer(r.RENDERBUFFER,C),y.depthBuffer&&!y.stencilBuffer){let Q=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(z||_t(y)){const J=y.depthTexture;J&&J.isDepthTexture&&(J.type===ci?Q=r.DEPTH_COMPONENT32F:J.type===ai&&(Q=r.DEPTH_COMPONENT24));const tt=Pt(y);_t(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,tt,Q,y.width,y.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,tt,Q,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,Q,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(y.depthBuffer&&y.stencilBuffer){const Q=Pt(y);z&&_t(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,y.width,y.height):_t(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const Q=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let J=0;J<Q.length;J++){const tt=Q[J],xt=s.convert(tt.format,tt.colorSpace),ut=s.convert(tt.type),pt=S(tt.internalFormat,xt,ut,tt.colorSpace),Rt=Pt(y);z&&_t(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Rt,pt,y.width,y.height):_t(y)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Rt,pt,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,pt,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ut(C,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),B(y.depthTexture,0);const Q=n.get(y.depthTexture).__webglTexture,J=Pt(y);if(y.depthTexture.format===Fi)_t(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(y.depthTexture.format===As)_t(y)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Et(C){const y=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ut(y.__webglFramebuffer,C)}else if(z){y.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[Q]),y.__webglDepthbuffer[Q]=r.createRenderbuffer(),Dt(y.__webglDepthbuffer[Q],C,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=r.createRenderbuffer(),Dt(y.__webglDepthbuffer,C,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Zt(C,y,z){const Q=n.get(C);y!==void 0&&vt(Q.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Et(C)}function G(C){const y=C.texture,z=n.get(C),Q=n.get(y);C.addEventListener("dispose",I),C.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=y.version,a.memory.textures++);const J=C.isWebGLCubeRenderTarget===!0,tt=C.isWebGLMultipleRenderTargets===!0,xt=m(C)||o;if(J){z.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[ut]=[];for(let pt=0;pt<y.mipmaps.length;pt++)z.__webglFramebuffer[ut][pt]=r.createFramebuffer()}else z.__webglFramebuffer[ut]=r.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let ut=0;ut<y.mipmaps.length;ut++)z.__webglFramebuffer[ut]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(tt)if(i.drawBuffers){const ut=C.texture;for(let pt=0,Rt=ut.length;pt<Rt;pt++){const Ht=n.get(ut[pt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&C.samples>0&&_t(C)===!1){const ut=tt?y:[y];z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<ut.length;pt++){const Rt=ut[pt];z.__webglColorRenderbuffer[pt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);const Ht=s.convert(Rt.format,Rt.colorSpace),et=s.convert(Rt.type),te=S(Rt.internalFormat,Ht,et,Rt.colorSpace,C.isXRRenderTarget===!0),Yt=Pt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,te,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),Dt(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){e.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),X(r.TEXTURE_CUBE_MAP,y,xt);for(let ut=0;ut<6;ut++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let pt=0;pt<y.mipmaps.length;pt++)vt(z.__webglFramebuffer[ut][pt],C,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,pt);else vt(z.__webglFramebuffer[ut],C,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);v(y,xt)&&x(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const ut=C.texture;for(let pt=0,Rt=ut.length;pt<Rt;pt++){const Ht=ut[pt],et=n.get(Ht);e.bindTexture(r.TEXTURE_2D,et.__webglTexture),X(r.TEXTURE_2D,Ht,xt),vt(z.__webglFramebuffer,C,Ht,r.COLOR_ATTACHMENT0+pt,r.TEXTURE_2D,0),v(Ht,xt)&&x(r.TEXTURE_2D)}e.unbindTexture()}else{let ut=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(o?ut=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ut,Q.__webglTexture),X(ut,y,xt),o&&y.mipmaps&&y.mipmaps.length>0)for(let pt=0;pt<y.mipmaps.length;pt++)vt(z.__webglFramebuffer[pt],C,y,r.COLOR_ATTACHMENT0,ut,pt);else vt(z.__webglFramebuffer,C,y,r.COLOR_ATTACHMENT0,ut,0);v(y,xt)&&x(ut),e.unbindTexture()}C.depthBuffer&&Et(C)}function Pe(C){const y=m(C)||o,z=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let Q=0,J=z.length;Q<J;Q++){const tt=z[Q];if(v(tt,y)){const xt=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ut=n.get(tt).__webglTexture;e.bindTexture(xt,ut),x(xt),e.unbindTexture()}}}function wt(C){if(o&&C.samples>0&&_t(C)===!1){const y=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],z=C.width,Q=C.height;let J=r.COLOR_BUFFER_BIT;const tt=[],xt=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ut=n.get(C),pt=C.isWebGLMultipleRenderTargets===!0;if(pt)for(let Rt=0;Rt<y.length;Rt++)e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let Rt=0;Rt<y.length;Rt++){tt.push(r.COLOR_ATTACHMENT0+Rt),C.depthBuffer&&tt.push(xt);const Ht=ut.__ignoreDepthValues!==void 0?ut.__ignoreDepthValues:!1;if(Ht===!1&&(C.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]),Ht===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[xt]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[xt])),pt){const et=n.get(y[Rt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,et,0)}r.blitFramebuffer(0,0,z,Q,0,0,z,Q,J,r.NEAREST),l&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Rt=0;Rt<y.length;Rt++){e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.RENDERBUFFER,ut.__webglColorRenderbuffer[Rt]);const Ht=n.get(y[Rt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ut.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Rt,r.TEXTURE_2D,Ht,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}}function Pt(C){return Math.min(i.maxSamples,C.samples)}function _t(C){const y=n.get(C);return o&&C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function re(C){const y=a.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function Ot(C,y){const z=C.colorSpace,Q=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===wa||z!==Jn&&z!==Tn&&(ne.getTransfer(z)===le?o===!1?t.has("EXT_sRGB")===!0&&Q===In?(C.format=wa,C.minFilter=Je,C.generateMipmaps=!1):y=Ah.sRGBToLinear(y):(Q!==In||J!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}this.allocateTextureUnit=L,this.resetTextureUnits=Y,this.setTexture2D=B,this.setTexture2DArray=q,this.setTexture3D=Z,this.setTextureCube=K,this.rebindTextures=Zt,this.setupRenderTarget=G,this.updateRenderTargetMipmap=Pe,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=_t}function l_(r,t,e){const n=e.isWebGL2;function i(s,a=Tn){let o;const c=ne.getTransfer(a);if(s===pi)return r.UNSIGNED_BYTE;if(s===_h)return r.UNSIGNED_SHORT_4_4_4_4;if(s===xh)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Pd)return r.BYTE;if(s===Ld)return r.SHORT;if(s===Ga)return r.UNSIGNED_SHORT;if(s===gh)return r.INT;if(s===ai)return r.UNSIGNED_INT;if(s===ci)return r.FLOAT;if(s===sr)return n?r.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Id)return r.ALPHA;if(s===In)return r.RGBA;if(s===Dd)return r.LUMINANCE;if(s===Ud)return r.LUMINANCE_ALPHA;if(s===Fi)return r.DEPTH_COMPONENT;if(s===As)return r.DEPTH_STENCIL;if(s===wa)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Od)return r.RED;if(s===vh)return r.RED_INTEGER;if(s===Nd)return r.RG;if(s===Mh)return r.RG_INTEGER;if(s===Sh)return r.RGBA_INTEGER;if(s===Po||s===Lo||s===Io||s===Do)if(c===le)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Po)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Lo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Io)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Do)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Po)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Lo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Io)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Do)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Rc||s===Cc||s===Pc||s===Lc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Rc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Cc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Pc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Lc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===wh)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ic||s===Dc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Ic)return c===le?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Dc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Uc||s===Oc||s===Nc||s===kc||s===Fc||s===Bc||s===Gc||s===zc||s===Hc||s===Vc||s===Wc||s===Xc||s===qc||s===Yc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Uc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Oc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Nc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===kc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Fc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Bc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Gc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Hc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Vc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Wc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Xc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===qc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Yc)return c===le?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Uo||s===Zc||s===Kc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(s===Uo)return c===le?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Zc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Kc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===kd||s===$c||s===jc||s===Jc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(s===Uo)return o.COMPRESSED_RED_RGTC1_EXT;if(s===$c)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Jc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ki?n?r.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class h_ extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ft extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}}const u_={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,_=.005;l.inputState.pinching&&d>f+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(u_)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ft;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class d_ extends Us{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,_=null;const g=e.getContextAttributes();let m=null,p=null;const v=[],x=[],S=new Ct;let T=null;const b=new fn;b.layers.enable(1),b.viewport=new de;const E=new fn;E.layers.enable(2),E.viewport=new de;const I=[b,E],M=new h_;M.layers.enable(1),M.layers.enable(2);let w=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let j=v[X];return j===void 0&&(j=new ia,v[X]=j),j.getTargetRaySpace()},this.getControllerGrip=function(X){let j=v[X];return j===void 0&&(j=new ia,v[X]=j),j.getGripSpace()},this.getHand=function(X){let j=v[X];return j===void 0&&(j=new ia,v[X]=j),j.getHandSpace()};function k(X){const j=x.indexOf(X.inputSource);if(j===-1)return;const ot=v[j];ot!==void 0&&(ot.update(X.inputSource,X.frame,l||a),ot.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",L);for(let X=0;X<v.length;X++){const j=x[X];j!==null&&(x[X]=null,v[X].disconnect(j))}w=null,U=null,t.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,it.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(S),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const j={antialias:i.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,j),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Wi(f.framebufferWidth,f.framebufferHeight,{format:In,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let j=null,ot=null,Mt=null;g.depth&&(Mt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,j=g.stencil?As:Fi,ot=g.stencil?ki:ai);const vt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(vt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),p=new Wi(d.textureWidth,d.textureHeight,{format:In,type:pi,depthTexture:new Bh(d.textureWidth,d.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const Dt=t.properties.get(p);Dt.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(X){for(let j=0;j<X.removed.length;j++){const ot=X.removed[j],Mt=x.indexOf(ot);Mt>=0&&(x[Mt]=null,v[Mt].disconnect(ot))}for(let j=0;j<X.added.length;j++){const ot=X.added[j];let Mt=x.indexOf(ot);if(Mt===-1){for(let Dt=0;Dt<v.length;Dt++)if(Dt>=x.length){x.push(ot),Mt=Dt;break}else if(x[Dt]===null){x[Dt]=ot,Mt=Dt;break}if(Mt===-1)break}const vt=v[Mt];vt&&vt.connect(ot)}}const O=new P,B=new P;function q(X,j,ot){O.setFromMatrixPosition(j.matrixWorld),B.setFromMatrixPosition(ot.matrixWorld);const Mt=O.distanceTo(B),vt=j.projectionMatrix.elements,Dt=ot.projectionMatrix.elements,Ut=vt[14]/(vt[10]-1),Et=vt[14]/(vt[10]+1),Zt=(vt[9]+1)/vt[5],G=(vt[9]-1)/vt[5],Pe=(vt[8]-1)/vt[0],wt=(Dt[8]+1)/Dt[0],Pt=Ut*Pe,_t=Ut*wt,re=Mt/(-Pe+wt),Ot=re*-Pe;j.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ot),X.translateZ(re),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const C=Ut+re,y=Et+re,z=Pt-Ot,Q=_t+(Mt-Ot),J=Zt*Et/y*C,tt=G*Et/y*C;X.projectionMatrix.makePerspective(z,Q,J,tt,C,y),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function Z(X,j){j===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(j.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;M.near=E.near=b.near=X.near,M.far=E.far=b.far=X.far,(w!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,U=M.far);const j=X.parent,ot=M.cameras;Z(M,j);for(let Mt=0;Mt<ot.length;Mt++)Z(ot[Mt],j);ot.length===2?q(M,b,E):M.projectionMatrix.copy(b.projectionMatrix),K(X,M,j)};function K(X,j,ot){ot===null?X.matrix.copy(j.matrixWorld):(X.matrix.copy(ot.matrixWorld),X.matrix.invert(),X.matrix.multiply(j.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(j.projectionMatrix),X.projectionMatrixInverse.copy(j.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=rr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)};let $=null;function nt(X,j){if(h=j.getViewerPose(l||a),_=j,h!==null){const ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let Mt=!1;ot.length!==M.cameras.length&&(M.cameras.length=0,Mt=!0);for(let vt=0;vt<ot.length;vt++){const Dt=ot[vt];let Ut=null;if(f!==null)Ut=f.getViewport(Dt);else{const Zt=u.getViewSubImage(d,Dt);Ut=Zt.viewport,vt===0&&(t.setRenderTargetTextures(p,Zt.colorTexture,d.ignoreDepthValues?void 0:Zt.depthStencilTexture),t.setRenderTarget(p))}let Et=I[vt];Et===void 0&&(Et=new fn,Et.layers.enable(vt),Et.viewport=new de,I[vt]=Et),Et.matrix.fromArray(Dt.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(Dt.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),vt===0&&(M.matrix.copy(Et.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),Mt===!0&&M.cameras.push(Et)}}for(let ot=0;ot<v.length;ot++){const Mt=x[ot],vt=v[ot];Mt!==null&&vt!==void 0&&vt.update(Mt,j,l||a)}$&&$(X,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),_=null}const it=new kh;it.setAnimationLoop(nt),this.setAnimationLoop=function(X){$=X},this.dispose=function(){}}}function f_(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Uh(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function p_(r,t,e,n){let i={},s={},a=[];const o=e.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(v,x){const S=x.program;n.uniformBlockBinding(v,S)}function l(v,x){let S=i[v.id];S===void 0&&(_(v),S=h(v),i[v.id]=S,v.addEventListener("dispose",m));const T=x.program;n.updateUBOMapping(v,T);const b=t.render.frame;s[v.id]!==b&&(d(v),s[v.id]=b)}function h(v){const x=u();v.__bindingPointIndex=x;const S=r.createBuffer(),T=v.__size,b=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,S),r.bufferData(r.UNIFORM_BUFFER,T,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,S),S}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const x=i[v.id],S=v.uniforms,T=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let b=0,E=S.length;b<E;b++){const I=Array.isArray(S[b])?S[b]:[S[b]];for(let M=0,w=I.length;M<w;M++){const U=I[M];if(f(U,b,M,T)===!0){const k=U.__offset,Y=Array.isArray(U.value)?U.value:[U.value];let L=0;for(let O=0;O<Y.length;O++){const B=Y[O],q=g(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,r.bufferSubData(r.UNIFORM_BUFFER,k+L,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,x,S,T){const b=v.value,E=x+"_"+S;if(T[E]===void 0)return typeof b=="number"||typeof b=="boolean"?T[E]=b:T[E]=b.clone(),!0;{const I=T[E];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return T[E]=b,!0}else if(I.equals(b)===!1)return I.copy(b),!0}return!1}function _(v){const x=v.uniforms;let S=0;const T=16;for(let E=0,I=x.length;E<I;E++){const M=Array.isArray(x[E])?x[E]:[x[E]];for(let w=0,U=M.length;w<U;w++){const k=M[w],Y=Array.isArray(k.value)?k.value:[k.value];for(let L=0,O=Y.length;L<O;L++){const B=Y[L],q=g(B),Z=S%T;Z!==0&&T-Z<q.boundary&&(S+=T-Z),k.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=q.storage}}}const b=S%T;return b>0&&(S+=T-b),v.__size=S,v.__cache={},this}function g(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function m(v){const x=v.target;x.removeEventListener("dispose",m);const S=a.indexOf(x.__bindingPointIndex);a.splice(S,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:c,update:l,dispose:p}}class Xh{constructor(t={}){const{canvas:e=lf(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const p=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this._useLegacyLights=!1,this.toneMapping=fi,this.toneMappingExposure=1;const x=this;let S=!1,T=0,b=0,E=null,I=-1,M=null;const w=new de,U=new de;let k=null;const Y=new Kt(0);let L=0,O=e.width,B=e.height,q=1,Z=null,K=null;const $=new de(0,0,O,B),nt=new de(0,0,O,B);let it=!1;const X=new Wa;let j=!1,ot=!1,Mt=null;const vt=new ye,Dt=new Ct,Ut=new P,Et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Zt(){return E===null?q:1}let G=n;function Pe(A,N){for(let V=0;V<A.length;V++){const W=A[V],H=e.getContext(W,N);if(H!==null)return H}return null}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ba}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",lt,!1),G===null){const N=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&N.shift(),G=Pe(N,A),G===null)throw Pe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let wt,Pt,_t,re,Ot,C,y,z,Q,J,tt,xt,ut,pt,Rt,Ht,et,te,Yt,Nt,yt,mt,Bt,Jt;function xe(){wt=new E0(G),Pt=new x0(G,wt,t),wt.init(Pt),mt=new l_(G,wt,Pt),_t=new a_(G,wt,Pt),re=new A0(G),Ot=new Yg,C=new c_(G,wt,_t,Ot,Pt,mt,re),y=new M0(x),z=new y0(x),Q=new Of(G,Pt),Bt=new g0(G,wt,Q,Pt),J=new T0(G,Q,re,Bt),tt=new L0(G,J,Q,re),Yt=new P0(G,Pt,C),Ht=new v0(Ot),xt=new qg(x,y,z,wt,Pt,Bt,Ht),ut=new f_(x,Ot),pt=new Kg,Rt=new e_(wt,Pt),te=new m0(x,y,z,_t,tt,d,c),et=new o_(x,tt,Pt),Jt=new p_(G,re,Pt,_t),Nt=new _0(G,wt,re,Pt),yt=new b0(G,wt,re,Pt),re.programs=xt.programs,x.capabilities=Pt,x.extensions=wt,x.properties=Ot,x.renderLists=pt,x.shadowMap=et,x.state=_t,x.info=re}xe();const Wt=new d_(x,G);this.xr=Wt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const A=wt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=wt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(A){A!==void 0&&(q=A,this.setSize(O,B,!1))},this.getSize=function(A){return A.set(O,B)},this.setSize=function(A,N,V=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=A,B=N,e.width=Math.floor(A*q),e.height=Math.floor(N*q),V===!0&&(e.style.width=A+"px",e.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(O*q,B*q).floor()},this.setDrawingBufferSize=function(A,N,V){O=A,B=N,q=V,e.width=Math.floor(A*V),e.height=Math.floor(N*V),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(w)},this.getViewport=function(A){return A.copy($)},this.setViewport=function(A,N,V,W){A.isVector4?$.set(A.x,A.y,A.z,A.w):$.set(A,N,V,W),_t.viewport(w.copy($).multiplyScalar(q).floor())},this.getScissor=function(A){return A.copy(nt)},this.setScissor=function(A,N,V,W){A.isVector4?nt.set(A.x,A.y,A.z,A.w):nt.set(A,N,V,W),_t.scissor(U.copy(nt).multiplyScalar(q).floor())},this.getScissorTest=function(){return it},this.setScissorTest=function(A){_t.setScissorTest(it=A)},this.setOpaqueSort=function(A){Z=A},this.setTransparentSort=function(A){K=A},this.getClearColor=function(A){return A.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(A=!0,N=!0,V=!0){let W=0;if(A){let H=!1;if(E!==null){const dt=E.texture.format;H=dt===Sh||dt===Mh||dt===vh}if(H){const dt=E.texture.type,St=dt===pi||dt===ai||dt===Ga||dt===ki||dt===_h||dt===xh,At=te.getClearColor(),It=te.getClearAlpha(),Vt=At.r,kt=At.g,Ft=At.b;St?(f[0]=Vt,f[1]=kt,f[2]=Ft,f[3]=It,G.clearBufferuiv(G.COLOR,0,f)):(_[0]=Vt,_[1]=kt,_[2]=Ft,_[3]=It,G.clearBufferiv(G.COLOR,0,_))}else W|=G.COLOR_BUFFER_BIT}N&&(W|=G.DEPTH_BUFFER_BIT),V&&(W|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),pt.dispose(),Rt.dispose(),Ot.dispose(),y.dispose(),z.dispose(),tt.dispose(),Bt.dispose(),Jt.dispose(),xt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",qe),Wt.removeEventListener("sessionend",ce),Mt&&(Mt.dispose(),Mt=null),Ye.stop()};function at(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const A=re.autoReset,N=et.enabled,V=et.autoUpdate,W=et.needsUpdate,H=et.type;xe(),re.autoReset=A,et.enabled=N,et.autoUpdate=V,et.needsUpdate=W,et.type=H}function lt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ht(A){const N=A.target;N.removeEventListener("dispose",ht),Lt(N)}function Lt(A){Tt(A),Ot.remove(A)}function Tt(A){const N=Ot.get(A).programs;N!==void 0&&(N.forEach(function(V){xt.releaseProgram(V)}),A.isShaderMaterial&&xt.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,V,W,H,dt){N===null&&(N=Et);const St=H.isMesh&&H.matrixWorld.determinant()<0,At=qu(A,N,V,W,H);_t.setMaterial(W,St);let It=V.index,Vt=1;if(W.wireframe===!0){if(It=J.getWireframeAttribute(V),It===void 0)return;Vt=2}const kt=V.drawRange,Ft=V.attributes.position;let Se=kt.start*Vt,ln=(kt.start+kt.count)*Vt;dt!==null&&(Se=Math.max(Se,dt.start*Vt),ln=Math.min(ln,(dt.start+dt.count)*Vt)),It!==null?(Se=Math.max(Se,0),ln=Math.min(ln,It.count)):Ft!=null&&(Se=Math.max(Se,0),ln=Math.min(ln,Ft.count));const Ie=ln-Se;if(Ie<0||Ie===1/0)return;Bt.setup(H,W,At,V,It);let zn,pe=Nt;if(It!==null&&(zn=Q.get(It),pe=yt,pe.setIndex(zn)),H.isMesh)W.wireframe===!0?(_t.setLineWidth(W.wireframeLinewidth*Zt()),pe.setMode(G.LINES)):pe.setMode(G.TRIANGLES);else if(H.isLine){let Xt=W.linewidth;Xt===void 0&&(Xt=1),_t.setLineWidth(Xt*Zt()),H.isLineSegments?pe.setMode(G.LINES):H.isLineLoop?pe.setMode(G.LINE_LOOP):pe.setMode(G.LINE_STRIP)}else H.isPoints?pe.setMode(G.POINTS):H.isSprite&&pe.setMode(G.TRIANGLES);if(H.isBatchedMesh)pe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)pe.renderInstances(Se,Ie,H.count);else if(V.isInstancedBufferGeometry){const Xt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,To=Math.min(V.instanceCount,Xt);pe.renderInstances(Se,Ie,To)}else pe.render(Se,Ie)};function oe(A,N,V){A.transparent===!0&&A.side===pn&&A.forceSinglePass===!1?(A.side=tn,A.needsUpdate=!0,vr(A,N,V),A.side=_i,A.needsUpdate=!0,vr(A,N,V),A.side=pn):vr(A,N,V)}this.compile=function(A,N,V=null){V===null&&(V=A),m=Rt.get(V),m.init(),v.push(m),V.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),A!==V&&A.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights(x._useLegacyLights);const W=new Set;return A.traverse(function(H){const dt=H.material;if(dt)if(Array.isArray(dt))for(let St=0;St<dt.length;St++){const At=dt[St];oe(At,V,H),W.add(At)}else oe(dt,V,H),W.add(dt)}),v.pop(),m=null,W},this.compileAsync=function(A,N,V=null){const W=this.compile(A,N,V);return new Promise(H=>{function dt(){if(W.forEach(function(St){Ot.get(St).currentProgram.isReady()&&W.delete(St)}),W.size===0){H(A);return}setTimeout(dt,10)}wt.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let ae=null;function Le(A){ae&&ae(A)}function qe(){Ye.stop()}function ce(){Ye.start()}const Ye=new kh;Ye.setAnimationLoop(Le),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(A){ae=A,Wt.setAnimationLoop(A),A===null?Ye.stop():Ye.start()},Wt.addEventListener("sessionstart",qe),Wt.addEventListener("sessionend",ce),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(N),N=Wt.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,N,E),m=Rt.get(A,v.length),m.init(),v.push(m),vt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),X.setFromProjectionMatrix(vt),ot=this.localClippingEnabled,j=Ht.init(this.clippingPlanes,ot),g=pt.get(A,p.length),g.init(),p.push(g),Un(A,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(Z,K),this.info.render.frame++,j===!0&&Ht.beginShadows();const V=m.state.shadowsArray;if(et.render(V,A,N),j===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(g,A),m.setupLights(x._useLegacyLights),N.isArrayCamera){const W=N.cameras;for(let H=0,dt=W.length;H<dt;H++){const St=W[H];mc(g,A,St,St.viewport)}}else mc(g,A,N);E!==null&&(C.updateMultisampleRenderTarget(E),C.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(x,A,N),Bt.resetDefaultState(),I=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?g=p[p.length-1]:g=null};function Un(A,N,V,W){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)V=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||X.intersectsSprite(A)){W&&Ut.setFromMatrixPosition(A.matrixWorld).applyMatrix4(vt);const St=tt.update(A),At=A.material;At.visible&&g.push(A,St,At,V,Ut.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||X.intersectsObject(A))){const St=tt.update(A),At=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ut.copy(A.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Ut.copy(St.boundingSphere.center)),Ut.applyMatrix4(A.matrixWorld).applyMatrix4(vt)),Array.isArray(At)){const It=St.groups;for(let Vt=0,kt=It.length;Vt<kt;Vt++){const Ft=It[Vt],Se=At[Ft.materialIndex];Se&&Se.visible&&g.push(A,St,Se,V,Ut.z,Ft)}}else At.visible&&g.push(A,St,At,V,Ut.z,null)}}const dt=A.children;for(let St=0,At=dt.length;St<At;St++)Un(dt[St],N,V,W)}function mc(A,N,V,W){const H=A.opaque,dt=A.transmissive,St=A.transparent;m.setupLightsView(V),j===!0&&Ht.setGlobalState(x.clippingPlanes,V),dt.length>0&&Xu(H,dt,N,V),W&&_t.viewport(w.copy(W)),H.length>0&&xr(H,N,V),dt.length>0&&xr(dt,N,V),St.length>0&&xr(St,N,V),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Xu(A,N,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const dt=Pt.isWebGL2;Mt===null&&(Mt=new Wi(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")?sr:pi,minFilter:ir,samples:dt?4:0})),x.getDrawingBufferSize(Dt),dt?Mt.setSize(Dt.x,Dt.y):Mt.setSize(io(Dt.x),io(Dt.y));const St=x.getRenderTarget();x.setRenderTarget(Mt),x.getClearColor(Y),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const At=x.toneMapping;x.toneMapping=fi,xr(A,V,W),C.updateMultisampleRenderTarget(Mt),C.updateRenderTargetMipmap(Mt);let It=!1;for(let Vt=0,kt=N.length;Vt<kt;Vt++){const Ft=N[Vt],Se=Ft.object,ln=Ft.geometry,Ie=Ft.material,zn=Ft.group;if(Ie.side===pn&&Se.layers.test(W.layers)){const pe=Ie.side;Ie.side=tn,Ie.needsUpdate=!0,gc(Se,V,W,ln,Ie,zn),Ie.side=pe,Ie.needsUpdate=!0,It=!0}}It===!0&&(C.updateMultisampleRenderTarget(Mt),C.updateRenderTargetMipmap(Mt)),x.setRenderTarget(St),x.setClearColor(Y,L),x.toneMapping=At}function xr(A,N,V){const W=N.isScene===!0?N.overrideMaterial:null;for(let H=0,dt=A.length;H<dt;H++){const St=A[H],At=St.object,It=St.geometry,Vt=W===null?St.material:W,kt=St.group;At.layers.test(V.layers)&&gc(At,N,V,It,Vt,kt)}}function gc(A,N,V,W,H,dt){A.onBeforeRender(x,N,V,W,H,dt),A.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(x,N,V,W,A,dt),H.transparent===!0&&H.side===pn&&H.forceSinglePass===!1?(H.side=tn,H.needsUpdate=!0,x.renderBufferDirect(V,N,W,H,A,dt),H.side=_i,H.needsUpdate=!0,x.renderBufferDirect(V,N,W,H,A,dt),H.side=pn):x.renderBufferDirect(V,N,W,H,A,dt),A.onAfterRender(x,N,V,W,H,dt)}function vr(A,N,V){N.isScene!==!0&&(N=Et);const W=Ot.get(A),H=m.state.lights,dt=m.state.shadowsArray,St=H.state.version,At=xt.getParameters(A,H.state,dt,N,V),It=xt.getProgramCacheKey(At);let Vt=W.programs;W.environment=A.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(A.isMeshStandardMaterial?z:y).get(A.envMap||W.environment),Vt===void 0&&(A.addEventListener("dispose",ht),Vt=new Map,W.programs=Vt);let kt=Vt.get(It);if(kt!==void 0){if(W.currentProgram===kt&&W.lightsStateVersion===St)return xc(A,At),kt}else At.uniforms=xt.getUniforms(A),A.onBuild(V,At,x),A.onBeforeCompile(At,x),kt=xt.acquireProgram(At,It),Vt.set(It,kt),W.uniforms=At.uniforms;const Ft=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ft.clippingPlanes=Ht.uniform),xc(A,At),W.needsLights=Zu(A),W.lightsStateVersion=St,W.needsLights&&(Ft.ambientLightColor.value=H.state.ambient,Ft.lightProbe.value=H.state.probe,Ft.directionalLights.value=H.state.directional,Ft.directionalLightShadows.value=H.state.directionalShadow,Ft.spotLights.value=H.state.spot,Ft.spotLightShadows.value=H.state.spotShadow,Ft.rectAreaLights.value=H.state.rectArea,Ft.ltc_1.value=H.state.rectAreaLTC1,Ft.ltc_2.value=H.state.rectAreaLTC2,Ft.pointLights.value=H.state.point,Ft.pointLightShadows.value=H.state.pointShadow,Ft.hemisphereLights.value=H.state.hemi,Ft.directionalShadowMap.value=H.state.directionalShadowMap,Ft.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ft.spotShadowMap.value=H.state.spotShadowMap,Ft.spotLightMatrix.value=H.state.spotLightMatrix,Ft.spotLightMap.value=H.state.spotLightMap,Ft.pointShadowMap.value=H.state.pointShadowMap,Ft.pointShadowMatrix.value=H.state.pointShadowMatrix),W.currentProgram=kt,W.uniformsList=null,kt}function _c(A){if(A.uniformsList===null){const N=A.currentProgram.getUniforms();A.uniformsList=Zr.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function xc(A,N){const V=Ot.get(A);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function qu(A,N,V,W,H){N.isScene!==!0&&(N=Et),C.resetTextureUnits();const dt=N.fog,St=W.isMeshStandardMaterial?N.environment:null,At=E===null?x.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Jn,It=(W.isMeshStandardMaterial?z:y).get(W.envMap||St),Vt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,kt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ft=!!V.morphAttributes.position,Se=!!V.morphAttributes.normal,ln=!!V.morphAttributes.color;let Ie=fi;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Ie=x.toneMapping);const zn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,pe=zn!==void 0?zn.length:0,Xt=Ot.get(W),To=m.state.lights;if(j===!0&&(ot===!0||A!==M)){const Sn=A===M&&W.id===I;Ht.setState(W,A,Sn)}let ve=!1;W.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==To.state.version||Xt.outputColorSpace!==At||H.isBatchedMesh&&Xt.batching===!1||!H.isBatchedMesh&&Xt.batching===!0||H.isInstancedMesh&&Xt.instancing===!1||!H.isInstancedMesh&&Xt.instancing===!0||H.isSkinnedMesh&&Xt.skinning===!1||!H.isSkinnedMesh&&Xt.skinning===!0||H.isInstancedMesh&&Xt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Xt.instancingColor===!1&&H.instanceColor!==null||Xt.envMap!==It||W.fog===!0&&Xt.fog!==dt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==Ht.numPlanes||Xt.numIntersection!==Ht.numIntersection)||Xt.vertexAlphas!==Vt||Xt.vertexTangents!==kt||Xt.morphTargets!==Ft||Xt.morphNormals!==Se||Xt.morphColors!==ln||Xt.toneMapping!==Ie||Pt.isWebGL2===!0&&Xt.morphTargetsCount!==pe)&&(ve=!0):(ve=!0,Xt.__version=W.version);let yi=Xt.currentProgram;ve===!0&&(yi=vr(W,N,H));let vc=!1,ks=!1,bo=!1;const Ge=yi.getUniforms(),Ei=Xt.uniforms;if(_t.useProgram(yi.program)&&(vc=!0,ks=!0,bo=!0),W.id!==I&&(I=W.id,ks=!0),vc||M!==A){Ge.setValue(G,"projectionMatrix",A.projectionMatrix),Ge.setValue(G,"viewMatrix",A.matrixWorldInverse);const Sn=Ge.map.cameraPosition;Sn!==void 0&&Sn.setValue(G,Ut.setFromMatrixPosition(A.matrixWorld)),Pt.logarithmicDepthBuffer&&Ge.setValue(G,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ge.setValue(G,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,ks=!0,bo=!0)}if(H.isSkinnedMesh){Ge.setOptional(G,H,"bindMatrix"),Ge.setOptional(G,H,"bindMatrixInverse");const Sn=H.skeleton;Sn&&(Pt.floatVertexTextures?(Sn.boneTexture===null&&Sn.computeBoneTexture(),Ge.setValue(G,"boneTexture",Sn.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Ge.setOptional(G,H,"batchingTexture"),Ge.setValue(G,"batchingTexture",H._matricesTexture,C));const Ao=V.morphAttributes;if((Ao.position!==void 0||Ao.normal!==void 0||Ao.color!==void 0&&Pt.isWebGL2===!0)&&Yt.update(H,V,yi),(ks||Xt.receiveShadow!==H.receiveShadow)&&(Xt.receiveShadow=H.receiveShadow,Ge.setValue(G,"receiveShadow",H.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Ei.envMap.value=It,Ei.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),ks&&(Ge.setValue(G,"toneMappingExposure",x.toneMappingExposure),Xt.needsLights&&Yu(Ei,bo),dt&&W.fog===!0&&ut.refreshFogUniforms(Ei,dt),ut.refreshMaterialUniforms(Ei,W,q,B,Mt),Zr.upload(G,_c(Xt),Ei,C)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Zr.upload(G,_c(Xt),Ei,C),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ge.setValue(G,"center",H.center),Ge.setValue(G,"modelViewMatrix",H.modelViewMatrix),Ge.setValue(G,"normalMatrix",H.normalMatrix),Ge.setValue(G,"modelMatrix",H.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Sn=W.uniformsGroups;for(let Ro=0,Ku=Sn.length;Ro<Ku;Ro++)if(Pt.isWebGL2){const Mc=Sn[Ro];Jt.update(Mc,yi),Jt.bind(Mc,yi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return yi}function Yu(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function Zu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,N,V){Ot.get(A.texture).__webglTexture=N,Ot.get(A.depthTexture).__webglTexture=V;const W=Ot.get(A);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,N){const V=Ot.get(A);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(A,N=0,V=0){E=A,T=N,b=V;let W=!0,H=null,dt=!1,St=!1;if(A){const It=Ot.get(A);It.__useDefaultFramebuffer!==void 0?(_t.bindFramebuffer(G.FRAMEBUFFER,null),W=!1):It.__webglFramebuffer===void 0?C.setupRenderTarget(A):It.__hasExternalTextures&&C.rebindTextures(A,Ot.get(A.texture).__webglTexture,Ot.get(A.depthTexture).__webglTexture);const Vt=A.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(St=!0);const kt=Ot.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(kt[N])?H=kt[N][V]:H=kt[N],dt=!0):Pt.isWebGL2&&A.samples>0&&C.useMultisampledRTT(A)===!1?H=Ot.get(A).__webglMultisampledFramebuffer:Array.isArray(kt)?H=kt[V]:H=kt,w.copy(A.viewport),U.copy(A.scissor),k=A.scissorTest}else w.copy($).multiplyScalar(q).floor(),U.copy(nt).multiplyScalar(q).floor(),k=it;if(_t.bindFramebuffer(G.FRAMEBUFFER,H)&&Pt.drawBuffers&&W&&_t.drawBuffers(A,H),_t.viewport(w),_t.scissor(U),_t.setScissorTest(k),dt){const It=Ot.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+N,It.__webglTexture,V)}else if(St){const It=Ot.get(A.texture),Vt=N||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,It.__webglTexture,V||0,Vt)}I=-1},this.readRenderTargetPixels=function(A,N,V,W,H,dt,St){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=Ot.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&St!==void 0&&(At=At[St]),At){_t.bindFramebuffer(G.FRAMEBUFFER,At);try{const It=A.texture,Vt=It.format,kt=It.type;if(Vt!==In&&mt.convert(Vt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ft=kt===sr&&(wt.has("EXT_color_buffer_half_float")||Pt.isWebGL2&&wt.has("EXT_color_buffer_float"));if(kt!==pi&&mt.convert(kt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(kt===ci&&(Pt.isWebGL2||wt.has("OES_texture_float")||wt.has("WEBGL_color_buffer_float")))&&!Ft){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-W&&V>=0&&V<=A.height-H&&G.readPixels(N,V,W,H,mt.convert(Vt),mt.convert(kt),dt)}finally{const It=E!==null?Ot.get(E).__webglFramebuffer:null;_t.bindFramebuffer(G.FRAMEBUFFER,It)}}},this.copyFramebufferToTexture=function(A,N,V=0){const W=Math.pow(2,-V),H=Math.floor(N.image.width*W),dt=Math.floor(N.image.height*W);C.setTexture2D(N,0),G.copyTexSubImage2D(G.TEXTURE_2D,V,0,0,A.x,A.y,H,dt),_t.unbindTexture()},this.copyTextureToTexture=function(A,N,V,W=0){const H=N.image.width,dt=N.image.height,St=mt.convert(V.format),At=mt.convert(V.type);C.setTexture2D(V,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,V.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,V.unpackAlignment),N.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,W,A.x,A.y,H,dt,St,At,N.image.data):N.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,W,A.x,A.y,N.mipmaps[0].width,N.mipmaps[0].height,St,N.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,W,A.x,A.y,St,At,N.image),W===0&&V.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),_t.unbindTexture()},this.copyTextureToTexture3D=function(A,N,V,W,H=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const dt=A.max.x-A.min.x+1,St=A.max.y-A.min.y+1,At=A.max.z-A.min.z+1,It=mt.convert(W.format),Vt=mt.convert(W.type);let kt;if(W.isData3DTexture)C.setTexture3D(W,0),kt=G.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)C.setTexture2DArray(W,0),kt=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,W.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,W.unpackAlignment);const Ft=G.getParameter(G.UNPACK_ROW_LENGTH),Se=G.getParameter(G.UNPACK_IMAGE_HEIGHT),ln=G.getParameter(G.UNPACK_SKIP_PIXELS),Ie=G.getParameter(G.UNPACK_SKIP_ROWS),zn=G.getParameter(G.UNPACK_SKIP_IMAGES),pe=V.isCompressedTexture?V.mipmaps[H]:V.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,pe.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,pe.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,A.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,A.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,A.min.z),V.isDataTexture||V.isData3DTexture?G.texSubImage3D(kt,H,N.x,N.y,N.z,dt,St,At,It,Vt,pe.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(kt,H,N.x,N.y,N.z,dt,St,At,It,pe.data)):G.texSubImage3D(kt,H,N.x,N.y,N.z,dt,St,At,It,Vt,pe),G.pixelStorei(G.UNPACK_ROW_LENGTH,Ft),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Se),G.pixelStorei(G.UNPACK_SKIP_PIXELS,ln),G.pixelStorei(G.UNPACK_SKIP_ROWS,Ie),G.pixelStorei(G.UNPACK_SKIP_IMAGES,zn),H===0&&W.generateMipmaps&&G.generateMipmap(kt),_t.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),_t.unbindTexture()},this.resetState=function(){T=0,b=0,E=null,_t.reset(),Bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===za?"display-p3":"srgb",e.unpackColorSpace=ne.workingColorSpace===mo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ke?Bi:yh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Bi?ke:Jn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class m_ extends Xh{}m_.prototype.isWebGL1Renderer=!0;class qa{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Kt(t),this.near=e,this.far=n}clone(){return new qa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class g_ extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class __{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Sa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ze=new P;class ro{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix4(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.applyNormalMatrix(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.transformDirection(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=kn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=kn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=kn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=kn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),n=ee(n,this.array),i=ee(i,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new Dn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ro(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ya extends Os{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ls;const Hs=new P,hs=new P,us=new P,ds=new Ct,Vs=new Ct,qh=new ye,Hr=new P,Ws=new P,Vr=new P,Gl=new Ct,sa=new Ct,zl=new Ct;class Yh extends Ue{constructor(t=new Ya){if(super(),this.isSprite=!0,this.type="Sprite",ls===void 0){ls=new cn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new __(e,5);ls.setIndex([0,1,2,0,2,3]),ls.setAttribute("position",new ro(n,3,0,!1)),ls.setAttribute("uv",new ro(n,2,3,!1))}this.geometry=ls,this.material=t,this.center=new Ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hs.setFromMatrixScale(this.matrixWorld),qh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),us.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hs.multiplyScalar(-us.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;Wr(Hr.set(-.5,-.5,0),us,a,hs,i,s),Wr(Ws.set(.5,-.5,0),us,a,hs,i,s),Wr(Vr.set(.5,.5,0),us,a,hs,i,s),Gl.set(0,0),sa.set(1,0),zl.set(1,1);let o=t.ray.intersectTriangle(Hr,Ws,Vr,!1,Hs);if(o===null&&(Wr(Ws.set(-.5,.5,0),us,a,hs,i,s),sa.set(0,1),o=t.ray.intersectTriangle(Hr,Vr,Ws,!1,Hs),o===null))return;const c=t.ray.origin.distanceTo(Hs);c<t.near||c>t.far||e.push({distance:c,point:Hs.clone(),uv:En.getInterpolation(Hs,Hr,Ws,Vr,Gl,sa,zl,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Wr(r,t,e,n,i,s){ds.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Vs.x=s*ds.x-i*ds.y,Vs.y=i*ds.x+s*ds.y):Vs.copy(ds),r.copy(t),r.x+=Vs.x,r.y+=Vs.y,r.applyMatrix4(qh)}class xo extends en{constructor(t,e,n,i,s,a,o,c,l){super(t,e,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Za extends cn{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const s=[],a=[],o=[],c=[],l=new P,h=new Ct;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(o,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Za(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class rt extends cn{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let _=0;const g=[],m=n/2;let p=0;v(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new he(u,3)),this.setAttribute("normal",new he(d,3)),this.setAttribute("uv",new he(f,2));function v(){const S=new P,T=new P;let b=0;const E=(e-t)/n;for(let I=0;I<=s;I++){const M=[],w=I/s,U=w*(e-t)+t;for(let k=0;k<=i;k++){const Y=k/i,L=Y*c+o,O=Math.sin(L),B=Math.cos(L);T.x=U*O,T.y=-w*n+m,T.z=U*B,u.push(T.x,T.y,T.z),S.set(O,E,B).normalize(),d.push(S.x,S.y,S.z),f.push(Y,1-w),M.push(_++)}g.push(M)}for(let I=0;I<i;I++)for(let M=0;M<s;M++){const w=g[M][I],U=g[M+1][I],k=g[M+1][I+1],Y=g[M][I+1];h.push(w,U,Y),h.push(U,k,Y),b+=6}l.addGroup(p,b,0),p+=b}function x(S){const T=_,b=new Ct,E=new P;let I=0;const M=S===!0?t:e,w=S===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,m*w,0),d.push(0,w,0),f.push(.5,.5),_++;const U=_;for(let k=0;k<=i;k++){const L=k/i*c+o,O=Math.cos(L),B=Math.sin(L);E.x=M*B,E.y=m*w,E.z=M*O,u.push(E.x,E.y,E.z),d.push(0,w,0),b.x=O*.5+.5,b.y=B*.5*w+.5,f.push(b.x,b.y),_++}for(let k=0;k<i;k++){const Y=T+k,L=U+k;S===!0?h.push(L,L+1,Y):h.push(L+1,L,Y),I+=3}l.addGroup(p,I,S===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fe extends rt{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Fe(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ka extends cn{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],a=[];o(i),l(n),h(),this.setAttribute("position",new he(s,3)),this.setAttribute("normal",new he(s.slice(),3)),this.setAttribute("uv",new he(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const x=new P,S=new P,T=new P;for(let b=0;b<e.length;b+=3)f(e[b+0],x),f(e[b+1],S),f(e[b+2],T),c(x,S,T,v)}function c(v,x,S,T){const b=T+1,E=[];for(let I=0;I<=b;I++){E[I]=[];const M=v.clone().lerp(S,I/b),w=x.clone().lerp(S,I/b),U=b-I;for(let k=0;k<=U;k++)k===0&&I===b?E[I][k]=M:E[I][k]=M.clone().lerp(w,k/U)}for(let I=0;I<b;I++)for(let M=0;M<2*(b-I)-1;M++){const w=Math.floor(M/2);M%2===0?(d(E[I][w+1]),d(E[I+1][w]),d(E[I][w])):(d(E[I][w+1]),d(E[I+1][w+1]),d(E[I+1][w]))}}function l(v){const x=new P;for(let S=0;S<s.length;S+=3)x.x=s[S+0],x.y=s[S+1],x.z=s[S+2],x.normalize().multiplyScalar(v),s[S+0]=x.x,s[S+1]=x.y,s[S+2]=x.z}function h(){const v=new P;for(let x=0;x<s.length;x+=3){v.x=s[x+0],v.y=s[x+1],v.z=s[x+2];const S=m(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;a.push(S,1-T)}_(),u()}function u(){for(let v=0;v<a.length;v+=6){const x=a[v+0],S=a[v+2],T=a[v+4],b=Math.max(x,S,T),E=Math.min(x,S,T);b>.9&&E<.1&&(x<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),T<.2&&(a[v+4]+=1))}}function d(v){s.push(v.x,v.y,v.z)}function f(v,x){const S=v*3;x.x=t[S+0],x.y=t[S+1],x.z=t[S+2]}function _(){const v=new P,x=new P,S=new P,T=new P,b=new Ct,E=new Ct,I=new Ct;for(let M=0,w=0;M<s.length;M+=9,w+=6){v.set(s[M+0],s[M+1],s[M+2]),x.set(s[M+3],s[M+4],s[M+5]),S.set(s[M+6],s[M+7],s[M+8]),b.set(a[w+0],a[w+1]),E.set(a[w+2],a[w+3]),I.set(a[w+4],a[w+5]),T.copy(v).add(x).add(S).divideScalar(3);const U=m(T);g(b,w+0,v,U),g(E,w+2,x,U),g(I,w+4,S,U)}}function g(v,x,S,T){T<0&&v.x===1&&(a[x]=v.x-1),S.x===0&&S.z===0&&(a[x]=T/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ka(t.vertices,t.indices,t.radius,t.details)}}class Qs extends Ka{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Qs(t.radius,t.detail)}}class vo extends cn{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],h=[];let u=t;const d=(e-t)/i,f=new P,_=new Ct;for(let g=0;g<=i;g++){for(let m=0;m<=n;m++){const p=s+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),_.x=(f.x/e+1)/2,_.y=(f.y/e+1)/2,h.push(_.x,_.y)}u+=d}for(let g=0;g<i;g++){const m=g*(n+1);for(let p=0;p<n;p++){const v=p+m,x=v,S=v+n+1,T=v+n+2,b=v+1;o.push(x,S,b),o.push(S,T,b)}}this.setIndex(o),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class bt extends cn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new P,d=new P,f=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const v=[],x=p/n;let S=0;p===0&&a===0?S=.5/e:p===n&&c===Math.PI&&(S=-.5/e);for(let T=0;T<=e;T++){const b=T/e;u.x=-t*Math.cos(i+b*s)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(i+b*s)*Math.sin(a+x*o),_.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),m.push(b+S,1-x),v.push(l++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const x=h[p][v+1],S=h[p][v],T=h[p+1][v],b=h[p+1][v+1];(p!==0||a>0)&&f.push(x,S,b),(p!==n-1||c<Math.PI)&&f.push(S,T,b)}this.setIndex(f),this.setAttribute("position",new he(_,3)),this.setAttribute("normal",new he(g,3)),this.setAttribute("uv",new he(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Mo extends cn{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let _=0;_<=i;_++){const g=_/i*s,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(g),u.y=(t+e*Math.cos(m))*Math.sin(g),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(_/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let _=1;_<=i;_++){const g=(i+1)*f+_-1,m=(i+1)*(f-1)+_-1,p=(i+1)*(f-1)+_,v=(i+1)*f+_;a.push(g,m,v),a.push(m,p,v)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class F extends Os{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eh,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class So extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class x_ extends So{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ra=new ye,Hl=new P,Vl=new P;class Zh{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wa,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hl),Vl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vl),e.updateMatrixWorld(),ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Wl=new ye,Xs=new P,oa=new P;class v_ extends Zh{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new de(2,1,1,1),new de(0,1,1,1),new de(3,1,1,1),new de(1,1,1,1),new de(3,0,1,1),new de(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Xs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Xs),oa.copy(n.position),oa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(oa),n.updateMatrixWorld(),i.makeTranslation(-Xs.x,-Xs.y,-Xs.z),Wl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl)}}class M_ extends So{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new v_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class S_ extends Zh{constructor(){super(new Fh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class w_ extends So{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new S_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class y_ extends So{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class E_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Xl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Xl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Xl(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ba}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ba);class T_{constructor(t="game-container"){this.container=document.getElementById(t),this.scene=new g_,this.scene.background=new Kt(7395071),this.scene.fog=new qa(7395071,40,75);const e=window.innerWidth/window.innerHeight;this.camera=new fn(42,e,.1,1e3),this.cameraOffset=new P(14,18,14),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new Xh({antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=fh,this.container.appendChild(this.renderer.domElement),this.setupLights(),window.addEventListener("resize",()=>this.onWindowResize())}setupLights(){const t=new y_(16777215,.75);this.scene.add(t);const e=new x_(7395071,3069299,.45);e.position.set(0,40,0),this.scene.add(e);const n=new w_(16775912,1.15);n.position.set(22,32,16),n.castShadow=!0,n.shadow.mapSize.width=1024,n.shadow.mapSize.height=1024,n.shadow.camera.near=.5,n.shadow.camera.far=85;const i=26;n.shadow.camera.left=-i,n.shadow.camera.right=i,n.shadow.camera.top=i,n.shadow.camera.bottom=-i,n.shadow.bias=-5e-4,this.scene.add(n),this.sunLight=n}followTarget(t,e=.1){const n=t.clone().add(this.cameraOffset);this.camera.position.lerp(n,e*6),this.camera.lookAt(t.x,t.y+.5,t.z)}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}render(){this.renderer.render(this.scene,this.camera)}}class b_{constructor(){this.moveVector=new Ct(0,0),this.keys={},this.isJoystickActive=!1,this.touchStartPos={x:0,y:0},this.setupKeyboard(),this.setupVirtualJoystick()}setupKeyboard(){window.addEventListener("keydown",t=>{this.keys[t.code]=!0}),window.addEventListener("keyup",t=>{this.keys[t.code]=!1})}setupVirtualJoystick(){const t=document.getElementById("joystick-zone"),e=document.getElementById("joystick-thumb");if(!t||!e)return;const n=45,i=(o,c)=>{this.isJoystickActive=!0;const l=t.getBoundingClientRect();this.touchStartPos={x:l.left+l.width/2,y:l.top+l.height/2},s(o,c)},s=(o,c)=>{if(!this.isJoystickActive)return;const l=o-this.touchStartPos.x,h=c-this.touchStartPos.y,u=Math.hypot(l,h),d=Math.atan2(h,l),f=Math.min(u,n),_=Math.cos(d)*f,g=Math.sin(d)*f;e.style.transform=`translate(calc(-50% + ${_}px), calc(-50% + ${g}px))`,this.moveVector.set(_/n,g/n)},a=()=>{this.isJoystickActive=!1,e.style.transform="translate(-50%, -50%)",this.moveVector.set(0,0)};t.addEventListener("touchstart",o=>{const c=o.touches[0];i(c.clientX,c.clientY)},{passive:!1}),window.addEventListener("touchmove",o=>{if(this.isJoystickActive){const c=o.touches[0];s(c.clientX,c.clientY)}},{passive:!1}),window.addEventListener("touchend",a),window.addEventListener("touchcancel",a),t.addEventListener("mousedown",o=>i(o.clientX,o.clientY)),window.addEventListener("mousemove",o=>{this.isJoystickActive&&s(o.clientX,o.clientY)}),window.addEventListener("mouseup",a)}getMovementVector(){let t=0,e=0;(this.keys.KeyW||this.keys.ArrowUp)&&(e-=1),(this.keys.KeyS||this.keys.ArrowDown)&&(e+=1),(this.keys.KeyA||this.keys.ArrowLeft)&&(t-=1),(this.keys.KeyD||this.keys.ArrowRight)&&(t+=1);let n=new Ct(t,e);if(n.lengthSq()>0?n.normalize():this.isJoystickActive&&n.copy(this.moveVector),n.lengthSq()===0)return new P(0,0,0);const i=-Math.PI/4,s=n.x*Math.cos(i)-n.y*Math.sin(i),a=n.x*Math.sin(i)+n.y*Math.cos(i);return new P(s,0,a).normalize().multiplyScalar(Math.min(n.length(),1))}}const gt={TOMATO:{id:"TOMATO",nameKey:"item_tomato",name:"Domates",price:3,color:16729943,size:[.35,.35,.35],icon:"🍅"},TOMATO_PASTE:{id:"TOMATO_PASTE",nameKey:"item_tomato_paste",name:"Salça Kavanozu",price:12,color:15412998,accentColor:16760904,size:[.32,.45,.32],icon:"🥫"},ORANGE:{id:"ORANGE",nameKey:"item_orange",name:"Portakal",price:4,color:16752410,size:[.35,.35,.35],icon:"🍊"},ORANGE_JUICE:{id:"ORANGE_JUICE",nameKey:"item_orange_juice",name:"Taze Portakal Suyu",price:16,color:16753922,accentColor:53971,size:[.3,.5,.3],icon:"🧃"},CORN:{id:"CORN",nameKey:"item_corn",name:"Taze Mısır",price:5,color:16760904,size:[.3,.45,.3],icon:"🌽"},POPCORN:{id:"POPCORN",nameKey:"item_popcorn",name:"Sıcak Popcorn",price:20,color:16773749,accentColor:16729943,size:[.35,.4,.35],icon:"🍿"},CHICKEN_FEED:{id:"CHICKEN_FEED",nameKey:"item_chicken_feed",name:"Tavuk Yemi Çuvalı",price:8,color:15844367,accentColor:9268835,size:[.32,.42,.32],icon:"🌾"},EGG:{id:"EGG",nameKey:"item_egg",name:"Çiftlik Yumurtası",price:18,color:16777215,accentColor:16753922,size:[.28,.35,.28],icon:"🥚"},WHEAT:{id:"WHEAT",nameKey:"item_wheat",name:"Altın Buğday",price:4,color:16767609,accentColor:16752410,size:[.3,.45,.3],icon:"🌾"},BREAD:{id:"BREAD",nameKey:"item_bread",name:"Taş Fırın Ekmek",price:24,color:15044134,accentColor:16302737,size:[.4,.3,.35],icon:"🍞"},BURGER:{id:"BURGER",nameKey:"item_burger",name:"Gurme Burger",price:75,color:16752451,accentColor:3069299,size:[.45,.4,.45],icon:"🍔"},PIZZA:{id:"PIZZA",nameKey:"item_pizza",name:"İtalyan Pizza",price:90,color:16729943,accentColor:16760904,size:[.5,.15,.5],icon:"🍕"}},ue={PLAYER:{speed:7.5,baseStackCapacity:6,turnSpeed:14},FARM:{growTime:2.2},PROCESSING:{tomatoPasteTime:3,inputRequired:2,orangeJuiceTime:3.5,orangeInputRequired:2,popcornTime:2.5,popcornInputRequired:1,feedTime:2.2,feedInputRequired:1,breadTime:4,burgerTime:4.5,pizzaTime:5},CUSTOMER:{spawnInterval:4,maxActive:8,walkSpeed:3.6,payTime:1.4},COLORS:{FLOOR_STORE:16777215,FLOOR_FARM:1092740,FLOOR_RESTAURANT:7162945,WALLS:3094080,REGISTER:3696598}};class A_{constructor(t){this.scene=t,this.animatedTrees=[]}createOakTree(t,e,n=1){const i=new ft;i.position.set(t,0,e),i.scale.set(n,n,n);const s=new rt(.18,.28,1.4,6),a=new F({color:7951688,roughness:.9}),o=new R(s,a);o.position.y=.7,o.castShadow=!0,i.add(o);const c=new F({color:3069299,roughness:.5,flatShading:!0}),l=new F({color:1092740,roughness:.5,flatShading:!0}),h=new R(new Qs(.9,1),c);h.position.y=1.8,h.castShadow=!0;const u=new R(new Qs(.75,1),l);u.position.set(.2,2.3,.1),u.castShadow=!0;const d=new R(new Qs(.6,1),c);return d.position.set(-.25,2,-.2),d.castShadow=!0,i.add(h,u,d),this.scene.add(i),this.animatedTrees.push(i),i}createPineTree(t,e,n=1){const i=new ft;i.position.set(t,0,e),i.scale.set(n,n,n);const s=new rt(.15,.22,1,6),a=new F({color:6111287,roughness:.9}),o=new R(s,a);o.position.y=.5,o.castShadow=!0,i.add(o);const c=new F({color:37938,roughness:.5,flatShading:!0}),l=new R(new Fe(1.1,1.2,6),c);l.position.y=1.4,l.castShadow=!0;const h=new R(new Fe(.85,1,6),c);h.position.y=2.1,h.castShadow=!0;const u=new R(new Fe(.55,.8,6),c);return u.position.y=2.7,u.castShadow=!0,i.add(l,h,u),this.scene.add(i),this.animatedTrees.push(i),i}createHedge(t,e,n=3,i=.8,s=.6){const a=new st(n,i,s),o=new F({color:1092740,roughness:.7,flatShading:!0}),c=new R(a,o);return c.position.set(t,i/2,e),c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),c}createStoreAwning(t,e,n,i=8,s=1.8){const a=new ft;a.position.set(t,e,n);const o=10,c=i/o;for(let d=0;d<o;d++){const _=d%2===0?16729943:16777215,g=new F({color:_,roughness:.3}),m=new st(c*.96,.12,s),p=new R(m,g);p.position.set((d-o/2+.5)*c,0,s/2),p.rotation.x=.35,p.castShadow=!0,a.add(p);const v=new st(c*.96,.25,.08),x=new R(v,g);x.position.set((d-o/2+.5)*c,-.15-s*.32,s*.9),a.add(x)}const l=new F({color:3094080,metalness:.7}),h=new R(new rt(.04,.04,1.4),l);h.position.set(-i/2+.2,-.4,s*.6),h.rotation.x=-.7;const u=h.clone();return u.position.x=i/2-.2,a.add(h,u),this.scene.add(a),a}createStoreSign(t,e,n){const i=new ft;i.position.set(t,e,n);const s=new st(5.2,1.1,.3),a=new F({color:1976110,roughness:.3}),o=new R(s,a);o.castShadow=!0,i.add(o);const c=new st(5.4,1.25,.2),l=new F({color:16760904,metalness:.85,roughness:.15}),h=new R(c,l);i.add(h);const u=document.createElement("canvas");u.width=512,u.height=128;const d=u.getContext("2d");d.fillStyle="#1e272e",d.fillRect(0,0,512,128),d.fillStyle="#ffc048",d.font='bold 52px "Fredoka", sans-serif',d.textAlign="center",d.textBaseline="middle",d.fillText("🛒 MINI MART",256,64);const f=new xo(u),_=new Qt({map:f}),g=new R(new Ae(4.8,.9),_);return g.position.z=.16,i.add(g),this.scene.add(i),i}createCar(t,e,n=0,i=15158332){const s=new ft;s.position.set(t,0,e),s.rotation.y=n;const a=new F({color:i,roughness:.2,metalness:.3}),o=new st(2.2,.6,1.2),c=new R(o,a);c.position.y=.45,c.castShadow=!0,c.receiveShadow=!0,s.add(c);const l=new F({color:3426654,roughness:.1}),h=new st(1.2,.55,1.05),u=new R(h,l);u.position.set(-.15,.95,0),u.castShadow=!0,s.add(u);const d=new F({color:8514796,roughness:.1,metalness:.8}),f=new Ae(.9,.4),_=new R(f,d);_.rotation.y=Math.PI/2,_.position.set(.46,.92,0),s.add(_);const g=new Qt({color:16775781}),m=new R(new st(.08,.14,.2),g);m.position.set(1.11,.48,.38);const p=m.clone();p.position.z=-.38,s.add(m,p);const v=new Qt({color:16726072}),x=new R(new st(.08,.12,.18),v);x.position.set(-1.11,.52,.4);const S=x.clone();S.position.z=-.4,s.add(x,S);const T=new rt(.24,.24,.16,12),b=new F({color:1976110,roughness:.8}),E=new F({color:14474721,metalness:.8});return[{x:.65,z:.6},{x:-.65,z:.6},{x:.65,z:-.6},{x:-.65,z:-.6}].forEach(M=>{const w=new R(T,b);w.rotation.x=Math.PI/2,w.position.set(M.x,.24,M.z),w.castShadow=!0;const U=new R(new rt(.12,.12,.17,8),E);U.rotation.x=Math.PI/2,U.position.set(M.x,.24,M.z),s.add(w,U)}),this.scene.add(s),s}createStreetLamp(t,e){const n=new ft;n.position.set(t,0,e);const i=new rt(.08,.12,3.2,8),s=new F({color:2899536,metalness:.8}),a=new R(i,s);a.position.y=1.6,a.castShadow=!0,n.add(a);const o=new st(.45,.35,.45),c=new F({color:1713455,metalness:.9}),l=new R(o,c);l.position.set(.2,3.2,0),n.add(l);const h=new R(new bt(.16,8,8),new Qt({color:16775781}));h.position.set(.2,3.05,0),n.add(h);const u=new M_(16775781,.6,6);return u.position.set(.2,3,0),n.add(u),this.scene.add(n),n}createWoodenFence(t,e,n=6,i=0){const s=new ft;s.position.set(t,0,e),s.rotation.y=i;const a=new F({color:9268835,roughness:.8}),o=Math.floor(n/1.5)+1;for(let h=0;h<o;h++){const u=new R(new st(.12,.75,.12),a);u.position.set((h-(o-1)/2)*1.5,.375,0),u.castShadow=!0,s.add(u)}const c=new R(new st(n,.08,.06),a);c.position.set(0,.5,0),c.castShadow=!0;const l=c.clone();return l.position.y=.25,s.add(c,l),this.scene.add(s),s}update(t,e){const n=Math.sin(e*1.5)*.03;this.animatedTrees.forEach((i,s)=>{i.rotation.z=n*(s%2===0?1:-.8)})}}class R_{constructor(t){this.scene=t,this.obstacles=[],this.props=new A_(t),this.buildEnvironment()}buildEnvironment(){const t=new Ae(160,100),e=new F({color:3069299,roughness:.75}),n=new R(t,e);n.rotation.x=-Math.PI/2,n.position.set(-15,-.06,0),n.receiveShadow=!0,this.scene.add(n);const i=new Ae(80,18),s=new F({color:3094080,roughness:.6}),a=new R(i,s);a.rotation.x=-Math.PI/2,a.position.set(-10,-.04,19),a.receiveShadow=!0,this.scene.add(a);const o=new Qt({color:16777215});[-24,-17,-10,-3,4,11,18].forEach(S=>{const T=new R(new Ae(.2,5),o);T.rotation.x=-Math.PI/2,T.position.set(S,-.03,16),this.scene.add(T)});const c=new Ae(74,2.2),l=new F({color:15856374,roughness:.4}),h=new R(c,l);h.rotation.x=-Math.PI/2,h.position.set(-17,-.02,10),h.receiveShadow=!0,this.scene.add(h);const u=new Ae(18,18),d=new F({color:ue.COLORS.FLOOR_STORE,roughness:.2,metalness:.05}),f=new R(u,d);f.rotation.x=-Math.PI/2,f.position.set(5,0,0),f.receiveShadow=!0,this.scene.add(f);const _=new Ae(22,18),g=new F({color:ue.COLORS.FLOOR_FARM,roughness:.8}),m=new R(_,g);m.rotation.x=-Math.PI/2,m.position.set(-15,0,0),m.receiveShadow=!0,this.scene.add(m);const p=new Ae(22,18),v=new F({color:ue.COLORS.FLOOR_RESTAURANT,roughness:.3}),x=new R(p,v);x.rotation.x=-Math.PI/2,x.position.set(-37,0,0),x.receiveShadow=!0,this.scene.add(x),this.createPath(-4,0,2,18),this.createPath(-26,0,2,18),this.createStoreWalls(),this.createRestaurantWalls(),this.props.createStoreAwning(5,2.3,9.1,10,1.8),this.props.createStoreSign(5,3.4,9),this.props.createStoreAwning(-37,2.3,9.1,12,1.8),this.createRestaurantSign(-37,3.4,9),this.props.createCar(4,16.5,-Math.PI/2,16729943),this.props.createCar(11,16.5,-Math.PI/2,16753922),this.props.createCar(-10,16.5,-Math.PI/2,2003199),this.props.createCar(-24,16.5,-Math.PI/2,10837738),this.props.createStreetLamp(14,10.5),this.props.createStreetLamp(-4,10.5),this.props.createStreetLamp(-26,10.5),this.props.createStreetLamp(-47,10.5),this.props.createWoodenFence(-15,9,22,0),this.props.createWoodenFence(-15,-9,22,0),this.registerObstacle(-15,9,22,.4),this.registerObstacle(-15,-9,22,.4),this.props.createOakTree(-52,4,1.3),this.props.createOakTree(-51,-6,1.2),this.props.createOakTree(-8,-14,1.1),this.props.createOakTree(2,-14,1.2),this.props.createOakTree(12,-14,1),this.props.createPineTree(17,-5,1.1),this.props.createPineTree(18,4,1.2),this.props.createPineTree(-30,-14,1.2),this.props.createPineTree(-42,-14,1.1)}createPath(t,e,n,i){const s=new Ae(n,i),a=new F({color:15528177,roughness:.6}),o=new R(s,a);o.rotation.x=-Math.PI/2,o.position.set(t,.005,e),o.receiveShadow=!0,this.scene.add(o)}createStoreWalls(){const t=new F({color:ue.COLORS.WALLS,roughness:.4}),e=1.1,n=.4;this.addWall(5,-9,18,e,n,t),this.addWall(11.5,9,5,e,n,t),this.addWall(-1.5,9,5,e,n,t),this.addWall(14,0,n,e,18,t)}createRestaurantWalls(){const t=new F({color:2899536,roughness:.3}),e=1.1,n=.4;this.addWall(-37,-9,22,e,n,t),this.addWall(-45,9,6,e,n,t),this.addWall(-29,9,6,e,n,t),this.addWall(-48,0,n,e,18,t)}createRestaurantSign(t,e,n){const i=new ft;i.position.set(t,e,n);const s=new st(6.2,1.1,.3),a=new F({color:4073251,roughness:.3}),o=new R(s,a);o.castShadow=!0,i.add(o);const c=new st(6.4,1.25,.2),l=new F({color:15844367,metalness:.8});i.add(new R(c,l));const h=document.createElement("canvas");h.width=512,h.height=128;const u=h.getContext("2d");u.fillStyle="#3e2723",u.fillRect(0,0,512,128),u.fillStyle="#f1c40f",u.font='bold 44px "Fredoka", sans-serif',u.textAlign="center",u.textBaseline="middle",u.fillText("🍕 GOURMET BISTRO",256,64);const d=new xo(h),f=new Qt({map:d}),_=new R(new Ae(5.8,.9),f);_.position.z=.16,i.add(_),this.scene.add(i)}addWall(t,e,n,i,s,a){const o=new st(n,i,s),c=new R(o,a);c.position.set(t,i/2,e),c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),this.registerObstacle(t,e,n,s)}registerObstacle(t,e,n,i){this.obstacles.push({min:{x:t-n/2,z:e-i/2},max:{x:t+n/2,z:e+i/2}})}getObstacles(){return this.obstacles}update(t,e){this.props&&this.props.update(t,e)}}class $a{constructor(t,e=6){this.parentMesh=t,this.maxCapacity=e,this.items=[],this.wobbleAngle=0,this.itemSpacing=.42,this.group=new ft,this.group.position.set(0,.8,-.35),this.parentMesh.add(this.group)}attachToParent(t){this.parentMesh&&this.group&&this.parentMesh.remove(this.group),this.parentMesh=t,this.parentMesh&&this.group&&this.parentMesh.add(this.group)}canAdd(){return this.items.length<this.maxCapacity}getCount(){return this.items.length}addItem(t){if(!this.canAdd())return!1;const e=this.createItemMesh(t),n=this.items.length;e.position.set(0,n*this.itemSpacing,0),e.scale.set(.1,.1,.1),this.group.add(e),this.items.push({type:t,mesh:e});let i=0;const s=()=>{i+=.15;const a=1+Math.sin(i*Math.PI)*.3;e.scale.set(a,a,a),i<1?requestAnimationFrame(s):e.scale.set(1,1,1)};return s(),!0}popItem(t=null){if(this.items.length===0)return null;if(!t){const n=this.items.pop();return this.group.remove(n.mesh),n.type}const e=this.items.findIndex(n=>n.type.id===t.id);if(e!==-1){const[n]=this.items.splice(e,1);return this.group.remove(n.mesh),this.repositionItems(),n.type}return null}repositionItems(){this.items.forEach((t,e)=>{t.mesh.position.y=e*this.itemSpacing})}createItemMesh(t){const e=new ft;if(t.id==="TOMATO"){const n=new bt(.2,8,8),i=new F({color:t.color,roughness:.3}),s=new R(n,i);s.castShadow=!0;const a=new rt(.02,.02,.08,5),o=new F({color:2600544}),c=new R(a,o);c.position.y=.18,e.add(s,c)}else if(t.id==="TOMATO_PASTE"){const n=new rt(.18,.18,.35,12),i=new F({color:t.color,roughness:.4}),s=new R(n,i);s.castShadow=!0;const a=new rt(.19,.19,.06,12),o=new F({color:t.accentColor,metalness:.6}),c=new R(a,o);c.position.y=.18,e.add(s,c)}else if(t.id==="ORANGE"){const n=new bt(.2,8,8),i=new F({color:t.color,roughness:.4}),s=new R(n,i);s.castShadow=!0,e.add(s)}else if(t.id==="ORANGE_JUICE"){const n=new rt(.14,.16,.4,10),i=new F({color:t.color,roughness:.2}),s=new R(n,i);s.castShadow=!0;const a=new rt(.08,.08,.08,8),o=new F({color:t.accentColor}),c=new R(a,o);c.position.y=.22,e.add(s,c)}else if(t.id==="CORN"){const n=new rt(.1,.12,.38,6),i=new F({color:t.color,roughness:.3}),s=new R(n,i);s.castShadow=!0;const a=new Fe(.14,.22,4),o=new F({color:2600544}),c=new R(a,o);c.position.y=-.15,e.add(s,c)}else if(t.id==="POPCORN"){const n=new st(.28,.32,.28),i=new F({color:15158332,roughness:.4}),s=new R(n,i);s.castShadow=!0;const a=new R(new bt(.16,8,8),new F({color:16180621}));a.position.y=.16,e.add(s,a)}else if(t.id==="CHICKEN_FEED"){const n=new rt(.16,.18,.36,8),i=new F({color:13937677,roughness:.8}),s=new R(n,i);s.castShadow=!0;const a=new R(new Mo(.14,.03,6,12),new F({color:7951688}));a.rotation.x=Math.PI/2,a.position.y=.14,e.add(s,a)}else if(t.id==="EGG"){const n=new bt(.15,8,8);n.scale(1,1.3,1);const i=new F({color:16316922,roughness:.2}),s=new R(n,i);s.castShadow=!0,e.add(s)}else if(t.id==="WHEAT"){const n=new Fe(.16,.45,6),i=new F({color:15965202,roughness:.6}),s=new R(n,i);s.castShadow=!0,e.add(s)}else if(t.id==="BREAD"){const n=new st(.36,.22,.28),i=new F({color:13459763,roughness:.5}),s=new R(n,i);s.castShadow=!0,e.add(s)}else if(t.id==="BURGER"){const n=new F({color:15105570}),i=new F({color:6111287}),s=new F({color:3066993}),a=new R(new rt(.2,.2,.06,10),n),o=new R(new rt(.21,.21,.05,10),i);o.position.y=.06;const c=new R(new rt(.22,.22,.03,8),s);c.position.y=.1;const l=new R(new bt(.2,10,8,0,Math.PI*2,0,Math.PI/2),n);l.position.y=.12,e.add(a,o,c,l)}else if(t.id==="PIZZA"){const n=new F({color:14037041}),i=new F({color:15844367}),s=new R(new rt(.25,.25,.04,12),i),a=new R(new rt(.22,.22,.05,12),n);a.position.y=.01,e.add(s,a)}else{const n=new st(.35,.35,.35),i=new F({color:t.color}),s=new R(n,i);s.castShadow=!0,e.add(s)}return e}update(t,e){if(e&&this.items.length>0){this.wobbleAngle+=t*9;const n=Math.sin(this.wobbleAngle)*.08;this.group.rotation.z=n,this.group.rotation.x=Math.abs(Math.cos(this.wobbleAngle))*.05}else this.group.rotation.z=Ve.lerp(this.group.rotation.z,0,t*8),this.group.rotation.x=Ve.lerp(this.group.rotation.x,0,t*8)}}class C_{constructor(t){this.scene=t,this.speed=ue.PLAYER.speed,this.radius=.48,this.walkCycle=0,this.characterType=localStorage.getItem("player_character")||"shopkeeper",this.rootGroup=new ft,this.scene.add(this.rootGroup),this.mesh=this.rootGroup,this.characterMesh=null,this.buildCurrentCharacter(),this.stack=new $a(this.rootGroup,ue.PLAYER.baseStackCapacity)}get position(){return this.rootGroup.position}getPosition(){return this.rootGroup.position}setCharacterType(t){this.characterType!==t&&(this.characterType=t,localStorage.setItem("player_character",t),this.buildCurrentCharacter())}buildCurrentCharacter(){this.characterMesh&&this.rootGroup.remove(this.characterMesh),this.leftLeg=null,this.rightLeg=null,this.leftArm=null,this.rightArm=null,this.tailGroup=null,this.earsGroup=null,this.antennaGroup=null,this.wingsGroup=null,this.characterType==="cat"?this.characterMesh=this.createCatMesh():this.characterType==="robot"?this.characterMesh=this.createRobotMesh():this.characterType==="panda"?this.characterMesh=this.createPandaMesh():this.characterType==="penguin"?this.characterMesh=this.createPenguinMesh():this.characterMesh=this.createShopkeeperMesh(),this.rootGroup.add(this.characterMesh)}createShopkeeperMesh(){const t=new ft,e=new rt(.32,.28,.7,10),n=new F({color:3447003,roughness:.5}),i=new R(e,n);i.position.y=.65,i.castShadow=!0,t.add(i);const s=new st(.35,.45,.1),a=new F({color:2600544}),o=new R(s,a);o.position.set(0,.6,.22),t.add(o);const c=new bt(.3,12,10),l=new F({color:16767916,roughness:.6}),h=new R(c,l);h.position.y=1.25,h.castShadow=!0,t.add(h);const u=new rt(.32,.32,.12,10),d=new F({color:15158332}),f=new R(u,d);f.position.y=1.45,f.castShadow=!0;const _=new st(.28,.04,.2),g=new R(_,d);g.position.set(0,1.42,.22),t.add(f,g);const m=new Qt({color:2899536}),p=new R(new bt(.04,6,6),m);p.position.set(-.1,1.28,.26);const v=p.clone();v.position.x=.1,t.add(p,v);const x=new rt(.08,.07,.45,8),S=new F({color:3447003});this.leftArm=new ft,this.leftArm.position.set(-.35,.85,0);const T=new R(x,S);T.position.y=-.2,this.leftArm.add(T),this.rightArm=new ft,this.rightArm.position.set(.35,.85,0);const b=new R(x,S);b.position.y=-.2,this.rightArm.add(b),t.add(this.leftArm,this.rightArm);const E=new rt(.1,.09,.35,8),I=new F({color:2899536});this.leftLeg=new ft,this.leftLeg.position.set(-.16,.35,0);const M=new R(E,I);M.position.y=-.17,M.castShadow=!0,this.leftLeg.add(M),this.rightLeg=new ft,this.rightLeg.position.set(.16,.35,0);const w=new R(E,I);return w.position.y=-.17,w.castShadow=!0,this.rightLeg.add(w),t.add(this.leftLeg,this.rightLeg),t}createCatMesh(){const t=new ft,e=new F({color:15371335,roughness:.6}),n=new F({color:16119290,roughness:.5}),i=new F({color:2054553,roughness:.4}),s=new F({color:15908659,metalness:.7,roughness:.3}),a=new F({color:5844500,roughness:.7}),o=new F({color:8406820,roughness:.8}),c=new F({color:2700109,roughness:.6}),l=new F({color:6370068,roughness:.7}),h=new F({color:14037041,roughness:.5}),u=new F({color:15425914,roughness:.4}),d=new F({color:16756408,roughness:.6}),f=new F({color:2017182,roughness:.1}),_=new Qt({color:1973796}),g=new Qt({color:16777215}),m=new Qt({color:2962486}),p=new R(new st(.38,.18,.28),c);p.position.y=.48,t.add(p);const v=new R(new rt(.24,.24,.08,12),a);v.position.y=.58,t.add(v);const x=new R(new st(.12,.09,.04),s);x.position.set(0,.58,.22),t.add(x);const S=new R(new st(.09,.12,.12),o);S.position.set(.24,.56,-.02),t.add(S);const T=new R(new rt(.25,.22,.42,10),n);T.position.y=.8,T.castShadow=!0,t.add(T);const b=new R(new st(.14,.44,.32),i);b.position.set(-.14,.8,.02);const E=new R(new st(.14,.44,.32),i);E.position.set(.14,.8,.02),t.add(b,E),[-.08,0,.08].forEach(Q=>{const J=new R(new bt(.025,6,6),s);J.position.set(-.06,.8+Q,.16);const tt=J.clone();tt.position.x=.06,t.add(J,tt)});const I=new R(new rt(.24,.22,.08,10),h);I.position.y=1.02,t.add(I);const M=new ft;M.position.set(0,1.26,0);const w=new R(new bt(.29,14,12),e);w.castShadow=!0,M.add(w);const U=new R(new bt(.12,8,8),e);U.position.set(-.24,-.05,.05);const k=U.clone();k.position.x=.24,M.add(U,k);const Y=new R(new bt(.09,8,8),n);Y.position.set(-.06,-.1,.22);const L=Y.clone();L.position.x=.06;const O=new R(new bt(.07,6,6),n);O.position.set(0,-.16,.2),M.add(Y,L,O);const B=new R(new bt(.035,6,6),u);B.position.set(0,-.06,.27),M.add(B);const q=new Fe(.12,.22,4),Z=new Fe(.08,.16,4),K=new R(q,e);K.position.set(-.16,.26,.02),K.rotation.set(.1,-.2,.3);const $=new R(Z,d);$.position.set(-.15,.25,.04),$.rotation.set(.1,-.2,.3);const nt=new R(q,e);nt.position.set(.16,.26,.02),nt.rotation.set(.1,.2,-.3);const it=new R(Z,d);it.position.set(.15,.25,.04),it.rotation.set(.1,.2,-.3),M.add(K,$,nt,it),[-.12,.12].forEach(Q=>{const J=new R(new bt(.075,10,8),f);J.position.set(Q,.02,.24);const tt=new R(new st(.035,.08,.02),_);tt.position.set(Q,.02,.3);const xt=new R(new bt(.02,6,6),g);xt.position.set(Q+.02,.04,.31),M.add(J,tt,xt)});const X=new rt(.008,.008,.18,4);[-1,1].forEach(Q=>{const J=new R(X,m);J.rotation.z=Math.PI/2+Q*.15,J.position.set(Q*.22,-.08,.22);const tt=new R(X,m);tt.rotation.z=Math.PI/2-Q*.15,tt.position.set(Q*.22,-.12,.22),M.add(J,tt)}),t.add(M);const j=new rt(.08,.07,.28,8),ot=new bt(.09,8,8);this.leftArm=new ft,this.leftArm.position.set(-.32,.9,0);const Mt=new R(j,i);Mt.position.y=-.12;const vt=new R(ot,n);vt.position.y=-.28,this.leftArm.add(Mt,vt),this.rightArm=new ft,this.rightArm.position.set(.32,.9,0);const Dt=new R(j,i);Dt.position.y=-.12;const Ut=new R(ot,n);Ut.position.y=-.28,this.rightArm.add(Dt,Ut),t.add(this.leftArm,this.rightArm);const Et=new rt(.09,.08,.2,8),Zt=new rt(.1,.09,.18,8),G=new st(.16,.1,.24);this.leftLeg=new ft,this.leftLeg.position.set(-.16,.38,0);const Pe=new R(Et,c);Pe.position.y=-.08;const wt=new R(Zt,l);wt.position.y=-.2;const Pt=new R(G,l);Pt.position.set(0,-.28,.04),Pt.castShadow=!0,this.leftLeg.add(Pe,wt,Pt),this.rightLeg=new ft,this.rightLeg.position.set(.16,.38,0);const _t=new R(Et,c);_t.position.y=-.08;const re=new R(Zt,l);re.position.y=-.2;const Ot=new R(G,l);Ot.position.set(0,-.28,.04),Ot.castShadow=!0,this.rightLeg.add(_t,re,Ot),t.add(this.leftLeg,this.rightLeg),this.tailGroup=new ft,this.tailGroup.position.set(0,.5,-.16);const C=new R(new rt(.06,.07,.22,8),e);C.position.set(0,.1,-.08),C.rotation.x=-.6;const y=new R(new rt(.05,.06,.24,8),e);y.position.set(0,.24,-.18),y.rotation.x=-1.1;const z=new R(new bt(.07,8,8),n);return z.position.set(0,.36,-.24),this.tailGroup.add(C,y,z),t.add(this.tailGroup),t}createRobotMesh(){const t=new ft,e=new F({color:15462645,metalness:.3,roughness:.3}),n=new F({color:3027778,metalness:.6,roughness:.4}),i=new Qt({color:55807}),s=new Qt({color:16750848}),a=new F({color:15908659,metalness:.8}),o=new R(new st(.42,.16,.28),n);o.position.y=.48,t.add(o);const c=new R(new st(.46,.46,.34),e);c.position.y=.78,c.castShadow=!0,t.add(c);const l=new R(new st(.32,.3,.06),n);l.position.set(0,.78,.18),t.add(l);const h=new R(new rt(.08,.08,.04,12),i);h.rotation.x=Math.PI/2,h.position.set(0,.78,.21),t.add(h);const u=new ft;u.position.set(0,1.25,0);const d=new R(new st(.44,.36,.34),e);d.castShadow=!0,u.add(d);const f=new R(new st(.36,.18,.04),n);f.position.set(0,0,.18),u.add(f),[-.09,.09].forEach(B=>{const q=new R(new st(.06,.06,.02),i);q.position.set(B,0,.2),u.add(q)}),this.antennaGroup=new ft,this.antennaGroup.position.set(.18,.18,0);const _=new R(new rt(.015,.015,.22,6),a);_.position.y=.11;const g=new R(new bt(.035,8,8),s);g.position.y=.22,this.antennaGroup.add(_,g),u.add(this.antennaGroup),t.add(u);const m=new rt(.07,.07,.26,8),p=new st(.08,.1,.09);this.leftArm=new ft,this.leftArm.position.set(-.32,.9,0);const v=new R(new bt(.09,8,8),n),x=new R(m,e);x.position.y=-.12;const S=new R(p,n);S.position.y=-.26,this.leftArm.add(v,x,S),this.rightArm=new ft,this.rightArm.position.set(.32,.9,0);const T=new R(new bt(.09,8,8),n),b=new R(m,e);b.position.y=-.12;const E=new R(p,n);E.position.y=-.26,this.rightArm.add(T,b,E),t.add(this.leftArm,this.rightArm);const I=new rt(.08,.07,.22,8),M=new st(.16,.08,.24);this.leftLeg=new ft,this.leftLeg.position.set(-.16,.38,0);const w=new R(I,e);w.position.y=-.1;const U=new R(M,n);U.position.set(0,-.22,.02),U.castShadow=!0;const k=new R(new rt(.05,.05,.02,8),i);k.position.set(0,-.26,.02),this.leftLeg.add(w,U,k),this.rightLeg=new ft,this.rightLeg.position.set(.16,.38,0);const Y=new R(I,e);Y.position.y=-.1;const L=new R(M,n);L.position.set(0,-.22,.02),L.castShadow=!0;const O=new R(new rt(.05,.05,.02,8),i);return O.position.set(0,-.26,.02),this.rightLeg.add(Y,L,O),t.add(this.leftLeg,this.rightLeg),t}createPandaMesh(){const t=new ft,e=new F({color:16119546,roughness:.7}),n=new F({color:1976110,roughness:.8}),i=new F({color:15158332,roughness:.5}),s=new F({color:2962486,roughness:.6}),a=new R(new bt(.32,14,12),e);a.position.y=.65,a.castShadow=!0,t.add(a);const o=new R(new st(.34,.35,.1),i);o.position.set(0,.6,.26),t.add(o);const c=new ft;c.position.set(0,1.2,0);const l=new R(new bt(.3,14,12),e);l.castShadow=!0,c.add(l),[-.22,.22].forEach(w=>{const U=new R(new bt(.1,8,8),n);U.position.set(w,.24,0),c.add(U)}),[-.11,.11].forEach(w=>{const U=new R(new bt(.08,8,8),n);U.position.set(w,.02,.22);const k=new R(new bt(.03,6,6),new Qt({color:16777215}));k.position.set(w,.02,.28);const Y=new R(new bt(.018,6,6),new Qt({color:0}));Y.position.set(w,.02,.3),c.add(U,k,Y)});const h=new R(new bt(.1,8,8),e);h.position.set(0,-.08,.24);const u=new R(new bt(.04,6,6),s);u.position.set(0,-.05,.32),c.add(h,u);const d=new R(new rt(.24,.24,.08,12),i);d.position.y=.26;const f=new R(new bt(.24,10,8),e);f.position.y=.38,c.add(d,f),t.add(c);const _=new rt(.09,.08,.28,8),g=new bt(.09,8,8);this.leftArm=new ft,this.leftArm.position.set(-.34,.85,0);const m=new R(_,n);m.position.y=-.12;const p=new R(g,e);p.position.y=-.28,this.leftArm.add(m,p),this.rightArm=new ft,this.rightArm.position.set(.34,.85,0);const v=new R(_,n);v.position.y=-.12;const x=new R(g,e);x.position.y=-.28,this.rightArm.add(v,x),t.add(this.leftArm,this.rightArm);const S=new rt(.11,.1,.25,8),T=new st(.18,.1,.26);this.leftLeg=new ft,this.leftLeg.position.set(-.16,.35,0);const b=new R(S,n);b.position.y=-.1;const E=new R(T,n);E.position.set(0,-.22,.04),E.castShadow=!0,this.leftLeg.add(b,E),this.rightLeg=new ft,this.rightLeg.position.set(.16,.35,0);const I=new R(S,n);I.position.y=-.1;const M=new R(T,n);return M.position.set(0,-.22,.04),M.castShadow=!0,this.rightLeg.add(I,M),t.add(this.leftLeg,this.rightLeg),t}createPenguinMesh(){const t=new ft,e=new F({color:1976110,roughness:.5}),n=new F({color:16119546,roughness:.4}),i=new F({color:15844367,roughness:.4}),s=new F({color:15158332,roughness:.4}),a=new F({color:15965202,metalness:.8,roughness:.2}),o=new R(new rt(.28,.32,.7,12),e);o.position.y=.65,o.castShadow=!0,t.add(o);const c=new R(new rt(.24,.27,.66,12),n);c.position.set(0,.65,.08),t.add(c);const l=new R(new st(.14,.07,.05),s);l.position.set(0,.95,.26),t.add(l),[-.08,-.18].forEach(S=>{const T=new R(new bt(.02,6,6),e);T.position.set(0,.8+S,.28),t.add(T)});const h=new ft;h.position.set(0,1.2,0);const u=new R(new bt(.26,12,10),e);u.castShadow=!0,h.add(u);const d=new R(new Fe(.09,.18,4),i);d.rotation.x=Math.PI/2,d.position.set(0,-.04,.3),h.add(d),[-.1,.1].forEach(S=>{const T=new R(new bt(.06,8,8),new Qt({color:16777215}));T.position.set(S,.05,.22);const b=new R(new bt(.035,6,6),new Qt({color:0}));b.position.set(S,.05,.26),h.add(T,b)});const f=new R(new rt(.16,.16,.06,10),a);f.position.y=.26,h.add(f);for(let S=0;S<5;S++){const T=S/5*Math.PI*2,b=new R(new Fe(.035,.08,4),a);b.position.set(Math.cos(T)*.13,.32,Math.sin(T)*.13),h.add(b)}t.add(h);const _=new st(.08,.45,.2);this.leftArm=new ft,this.leftArm.position.set(-.32,.85,0);const g=new R(_,e);g.position.y=-.18,g.rotation.z=.2,this.leftArm.add(g),this.rightArm=new ft,this.rightArm.position.set(.32,.85,0);const m=new R(_,e);m.position.y=-.18,m.rotation.z=-.2,this.rightArm.add(m),t.add(this.leftArm,this.rightArm);const p=new st(.18,.06,.26);this.leftLeg=new ft,this.leftLeg.position.set(-.14,.16,0);const v=new R(p,i);v.position.set(0,0,.05),v.castShadow=!0,this.leftLeg.add(v),this.rightLeg=new ft,this.rightLeg.position.set(.14,.16,0);const x=new R(p,i);return x.position.set(0,0,.05),x.castShadow=!0,this.rightLeg.add(x),t.add(this.leftLeg,this.rightLeg),t}update(t,e,n=[]){const i=e.lengthSq()>.01;if(i){const s=Math.atan2(e.x,e.z);this.rootGroup.rotation.y=Ve.lerp(this.rootGroup.rotation.y,s,t*ue.PLAYER.turnSpeed);const a=this.speed*t,o=this.radius*.4,c=Math.max(1,Math.ceil(a/o)),l=a/c,h=e.x*l,u=e.z*l;let d=this.rootGroup.position.x,f=this.rootGroup.position.z;for(let v=0;v<c;v++){d+=h,f+=u;const x=this.resolveObstacleCollisions(d,f,n);d=x.x,f=x.z}const _=-47.2,g=13.6,m=-8.5,p=8.5;d=Math.max(_,Math.min(g,d)),f=Math.max(m,Math.min(p,f)),this.rootGroup.position.x=d,this.rootGroup.position.z=f,this.walkCycle+=t*(this.characterType==="penguin"?16:14),this.leftLeg&&(this.leftLeg.rotation.x=Math.sin(this.walkCycle)*.65),this.rightLeg&&(this.rightLeg.rotation.x=-Math.sin(this.walkCycle)*.65),this.leftArm&&(this.leftArm.rotation.x=-Math.sin(this.walkCycle)*.5),this.rightArm&&(this.rightArm.rotation.x=Math.sin(this.walkCycle)*.5),this.characterType==="cat"&&this.tailGroup?(this.tailGroup.rotation.y=Math.sin(this.walkCycle*1.2)*.35,this.tailGroup.rotation.z=Math.cos(this.walkCycle*.8)*.2,this.tailGroup.rotation.x=-.2+Math.abs(Math.sin(this.walkCycle))*.15):this.characterType==="penguin"?(this.rootGroup.rotation.z=Math.sin(this.walkCycle)*.18,this.leftArm&&(this.leftArm.rotation.z=.3+Math.abs(Math.sin(this.walkCycle))*.25),this.rightArm&&(this.rightArm.rotation.z=-.3-Math.abs(Math.sin(this.walkCycle))*.25)):this.characterType==="robot"&&this.antennaGroup&&(this.antennaGroup.rotation.z=Math.sin(this.walkCycle*2)*.2),this.rootGroup.position.y=Math.abs(Math.sin(this.walkCycle*2))*.06}else this.leftLeg&&(this.leftLeg.rotation.x=Ve.lerp(this.leftLeg.rotation.x,0,t*10)),this.rightLeg&&(this.rightLeg.rotation.x=Ve.lerp(this.rightLeg.rotation.x,0,t*10)),this.leftArm&&(this.leftArm.rotation.x=Ve.lerp(this.leftArm.rotation.x,0,t*10)),this.rightArm&&(this.rightArm.rotation.x=Ve.lerp(this.rightArm.rotation.x,0,t*10)),this.rootGroup.rotation.z=Ve.lerp(this.rootGroup.rotation.z,0,t*10),this.characterType==="cat"&&this.tailGroup&&(this.walkCycle+=t*3,this.tailGroup.rotation.y=Math.sin(this.walkCycle)*.2,this.tailGroup.rotation.z=Math.cos(this.walkCycle*.5)*.1),this.rootGroup.position.y=Ve.lerp(this.rootGroup.position.y,0,t*10);this.stack.update(t,i)}resolveObstacleCollisions(t,e,n,i=3){const s=this.radius;for(let a=0;a<i;a++)for(const o of n){const c=o.min.x,l=o.max.x,h=o.min.z!==void 0?o.min.z:o.min.y,u=o.max.z!==void 0?o.max.z:o.max.y,d=Math.max(c,Math.min(l,t)),f=Math.max(h,Math.min(u,e)),_=t-d,g=e-f,m=_*_+g*g;if(m<s*s)if(m>1e-5){const p=Math.sqrt(m),v=s-p,x=_/p,S=g/p;t+=x*v,e+=S*v}else{const p=Math.abs(t-c),v=Math.abs(l-t),x=Math.abs(e-h),S=Math.abs(u-e),T=Math.min(p,v,x,S);T===p?t=c-s:T===v?t=l+s:T===x?e=h-s:e=u+s}}return{x:t,z:e}}}const be={CASHIER:"CASHIER",HARVESTER:"HARVESTER",FACTORY_FEEDER:"FACTORY_FEEDER",FARM_CARETAKER:"FARM_CARETAKER",CHEF:"CHEF",WAITER:"WAITER"};class fs{constructor(t,e=be.CASHIER,n=new P(0,0,0)){this.scene=t,this.type=e,this.position=n.clone(),this.speed=5,this.state="IDLE",this.target=null,this.walkCycle=0,this.mesh=this.createWorkerMesh(),this.mesh.position.copy(this.position),this.scene.add(this.mesh),this.stack=new $a(this.mesh,6)}createWorkerMesh(){const t=new ft;let e=1880310,n=1612246;this.type===be.HARVESTER?(e=5819394,n=4629250):this.type===be.FACTORY_FEEDER?(e=16750080,n=15041792):this.type===be.FARM_CARETAKER?(e=16762880,n=15053312):this.type===be.CHEF?(e=16777215,n=16729943):this.type===be.WAITER&&(e=3094080,n=10837738);const i=new rt(.3,.26,.65,10),s=new F({color:e,roughness:.5}),a=new R(i,s);a.position.y=.6,a.castShadow=!0,t.add(a);const o=new bt(.28,10,10),c=new F({color:16767916,roughness:.6}),l=new R(o,c);if(l.position.y=1.18,l.castShadow=!0,t.add(l),this.type===be.CHEF){const u=new rt(.3,.26,.45,10),d=new F({color:16777215}),f=new R(u,d);f.position.y=1.55,t.add(f)}else{const u=new rt(.3,.32,.12,10),d=new F({color:n}),f=new R(u,d);f.position.y=1.4,t.add(f)}const h=new F({color:2962486});return this.leftLeg=new R(new rt(.09,.08,.32,6),h),this.leftLeg.position.set(-.14,.16,0),this.leftLeg.castShadow=!0,this.rightLeg=this.leftLeg.clone(),this.rightLeg.position.x=.14,t.add(this.leftLeg,this.rightLeg),t}update(t,e={}){const{farmPlots:n=[],shelves:i=[],machines:s=[],coops:a=[],ovens:o=[],kitchens:c=[],tables:l=[],register:h=null}=e;switch(this.type){case be.CASHIER:this.updateCashier(t,h);break;case be.HARVESTER:this.updateHarvester(t,n,i,s);break;case be.FACTORY_FEEDER:this.updateFactoryFeeder(t,n,s,o,c,i);break;case be.FARM_CARETAKER:this.updateFarmCaretaker(t,n,s,a,o,i);break;case be.CHEF:this.updateChef(t,c,o,i);break;case be.WAITER:this.updateWaiter(t,c,l);break}}updateCashier(t,e){e&&(this.mesh.position.lerp(e.cashierZonePos,t*8),this.mesh.rotation.y=0,e.isCashierPresent=!0,this.walkCycle+=t*4,this.mesh.position.y=Math.abs(Math.sin(this.walkCycle))*.04)}updateHarvester(t,e,n,i){var a;let s=!1;if(this.stack.getCount()>0){const o=(a=this.stack.items[this.stack.items.length-1])==null?void 0:a.type,c=n.find(l=>l.acceptedType.id===(o==null?void 0:o.id)&&l.stock.length<l.capacity);if(c)s=!0,this.walkTowards(c.position,t,()=>{const l=this.stack.popItem(c.acceptedType);l&&c.addItem(l)});else{const l=i.find(h=>h.inputType.id===(o==null?void 0:o.id)&&h.inputStock<h.inputRequired*3);if(l)s=!0,this.walkTowards(l.inputZonePos,t,()=>{this.stack.popItem(l.inputType)&&l.inputStock++});else{const h=n.find(u=>u.acceptedType.id===(o==null?void 0:o.id));h&&(s=!0,this.walkTowards(h.position,t))}}}else{const o=e.find(c=>c.ripeCount>0);o&&(s=!0,this.walkTowards(o.position,t,()=>{o.harvest({stack:this.stack})}))}this.animateLegs(s,t)}updateFactoryFeeder(t,e,n,i,s,a){var c;let o=!1;if(this.stack.getCount()>0){const l=(c=this.stack.items[this.stack.items.length-1])==null?void 0:c.type,h=n.find(u=>u.inputType.id===(l==null?void 0:l.id)&&u.inputStock<u.inputRequired*3);if(h)o=!0,this.walkTowards(h.inputZonePos,t,()=>{this.stack.popItem(h.inputType)&&h.inputStock++});else{const u=a.find(d=>d.acceptedType.id===(l==null?void 0:l.id)&&d.stock.length<d.capacity);if(u)o=!0,this.walkTowards(u.position,t,()=>{const d=this.stack.popItem(u.acceptedType);d&&u.addItem(d)});else{let d=null,f=null;if((l==null?void 0:l.id)==="TOMATO"){const _=s.find(g=>g.mealType.id==="BURGER"&&g.inputStock2<3);_&&(d=_.inputZonePos,f=()=>{this.stack.popItem(gt.TOMATO)&&_.inputStock2++})}else if((l==null?void 0:l.id)==="TOMATO_PASTE"){const _=s.find(g=>g.mealType.id==="PIZZA"&&g.inputStock2<3);_&&(d=_.inputZonePos,f=()=>{this.stack.popItem(gt.TOMATO_PASTE)&&_.inputStock2++})}else if((l==null?void 0:l.id)==="WHEAT"){const _=i.find(g=>g.wheatStock<4);_&&(d=_.inputZonePos,f=()=>{this.stack.popItem(gt.WHEAT)&&_.wheatStock++})}else if((l==null?void 0:l.id)==="BREAD"){const _=s.find(g=>g.mealType.id==="BURGER"&&g.inputStock1<3);_&&(d=_.inputZonePos,f=()=>{this.stack.popItem(gt.BREAD)&&_.inputStock1++})}if(d&&f)o=!0,this.walkTowards(d,t,f);else{const _=n.find(g=>g.inputType.id===(l==null?void 0:l.id));_&&(o=!0,this.walkTowards(_.inputZonePos,t))}}}}else{const l=n.find(h=>h.outputStock.length>0);if(l)o=!0,this.walkTowards(l.outputZonePos,t,()=>{const h=l.outputStock.pop(),u=l.outputMeshes.pop();u&&l.meshGroup.remove(u),h&&this.stack.addItem(h)});else{const h=e.find(u=>(u.itemType.id==="TOMATO"||u.itemType.id==="ORANGE")&&u.ripeCount>0);h&&(o=!0,this.walkTowards(h.position,t,()=>{h.harvest({stack:this.stack})}))}}this.animateLegs(o,t)}updateFarmCaretaker(t,e,n,i,s,a){var c;let o=!1;if(this.stack.getCount()>0){const l=(c=this.stack.items[this.stack.items.length-1])==null?void 0:c.type;if((l==null?void 0:l.id)==="CHICKEN_FEED"){const h=i.find(u=>u.feedStock<8);h&&(o=!0,this.walkTowards(h.inputZonePos,t,()=>{this.stack.popItem(gt.CHICKEN_FEED)&&h.feedStock++}))}else if((l==null?void 0:l.id)==="CORN"){const h=n.find(u=>u.outputType.id==="CHICKEN_FEED"&&u.inputStock<6);if(h)o=!0,this.walkTowards(h.inputZonePos,t,()=>{this.stack.popItem(gt.CORN)&&h.inputStock++});else{const u=n.find(d=>d.outputType.id==="POPCORN"&&d.inputStock<6);if(u)o=!0,this.walkTowards(u.inputZonePos,t,()=>{this.stack.popItem(gt.CORN)&&u.inputStock++});else{const d=a.find(f=>f.acceptedType.id===(l==null?void 0:l.id)&&f.stock.length<f.capacity);if(d)o=!0,this.walkTowards(d.position,t,()=>{const f=this.stack.popItem(d.acceptedType);f&&d.addItem(f)});else{const f=n.find(_=>_.outputType.id==="CHICKEN_FEED");f&&(o=!0,this.walkTowards(f.inputZonePos,t))}}}}else if((l==null?void 0:l.id)==="EGG"){const h=a.find(u=>u.acceptedType.id==="EGG"&&u.stock.length<u.capacity);if(h)o=!0,this.walkTowards(h.position,t,()=>{const u=this.stack.popItem(h.acceptedType);u&&h.addItem(u)});else{const u=s.find(d=>d.eggStock<3);if(u)o=!0,this.walkTowards(u.inputZonePos,t,()=>{this.stack.popItem(gt.EGG)&&u.eggStock++});else{const d=a.find(f=>f.acceptedType.id==="EGG");d&&(o=!0,this.walkTowards(d.position,t))}}}else{const h=a.find(u=>u.acceptedType.id===(l==null?void 0:l.id)&&u.stock.length<u.capacity);h&&(o=!0,this.walkTowards(h.position,t,()=>{const u=this.stack.popItem(h.acceptedType);u&&h.addItem(u)}))}}else{const l=i.find(h=>h.eggStock.length>0);if(l)o=!0,this.walkTowards(l.outputZonePos,t,()=>{const h=l.eggStock.pop(),u=l.eggMeshes.pop();u&&l.meshGroup.remove(u),h&&this.stack.addItem(h)});else{const h=n.find(u=>u.outputType.id==="CHICKEN_FEED"&&u.outputStock.length>0);if(h)o=!0,this.walkTowards(h.outputZonePos,t,()=>{const u=h.outputStock.pop(),d=h.outputMeshes.pop();d&&h.meshGroup.remove(d),u&&this.stack.addItem(u)});else{const u=e.find(d=>d.itemType.id==="CORN"&&d.ripeCount>0);u&&(o=!0,this.walkTowards(u.position,t,()=>{u.harvest({stack:this.stack})}))}}}this.animateLegs(o,t)}updateChef(t,e,n,i){if(e.length>0){const s=e[0];this.mesh.position.lerp(new P(s.position.x,0,s.position.z-1.2),t*8),this.mesh.rotation.y=0,this.walkCycle+=t*6,this.mesh.position.y=Math.abs(Math.sin(this.walkCycle))*.05}}updateWaiter(t,e,n){var s;let i=!1;if(this.stack.getCount()>0){const a=(s=this.stack.items[this.stack.items.length-1])==null?void 0:s.type,o=n.find(c=>{var l;return c.isOccupied&&!c.isEating&&((l=c.desiredMeal)==null?void 0:l.id)===(a==null?void 0:a.id)});o&&(i=!0,this.walkTowards(o.position,t,()=>{const c=this.stack.popItem(o.desiredMeal);c&&o.serveMeal(c)}))}else{const a=e.find(o=>o.mealStock.length>0);a&&(i=!0,this.walkTowards(a.outputZonePos,t,()=>{const o=a.mealStock.pop(),c=a.mealMeshes.pop();c&&a.meshGroup.remove(c),o&&this.stack.addItem(o)}))}this.animateLegs(i,t)}animateLegs(t,e){t?(this.walkCycle+=e*14,this.leftLeg.rotation.x=Math.sin(this.walkCycle)*.6,this.rightLeg.rotation.x=-Math.sin(this.walkCycle)*.6,this.mesh.position.y=Math.abs(Math.sin(this.walkCycle*2))*.06):(this.leftLeg.rotation.x=0,this.rightLeg.rotation.x=0,this.mesh.position.y=0),this.stack.update(e,t)}walkTowards(t,e,n){const i=new P().subVectors(t,this.mesh.position);i.y=0;const s=i.length();if(s<.4){n&&n();return}i.normalize(),this.mesh.position.addScaledVector(i,Math.min(this.speed*e,s));const a=Math.atan2(i.x,i.z);this.mesh.rotation.y=Ve.lerp(this.mesh.rotation.y,a,e*12)}}const qs={tr:{speed_boost:"2x HIZ",quest_title:"🎯 GÖREV",initial_quest:"🍅 Domates topla ve reyon rafına diz!",item_tomato:"Domates",item_tomato_paste:"Salça Kavanozu",item_orange:"Portakal",item_orange_juice:"Taze Portakal Suyu",item_corn:"Taze Mısır",item_popcorn:"Sıcak Popcorn",item_chicken_feed:"Tavuk Yemi",item_egg:"Çiftlik Yumurtası",item_wheat:"Altın Buğday",item_bread:"Taş Fırın Ekmek",item_burger:"Gurme Burger",item_pizza:"İtalyan Pizza",item_coffee:"Kremalı Latte",hire_cashier:"Kasiyer İşe Al",hire_harvester:"Tarla İşçisi Al",hire_factory_worker:"Fabrika İşçisi Al",hire_farm_caretaker:"Çiftlik Bakıcısı Al",hire_chef:"Restoran Şefi Al",hire_waiter:"Garson İşe Al",unlock_tomato_farm_2:"2. Domates Tarlası Aç",unlock_tomato_shelf_2:"2. Domates Reyonu Kur",unlock_paste:"Salça Kazanı Aç",unlock_orange:"Portakal Bahçesi Aç",unlock_juice:"Meyve Sıkacağı Kur",unlock_orange_farm_2:"2. Portakal Bahçesi Aç",unlock_corn:"Mısır Tarlası Aç",unlock_corn_shelf:"Taze Mısır Reyonu Aç",unlock_popcorn:"Popcorn Makinesi Kur",unlock_feed_machine:"Yem Değirmeni Makinesi Kur",unlock_coop:"Tavuk Kümesi İnşa Et",buy_chicken_2:"2. Tavuğu Al (🐔 2x Yumurtlama)",buy_chicken_3:"3. Tavuğu Al (🐔 3x Yumurtlama)",unlock_wheat:"Buğday Tarlası Aç",unlock_bakery:"Taş Ekmek Fırını Aç",unlock_restaurant:"Restoran Kompleksi Aç",unlock_burger:"Burger Grill İstasyonu",unlock_pizza:"Pizza Fırını İstasyonu",unlock_tables:"Yemek Masaları Kur",upgrade_backpack:"Sırt Çantası +4",sale_toast:"Satış!",tip_toast:"Yemek Bahşişi!",unlocked_toast:"Açıldı!",settings_title:"AYARLAR & DEBUG",tab_general:"Genel",tab_character:"🎭 Karakter",tab_debug:"🛠️ Debug Modu",tab_language:"🌐 Dil / Language",char_select_title:"OYUNCU KARAKTERİNİ SEÇ",char_shopkeeper:"👨‍🌾 Market Çalışanı",char_shopkeeper_desc:"Klasik çalışkan süpermarket ve çiftlik yöneticisi",char_cat:"🐱 Maceracı Kedi",char_cat_desc:"Zümrüt gözlü, sevimli kıvrık kuyruklu maceracı kedi",char_robot:"🤖 Siber Lojistik Botu",char_robot_desc:"Neon enerjili ve antenli fütüristik robot",char_panda:"🐼 Şef Panda",char_panda_desc:"Kırmızı aşçı bandanalı, pofuduk sevimli fırıncı panda",char_penguin:"👑 Kral Penguen",char_penguin_desc:"Altın taçlı ve smokinli karizmatik penguen patron",sfx:"🔊 Ses Efektleri",music:"🎵 Fon Müziği",haptics:"📳 Titreşim / Haptik",lang_turkish:"🇹🇷 Türkçe",lang_english:"🇬🇧 English",debug_badge:"⚡ GELİŞTİRİCİ TEST PANELİ",debug_money_1k:"💵 +1.000$ Para Ekle",debug_money_inf:"♾️ Sınırsız Para (99.999$)",debug_speed_2x:"⚡ 2x Oyun Hızı",debug_speed_5x:"🚀 5x Süper Hız",debug_capacity:"🎒 +50 Çanta Kapasitesi",debug_reset_money:"🧹 Parayı Sıfırla (0$)",status_input:"Giriş",status_cooking:"Pişiyor...",status_ready:"Hazır!",shelf_stock:"Stok"},en:{speed_boost:"2x SPEED",quest_title:"🎯 QUEST",initial_quest:"🍅 Harvest tomatoes and fill the shelf!",item_tomato:"Tomato",item_tomato_paste:"Tomato Paste",item_orange:"Orange",item_orange_juice:"Fresh Orange Juice",item_corn:"Fresh Corn",item_popcorn:"Hot Popcorn",item_chicken_feed:"Chicken Feed",item_egg:"Farm Egg",item_wheat:"Golden Wheat",item_bread:"Stone Oven Bread",item_burger:"Gourmet Burger",item_pizza:"Italian Pizza",item_coffee:"Creamy Latte",hire_cashier:"Hire Cashier",hire_harvester:"Hire Harvester",hire_factory_worker:"Hire Factory Worker",hire_farm_caretaker:"Hire Farm Caretaker",hire_chef:"Hire Restaurant Chef",hire_waiter:"Hire Waiter",unlock_tomato_farm_2:"Unlock 2nd Tomato Field",unlock_tomato_shelf_2:"Unlock 2nd Tomato Shelf",unlock_paste:"Unlock Tomato Paste Vat",unlock_orange:"Unlock Orange Orchard",unlock_juice:"Unlock Juicer Station",unlock_orange_farm_2:"Unlock 2nd Orange Field",unlock_corn:"Unlock Corn Field",unlock_corn_shelf:"Unlock Fresh Corn Shelf",unlock_popcorn:"Unlock Popcorn Machine",unlock_feed_machine:"Unlock Feed Grinder Machine",unlock_coop:"Build Chicken Coop",buy_chicken_2:"Buy 2nd Chicken (🐔 2x Lay Speed)",buy_chicken_3:"Buy 3rd Chicken (🐔 3x Lay Speed)",unlock_wheat:"Unlock Wheat Field",unlock_bakery:"Unlock Stone Oven Bakery",unlock_restaurant:"Unlock Restaurant Complex",unlock_burger:"Burger Grill Station",unlock_pizza:"Pizza Oven Station",unlock_tables:"Build Dining Tables",upgrade_backpack:"Backpack Capacity +4",sale_toast:"Sale!",tip_toast:"Dining Tip!",unlocked_toast:"Unlocked!",settings_title:"SETTINGS & DEBUG",tab_general:"General",tab_character:"🎭 Character",tab_debug:"🛠️ Debug Mode",tab_language:"🌐 Language",char_select_title:"CHOOSE PLAYER CHARACTER",char_shopkeeper:"👨‍🌾 Market Clerk",char_shopkeeper_desc:"Classic hardworking supermarket & farm manager",char_cat:"🐱 Adventurer Cat",char_cat_desc:"Emerald-eyed ginger tabby adventurer with wagging tail",char_robot:"🤖 Cyber Bot",char_robot_desc:"Futuristic neon-powered logistics android with antenna",char_panda:"🐼 Chef Panda",char_panda_desc:"Cute fluffy panda baker with red chef bandana",char_penguin:"👑 King Penguin",char_penguin_desc:"Charismatic penguin boss in tuxedo and golden crown",sfx:"🔊 Sound Effects",music:"🎵 Music",haptics:"📳 Haptic Feedback",lang_turkish:"🇹🇷 Türkçe",lang_english:"🇬🇧 English",debug_badge:"⚡ DEVELOPER CHEAT PANEL",debug_money_1k:"💵 Add +1.000$ Cash",debug_money_inf:"♾️ Infinite Cash (99.999$)",debug_speed_2x:"⚡ 2x Game Speed",debug_speed_5x:"🚀 5x Super Speed",debug_capacity:"🎒 +50 Backpack Slots",debug_reset_money:"🧹 Reset Cash (0$)",status_input:"Input",status_cooking:"Cooking...",status_ready:"Ready!",shelf_stock:"Stock"}};class P_{constructor(t="tr"){this.currentLang=t,this.listeners=[]}setLanguage(t){qs[t]&&(this.currentLang=t,this.listeners.forEach(e=>e(t)))}getLanguage(){return this.currentLang}getCurrentLanguage(){return this.currentLang}t(t){return qs[this.currentLang]&&qs[this.currentLang][t]?qs[this.currentLang][t]:qs.tr[t]||t}onChange(t){this.listeners.push(t)}}const zt=new P_("tr");class ps{constructor(t,e,n,i=gt.TOMATO,s="Tarla",a=null){this.scene=t,this.itemType=i,this.label=s,this.position=new P(e,0,n),this.radius=1.85,this.growDuration=ue.FARM.growTime,this.growTimer=0,this.ripeCount=3,this.maxCount=3,this.plants=[],this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),a&&a.registerObstacle(e,n,2.2,2.2),this.buildSoilBed()}buildSoilBed(){const t=new st(2.4,.25,2.4),e=new F({color:9132587,roughness:.8}),n=new R(t,e);n.position.y=.12,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new st(2.1,.22,2.1),s=new F({color:4073251,roughness:.95}),a=new R(i,s);a.position.y=.15,this.meshGroup.add(a),[{x:-.5,z:0},{x:.5,z:-.5},{x:.5,z:.5}].forEach(c=>{const l=new ft;l.position.set(c.x,.2,c.z);const h=new R(new rt(.04,.05,.5,6),new F({color:1092740,roughness:.5}));h.position.y=.25,h.castShadow=!0;const u=new R(new bt(.2,6,6),new F({color:3069299,roughness:.4}));u.position.y=.45;let d;if(this.itemType.id==="CORN"){const f=new rt(.08,.1,.35,6),_=new F({color:15844367,roughness:.3});d=new R(f,_),d.position.set(0,.5,0)}else if(this.itemType.id==="WHEAT"){const f=new Fe(.12,.4,6),_=new F({color:15965202,roughness:.5});d=new R(f,_),d.position.set(0,.55,0)}else{const f=new bt(.15,8,8),_=new F({color:this.itemType.color,roughness:.3});d=new R(f,_),d.position.set(.12,.45,.12)}d.castShadow=!0,l.add(h,u,d),this.meshGroup.add(l),this.plants.push({group:l,fruit:d,isRipe:!0,scale:1})})}update(t,e,n=1){if(this.ripeCount<this.maxCount){this.growTimer+=t*n;const i=Math.min(this.growTimer/this.growDuration,1);this.plants.forEach(s=>{s.isRipe||(s.group.scale.set(i,i,i),i>=1&&(s.isRipe=!0,this.ripeCount++,s.group.scale.set(1.15,1.15,1.15),setTimeout(()=>s.group.scale.set(1,1,1),150)))}),i>=1&&(this.growTimer=0)}e&&this.position.distanceTo(e.mesh.position)<=this.radius&&this.ripeCount>0&&e.stack.canAdd()&&this.harvest(e)}harvest(t){const e=this.plants.find(n=>n.isRipe);e&&t.stack.addItem(this.itemType)&&(e.isRipe=!1,this.ripeCount--,e.group.scale.set(.1,.1,.1),this.growTimer=0)}}class Si{constructor(t,e={}){this.scene=t,this.title=e.title||"Upgrade",this.icon=e.icon||"⭐",this.cost=e.cost||0,this.currentCost=e.cost||0,this.unit=e.unit||"💵",this.subtitle=e.subtitle||"",this.color=e.color||"#2ed573",this.badgeType=e.type||"ZONE",this.canvas=document.createElement("canvas"),this.canvas.width=512,this.canvas.height=256,this.ctx=this.canvas.getContext("2d"),this.texture=new xo(this.canvas),this.texture.minFilter=Je,this.texture.magFilter=Je;const n=new Ya({map:this.texture,transparent:!0,depthTest:!0,depthWrite:!1});this.sprite=new Yh(n),this.sprite.scale.set(2.4,1.2,1),this.sprite.position.set(0,2,0),this.group=new ft,this.group.add(this.sprite),e.position&&this.group.position.copy(e.position),this.scene.add(this.group),this.render()}updateCost(t){this.currentCost=Math.max(0,t),this.render()}updateRecipe(t,e,n,i=!1){this.progressPercent=t,this.currentInput=e,this.maxInput=n,this.isProcessing=i,this.renderRecipe()}setPosition(t,e,n){this.group.position.set(t,e,n)}render(){const t=this.ctx,e=this.canvas.width,n=this.canvas.height;t.clearRect(0,0,e,n);const i=24,s=24,a=e-48,o=n-48,c=32;if(t.save(),t.shadowColor="rgba(0, 0, 0, 0.2)",t.shadowBlur=16,t.shadowOffsetY=6,t.fillStyle="#ffffff",this.roundRect(t,i,s,a,o,c),t.fill(),t.restore(),t.lineWidth=6,t.strokeStyle=this.color||"#58cc02",this.roundRect(t,i,s,a,o,c),t.stroke(),t.textAlign="center",t.textBaseline="middle",t.font='900 36px "Fredoka", "Nunito", sans-serif',t.fillStyle="#2d3436",t.fillText(`${this.icon} ${this.title}`,e/2,s+46),this.cost>0){const l=this.currentCost<=0,h=l?"TAMAMLANDI! 🎉":`${this.unit} ${this.currentCost}`,u=270,d=56,f=(e-u)/2,_=s+92;if(t.fillStyle=l?"#58cc02":"#f1f2f6",this.roundRect(t,f,_,u,d,18),t.fill(),!l){const m=this.cost-this.currentCost,p=Math.min(1,Math.max(0,m/this.cost));p>0&&(t.fillStyle="#58cc02",this.roundRect(t,f,_,u*p,d,18),t.fill())}t.lineWidth=3,t.strokeStyle=l?"#46a302":"#dfe4ea",this.roundRect(t,f,_,u,d,18),t.stroke(),t.font='900 32px "Fredoka", "Nunito", sans-serif';const g=this.cost-this.currentCost;t.fillStyle=l||g/this.cost>.4?"#ffffff":"#ff9600",t.fillText(h,e/2,_+d/2+2)}this.texture.needsUpdate=!0}renderRecipe(){const t=this.ctx,e=this.canvas.width,n=this.canvas.height;t.clearRect(0,0,e,n);const i=24,s=24,a=e-48,o=n-48,c=32;t.save(),t.shadowColor="rgba(0, 0, 0, 0.15)",t.shadowBlur=14,t.shadowOffsetY=6,t.fillStyle="#ffffff",this.roundRect(t,i,s,a,o,c),t.fill(),t.restore(),t.lineWidth=6,t.strokeStyle=this.isProcessing?"#ff9600":"#1cb0f6",this.roundRect(t,i,s,a,o,c),t.stroke(),t.textAlign="center",t.textBaseline="middle",t.font='900 34px "Fredoka", "Nunito", sans-serif',t.fillStyle="#4b4b4b",t.fillText(`${this.icon} ${this.title}`,e/2,s+44);const l=this.isProcessing?`⚙️ Pişiyor... %${Math.floor(this.progressPercent*100)}`:`Stok: ${this.currentInput||0} / ${this.maxInput||0}`;t.font='800 24px "Fredoka", sans-serif',t.fillStyle=this.isProcessing?"#ff9600":"#777777",t.fillText(l,e/2,s+90);const h=320,u=20,d=(e-h)/2,f=s+120;t.fillStyle="#e5e5e5",this.roundRect(t,d,f,h,u,10),t.fill(),this.progressPercent>0&&(t.fillStyle=this.isProcessing?"#ff9600":"#58cc02",this.roundRect(t,d,f,Math.max(h*Math.min(1,this.progressPercent),14),u,10),t.fill()),this.texture.needsUpdate=!0}roundRect(t,e,n,i,s,a){t.beginPath(),t.moveTo(e+a,n),t.lineTo(e+i-a,n),t.quadraticCurveTo(e+i,n,e+i,n+a),t.lineTo(e+i,n+s-a),t.quadraticCurveTo(e+i,n+s,e+i-a,n+s),t.lineTo(e+a,n+s),t.quadraticCurveTo(e,n+s,e,n+s-a),t.lineTo(e,n+a),t.quadraticCurveTo(e,n,e+a,n),t.closePath()}destroy(){this.group&&this.group.parent&&this.group.parent.remove(this.group),this.texture&&this.texture.dispose()}}class oi{constructor(t,e,n,i=gt.TOMATO,s=8,a="Reyon",o=null){this.scene=t,this.acceptedType=i,this.capacity=s,this.label=a,this.position=new P(e,0,n),this.stock=[],this.itemMeshes=[],this.interactionRadius=1.9,this.restockCooldown=.1,this.lastRestockTime=0,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),o&&o.registerObstacle(e,n,2,1.2),this.waitingCustomers=[],this.buildShelfMesh(),this.buildWorldBadge()}getWaitQueuePosition(t=0){return new P(this.position.x,0,this.position.z+1.3+t*.85)}buildShelfMesh(){const t=new st(2,1,1.2),e=new F({color:12088115,roughness:.75,metalness:.1}),n=new R(t,e);n.position.y=.5,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new st(1.8,.4,.04),s=new F({color:9127187,roughness:.8}),a=new R(i,s);a.position.set(0,.5,.61),this.meshGroup.add(a);const o=new st(1.86,.08,1.06),c=new F({color:4073251,roughness:.9,metalness:.05}),l=new R(o,c);l.position.y=1.04,l.receiveShadow=!0,this.meshGroup.add(l);const h=new F({color:5125166,roughness:.85});[-.55,-.18,.18,.55].forEach(T=>{const b=new st(.32,.02,1.02),E=new R(b,h);E.position.set(T,1.08,0),E.receiveShadow=!0,this.meshGroup.add(E)});const u=new F({color:6111287,roughness:.7}),d=new st(1.98,.16,.08),f=new R(d,u);f.position.set(0,1.1,.56),f.castShadow=!0,this.meshGroup.add(f);const _=new R(d,u);_.position.set(0,1.1,-.56),_.castShadow=!0,this.meshGroup.add(_);const g=new st(.08,.16,1.18),m=new R(g,u);m.position.set(-.95,1.1,0),m.castShadow=!0,this.meshGroup.add(m);const p=new R(g,u);p.position.set(.95,1.1,0),p.castShadow=!0,this.meshGroup.add(p);const v=new st(.85,.22,.05),x=new F({color:this.acceptedType.color,roughness:.3,metalness:.1}),S=new R(v,x);S.position.set(0,.92,.63),this.meshGroup.add(S)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`${this.acceptedType.icon} ${zt.t(this.acceptedType.nameKey)||this.label}`,icon:this.acceptedType.icon,cost:0,type:"RECIPE",position:new P(this.position.x,2.3,this.position.z)}),this.updateBadge()}updateBadge(){if(this.badge){const t=this.stock.length/this.capacity;this.badge.updateRecipe(t,this.stock.length,this.capacity,!1)}}canAccept(t){return this.stock.length<this.capacity&&t.id===this.acceptedType.id}hasStock(){return this.stock.length>0}getStockCount(){return this.stock.length}takeItem(){if(this.stock.length===0)return null;const t=this.stock.pop(),e=this.itemMeshes.pop();return e&&this.meshGroup.remove(e),this.updateBadge(),t}addItem(t){if(this.stock.length>=this.capacity)return!1;this.stock.push(t);const e=this.stock.length-1,n=Math.floor(e/4),s=(e%4-1.5)*.4,a=(n-.5)*.4,o=1.25,c=this.createShelfItemMesh(t);c.position.set(s,o,a),c.scale.set(.1,.1,.1),this.meshGroup.add(c),this.itemMeshes.push(c);let l=0;const h=()=>{l+=.2;const u=1+Math.sin(l*Math.PI)*.3;c.scale.set(u,u,u),l<1?requestAnimationFrame(h):c.scale.set(1,1,1)};return h(),this.updateBadge(),!0}createShelfItemMesh(t){const e=new ft,n=new F({color:t.color,roughness:.3});if(t.id==="TOMATO"||t.id==="ORANGE"){const i=new R(new bt(.15,8,8),n);i.castShadow=!0,e.add(i)}else if(t.id==="TOMATO_PASTE"){const i=new R(new rt(.12,.12,.25,8),n);i.castShadow=!0,e.add(i)}else if(t.id==="ORANGE_JUICE"){const i=new R(new rt(.1,.12,.3,8),n);i.castShadow=!0,e.add(i)}else if(t.id==="CORN"){const i=new R(new rt(.08,.1,.32,6),n);i.castShadow=!0,e.add(i)}else if(t.id==="POPCORN"){const i=new R(new st(.25,.28,.25),n);i.castShadow=!0,e.add(i)}else if(t.id==="CHICKEN_FEED"){const i=new R(new rt(.12,.14,.28,8),n);i.castShadow=!0,e.add(i)}else if(t.id==="EGG"){const i=new R(new bt(.12,8,8),n);i.scale.set(1,1.3,1),i.castShadow=!0,e.add(i)}else if(t.id==="BREAD"){const i=new R(new st(.3,.18,.25),n);i.castShadow=!0,e.add(i)}else{const i=new R(new st(.2,.2,.2),n);i.castShadow=!0,e.add(i)}return e}update(t,e,n){if(!e)return;if(this.position.distanceTo(e.mesh.position)<=this.interactionRadius&&this.stock.length<this.capacity&&n-this.lastRestockTime>this.restockCooldown){const s=e.stack.popItem(this.acceptedType);s&&(this.addItem(s),this.lastRestockTime=n)}}}class Xr{constructor(t,e,n,i=gt.TOMATO,s=gt.TOMATO_PASTE,a="İmalat Kazanı",o=null){this.scene=t,this.inputType=i,this.outputType=s,this.label=a,this.position=new P(e,0,n),this.inputRequired=i.id==="ORANGE"?ue.PROCESSING.orangeInputRequired:i.id==="CORN"&&s.id==="POPCORN"?ue.PROCESSING.popcornInputRequired:i.id==="CORN"&&s.id==="CHICKEN_FEED"?ue.PROCESSING.feedInputRequired:ue.PROCESSING.inputRequired,this.processDuration=i.id==="ORANGE"?ue.PROCESSING.orangeJuiceTime:i.id==="CORN"&&s.id==="POPCORN"?ue.PROCESSING.popcornTime:i.id==="CORN"&&s.id==="CHICKEN_FEED"?ue.PROCESSING.feedTime:ue.PROCESSING.tomatoPasteTime,this.inputStock=0,this.outputStock=[],this.outputMaxCapacity=6,this.processTimer=0,this.isProcessing=!1,this.inputZonePos=new P(e-1.3,0,n),this.outputZonePos=new P(e+1.3,0,n),this.interactionRadius=1.85,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),o&&o.registerObstacle(e,n,2.4,1.6),this.outputMeshes=[],this.animatedParts={},this.buildMachineMesh(),this.buildWorldBadge()}buildMachineMesh(){this.outputType.id==="ORANGE_JUICE"?this.buildJuicerMachine():this.outputType.id==="POPCORN"?this.buildPopcornMachine():this.outputType.id==="CHICKEN_FEED"?this.buildFeedGrinderMachine():this.buildPasteVatMachine(),this.buildCommonHopperAndTray()}buildPasteVatMachine(){const t=new rt(1,1.15,.4,16),e=new F({color:2899536,metalness:.6,roughness:.4}),n=new R(t,e);n.position.y=.2,n.castShadow=!0,this.meshGroup.add(n);const i=new rt(.85,.8,1.1,16),s=new F({color:12597547,metalness:.3,roughness:.3});this.vat=new R(i,s),this.vat.position.y=.95,this.vat.castShadow=!0,this.meshGroup.add(this.vat);const a=new Mo(.86,.06,8,24),o=new F({color:15844367,metalness:.8,roughness:.2}),c=new R(a,o);c.rotation.x=Math.PI/2,c.position.y=1.5,this.meshGroup.add(c);const l=new rt(.1,.12,.65,8),h=new F({color:13849600,metalness:.8}),u=new R(l,h);u.position.set(.45,1.7,-.2),this.meshGroup.add(u);const d=new ft;d.position.set(0,1.5,0);const f=new R(new rt(.04,.04,.5,8),o);f.position.y=-.15;const _=new R(new st(.6,.12,.04),o);_.position.y=-.3;const g=new R(new st(.04,.12,.6),o);g.position.y=-.3,d.add(f,_,g),this.meshGroup.add(d),this.animatedParts.paddle=d}buildJuicerMachine(){const t=new rt(.9,.95,.45,16),e=new F({color:16119546,metalness:.2,roughness:.2}),n=new R(t,e);n.position.y=.22,n.castShadow=!0,this.meshGroup.add(n);const i=new F({color:16742719,roughness:.3}),s=new R(new rt(.92,.92,.08,16),i);s.position.y=.45,this.meshGroup.add(s);const a=new rt(.72,.72,.9,16),o=new F({color:16777215,transparent:!0,opacity:.45,roughness:.1,metalness:.1}),c=new R(a,o);c.position.y=.95,this.meshGroup.add(c);const l=new rt(.68,.68,.6,16),h=new F({color:16752410,roughness:.3,transparent:!0,opacity:.85});this.juiceLiquid=new R(l,h),this.juiceLiquid.position.y=.8,this.meshGroup.add(this.juiceLiquid),this.animatedParts.juiceLiquid=this.juiceLiquid;const u=new Fe(.35,.45,8),d=new F({color:15965202,roughness:.4}),f=new R(u,d);f.position.y=1.45,this.meshGroup.add(f),this.animatedParts.reamer=f;const _=new rt(.22,.22,.45,10),g=new F({color:14673130,metalness:.8,roughness:.2}),m=new R(_,g);m.position.set(-.35,1.65,0),m.rotation.z=Math.PI/4,this.meshGroup.add(m);const p=new R(new st(.12,.12,.25),g);p.position.set(0,.6,.78),this.meshGroup.add(p)}buildPopcornMachine(){const t=new st(1.6,.5,1.4),e=new F({color:15158332,roughness:.4}),n=new R(t,e);n.position.y=.25,n.castShadow=!0,this.meshGroup.add(n);const i=new F({color:15844367,metalness:.8,roughness:.2});[[-.65,-.55],[.65,-.55],[-.65,.55],[.65,.55]].forEach(([_,g])=>{const m=new R(new st(.08,1,.08),i);m.position.set(_,.95,g),this.meshGroup.add(m)});const s=new F({color:16777215,transparent:!0,opacity:.35,roughness:.1}),a=new R(new st(1.36,.95,1.16),s);a.position.y=.95,this.meshGroup.add(a);const o=new rt(.35,.3,.32,12),c=new F({color:12436423,metalness:.8,roughness:.2}),l=new R(o,c);l.position.set(0,1.15,0),this.meshGroup.add(l),this.animatedParts.kettle=l;const h=new ft;h.position.set(0,.6,0);const u=new F({color:16180621,roughness:.8});this.kernels=[];for(let _=0;_<12;_++){const g=new R(new bt(.065,6,6),u);g.position.set((Math.random()-.5)*.9,.05+Math.random()*.1,(Math.random()-.5)*.7),h.add(g),this.kernels.push(g)}this.meshGroup.add(h),this.animatedParts.kernels=this.kernels;const d=new st(1.65,.2,1.45),f=new R(d,e);f.position.y=1.55,this.meshGroup.add(f)}buildFeedGrinderMachine(){const t=new st(1.6,.45,1.4),e=new F({color:2600544,roughness:.6}),n=new R(t,e);n.position.y=.22,n.castShadow=!0,this.meshGroup.add(n);const i=new rt(.75,.45,.85,10),s=new F({color:5726319,metalness:.6,roughness:.4}),a=new R(i,s);a.position.y=.95,a.castShadow=!0,this.meshGroup.add(a);const o=new rt(.42,.42,.1,12),c=new F({color:15965202,metalness:.8,roughness:.3}),l=new R(o,c);l.rotation.z=Math.PI/2,l.position.set(.65,.9,0),this.meshGroup.add(l),this.animatedParts.gear1=l;const h=new R(new rt(.25,.25,.1,8),c);h.rotation.z=Math.PI/2,h.position.set(.65,1.35,0),this.meshGroup.add(h),this.animatedParts.gear2=h;const u=new R(new st(.3,.25,.4),s);u.position.set(0,.45,.65),this.meshGroup.add(u)}buildCommonHopperAndTray(){const t=new R(new st(.85,.2,.85),new F({color:15105570,roughness:.5}));t.position.set(-1.3,.1,0),t.receiveShadow=!0,this.meshGroup.add(t);const e=new R(new st(.85,.2,.85),new F({color:2600544,roughness:.5}));e.position.set(1.3,.1,0),e.receiveShadow=!0,this.meshGroup.add(e)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`${this.outputType.icon} ${zt.t(this.outputType.nameKey)||this.label}`,icon:this.outputType.icon,cost:0,type:"RECIPE",position:new P(this.position.x,2.7,this.position.z)}),this.badge.updateRecipe(0,this.inputStock,this.inputRequired*3,!1)}update(t,e,n,i=1,s=null){if(e&&(this.inputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.inputStock<this.inputRequired*3&&e.stack.popItem(this.inputType)&&(this.inputStock++,this.badge.updateRecipe(this.isProcessing?this.processTimer/this.processDuration:0,this.inputStock,this.inputRequired*3,this.isProcessing)),this.outputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.outputStock.length>0&&e.stack.canAdd())){const c=this.outputStock.pop(),l=this.outputMeshes.pop();l&&this.meshGroup.remove(l),e.stack.addItem(c),s&&s(c,this.outputType)}if(!this.isProcessing&&this.inputStock>=this.inputRequired&&this.outputStock.length<this.outputMaxCapacity&&(this.isProcessing=!0,this.inputStock-=this.inputRequired,this.processTimer=0),this.isProcessing){this.processTimer+=t*i;const a=Math.min(1,this.processTimer/this.processDuration);this.animatedParts.paddle&&(this.animatedParts.paddle.rotation.y+=t*8,this.vat&&(this.vat.position.y=.95+Math.sin(n*25)*.03)),this.animatedParts.reamer&&(this.animatedParts.reamer.rotation.y+=t*15,this.juiceLiquid&&(this.juiceLiquid.scale.y=.4+a*.6,this.juiceLiquid.position.y=.6+a*.25)),this.animatedParts.kettle&&(this.animatedParts.kettle.rotation.z=Math.sin(n*18)*.15,this.animatedParts.kernels&&this.animatedParts.kernels.forEach((o,c)=>{o.position.y=.08+Math.abs(Math.sin(n*12+c))*.35,o.rotation.x+=t*5})),this.animatedParts.gear1&&this.animatedParts.gear2&&(this.animatedParts.gear1.rotation.x+=t*6,this.animatedParts.gear2.rotation.x-=t*10),this.badge.updateRecipe(a,this.inputStock,this.inputRequired*3,!0),this.processTimer>=this.processDuration&&(this.isProcessing=!1,this.processTimer=0,this.vat&&(this.vat.position.y=.95),this.outputStock.push(this.outputType),this.spawnOutputMesh(this.outputType),this.badge.updateRecipe(0,this.inputStock,this.inputRequired*3,!1))}}spawnOutputMesh(t){const e=new F({color:t.color,roughness:.3});let n;t.id==="POPCORN"?n=new R(new st(.22,.26,.22),e):t.id==="CHICKEN_FEED"?n=new R(new rt(.14,.16,.32,8),e):t.id==="ORANGE_JUICE"?n=new R(new rt(.1,.12,.3,8),e):n=new R(new rt(.12,.12,.25,8),e);const i=this.outputStock.length-1,s=i%2,a=Math.floor(i/2);n.position.set(1.15+s*.3,.35,-.25+a*.3),n.castShadow=!0,this.meshGroup.add(n),this.outputMeshes.push(n)}}class L_{constructor(t,e,n,i=null){this.scene=t,this.position=new P(e,0,n),this.feedStock=0,this.eggStock=[],this.maxEggCapacity=8,this.chickenCount=1,this.layDuration=4.2,this.layTimer=0,this.inputZonePos=new P(e-1.3,0,n),this.outputZonePos=new P(e+1.3,0,n),this.interactionRadius=1.85,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),i&&i.registerObstacle(e,n,2.4,1.8),this.eggMeshes=[],this.chickens=[],this.buildCoopMesh(),this.buildWorldBadge()}buildCoopMesh(){const t=new st(2,1.4,1.6),e=new F({color:12597547,roughness:.7}),n=new R(t,e);n.position.y=.7,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new R(new st(.8,.9,.1),new F({color:4073251}));i.position.set(0,.45,.81),this.meshGroup.add(i);const s=new Fe(1.65,.85,4),a=new F({color:15844367,roughness:.9}),o=new R(s,a);o.rotation.y=Math.PI/4,o.position.y=1.8,o.castShadow=!0,this.meshGroup.add(o);const c=new rt(.8,.9,.2,8),l=new F({color:15965202,roughness:.9}),h=new R(c,l);h.position.set(0,.1,.8),this.meshGroup.add(h),this.createChicken(0,.25,.75);const u=new R(new st(.85,.2,.85),new F({color:13937677,roughness:.5}));u.position.set(-1.3,.1,0),this.meshGroup.add(u);const d=new R(new st(.85,.2,.85),new F({color:2600544,roughness:.5}));d.position.set(1.3,.1,0),this.meshGroup.add(d)}addChicken(){this.chickenCount++,this.chickenCount===2?(this.createChicken(-.35,.25,.7),this.layDuration=2.6):this.chickenCount>=3&&(this.createChicken(.35,.25,.7),this.layDuration=1.5),this.updateWorldBadge(0)}createChicken(t,e,n){const i=new ft;i.position.set(t,e,n);const s=new F({color:16777215,roughness:.5}),a=new R(new bt(.18,8,8),s);a.scale.set(1,1.2,1.4),a.castShadow=!0,i.add(a);const o=new Qt({color:15158332}),c=new R(new Fe(.06,.12,4),o);c.position.set(0,.2,.1),i.add(c);const l=new Qt({color:15965202}),h=new R(new Fe(.05,.1,4),l);h.rotation.x=Math.PI/2,h.position.set(0,.08,.26),i.add(h);const u=new F({color:14673641}),d=new R(new Fe(.08,.16,4),u);d.rotation.x=-Math.PI/3,d.position.set(0,.12,-.22),i.add(d),this.meshGroup.add(i),this.chickens.push(i)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`🐔 ${zt.t("item_egg")}`,icon:"🥚",cost:0,type:"RECIPE",position:new P(this.position.x,2.7,this.position.z)}),this.updateWorldBadge(0)}updateWorldBadge(t=0){if(this.badge){const e=`${this.feedStock} Yem (${this.chickenCount} 🐔)`;this.badge.updateRecipe(t,e,`${this.chickenCount}x Hız`,this.feedStock>0)}}update(t,e,n,i=1,s=null){if(this.chickens.forEach((a,o)=>{a.rotation.x=Math.sin(n*6+o*2)*.2,a.position.y=.25+Math.abs(Math.sin(n*8+o*1.5))*.04}),e&&(this.inputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.feedStock<8&&e.stack.popItem(gt.CHICKEN_FEED)&&(this.feedStock++,this.updateWorldBadge(0)),this.outputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.eggStock.length>0&&e.stack.canAdd())){const c=this.eggStock.pop(),l=this.eggMeshes.pop();l&&this.meshGroup.remove(l),e.stack.addItem(c),s&&s(c)}if(this.feedStock>0&&this.eggStock.length<this.maxEggCapacity){this.layTimer+=t*i;const a=Math.min(1,this.layTimer/this.layDuration);this.updateWorldBadge(a),this.layTimer>=this.layDuration&&(this.layTimer=0,this.feedStock--,this.eggStock.push(gt.EGG),this.spawnEggMesh(),this.updateWorldBadge(0))}}spawnEggMesh(){const t=new bt(.1,8,8);t.scale(1,1.3,1);const e=new F({color:16316922,roughness:.3}),n=new R(t,e),i=this.eggStock.length-1,s=i%2,a=Math.floor(i/2);n.position.set(1.15+s*.3,.35,-.25+a*.3),n.castShadow=!0,this.meshGroup.add(n),this.eggMeshes.push(n)}}class I_{constructor(t,e,n,i=null){this.scene=t,this.position=new P(e,0,n),this.wheatStock=0,this.eggStock=0,this.breadStock=[],this.maxCapacity=6,this.bakeDuration=ue.PROCESSING.breadTime,this.bakeTimer=0,this.isBaking=!1,this.inputZonePos=new P(e-1.4,0,n),this.outputZonePos=new P(e+1.4,0,n),this.interactionRadius=1.85,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),i&&i.registerObstacle(e,n,2.4,1.8),this.breadMeshes=[],this.buildOvenMesh(),this.buildWorldBadge()}buildOvenMesh(){const t=new st(2.2,.6,1.8),e=new F({color:8359053,roughness:.9}),n=new R(t,e);n.position.y=.3,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new bt(.9,12,10,0,Math.PI*2,0,Math.PI/2),s=new F({color:13849600,roughness:.8}),a=new R(i,s);a.position.set(0,.6,0),a.castShadow=!0,this.meshGroup.add(a);const o=new st(.7,.4,.4),c=new Qt({color:16742719});this.hearth=new R(o,c),this.hearth.position.set(0,.75,.8),this.meshGroup.add(this.hearth);const l=new R(new rt(.16,.18,.9,8),new F({color:5726319}));l.position.set(.5,1.6,-.3),l.castShadow=!0,this.meshGroup.add(l);const h=new R(new st(.9,.3,.9),new F({color:15105570}));h.position.set(-1.4,.15,0),this.meshGroup.add(h);const u=new R(new st(.9,.3,.9),new F({color:2600544}));u.position.set(1.4,.15,0),this.meshGroup.add(u)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`🍞 ${zt.t("unlock_bakery")}`,icon:"🍞",cost:0,type:"RECIPE",position:new P(this.position.x,2.8,this.position.z)}),this.updateWorldBadge(0)}updateWorldBadge(t=0){this.badge&&this.badge.updateRecipe(t,`${this.wheatStock}🌾 + ${this.eggStock}🥚`,"2🌾 + 1🥚",this.isBaking)}update(t,e,n,i=1,s=null){if(this.hearth){const a=.8+Math.sin(n*15)*.2;this.hearth.material.color.setRGB(1,.45*a,.2*a)}if(e&&(this.inputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&(this.wheatStock<4&&e.stack.popItem(gt.WHEAT)&&this.wheatStock++,this.eggStock<3&&e.stack.popItem(gt.EGG)&&this.eggStock++,this.updateWorldBadge()),this.outputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.breadStock.length>0&&e.stack.canAdd())){const c=this.breadStock.pop(),l=this.breadMeshes.pop();l&&this.meshGroup.remove(l),e.stack.addItem(c),s&&s(c)}if(!this.isBaking&&this.wheatStock>=2&&this.eggStock>=1&&this.breadStock.length<this.maxCapacity&&(this.isBaking=!0,this.wheatStock-=2,this.eggStock-=1,this.bakeTimer=0),this.isBaking){this.bakeTimer+=t*i;const a=Math.min(1,this.bakeTimer/this.bakeDuration);this.updateWorldBadge(a),this.bakeTimer>=this.bakeDuration&&(this.isBaking=!1,this.bakeTimer=0,this.breadStock.push(gt.BREAD),this.spawnBreadMesh(),this.updateWorldBadge(0))}}spawnBreadMesh(){const t=new st(.3,.18,.25),e=new F({color:gt.BREAD.color,roughness:.5}),n=new R(t,e),i=this.breadStock.length-1,s=i%2,a=Math.floor(i/2);n.position.set(1.25+s*.35,.4,-.25+a*.3),n.castShadow=!0,this.meshGroup.add(n),this.breadMeshes.push(n)}}class ql{constructor(t,e,n,i=gt.BURGER,s=null){this.scene=t,this.mealType=i,this.position=new P(e,0,n),this.inputStock1=0,this.inputStock2=0,this.mealStock=[],this.maxCapacity=4,this.cookDuration=i.id==="BURGER"?ue.PROCESSING.burgerTime:ue.PROCESSING.pizzaTime,this.cookTimer=0,this.isCooking=!1,this.inputZonePos=new P(e-1.4,0,n),this.outputZonePos=new P(e+1.4,0,n),this.interactionRadius=1.85,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),s&&s.registerObstacle(e,n,2.4,1.6),this.mealMeshes=[],this.buildKitchenMesh(),this.buildWorldBadge()}buildKitchenMesh(){const t=new st(2.4,.9,1.4),e=new F({color:12436423,metalness:.8,roughness:.2}),n=new R(t,e);n.position.y=.45,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new st(1.4,.2,.9),s=new F({color:2899536,roughness:.4}),a=new R(i,s);a.position.set(0,.95,0),this.meshGroup.add(a);const o=new Ae(1.2,.7),c=new Qt({color:this.mealType.id==="BURGER"?15158332:15965202});this.plate=new R(o,c),this.plate.rotation.x=-Math.PI/2,this.plate.position.set(0,1.06,0),this.meshGroup.add(this.plate);const l=new R(new st(.8,.15,.8),new F({color:15105570}));l.position.set(-1.4,.1,0),this.meshGroup.add(l);const h=new R(new st(.8,.15,.8),new F({color:2600544}));h.position.set(1.4,.1,0),this.meshGroup.add(h)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`${this.mealType.icon} ${zt.t(this.mealType.nameKey)}`,icon:this.mealType.icon,cost:0,type:"RECIPE",position:new P(this.position.x,2.7,this.position.z)}),this.updateWorldBadge(0)}updateWorldBadge(t=0){if(this.badge){const e=this.mealType.id==="BURGER",n=e?`${this.inputStock1}🍞 + ${this.inputStock2}🍅`:`${this.inputStock1}🌾 + ${this.inputStock2}🥫`,i=e?"1🍞 + 1🍅":"1🌾 + 1🥫";this.badge.updateRecipe(t,n,i,this.isCooking)}}update(t,e,n,i=1,s=null,a=null){if(this.plate&&(this.plate.material.opacity=.7+Math.sin(n*10)*.3),e){const o=this.mealType.id==="BURGER",c=o?gt.BREAD:gt.WHEAT,l=o?gt.TOMATO:gt.TOMATO_PASTE;if(this.inputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius){if(this.inputStock1<3){const d=e.stack.popItem(c);d&&(this.inputStock1++,a&&a(d,this.mealType))}if(this.inputStock2<3){const d=e.stack.popItem(l);d&&(this.inputStock2++,a&&a(d,this.mealType))}this.updateWorldBadge()}if(this.outputZonePos.distanceTo(e.mesh.position)<=this.interactionRadius&&this.mealStock.length>0&&e.stack.canAdd()){const d=this.mealStock.pop(),f=this.mealMeshes.pop();f&&this.meshGroup.remove(f),e.stack.addItem(d),s&&s(d)}}if(!this.isCooking&&this.inputStock1>=1&&this.inputStock2>=1&&this.mealStock.length<this.maxCapacity&&(this.isCooking=!0,this.inputStock1--,this.inputStock2--,this.cookTimer=0),this.isCooking){this.cookTimer+=t*i;const o=Math.min(1,this.cookTimer/this.cookDuration);this.updateWorldBadge(o),this.cookTimer>=this.cookDuration&&(this.isCooking=!1,this.cookTimer=0,this.mealStock.push(this.mealType),this.spawnMealMesh(),this.updateWorldBadge(0))}}spawnMealMesh(){const t=new F({color:this.mealType.color,roughness:.3});let e;this.mealType.id==="BURGER"?e=new R(new rt(.2,.2,.18,8),t):e=new R(new rt(.25,.25,.06,12),t);const n=this.mealStock.length-1,i=n%2,s=Math.floor(n/2);e.position.set(1.25+i*.35,.35,-.25+s*.3),e.castShadow=!0,this.meshGroup.add(e),this.mealMeshes.push(e)}}class qr{constructor(t,e,n,i=1,s=null){this.scene=t,this.position=new P(e,0,n),this.tableIndex=i,this.isOccupied=!1,this.seatedCustomer=null,this.desiredMeal=null,this.servedMeal=null,this.isEating=!1,this.eatDuration=3.5,this.eatTimer=0,this.uncollectedTip=0,this.tipCoins=[],this.interactionRadius=2,this.seatPos=new P(e,0,n-.7),this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),s&&s.registerObstacle(e,n,1.8,1.8),this.buildTableMesh(),this.buildWorldBadge()}buildTableMesh(){const t=new rt(.9,.9,.08,16),e=new F({color:9268835,roughness:.6}),n=new R(t,e);n.position.y=.85,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new rt(.1,.14,.82,8),s=new R(i,e);s.position.y=.41,s.castShadow=!0,this.meshGroup.add(s);const a=new rt(.5,.5,.06,12),o=new R(a,e);o.position.y=.03,this.meshGroup.add(o);const c=new rt(.4,.4,.09,16),l=new F({color:16119546}),h=new R(c,l);h.position.y=.86,this.meshGroup.add(h),this.createChair(0,-.7,0),this.createChair(0,.7,Math.PI)}createChair(t,e,n){const i=new ft;i.position.set(t,0,e),i.rotation.y=n;const s=new F({color:7162945,roughness:.7}),a=new R(new st(.5,.06,.5),s);a.position.y=.45,a.castShadow=!0;const o=new R(new st(.5,.45,.06),s);o.position.set(0,.7,-.22),o.castShadow=!0;const c=new rt(.04,.04,.45,6),l=new R(c,s);l.position.set(-.2,.22,-.2);const h=l.clone();h.position.x=.2;const u=l.clone();u.position.z=.2;const d=h.clone();d.position.z=.2,i.add(a,o,l,h,u,d),this.meshGroup.add(i)}buildWorldBadge(){this.badge=new Si(this.scene,{title:`🍽️ Masa #${this.tableIndex}`,icon:"🍽️",cost:0,type:"RECIPE",position:new P(this.position.x,2.3,this.position.z)}),this.updateWorldBadge()}updateWorldBadge(){if(this.badge)if(!this.isOccupied)this.badge.updateRecipe(0,"Boş Masa","Müşteri Bekleniyor",!1);else if(this.isEating){const t=Math.min(1,this.eatTimer/this.eatDuration);this.badge.updateRecipe(t,"🍽️ Yiyor...",`${Math.floor(t*100)}%`,!0)}else this.desiredMeal&&this.badge.updateRecipe(0,`${this.desiredMeal.icon} Sipariş`,"Servis Bekleniyor",!1)}seatGuest(t,e=gt.BURGER){this.isOccupied=!0,this.seatedCustomer=t,this.desiredMeal=e,this.servedMeal=null,this.isEating=!1,this.eatTimer=0,this.updateWorldBadge()}serveMeal(t){if(!this.isOccupied||this.isEating||!this.desiredMeal)return!1;if(t.id===this.desiredMeal.id){this.servedMeal=t,this.isEating=!0,this.eatTimer=0;const e=new F({color:t.color});return this.tableMealMesh=new R(new rt(.18,.18,.1,8),e),this.tableMealMesh.position.set(0,.95,0),this.meshGroup.add(this.tableMealMesh),this.updateWorldBadge(),!0}return!1}update(t,e,n,i,s){if(this.isEating&&(this.eatTimer+=t,this.updateWorldBadge(),this.eatTimer>=this.eatDuration)){this.isEating=!1,this.tableMealMesh&&(this.meshGroup.remove(this.tableMealMesh),this.tableMealMesh=null);const a=(this.desiredMeal?this.desiredMeal.price:50)+25;this.spawnTipBurst(a,i),this.seatedCustomer&&(this.seatedCustomer.state="LEAVING",this.seatedCustomer=null),this.isOccupied=!1,this.desiredMeal=null,this.updateWorldBadge()}if(e&&this.isOccupied&&!this.isEating&&this.desiredMeal&&this.position.distanceTo(e.mesh.position)<=this.interactionRadius){const o=e.stack.popItem(this.desiredMeal);o&&(this.serveMeal(o),s&&s(o,this.tableIndex))}this.updateTipCoins(t,e)}spawnTipBurst(t,e){e&&e(t);for(let n=0;n<4;n++){const i=new rt(.14,.14,.05,10),s=new F({color:15844367,metalness:.8}),a=new R(i,s);a.position.set(this.position.x+(Math.random()-.5)*.6,1,this.position.z+(Math.random()-.5)*.6),this.scene.add(a),this.tipCoins.push({mesh:a,isMagnet:!1})}}updateTipCoins(t,e){for(let n=this.tipCoins.length-1;n>=0;n--){const i=this.tipCoins[n];e&&i.mesh.position.distanceTo(e.mesh.position)<4.5&&(i.isMagnet=!0),i.isMagnet&&e&&(i.mesh.position.lerp(e.mesh.position,t*15),i.mesh.position.y+=.8*t,i.mesh.position.distanceTo(e.mesh.position)<.6&&(this.scene.remove(i.mesh),this.tipCoins.splice(n,1)))}}}class D_{constructor(t,e,n,i=null){this.scene=t,this.position=new P(e,0,n),this.cashierZonePos=new P(e,0,n-1.1),this.serviceQueueStartPos=new P(e,0,n+1.2),this.interactionRadius=1.8,this.isCashierPresent=!1,this.hasHiredCashier=!1,this.uncollectedMoney=0,this.coins=[],this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),i&&i.registerObstacle(e,n,2.4,1.1),this.buildRegisterMesh()}buildRegisterMesh(){const t=new st(2.4,.88,1.1),e=new F({color:ue.COLORS.REGISTER,roughness:.6}),n=new R(t,e);n.position.y=.44,n.castShadow=!0,n.receiveShadow=!0,this.meshGroup.add(n);const i=new st(2.32,.06,1.02),s=new F({color:2899536,roughness:.5,metalness:.2}),a=new R(i,s);a.position.y=.91,a.receiveShadow=!0,this.meshGroup.add(a);const o=new st(1.2,.02,.75),c=new F({color:1713455,roughness:.9}),l=new R(o,c);l.position.set(-.45,.945,0),this.meshGroup.add(l);const h=new st(.5,.35,.4),u=new F({color:1976110}),d=new R(h,u);d.position.set(.4,1.08,0),this.meshGroup.add(d);const f=new Ae(.35,.25),_=new Qt({color:3066993}),g=new R(f,_);g.rotation.x=-Math.PI/6,g.position.set(.4,1.23,-.15),this.meshGroup.add(g);const m=new Ae(1.6,1),p=new Qt({color:3426654}),v=new R(m,p);v.rotation.x=-Math.PI/2,v.position.set(0,.02,-1.1),this.meshGroup.add(v)}getQueuePosition(t){return new P(this.position.x,0,this.position.z+1.2+t*1.2)}spawnCoinBurst(t,e,n=[]){e&&t>0&&e(t,n);const i=Math.min(Math.max(Math.floor(t/3),3),6);for(let s=0;s<i;s++){const a=new rt(.16,.16,.06,12),o=new F({color:15844367,metalness:.8,roughness:.2}),c=new R(a,o);c.position.set(this.position.x+(Math.random()-.5)*.8,1.1,this.position.z+(Math.random()-.5)*.4);const l=new P((Math.random()-.5)*4,3.5+Math.random()*2,(Math.random()-.5)*4);this.scene.add(c),this.coins.push({mesh:c,velocity:l,isMagnet:!1})}}update(t,e){if(this.hasHiredCashier)this.isCashierPresent=!0;else if(e){const n=this.cashierZonePos.distanceTo(e.mesh.position);this.isCashierPresent=n<=this.interactionRadius}else this.isCashierPresent=!1;for(let n=this.coins.length-1;n>=0;n--){const i=this.coins[n];i.isMagnet?e&&(i.mesh.position.lerp(e.mesh.position,t*16),i.mesh.position.y+=.8*t,i.mesh.position.distanceTo(e.mesh.position)<.6&&(this.scene.remove(i.mesh),this.coins.splice(n,1))):(i.velocity.y-=t*18,i.mesh.position.addScaledVector(i.velocity,t),i.mesh.rotation.y+=t*10,i.mesh.position.y<=.1&&(i.mesh.position.y=.1,i.velocity.y*=-.4,i.velocity.x*=.6,i.velocity.z*=.6),e&&i.mesh.position.distanceTo(e.mesh.position)<(this.hasHiredCashier?10:4)&&(i.isMagnet=!0))}}}const jt={ENTERING:"ENTERING",GOING_TO_SHELF:"GOING_TO_SHELF",WAITING_FOR_STOCK:"WAITING_FOR_STOCK",QUEUEING:"QUEUEING",PAYING:"PAYING",GOING_TO_TABLE:"GOING_TO_TABLE",WAITING_FOR_TABLE:"WAITING_FOR_TABLE",SEATED:"SEATED",LEAVING:"LEAVING"};class U_{constructor(t,e,n=[],i=!1){this.scene=t,this.desiredItemTypes=[...n],this.isRestaurantGuest=i,this.targetShelf=null,this.targetTable=null,this.state=jt.ENTERING,this.speed=ue.CUSTOMER.walkSpeed,this.payDuration=ue.CUSTOMER.payTime,this.payTimer=0,this.queueIndex=0,this.shelfWaitIndex=0,this.tableWaitIndex=0,this.mesh=this.createCustomerMesh(),this.mesh.position.copy(e),this.scene.add(this.mesh),this.stack=new $a(this.mesh,4),this.isFinished=!1,this.walkCycle=0,this.thoughtBubble=this.createThoughtBubble(),this.mesh.add(this.thoughtBubble),this.updateThoughtBubble()}createCustomerMesh(){const t=new ft,e=[16729943,16753922,3069299,2003199,10837738,16739201,53971,16760904],n=e[Math.floor(Math.random()*e.length)],i=new rt(.3,.26,.65,10),s=new F({color:n,roughness:.4}),a=new R(i,s);a.position.y=.6,a.castShadow=!0,t.add(a);const o=new bt(.28,10,10),c=new F({color:16767916,roughness:.6}),l=new R(o,c);l.position.y=1.18,l.castShadow=!0,t.add(l);const h=new bt(.3,8,8),u=[2899536,7162945,14673641,15844367,11745593],d=new F({color:u[Math.floor(Math.random()*u.length)]}),f=new R(h,d);f.position.set(0,1.25,-.04),t.add(f);const _=new F({color:2962486});return this.leftLeg=new R(new rt(.09,.08,.32,6),_),this.leftLeg.position.set(-.14,.16,0),this.leftLeg.castShadow=!0,this.rightLeg=this.leftLeg.clone(),this.rightLeg.position.x=.14,t.add(this.leftLeg,this.rightLeg),t}createThoughtBubble(){const t=new ft;t.position.set(0,1.75,0);const e=document.createElement("canvas");e.width=128,e.height=128,this.bubbleCanvas=e,this.bubbleCtx=e.getContext("2d"),this.bubbleTexture=new xo(e);const n=new Ya({map:this.bubbleTexture,transparent:!0}),i=new Yh(n);return i.scale.set(.65,.65,.65),t.add(i),t.visible=!1,t}updateThoughtBubble(){if(!this.thoughtBubble||!this.bubbleCtx)return;if(this.desiredItemTypes.length===0||this.state===jt.LEAVING||this.state===jt.SEATED){this.thoughtBubble.visible=!1;return}const t=this.desiredItemTypes[0],e=this.bubbleCtx;e.clearRect(0,0,128,128),e.beginPath(),e.arc(64,60,48,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.lineWidth=6,e.strokeStyle="#2c3e50",e.stroke(),e.beginPath(),e.arc(42,114,8,0,Math.PI*2),e.fillStyle="#ffffff",e.fill(),e.stroke(),e.font="52px sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(t.icon||"🛍️",64,62),this.bubbleTexture.needsUpdate=!0,this.thoughtBubble.visible=!0}update(t,e=[],n=null,i=[],s=[],a){const o=this.state!==jt.PAYING&&this.state!==jt.WAITING_FOR_STOCK&&this.state!==jt.WAITING_FOR_TABLE&&this.state!==jt.SEATED;switch(this.applyCrowdSeparation(s,t),this.state){case jt.ENTERING:if(this.isRestaurantGuest&&i.length>0){const m=new P(-37,0,6.5);this.walkTowards(m,t,()=>{this.state=jt.GOING_TO_TABLE})}else{const m=new P(5,0,6.5);this.walkTowards(m,t,()=>{this.chooseNextShelf(e)})}break;case jt.GOING_TO_TABLE:const c=i.find(m=>!m.isOccupied);c?(this.targetTable=c,this.walkTowards(c.seatPos,t,()=>{this.state=jt.SEATED;const m=Math.random()>.5?gt.BURGER:gt.PIZZA;c.seatGuest(this,m),this.thoughtBubble.visible=!1})):this.state=jt.WAITING_FOR_TABLE;break;case jt.WAITING_FOR_TABLE:const l=new P(-37,0,7.5+this.tableWaitIndex*.85);this.walkTowards(l,t),i.find(m=>!m.isOccupied)&&this.tableWaitIndex===0&&(this.state=jt.GOING_TO_TABLE);break;case jt.SEATED:this.mesh.rotation.y=0;break;case jt.GOING_TO_SHELF:case jt.WAITING_FOR_STOCK:if(this.desiredItemTypes.length===0){this.state=jt.QUEUEING;break}const u=this.desiredItemTypes[0],d=e.find(m=>m.acceptedType.id===u.id);if(d){this.targetShelf=d;const m=d.getWaitQueuePosition(this.shelfWaitIndex);if(this.walkTowards(m,t,()=>{this.state=jt.WAITING_FOR_STOCK,this.mesh.rotation.y=Ve.lerp(this.mesh.rotation.y,Math.PI,t*8)}),d.hasStock()&&this.shelfWaitIndex===0){const p=d.takeItem();p&&(this.stack.addItem(p),this.desiredItemTypes.shift(),this.updateThoughtBubble(),this.desiredItemTypes.length>0?this.chooseNextShelf(e):this.state=jt.QUEUEING)}}else this.stack.getCount()>0?this.state=jt.QUEUEING:this.state=jt.LEAVING;break;case jt.QUEUEING:if(!n)break;this.thoughtBubble.visible=!1;const f=n.getQueuePosition(this.queueIndex);this.walkTowards(f,t,()=>{this.queueIndex===0&&(this.state=jt.PAYING)});break;case jt.PAYING:if(this.mesh.rotation.y=Ve.lerp(this.mesh.rotation.y,Math.PI,t*8),n&&n.isCashierPresent&&(this.payTimer+=t,this.payTimer>=this.payDuration)){let m=0;const p=[];for(;this.stack.getCount()>0;){const v=this.stack.popItem();m+=v.price,p.push(v)}n.spawnCoinBurst(m,a,p),this.state=jt.LEAVING}break;case jt.LEAVING:this.thoughtBubble.visible=!1;const _=this.isRestaurantGuest?-37:5,g=new P(_,0,16);this.walkTowards(g,t,()=>{this.isFinished=!0,this.scene.remove(this.mesh)});break}o?(this.walkCycle+=t*12,this.leftLeg.rotation.x=Math.sin(this.walkCycle)*.5,this.rightLeg.rotation.x=-Math.sin(this.walkCycle)*.5,this.mesh.position.y=Math.abs(Math.sin(this.walkCycle*2))*.05):(this.leftLeg.rotation.x=Ve.lerp(this.leftLeg.rotation.x,0,t*10),this.rightLeg.rotation.x=Ve.lerp(this.rightLeg.rotation.x,0,t*10),this.mesh.position.y=Ve.lerp(this.mesh.position.y,0,t*10)),this.stack.update(t,o)}chooseNextShelf(t){if(this.desiredItemTypes.length===0){this.state=jt.QUEUEING;return}this.updateThoughtBubble(),this.state=jt.GOING_TO_SHELF}applyCrowdSeparation(t,e){if(this.state===jt.SEATED)return;const n=.72,i=this.mesh.position;for(const s of t){if(s===this||s.state===jt.SEATED)continue;const a=s.mesh.position,o=i.x-a.x,c=i.z-a.z,l=o*o+c*c;if(l<n*n&&l>1e-4){const h=Math.sqrt(l),u=(n-h)/h*1.5*e;i.x+=o*u,i.z+=c*u}}}walkTowards(t,e,n){const i=new P().subVectors(t,this.mesh.position);i.y=0;const s=i.length();if(s<.2){n&&n();return}i.normalize(),this.mesh.position.addScaledVector(i,Math.min(this.speed*e,s));const a=Math.atan2(i.x,i.z);this.mesh.rotation.y=Ve.lerp(this.mesh.rotation.y,a,e*12)}}class O_{constructor(t,e=[gt.TOMATO]){this.scene=t,this.unlockedProducts=[...e],this.customers=[],this.spawnTimer=0,this.spawnInterval=ue.CUSTOMER.spawnInterval,this.maxActive=ue.CUSTOMER.maxActive,this.hasRestaurant=!1,this.demandBag=[]}setUnlockedProducts(t){this.unlockedProducts=[...t],this.demandBag=[]}setRestaurantUnlocked(t=!0){this.hasRestaurant=t}getBalancedNextProduct(t){return!t||t.length===0?gt.TOMATO:(this.demandBag=this.demandBag.filter(e=>t.some(n=>n.id===e.id)),this.demandBag.length===0&&(this.demandBag=[...t].sort(()=>Math.random()-.5)),this.demandBag.pop()||t[0])}update(t,e=[],n=null,i=[],s){this.customers.length<this.maxActive&&(this.spawnTimer+=t,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnCustomer(i,e))),this.customers.filter(c=>c.state==="QUEUEING"||c.state==="PAYING").forEach((c,l)=>{c.queueIndex=l}),e.forEach(c=>{this.customers.filter(h=>(h.state==="GOING_TO_SHELF"||h.state==="WAITING_FOR_STOCK")&&h.desiredItemTypes.length>0&&h.desiredItemTypes[0].id===c.acceptedType.id).forEach((h,u)=>{h.shelfWaitIndex=u})}),this.customers.filter(c=>c.state==="WAITING_FOR_TABLE").forEach((c,l)=>{c.tableWaitIndex=l});for(let c=this.customers.length-1;c>=0;c--){const l=this.customers[c];l.update(t,e,n,i,this.customers,s),l.isFinished&&this.customers.splice(c,1)}}spawnCustomer(t=[],e=[]){const n=t.some(u=>!u.isOccupied),i=this.hasRestaurant&&n&&Math.random()<.35,a=(i?-37:5)+(Math.random()-.5)*3,o=new P(a,0,16+Math.random()*2);let c=[];if(e&&e.length>0){const u=new Map;e.forEach(d=>{d.acceptedType&&!u.has(d.acceptedType.id)&&u.set(d.acceptedType.id,d.acceptedType)}),c=Array.from(u.values())}c.length===0&&(c=this.unlockedProducts.length>0?this.unlockedProducts:[gt.TOMATO]);const l=[];if(!i){const u=c.length;let d=1;if(u>=3){const _=Math.random();d=_<.35?1:_<.7?2:3}else u===2&&(d=Math.random()<.5?1:2);const f=this.getBalancedNextProduct(c);if(l.push(f),d>1){const _=c.filter(g=>g.id!==f.id).sort(()=>Math.random()-.5);for(let g=0;g<d-1&&g<_.length;g++)l.push(_[g])}}const h=new U_(this.scene,o,l,i);this.customers.push(h)}}class Ne{constructor(t,e,n,i,s,a,o="✨"){this.scene=t,this.position=new P(e,0,n),this.totalCost=i,this.remainingCost=i,this.title=s,this.icon=o,this.onUnlocked=a,this.isUnlocked=!1,this.radius=1.35,this.drainTimer=0,this.dwellTimer=0,this.meshGroup=new ft,this.meshGroup.position.copy(this.position),this.scene.add(this.meshGroup),this.flyingCoins=[],this.buildZoneMesh(),this.buildWorldBadge()}buildZoneMesh(){const t=new vo(.85,1.25,32),e=new Qt({color:3069299,side:pn,transparent:!0,opacity:.85});this.ring=new R(t,e),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.03,this.meshGroup.add(this.ring);const n=new Za(.82,32),i=new Qt({color:3069299,transparent:!0,opacity:.3});this.innerCircle=new R(n,i),this.innerCircle.rotation.x=-Math.PI/2,this.innerCircle.position.y=.02,this.meshGroup.add(this.innerCircle);const s=new rt(.3,.3,.05,16),a=new F({color:15844367,metalness:.7,roughness:.2});this.centerDisc=new R(s,a),this.centerDisc.position.y=.06,this.meshGroup.add(this.centerDisc)}buildWorldBadge(){this.badge=new Si(this.scene,{title:this.title,icon:this.icon,cost:this.totalCost,color:"#2ed573",position:new P(this.position.x,2.2,this.position.z)})}update(t,e,n,i){if(this.isUnlocked)return;const s=1+Math.sin(Date.now()*.006)*.07;if(this.ring.scale.set(s,s,1),this.centerDisc.rotation.y+=t*2,e)if(this.position.distanceTo(e.mesh.position)<=this.radius&&n>0&&this.remainingCost>0){if(this.dwellTimer+=t,this.dwellTimer>=.3&&(this.drainTimer+=t,this.drainTimer>=.06)){this.drainTimer=0;const o=Math.min(Math.min(3,n),this.remainingCost);this.remainingCost-=o,i&&i(o),this.badge.updateCost(this.remainingCost),this.spawnFlyingCash(e.mesh.position),this.remainingCost<=0&&this.unlock()}}else this.dwellTimer=0,this.drainTimer=0;this.updateFlyingCash(t)}spawnFlyingCash(t){const e=new Ae(.25,.14),n=new Qt({color:3066993,side:pn}),i=new R(e,n);i.position.copy(t),i.position.y+=.8+Math.random()*.2,i.rotation.x=Math.random()*Math.PI,this.scene.add(i),this.flyingCoins.push({mesh:i,target:new P(this.position.x,.1,this.position.z),progress:0,speed:3.5+Math.random()*1.5,startPos:i.position.clone()})}updateFlyingCash(t){for(let e=this.flyingCoins.length-1;e>=0;e--){const n=this.flyingCoins[e];n.progress+=t*n.speed;const i=Math.min(1,n.progress);n.mesh.position.lerpVectors(n.startPos,n.target,i),n.mesh.position.y+=Math.sin(i*Math.PI)*.5,n.mesh.rotation.y+=t*15,i>=1&&(this.scene.remove(n.mesh),this.flyingCoins.splice(e,1))}}unlock(){this.isUnlocked=!0,this.scene.remove(this.meshGroup),this.flyingCoins.forEach(t=>this.scene.remove(t.mesh)),this.flyingCoins=[],this.badge&&this.badge.destroy(),this.spawnCelebrationConfetti(),this.onUnlocked&&this.onUnlocked()}spawnCelebrationConfetti(){const t=[15844367,15158332,3447003,3066993,10181046];for(let e=0;e<20;e++){const n=new Ae(.12,.12),i=new Qt({color:t[Math.floor(Math.random()*t.length)],side:pn}),s=new R(n,i);s.position.copy(this.position),s.position.y=.5;const a=new P((Math.random()-.5)*6,4+Math.random()*3,(Math.random()-.5)*6);this.scene.add(s);let o=0;const c=()=>{o+=.03,a.y-=.15,s.position.addScaledVector(a,.03),s.rotation.x+=.2,s.rotation.y+=.3,o<1&&s.position.y>.05?requestAnimationFrame(c):this.scene.remove(s)};c()}}}function Zn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Kh(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var xn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},or={duration:.5,overwrite:!1,delay:0},ja,Be,fe,bn=1e8,se=1/bn,Ta=Math.PI*2,N_=Ta/4,k_=0,$h=Math.sqrt,F_=Math.cos,B_=Math.sin,Oe=function(t){return typeof t=="string"},Me=function(t){return typeof t=="function"},Qn=function(t){return typeof t=="number"},Ja=function(t){return typeof t>"u"},Gn=function(t){return typeof t=="object"},nn=function(t){return t!==!1},Qa=function(){return typeof window<"u"},Yr=function(t){return Me(t)||Oe(t)},jh=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Xe=Array.isArray,G_=/random\([^)]+\)/g,z_=/,\s*/g,Yl=/(?:-?\.?\d|\.)+/gi,Jh=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,aa=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Qh=/[+-]=-?[.\d]+/,H_=/[^,'"\[\]\s]+/gi,V_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ge,On,ba,tc,vn={},oo={},tu,eu=function(t){return(oo=Cs(t,vn))&&an},ec=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},ar=function(t,e){return!e&&console.warn(t)},nu=function(t,e){return t&&(vn[t]=e)&&oo&&(oo[t]=e)||vn},cr=function(){return 0},W_={suppressEvents:!0,isStart:!0,kill:!1},Kr={suppressEvents:!0,kill:!1},X_={suppressEvents:!0},nc={},mi=[],Aa={},iu,dn={},ca={},Zl=30,$r=[],ic="",sc=function(t){var e=t[0],n,i;if(Gn(e)||Me(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=$r.length;i--&&!$r[i].targetTest(e););n=$r[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Tu(t[i],n)))||t.splice(i,1);return t},Gi=function(t){return t._gsap||sc(An(t))[0]._gsap},su=function(t,e,n){return(n=t[e])&&Me(n)?t[e]():Ja(n)&&t.getAttribute&&t.getAttribute(e)||n},sn=function(t,e){return(t=t.split(",")).forEach(e)||t},we=function(t){return Math.round(t*1e5)/1e5||0},me=function(t){return Math.round(t*1e7)/1e7||0},ws=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},q_=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},ao=function(){var t=mi.length,e=mi.slice(0),n,i;for(Aa={},mi.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},rc=function(t){return!!(t._initted||t._startAt||t.add)},ru=function(t,e,n,i){mi.length&&!Be&&ao(),t.render(e,n,!!(Be&&e<0&&rc(t))),mi.length&&!Be&&ao()},ou=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(H_).length<2?e:Oe(t)?t.trim():t},au=function(t){return t},Mn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Y_=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Cs=function(t,e){for(var n in e)t[n]=e[n];return t},Kl=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Gn(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},co=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},tr=function(t){var e=t.parent||ge,n=t.keyframes?Y_(Xe(t.keyframes)):Mn;if(nn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Z_=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},cu=function(t,e,n,i,s){var a=t[i],o;if(s)for(o=e[s];a&&a[s]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=a,e.parent=e._dp=t,e},wo=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,a=e._next;s?s._next=a:t[n]===e&&(t[n]=a),a?a._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},xi=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},zi=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},K_=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Ra=function(t,e,n,i){return t._startAt&&(Be?t._startAt.revert(Kr):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},$_=function r(t){return!t||t._ts&&r(t.parent)},$l=function(t){return t._repeat?Ps(t._tTime,t=t.duration()+t._rDelay)*t:0},Ps=function(t,e){var n=Math.floor(t=me(t/e));return t&&n===t?n-1:n},lo=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},yo=function(t){return t._end=me(t._start+(t._tDur/Math.abs(t._ts||t._rts||se)||0))},Eo=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=me(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),yo(t),n._dirty||zi(n,t)),t},lu=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=lo(t.rawTime(),e),(!e._dur||_r(0,e.totalDuration(),n)-e._tTime>se)&&e.render(n,!0)),zi(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-se}},Fn=function(t,e,n,i){return e.parent&&xi(e),e._start=me((Qn(n)?n:n||t!==ge?yn(t,n,e):t._time)+e._delay),e._end=me(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),cu(t,e,"_first","_last",t._sort?"_start":0),Ca(e)||(t._recent=e),i||lu(t,e),t._ts<0&&Eo(t,t._tTime),t},hu=function(t,e){return(vn.ScrollTrigger||ec("scrollTrigger",e))&&vn.ScrollTrigger.create(e,t)},uu=function(t,e,n,i,s){if(ac(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!Be&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&iu!==mn.frame)return mi.push(t),t._lazy=[s,i],1},j_=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Ca=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},J_=function(t,e,n,i){var s=t.ratio,a=e<0||!e&&(!t._start&&j_(t)&&!(!t._initted&&Ca(t))||(t._ts<0||t._dp._ts<0)&&!Ca(t))?0:1,o=t._rDelay,c=0,l,h,u;if(o&&t._repeat&&(c=_r(0,t._tDur,e),h=Ps(c,o),t._yoyo&&h&1&&(a=1-a),h!==Ps(t._tTime,o)&&(s=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==s||Be||i||t._zTime===se||!e&&t._zTime){if(!t._initted&&uu(t,e,i,n,c))return;for(u=t._zTime,t._zTime=e||(n?se:0),n||(n=e&&!u),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&Ra(t,e,n,!0),t._onUpdate&&!n&&gn(t,"onUpdate"),c&&t._repeat&&!n&&t.parent&&gn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&xi(t,1),!n&&!Be&&(gn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Q_=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ls=function(t,e,n,i){var s=t._repeat,a=me(e)||0,o=t._tTime/t._tDur;return o&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=s?s<0?1e10:me(a*(s+1)+t._rDelay*s):a,o>0&&!i&&Eo(t,t._tTime=t._tDur*o),t.parent&&yo(t),n||zi(t.parent,t),t},jl=function(t){return t instanceof Qe?zi(t):Ls(t,t._dur)},tx={_start:0,endTime:cr,totalDuration:cr},yn=function r(t,e,n){var i=t.labels,s=t._recent||tx,a=t.duration()>=bn?s.endTime(!1):t._dur,o,c,l;return Oe(e)&&(isNaN(e)||e in i)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?s:n).totalDuration()/100:1)):o<0?(e in i||(i[e]=a),i[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&n&&(c=c/100*(Xe(n)?n[0]:n).totalDuration()),o>1?r(t,e.substr(0,o-1),n)+c:a+c)):e==null?a:+e},er=function(t,e,n){var i=Qn(e[1]),s=(i?2:1)+(t<2?0:1),a=e[s],o,c;if(i&&(a.duration=e[1]),a.parent=n,t){for(o=a,c=n;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=nn(c.vars.inherit)&&c.parent;a.immediateRender=nn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[s-1]}return new Te(e[0],a,e[s+1])},wi=function(t,e){return t||t===0?e(t):e},_r=function(t,e,n){return n<t?t:n>e?e:n},We=function(t,e){return!Oe(t)||!(e=V_.exec(t))?"":e[1]},ex=function(t,e,n){return wi(n,function(i){return _r(t,e,i)})},Pa=[].slice,du=function(t,e){return t&&Gn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Gn(t[0]))&&!t.nodeType&&t!==On},nx=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Oe(i)&&!e||du(i,1)?(s=n).push.apply(s,An(i)):n.push(i)})||n},An=function(t,e,n){return fe&&!e&&fe.selector?fe.selector(t):Oe(t)&&!n&&(ba||!Is())?Pa.call((e||tc).querySelectorAll(t),0):Xe(t)?nx(t,n):du(t)?Pa.call(t,0):t?[t]:[]},La=function(t){return t=An(t)[0]||ar("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return An(e,n.querySelectorAll?n:n===t?ar("Invalid scope")||tc.createElement("div"):t)}},fu=function(t){return t.sort(function(){return .5-Math.random()})},pu=function(t){if(Me(t))return t;var e=Gn(t)?t:{each:t},n=Hi(e.ease),i=e.from||0,s=parseFloat(e.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=e.axis,h=i,u=i;return Oe(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(h=i[0],u=i[1]),function(d,f,_){var g=(_||e).length,m=a[g],p,v,x,S,T,b,E,I,M;if(!m){if(M=e.grid==="auto"?0:(e.grid||[1,bn])[1],!M){for(E=-bn;E<(E=_[M++].getBoundingClientRect().left)&&M<g;);M<g&&M--}for(m=a[g]=[],p=c?Math.min(M,g)*h-.5:i%M,v=M===bn?0:c?g*u/M-.5:i/M|0,E=0,I=bn,b=0;b<g;b++)x=b%M-p,S=v-(b/M|0),m[b]=T=l?Math.abs(l==="y"?S:x):$h(x*x+S*S),T>E&&(E=T),T<I&&(I=T);i==="random"&&fu(m),m.max=E-I,m.min=I,m.v=g=(parseFloat(e.amount)||parseFloat(e.each)*(M>g?g-1:l?l==="y"?g/M:M:Math.max(M,g/M))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=We(e.amount||e.each)||0,n=n&&g<0?mx(n):n}return g=(m[d]-m.min)/m.max||0,me(m.b+(n?n(g):g)*m.v)+m.u}},Ia=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=me(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Qn(n)?0:We(n))}},mu=function(t,e){var n=Xe(t),i,s;return!n&&Gn(t)&&(i=n=t.radius||bn,t.values?(t=An(t.values),(s=!Qn(t[0]))&&(i*=i)):t=Ia(t.increment)),wi(e,n?Me(t)?function(a){return s=t(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=bn,h=0,u=t.length,d,f;u--;)s?(d=t[u].x-o,f=t[u].y-c,d=d*d+f*f):d=Math.abs(t[u]-o),d<l&&(l=d,h=u);return h=!i||l<=i?t[h]:a,s||h===a||Qn(a)?h:h+We(a)}:Ia(t))},gu=function(t,e,n,i){return wi(Xe(t)?!e:n===!0?!!(n=0):!i,function(){return Xe(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},ix=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,a){return a(s)},i)}},sx=function(t,e){return function(n){return t(parseFloat(n))+(e||We(n))}},rx=function(t,e,n){return xu(t,e,0,1,n)},_u=function(t,e,n){return wi(n,function(i){return t[~~e(i)]})},ox=function r(t,e,n){var i=e-t;return Xe(t)?_u(t,r(0,t.length),e):wi(n,function(s){return(i+(s-t)%i)%i+t})},ax=function r(t,e,n){var i=e-t,s=i*2;return Xe(t)?_u(t,r(0,t.length-1),e):wi(n,function(a){return a=(s+(a-t)%s)%s||0,t+(a>i?s-a:a)})},lr=function(t){return t.replace(G_,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(z_);return gu(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},xu=function(t,e,n,i,s){var a=e-t,o=i-n;return wi(s,function(c){return n+((c-t)/a*o||0)})},cx=function r(t,e,n,i){var s=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!s){var a=Oe(t),o={},c,l,h,u,d;if(n===!0&&(i=1)&&(n=null),a)t={p:t},e={p:e};else if(Xe(t)&&!Xe(e)){for(h=[],u=t.length,d=u-2,l=1;l<u;l++)h.push(r(t[l-1],t[l]));u--,s=function(_){_*=u;var g=Math.min(d,~~_);return h[g](_-g)},n=e}else i||(t=Cs(Xe(t)?[]:{},t));if(!h){for(c in e)oc.call(o,t,c,"get",e[c]);s=function(_){return hc(_,o)||(a?t.p:t)}}}return wi(n,s)},Jl=function(t,e,n){var i=t.labels,s=bn,a,o,c;for(a in i)o=i[a]-e,o<0==!!n&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},gn=function(t,e,n){var i=t.vars,s=i[e],a=fe,o=t._ctx,c,l,h;if(s)return c=i[e+"Params"],l=i.callbackScope||t,n&&mi.length&&ao(),o&&(fe=o),h=c?s.apply(l,c):s.call(l),fe=a,h},Zs=function(t){return xi(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Be),t.progress()<1&&gn(t,"onInterrupt"),t},vs,vu=[],Mu=function(t){if(t)if(t=!t.name&&t.default||t,Qa()||t.headless){var e=t.name,n=Me(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:cr,render:hc,add:oc,kill:Tx,modifier:Ex,rawVars:0},a={targetTest:0,get:0,getSetter:lc,aliases:{},register:0};if(Is(),t!==i){if(dn[e])return;Mn(i,Mn(co(t,s),a)),Cs(i.prototype,Cs(s,co(t,a))),dn[i.prop=e]=i,t.targetTest&&($r.push(i),nc[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}nu(e,i),t.register&&t.register(an,i,rn)}else vu.push(t)},ie=255,Ks={aqua:[0,ie,ie],lime:[0,ie,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ie],navy:[0,0,128],white:[ie,ie,ie],olive:[128,128,0],yellow:[ie,ie,0],orange:[ie,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ie,0,0],pink:[ie,192,203],cyan:[0,ie,ie],transparent:[ie,ie,ie,0]},la=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ie+.5|0},Su=function(t,e,n){var i=t?Qn(t)?[t>>16,t>>8&ie,t&ie]:0:Ks.black,s,a,o,c,l,h,u,d,f,_;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ks[t])i=Ks[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+s+s+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&ie,i&ie,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&ie,t&ie]}else if(t.substr(0,3)==="hsl"){if(i=_=t.match(Yl),!e)c=+i[0]%360/360,l=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(l+1):h+l-h*l,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=la(c+1/3,s,a),i[1]=la(c,s,a),i[2]=la(c-1/3,s,a);else if(~t.indexOf("="))return i=t.match(Jh),n&&i.length<4&&(i[3]=1),i}else i=t.match(Yl)||Ks.transparent;i=i.map(Number)}return e&&!_&&(s=i[0]/ie,a=i[1]/ie,o=i[2]/ie,u=Math.max(s,a,o),d=Math.min(s,a,o),h=(u+d)/2,u===d?c=l=0:(f=u-d,l=h>.5?f/(2-u-d):f/(u+d),c=u===s?(a-o)/f+(a<o?6:0):u===a?(o-s)/f+2:(s-a)/f+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},wu=function(t){var e=[],n=[],i=-1;return t.split(gi).forEach(function(s){var a=s.match(xs)||[];e.push.apply(e,a),n.push(i+=a.length+1)}),e.c=n,e},Ql=function(t,e,n){var i="",s=(t+i).match(gi),a=e?"hsla(":"rgba(",o=0,c,l,h,u;if(!s)return t;if(s=s.map(function(d){return(d=Su(d,e,1))&&a+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=wu(t),c=n.c,c.join(i)!==h.c.join(i)))for(l=t.replace(gi,"1").split(xs),u=l.length-1;o<u;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!l)for(l=t.split(gi),u=l.length-1;o<u;o++)i+=l[o]+s[o];return i+l[u]},gi=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ks)r+="|"+t+"\\b";return new RegExp(r+")","gi")}(),lx=/hsl[a]?\(/,yu=function(t){var e=t.join(" "),n;if(gi.lastIndex=0,gi.test(e))return n=lx.test(e),t[1]=Ql(t[1],n),t[0]=Ql(t[0],n,wu(t[1])),!0},hr,mn=function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,a=s,o=[],c,l,h,u,d,f,_=function g(m){var p=r()-i,v=m===!0,x,S,T,b;if((p>t||p<0)&&(n+=p-e),i+=p,T=i-n,x=T-a,(x>0||v)&&(b=++u.frame,d=T-u.time*1e3,u.time=T=T/1e3,a+=x+(x>=s?4:s-x),S=1),v||(c=l(g)),S)for(f=0;f<o.length;f++)o[f](T,d,b,m)};return u={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){tu&&(!ba&&Qa()&&(On=ba=window,tc=On.document||{},vn.gsap=an,(On.gsapVersions||(On.gsapVersions=[])).push(an.version),eu(oo||On.GreenSockGlobals||!On.gsap&&On||{}),vu.forEach(Mu)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&u.sleep(),l=h||function(m){return setTimeout(m,a-u.time*1e3+1|0)},hr=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(c),hr=0,l=cr},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),a=u.time*1e3+s},add:function(m,p,v){var x=p?function(S,T,b,E){m(S,T,b,E),u.remove(x)}:m;return u.remove(m),o[v?"unshift":"push"](x),Is(),x},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&f>=p&&f--},_listeners:o},u}(),Is=function(){return!hr&&mn.wake()},$t={},hx=/^[\d.\-M][\d.\-,\s]/,ux=/["']/g,dx=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,a=n.length,o,c,l;s<a;s++)c=n[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[i]=isNaN(l)?l.replace(ux,"").trim():+l,i=c.substr(o+1).trim();return e},fx=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},px=function(t){var e=(t+"").split("("),n=$t[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[dx(e[1])]:fx(t).split(",").map(ou)):$t._CE&&hx.test(t)?$t._CE("",t):n},mx=function(t){return function(e){return 1-t(1-e)}},Hi=function(t,e){return t&&(Me(t)?t:$t[t]||px(t))||e},qi=function(t,e,n,i){n===void 0&&(n=function(c){return 1-e(1-c)}),i===void 0&&(i=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},a;return sn(t,function(o){$t[o]=vn[o]=s,$t[a=o.toLowerCase()]=n;for(var c in s)$t[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=$t[o+"."+c]=s[c]}),s},Eu=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},ha=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),a=s/Ta*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*B_((h-a)*s)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:Eu(o);return s=Ta/s,c.config=function(l,h){return r(t,l,h)},c},ua=function r(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Eu(n);return i.config=function(s){return r(t,s)},i};sn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;qi(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});$t.Linear.easeNone=$t.none=$t.Linear.easeIn;qi("Elastic",ha("in"),ha("out"),ha());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(o){return o<e?r*o*o:o<n?r*Math.pow(o-1.5/t,2)+.75:o<i?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};qi("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);qi("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});qi("Circ",function(r){return-($h(1-r*r)-1)});qi("Sine",function(r){return r===1?1:-F_(r*N_)+1});qi("Back",ua("in"),ua("out"),ua());$t.SteppedEase=$t.steps=vn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,a=1-se;return function(o){return((i*_r(0,a,o)|0)+s)*n}}};or.ease=$t["quad.out"];sn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ic+=r+","+r+"Params,"});var Tu=function(t,e){this.id=k_++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:su,this.set=e?e.getSetter:lc},ur=function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ls(this,+e.duration,1,1),this.data=e.data,fe&&(this._ctx=fe,fe.data.push(this)),hr||mn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Ls(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Is(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Eo(this,n),!s._dp||s.parent||lu(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Fn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===se||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),ru(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+$l(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+$l(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Ps(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-se?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?lo(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-se?0:this._rts,this.totalTime(_r(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),yo(this),K_(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Is(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==se&&(this._tTime-=se)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=me(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Fn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(nn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?lo(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=X_);var i=Be;return Be=n,rc(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Be=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,jl(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,jl(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(yn(this,n),nn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,nn(i)),this._dur||(this._zTime=-se),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-se:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-se,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-se)},t.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=Me(n)?n:au,c=function(){var h=i.then;i.then=null,s&&s(),Me(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},t.kill=function(){Zs(this)},r}();Mn(ur.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-se,_prom:0,_ps:!1,_rts:1});var Qe=function(r){Kh(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=nn(n.sortChildren),ge&&Fn(n.parent||ge,Zn(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&hu(Zn(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,a){return er(0,arguments,this),this},e.from=function(i,s,a){return er(1,arguments,this),this},e.fromTo=function(i,s,a,o){return er(2,arguments,this),this},e.set=function(i,s,a){return s.duration=0,s.parent=this,tr(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Te(i,s,yn(this,a),1),this},e.call=function(i,s,a){return Fn(this,Te.delayedCall(0,i,s),a)},e.staggerTo=function(i,s,a,o,c,l,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=h,a.parent=this,new Te(i,a,yn(this,c)),this},e.staggerFrom=function(i,s,a,o,c,l,h){return a.runBackwards=1,tr(a).immediateRender=nn(a.immediateRender),this.staggerTo(i,s,a,o,c,l,h)},e.staggerFromTo=function(i,s,a,o,c,l,h,u){return o.startAt=a,tr(o).immediateRender=nn(o.immediateRender),this.staggerTo(i,s,o,c,l,h,u)},e.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,h=i<=0?0:me(i),u=this._zTime<0!=i<0&&(this._initted||!l),d,f,_,g,m,p,v,x,S,T,b,E;if(this!==ge&&h>c&&i>=0&&(h=c),h!==this._tTime||a||u){if(o!==this._time&&l&&(h+=this._time-o,i+=this._time-o),d=h,S=this._start,x=this._ts,p=!x,u&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,m=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(d=me(h%m),h===c?(g=this._repeat,d=l):(T=me(h/m),g=~~T,g&&g===T&&(d=l,g--),d>l&&(d=l)),T=Ps(this._tTime,m),!o&&this._tTime&&T!==g&&this._tTime-T*m-this._dur<=0&&(T=g),b&&g&1&&(d=l-d,E=1),g!==T&&!this._lock){var I=b&&T&1,M=I===(b&&g&1);if(g<T&&(I=!I),o=I?0:h%l?l:h,this._lock=1,this.render(o||(E?0:me(g*m)),s,!l)._lock=0,this._tTime=h,!s&&this.parent&&gn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,T=g),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,M&&(this._lock=2,o=I?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=Q_(this,me(o),me(d)),v&&(h-=d-(d=v._start))),this._tTime=h,this._time=d,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&l&&!s&&!T&&(gn(this,"onStart"),this._tTime!==h))return this;if(d>=o&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||d>=f._start)&&f._ts&&v!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,a),d!==this._time||!this._ts&&!p){v=0,_&&(h+=this._zTime=-se);break}}f=_}else{f=this._last;for(var w=i<0?i:d;f;){if(_=f._prev,(f._act||w<=f._end)&&f._ts&&v!==f){if(f.parent!==this)return this.render(i,s,a);if(f.render(f._ts>0?(w-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(w-f._start)*f._ts,s,a||Be&&rc(f)),d!==this._time||!this._ts&&!p){v=0,_&&(h+=this._zTime=w?-se:se);break}}f=_}}if(v&&!s&&(this.pause(),v.render(d>=o?0:-se)._zTime=d>=o?1:-1,this._ts))return this._start=S,yo(this),this.render(i,s,a);this._onUpdate&&!s&&gn(this,"onUpdate",!0),(h===c&&this._tTime>=this.totalDuration()||!h&&o)&&(S===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(h===c&&this._ts>0||!h&&this._ts<0)&&xi(this,1),!s&&!(i<0&&!o)&&(h||o||!c)&&(gn(this,h===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var a=this;if(Qn(s)||(s=yn(this,s,i)),!(i instanceof ur)){if(Xe(i))return i.forEach(function(o){return a.add(o,s)}),this;if(Oe(i))return this.addLabel(i,s);if(Me(i))i=Te.delayedCall(0,i);else return this}return this!==i?Fn(this,i,s):this},e.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-bn);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof Te?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},e.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},e.remove=function(i){return Oe(i)?this.removeLabel(i):Me(i)?this.killTweensOf(i):(i.parent===this&&wo(this,i),i===this._recent&&(this._recent=this._last),zi(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=me(mn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=yn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,a){var o=Te.delayedCall(0,s||cr,a);return o.data="isPause",this._hasPause=1,Fn(this,o,yn(this,i))},e.removePause=function(i){var s=this._first;for(i=yn(this,i);s;)s._start===i&&s.data==="isPause"&&xi(s),s=s._next},e.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)li!==o[c]&&o[c].kill(i,s);return this},e.getTweensOf=function(i,s){for(var a=[],o=An(i),c=this._first,l=Qn(s),h;c;)c instanceof Te?q_(c._targets,o)&&(l?(!li||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(h=c.getTweensOf(o,s)).length&&a.push.apply(a,h),c=c._next;return a},e.tweenTo=function(i,s){s=s||{};var a=this,o=yn(a,i),c=s,l=c.startAt,h=c.onStart,u=c.onStartParams,d=c.immediateRender,f,_=Te.to(a,Mn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||se,onStart:function(){if(a.pause(),!f){var m=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());_._dur!==m&&Ls(_,m,0,1).render(_._time,!0,!0),f=1}h&&h.apply(_,u||[])}},s));return d?_.render(0):_},e.tweenFromTo=function(i,s,a){return this.tweenTo(s,Mn({startAt:{time:yn(this,i)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Jl(this,yn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Jl(this,yn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+se)},e.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=me(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return zi(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),zi(this)},e.totalDuration=function(i){var s=0,a=this,o=a._last,c=bn,l,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(u=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Fn(a,o,h-o._delay,1)._lock=0):c=h,h<0&&o._ts&&(s-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=me(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;Ls(a,a===ge&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(i){if(ge._ts&&(ru(ge,lo(i,ge)),iu=mn.frame),mn.frame>=Zl){Zl+=xn.autoSleep||120;var s=ge._first;if((!s||!s._ts)&&xn.autoSleep&&mn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||mn.sleep()}}},t}(ur);Mn(Qe.prototype,{_lock:0,_hasPause:0,_forcing:0});var gx=function(t,e,n,i,s,a,o){var c=new rn(this._pt,t,e,0,1,Lu,null,s),l=0,h=0,u,d,f,_,g,m,p,v;for(c.b=n,c.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=lr(i)),a&&(v=[n,i],a(v,t,e),n=v[0],i=v[1]),d=n.match(aa)||[];u=aa.exec(i);)_=u[0],g=i.substring(l,u.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==d[h++]&&(m=parseFloat(d[h-1])||0,c._pt={_next:c._pt,p:g||h===1?g:",",s:m,c:_.charAt(1)==="="?ws(m,_)-m:parseFloat(_)-m,m:f&&f<4?Math.round:0},l=aa.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(Qh.test(i)||p)&&(c.e=0),this._pt=c,c},oc=function(t,e,n,i,s,a,o,c,l,h){Me(i)&&(i=i(s||0,t,a));var u=t[e],d=n!=="get"?n:Me(u)?l?t[e.indexOf("set")||!Me(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():u,f=Me(u)?l?Sx:Cu:cc,_;if(Oe(i)&&(~i.indexOf("random(")&&(i=lr(i)),i.charAt(1)==="="&&(_=ws(d,i)+(We(d)||0),(_||_===0)&&(i=_))),!h||d!==i||Da)return!isNaN(d*i)&&i!==""?(_=new rn(this._pt,t,e,+d||0,i-(d||0),typeof u=="boolean"?yx:Pu,0,f),l&&(_.fp=l),o&&_.modifier(o,this,t),this._pt=_):(!u&&!(e in t)&&ec(e,i),gx.call(this,t,e,d,i,f,c||xn.stringFilter,l))},_x=function(t,e,n,i,s){if(Me(t)&&(t=nr(t,s,e,n,i)),!Gn(t)||t.style&&t.nodeType||Xe(t)||jh(t))return Oe(t)?nr(t,s,e,n,i):t;var a={},o;for(o in t)a[o]=nr(t[o],s,e,n,i);return a},bu=function(t,e,n,i,s,a){var o,c,l,h;if(dn[t]&&(o=new dn[t]).init(s,o.rawVars?e[t]:_x(e[t],i,s,a,n),n,i,a)!==!1&&(n._pt=c=new rn(n._pt,s,t,0,1,o.render,o,0,o.priority),n!==vs))for(l=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)l[o._props[h]]=c;return o},li,Da,ac=function r(t,e,n){var i=t.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,f=i.autoRevert,_=t._dur,g=t._startAt,m=t._targets,p=t.parent,v=p&&p.data==="nested"?p.vars.targets:m,x=t._overwrite==="auto"&&!ja,S=t.timeline,T=i.easeReverse||u,b,E,I,M,w,U,k,Y,L,O,B,q,Z;if(S&&(!d||!s)&&(s="none"),t._ease=Hi(s,or.ease),t._rEase=T&&(Hi(T)||t._ease),t._from=!S&&!!i.runBackwards,t._from&&(t.ratio=1),!S||d&&!i.stagger){if(Y=m[0]?Gi(m[0]).harness:0,q=Y&&i[Y.prop],b=co(i,nc),g&&(g._zTime<0&&g.progress(1),e<0&&h&&o&&!f?g.render(-1,!0):g.revert(h&&_?Kr:W_),g._lazy=0),a){if(xi(t._startAt=Te.set(m,Mn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&nn(c),startAt:null,delay:0,onUpdate:l&&function(){return gn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Be||!o&&!f)&&t._startAt.revert(Kr),o&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&_&&!g){if(e&&(o=!1),I=Mn({overwrite:!1,data:"isFromStart",lazy:o&&!g&&nn(c),immediateRender:o,stagger:0,parent:p},b),q&&(I[Y.prop]=q),xi(t._startAt=Te.set(m,I)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Be?t._startAt.revert(Kr):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,se,se);else if(!e)return}for(t._pt=t._ptCache=0,c=_&&nn(c)||c&&!_,E=0;E<m.length;E++){if(w=m[E],k=w._gsap||sc(m)[E]._gsap,t._ptLookup[E]=O={},Aa[k.id]&&mi.length&&ao(),B=v===m?E:v.indexOf(w),Y&&(L=new Y).init(w,q||b,t,B,v)!==!1&&(t._pt=M=new rn(t._pt,w,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(K){O[K]=M}),L.priority&&(U=1)),!Y||q)for(I in b)dn[I]&&(L=bu(I,b,t,B,w,v))?L.priority&&(U=1):O[I]=M=oc.call(t,w,I,"get",b[I],B,v,0,i.stringFilter);t._op&&t._op[E]&&t.kill(w,t._op[E]),x&&t._pt&&(li=t,ge.killTweensOf(w,O,t.globalTime(e)),Z=!t.parent,li=0),t._pt&&c&&(Aa[k.id]=1)}U&&Iu(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!Z,d&&e<=0&&S.render(bn,!0,!0)},xx=function(t,e,n,i,s,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,d,f;if(!l)for(l=t._ptCache[e]=[],d=t._ptLookup,f=t._targets.length;f--;){if(h=d[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Da=1,t.vars[e]="+=0",ac(t,o),Da=0,c?ar(e+" not eligible for reset. Try splitting into individual properties"):1;l.push(h)}for(f=l.length;f--;)u=l[f],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=we(n)+We(u.e)),u.b&&(u.b=h.s+We(u.b))},vx=function(t,e){var n=t[0]?Gi(t[0]).harness:0,i=n&&n.aliases,s,a,o,c;if(!i)return e;s=Cs({},e);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},Mx=function(t,e,n,i){var s=e.ease||i||"power1.inOut",a,o;if(Xe(e))o=n[t]||(n[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:s})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:s})},nr=function(t,e,n,i,s){return Me(t)?t.call(e,n,i,s):Oe(t)&&~t.indexOf("random(")?lr(t):t},Au=ic+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Ru={};sn(Au+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Ru[r]=1});var Te=function(r){Kh(t,r);function t(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:tr(i))||this;var c=o.vars,l=c.duration,h=c.delay,u=c.immediateRender,d=c.stagger,f=c.overwrite,_=c.keyframes,g=c.defaults,m=c.scrollTrigger,p=i.parent||ge,v=(Xe(n)||jh(n)?Qn(n[0]):"length"in i)?[n]:An(n),x,S,T,b,E,I,M,w;if(o._targets=v.length?sc(v):ar("GSAP target "+n+" not found. https://gsap.com",!xn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,_||d||Yr(l)||Yr(h)){i=o.vars;var U=i.easeReverse||i.yoyoEase;if(x=o.timeline=new Qe({data:"nested",defaults:g||{},targets:p&&p.data==="nested"?p.vars.targets:v}),x.kill(),x.parent=x._dp=Zn(o),x._start=0,d||Yr(l)||Yr(h)){if(b=v.length,M=d&&pu(d),Gn(d))for(E in d)~Au.indexOf(E)&&(w||(w={}),w[E]=d[E]);for(S=0;S<b;S++)T=co(i,Ru),T.stagger=0,U&&(T.easeReverse=U),w&&Cs(T,w),I=v[S],T.duration=+nr(l,Zn(o),S,I,v),T.delay=(+nr(h,Zn(o),S,I,v)||0)-o._delay,!d&&b===1&&T.delay&&(o._delay=h=T.delay,o._start+=h,T.delay=0),x.to(I,T,M?M(S,I,v):0),x._ease=$t.none;x.duration()?l=h=0:o.timeline=0}else if(_){tr(Mn(x.vars.defaults,{ease:"none"})),x._ease=Hi(_.ease||i.ease||"none");var k=0,Y,L,O;if(Xe(_))_.forEach(function(B){return x.to(v,B,">")}),x.duration();else{T={};for(E in _)E==="ease"||E==="easeEach"||Mx(E,_[E],T,_.easeEach);for(E in T)for(Y=T[E].sort(function(B,q){return B.t-q.t}),k=0,S=0;S<Y.length;S++)L=Y[S],O={ease:L.e,duration:(L.t-(S?Y[S-1].t:0))/100*l},O[E]=L.v,x.to(v,O,k),k+=O.duration;x.duration()<l&&x.to({},{duration:l-x.duration()})}}l||o.duration(l=x.duration())}else o.timeline=0;return f===!0&&!ja&&(li=Zn(o),ge.killTweensOf(v),li=0),Fn(p,Zn(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(u||!l&&!_&&o._start===me(p._time)&&nn(u)&&$_(Zn(o))&&p.data!=="nested")&&(o._tTime=-se,o.render(Math.max(0,-h)||0)),m&&hu(Zn(o),m),o}var e=t.prototype;return e.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,h=i<0,u=i>c-se&&!h?c:i<se?0:i,d,f,_,g,m,p,v,x;if(!l)J_(this,i,s,a);else if(u!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,x=this.timeline,this._repeat){if(g=l+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+i,s,a);if(d=me(u%g),u===c?(_=this._repeat,d=l):(m=me(u/g),_=~~m,_&&_===m?(d=l,_--):d>l&&(d=l)),p=this._yoyo&&_&1,p&&(d=l-d),m=Ps(this._tTime,g),d===o&&!a&&this._initted&&_===m)return this._tTime=u,this;_!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&d!==g&&this._initted&&(this._lock=a=1,this.render(me(g*_),!0).invalidate()._lock=0)}if(!this._initted){if(uu(this,h?i:d,a,s,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==m))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._rEase){var S=d<o;if(S!==this._inv){var T=S?o:l-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=T?(S?-1:1)/T:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(d/l);if(this._from&&(this.ratio=v=1-v),this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&u&&!s&&!m&&(gn(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(v,f.d),f=f._next;x&&x.render(i<0?i:x._dur*x._ease(d/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Ra(this,i,s,a),gn(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&gn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Ra(this,i,!0,!0),(i||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&xi(this,1),!s&&!(h&&!o)&&(u||o||p)&&(gn(this,u===c?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,a,o,c){hr||mn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||ac(this,l),h=this._ease(l/this._dur),xx(this,i,s,a,o,h,l,c)?this.resetTo(i,s,a,o,1):(Eo(this,0),this.parent||cu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Zs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Be),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,li&&li.vars.overwrite!==!0)._first||Zs(this),this.parent&&a!==this.timeline.totalDuration()&&Ls(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?An(i):o,l=this._ptLookup,h=this._pt,u,d,f,_,g,m,p;if((!s||s==="all")&&Z_(o,c))return s==="all"&&(this._pt=0),Zs(this);for(u=this._op=this._op||[],s!=="all"&&(Oe(s)&&(g={},sn(s,function(v){return g[v]=1}),s=g),s=vx(o,s)),p=o.length;p--;)if(~c.indexOf(o[p])){d=l[p],s==="all"?(u[p]=s,_=d,f={}):(f=u[p]=u[p]||{},_=s);for(g in _)m=d&&d[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&wo(this,m,"_pt"),delete d[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&h&&Zs(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return er(1,arguments)},t.delayedCall=function(i,s,a,o){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(i,s,a){return er(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,a){return ge.killTweensOf(i,s,a)},t}(ur);Mn(Te.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});sn("staggerTo,staggerFrom,staggerFromTo",function(r){Te[r]=function(){var t=new Qe,e=Pa.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var cc=function(t,e,n){return t[e]=n},Cu=function(t,e,n){return t[e](n)},Sx=function(t,e,n,i){return t[e](i.fp,n)},wx=function(t,e,n){return t.setAttribute(e,n)},lc=function(t,e){return Me(t[e])?Cu:Ja(t[e])&&t.setAttribute?wx:cc},Pu=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},yx=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Lu=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},hc=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Ex=function(t,e,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(t,e,n),s=a},Tx=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?wo(this,e,"_pt"):e.dep||(n=1),e=i;return!n},bx=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},Iu=function(t){for(var e=t._pt,n,i,s,a;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:a)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:a=e,e=n}t._pt=s},rn=function(){function r(e,n,i,s,a,o,c,l,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Pu,this.d=c||this,this.set=l||cc,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=bx,this.m=n,this.mt=s,this.tween=i},r}();sn(ic+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return nc[r]=1});vn.TweenMax=vn.TweenLite=Te;vn.TimelineLite=vn.TimelineMax=Qe;ge=new Qe({sortChildren:!1,defaults:or,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});xn.stringFilter=yu;var Vi=[],jr={},Ax=[],th=0,Rx=0,da=function(t){return(jr[t]||Ax).map(function(e){return e()})},Ua=function(){var t=Date.now(),e=[];t-th>2&&(da("matchMediaInit"),Vi.forEach(function(n){var i=n.queries,s=n.conditions,a,o,c,l;for(o in i)a=On.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(n.revert(),c&&e.push(n))}),da("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),th=t,da("matchMedia"))},Du=function(){function r(e,n){this.selector=n&&La(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Rx++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Me(n)&&(s=i,i=n,n=Me);var a=this,o=function(){var l=fe,h=a.selector,u;return l&&l!==a&&l.data.push(a),s&&(a.selector=La(s)),fe=a,u=i.apply(a,arguments),Me(u)&&a._r.push(u),fe=l,a.selector=h,a.isReverted=!1,u};return a.last=o,n===Me?o(a,function(c){return a.add(null,c)}):n?a[n]=o:o},t.ignore=function(n){var i=fe;fe=null,n(this),fe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Te&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof Qe?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Te)&&l.revert&&l.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i)for(var a=Vi.length;a--;)Vi[a].id===this.id&&Vi.splice(a,1)},t.revert=function(n){this.kill(n||{})},r}(),Cx=function(){function r(e){this.contexts=[],this.scope=e,fe&&fe.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){Gn(n)||(n={matches:n});var a=new Du(0,s||this.scope),o=a.conditions={},c,l,h;fe&&!a.selector&&(a.selector=fe.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(l in n)l==="all"?h=1:(c=On.matchMedia(n[l]),c&&(Vi.indexOf(a)<0&&Vi.push(a),(o[l]=c.matches)&&(h=1),c.addListener?c.addListener(Ua):c.addEventListener("change",Ua)));return h&&i(a,function(u){return a.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),ho={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Mu(i)})},timeline:function(t){return new Qe(t)},getTweensOf:function(t,e){return ge.getTweensOf(t,e)},getProperty:function(t,e,n,i){Oe(t)&&(t=An(t)[0]);var s=Gi(t||{}).get,a=n?au:ou;return n==="native"&&(n=""),t&&(e?a((dn[e]&&dn[e].get||s)(t,e,n,i)):function(o,c,l){return a((dn[o]&&dn[o].get||s)(t,o,c,l))})},quickSetter:function(t,e,n){if(t=An(t),t.length>1){var i=t.map(function(h){return an.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var a=dn[e],o=Gi(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(h){var u=new a;vs._pt=0,u.init(t,n?h+n:h,vs,0,[t]),u.render(1,u),vs._pt&&hc(1,vs)}:o.set(t,c);return a?l:function(h){return l(t,c,n?h+n:h,o,1)}},quickTo:function(t,e,n){var i,s=an.to(t,Mn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(c,l,h){return s.resetTo(e,c,l,h)};return a.tween=s,a},isTweening:function(t){return ge.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Hi(t.ease,or.ease)),Kl(or,t||{})},config:function(t){return Kl(xn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,a=t.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!dn[o]&&!vn[o]&&ar(e+" effect requires "+o+" plugin.")}),ca[e]=function(o,c,l){return n(An(o),Mn(c||{},s),l)},a&&(Qe.prototype[e]=function(o,c,l){return this.add(ca[e](o,Gn(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){$t[t]=Hi(e)},parseEase:function(t,e){return arguments.length?Hi(t,e):$t},getById:function(t){return ge.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Qe(t),i,s;for(n.smoothChildTiming=nn(t.smoothChildTiming),ge.remove(n),n._dp=0,n._time=n._tTime=ge._time,i=ge._first;i;)s=i._next,(e||!(!i._dur&&i instanceof Te&&i.vars.onComplete===i._targets[0]))&&Fn(n,i,i._start-i._delay),i=s;return Fn(ge,n,0),n},context:function(t,e){return t?new Du(t,e):fe},matchMedia:function(t){return new Cx(t)},matchMediaRefresh:function(){return Vi.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Ua()},addEventListener:function(t,e){var n=jr[t]||(jr[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=jr[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:ox,wrapYoyo:ax,distribute:pu,random:gu,snap:mu,normalize:rx,getUnit:We,clamp:ex,splitColor:Su,toArray:An,selector:La,mapRange:xu,pipe:ix,unitize:sx,interpolate:cx,shuffle:fu},install:eu,effects:ca,ticker:mn,updateRoot:Qe.updateRoot,plugins:dn,globalTimeline:ge,core:{PropTween:rn,globals:nu,Tween:Te,Timeline:Qe,Animation:ur,getCache:Gi,_removeLinkedListItem:wo,reverting:function(){return Be},context:function(t){return t&&fe&&(fe.data.push(t),t._ctx=fe),fe},suppressOverwrites:function(t){return ja=t}}};sn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ho[r]=Te[r]});mn.add(Qe.updateRoot);vs=ho.to({},{duration:0});var Px=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Lx=function(t,e){var n=t._targets,i,s,a;for(i in e)for(s=n.length;s--;)a=t._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=Px(a,i)),a&&a.modifier&&a.modifier(e[i],t,n[s],i))},fa=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(Oe(s)&&(c={},sn(s,function(h){return c[h]=1}),s=c),e){c={};for(l in s)c[l]=e(s[l]);s=c}Lx(o,s)}}}},an=ho.registerPlugin({name:"attr",init:function(t,e,n,i,s){var a,o,c;this.tween=n;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Be?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},fa("roundProps",Ia),fa("modifiers"),fa("snap",mu))||ho;Te.version=Qe.version=an.version="3.15.0";tu=1;Qa()&&Is();$t.Power0;$t.Power1;$t.Power2;$t.Power3;$t.Power4;$t.Linear;$t.Quad;$t.Cubic;$t.Quart;$t.Quint;$t.Strong;$t.Elastic;$t.Back;$t.SteppedEase;$t.Bounce;$t.Sine;$t.Expo;$t.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var eh,hi,ys,uc,Ni,nh,dc,Ix=function(){return typeof window<"u"},ti={},Di=180/Math.PI,Es=Math.PI/180,ms=Math.atan2,ih=1e8,fc=/([A-Z])/g,Dx=/(left|right|width|margin|padding|x)/i,Ux=/[\s,\(]\S/,Bn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Oa=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Ox=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Nx=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},kx=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Fx=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Uu=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Ou=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Bx=function(t,e,n){return t.style[e]=n},Gx=function(t,e,n){return t.style.setProperty(e,n)},zx=function(t,e,n){return t._gsap[e]=n},Hx=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},Vx=function(t,e,n,i,s){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Wx=function(t,e,n,i,s){var a=t._gsap;a[e]=n,a.renderTransform(s,a)},_e="transform",on=_e+"Origin",Xx=function r(t,e){var n=this,i=this.target,s=i.style,a=i._gsap;if(t in ti&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Bn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Kn(i,o)}):this.tfm[t]=a.x?a[t]:Kn(i,t),t===on&&(this.tfm.zOrigin=a.zOrigin);else return Bn.transform.split(",").forEach(function(o){return r.call(n,o,e)});if(this.props.indexOf(_e)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(on,e,"")),t=_e}(s||e)&&this.props.push(t,e,s[t])},Nu=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},qx=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,a;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(fc,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=dc(),(!s||!s.isStart)&&!n[_e]&&(Nu(n),i.zOrigin&&n[on]&&(n[on]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},ku=function(t,e){var n={target:t,props:[],revert:qx,save:Xx};return t._gsap||an.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Fu,Na=function(t,e){var n=hi.createElementNS?hi.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):hi.createElement(t);return n&&n.style?n:hi.createElement(t)},_n=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(fc,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Ds(e)||e,1)||""},sh="O,Moz,ms,Ms,Webkit".split(","),Ds=function(t,e,n){var i=e||Ni,s=i.style,a=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(sh[a]+t in s););return a<0?null:(a===3?"ms":a>=0?sh[a]:"")+t},ka=function(){Ix()&&window.document&&(eh=window,hi=eh.document,ys=hi.documentElement,Ni=Na("div")||{style:{}},Na("div"),_e=Ds(_e),on=_e+"Origin",Ni.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Fu=!!Ds("perspective"),dc=an.core.reverting,uc=1)},rh=function(t){var e=t.ownerSVGElement,n=Na("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ys.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ys.removeChild(n),s},oh=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Bu=function(t){var e,n;try{e=t.getBBox()}catch{e=rh(t),n=1}return e&&(e.width||e.height)||n||(e=rh(t)),e&&!e.width&&!e.x&&!e.y?{x:+oh(t,["x","cx","x1"])||0,y:+oh(t,["y","cy","y1"])||0,width:0,height:0}:e},Gu=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Bu(t))},vi=function(t,e){if(e){var n=t.style,i;e in ti&&e!==on&&(e=_e),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(fc,"-$1").toLowerCase())):n.removeAttribute(e)}},ui=function(t,e,n,i,s,a){var o=new rn(t._pt,e,n,0,1,a?Ou:Uu);return t._pt=o,o.b=i,o.e=s,t._props.push(n),o},ah={deg:1,rad:1,turn:1},Yx={grid:1,flex:1},Mi=function r(t,e,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Ni.style,c=Dx.test(e),l=t.tagName.toLowerCase()==="svg",h=(l?"client":"offset")+(c?"Width":"Height"),u=100,d=i==="px",f=i==="%",_,g,m,p;if(i===a||!s||ah[i]||ah[a])return s;if(a!=="px"&&!d&&(s=r(t,e,n,"px")),p=t.getCTM&&Gu(t),(f||a==="%")&&(ti[e]||~e.indexOf("adius")))return _=p?t.getBBox()[c?"width":"height"]:t[h],we(f?s/_*u:s/100*_);if(o[c?"width":"height"]=u+(d?a:i),g=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!l?t:t.parentNode,p&&(g=(t.ownerSVGElement||{}).parentNode),(!g||g===hi||!g.appendChild)&&(g=hi.body),m=g._gsap,m&&f&&m.width&&c&&m.time===mn.time&&!m.uncache)return we(s/m.width*u);if(f&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=u+i,_=t[h],v?t.style[e]=v:vi(t,e)}else(f||a==="%")&&!Yx[_n(g,"display")]&&(o.position=_n(t,"position")),g===t&&(o.position="static"),g.appendChild(Ni),_=Ni[h],g.removeChild(Ni),o.position="absolute";return c&&f&&(m=Gi(g),m.time=mn.time,m.width=g[h]),we(d?_*s/u:_&&s?u/_*s:0)},Kn=function(t,e,n,i){var s;return uc||ka(),e in Bn&&e!=="transform"&&(e=Bn[e],~e.indexOf(",")&&(e=e.split(",")[0])),ti[e]&&e!=="transform"?(s=fr(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:fo(_n(t,on))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=uo[e]&&uo[e](t,e,n)||_n(t,e)||su(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Mi(t,e,s,n)+n:s},Zx=function(t,e,n,i){if(!n||n==="none"){var s=Ds(e,t,1),a=s&&_n(t,s,1);a&&a!==n?(e=s,n=a):e==="borderColor"&&(n=_n(t,"borderTopColor"))}var o=new rn(this._pt,t.style,e,0,1,Lu),c=0,l=0,h,u,d,f,_,g,m,p,v,x,S,T;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=_n(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(g=t.style[e],t.style[e]=i,i=_n(t,e)||i,g?t.style[e]=g:vi(t,e)),h=[n,i],yu(h),n=h[0],i=h[1],d=n.match(xs)||[],T=i.match(xs)||[],T.length){for(;u=xs.exec(i);)m=u[0],v=i.substring(c,u.index),_?_=(_+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(_=1),m!==(g=d[l++]||"")&&(f=parseFloat(g)||0,S=g.substr((f+"").length),m.charAt(1)==="="&&(m=ws(f,m)+S),p=parseFloat(m),x=m.substr((p+"").length),c=xs.lastIndex-x.length,x||(x=x||xn.units[e]||S,c===i.length&&(i+=x,o.e+=x)),S!==x&&(f=Mi(t,e,g,x)||0),o._pt={_next:o._pt,p:v||l===1?v:",",s:f,c:p-f,m:_&&_<4||e==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=e==="display"&&i==="none"?Ou:Uu;return Qh.test(i)&&(o.e=0),this._pt=o,o},ch={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Kx=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=ch[n]||n,e[1]=ch[i]||i,e.join(" ")},$x=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,a=n._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],ti[o]&&(c=1,o=o==="transformOrigin"?on:_e),vi(n,o);c&&(vi(n,_e),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",fr(n,1),a.uncache=1,Nu(i)))}},uo={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var a=t._pt=new rn(t._pt,e,n,0,0,$x);return a.u=i,a.pr=-10,a.tween=s,t._props.push(n),1}}},dr=[1,0,0,1,0,0],zu={},Hu=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},lh=function(t){var e=_n(t,_e);return Hu(e)?dr:e.substr(7).match(Jh).map(we)},pc=function(t,e){var n=t._gsap||Gi(t),i=t.style,s=lh(t),a,o,c,l;return n.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?dr:s):(s===dr&&!t.offsetParent&&t!==ys&&!n.svg&&(c=i.display,i.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,ys.appendChild(t)),s=lh(t),c?i.display=c:vi(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):ys.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Fa=function(t,e,n,i,s,a){var o=t._gsap,c=s||pc(t,!0),l=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=c[0],_=c[1],g=c[2],m=c[3],p=c[4],v=c[5],x=e.split(" "),S=parseFloat(x[0])||0,T=parseFloat(x[1])||0,b,E,I,M;n?c!==dr&&(E=f*m-_*g)&&(I=S*(m/E)+T*(-g/E)+(g*v-m*p)/E,M=S*(-_/E)+T*(f/E)-(f*v-_*p)/E,S=I,T=M):(b=Bu(t),S=b.x+(~x[0].indexOf("%")?S/100*b.width:S),T=b.y+(~(x[1]||x[0]).indexOf("%")?T/100*b.height:T)),i||i!==!1&&o.smooth?(p=S-l,v=T-h,o.xOffset=u+(p*f+v*g)-p,o.yOffset=d+(p*_+v*m)-v):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=T,o.smooth=!!i,o.origin=e,o.originIsAbsolute=!!n,t.style[on]="0px 0px",a&&(ui(a,o,"xOrigin",l,S),ui(a,o,"yOrigin",h,T),ui(a,o,"xOffset",u,o.xOffset),ui(a,o,"yOffset",d,o.yOffset)),t.setAttribute("data-svg-origin",S+" "+T)},fr=function(t,e){var n=t._gsap||new Tu(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=_n(t,on)||"0",h,u,d,f,_,g,m,p,v,x,S,T,b,E,I,M,w,U,k,Y,L,O,B,q,Z,K,$,nt,it,X,j,ot;return h=u=d=g=m=p=v=x=S=0,f=_=1,n.svg=!!(t.getCTM&&Gu(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[_e]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[_e]!=="none"?c[_e]:"")),i.scale=i.rotate=i.translate="none"),E=pc(t,n.svg),n.svg&&(n.uncache?(Z=t.getBBox(),l=n.xOrigin-Z.x+"px "+(n.yOrigin-Z.y)+"px",q=""):q=!e&&t.getAttribute("data-svg-origin"),Fa(t,q||l,!!q||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,b=n.yOrigin||0,E!==dr&&(U=E[0],k=E[1],Y=E[2],L=E[3],h=O=E[4],u=B=E[5],E.length===6?(f=Math.sqrt(U*U+k*k),_=Math.sqrt(L*L+Y*Y),g=U||k?ms(k,U)*Di:0,v=Y||L?ms(Y,L)*Di+g:0,v&&(_*=Math.abs(Math.cos(v*Es))),n.svg&&(h-=T-(T*U+b*Y),u-=b-(T*k+b*L))):(ot=E[6],X=E[7],$=E[8],nt=E[9],it=E[10],j=E[11],h=E[12],u=E[13],d=E[14],I=ms(ot,it),m=I*Di,I&&(M=Math.cos(-I),w=Math.sin(-I),q=O*M+$*w,Z=B*M+nt*w,K=ot*M+it*w,$=O*-w+$*M,nt=B*-w+nt*M,it=ot*-w+it*M,j=X*-w+j*M,O=q,B=Z,ot=K),I=ms(-Y,it),p=I*Di,I&&(M=Math.cos(-I),w=Math.sin(-I),q=U*M-$*w,Z=k*M-nt*w,K=Y*M-it*w,j=L*w+j*M,U=q,k=Z,Y=K),I=ms(k,U),g=I*Di,I&&(M=Math.cos(I),w=Math.sin(I),q=U*M+k*w,Z=O*M+B*w,k=k*M-U*w,B=B*M-O*w,U=q,O=Z),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),f=we(Math.sqrt(U*U+k*k+Y*Y)),_=we(Math.sqrt(B*B+ot*ot)),I=ms(O,B),v=Math.abs(I)>2e-4?I*Di:0,S=j?1/(j<0?-j:j):0),n.svg&&(q=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Hu(_n(t,_e)),q&&t.setAttribute("transform",q))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(f*=-1,v+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,v+=v<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=we(f),n.scaleY=we(_),n.rotation=we(g)+o,n.rotationX=we(m)+o,n.rotationY=we(p)+o,n.skewX=v+o,n.skewY=x+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(l.split(" ")[2])||!e&&n.zOrigin||0)&&(i[on]=fo(l)),n.xOffset=n.yOffset=0,n.force3D=xn.force3D,n.renderTransform=n.svg?Jx:Fu?Vu:jx,n.uncache=0,n},fo=function(t){return(t=t.split(" "))[0]+" "+t[1]},pa=function(t,e,n){var i=We(e);return we(parseFloat(e)+parseFloat(Mi(t,"x",n+"px",i)))+i},jx=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Vu(t,e)},Ci="0deg",Ys="0px",Pi=") ",Vu=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.z,l=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,v=n.target,x=n.zOrigin,S="",T=p==="auto"&&t&&t!==1||p===!0;if(x&&(u!==Ci||h!==Ci)){var b=parseFloat(h)*Es,E=Math.sin(b),I=Math.cos(b),M;b=parseFloat(u)*Es,M=Math.cos(b),a=pa(v,a,E*M*-x),o=pa(v,o,-Math.sin(b)*-x),c=pa(v,c,I*M*-x+x)}m!==Ys&&(S+="perspective("+m+Pi),(i||s)&&(S+="translate("+i+"%, "+s+"%) "),(T||a!==Ys||o!==Ys||c!==Ys)&&(S+=c!==Ys||T?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Pi),l!==Ci&&(S+="rotate("+l+Pi),h!==Ci&&(S+="rotateY("+h+Pi),u!==Ci&&(S+="rotateX("+u+Pi),(d!==Ci||f!==Ci)&&(S+="skew("+d+", "+f+Pi),(_!==1||g!==1)&&(S+="scale("+_+", "+g+Pi),v.style[_e]=S||"translate(0, 0)"},Jx=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.rotation,l=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,v=n.forceCSS,x=parseFloat(a),S=parseFloat(o),T,b,E,I,M;c=parseFloat(c),l=parseFloat(l),h=parseFloat(h),h&&(h=parseFloat(h),l+=h,c+=h),c||l?(c*=Es,l*=Es,T=Math.cos(c)*u,b=Math.sin(c)*u,E=Math.sin(c-l)*-d,I=Math.cos(c-l)*d,l&&(h*=Es,M=Math.tan(l-h),M=Math.sqrt(1+M*M),E*=M,I*=M,h&&(M=Math.tan(h),M=Math.sqrt(1+M*M),T*=M,b*=M)),T=we(T),b=we(b),E=we(E),I=we(I)):(T=u,I=d,b=E=0),(x&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(x=Mi(f,"x",a,"px"),S=Mi(f,"y",o,"px")),(_||g||m||p)&&(x=we(x+_-(_*T+g*E)+m),S=we(S+g-(_*b+g*I)+p)),(i||s)&&(M=f.getBBox(),x=we(x+i/100*M.width),S=we(S+s/100*M.height)),M="matrix("+T+","+b+","+E+","+I+","+x+","+S+")",f.setAttribute("transform",M),v&&(f.style[_e]=M)},Qx=function(t,e,n,i,s){var a=360,o=Oe(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?Di:1),l=c-i,h=i+l+"deg",u,d;return o&&(u=s.split("_")[1],u==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),u==="cw"&&l<0?l=(l+a*ih)%a-~~(l/a)*a:u==="ccw"&&l>0&&(l=(l-a*ih)%a-~~(l/a)*a)),t._pt=d=new rn(t._pt,e,n,i,l,Ox),d.e=h,d.u="deg",t._props.push(n),d},hh=function(t,e){for(var n in e)t[n]=e[n];return t},tv=function(t,e,n){var i=hh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,c,l,h,u,d,f,_;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),a[_e]=e,o=fr(n,1),vi(n,_e),n.setAttribute("transform",l)):(l=getComputedStyle(n)[_e],a[_e]=e,o=fr(n,1),a[_e]=l);for(c in ti)l=i[c],h=o[c],l!==h&&s.indexOf(c)<0&&(f=We(l),_=We(h),u=f!==_?Mi(n,c,l,_):parseFloat(l),d=parseFloat(h),t._pt=new rn(t._pt,o,c,u,d-u,Oa),t._pt.u=_||0,t._props.push(c));hh(o,i)};sn("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",a=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(o){return t<2?r+o:"border"+o+r});uo[t>1?"border"+r:r]=function(o,c,l,h,u){var d,f;if(arguments.length<4)return d=a.map(function(_){return Kn(o,_,l)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(h+"").split(" "),f={},a.forEach(function(_,g){return f[_]=d[g]=d[g]||d[(g-1)/2|0]}),o.init(c,f,u)}});var Wu={name:"css",register:ka,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var a=this._props,o=t.style,c=n.vars.startAt,l,h,u,d,f,_,g,m,p,v,x,S,T,b,E,I,M;uc||ka(),this.styles=this.styles||ku(t),I=this.styles.props,this.tween=n;for(g in e)if(g!=="autoRound"&&(h=e[g],!(dn[g]&&bu(g,e,n,i,t,s)))){if(f=typeof h,_=uo[g],f==="function"&&(h=h.call(n,i,t,s),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=lr(h)),_)_(this,t,g,h,n)&&(E=1);else if(g.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(g)+"").trim(),h+="",gi.lastIndex=0,gi.test(l)||(m=We(l),p=We(h),p?m!==p&&(l=Mi(t,g,l,p)+p):m&&(h+=m)),this.add(o,"setProperty",l,h,i,s,0,0,g),a.push(g),I.push(g,0,o[g]);else if(f!=="undefined"){if(c&&g in c?(l=typeof c[g]=="function"?c[g].call(n,i,t,s):c[g],Oe(l)&&~l.indexOf("random(")&&(l=lr(l)),We(l+"")||l==="auto"||(l+=xn.units[g]||We(Kn(t,g))||""),(l+"").charAt(1)==="="&&(l=Kn(t,g))):l=Kn(t,g),d=parseFloat(l),v=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),u=parseFloat(h),g in Bn&&(g==="autoAlpha"&&(d===1&&Kn(t,"visibility")==="hidden"&&u&&(d=0),I.push("visibility",0,o.visibility),ui(this,o,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),g!=="scale"&&g!=="transform"&&(g=Bn[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in ti,x){if(this.styles.save(g),M=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=_n(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var w=t.style.perspective;t.style.perspective=h,h=_n(t,"perspective"),w?t.style.perspective=w:vi(t,"perspective")}u=parseFloat(h)}if(S||(T=t._gsap,T.renderTransform&&!e.parseTransform||fr(t,e.parseTransform),b=e.smoothOrigin!==!1&&T.smooth,S=this._pt=new rn(this._pt,o,_e,0,1,T.renderTransform,T,0,-1),S.dep=1),g==="scale")this._pt=new rn(this._pt,T,"scaleY",T.scaleY,(v?ws(T.scaleY,v+u):u)-T.scaleY||0,Oa),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){I.push(on,0,o[on]),h=Kx(h),T.svg?Fa(t,h,0,b,0,this):(p=parseFloat(h.split(" ")[2])||0,p!==T.zOrigin&&ui(this,T,"zOrigin",T.zOrigin,p),ui(this,o,g,fo(l),fo(h)));continue}else if(g==="svgOrigin"){Fa(t,h,1,b,0,this);continue}else if(g in zu){Qx(this,T,g,d,v?ws(d,v+h):h);continue}else if(g==="smoothOrigin"){ui(this,T,"smooth",T.smooth,h);continue}else if(g==="force3D"){T[g]=h;continue}else if(g==="transform"){tv(this,h,t);continue}}else g in o||(g=Ds(g)||g);if(x||(u||u===0)&&(d||d===0)&&!Ux.test(h)&&g in o)m=(l+"").substr((d+"").length),u||(u=0),p=We(h)||(g in xn.units?xn.units[g]:m),m!==p&&(d=Mi(t,g,l,p)),this._pt=new rn(this._pt,x?T:o,g,d,(v?ws(d,v+u):u)-d,!x&&(p==="px"||g==="zIndex")&&e.autoRound!==!1?Fx:Oa),this._pt.u=p||0,x&&M!==h?(this._pt.b=l,this._pt.e=M,this._pt.r=kx):m!==p&&p!=="%"&&(this._pt.b=l,this._pt.r=Nx);else if(g in o)Zx.call(this,t,g,l,v?v+h:h);else if(g in t)this.add(t,g,l||t[g],v?v+h:h,i,s);else if(g!=="parseTransform"){ec(g,h);continue}x||(g in o?I.push(g,0,o[g]):typeof t[g]=="function"?I.push(g,2,t[g]()):I.push(g,1,l||t[g])),a.push(g)}}E&&Iu(this)},render:function(t,e){if(e.tween._time||!dc())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Kn,aliases:Bn,getSetter:function(t,e,n){var i=Bn[e];return i&&i.indexOf(",")<0&&(e=i),e in ti&&e!==on&&(t._gsap.x||Kn(t,"x"))?n&&nh===n?e==="scale"?Hx:zx:(nh=n||{})&&(e==="scale"?Vx:Wx):t.style&&!Ja(t.style[e])?Bx:~e.indexOf("-")?Gx:lc(t,e)},core:{_removeProperty:vi,_getMatrix:pc}};an.utils.checkPrefix=Ds;an.core.getStyleSaver=ku;(function(r,t,e,n){var i=sn(r+","+t+","+e,function(s){ti[s]=1});sn(t,function(s){xn.units[s]="deg",zu[s]=1}),Bn[i[13]]=r+","+t,sn(n,function(s){var a=s.split(":");Bn[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");sn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){xn.units[r]="px"});an.registerPlugin(Wu);var pr=an.registerPlugin(Wu)||an;pr.core.Tween;class ev{constructor(){this.moneyEl=document.getElementById("money-display"),this.stackEl=document.getElementById("stack-display"),this.questTextEl=document.getElementById("quest-desc"),this.toastContainer=document.getElementById("toast-container"),this.boostBtn=document.getElementById("btn-boost"),this.settingsBtn=document.getElementById("btn-settings"),this.settingsModal=document.getElementById("settings-modal"),this.closeSettingsBtn=document.getElementById("btn-close-settings"),this.displayedMoney=0,this.setupModalEvents(),this.setupLanguageEvents(),this.setupTactileHaptics()}setupTactileHaptics(){document.querySelectorAll(".stat-pill, .icon-btn, .tab-btn, .lang-btn, .char-card, .debug-btn, .close-btn").forEach(t=>{t.addEventListener("pointerdown",()=>{navigator.vibrate&&navigator.vibrate(12)})})}setupModalEvents(){this.settingsBtn&&this.settingsModal&&this.settingsBtn.addEventListener("click",e=>{e.stopPropagation(),this.settingsModal.classList.remove("hidden")}),this.closeSettingsBtn&&this.settingsModal&&this.closeSettingsBtn.addEventListener("click",()=>{this.settingsModal.classList.add("hidden")}),this.settingsModal&&this.settingsModal.addEventListener("click",e=>{e.target===this.settingsModal&&this.settingsModal.classList.add("hidden")});const t=document.querySelectorAll(".tab-btn");t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(s=>s.classList.remove("active")),e.classList.add("active");const n=e.getAttribute("data-tab");document.querySelectorAll(".tab-content").forEach(s=>s.classList.remove("active"));const i=document.getElementById(n);i&&i.classList.add("active")})})}setupLanguageEvents(){const t=document.getElementById("btn-lang-tr"),e=document.getElementById("btn-lang-en");t&&t.addEventListener("click",()=>{zt.setLanguage("tr"),t.classList.add("active"),e&&e.classList.remove("active"),this.updateLanguageUI(),this.showToast("🇹🇷 Dil: Türkçe olarak ayarlandı!","#3498db")}),e&&e.addEventListener("click",()=>{zt.setLanguage("en"),e.classList.add("active"),t&&t.classList.remove("active"),this.updateLanguageUI(),this.showToast("🇬🇧 Language set to English!","#3498db")})}setupCharacterEvents(t){const e=["shopkeeper","cat","robot","panda","penguin"],n={};e.forEach(a=>{n[a]=document.getElementById(`char-card-${a}`)});const i=a=>{const o=(zt.currentLang||"tr")==="tr";e.forEach(c=>{const l=n[c];if(l){const h=l.querySelector(".char-badge");c===a?(l.classList.add("active"),h&&(h.innerText=o?"✓ SEÇİLDİ":"✓ SELECTED")):(l.classList.remove("active"),h&&(h.innerText=o?"SEÇ":"SELECT"))}})};i(t.characterType);const s={shopkeeper:{msg:"👨‍🌾 Market Çalışanı seçildi!",color:"#3498db"},cat:{msg:"🐱 Maceracı Kedi seçildi! 🐾",color:"#e67e22"},robot:{msg:"🤖 Siber Lojistik Botu devrede! ⚡",color:"#00d9ff"},panda:{msg:"🐼 Şef Panda mutfağa geçti! 🥐",color:"#2ecc71"},penguin:{msg:"👑 Kral Penguen göreve hazır! ❄️",color:"#9b59b6"}};e.forEach(a=>{const o=n[a];o&&o.addEventListener("click",()=>{t.setCharacterType(a),i(a);const c=s[a];c&&this.showToast(c.msg,c.color)})})}updateLanguageUI(){const t=document.getElementById("boost-text");t&&(t.innerText=zt.t("speed_boost"));const e=document.getElementById("quest-title-badge");e&&(e.innerText=zt.t("quest_title"));const n=document.getElementById("settings-modal-title");n&&(n.innerText=`⚙️ ${zt.t("settings_title")}`);const i=document.getElementById("tab-btn-gen");i&&(i.innerText=zt.t("tab_general"));const s=document.getElementById("tab-btn-char");s&&(s.innerText=zt.t("tab_character"));const a=document.getElementById("tab-btn-lang");a&&(a.innerText=zt.t("tab_language"));const o=document.getElementById("tab-btn-deb");o&&(o.innerText=zt.t("tab_debug"));const c=document.getElementById("char-title");c&&(c.innerText=zt.t("char_select_title"));const l=(f,_,g)=>{const m=document.getElementById(`char-name-${f}`);m&&(m.innerText=zt.t(_));const p=document.getElementById(`char-desc-${f}`);p&&(p.innerText=zt.t(g))};l("shopkeeper","char_shopkeeper","char_shopkeeper_desc"),l("cat","char_cat","char_cat_desc"),l("robot","char_robot","char_robot_desc"),l("panda","char_panda","char_panda_desc"),l("penguin","char_penguin","char_penguin_desc");const h=document.getElementById("label-sfx");h&&(h.innerText=zt.t("sfx"));const u=document.getElementById("label-music");u&&(u.innerText=zt.t("music"));const d=document.getElementById("label-haptics");d&&(d.innerText=zt.t("haptics"))}bindDebugActions(t){const e=document.getElementById("debug-btn-money-1k");e&&e.addEventListener("click",()=>{t.playerMoney+=1e3,this.updateMoney(t.playerMoney),this.showToast("💵 +1.000$!","#2ecc71")});const n=document.getElementById("debug-btn-money-inf");n&&n.addEventListener("click",()=>{t.playerMoney=99999,this.updateMoney(t.playerMoney),this.showToast("♾️ 99.999$!","#f1c40f")});const i=document.getElementById("debug-btn-speed-2x");i&&i.addEventListener("click",()=>{t.debugSpeedMultiplier=2,this.showToast("⚡ 2x Speed!","#e67e22")});const s=document.getElementById("debug-btn-speed-5x");s&&s.addEventListener("click",()=>{t.debugSpeedMultiplier=5,this.showToast("🚀 5x Super Speed!","#9b59b6")});const a=document.getElementById("debug-btn-capacity");a&&a.addEventListener("click",()=>{t.player.stack.maxCapacity+=50,this.updateStack(t.player.stack.getCount(),t.player.stack.maxCapacity),this.showToast("🎒 +50 Capacity!","#3498db")});const o=document.getElementById("debug-btn-reset-money");o&&o.addEventListener("click",()=>{t.playerMoney=0,this.updateMoney(0),this.showToast("🧹 0$!","#e74c3c")})}updateMoney(t){this.moneyEl&&pr.to(this,{displayedMoney:t,duration:.35,ease:"power1.out",onUpdate:()=>{this.moneyEl.innerText=Math.floor(this.displayedMoney)}})}updateStack(t,e){if(!this.stackEl)return;this.stackEl.innerText=`${t} / ${e}`;const n=this.stackEl.parentElement;n&&(t>=e&&e>0?(n.style.borderColor="#ff4b4b",n.style.boxShadow="0 4px 0 #e53238, 0 6px 14px rgba(255, 75, 75, 0.25)",pr.fromTo(n,{scale:1},{scale:1.12,duration:.15,yoyo:!0,repeat:1,ease:"power2.out"})):(n.style.borderColor="#e5e5e5",n.style.boxShadow="0 4px 0 #e5e5e5, 0 6px 14px rgba(0, 0, 0, 0.08)"))}setQuest(t){this.questTextEl&&(this.questTextEl.innerText=t)}showToast(t,e="#2ecc71"){if(!this.toastContainer)return;const n=document.createElement("div");n.className="toast-msg",n.style.background=e,n.innerText=t,this.toastContainer.appendChild(n),setTimeout(()=>{n.parentElement&&n.parentElement.removeChild(n)},1600)}}class nv{constructor(t,e,n,i){this.scene=t,this.position=new P(e,0,n),this.onClaimCallback=i,this.lifespan=18,this.isClaimed=!1,this.isExpired=!1,this.interactionRadius=1.6,this.dwellTimer=0,this.requiredDwell=.25,this.meshGroup=new ft,this.meshGroup.position.set(e,4,n),this.scene.add(this.meshGroup),this.rewardTypes=[{id:"MONEY_BURST",title:"500$ Para Yağmuru",icon:"💰",desc:"Anında kasanıza 500$ ekler!"},{id:"SUPER_SPEED",title:"30sn Süper Hız (2.5x)",icon:"⚡",desc:"30 saniye boyunca turbo hızlı koşun!"},{id:"MAX_STACK",title:"Full Çanta Doldurma",icon:"🎒",desc:"Sırt çantanızı anında maksimum ürünle doldurur!"}],this.selectedReward=this.rewardTypes[Math.floor(Math.random()*this.rewardTypes.length)],this.buildMesh(),this.buildBadge(),this.animateSpawn()}buildMesh(){const t=new vo(.8,1.3,24),e=new Qt({color:16750080,side:pn,transparent:!0,opacity:.7});this.ring=new R(t,e),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.04,this.scene.add(this.ring),this.ring.position.set(this.position.x,.04,this.position.z);const n=new st(.9,.9,.9),i=new F({color:16762880,roughness:.3,metalness:.1});this.box=new R(n,i),this.box.position.y=.45,this.box.castShadow=!0,this.meshGroup.add(this.box);const s=new F({color:16730955,roughness:.4}),a=new R(new st(.92,.92,.22),s);a.position.y=.45,this.meshGroup.add(a);const o=new R(new st(.22,.92,.92),s);o.position.y=.45,this.meshGroup.add(o);const c=new bt(.2,8,8),l=new R(c,s);l.position.y=.98,this.meshGroup.add(l)}buildBadge(){this.badge=new Si(this.scene,{title:`${this.selectedReward.icon} SÜRPRİZ 🎬`,icon:"🎁",cost:0,type:"INFO",color:"#ff9600",position:new P(this.position.x,2.4,this.position.z)})}animateSpawn(){pr.to(this.meshGroup.position,{y:0,duration:.8,ease:"bounce.out"})}update(t,e,n){if(!(this.isClaimed||this.isExpired)){if(this.lifespan-=t,this.box&&(this.box.rotation.y+=t*1.5),this.ring){this.ring.rotation.z+=t*1.2;const i=1+Math.sin(Date.now()*.006)*.12;this.ring.scale.set(i,i,1)}if(this.lifespan<=0){this.destroy(),this.isExpired=!0;return}e&&(this.position.distanceTo(e)<this.interactionRadius?(this.dwellTimer+=t,this.dwellTimer>=this.requiredDwell&&(this.dwellTimer=0,n&&n(this))):this.dwellTimer=0)}}claim(){this.isClaimed||(this.isClaimed=!0,pr.to(this.meshGroup.scale,{x:1.5,y:1.5,z:1.5,duration:.2,yoyo:!0,repeat:1,onComplete:()=>{this.destroy()}}),this.onClaimCallback&&this.onClaimCallback(this.selectedReward))}destroy(){this.ring&&(this.scene.remove(this.ring),this.ring.geometry&&this.ring.geometry.dispose(),this.ring.material&&this.ring.material.dispose()),this.badge&&(this.badge.group&&this.scene.remove(this.badge.group),this.badge.texture&&this.badge.texture.dispose()),this.meshGroup&&this.scene.remove(this.meshGroup)}}class iv{constructor(t,e,n){this.game=t,this.scene=e,this.hud=n,this.isBoostActive=!1,this.boostTimer=0,this.boostDuration=30,this.boostMultiplier=2,this.currentDrop=null,this.nextDropTimer=15,this.minDropInterval=35,this.maxDropInterval=55,this.pendingRewardDrop=null,this.setupBoostButton(),this.setupRewardModal()}setupBoostButton(){const t=document.getElementById("btn-boost");t&&t.addEventListener("click",()=>{this.triggerRewardedBoost()})}setupRewardModal(){this.modal=document.getElementById("reward-modal"),this.iconEl=document.getElementById("reward-modal-icon"),this.titleEl=document.getElementById("reward-modal-title"),this.descEl=document.getElementById("reward-modal-desc"),this.claimBtn=document.getElementById("btn-claim-reward"),this.cancelBtn=document.getElementById("btn-cancel-reward"),this.claimBtn&&this.claimBtn.addEventListener("click",()=>{this.claimPendingReward()}),this.cancelBtn&&this.cancelBtn.addEventListener("click",()=>{this.closeRewardModal()}),this.modal&&this.modal.addEventListener("click",t=>{t.target===this.modal&&this.closeRewardModal()})}openRewardModal(t){if(!this.modal||!t)return;this.pendingRewardDrop=t;const e=t.selectedReward;this.iconEl&&(this.iconEl.innerText=e.icon),this.titleEl&&(this.titleEl.innerText=e.title),this.descEl&&(this.descEl.innerText=`${e.desc}
(Kısa bir ödüllü video izleyin!)`),this.modal.classList.remove("hidden")}closeRewardModal(){this.modal&&this.modal.classList.add("hidden"),this.pendingRewardDrop=null}claimPendingReward(){if(!this.pendingRewardDrop){this.closeRewardModal();return}const t=this.pendingRewardDrop,e=t.selectedReward;this.closeRewardModal(),t.claim(),e.id==="MONEY_BURST"?(this.game.playerMoney+=500,this.hud.updateMoney(this.game.playerMoney),this.hud.showToast("🎉 +500$ Nakit Para Kazandınız! 💵","#58cc02")):e.id==="SUPER_SPEED"?(this.isBoostActive=!0,this.boostMultiplier=2.5,this.boostTimer=35,this.hud.showToast("🚀 35sn 2.5x Süper Hız Aktif Edildi! ⚡","#ff9600")):e.id==="MAX_STACK"&&(this.game.player.stack.maxCapacity+=10,this.hud.updateStack(this.game.player.stack.getCount(),this.game.player.stack.maxCapacity),this.hud.showToast("🎒 +10 Ekstra Çanta Kapasitesi Kazandınız!","#1cb0f6")),this.currentDrop=null,this.scheduleNextDrop()}triggerRewardedBoost(){if(this.isBoostActive){this.hud.showToast("⚡ 2x Hız Takviyesi Zaten Aktif!","#ff9600");return}this.hud.showToast("🎬 Reklam İzlendi! 30sn 2x Hız Aktif!","#58cc02"),this.isBoostActive=!0,this.boostMultiplier=2,this.boostTimer=this.boostDuration;const t=document.getElementById("btn-boost");t&&(t.style.background="#58cc02",t.style.borderColor="#79d72e",t.style.borderBottomColor="#46a302",t.querySelector(".pill-value").innerText=`${Math.ceil(this.boostTimer)}s`)}scheduleNextDrop(){const t=this.minDropInterval+Math.random()*(this.maxDropInterval-this.minDropInterval);this.nextDropTimer=t}spawnLuckyDrop(t){this.currentDrop&&(this.currentDrop.destroy(),this.currentDrop=null);const e=Math.random()*Math.PI*2,n=3.5+Math.random()*2.5;let i=t.x+Math.cos(e)*n,s=t.z+Math.sin(e)*n;i=Math.max(-12,Math.min(10,i)),s=Math.max(-10,Math.min(8,s)),this.currentDrop=new nv(this.scene,i,s,()=>{this.currentDrop=null,this.scheduleNextDrop()}),this.hud.showToast("🎁 Önünüze Sürpriz Bir Hediye Düştü!","#ff9600")}update(t,e){if(this.isBoostActive){this.boostTimer-=t;const n=document.getElementById("btn-boost");n&&(n.querySelector(".pill-value").innerText=`${Math.ceil(this.boostTimer)}s`),this.boostTimer<=0&&(this.isBoostActive=!1,this.boostMultiplier=1,this.hud.showToast("⏳ Hız Takviyesi Sona Erdi","#777777"),n&&(n.style.background="#ff9600",n.style.borderColor="#ffc800",n.style.borderBottomColor="#e58500",n.querySelector(".pill-value").innerText="2x HIZ"))}this.currentDrop?(this.currentDrop.update(t,e,n=>{this.openRewardModal(n)}),this.currentDrop.isExpired&&(this.currentDrop=null,this.scheduleNextDrop())):(this.nextDropTimer-=t,this.nextDropTimer<=0&&e&&this.spawnLuckyDrop(e))}getSpeedMultiplier(){return this.isBoostActive?this.boostMultiplier:1}}class uh{constructor(){this.engine=new T_("game-container"),this.input=new b_,this.hud=new ev,this.ads=new iv(this,this.engine.scene,this.hud),this.playerMoney=0,this.debugSpeedMultiplier=1,this.clock=new E_,this.environment=new R_(this.engine.scene),this.player=new C_(this.engine.scene),this.farmPlots=[],this.shelves=[],this.machines=[],this.coops=[],this.ovens=[],this.kitchens=[],this.tables=[],this.upgradeZones=[],this.workers=[],this.tomatoFarm=new ps(this.engine.scene,-10,5,gt.TOMATO,"Domates Tarlası",this.environment),this.farmPlots.push(this.tomatoFarm),this.tomatoShelf=new oi(this.engine.scene,3,2,gt.TOMATO,8,"Taze Domates Reyonu",this.environment),this.shelves.push(this.tomatoShelf),this.register=new D_(this.engine.scene,5,-4,this.environment),this.unlockedProducts=[gt.TOMATO],this.spawner=new O_(this.engine.scene,this.unlockedProducts),this.manualStats={tomatoSold:0,pasteProduced:0,pasteSold:0,orangeHarvested:0,juiceProduced:0,juiceSold:0,cornSold:0,popcornProduced:0,popcornSold:0,feedProduced:0,eggCollected:0,eggSold:0,breadProduced:0,breadSold:0,burgerCooked:0,burgerCollected:0,tablesServed:0,tipsCollected:0},this.unlockedStages={cashierZone:!1,pasteZone:!1,harvesterZone:!1,orangeZone:!1,feederZone:!1,cornZone:!1,popcornZone:!1,feedZone:!1,coopZone:!1,chickenUpgrades:!1,caretakerZone:!1,bakeryZone:!1,restaurantZone:!1,chefAndWaiterZone:!1},this.setupUnlockProgression(),this.hud.bindDebugActions(this),this.hud.setupCharacterEvents(this.player),this.hud.updateMoney(this.playerMoney),this.hud.updateStack(0,this.player.stack.maxCapacity),this.hud.setQuest("🍅 Domates topla, reyon rafına diz ve kasada ilk satışını yap!"),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}setupUnlockProgression(){const t=new Ne(this.engine.scene,-6.5,5,25,zt.t("unlock_tomato_farm_2"),()=>{const e=new ps(this.engine.scene,-6.5,5,gt.TOMATO,"2. Domates Tarlası",this.environment);this.farmPlots.push(e),this.hud.showToast("🍅 2. Domates Tarlası Açıldı! (2x Üretim Hızı)","#e74c3c")},"🍅");this.upgradeZones.push(t)}checkFirstTomatoSold(){if(!this.unlockedStages.cashierZone){this.unlockedStages.cashierZone=!0;const t=new Ne(this.engine.scene,8.5,-4,35,zt.t("hire_cashier"),()=>{const e=new fs(this.engine.scene,be.CASHIER,this.register.cashierZonePos);this.workers.push(e),this.register.hasHiredCashier=!0,this.hud.showToast("👨‍💼 Kasiyer İşe Alındı! Kasa artık otomatik!","#3498db")},"👨‍💼");this.upgradeZones.push(t),this.spawnPasteMachineZone()}}spawnPasteMachineZone(){if(this.unlockedStages.pasteZone)return;this.unlockedStages.pasteZone=!0;const t=new Ne(this.engine.scene,0,-4,45,zt.t("unlock_paste"),()=>{const e=new Xr(this.engine.scene,-10,1.8,gt.TOMATO,gt.TOMATO_PASTE,"Salça Kazanı",this.environment);this.machines.push(e);const n=new oi(this.engine.scene,7.5,2,gt.TOMATO_PASTE,6,"Salça Reyonu",this.environment);this.shelves.push(n),this.unlockedProducts.push(gt.TOMATO_PASTE),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🥫 Salça Kazanı ve Reyonu Açıldı!","#e67e22"),this.hud.setQuest("🥫 Kazana 2 domates bırak, üretilen salçayı alıp reyonuna diz ve müşteriye sat!")},"🥫");this.upgradeZones.push(t)}checkFirstPasteSold(){if(!this.unlockedStages.harvesterZone){this.unlockedStages.harvesterZone=!0;const t=new Ne(this.engine.scene,-5,-4,60,zt.t("hire_harvester"),()=>{const e=new fs(this.engine.scene,be.HARVESTER,new P(-10,0,0));this.workers.push(e),this.hud.showToast("🧑‍🌾 Tarla İşçisi İşe Alındı! Domatesleri o toplayacak!","#2ecc71")},"🧑‍🌾");this.upgradeZones.push(t),this.spawnOrangeGardenZone()}}spawnOrangeGardenZone(){if(this.unlockedStages.orangeZone)return;this.unlockedStages.orangeZone=!0;const t=new Ne(this.engine.scene,-10,-7,85,zt.t("unlock_orange"),()=>{const e=new ps(this.engine.scene,-10,-7,gt.ORANGE,"Portakal Bahçesi",this.environment);this.farmPlots.push(e);const n=new oi(this.engine.scene,3,-1,gt.ORANGE,8,"Portakal Reyonu",this.environment);this.shelves.push(n);const i=new Xr(this.engine.scene,-10,-1.8,gt.ORANGE,gt.ORANGE_JUICE,"Meyve Sıkacağı",this.environment);this.machines.push(i);const s=new oi(this.engine.scene,7.5,-1,gt.ORANGE_JUICE,6,"Portakal Suyu Reyonu",this.environment);this.shelves.push(s),this.unlockedProducts.push(gt.ORANGE,gt.ORANGE_JUICE),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🍊 Portakal Bahçesi & Meyve Sıkacağı Açıldı!","#f39c12"),this.hud.setQuest("🍊 Portakal topla, sıkma makinesine bırak ve taze suyu reyonuna dizip sat!")},"🍊");this.upgradeZones.push(t)}checkFirstJuiceSold(){if(!this.unlockedStages.feederZone){this.unlockedStages.feederZone=!0;const t=new Ne(this.engine.scene,-8,-1,90,zt.t("hire_factory_worker"),()=>{const e=new fs(this.engine.scene,be.FACTORY_FEEDER,new P(-10,0,0));this.workers.push(e);const n=new Ne(this.engine.scene,-6.5,-7,45,zt.t("unlock_orange_farm_2"),()=>{const i=new ps(this.engine.scene,-6.5,-7,gt.ORANGE,"2. Portakal Bahçesi",this.environment);this.farmPlots.push(i),this.hud.showToast("🍊 2. Portakal Bahçesi Açıldı! (2x Hasat)","#f39c12")},"🍊");this.upgradeZones.push(n),this.hud.showToast("🧑‍🔧 Fabrika Lojistikçisi İşe Alındı! Kazan ve sıkıcıyı o besleyecek!","#e67e22")},"🧑‍🔧");this.upgradeZones.push(t),this.spawnCornFarmZone()}}spawnCornFarmZone(){if(this.unlockedStages.cornZone)return;this.unlockedStages.cornZone=!0;const t=new Ne(this.engine.scene,-18,5,110,zt.t("unlock_corn"),()=>{const e=new ps(this.engine.scene,-18,5,gt.CORN,"Mısır Tarlası",this.environment);this.farmPlots.push(e);const n=new oi(this.engine.scene,11,2,gt.CORN,8,"Taze Mısır Reyonu",this.environment);this.shelves.push(n),this.unlockedProducts.push(gt.CORN),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🌽 Taze Mısır Tarlası ve Reyonu Açıldı!","#f1c40f"),this.hud.setQuest("🌽 Tarladan mısır topla, reyonuna diz ve müşteriye sat!")},"🌽");this.upgradeZones.push(t)}checkFirstCornSold(){if(!this.unlockedStages.popcornZone){this.unlockedStages.popcornZone=!0;const t=new Ne(this.engine.scene,-18,1.8,125,zt.t("unlock_popcorn"),()=>{const e=new Xr(this.engine.scene,-18,1.8,gt.CORN,gt.POPCORN,"Popcorn Makinesi",this.environment);this.machines.push(e);const n=new oi(this.engine.scene,11,0,gt.POPCORN,6,"Sıcak Popcorn Reyonu",this.environment);this.shelves.push(n),this.unlockedProducts.push(gt.POPCORN),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🍿 Sıcak Popcorn Makinesi & Reyonu Açıldı!","#e74c3c"),this.hud.setQuest("🍿 Mısırları makineye at, sıcak popcorn üret ve reyonuna dizip sat!")},"🍿");this.upgradeZones.push(t)}}checkFirstPopcornSold(){if(!this.unlockedStages.feedZone){this.unlockedStages.feedZone=!0;const t=new Ne(this.engine.scene,-18,-1.8,135,zt.t("unlock_feed_machine"),()=>{const e=new Xr(this.engine.scene,-18,-1.8,gt.CORN,gt.CHICKEN_FEED,"Yem Değirmeni",this.environment);this.machines.push(e),this.hud.showToast("🌾 Yem Değirmeni Kuruldu!","#27ae60"),this.hud.setQuest("🌾 Mısır öğüterek ilk tavuk yemi çuvalını üret ve teslim al!")},"🌾");this.upgradeZones.push(t)}}checkFirstFeedProduced(){if(!this.unlockedStages.coopZone){this.unlockedStages.coopZone=!0;const t=new Ne(this.engine.scene,-23,3.5,150,zt.t("unlock_coop"),()=>{const e=new L_(this.engine.scene,-23,3.5,this.environment);this.coops.push(e);const n=new oi(this.engine.scene,11,-2,gt.EGG,6,"Çiftlik Yumurtası",this.environment);this.shelves.push(n),this.unlockedProducts.push(gt.EGG),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🐔 Tavuk Kümesi Açıldı! (1. Tavuk devrede)","#f39c12"),this.hud.setQuest("🐔 Kümese yem çuvalı bırak, çıkan taze yumurtayı alıp reyonuna diz ve sat!")},"🐔");this.upgradeZones.push(t)}}checkFirstEggSold(){if(!this.unlockedStages.chickenUpgrades){this.unlockedStages.chickenUpgrades=!0;const t=this.coops[0];if(t){const n=new Ne(this.engine.scene,-23,6.2,70,zt.t("buy_chicken_2"),()=>{t.addChicken(),this.hud.showToast("🐔 2. Tavuk Kümese Katıldı! (2x Hızlı Yumurtlama)","#f1c40f");const i=new Ne(this.engine.scene,-23,6.2,95,zt.t("buy_chicken_3"),()=>{t.addChicken(),this.hud.showToast("🐔 3. Tavuk Kümese Katıldı! (Süper Hızlı Yumurtlama)","#e67e22")},"🐔");this.upgradeZones.push(i)},"🐔");this.upgradeZones.push(n)}const e=new Ne(this.engine.scene,-18,0,150,zt.t("hire_farm_caretaker"),()=>{const n=new fs(this.engine.scene,be.FARM_CARETAKER,new P(-18,0,0));this.workers.push(n),this.hud.showToast("🧑‍🌾 Çiftlik Bakıcısı İşe Alındı! Yem değirmeni ve kümesi o besleyecek!","#2ecc71")},"🧑‍🌾");this.upgradeZones.push(e),this.spawnWheatAndBakeryZone()}}spawnWheatAndBakeryZone(){if(this.unlockedStages.bakeryZone)return;this.unlockedStages.bakeryZone=!0;const t=new Ne(this.engine.scene,-23,0,180,zt.t("unlock_bakery"),()=>{const e=new ps(this.engine.scene,-18,-7,gt.WHEAT,"Buğday Tarlası",this.environment);this.farmPlots.push(e);const n=new I_(this.engine.scene,-23,0,this.environment);this.ovens.push(n);const i=new oi(this.engine.scene,11,-1,gt.BREAD,6,"Taş Fırın Ekmek",this.environment);this.shelves.push(i),this.unlockedProducts.push(gt.BREAD),this.spawner.setUnlockedProducts(this.unlockedProducts),this.hud.showToast("🍞 Taş Fırın & Taze Ekmek Üretimi Başladı!","#cd6133"),this.hud.setQuest("🍞 Fırına 2 buğday ve 1 yumurta bırak, pişen ekmeği reyonuna diz ve müşteriye sat!")},"🍞");this.upgradeZones.push(t)}checkFirstBreadSold(){if(!this.unlockedStages.restaurantZone){this.unlockedStages.restaurantZone=!0;const t=new Ne(this.engine.scene,-30,0,250,zt.t("unlock_restaurant"),()=>{const e=new ql(this.engine.scene,-30,4,gt.BURGER,this.environment);this.kitchens.push(e);const n=new ql(this.engine.scene,-30,-4,gt.PIZZA,this.environment);this.kitchens.push(n);const i=new qr(this.engine.scene,-38,4,1,this.environment),s=new qr(this.engine.scene,-38,-4,2,this.environment),a=new qr(this.engine.scene,-44,4,3,this.environment),o=new qr(this.engine.scene,-44,-4,4,this.environment);this.tables.push(i,s,a,o),this.spawner.setRestaurantUnlocked(!0),this.hud.showToast("👑 GURME RESTORAN AÇILDI!","#9b59b6"),this.hud.setQuest("🍔 Mutfak tezgahına Ekmek ve Domates koyup ilk Gurme Burgerini pişir!")},"👑");this.upgradeZones.push(t)}}checkFirstTableServedAndTipped(){if(!this.unlockedStages.chefAndWaiterZone){this.unlockedStages.chefAndWaiterZone=!0;const t=new Ne(this.engine.scene,-34,0,220,zt.t("hire_waiter"),()=>{const e=new fs(this.engine.scene,be.CHEF,new P(-30,0,0)),n=new fs(this.engine.scene,be.WAITER,new P(-35,0,0));this.workers.push(e,n),this.hud.showToast("🧑‍🍳 Şef & 🧑‍💼 Garson İşe Alındı! Restoran tam otomatik!","#2ecc71"),this.hud.setQuest("🏆 TEBRİKLER! Tüm Mega Mart & Gurme Restoran İmparatorluğunu Tamamladın!")},"🧑‍🍳");this.upgradeZones.push(t),this.hud.setQuest("🧑‍🍳 Restoran Şefi ve 🧑‍💼 Garsonu ($220) işe alarak tam otomasyona geç!")}}animate(){requestAnimationFrame(this.animate);const t=Math.min(this.clock.getDelta(),.1)*this.debugSpeedMultiplier,e=this.clock.getElapsedTime(),n=this.ads.getSpeedMultiplier(),i=this.input.getMovementVector(),s=this.environment.getObstacles();this.player.update(t,i,s),this.engine.followTarget(this.player.mesh.position,t),this.environment.update(t,e),this.farmPlots.forEach(o=>o.update(t,this.player,n)),this.machines.forEach(o=>o.update(t,this.player,e,n,(c,l)=>{l.id==="TOMATO_PASTE"?(this.manualStats.pasteProduced++,this.hud.setQuest("🥫 Salçayı alıp Salça Reyonuna diz ve müşteriye sat!")):l.id==="ORANGE_JUICE"?(this.manualStats.juiceProduced++,this.hud.setQuest("🧃 Taze portakal suyunu reyonuna diz ve müşteriye sat!")):l.id==="POPCORN"?(this.manualStats.popcornProduced++,this.hud.setQuest("🍿 Sıcak popcorn kutusunu reyonuna diz ve müşteriye sat!")):l.id==="CHICKEN_FEED"&&(this.manualStats.feedProduced++,this.hud.setQuest("🐔 Tavuk Kümesini ($150) inşa et!"),this.checkFirstFeedProduced())})),this.coops.forEach(o=>o.update(t,this.player,e,n,c=>{this.manualStats.eggCollected++,this.hud.setQuest("🥚 Yumurtaları Yumurta Reyonuna diz ve müşteriye sat!")})),this.ovens.forEach(o=>o.update(t,this.player,e,n,c=>{this.manualStats.breadProduced++,this.hud.setQuest("🍞 Taze ekmeği reyonuna diz ve müşteriye sat!")})),this.kitchens.forEach(o=>o.update(t,this.player,e,n,c=>{this.manualStats.burgerCollected++,this.hud.showToast(`${c.icon} ${c.id==="BURGER"?"Burger":"Pizza"} Alındı! Masaya götür!`,"#9b59b6"),this.hud.setQuest("🍽️ Yemeği masada sipariş bekleyen müşteriye bizzat servis et!")},(c,l)=>{this.hud.showToast(`+1 ${c.icon} Mutfak Tezgahına Eklendi!`,"#3498db")})),this.tables.forEach(o=>o.update(t,this.player,e,c=>{this.playerMoney+=c,this.hud.updateMoney(this.playerMoney),this.hud.showToast(`+${c} 💵 ${zt.t("tip_toast")}`,"#f1c40f"),this.manualStats.tipsCollected++,this.checkFirstTableServedAndTipped()},(c,l)=>{this.manualStats.tablesServed++,this.hud.showToast(`🍽️ Masa #${l}'e ${c.icon} servis edildi! Müşteri yiyor...`,"#2ecc71"),this.hud.setQuest("💵 Müşteri yemeğini bitirince masada bıraktığı bahşişi topla!")})),this.shelves.forEach(o=>o.update(t,this.player,e)),this.register.update(t,this.player);const a={farmPlots:this.farmPlots,shelves:this.shelves,machines:this.machines,coops:this.coops,ovens:this.ovens,kitchens:this.kitchens,tables:this.tables,register:this.register};this.workers.forEach(o=>o.update(t,a)),this.spawner.update(t,this.shelves,this.register,this.tables,(o,c=[])=>{this.playerMoney+=o,this.hud.updateMoney(this.playerMoney),this.hud.showToast(`+${o} 💵 ${zt.t("sale_toast")}`,"#2ecc71"),c.forEach(l=>{l.id==="TOMATO"?(this.manualStats.tomatoSold++,this.manualStats.tomatoSold===1&&this.checkFirstTomatoSold()):l.id==="TOMATO_PASTE"?(this.manualStats.pasteSold++,this.manualStats.pasteSold===1&&this.checkFirstPasteSold()):l.id==="ORANGE_JUICE"||l.id==="ORANGE"?(this.manualStats.juiceSold++,this.manualStats.juiceSold===1&&this.checkFirstJuiceSold()):l.id==="CORN"?(this.manualStats.cornSold++,this.manualStats.cornSold===1&&this.checkFirstCornSold()):l.id==="POPCORN"?(this.manualStats.popcornSold++,this.manualStats.popcornSold===1&&this.checkFirstPopcornSold()):l.id==="EGG"?(this.manualStats.eggSold++,this.manualStats.eggSold===1&&this.checkFirstEggSold()):l.id==="BREAD"&&(this.manualStats.breadSold++,this.manualStats.breadSold===1&&this.checkFirstBreadSold())})}),this.upgradeZones.forEach(o=>{o.update(t,this.player,this.playerMoney,c=>{this.playerMoney-=c,this.hud.updateMoney(this.playerMoney)})}),this.player&&this.player.mesh&&this.ads.update(t,this.player.mesh.position),this.hud.updateStack(this.player.stack.getCount(),this.player.stack.maxCapacity),this.engine.render()}}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",()=>{new uh}):new uh;
