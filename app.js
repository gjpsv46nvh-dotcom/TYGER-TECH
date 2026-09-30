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

// TYGERME V7 interactive 3D-style case customiser
(()=>{
 const stage=document.querySelector('#viewerStage'), model=document.querySelector('#case3d'), design=document.querySelector('#customDesign'), phone=document.querySelector('#customPhone'), addBtn=document.querySelector('#customAdd');
 if(!stage||!model)return; let y=-28,x=-8,drag=false,last=0,auto=true;
 const draw=()=>model.style.transform=`rotateX(${x}deg) rotateY(${y}deg)`;
 const start=e=>{drag=true;auto=false;last=(e.touches?e.touches[0].clientX:e.clientX)};
 const move=e=>{if(!drag)return;e.preventDefault();let n=(e.touches?e.touches[0].clientX:e.clientX);y+=(n-last)*.65;last=n;draw()};
 const end=()=>{drag=false;setTimeout(()=>auto=true,1600)};
 stage.addEventListener('pointerdown',start);stage.addEventListener('pointermove',move);window.addEventListener('pointerup',end);
 stage.addEventListener('touchstart',start,{passive:true});stage.addEventListener('touchmove',move,{passive:false});stage.addEventListener('touchend',end);
 stage.addEventListener('dblclick',()=>{x=-8;y=-28;draw()});
 design.onchange=()=>{model.className='case3d '+design.value};
 addBtn.onclick=()=>{cart.push({id:'custom-'+Date.now(),name:`${design.options[design.selectedIndex].text} — ${phone.value}`,desc:'TYGERME custom case',price:49.95,type:'case',device:'custom'});updateCart();toast('Custom case added to bag')};
 setInterval(()=>{if(auto){y+=.35;draw()}},30);
})();
