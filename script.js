const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addresInput = document.getElementById('address')
const addresWarn = document.getElementById('addres-warn')

let Cart = []

cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
})
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-card-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parceFloat(parentButton.getAttribute("data-price"))

        addTocart(name, price)
    }
    

})

function addTocart(name, price){
    Cart.push({
        name,
        price,
        quantidade: 1,
    })
}