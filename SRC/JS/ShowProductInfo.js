document.addEventListener("DOMContentLoaded", function() {
    let selectedSize = null; 
    let productDetails = null;
    
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
        .then(response => response.json())
        .then(data => {
            productDetails = data;

            document.getElementById('ProName').innerText = data.title;
            document.getElementById('ProPrice').innerText = `$${data.price}`;
            document.getElementById('proDiscripsion').innerText = data.description;

            // Generate size buttons
            const sizeOptionsContainer = document.getElementById('ProSize');
            data.sizeOptions.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option.label;
                button.classList.add('sizeOptionBtn');
                button.dataset.sizeId = option.id;
                sizeOptionsContainer.appendChild(button);
            });
        })
        .catch(error => console.error('Error:', error));

    
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('sizeOptionBtn')) {
            
            document.querySelectorAll('.sizeOptionBtn').forEach(btn => {
                btn.classList.remove('active');
            });

            
            event.target.classList.add('active');

            
            selectedSize = event.target.textContent;
            UpdateSelectionSize(selectedSize);
        }
    });

    function UpdateSelectionSize(size){
        const selectedSizeElem = document.getElementById('currentSize');
        selectedSizeElem.textContent = ` ${size}`;
    }

    
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        
        if (selectedSize) {
            
            addToCart(productDetails ,selectedSize);
        } else {
            
            document.getElementById('debugMessage').style.display = 'block';

            setTimeout(function(){
                document.getElementById('debugMessage').style.display = 'none';

            }, 3000);
            
        }
    });

    
    function addToCart(product , size) {
        
        let cartNumber = parseInt(document.getElementById('InCartNumber').innerText);
        document.getElementById('InCartNumber').innerText = cartNumber + 1;

        const selectedOption = product.sizeOptions.find(option => option.label === size);

        const productId = product.id + '_' + selectedOption.id;

        const existingItem = document.querySelector(`.CartItem[data-product-id="${productId}"]`);

        if (existingItem) {
            
            const quantityElem = existingItem.querySelector('.quantity');
            const quantity = parseInt(quantityElem.innerText);
            quantityElem.innerText = quantity + 1;
                
        } else {
            
            const cartItems = document.getElementById('cartItems');
            const newItem = document.createElement('li');
            newItem.classList.add('CartItem');
            newItem.dataset.productId = productId;
            newItem.innerHTML = `
                <img src="${product.imageURL}" alt="${product.title}">
                <div class="CartItemDetails">
                    <div>${product.title}</div>
                    <div>Quantity: <span class="quantity">1</span> x $${product.price}</div>
                    <div>Size: ${selectedOption ? selectedOption.label : 'N/A'}</div>                    
                </div>
            `;
            cartItems.appendChild(newItem);
        }
    }
});