



// const dropdownContent = document.querySelectorAll("dropdown__content");
const dropdownResults = document.querySelectorAll(".dropdown__results");
const searchInputs = document.querySelectorAll(".input--search");
const dropdowns = document.querySelectorAll(".dropdown");
const dropdownMenu = document.querySelector(".dropdown__menu");


const onInput = event => {
    // console.log(event.target.closest("td").nextSibling);
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("dropdown__active");
    });
    
    let dropdownParent = event.target.nextElementSibling;
    let dropdownList = dropdownParent.firstElementChild;
        //reset dropdown menu
        dropdownList.innerHTML = "";
        //add active class to display

    for (let investment of investments) {
        const li = document.createElement("li");
        let name = investment.name.toLowerCase();
        let code = investment.code.toLowerCase();
        let search = event.target.value.toLowerCase();

        // search input value compared to names & codes
        if(name.includes(search) || code.includes(search)){
            dropdownParent.classList.add("dropdown__active");
            //add result if match
            li.innerHTML = `<a class="dropdown__result"> ${investment.name} (${investment.code})</a>`;
            //add listener to add selected option into the input
            li.addEventListener("click", () => {
            dropdownParent.classList.remove("dropdown__active");
            dropdownList.innerHTML = "";
            event.target.value = investment.name;
            event.target.closest("tr").children[1].innerHTML = investment.code;
            event.target.closest("tr").children[4].innerHTML = (investment.cost * 100).toFixed(2) +"%";
            console.log(event.target.closest("tr").children[2].firstElementChild)
            updateCost(event.target.closest("tr").children[2].firstElementChild);
            updateTotals();
        })

        dropdownList.appendChild(li);
        }
    }
};

//add onInput to each search with menu delay
searchInputs.forEach(input => {
    input.addEventListener("input", debounce(onInput, 500));
});


// remove active class when document is clicked
document.addEventListener("click", event => {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("dropdown__active");
    });
});



const currencyInputs = document.querySelectorAll(".input--currency");

currencyInputs.forEach(input => {
    
    input.addEventListener("change",(e) => {
        console.log(e.target);
        updateCost(e.target);
        input.value = toCurrency(input.value);
        updateTotals();
    // console.log(input.value * parseFloat(input.closest("tr").children[4].innerHTML));
    });
});




