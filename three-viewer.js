import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js';

const $=s=>document.querySelector(s);
const canvas=$('#tyger3dCanvas');
if(canvas){
const stage=$('#viewerStage'), phoneSel=$('#customPhone'), designSel=$('#customDesign'), rangeSel=$('#caseRange'), designLabel=$('#designLabel'), siliconePicker=$('#siliconePicker'), swatches=$('#colourSwatches'), colourName=$('#siliconeColourName'), spec=$('#selectedSpec'), addBtn=$('#customAdd');
const catalog={
 iphone:[
  ['iPhone 18 Pro Max','pro',78.0,163.4,8.75],['iPhone 18 Pro','pro',71.9,149.6,8.75],
  ['iPhone 17 Pro Max','pro',78.0,163.4,8.75],['iPhone 17 Pro','pro',71.9,150.0,8.75],['iPhone 17','dual',71.5,149.6,8.0],['iPhone 17e','dual',71.5,146.7,8.0],['iPhone Air','dual',74.7,156.2,6.0],
  ['iPhone 16 Pro Max','pro',77.6,163.0,8.25],['iPhone 16 Pro','pro',71.5,149.6,8.25],['iPhone 16 Plus','dual',77.8,160.9,7.8],['iPhone 16','dual',71.6,147.6,7.8],['iPhone 16e','dual',71.5,146.7,7.8],
  ['iPhone 15 Pro Max','pro',76.7,159.9,8.25],['iPhone 15 Pro','pro',70.6,146.6,8.25],['iPhone 15 Plus','dual',77.8,160.9,7.8],['iPhone 15','dual',71.6,147.6,7.8]
 ],
 samsung:[
  ['Galaxy S26 Ultra','ultra',78.1,163.6,7.9],['Galaxy S26+','triple',75.8,158.4,7.3],['Galaxy S26','triple',71.7,149.6,7.2],
  ['Galaxy S25 Ultra','ultra',77.6,162.8,8.2],['Galaxy S25+','triple',75.8,158.4,7.3],['Galaxy S25','triple',70.5,146.9,7.2],
  ['Galaxy S24 Ultra','ultra',79.0,162.3,8.6],['Galaxy S24+','triple',75.9,158.5,7.7],['Galaxy S24','triple',70.6,147.0,7.6]
 ]
};
let brand='iphone', finish='gloss', productGroup=null, siliconeColour='black';
const siliconeColours={black:['Black',0x17181b],white:['White',0xf1f0eb],stone:['Stone',0xb9b0a4],navy:['Navy',0x25344a],sage:['Sage Green',0x9aa88d],forest:['Forest Green',0x365844],pink:['Dusty Pink',0xd9a9ad],lilac:['Lilac',0xb9a7ca],sky:['Sky Blue',0x91b8cf],red:['Red',0xb9343c]};
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(34,1,.1,100);
camera.position.set(8.4,1.8,21.5);
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setClearColor(0x000000,0); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace; renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.18;
const controls=new OrbitControls(camera,canvas); controls.enableDamping=true; controls.dampingFactor=.06; controls.enablePan=false; controls.minDistance=14; controls.maxDistance=31; controls.autoRotate=true; controls.autoRotateSpeed=1.35; controls.target.set(0,0,0);
controls.addEventListener('start',()=>controls.autoRotate=false); controls.addEventListener('end',()=>setTimeout(()=>controls.autoRotate=true,1800));
scene.add(new THREE.HemisphereLight(0xeaf3ff,0x17130f,2.2));
const key=new THREE.DirectionalLight(0xffffff,4.2); key.position.set(7,10,12);key.castShadow=true;scene.add(key);
const rim=new THREE.DirectionalLight(0x9fc4ff,2.4); rim.position.set(-9,4,-10);scene.add(rim);
const warm=new THREE.PointLight(0xffd39b,2.2,40);warm.position.set(5,-5,-8);scene.add(warm);
const floor=new THREE.Mesh(new THREE.CircleGeometry(7,64),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.2,depthWrite:false}));floor.scale.y=.24;floor.rotation.x=-Math.PI/2;floor.position.y=-9.3;scene.add(floor);

function roundedShape(w,h,r){const x=-w/2,y=-h/2,s=new THREE.Shape();s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s}
function roundedBox(w,h,d,r,mat){const g=new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSegments:14,steps:1,bevelSize:.10,bevelThickness:.09,curveSegments:40});g.center();return new THREE.Mesh(g,mat)}
function leopardTexture(){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');x.fillStyle='#b88a55';x.fillRect(0,0,512,512);for(let i=0;i<55;i++){const px=(i*137)%512,py=(i*83)%512,rx=16+(i%4)*5,ry=22+(i%3)*5;x.save();x.translate(px,py);x.rotate((i%7)*.31);x.fillStyle='#5a3a20';x.beginPath();x.ellipse(0,0,rx,ry,0,0,Math.PI*2);x.fill();x.fillStyle='#15110e';x.beginPath();x.ellipse(0,0,rx*.52,ry*.55,0,0,Math.PI*2);x.fill();x.restore()}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t}
const leopard=leopardTexture();
function caseMaterial(){
 const range=rangeSel.value;
 if(range==='silicone'){const color=siliconeColours[siliconeColour][1];return new THREE.MeshPhysicalMaterial({color,roughness:.94,metalness:0,clearcoat:.01,sheen:.35,sheenRoughness:.96});}
 if(range==='clear')return new THREE.MeshPhysicalMaterial({color:0xdde8ee,transparent:true,opacity:.28,roughness:.08,metalness:0,transmission:.48,thickness:.55,clearcoat:1,side:THREE.DoubleSide});
 if(range==='tough')return new THREE.MeshPhysicalMaterial({color:0x1b1d21,roughness:.5,metalness:0,clearcoat:.08});
 const d=designSel.value;let color=d==='black'?0x111216:d==='stone'?0xc9c1b5:0xffffff;return new THREE.MeshPhysicalMaterial({color,map:d==='leopard'?leopard:null,roughness:finish==='matte'?.62:.18,metalness:.03,clearcoat:finish==='matte'?.08:1,clearcoatRoughness:.08})
}
function addLens(g,x,y,z,r=.53){const outer=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.12,80),new THREE.MeshPhysicalMaterial({color:0x333840,metalness:.8,roughness:.2}));outer.rotation.x=Math.PI/2;outer.position.set(x,y,z);g.add(outer);const glass=new THREE.Mesh(new THREE.CylinderGeometry(r*.74,r*.74,.14,80),new THREE.MeshPhysicalMaterial({color:0x07111d,metalness:.35,roughness:.05,clearcoat:1}));glass.rotation.x=Math.PI/2;glass.position.set(x,y,z-.05);g.add(glass);const glint=new THREE.Mesh(new THREE.SphereGeometry(r*.15,16,8),new THREE.MeshBasicMaterial({color:0x8fb8d9,transparent:true,opacity:.7}));glint.position.set(x-.13,y+.14,z-.2);g.add(glint)}
function build(){
 if(productGroup){scene.remove(productGroup);productGroup.traverse(o=>{if(o.geometry)o.geometry.dispose()})} productGroup=new THREE.Group();scene.add(productGroup);
 const m=catalog[brand][+phoneSel.value||0], W=m[2]/10,H=m[3]/10,D=m[4]/10, R=brand==='samsung'&&m[1]==='ultra'?.72:1.22;
 const frameMat=new THREE.MeshPhysicalMaterial({color:brand==='iphone'?0x7d8187:0x62676d,metalness:.9,roughness:.16,clearcoat:1,clearcoatRoughness:.12});
 const body=roundedBox(W,H,D,R,frameMat);productGroup.add(body);
 const screenMat=new THREE.MeshPhysicalMaterial({color:0x05080d,roughness:.04,metalness:.1,clearcoat:1});
 const screen=roundedBox(W-.24,H-.24,.055,Math.max(.5,R-.12),screenMat);screen.position.z=D/2+.08;productGroup.add(screen);
 const wallpaper=document.createElement('canvas');wallpaper.width=512;wallpaper.height=1024;const wx=wallpaper.getContext('2d');const grad=wx.createLinearGradient(0,0,512,1024);grad.addColorStop(0,'#152339');grad.addColorStop(.45,'#49365e');grad.addColorStop(1,'#9a5e42');wx.fillStyle=grad;wx.fillRect(0,0,512,1024);wx.fillStyle='rgba(255,255,255,.13)';wx.beginPath();wx.arc(390,270,210,0,Math.PI*2);wx.fill();const wt=new THREE.CanvasTexture(wallpaper);wt.colorSpace=THREE.SRGBColorSpace;const display=new THREE.Mesh(new THREE.PlaneGeometry(W-.48,H-.48),new THREE.MeshBasicMaterial({map:wt}));display.position.z=D/2+.125;productGroup.add(display);
 // realistic front cutout: Dynamic Island on iPhone, punch-hole on Galaxy
 if(brand==='iphone' && !m[0].includes('16e') && !m[0].includes('17e')){const island=new THREE.Mesh(new THREE.CapsuleGeometry(.20,.72,8,20),new THREE.MeshPhysicalMaterial({color:0x010101,roughness:.18,clearcoat:1}));island.rotation.z=Math.PI/2;island.position.set(0,H/2-.72,D/2+.17);productGroup.add(island);}else{const hole=new THREE.Mesh(new THREE.CircleGeometry(.12,24),new THREE.MeshBasicMaterial({color:0x010101}));hole.position.set(0,H/2-.55,D/2+.18);productGroup.add(hole);}
 // side controls and lower hardware details
 const metal=new THREE.MeshPhysicalMaterial({color:0x858a91,metalness:.92,roughness:.17,clearcoat:.8});
 function sideButton(x,y,z,w,h,d){const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),metal);b.position.set(x,y,z);productGroup.add(b)}
 sideButton(-W/2-.06,H*.18,0,.10,1.15,.28); sideButton(W/2+.06,H*.17,0,.10,1.55,.28);
 if(brand==='iphone'){sideButton(-W/2-.06,H*.31,0,.10,.48,.28); if(m[0].includes('16')||m[0].includes('17')||m[0].includes('18'))sideButton(W/2+.07,-H*.18,0,.11,.82,.30);}
 const port=new THREE.Mesh(new THREE.BoxGeometry(.78,.10,.12),new THREE.MeshBasicMaterial({color:0x08090b}));port.position.set(0,-H/2-.055,.05);productGroup.add(port);
 for(let i=-3;i<=3;i++){if(i===0)continue;const sp=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.12,10),new THREE.MeshBasicMaterial({color:0x111317}));sp.rotation.z=Math.PI/2;sp.position.set(i*.16,-H/2-.06,.05);productGroup.add(sp)}
 // case: real back plate + four raised rails, leaving front glass visible
 const cm=caseMaterial(),cw=W+.42,ch=H+.42,caseD=.34;
 const back=roundedBox(cw,ch,.16,R+.24,cm);back.position.z=-D/2-.17;productGroup.add(back);
 const railMat=cm.clone(); if(rangeSel.value==='clear')railMat.opacity=.48;
 const sideDepth=D+.30;
 const left=new THREE.Mesh(new THREE.BoxGeometry(.14,ch-1.0,sideDepth),railMat);left.position.set(-cw/2+.09,0,0);productGroup.add(left);
 const right=left.clone();right.position.x=cw/2-.09;productGroup.add(right);
 const top=new THREE.Mesh(new THREE.BoxGeometry(cw-1.0,.14,sideDepth),railMat);top.position.set(0,ch/2-.09,0);productGroup.add(top);
 const bottom=top.clone();bottom.position.y=-ch/2+.09;productGroup.add(bottom);
 // front lip, clearly visible from front
 const lipMat=railMat.clone();const lipZ=D/2+.13;
 [left,right,top,bottom].forEach(()=>{});
 const fl=new THREE.Mesh(new THREE.BoxGeometry(.10,ch-.7,.10),lipMat);fl.position.set(-cw/2+.10,0,lipZ);productGroup.add(fl);const fr=fl.clone();fr.position.x=cw/2-.10;productGroup.add(fr);
 const ft=new THREE.Mesh(new THREE.BoxGeometry(cw-.7,.10,.10),lipMat);ft.position.set(0,ch/2-.10,lipZ);productGroup.add(ft);const fb=ft.clone();fb.position.y=-ch/2+.10;productGroup.add(fb);
 // camera geometry on back
 const z=-D/2-.34; const cam=new THREE.Group();productGroup.add(cam);
 if(brand==='iphone'){
   const bump=roundedBox(m[1]==='dual'?2.7:3.48,m[1]==='dual'?2.7:3.48,.14,.62,cm.clone());bump.position.set(-W/2+(m[1]==='dual'?1.65:2.05),H/2-(m[1]==='dual'?1.65:2.05),z+.06);cam.add(bump);
   if(m[1]==='dual'){addLens(cam,-W/2+1.25,H/2-1.18,z-.08,.52);addLens(cam,-W/2+2.05,H/2-2.05,z-.08,.52)}
   else {addLens(cam,-W/2+1.25,H/2-1.20,z-.08,.53);addLens(cam,-W/2+2.35,H/2-1.85,z-.08,.53);addLens(cam,-W/2+1.30,H/2-2.60,z-.08,.53);const flash=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.12,28),new THREE.MeshPhysicalMaterial({color:0xfff1c7,emissive:0x6b5528,roughness:.18}));flash.rotation.x=Math.PI/2;flash.position.set(-W/2+2.55,H/2-2.85,z-.18);cam.add(flash);const lidar=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.12,24),new THREE.MeshPhysicalMaterial({color:0x151a20,roughness:.12,clearcoat:1}));lidar.rotation.x=Math.PI/2;lidar.position.set(-W/2+2.58,H/2-2.45,z-.18);cam.add(lidar)}
 } else {
   addLens(cam,-W/2+1.12,H/2-1.25,z-.08,.50);addLens(cam,-W/2+1.12,H/2-2.55,z-.08,.50);addLens(cam,-W/2+1.12,H/2-3.85,z-.08,.50);
   if(m[1]==='ultra')addLens(cam,-W/2+2.28,H/2-2.05,z-.08,.32);
 }
 // logo on back as canvas sprite-like plane
 if(rangeSel.value==='printed'){const lc=document.createElement('canvas');lc.width=512;lc.height=100;const lx=lc.getContext('2d');lx.font='900 58px Arial';lx.textAlign='center';lx.fillStyle=designSel.value==='black'?'#d7b36a':'#d0a354';lx.fillText('TYGERME',256,67);const lt=new THREE.CanvasTexture(lc);lt.colorSpace=THREE.SRGBColorSpace;const logo=new THREE.Mesh(new THREE.PlaneGeometry(4.4,.86),new THREE.MeshBasicMaterial({map:lt,transparent:true,side:THREE.DoubleSide}));logo.position.set(0,-H/2+2.0,-D/2-.43);logo.rotation.y=Math.PI;productGroup.add(logo);}
 productGroup.rotation.x=-.08;
 const rangeName=rangeSel.options[rangeSel.selectedIndex].text;const detail=rangeSel.value==='silicone'?siliconeColours[siliconeColour][0]+' • Matte • No logo':rangeSel.value==='printed'?(designSel.options[designSel.selectedIndex].text+' • '+finish):rangeName;spec.textContent=`${m[0]} • ${rangeName} • ${detail}`;
}
function populate(){phoneSel.innerHTML=catalog[brand].map((m,i)=>`<option value="${i}">${m[0]}</option>`).join('');build()}
document.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{brand=b.dataset.brand;document.querySelectorAll('[data-brand]').forEach(x=>x.classList.toggle('active',x===b));populate()});
document.querySelectorAll('[data-finish]').forEach(b=>b.onclick=()=>{finish=b.dataset.finish;document.querySelectorAll('[data-finish]').forEach(x=>x.classList.toggle('active',x===b));build()});
phoneSel.onchange=build;designSel.onchange=build;
function syncRange(){document.querySelector('#customPrice').textContent=rangeSel.value==='silicone'?'$34.95':'$49.95';const silicone=rangeSel.value==='silicone', printed=rangeSel.value==='printed';siliconePicker.hidden=!silicone;designLabel.hidden=!printed;document.querySelector('.finish-row').hidden=!printed;if(silicone)finish='matte';build()}
rangeSel.onchange=syncRange;
Object.entries(siliconeColours).forEach(([key,[name,color]])=>{const b=document.createElement('button');b.type='button';b.className='colour-swatch'+(key===siliconeColour?' active':'');b.style.background='#'+color.toString(16).padStart(6,'0');b.title=name;b.setAttribute('aria-label',name);b.onclick=()=>{siliconeColour=key;document.querySelectorAll('.colour-swatch').forEach(x=>x.classList.toggle('active',x===b));colourName.textContent=name;build()};swatches.appendChild(b)});
addBtn.onclick=()=>{const m=catalog[brand][+phoneSel.value||0];const rn=rangeSel.options[rangeSel.selectedIndex].text;const variant=rangeSel.value==='silicone'?siliconeColours[siliconeColour][0]:rangeSel.value==='printed'?designSel.options[designSel.selectedIndex].text:rn;cart.push({id:'custom-'+Date.now(),name:`${rn} — ${variant} — ${m[0]}`,desc:`TYGERME ${rangeSel.value==='silicone'?'matte no-logo':finish} case`,price:rangeSel.value==='silicone'?34.95:49.95,type:'case',device:brand});updateCart();toast('Custom case added to bag')};
$('#viewReset').onclick=()=>{camera.position.set(8.4,1.8,21.5);controls.target.set(0,0,0);controls.autoRotate=true;controls.update()};
function smoothView(pos, auto=false){camera.position.set(...pos);controls.target.set(0,0,0);controls.autoRotate=auto;controls.update()}
const vf=$('#viewFront'),vb=$('#viewBack'),v360=$('#view360');
if(vf)vf.onclick=()=>smoothView([0,0,20],false);
if(vb)vb.onclick=()=>smoothView([0,0,-20],false);
if(v360)v360.onclick=()=>smoothView([8.4,1.8,21.5],true);
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
new ResizeObserver(resize).observe(stage);resize();populate();
renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera)});
}
