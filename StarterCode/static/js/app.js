function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;

        // function plotsInit () {
        //     d3.json("samples.json")
        //     var sample = data.samples;

        var list = metadata.filter(a => a.id == sample);
        var sampList = data.names;
        var dropdownMenu = d3.selectAll("#selDataset");
        sampList.forEach(function (sample){
            dropdownMenu.append("option").text(sample)
            .property("value", sample)
        })
        var result = list[0];
        console.log(result);
        var panel = d3.select("#sample-metadata");
        panel.html("");

        
        
        var selectedOption = dropdownMenu.property("value");
    })
}
buildMetadata();

function barPlot() {
    sortValues = sampleValues.sort(function sortFunction(a, b) {
        return b - a;
    });
    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    var sample_values = data.sample_values;

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