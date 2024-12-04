const UL = document.querySelector("ul");
let totalValue = 0;

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const productDetails = {
        price: event.target.price.value,
        name: event.target.name.value,
    };

    axios
        .post("https://crudcrud.com/api/1254d7061bea48ff92130bfd5e896647/productDetails", productDetails)
        .then((response) => {
            displayOnScreen(response.data);
            totalValue += parseFloat(productDetails.price);
            totalPrice(totalValue);
        })
        .catch((error) => {
            console.log(error);
        });

    event.target.reset();
});

function totalPrice(totalValue) {
    const total = document.querySelector("h4");
    total.innerText = `Total Value Worth of Products : RS ${totalValue}`;
}

function displayOnScreen(productDetails) {
    // Creating list item
    const list = document.createElement("li");
    list.innerText = `RS ${productDetails.price} - ${productDetails.name}   `;

    // Creating delete button
    const delete_btn = document.createElement("button");
    delete_btn.innerText = "Delete Product";
    list.appendChild(delete_btn); // Adding to the end of the list

    // Adding delete functionality
    delete_btn.addEventListener("click", () => {
        axios
            .delete(`https://crudcrud.com/api/1254d7061bea48ff92130bfd5e896647/productDetails/${productDetails._id}`)
            .then(() => {
                UL.removeChild(list);
                totalValue -= parseFloat(productDetails.price);
                totalPrice(totalValue);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    UL.appendChild(list);
}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/1254d7061bea48ff92130bfd5e896647/productDetails")
        .then((response) => {
            response.data.forEach((product) => {
                displayOnScreen(product);
                totalValue += parseFloat(product.price);
            });
            totalPrice(totalValue);
        })
        .catch((error) => {
            console.log(error);
        });
});