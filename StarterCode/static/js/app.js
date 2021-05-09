var sample = []
var metadata = []
var names = []
var samples = []
// function buildMetadata(sample) {
d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    samples = data.samples;
    var list = metadata.filter(a => a.id == sample);

    // console.log(result);




    var sampList = data.names;
    var dropdownMenu = d3.selectAll("#selDataset");
    sampList.forEach(function (sample) {
        dropdownMenu.append("option").text(sample)
            .property("value", sample)
    });


    barPlot(sampList[0])
    bubblePlot(sampList[0])
    gauge(sampList[0])

    // var selectedOption = dropdownMenu.property("value");
});

function optionChanged(value) {
    console.log(value);
    buildPanel(value);
    barPlot(value);
    bubblePlot(value);
    gauge(value);
}
function buildPanel(id) {
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    panData = metadata.filter(a => a.id == id)[0];
    console.log(panData);
    Object.entries(panData).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
    });
}

// var otu_ids = samples.otu_ids;
// console.log(otu_ids);
// var otu_labels = samples.otu_labels;
// var sample_values = samples.sample_values;
function barPlot(id) {
    filteredSamples = samples.filter(samp => samp.id == id)[0];
    // console.log(filteredSamples);
    filterList=[]
    for (var i = 0; i < filteredSamples.otu_ids.length; i++) {
        filterList.push({
        "otu_id":filteredSamples.otu_ids[i]
    })}
    for (var i = 0; i < filteredSamples.sample_values.length; i++) {
        filterList[i]["sample_values"]=filteredSamples.sample_values[i]
        }
    for (var i = 0; i < filteredSamples.sample_values.length; i++) {
        filterList[i]["otu_labels"]=filteredSamples.otu_labels[i]
        }
    // console.log(filterList)
    // var otu_ids = filteredSamples.otu_ids.map(d=>`Otu ID ${d}`).slice(0,10);
    // console.log(otu_ids);
    // var otu_labels = filteredSamples.otu_labels;
    // var sample_values = filteredSamples.sample_values;
    sortList = filterList.sort(function sortFunction(a, b) {
        return b.sample_values - a.sample_values
    }).slice(0, 10).reverse();
    console.log(sortList)
    



    var trace1 = {
        type: "bar",
        x: sortList.map(d=>d.sample_values),
        y: sortList.map(d=>`Otu ID ${d.otu_id}`),
        orientation: "h",
        text: sortList.map(d=>d.otu_labels)
    };

    var id = [trace1];

    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending'
        }],
        // xaxis: "Sample Values"
    };
    Plotly.newPlot("bar", id, layout);

    }
    function bubblePlot(id) {
        filteredSamples = samples.filter(samp => samp.id == id)[0];
        console.log(filteredSamples);
        var otu_ids = filteredSamples.otu_ids;
        console.log(otu_ids);
        var otu_labels = filteredSamples.otu_labels;
        var sample_values = filteredSamples.sample_values;

        var trace2 = {
            // type: bubble,
            x: otu_ids.map(d=>`${d}`),
            y: sample_values,
            mode: "markers",
            marker: {
                sample_values,
                size: sample_values.map(d=>d*10),
                sizeMin: 100,
                sizemode: "area",
                color: otu_ids,
                colorscale: 'Picnic'
            },
            text: otu_labels
        };

        var id = [trace2];

        var layout = {
            title: "Bacteria Cultures per Sample",
            xaxis: { title: "OTU IDs"}
        };
        Plotly.newPlot("bubble", id, layout);
    }
    function gauge(id) {
        washed = metadata.filter(a => a.id == id)[0];
        var wFreq = washed.wfreq;
        console.log(wFreq);
        var trace3 = [
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: wFreq,
                  title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
                  gauge: {
                    axis: { range: [null, 9], tickwidth: 2, visible: false},
                    domain: { row: 0, column: 0 },
                    bar: { color: "green" },
                    // bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "black",
                    steps: [
                      { range: [0, 1], color: "#ebf9f9" },
                      { range: [1, 2], color: "#d7f4f4" },
                      { range: [2, 3], color: "#c4eeee" },
                      { range: [3, 4], color: "#b0d8e8" },
                      { range: [4, 5], color: "#88dddd" },
                      { range: [5, 6], color: "#75d7d7" },
                      { range: [6, 7], color: "#61d1d1" },
                      { range: [7, 8], color: "#39c6c6" },
                      { range: [8, 9], color: "#2e9e9e" }
                    ],
                    // threshold: {
                    //   line: { color: "red", width: 4 },
                    //   thickness: 0.75,
                    //   value: 490
                    // }
                  }
                }
              ];

              var id = [trace3];
              
              var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, r: 25, l: 25, b: 25 },
                paper_bgcolor: "lavender",
                font: { color: "darkblue", family: "Arial" }
              };
              
              Plotly.newPlot('gauge', id, layout);
    }
        

