
// const dropdownResults = document.querySelectorAll(".dropdown__results");
// const searchInputs = document.querySelectorAll(".input--search");

// const dropdownMenu = document.querySelector(".dropdown__menu");


const table = document.querySelector(".table");


const onInput = event => {

    let dropdowns = document.querySelectorAll(".dropdown");
    // console.log(event.target.closest("td").nextSibling);
    dropdowns.forEach(dropdown => {
        console.log("dropdown");
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


//update currency inputs
table.addEventListener("input", (e) => {

    if(e.target.classList.contains("input--search")){

        onInput(e);
        updateCost(e.target);
        updateTotals();
    }  
});



// remove active class when document is clicked
document.addEventListener("click", event => {
    let dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("dropdown__active");
    });
});



//update currency inputs
table.addEventListener("change", (e) => {

    if(e.target.classList.contains("input--currency")){
        updateCost(e.target);
        e.target.value = toCurrency(e.target.value);
        updateCost(e.target);
        updateTotals();
    }  
});



let ctx = document.getElementById("main-chart");
Chart.defaults.global.defaultFontColor = "#2f394b";

Chart.defaults.global.defaultFontStyle = "bold";

Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    min: 0,
  },
});



let chart = new Chart(ctx, {
  // The type of chart we want to create

  type: "bar",

  // The data for our dataset
  data: {
    datasets: [{
        label: "Initial Investment",
        data: [],
        backgroundColor: "#113C6C",
        width: "100%",

      },
    ],
  },

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: "bottom"
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Year'
        },
        stacked: true,
      }],

      yAxes: [{


        stacked: true,
        ticks: {
          maxTicksLimit: 6,
          beginAtZero: true,
          fontSize: 16,
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return "$" + value;
            }
          },
        },
      }, ],
    },
    legend: {
      display: false,
    },
    chart: {

    },
  }
});




let compound = function () {

    let years = [1,2,3,4,5,6,7,8,9,10];
    let portfolio = totalAmount;
    let cost = 1000;
    let total = 0;
  
    let x = 0;
    let n = 10;
    let ongoingCosts = [];

    while (x < n) {
  
      //Push initial value to the chart
      

      total = total + cost;
      ongoingCosts.push(total);
      x++;
    }
  
  
    chart.data.datasets[0].data = ongoingCosts;
    
    chart.data.labels = years;
    chart.update();
  
  };

  compound();