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
    updateCart();
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
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addTocart(name,price)
    }

})

function addTocart(name, price){
    const ItemExistente = Cart.find(item => item.name === name)
    if(ItemExistente){
        ItemExistente.quantidade += 1
    }else{
        Cart.push({
            name,
            price,
            quantidade: 1,
        })
    }
   updateCart()
}

function updateCart(){
    cartItemsContainer.innerHTML = "";
    let valor_total = 0;
    Cart.forEach(item => {
        const cartElement = document.createElement("div");
        cartElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartElement.innerHTML = `
        <div class="flex items-center justify-between"> 
            <div>
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantidade}</p>
                    <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)}</p>
                </div>

                <button>
                    Remover
                </button>

            </div>
        </div>
        `
        valor_total += item.price * item.quantidade;
        cartItemsContainer.appendChild(cartElement)
    })
    cartTotal.textContent = valor_total;
}