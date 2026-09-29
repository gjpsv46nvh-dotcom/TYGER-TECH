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
function render(list=products){$("#productGrid").innerHTML=list.map(productHTML).join("");document.querySelectorAll(".add").forEach(b=>b.onclick=()=>add(+b.dataset.id))}
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
$("#checkoutBtn").onclick=()=>toast("V1 checkout demo — payment connection comes next.")
function toast(msg){let t=document.querySelector(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}
render();updateCart();