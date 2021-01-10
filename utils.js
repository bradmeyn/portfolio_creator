

const totalAmount = document.getElementById("totalAmount");
const totalWeight = document.getElementById("totalWeight");
const totalCostPercent = document.getElementById("totalCostPercent");
const totalCostDollar = document.getElementById("totalCostDollar");

let deleteBtns = document.querySelectorAll(".delete-btn");
const addBtn = document.querySelectorAll(".add-btn");

let tBody = document.querySelector("tbody");



//delay input search
const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
            if (timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
            func.apply(null,args)
        }, delay);
    };
};

//convert to currency
const toCurrency = number => {

    return numeral(number).format('$0,0.00');

}


//convert to int
const toNumber = value => {
    return numeral(value).value();
    
}


//update cost
const updateCost = (amount) => {
    amount.closest("tr").children[5].innerHTML = toCurrency(toNumber(amount.closest("tr").children[2].firstElementChild.value) * toNumber(amount.closest("tr").children[4].innerHTML));
 }

//update totals row
 const updateTotals = () => {
    let tbodies = document.querySelectorAll("tbody");

    tbodies.forEach(tbody => {
        console.log();

        let totalAmount = 0;
        let totalWeight = 0;
        let totalCostPercent = 0
        let totalCostDollar = 0;
        
        let rows = tbody.querySelectorAll("tr");
      

        rows.forEach(row => {
            
                totalAmount =  totalAmount + numeral(row.children[2].children[0].value).value();
                totalCostDollar = totalCostDollar + numeral(row.children[5].innerText).value();
          
        });

        tbody.nextElementSibling.children[0].children[1].innerText = toCurrency(totalAmount);

        
        
        if(!(totalCostDollar/totalAmount)){
   
            tbody.nextElementSibling.children[0].children[3].innerText = "0.00%";
        } else {
            tbody.nextElementSibling.children[0].children[3].innerText = (totalCostDollar/totalAmount * 100).toFixed(2) +"%";
        }
        
        tbody.nextElementSibling.children[0].children[4].innerText = toCurrency(totalCostDollar);


        rows.forEach(row => {

            let rowAmount = numeral(row.children[2].children[0].value).value();
           



            if(!(rowAmount/totalAmount)){
                row.children[3].innerText = "0.00%"
                
            } else {
                row.children[3].innerText = (rowAmount/totalAmount * 100).toFixed(2) +"%";
            }

    
                    rowWeight = (rowAmount/totalAmount).toFixed(2) + "%";
 

         
        })

    });


   
    compound();
 
};


 addBtn.forEach(button => {

    button.addEventListener("click", (e) => {

        const tableBody = e.target.parentElement.firstElementChild.children[1];
        document.querySelector("tbody");
        const row = document.createElement("tr");
        row.innerHTML = `<td class="table__item--search">
        <i class="las la-search search-icon"></i>
        <input type="text" class="input--search" placeholder="Search Investment">
        <div class="dropdown">
            <ul class="dropdown__menu">
            </div>
        </div>
    </td>
    <td class="table__item code"></td> 
    <td class="table__item--amount"><input type="text" class="input input--currency" placeholder="Amount"></td>
    <td class="table__item weight">0%</td>
    <td class="table__item cost__percentage">0.00%</td>
    <td class="table__item cost__currency">$0.00</td>
    <td class="table__item--delete"><button class="delete-btn"><i class="lar la-trash-alt"></i>Remove</button></td>`;
    
        tableBody.appendChild(row);
        
    });
    

 });

//add button functionality


// //update currency inputs
// table.addEventListener("input", (e) => {

//     if(e.target.classList.contains("input--search")){

//         onInput(e);
//         updateCost(e.target);
//         updateTotals();
//     }  
// });



// // remove active class when document is clicked
// document.addEventListener("click", event => {
//     let dropdowns = document.querySelectorAll(".dropdown");
//     dropdowns.forEach(dropdown => {
//         dropdown.classList.remove("dropdown__active");
//     });
// });



// //update currency inputs
// table.addEventListener("change", (e) => {

//     if(e.target.classList.contains("input--currency")){
//         updateCost(e.target);
//         e.target.value = toCurrency(e.target.value);
//         updateCost(e.target);
//         updateTotals();
//     }  
// });