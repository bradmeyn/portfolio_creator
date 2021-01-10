
// const dropdownResults = document.querySelectorAll(".dropdown__results");
// const searchInputs = document.querySelectorAll(".input--search");

// const dropdownMenu = document.querySelector(".dropdown__menu");


const tables = document.querySelectorAll(".table");


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

            updateCost(event.target.closest("tr").children[2].firstElementChild);
            updateTotals();
        })

        dropdownList.appendChild(li);
        }
    }
};


//update currency inputs
tables.forEach(table => {

    table.addEventListener("input", (e) => {

        if(e.target.classList.contains("input--search")){

            onInput(e);
            updateCost(e.target);
            updateTotals();
        }  
    });

    table.addEventListener("change", (e) => {

        if(e.target.classList.contains("input--currency")){
            updateCost(e.target);
            e.target.value = toCurrency(e.target.value);
            updateCost(e.target);
            updateTotals();
        }  
    });


    // delete button functionality
    table.addEventListener("click", (e)=> {
        let selector = "i";
        // console.log(e.target.innerHTML.includes(selector))
        if(e.target.closest(".delete-btn")){
            e.target.closest("tr").remove();
            console.log("hey")
            updateTotals();
            return;
        };
    
    }, true);

});


// remove active class when document is clicked
document.addEventListener("click", event => {
    let dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("dropdown__active");
    });
});



let ctx = document.getElementById("main-chart");
// Chart.defaults.global.defaultFontColor = "#2f394b";

// Chart.defaults.global.defaultFontStyle = "bold";



Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    min: 0,
  },
});



let chart = new Chart(ctx, {
  // The type of chart we want to create

  type: "line",
  
  // The data for our dataset
  data: {
    datasets: [{
        label: "Portfolio One",
        data: [],
        borderColor: "#113C6C",
        backgroundColor: "transparent",
        width: "100%",
        pointRadius: "0"
      },
      {
        label: "Portfolio Two",
        data: [],
        borderColor: "Orange",
        backgroundColor: "transparent",
        width: "100%",
        pointRadius: "0"
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

        stacked: false,
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
      display: true,
    },
    chart: {

    },
  }
});




let compound = function () {

    let portfolioAmountOne = toNumber(document.getElementById("amountOne").innerText);
    let portfolioAmountTwo = toNumber(document.getElementById("amountTwo").innerText);

    let portfolioCostOne = toNumber(document.getElementById("costPercentageOne").innerText);
    let portfolioCostTwo = toNumber(document.getElementById("costPercentageTwo").innerText);

    console.log(toNumber(portfolioCostOne));

    let years = [1,2,3,4,5,6,7,8,9,10];
    
  
    let x = 0;
    let n = 10;

    let costOne = 0;
    let costTwo = 0;
    let totalOne = [];
    let totalTwo = [];

    while (x < n) {
  
      //Push initial value to the chart
      console.log((parseFloat(costOne + portfolioCostOne * portfolioAmountOne)).toFixed(2))
      costOne = costOne + portfolioCostOne * portfolioAmountOne;
      totalOne.push(costOne);

      costTwo = costTwo + portfolioCostTwo * portfolioAmountTwo;
      totalTwo.push(costTwo);
      
      x++;
    }
  
  
    chart.data.datasets[0].data = totalOne;
    chart.data.datasets[1].data = totalTwo;
    
    chart.data.labels = years;
    chart.update();
  
  };

  compound();