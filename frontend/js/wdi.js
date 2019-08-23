
function WDI_init (errors, rows) {
  console.log('WDI');
  var ds_info = {
    raw: rows,
    nest: d3.nest().key( k => k["Indicator Code"]).key(k => k["Country Name"]).object(rows),
    indCode: [ ... new Set(rows.map(d => d["Indicator Code"]))], // all indicators
    indNameLookup: d3.nest().key(k => k["Indicator Code"]).rollup(r => r[0]["Indicator Name"]).object(rows), // ind -> desc lookup
    years: range(1960, 2018), // all years
    countries: [ ... new Set(rows.map(d => d["Country Name"]))], // all countries
    accessor: (i,c,y) => ds_info.nest[i][c][0][y] // accessor 
  };
  
  datasetRegister("WDI", ds_info);
  nbItems["Indicators"].addValues([{ds:"WDI", indCode:"SH.MMR.RISK"}, {ds:"WDI", indCode:"SH.MMR.RISK.ZS"}, {ds:"WDI", indCode:"SH.DTH.COMM.ZS"}]);
  // indicatorItemHandler({target: "#nb-item-container", addValues:[{ds:"WDI", indCode:"SH.MMR.RISK"}, {ds:"WDI", indCode:"SH.MMR.RISK.ZS"}, {ds:"WDI", indCode:"SH.DTH.COMM.ZS"}]})
}
