class indHealth {
  
  constructor(cfgView) {
    this.indHealthMetrics = {};
    this.cfgView = cfgView; // whether to show metric or not
    
    this.indHealthMetrics = {};
    var methods = Object.getOwnPropertyNames(this.__proto__).filter(d => d.startsWith('meta'));
    methods.forEach(d => this.indHealthMetrics[d.replace("meta", "").replace("_", " ")] = this.__proto__[d]); // register all health metadata methods 
    this.blocklist = ["Country", "ID", "Preview", "Add"];
  }
  
  getSeries(ds, indCode, c, years) {
    return years.map(y => {
      var val = datasetDesc[ds].accessor(indCode, c, y)
      return val==''?null:+val
      });
  }
  
  metaCountry(label, ds, i, c, ys, vals) {
    return '<b>' + c + '</b>' + '<br>'
  }
  
  metaID(label, ds, i, c, ys, vals) {
    return ds + ':' + i + ':' + d3.min(ys) + '-' +  d3.max(ys) + '<br>'
  }
  
  metaMin(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.min(vals))}`);
  }
  
  metaMax(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.max(vals))}`);
  }
  
  metaMean(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.mean(vals))}`);
  }
  
  metaMedian(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.median(vals))}`);
  }
  
  metaMedian_Quantile(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.quantile(vals.filter(d => d!=null), 0.5))}`);
  }
  
  metaDeviation(label, ds, i, c, ys, vals) {
    return (`${label}: ${maxSign(d3.deviation(vals))}`);
  }
  
  metaSparsity(label, ds, i, c, ys, vals) {
    return (`${label}: ${ maxSign((vals.filter(d => d==null).length/vals.length)*100) + '%'}`);
  }
  
  mwmetaDistribution(label, ds, i, c, ys, vals) {
    return (`${label}: ${1}`);
  }
  
  metaPreview(label, ds, i, c, ys, vals) { // <div>${label}</div> 
    return (`<div id="graph-${c}" class="graph-preview" data-values='${JSON.stringify(ys.map((d,i) => { return {y:vals[i], x:d}}))}'></div>`);  
  }
  
  metaAdd(label, ds, i, c, ys, vals) {
    return (`<div class="nb-item-selectable">Add to Views</div> `);
  }
    
  createIndHealth(e) {
    var indCode = $(e).data('ind-code');
    var ds = $(e).data('ds');
    if (ds == undefined) return;
    return ["Mali", "Chad"].map(c => { // TODO UN-hardcode
        return Object.keys(this.indHealthMetrics).map(d => {
          var years = range(1990,2018);
          var vals = this.getSeries(ds, indCode, c, years);
          return `<div ${this.blocklist.includes(d)?'':'style="display:inline-block;"'}>${this.indHealthMetrics[d](d, ds, indCode, c, years, vals)}</div> `
        }).join('');
      }).join('<br><br>');
  }
}
