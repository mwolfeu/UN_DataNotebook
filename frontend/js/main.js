/*
TODO:
half half  
left/right conversation w next button
Submit vars (name, argN, BOOL:edit,del)
Submit results (name, URLS)


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
    exceptions:ds.WDIcols,
    initFcn: WDI_init
  }
};

var datasetDesc = {};

function datasetRegister(name, desc) {
  datasetDesc[name] = desc;
}

//////////
// MAIN //
//////////
$(document).ready(function() {
  
  var cfg = [
    {
      title: "Indicators",
      target: "#nb-item-container",
      handler: indicatorItemHandler,
      label: "myIndicators",
      buttons: [{show:"always", label:"Edit", icon:"pencil-alt-solid.svg"},
                {show:"on-select", label:"Remove", icon:"times-solid.svg"}],
      prefs: ["Sort by Alpha"]
    }
    ];
    
  managerInit(cfg);
  ds.obj.init(dsImportList); // init datasets
  
});




