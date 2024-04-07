const btnCart = document.querySelector('.container-cart-icon');

const containercartProduct = document.querySelector('.container-cart-products')
btnCart.addEventListener('click', () =>{
    containercartProduct.classList.toggle('hidden-cart')
});

/*======================*/

const cartInfo= document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

/*Lista de todos los contenedores de producto*/
const productList = document.querySelector('.container-items');

//variable de arreglo de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');





productList.addEventListener('click', e => {

    const btnAddToCart = e.target.closest('.btn-add-cart');
    if (btnAddToCart) {
        const product = btnAddToCart.closest('.item');
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('h5').textContent
        }; 
        const exits = allProducts.some(product => product.title === infoProduct.title)
        
        if (exits){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else {
                    return product
                }
            })
            allProducts = [...products];
        }else{
            allProducts = [...allProducts, infoProduct]
        }

        showHTML();
    }
})

rowProduct.addEventListener('click', (e) => {
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML()
    }
})


//funcion para mostrar html

const showHTML = () => {

    if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}
    // limpiar html
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <div class="titulo-producto-carrito">${product.title}</div>
                <span class="precio-producto-carrito">${product.price}</span>

            </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
        `;

        rowProduct.append(containerProduct);

        total += parseInt(product.quantity) * parseFloat(product.price.replace('$', '').replace(',', ''));
        totalOfProducts += product.quantity;

        
    })

    valorTotal.innerText = `$${total.toFixed(3)}`;
	countProducts.innerText = totalOfProducts;
}