// TAB FUNCTIONALITY

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        tabContents.forEach(content =>
            content.classList.remove("active-tab")
        );

        button.classList.add("active");

        document
            .getElementById(button.dataset.tab)
            .classList.add("active-tab");
    });

});


// MODAL FUNCTIONALITY

const modal = document.getElementById("productModal");

const closeBtn = document.querySelector(".close-btn");

const productImages =
document.querySelectorAll(".product-image");

productImages.forEach(image => {

    image.addEventListener("click", () => {

        document.getElementById("modalName").textContent =
            image.dataset.name;

        document.getElementById("modalPrice").textContent =
            image.dataset.price;

        document.getElementById("modalDescription").textContent =
            image.dataset.description;

        modal.style.display = "flex";
    });

});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.style.display = "none";
    }

});
;

// SEARCH FUNCTIONALITY
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
    const searchValue = this.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        const img = product.querySelector(".product-img");

        if (!img) return;

        const title = img.dataset.title.toLowerCase();

        if (title.includes(searchValue)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
});