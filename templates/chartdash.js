async function makeChart() {

    const ourData = await getData();

        document.getElementById("death").innerHTML = (ourData.death_toll / ourData.reported_cases_now * 100).toFixed(2) + "%",
        document.getElementById("report").innerHTML = ourData.reported_cases_now,
        document.getElementById("recover").innerHTML = ourData.recovered_today,
         document.getElementById("ddd").innerHTML = ourData.death_toll;
    
    var chartVar = {

            chart: {
                id: "chart1",   // id of chart
                height: 400, // height of chart 
                type: "bar", // type of chart like bar/area...
                
                zoom: {
                    enabled: !0,
                    type: "xy"
                },

                // drop shadow of chart 
                dropShadow: {
                    enabled: !0,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: "#515365",
                    opacity: .3
                }

            },


            colors: ["#357ffa"],    // color of chart (blue)
            dataLabels: {
                enabled: !1
            },

            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: {
                    width: 10,
                    height: 10
                },

                itemMargin: {
                    horizontal: 0,
                    vertical: 8
                }

            },

            grid: {
                borderColor: "#191e3a"
            },

            stroke: {
                show: !0,
                width: 2,
                colors: ["transparent"]
            },

            series: [{
                name: "Confirmed Cases",
                data: ourData.confirmed
            }],


            // a-axis data (datetime)
            xaxis: {
                type: "datetime",
                categories: ourData.date
            },

            fill: {
                type: "gradient",

                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: .3,
                    inverseColors: !1,
                    opacityFrom: 1,
                    opacityTo: .8,
                    stops: [0, 100]
                }
            },

            tooltip: {
                theme: "dark",
                y: {
                    formatter: function(ourData) {
                        return ourData
                    }
                }
            }

        },

        json_date = {
            chart: {
                id: "chart2",
                height: 400,
                type: "area",
                zoom: {
                    enabled: !0,
                    type: "xy"
                },
                dropShadow: {
                    enabled: !0,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: "#515365",
                    opacity: .3
                }
            },
            colors: ["#8B0000", "#BFFF00"],
            plotOptions: {
                bar: {
                    horizontal: !1,
                    columnWidth: "55%",
                    endingShape: "rounded"
                }
            },
            dataLabels: {
                enabled: !1
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: {
                    width: 10,
                    height: 10
                },
                itemMargin: {
                    horizontal: 0,
                    vertical: 8
                }
            },
            grid: {
                borderColor: "#191e3a"
            },
            stroke: {
                show: !0,
                width: 2,
                colors: ["transparent"]
            },
            series: [{
                name: "Death Counts",
                data: ourData.death
            }, {
                name: "Number of Patients That Recover",
                data: ourData.recovered
            }],
            xaxis: {
                type: "datetime",
                categories: ourData.date
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "vertical",
                    shadeIntensity: .3,
                    inverseColors: !1,
                    opacityFrom: 1,
                    opacityTo: .8,
                    stops: [0, 100]
                }
            },
            tooltip: {
                theme: "dark",
                y: {
                    formatter: function(ourData) {
                        return ourData
                    }
                }
            }
        };

    new ApexCharts(document.getElementById("uniqueVisits1"), chartVar).render(),
    new ApexCharts(document.getElementById("uniqueVisits2"), json_date).render(), 

    // selecting among the available data in the drop down option
    document.getElementById("select").addEventListener("click", () => {
        countryValue = document.getElementById("select").value;

        const chartVar = [],
            json_date = [],
            json_confirmed = [];

        ourData.data[countryValue].forEach(function(ourData, json_death) {
            chartVar.push(ourData.confirmed), json_date.push(ourData.deaths), json_confirmed.push(ourData.recovered)
        });

        var json_death = json_date[json_date.length - 1],
            json_recovered = json_confirmed[json_confirmed.length - 1],
            death_troll_data = chartVar[chartVar.length - 1];

        ApexCharts.exec("chart1", "updateSeries", [{
            data: chartVar
        }]), 

        ApexCharts.exec("chart2", "updateSeries", [{
            data: json_date
        }, {
            data: json_confirmed
        }]), 
            document.getElementById("death").innerHTML = (json_death / death_troll_data * 100).toFixed(2) + "%", 
            document.getElementById("report").innerHTML = death_troll_data, 
            document.getElementById("recover").innerHTML = json_recovered,
               document.getElementById("ddd").innerHTML = ourData.death_toll;
    })
}



async function getData() {
    // fetching the json data from the link and storing in ourData variable
    let ourData = await fetch("https://pomber.github.io/covid19/timeseries.json"),
        chartVar = await ourData.json();

// Object.keys() is used for returning enumerable properties of a simple array.
// Object.keys() is used for returning enumerable properties of an array like object.
// Object.keys() is used for returning enumerable properties of an array like object with random key ordering.
    Object.keys(chartVar);

    // store all the JSON data in this variables 
    const json_date = [],
        json_confirmed = [],
        json_death = [],
        json_recovered = [];

        // making india as default selected 
        // if we dont put this then , default graph will not show up 
    chartVar.India.forEach(function(ourData, chartVar) {
        json_date.push(ourData.date), json_confirmed.push(ourData.confirmed), json_death.push(ourData.deaths), json_recovered.push(ourData.recovered)
    });

    var death_troll_data = json_death[json_death.length - 1],
        recovered_today_data = json_recovered[json_recovered.length - 1],
         reported_cases_now_data = json_confirmed[json_confirmed.length - 1];

    return {
        data: chartVar,
        date: json_date,
        confirmed: json_confirmed,
        death: json_death,
        recovered: json_recovered,
        death_toll: death_troll_data,
        recovered_today: recovered_today_data,
        reported_cases_now: reported_cases_now_data
    }
}

// on loading the window , call the makeChart() function 
window.addEventListener("load", () => {
    makeChart()
});