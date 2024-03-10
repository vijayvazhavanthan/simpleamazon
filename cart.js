export let cart=JSON.parse(localStorage.getItem('cart'))||[];

export let quatty=JSON.parse(localStorage.getItem('quantity'))|| 0;

/*localStorage.removeItem('cart');*/

export function removeelement(prodel){
    const newcart=[];
    const neww=[];
    cart.forEach((cartitem) => {
        if(prodel!=cartitem.productName)
        {
            newcart.push(cartitem);
        }
    });
    shippingquantity.forEach((ship)=>{
        if(prodel!=ship.name){
            neww.push(ship);
        }
    });
    cart=newcart;
    shippingquantity=neww;
    localStorage.setItem('cart',JSON.stringify(cart));
}


export let deliveryshippingday=[{
    id:1,
    day:7,
    shipping:'Free'
},{
    id:2,
    day:3,
    shipping:100
},{
    id:3,
    day:1,
    shipping:200
}];


export let shippingquantity=[];
console.log(shippingquantity);


export function shippingqu(price,checks){
    let ans=0;
    shippingquantity.forEach((check)=>{
        if(check.name===checks){
            check.pricee=price;
            ans=1;
        }
    });
    if(ans===0){
        shippingquantity.push({pricee:`${price}`,name:`${checks}`});
    }  
}


