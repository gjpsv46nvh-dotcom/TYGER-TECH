import Stripe from "stripe";

const CATALOG = {
  1:{name:"Magnetic Shield Case",unit_amount:3495},
  2:{name:"Clear Magnetic Case",unit_amount:2995},
  3:{name:"35W Dual USB-C Charger",unit_amount:3995},
  4:{name:"Tempered Glass 2-Pack",unit_amount:1995},
  5:{name:"Samsung Armour Case",unit_amount:3295},
  6:{name:"Magnetic Car Mount",unit_amount:3695},
  7:{name:"Watch Protective Bumper",unit_amount:1895},
  8:{name:"Wireless Earbud Case",unit_amount:2295}
};

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  if(!process.env.STRIPE_SECRET_KEY) return res.status(503).json({error:"Stripe test mode is not connected yet."});
  try{
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const requested=Array.isArray(req.body?.items)?req.body.items:[];
    const line_items=requested.map(i=>{
      const p=CATALOG[Number(i.id)];
      if(!p) return null;
      const quantity=Math.max(1,Math.min(10,Number(i.quantity)||1));
      return {quantity,price_data:{currency:"aud",unit_amount:p.unit_amount,product_data:{name:p.name}}};
    }).filter(Boolean);
    if(!line_items.length) return res.status(400).json({error:"Your bag is empty."});
    const origin=`${req.headers["x-forwarded-proto"]||"https"}://${req.headers.host}`;
    const session=await stripe.checkout.sessions.create({
      mode:"payment",
      line_items,
      billing_address_collection:"auto",
      shipping_address_collection:{allowed_countries:["AU"]},
      phone_number_collection:{enabled:true},
      success_url:`${origin}/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${origin}/cancel/`,
      allow_promotion_codes:true
    });
    return res.status(200).json({url:session.url});
  }catch(err){
    return res.status(500).json({error:"Could not start checkout. Check the Stripe test configuration."});
  }
}
