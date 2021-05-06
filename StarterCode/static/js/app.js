var sample = []
var metadata = []
var names = []
var samples = []
// function buildMetadata(sample) {
d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    var list = metadata.filter(a => a.id == sample);

    // console.log(result);




    var sampList = data.names;
    var dropdownMenu = d3.selectAll("#selDataset");
    sampList.forEach(function (sample) {
        dropdownMenu.append("option").text(sample)
            .property("value", sample)
    });




    // var selectedOption = dropdownMenu.property("value");
});

function optionChanged(value) {
    console.log(value);
    buildPanel(value);
}
function buildPanel(id) {
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    panData = metadata.filter(a=> a.id == id);
    console.log(panData);
    Object.entries(panData).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
    });
}

var otu_ids = samples.otu_ids;
var otu_labels = samples.otu_labels;
var sample_values = samples.sample_values;
function barPlot() {
    sortValues = sampleValues.sort(function sortFunction(a, b) {
        return b - a;
    });

    var trace1 = {
        type: "bar",
        mode: "lines",
        name: otu_ids,
        x: otu_labels,
        y: sample_values
    };

    var data = [trace1];

    var layout = {
        title: "OTU Types",
    }
    Plotly.newPlot("#bar", data, layout);
}


// var dropdownMenu = d3.selectAll("#selDataset");
// // console.log(obj);
// var otuID = samples.otu_ids;
// var sampleValues = samples.sample_values;
// var selectedOption = dropdownMenu.property("value");
