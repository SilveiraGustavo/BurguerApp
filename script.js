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
        ItemExistente.quantidade += 1;
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
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantidade}</p>
                    <p class="font-medium mt-2"> R$ ${item.price.toFixed(2)}</p>
                </div>   

                <button class="remove-btn" data-name="${item.name}">
                    Remover
                </button>  
            </div>
        `
        valor_total += item.price * item.quantidade;
        cartItemsContainer.appendChild(cartElement)
    })
    cartTotal.textContent = valor_total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    cartCounter.innerHTML = Cart.length;
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = Cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = Cart[index];
        if(item.quantidade > 1){
            item.quantidade -=1;
            updateCart();
            return;
        }
    }
    Cart.splice(index, 1);
    updateCart();
}

addresInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addresInput.classList.remove("border-red-500")
        addresWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkOpen();
    if(!isOpen){
        Toastify({
            text: "Restaurante Fechado ☹️",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "#ef4444",
            },
        }).showToast();
        return;
    }
    if(Cart.length === 0) return;
    if(addresInput.value === ""){
        addresWarn.classList.remove("hidden")
        addresInput.classList.add("border-red-500")
    }

    const cartItems = Cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantidade}) Preço: R$${item.price} |`
        )
    }).join("")
    const Message = encodeURIComponent(cartItems)
    const phone = "35998978514"

    window.open(`https://wa.me/${phone}?text=${Message} Endereço: ${addresInput.value}`, "_blank")
    Cart.length = 0
    updateCart();
})
function checkOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkOpen();
if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}