


const inputs = document.querySelectorAll(".table__item--input");


// const dropdownContent = document.querySelectorAll("dropdown__content");
const dropdownResults = document.querySelectorAll(".dropdown__results");
const searchBoxes = document.querySelectorAll(".searchBox");

searchBoxes.forEach(box => {
    box.innerHTML = `
    <input type="text" class="table__input">
    <div class="dropdown">
        <div class="dropdown__menu">
        </div
    </div>
    `;
});
const dropdownMenu = document.querySelector(".dropdown__menu");



const onInput = event => {
    // function to search array for search value
    console.log(investments);
    dropdownMenu.innerHTML = "";

        dropdown.classList.add("dropdown__active");

    for (let investment of investments) {

        const div = document.createElement("div");

        div.innerHTML = `<div class="dropdown__result"> ${investment.name} (${investment.code})</div>`;

        dropdownMenu.appendChild(div);
    }

};

inputs.forEach(input => {
    input.addEventListener("input", debounce(onInput, 500));
});






const dropdown = document.querySelector(".dropdown");




