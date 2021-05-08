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

    // var selectedOption = dropdownMenu.property("value");
});

function optionChanged(value) {
    console.log(value);
    buildPanel(value);
    barPlot(value);
    bubblePlot(value);
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
                size: sample_values.map(d=>d*4),
                sizeMin: 100,
                sizemode: "area",
                color: otu_ids,
                colorscale: 'Picnic'
            },
            text: otu_labels
        };

        var id = [trace2];

        var layout = {
            title: "Bacteria Cultures per Sample"
        };
        Plotly.newPlot("bubble", id, layout);
    }
    // function guage(id) {
        // metadata.filter(a => a.id == id)[0];

        // var data = [
            //     {
            //       type: "indicator",
            //       mode: "gauge+number+delta",
            //       value: 420,
            //       title: { text: "Speed", font: { size: 24 } },
            //       delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
            //       gauge: {
            //         axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
            //         bar: { color: "darkblue" },
            //         bgcolor: "white",
            //         borderwidth: 2,
            //         bordercolor: "gray",
            //         steps: [
            //           { range: [0, 250], color: "cyan" },
            //           { range: [250, 400], color: "royalblue" }
            //         ],
            //         threshold: {
            //           line: { color: "red", width: 4 },
            //           thickness: 0.75,
            //           value: 490
            //         }
            //       }
            //     }
            //   ];
              
            //   var layout = {
            //     width: 500,
            //     height: 400,
            //     margin: { t: 25, r: 25, l: 25, b: 25 },
            //     paper_bgcolor: "lavender",
            //     font: { color: "darkblue", family: "Arial" }
            //   };
              
            //   Plotly.newPlot('myDiv', data, layout);
    // }
        

