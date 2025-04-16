document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number-input').value;
    const expMonth = document.getElementById('exp-month').value;
    const expYear = document.getElementById('exp-year').value;
    const cvv = document.getElementById('cvv').value;

    // Validation checks
    if (cardNumber.length !== 16 || !/^(51|52|53|54|55)/.test(cardNumber)) {
        document.getElementById('message').innerText = 'Invalid card number.';
        return;
    }
    if (cvv.length < 3 || cvv.length > 4) {
        document.getElementById('message').innerText = 'Invalid CVV.';
        return;
    }

    // Prepare data for POST request
    const data = {
        master_card: cardNumber,
        exp_year: expYear,
        exp_month: expMonth,
        cvv_code: cvv
    };

    // Send POST request
    fetch('https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Use === for comparison
        if (response.status === 200) {
            const digits = cardNumber.slice(12, 16);
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            const code2 = digits.concat(code);
            window.location.href = 'success.html?code=' + code2;
        } else {
            // Handle error response
            document.getElementById('message').innerText = 'Error: ' + response.status + ' (Bad Request)';
            // Optionally, you can display an error message to the user
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Network Error: ' + response.status + ' (Bad Request)';
        // Optionally, handle network errors
    });
})

document.getElementById('card-number-input').addEventListener('input', function (evt) {
    const cardNumber = evt.target.value;
    let cardImageID = ''; // Initialize cardImageID

    // Check the card number prefix and set the cardImageID accordingly
    const MasterCardNumbers = ['51', '52', '53', '54', '55']
    if (MasterCardNumbers.includes(cardNumber.slice(0, 2))) {
        cardImageID = 'mastercard.png';
    } else {
        // Optionally handle other card types or set a default image
        cardImageID = ''; // Reset or set to a default image if needed
    }

    // Clear previous images
    const cardNumberBox = document.getElementById('card-number-box');
    
    // Remove only image elements
    const existingImages = cardNumberBox.getElementsByTagName('img');
    while (existingImages.length > 0) {
        existingImages[0].parentNode.removeChild(existingImages[0]);
    }

    // Only create and append the image if cardImageID is set
    if (cardImageID) {
        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', 'images/' + cardImageID);
        cardImage.style.width = '80px';
        cardImage.style.height = '50px';
        cardImage.className = "cardImage";
        cardNumberBox.appendChild(cardImage);
    }
});





function populateCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        const items = code.match(/.{1,4}/g); // Split code into pairs
        items.forEach(item => {
            if(item.slice(0,2) == '01'){
                Title = "Dune";
                Author = "Frank Herbert";
                bookImage = 'book1.webp';                        
            }
            else if(item.slice(0,2) == '02'){
                Title = "On Earth We're Briefly Gorgeous";
                Author = "Ocean Vuong";
                bookImage = 'book2.jpg';                        
            }
            else if(item.slice(0,2) == '03'){
                Title = "Across the River and into the Trees";
                Author = "Ernest Hemingway";
                bookImage = 'book3.jpg';                        
            }
            else if(item.slice(0,2) == '04'){
                Title = "Mapping The Interior";
                Author = "Stephen Graham Jones";
                bookImage = 'book4.jpg';                        
            }
            Quantity = parseInt(item.slice(2,4));
            addToCart(Title, Author, bookImage, Quantity);
        });
    }
}

function addToCart(Title, Author, bookImage, Quantity) {

    // Create a new div element for the cart item
    const cartItem = document.createElement('div');
    cartItem.className = "Item";
    
    const cartItemText = document.createElement('div');
    cartItemText.className = "ItemText";

    // Set the content of the cart item
    const cartItemTitle = document.createElement('div');
    cartItemTitle.textContent = `Title: ${Title}`;

    const cartItemAuthor = document.createElement('div');
    cartItemAuthor.textContent = `Author: ${Author}`;

    const cartItemImage = document.createElement('img');
    cartItemImage.setAttribute('src','images/'+bookImage);
    cartItemImage.style.width = '100px';

    const cartItemQuantity = document.createElement('div');
    cartItemQuantity.textContent = `Quantity: ${Quantity}`;

    // Append the new cart item to the cart container
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.appendChild(cartItem);
    cartItem.appendChild(cartItemImage);
    cartItem.appendChild(cartItemText);
    cartItemText.appendChild(cartItemTitle);
    cartItemText.appendChild(cartItemAuthor);
    cartItemText.appendChild(cartItemQuantity);

    
}

function toggleMenu() {
    var x = document.getElementById("Links");
    x.classList.toggle("slide-in");
}




// Call the function to populate the cart on page load
window.onload = populateCart;