const samples = "samples.json"
d3.json(samples).then(function (data) {
    console.log(data);
});

// const dataPromise = d3.json(samples);
// console.log("Data Promise: ", dataPromise);

// var real_data = "";

// dataPromise.then(function (data) {
//     real_data = data
//     console.log(data);
// });
// var sampleID = real_data.names;

sampleData = []
var obj = JSON.parse(samples);
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


// d3.selectAll("#selDataset").on("change", updatePlotly);
// console.log(obj);
var otuID = samples.id.otu_ids;
var sampleValues = samples.id.sample_values;
var selectedOption =dropdownMenu.property("value");

sortValues=sampleValues.sort(function sortFunction(a,b) {
    return b-a;
})