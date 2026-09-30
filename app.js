const products=[
{id:1,name:"Magnetic Shield Case",desc:"MagSafe-compatible everyday protection",price:34.95,tag:"BEST SELLER",type:"case",device:"iphone",tone:"#1b1d21"},
{id:2,name:"Clear Magnetic Case",desc:"Crystal-clear case with magnetic ring",price:29.95,tag:"NEW",type:"case",device:"iphone",tone:"#b7c0c9"},
{id:3,name:"35W Dual USB-C Charger",desc:"Compact fast charging for two devices",price:39.95,tag:"FAST CHARGE",type:"charging",device:"all"},
{id:4,name:"Tempered Glass 2-Pack",desc:"Edge-to-edge screen protection",price:19.95,tag:"2 PACK",type:"protector",device:"iphone"},
{id:5,name:"Samsung Armour Case",desc:"Grippy shock protection for Galaxy",price:32.95,tag:"POPULAR",type:"case",device:"samsung",tone:"#39404a"},
{id:6,name:"Magnetic Car Mount",desc:"Secure magnetic mounting for the road",price:36.95,tag:"DRIVE",type:"charging",device:"all"},
{id:7,name:"Watch Protective Bumper",desc:"Slim everyday Apple Watch protection",price:18.95,tag:"WATCH",type:"case",device:"watch",tone:"#727983"},
{id:8,name:"Wireless Earbud Case",desc:"Clip-on protection for everyday carry",price:22.95,tag:"AUDIO",type:"case",device:"audio",tone:"#d2d5d8"}];
let cart=[];
const $=s=>document.querySelector(s);
function productHTML(p){return `<article class="product"><div class="product-image"><span class="badge">${p.tag}</span><div class="mock ${p.type}" style="--tone:${p.tone||'#222'}"></div></div><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><b>$${p.price.toFixed(2)}</b><button class="add" data-id="${p.id}">Add +</button></div></div></article>`}
function render(list=products){
 const grid=$("#productGrid");
 if(!grid) return;
 grid.innerHTML=list.length?list.map(productHTML).join(""):`<div class="no-results"><b>No products found.</b><br><small>Try another product, device or accessory type.</small></div>`;
 document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(+b.dataset.id))
}
function add(id){cart.push(products.find(p=>p.id===id));updateCart();toast("Added to bag")}
function updateCart(){$("#cartCount").textContent=cart.length;$("#subtotal").textContent="$"+cart.reduce((a,p)=>a+p.price,0).toFixed(2);$("#cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><div class="cart-thumb"></div><div><h4>${p.name}</h4><small>$${p.price.toFixed(2)}</small></div><button class="remove" data-i="${i}">×</button></div>`).join(""):`<p class="empty">Your bag is empty.</p>`;document.querySelectorAll(".remove").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);updateCart()})}
function openCart(){ $("#cartDrawer").classList.add("open");$("#overlay").classList.add("show")}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show")}
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.add("open");setTimeout(()=>$("#searchInput").focus(),200)}
$("#closeSearch").onclick=()=>$("#searchPanel").classList.remove("open");
$("#searchInput").oninput=e=>{const q=e.target.value.toLowerCase().trim();$("#searchResults").innerHTML=q?products.filter(p=>(p.name+" "+p.desc).toLowerCase().includes(q)).map(p=>`<div class="search-result"><b>${p.name}</b> — $${p.price.toFixed(2)}</div>`).join(""):""}
document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{const f=b.dataset.filter;render(products.filter(p=>p.device===f||p.device==="all"));location.hash="cases"})
$("#newsletterForm").onsubmit=e=>{e.preventDefault();toast("Thanks — you're on the list.");e.target.reset()}
$("#checkoutBtn").onclick=()=>toast("Secure checkout is coming next — V6 storefront is live.");
function toast(msg){let t=document.querySelector(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
render();updateCart();
function findProducts(q){
 q=(q||"").toLowerCase().trim();
 const list=!q?products:products.filter(p=>(p.name+" "+p.desc+" "+p.type+" "+p.device+" "+p.tag).toLowerCase().includes(q));
 render(list);
 const status=$("#finderStatus"), title=$("#productTitle");
 if(status) status.textContent=q?`${list.length} product${list.length===1?"":"s"} found for “${q}”`:"Showing all products";
 if(title) title.textContent=q?"Search results":"Best sellers";
 if(q) document.querySelector("#cases").scrollIntoView({behavior:"smooth",block:"start"});
}
const finder=$("#finderInput");
if(finder){
 finder.addEventListener("input",e=>findProducts(e.target.value));
 document.querySelectorAll("[data-query]").forEach(b=>b.addEventListener("click",()=>{finder.value=b.dataset.query;findProducts(b.dataset.query)}));
 $("#finderClear").onclick=()=>{finder.value="";findProducts("");finder.focus()};
}

// TYGERME V8 REALVIEW interactive configurator
(()=>{
 const stage=$('#viewerStage'), model=$('#case3d'), design=$('#customDesign'), phone=$('#customPhone'), addBtn=$('#customAdd'), spec=$('#selectedSpec');
 if(!stage||!model)return;
 const catalog={
  iphone:[
   ['iPhone 18 Pro Max','pro',78.0,163.4],['iPhone 18 Pro','pro',71.9,149.6],
   ['iPhone 17 Pro Max','pro',78.0,163.4],['iPhone 17 Pro','pro',71.9,150.0],['iPhone 17','dual',71.5,149.6],['iPhone 17e','dual',71.5,146.7],['iPhone Air','dual',74.7,156.2],
   ['iPhone 16 Pro Max','pro',77.6,163.0],['iPhone 16 Pro','pro',71.5,149.6],['iPhone 16 Plus','dual',77.8,160.9],['iPhone 16','dual',71.6,147.6],['iPhone 16e','dual',71.5,146.7],
   ['iPhone 15 Pro Max','pro',76.7,159.9],['iPhone 15 Pro','pro',70.6,146.6],['iPhone 15 Plus','dual',77.8,160.9],['iPhone 15','dual',71.6,147.6]
  ],
  samsung:[
   ['Galaxy S26 Ultra','ultra',78.1,163.6],['Galaxy S26+','triple',75.8,158.4],['Galaxy S26','triple',71.7,149.6],
   ['Galaxy S25 Ultra','ultra',77.6,162.8],['Galaxy S25+','triple',75.8,158.4],['Galaxy S25','triple',70.5,146.9],
   ['Galaxy S24 Ultra','ultra',79.0,162.3],['Galaxy S24+','triple',75.9,158.5],['Galaxy S24','triple',70.6,147.0]
  ]
 };
 let brand='iphone',finish='gloss',y=-28,x=-7,zoom=1,drag=false,lastX=0,lastY=0,auto=true;
 const renderCamera=type=>{const c=$('#cameraIsland');c.innerHTML='<i class="lens l1"></i><i class="lens l2"></i><i class="lens l3"></i><i class="flash"></i><i class="sensor"></i>';model.classList.toggle('dual',type==='dual');model.classList.toggle('pro',type==='pro'||type==='ultra');};
 const populate=()=>{phone.innerHTML=catalog[brand].map((m,i)=>`<option value="${i}">${m[0]}</option>`).join('');applyModel()};
 const applyModel=()=>{const m=catalog[brand][+phone.value||0],ratio=m[2]/m[3]; model.classList.toggle('iphone',brand==='iphone');model.classList.toggle('samsung',brand==='samsung');renderCamera(m[1]); const mobile=innerWidth<=560, h=mobile?352:462; model.style.setProperty('--ph',h+'px');model.style.setProperty('--pw',Math.round(h*ratio)+'px');spec.textContent=`${m[0]} • ${m[1]==='dual'?'Dual camera':m[1]==='ultra'?'Ultra camera':'Pro camera'} • ${finish[0].toUpperCase()+finish.slice(1)}`;};
 const draw=()=>model.style.transform=`rotateX(${x}deg) rotateY(${y}deg) scale(${zoom})`;
 document.querySelectorAll('[data-brand]').forEach(b=>b.onclick=()=>{brand=b.dataset.brand;document.querySelectorAll('[data-brand]').forEach(x=>x.classList.toggle('active',x===b));populate()});
 document.querySelectorAll('[data-finish]').forEach(b=>b.onclick=()=>{finish=b.dataset.finish;document.querySelectorAll('[data-finish]').forEach(x=>x.classList.toggle('active',x===b));model.classList.toggle('matte',finish==='matte');applyModel()});
 phone.onchange=applyModel;design.onchange=()=>{model.classList.remove('leopard','black','clear','stone');model.classList.add(design.value)};
 const start=e=>{drag=true;auto=false;lastX=e.clientX;lastY=e.clientY;stage.setPointerCapture?.(e.pointerId)};
 const move=e=>{if(!drag)return;y+=(e.clientX-lastX)*.55;x=Math.max(-28,Math.min(28,x-(e.clientY-lastY)*.25));lastX=e.clientX;lastY=e.clientY;draw()};
 const end=()=>{drag=false;setTimeout(()=>auto=true,1800)}; stage.addEventListener('pointerdown',start);stage.addEventListener('pointermove',move);stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
 stage.addEventListener('wheel',e=>{e.preventDefault();auto=false;zoom=Math.max(.78,Math.min(1.28,zoom-e.deltaY*.0008));draw();setTimeout(()=>auto=true,1500)},{passive:false});
 let lastTap=0;stage.addEventListener('click',()=>{let n=Date.now();if(n-lastTap<320){x=-7;y=-28;zoom=1;draw()}lastTap=n});
 addBtn.onclick=()=>{const m=catalog[brand][+phone.value||0];cart.push({id:'custom-'+Date.now(),name:`${design.options[design.selectedIndex].text} — ${m[0]}`,desc:`TYGERME ${finish} custom case`,price:49.95,type:'case',device:brand});updateCart();toast('Custom case added to bag')};
 populate();draw();setInterval(()=>{if(auto){y+=.28;draw()}},30);
})();
