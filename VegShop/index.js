const table = document.querySelector("div");
const form = document.querySelector("form");
let totalValue = 0;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const foodShop = {
        username: event.target.username.value,
        price: event.target.price.value,
        quantity: event.target.quantity.value
    };

    axios   
        .post("https://crudcrud.com/api/aeb5498b633d4ecb962835e5339e7d16/vegShop",foodShop)
        .then((response)=>{
            displayOnScreen(response.data);
            totalValue++;
            updateTotal(totalValue);
        })
        .catch((error)=>{
            console.log(error);
        })

        event.target.reset();
});

//Update the total
function updateTotal(totalValue) {
    const total=document.querySelector("h2");
    total.innerText=`Total: ${totalValue}`;
}

//display the vegetables
function displayOnScreen(foodShop) {
    //Create a container for the items
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    
    //Vegetable name
    const vegetableName = document.createElement("p");
    vegetableName.innerText = `${foodShop.username}`;
    itemDiv.appendChild(vegetableName);

    //Price
    const price = document.createElement("p");
    price.innerText = `RS : ${foodShop.price}`;
    itemDiv.appendChild(price);

    //Quantity in Kgs
    const quantity = document.createElement("p");
    quantity.innerText = `${foodShop.quantity} KG`;
    itemDiv.appendChild(quantity);

    //Quantity for input
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter the quantity";
    itemDiv.appendChild(input);

    //Buy button
    const buy_btn = document.createElement("button");
    buy_btn.innerText = "Buy";
    buy_btn.className = "buy";
    itemDiv.appendChild(buy_btn);

    //buy button functionality
    buy_btn.addEventListener("click", () => {
        const buyQuantity = parseInt(input.value);
        const currentQuantity = parseInt(foodShop.quantity);

        if (buyQuantity > 0 && buyQuantity <= currentQuantity) {
            foodShop.quantity -= buyQuantity;
            quantity.innerText = `${foodShop.quantity} KG`;
        } else {
            alert(`Invalid quantity! Please enter a number less than or equal to ${foodShop.quantity}`);
        }
    });

    //Delete button
    const del_btn = document.createElement("button");
    del_btn.innerText = "Delete";
    del_btn.className = "del";
    itemDiv.appendChild(del_btn);

    //delete button functionality
    del_btn.addEventListener("click", () => {
        //Remove item from API
        axios
            .delete(`https://crudcrud.com/api/aeb5498b633d4ecb962835e5339e7d16/vegShop/${foodShop._id}`)
            .then(()=>{
                table.removeChild(itemDiv);
                totalValue--;
                updateTotal(totalValue);
            })
            .catch((error)=>{
                console.log(error);
            })
    });
    table.appendChild(itemDiv);
}

// Display items from API when the page is loaded
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/aeb5498b633d4ecb962835e5339e7d16/vegShop")
        .then((response)=>{
            response.data.forEach((foodShop) => {
                displayOnScreen(foodShop);
                totalValue++;

            });
            updateTotal(totalValue);
        })
        .catch((error)=>{
            console.log(error);
        })
});