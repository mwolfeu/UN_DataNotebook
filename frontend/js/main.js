/*
* TODO: 
* Add triple dot / example
* popup
*/

DNB = {}; // Global Vars

var ds = {
	obj: new dataset,
	WDIcols: range(1960, 2018)
}

// each dataset is preprocessed to contain a country,year col and only the desired indicators
// exceptions values can be Number for default number conversion or bespoke function
var dsImportList = {				// list of all indicators
  "myWDI.csv":{											
    exceptions:ds.WDIcols.map(d => [d, Number]),
    initFcn: WDI_init
  }
};

var datasetDesc = {};

function datasetRegister(name, desc) {
  datasetDesc[name] = desc;
}

function getSeries(ds, indCode, c, years) {
  return years.map(y => {
    var val = datasetDesc[ds].accessor(indCode, c, y)
    return val==''?null:+val
    });
}

//////////
// MAIN //
//////////
$(document).ready(function() {
  
  var cfg = [
    {
      title: "Search",
      target: "#nb-item-search",
      handler: searchItemHandler,
      label: ['Filter: "Years" &nbsp;<div id="filter-years-output">2010-2016</div>', 'Filter: "Countries"', 'Text: "Maternal"', 'Slope Similar To: "3: Number of maternal deaths"'],
      buttons: [{show:"always", label:"Edit", icon:"pencil-alt-solid.svg"},
                {show:"on-select", label:"Remove", icon:"times-solid.svg"}],
      prefs: ["Sort by Alpha"]
    },
    {
      title: "Indicators",
      target: "#nb-item-indicators",
      handler: indicatorItemHandler,
      label: ["WDI Example Set"],
      buttons: [{show:"always", label:"Edit", icon:"pencil-alt-solid.svg"},
                {show:"on-select", label:"Remove", icon:"times-solid.svg"}],
      prefs: ["Sort by Alpha"]
    },
    {
      title: "Views",
      target: "#nb-item-views",
      handler: viewsItemHandler,
      label: ["Graphs to Keep"],
      buttons: [{show:"always", label:"Edit", icon:"pencil-alt-solid.svg"},
                {show:"on-select", label:"Remove", icon:"times-solid.svg"}],
      prefs: ["Sort by Alpha"]
    }
    ];
    
  managerInit(cfg);
  ds.obj.init(dsImportList); // init datasets
  $(".lm_content").css("overflow-y", "auto"); 
});




