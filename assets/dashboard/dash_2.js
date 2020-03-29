async function makeChart() {
    const e = await getData();

    document.getElementById("death").innerHTML = (e.death_toll / e.reported_cases_now * 100).toFixed(2) + "%",
        document.getElementById("report").innerHTML = e.reported_cases_now,
        document.getElementById("recover").innerHTML = e.recovered_today;
    var t = {

            chart: {
                id: "chart1",
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
            colors: ["#357ffa"],
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
                data: e.confirmed
            }],
            xaxis: {
                type: "datetime",
                categories: e.date
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
                    formatter: function(e) {
                        return e
                    }
                }
            }
        },
        n = {
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
                data: e.death
            }, {
                name: "Number of Patients That Recover",
                data: e.recovered
            }],
            xaxis: {
                type: "datetime",
                categories: e.date
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
                    formatter: function(e) {
                        return e
                    }
                }
            }
        };
    new ApexCharts(document.getElementById("uniqueVisits1"), t).render(),
    new ApexCharts(document.getElementById("uniqueVisits2"), n).render(), 

    document.getElementById("select").addEventListener("click", () => {
        countryValue = document.getElementById("select").value;
        const t = [],
            n = [],
            r = [];
        e.data[countryValue].forEach(function(e, a) {
            t.push(e.confirmed), n.push(e.deaths), r.push(e.recovered)
        });
        var a = n[n.length - 1],
            o = r[r.length - 1],
            i = t[t.length - 1];
        ApexCharts.exec("chart1", "updateSeries", [{
            data: t
        }]), ApexCharts.exec("chart2", "updateSeries", [{
            data: n
        }, {
            data: r
        }]), document.getElementById("death").innerHTML = (a / i * 100).toFixed(2) + "%", 
            document.getElementById("report").innerHTML = i, 
            document.getElementById("recover").innerHTML = o
    })
}
async function getData() {
    let e = await fetch("https://pomber.github.io/covid19/timeseries.json"),
        t = await e.json();
    Object.keys(t);
    const n = [],
        r = [],
        a = [],
        o = [];
    t.Malaysia.forEach(function(e, t) {
        n.push(e.date), r.push(e.confirmed), a.push(e.deaths), o.push(e.recovered)
    });
    var i = a[a.length - 1],
        d = o[o.length - 1],
        l = r[r.length - 1];
    return {
        data: t,
        date: n,
        confirmed: r,
        death: a,
        recovered: o,
        death_toll: i,
        recovered_today: d,
        reported_cases_now: l
    }
}

window.addEventListener("load", () => {
    makeChart(), getNews()
});