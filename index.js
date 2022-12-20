import {menuArray} from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let cartArray = []
const paymentModal = document.getElementById("paymentModal")
const orderSection = document.getElementById("order")

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    } else if (e.target.id === "completeBtn") {
        completeOrder()
    }
})

function getMenu() {
    let menuItems = ``
    menuArray.forEach(function(item) {
        menuItems += `
            <div class="item">
                <div class="itemInner">
                    <div class="emoji">${item.emoji}</div>
                    <div class="itemDescription">
                        <p class="itemName">${item.name}</p>
                        <p class="ingredients">${item.ingredients}</p>
                        <span class="price">$${item.price}</p>
                    </div>
                </div>
                <div class="addBtn"><button class="addItemButton" data-add="${item.id}">+</button></div>
            </div>
            `
    })
    return menuItems
}

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenu()
}
renderMenu()

function addToCart(itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    cartArray.push(targetItemObj)
    renderOrder()
    if (cartArray != 0) {
        document.getElementById("order").classList.remove("hidden")
    }
}

function removeFromCart(index) {
    cartArray.splice(index, 1)
    renderOrder()
    if (cartArray.length === 0) {
        orderSection.classList.add("hidden")
    }
}

function getOrder() {
    let orderItems = `<h2>Your order</h2>`
    let totalPrice = 0
    cartArray.forEach(function(orderItem, index) {
        orderItems += `       
            <div class="cart" id="cart">
                <div class="cartInner">
                    <p class="cartItem">${orderItem.name}</p>
                    <p class="removeBtn" id="removeBtn" data-remove="${index}">Remove</button>
                </div>
                <span class="itemCartPrice">$${orderItem.price}</p>   
            </div>`  
            totalPrice += orderItem.price
    })
    orderItems += ` 
            <hr>
            <div class="completeSection" id="complete">
                <p class="totalPrice">Total price: $${totalPrice}</h3>
            </div>
            <div class="completeBtnBox"><button class="completeBtn" id="completeBtn" data-complete>Complete order</button></div>
        `      
    return orderItems
    orderItems = ``
}

function renderOrder() {
    orderSection.innerHTML = getOrder()
}

function completeOrder() {
    paymentModal.style.display = "inline"
}

paymentModal.addEventListener("submit", function(e) {
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const yourName = paymentFormData.get("yourName")
    paymentModal.innerHTML = `
    <div class="process">
        <p class="processText" id="processText">Processing your payment...</p>
        <img class="loading" src="https://media.tenor.com/HGm2wQTmykIAAAAi/motorbike-motorbikes.gif">
    </div>
    `
    setTimeout(function() {
        document.getElementById("processText").innerText = `
        Notifying the restaurant...
        `
    }, 2000)
    setTimeout(function() {
        paymentModal.style.display = "none"
    }, 4000)
    
    setTimeout(function() {
        orderSection.innerHTML = `
        <h2 class="thanks">Thanks, ${yourName}! Your order has been processed. Expect a delivery time soon!
    `
    }, 4000)
    
    cartArray.length = 0
    
    setTimeout(function(){
        window.location.reload()
        }, 8500)
})


document.getElementById("closeBtn").addEventListener("click", function(){
    paymentModal.style.display = "none"
})




