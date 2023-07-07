async function renderAll (){

    const apiUrl = `/api/products/query?`;
const response = await fetch(apiUrl, {
method: 'GET',
});

if (!response.ok) {
throw new Error('API request failed');
}

const productResults = await response.json();

console.log(productResults);
function productsRender () {
    const sortedProducts = productResults.sort((a, b) => b.id - a.id);

    const buyListEl = document.getElementById('buy-list');

    buyListEl.innerHTML = '';

    for(var i = 0; i < sortedProducts.length; i++) {

        const listContainer = document.createElement('ul');
        
        listContainer.setAttribute("class", "container text-center")
        listContainer.setAttribute("id", "list-container")
        
        const productImg = document.createElement("img");
        productImg.setAttribute("id", "product-img-list")
        listContainer.appendChild(productImg)

        const productName = document.createElement('li');
        productName.setAttribute("id", "product-name-list")
        listContainer.appendChild(productName)

        const productPrice = document.createElement('li');
        productPrice.setAttribute("id", "product-price-list")
        listContainer.appendChild(productPrice)

        const productCategory = document.createElement('li');
        productCategory.setAttribute("id", "product-category-list")
        listContainer.appendChild(productCategory)

        const productLocation = document.createElement('li');
        productLocation.setAttribute("id", "product-location-list")
        listContainer.appendChild(productLocation)

        const productCondition = document.createElement('li');
        productCondition.setAttribute("id", "product-condition-list")
        listContainer.appendChild(productCondition)

        productName.innerHTML = sortedProducts[i].product_name;
        productImg.setAttribute("src", sortedProducts[i].image);
        productCategory.innerHTML ="Category: " + sortedProducts[i].category;
        productLocation.innerHTML = "City: " + sortedProducts[i].city;
        productPrice.innerHTML = "$" + sortedProducts[i].price;
        productCondition.innerHTML = "Condition: " + sortedProducts[i].item_condition + "/10";
    
        

        buyListEl.appendChild(listContainer);

        listContainer.addEventListener('click', function (){
            
        })
    }
}
productsRender();
}
renderAll();
