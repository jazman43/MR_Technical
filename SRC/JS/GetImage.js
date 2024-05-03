document.addEventListener("DOMContentLoaded", function(){
    // Fetch product details from API
    fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            document.getElementById('ProImage').innerHTML = `
            <img src="${data.imageURL}" alt="${data.title}" width="400">`   
        })
        .catch(error => console.error('Error:', error));
    });