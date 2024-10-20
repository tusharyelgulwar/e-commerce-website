document.addEventListener("DOMContentLoaded", function () {
    const cartItemsDiv = document.querySelector('.cart-items');
    const subtotalSpan = document.getElementById('subtotal');
    const taxesSpan = document.getElementById('taxes');
    const totalSpan = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-btn');
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-container');

    let cart = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [];
    if (!Array.isArray(cart)) {
        cart = [];
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let subtotal = 0;
        let cartTable = `<table>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>`;
        const cartItemsMap = {};

        cart.forEach((item) => {
            const { name, price } = item;
            cartItemsMap[name] = cartItemsMap[name] ? cartItemsMap[name] + 1 : 1;
        });

        Object.entries(cartItemsMap).forEach(([name, quantity]) => {
            const price = cart.find(item => item.name === name).price;
            cartTable += `
                <tr>
                    <td>${name}</td>
                    <td>$${price}</td>
                    <td>${quantity}</td>
                    <td><button class="remove-btn" data-name="${name}">Remove</button></td>
                </tr>`;
            subtotal += parseFloat(price) * quantity;
        });

        cartTable += `</table>`;
        tableContainer.innerHTML = cartTable;
        cartItemsDiv.appendChild(tableContainer);

        const taxes = subtotal * 0.1;
        const total = subtotal + taxes;

        subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        taxesSpan.textContent = `$${taxes.toFixed(2)}`;
        totalSpan.textContent = `$${total.toFixed(2)}`;

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const name = this.dataset.name;
                const index = cart.findIndex(item => item.name === name);
                if (index !== -1) {
                    cart.splice(index, 1);
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                }
            });
        });

        if (cart.length < 1) {
            checkoutButton.setAttribute("disabled", "disabled");
        }
    }

    updateCart();

    checkoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('cartCount');
    });

    let cartCounter = document.getElementById('cart-count')
    cartCounter.textContent = sessionStorage.getItem('cartCount')
});
