

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
    console.log(value);
}


//update cost

const updateCost = (amount) => {
    amount.closest("tr").children[5].innerHTML = toCurrency(toNumber(amount.closest("tr").children[2].firstElementChild.value) * toNumber(amount.closest("tr").children[4].innerHTML));
 }



 const updateTotals = () => {
     
    const rows = document.querySelectorAll("tr");

    rows.forEach(row => {

        console.log(!row.closest("tbody"));

    })



 }

updateTotals();