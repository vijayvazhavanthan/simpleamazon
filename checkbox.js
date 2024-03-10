import {cart,removeelement,deliveryshippingday,shippingqu,shippingquantity} from './cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';



console.log('hi');

let checkhtml='';


cart.forEach((check)=>{
    
checkhtml+=`
<div class="order-box delete-item-${check.productName}" style="width:100%;">
    <div class="delivery">
        <div style="display:inline; padding-left:30px;">
            Delivery date:
        </div>
        <div style="display:inline;" class="js-delivery-date-fix" id="v-${check.productName}" >
            
        </div>
    </div>

    <div class="detail-checkout">
        <div style="flex:1; padding-left:30px;">
            <img src="images/${check.productName}.jpg" class="images">
        </div>
        <div style="flex:1;">
             <div class="product-name"> 
                ${check.productName}
             </div>
             <div class="product-price">
                 &#x20B9 ${check.productPrice}
             </div>
             <div class="product-quantity">
                 quantity:${check.quantity}
                 
                 <button class="button delete-js-button" id="${check.productName}" data-product-delete="${check.productName}">Delete</button>
             </div>
        </div>
        <div style="flex:1;">
            <div>
             <div class="product-name">Choose a delivery option:</div>
             ${ship(deliveryshippingday,check.productName)}
            </div>
        </div>
    </div>
</div>
<br>
 `;
 document.querySelector('.js-cart-product').innerHTML=checkhtml;
});

/*<button class="button">Update</button>*/

document.querySelectorAll('.delete-js-button').forEach((button)=>{
    button.addEventListener('click',()=>{
    let prodel=button.dataset.productDelete;
    console.log(prodel);
    const removeproduct=document.querySelector(`.delete-item-${prodel}`);
    console.log(removeproduct);
    removeproduct.remove();
    console.log(cart);
    removeelement(prodel);
    console.log(cart);
    summarydelivery(cart,shippingquantity);
    checkout(cart);
});});




function ship(deliveryshipping,checks){  
     
    let deliveryhtml='';
    deliveryshipping.forEach((deliveryshippingitem)=>{
        
        let date=dayjs();
        let price,days;
        if(deliveryshippingitem.id===1){
            price=deliveryshippingitem.shipping;
            let dateadd=date.add(deliveryshippingitem.day, 'days');
            days=dateadd.format('dddd,MMMM D');
        }else if(deliveryshippingitem.id===2){
            price=deliveryshippingitem.shipping;
            let dateadd=date.add(deliveryshippingitem.day, 'days');
            days=dateadd.format('dddd,MMMM D');
        }else{
            price=deliveryshippingitem.shipping;
            let dateadd=date.add(deliveryshippingitem.day, 'days');
            days=dateadd.format('dddd, MMMM D');
        }
        deliveryhtml+=`
        <div style="margin-bottom:10px;" >
        <s style="display:inline;" class="js-rad" onclick="
        shippingqu(${price},${checks});
        ">
            <input type="radio"  class="radio" name="${checks}" onclick="                
                let getcompare=document.getElementById('v-${checks}');
                let v=document.getElementById('${days}').innerHTML;
                getcompare.innerHTML='';
                getcompare.innerHTML=v;
                ${shippingqu(price,checks)};
                shippingqu(${price},${checks});
                " checked>
        </s>
        <div style="display:inline;">
            <span style="display:inline;" class="delivery-date js-deliverydate " id="${days}" >${days}</span>
            <div class="delivery-shipping ">
                ${price}-Shipping
            </div>
        </div>
    </div>
        `;
  
    });
    console.log(deliveryhtml);
    return deliveryhtml;
} 






export function summarydelivery(cart,shippingquantity){
    let items=0;
    let correctvalue=0;
    let price=0;
    let total=0;
    let tax=0;
    let summary='';
    let fulltotal=0;
    cart.forEach((check)=>{
        correctvalue=Number(check.quantity)*Number(check.productPrice);
        items+=correctvalue;
    }  
    );
    shippingquantity.forEach((pricess)=>{
        price+=pricess.pricee;
    }); 
    total=price+items;
    tax=(total*(10/100));
    fulltotal=total+tax;
    console.log(items,price,total,tax,fulltotal);
    summary+=`
    <center>
    <table class="order">
                    <tr  >
                        <td width="200px">Items(11):</td>
                        <td align="end">&#x20B9 ${items}</td>
                    </tr>
                    <tr>
                        <td>Shippping & handling:</td>
                        <td align="end">&#x20B9 ${price}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><hr></td>
                    </tr>
                    <tr>
                        <td>Total before tax:</td>
                        <td align="end">&#x20B9 ${total}</td>
                    </tr>
                    <tr>
                        <td>Estimated tax(10%):</td>
                        <td align="end">&#x20B9 ${tax}</td>
                    </tr>
                    <tr>
                        <td colspan="2"><hr></td>
                    </tr>
                    <tr>
                        <td class="answer">Order total:</td>
                        <td align="end" class="answer">&#x20B9 ${fulltotal}</td>
                    </tr>
        </table>
        <div style="margin-top:10px;">
            <div class="paypal">Use PayPal <input class="checkbox" type="checkbox" ></div>
        </div>
        <button class="place-order">Place your order</button>
        </center>
    `;
    document.querySelector('.js-summary-order').innerHTML=summary;
}

summarydelivery(cart,shippingquantity);

function checkout(cart){
    document.querySelector('.js-quantity-of-purchase').innerHTML=`Checkout(${cart.length}items)`;
}
checkout(cart);