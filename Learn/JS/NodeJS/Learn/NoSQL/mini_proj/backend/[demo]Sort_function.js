numbers = [2005, 2001, 2003, 2002, 2004];

numbers.sort((a, b) => {
    console.log(`Comparing ${a} and ${b}`);
    return a - b;
});

console.log(numbers);
// Output:
// Comparing 5 and 1
// Comparing 3 and 1
// Comparing 3 and 2
// Comparing 4 and 1
// Comparing 4 and 2
// Comparing 4 and 3


const data = google.visualization.arrayToDataTable([  ['Year', 'Sales'],
  ['2013',  1000],
  ['2014',  1170],
  ['2015',  660],
  ['2016',  1030]
]);

// Append a new data point to the array
data.addRows([  ['2017',  540]
]);

const chart = new google.visualization.LineChart(document.getElementById('chart-div'));
chart.draw(data, options);
