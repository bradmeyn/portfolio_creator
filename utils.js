
const rows = document.querySelectorAll("tr");
const totalAmount = document.getElementById("totalAmount");
const totalWeight = document.getElementById("totalWeight");
const totalCostPercent = document.getElementById("totalCostPercent");
const totalCostDollar = document.getElementById("totalCostDollar");

const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => {
        e.target.closest("tr").remove();
    });
});
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
    let portfolioTotal = 0;
    let costTotal = 0;
    
    rows.forEach(row => {

        if(row.closest("tbody")){
            portfolioTotal = portfolioTotal + numeral(row.children[2].children[0].value).value();
            costTotal = costTotal + numeral(row.children[5].innerText).value();
        };

        if(numeral(costTotal/portfolioTotal).value() == null){
            totalCostPercent.innerText = "0.00%";
        } else {
            totalCostPercent.innerText = (numeral(costTotal/portfolioTotal).value()*100).toFixed(2) +"%";
        }
        
        totalAmount.innerText = toCurrency(portfolioTotal);
        totalCostDollar.innerText = toCurrency(costTotal);
        // totalCostPercent.innerText = portfolioTotal;
    });

    rows.forEach(row => {

        if(row.closest("tbody")){
            if(numeral(costTotal/portfolioTotal).value() == null){
                console.log(true);
                row.children[3].innerText = "0%";
            } else {
                row.children[3].innerText =(numeral(row.children[2].children[0].value).value()/portfolioTotal).toFixed(4)*100 +"%";
            }
        };
    })
 }


 