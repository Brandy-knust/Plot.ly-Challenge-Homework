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


// sampleData = []
// var obj = JSON.parse(samples);
// sampleData.forEach(sampleID => {
//     var personID = samples.metadata.id;
//     var ethn = samples.metadata.ethnicity;
//     var gender = samples.metadata.gender;
//     var age = samples.metadata.age;
//     var location = samples.metadata.location;
//     var bbtype = samples.metadata.bbtype;
//     var wash = samples.metadata.wfreq;
// });

// var personalData = sampleData.map(d => d);
// console.log(personalData);

// //     var dates = data.dataset.data.map(d=>d[0]);
// //     var closingPrices =  data.dataset.data.map(d=>d[4]);


// var dropdownMenu = d3.selectAll("#selDataset");
// // console.log(obj);
// var otuID = samples.otu_ids;
// var sampleValues = samples.sample_values;
// var selectedOption = dropdownMenu.property("value");


// d3.json("")
// d3.json("samples.json").then((data) => )