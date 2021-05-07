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

    // var selectedOption = dropdownMenu.property("value");
});

function optionChanged(value) {
    console.log(value);
    buildPanel(value);
    barPlot(value);
}
function buildPanel(id) {
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    panData = metadata.filter(a=> a.id == id)[0];
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
    console.log(filteredSamples);
    var otu_ids = filteredSamples.otu_ids;
    console.log(otu_ids);
    var otu_labels = filteredSamples.otu_labels;
    var sample_values = filteredSamples.sample_values;
    sortValues = sample_values.sort(function sortFunction(a, b) {
        return b - a;
    })
    slicedbar= sortValues.slice(0,10).reverse;

    var trace1 = {
        type: "bar",
        mode: "lines",
        name: otu_ids,
        x: slicedbar,
        y: otu_ids,
        orientation: "h"
    };

    var data = [trace1];

    var layout = {
        title: "OTU Types",
    }
    Plotly.newPlot("bar", data, layout);
}



// var dropdownMenu = d3.selectAll("#selDataset");
// // console.log(obj);
// var otuID = samples.otu_ids;
// var sampleValues = samples.sample_values;
// var selectedOption = dropdownMenu.property("value");
