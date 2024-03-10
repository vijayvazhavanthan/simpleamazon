import {cart} from './cart.js';
import {quatty} from './cart.js';

let product=JSON.parse(localStorage.getItem('amazon-product'))||[{
    image:'athletic-cotton-socks-6-pairs.jpg',
    name:'athletic-cotton-socks-6-pairs',
    rate:{
        star:'rating-45 (1).png',
        count:87
    },
    price:200
},{
    image:'intermediate-composite-basketball.jpg',
    name:'intermediate-composite-basketball',
    rate:{
        star:'rating-4.png',
        count:90
    },
    price:400
}];


let html='';


function productEnter(){
    let image1=document.querySelector('.image').value;
    let name1=document.querySelector('.name').value;
    let star1=document.querySelector('.star').value;
    let count1=document.querySelector('.count').value;
    let price1=document.querySelector('.price').value;

    product.push({image:image1,name:`${name1}`,
    rate:{star:`${star1}`,count:`${count1}`},
    price:`${price1}`});

    localStorage.setItem('amazon-product',JSON.stringify(product));

    html='';

    product.forEach((products) => {
        html+= `
        <div class="amazon-product">
            <img class="amazon-product-image" src="images/${products.image}">
            <p>${products.name}</p>
            <div style="display:flex;align-items: center;vertical-align: center;">
                <img class="product-star"src="images/${products.rate.star}">
                <p class="product-star-count">${products.rate.count}</p>
            </div>
            <p style="margin:0;font-family:arial;font-size:18px;font-weight:bold;margin:5px;">&#x20B9 ${products.price}</p>
            <div class="successfully-added added"></div>
            <button class="add-button">Add to Cart</button>
            
        </div>`;
        document.querySelector('.product').innerHTML = html;     
    }
    )
}

/*<select class="select-button">
                <option>1</option><option>2</option><option>3</option>
 </select>*/

product.forEach((product) => {
    html += `
    <div class="amazon-product">
        <div>
        <img class="amazon-product-image" src="images/${product.image}">
        </div>
        <p>${product.name}</p>
        <div style="display:flex;align-items: center;vertical-align: center;">
            <img class="product-star"src="images/${product.rate.star}">
            <p class="product-star-count">${product.rate.count}</p>
        </div>
        <p style="margin:0;font-family:arial;font-size:18px;font-weight:bold;margin:5px;">&#x20B9 ${product.price}</p>
        <div class="successfully-added added" id="${product.name}"></div>
        <button class="add-button js-add-to-cart  " /*onclick="
        addToCard();
        "*/ data-product-name="${product.name}" data-product-price="${product.price}">Add to Cart</button>
        
    </div>`;
    document.querySelector('.product').innerHTML = html;
})

/*<select class="select-button">
            <option>1</option><option>2</option><option>3</option>
    </select>*/


localStorage.setItem('amazon-product',JSON.stringify(product));


/*localStorage.removeItem('amazon-product');*/



let n=document.querySelector('.newproductadd');
n.addEventListener('click',()=>{
    
        document.querySelector('.newProductAdd').classList.add('amazon-add-product');
        document.querySelector('.newProductAdd').innerHTML=`
        <div style="background-color:rgb(6, 6, 39); padding:20px;border-radius:4px;"> 
        <table style="color:white;">
            <tr>
                <td>Image path</td>
                <td><input class="image product-insert" type="text"></td>
            </tr>
            <tr>
                <td>Name of product</td>
                <td><input class="name product-insert"  type="text"></td>
            </tr>
            <tr>
                <td> Stars path</td>
                <td><input class="star product-insert"  type="text"></td>
            </tr>
            <tr>
                <td>Star-count</td>
                <td><input class="count  product-insert" type="text"></td>
            </tr>
            <tr>
                <td> Price</td>
                <td> <input class="price product-insert" type="text"></td>
            </tr>
            <tr >
                <td colspan="2" align="center">
                <button class="submit-button" onclick="productEnter();">submit</button>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <button class="submit-button-x" onclick="  document.querySelector('.newProductAdd').classList.remove('amazon-add-product');
                    document.querySelector('.newProductAdd').innerHTML='';" >x</button>
                </td>
            </tr>
        </table>
        </div>`;
        
});







function qucar(cart){
    document.querySelector('.js-cart-icon').innerHTML=cart.length;
}

qucar(cart);

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
    let productname=button.dataset.productName;
    let productPrice=button.dataset.productPrice;
    let productitemsno=true;
    cart.forEach((carts)=>{
        if(productname===carts.productName){
            carts.quantity+=1;
            localStorage.setItem('cart',JSON.stringify(cart));
            console.log(carts);
            productitemsno=false;
        }
    });
    if(productitemsno){
            cart.push({productName:`${productname}`,quantity:1,productPrice:`${productPrice}`});
            console.log(cart);
            localStorage.setItem('cart',JSON.stringify(cart));
    }
    qucar(cart);
    setTimeout(()=>{
        document.getElementById(`${productname}`).innerHTML='Added';
     },300);
     setTimeout(()=>{
         document.getElementById(`${productname}`).innerHTML='';
      },1600);

    
     
    /*localStorage.setItem('quantity',JSON.stringify(quatty));
     console.log(quatty);*/

    /* document.querySelector('.js-cart-icon').innerHTML=quatty;*/ 
    })
    
});

localStorage.removeItem('quantity');
