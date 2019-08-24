class viewsItemHandler {
  constructor(cfg) {
    if (!cfg.values) cfg.values = [];
    this.cfg = cfg;
    this.on = {
      Edit: this.edit,
      Remove: this.remove
    }  
    
    var html = commonItemHandler(cfg, cfg.title);
    $(cfg.target).append(html);
    
    if (cfg.values.length) this.doValues();
    
    //--------------------------------------------------------------
    $("#nb-item-views .nb-content:eq(0)").append('<span id="example-graph-0"></span><span id="example-graph-1"></span>');
    
    var flatData = [[
      {x: 2010, y: 12},
      {x: 2011, y: 24},
      {x: 2012, y: 24},
      {x: 2013, y: 20},
      {x: 2014, y: 23},
      {x: 2015, y: 25},
      {x: 2016, y: 27}
    ], [
      {x: 2010, y: 24},
      {x: 2011, y: 24},
      {x: 2012, y: 25},
      {x: 2013, y: 25},
      {x: 2014, y: 26},
      {x: 2015, y: 27},
      {x: 2016, y: null}
    ]];
    
    flatData[0] = flatData[0].map(d => {  // flatten it
        return {x:new Date(d.x, 0, 1), y:d.y};
        }); 
        
    flatData[1] = flatData[1].map(d => {  // flatten it
        return {x:new Date(d.x, 0, 1), y:d.y};
        }); 
           
    var cfg0 = {
      title: "Lifetime risk of maternal death (%)",
      data: flatData,
      x_accessor: "x",
      y_accessor: "y",
      color: ['#C377FF'],
      width: 400,
      height: 200,
      target: "#example-graph-0"
    }
    MG.data_graphic(cfg0);
    
    var vals = [
      {x: 2010, y: 45},
      {x: 2011, y: 47},
      {x: 2012, y: 46},
      {x: 2013, y: 50},
      {x: 2014, y: 45},
      {x: 2015, y: 60},
      {x: 2016, y: 60}
    ]
    
    flatData = vals.map(d => {  // flatten it
        return {x:new Date(d.x, 0, 1), y:d.y};
        });
        
     var cfg1 = {
      title: "Lifetime risk of maternal death (by country)",
      data: flatData,
      x_accessor: "x",
      y_accessor: "y",
      color: ['#C377FF'],
      width: 400,
      height: 200,
      target: "#example-graph-1"
    }
    
    MG.data_graphic(cfg1);
   
    
    $('svg').css('background', '#fafafa10');
    
    cfg.buttons.forEach(d => {
      $(this.cfg.target).on("click", ".nb-item-" + this.cfg.title + " #" + d.label, this, this.on[d.label]);
      }); 
    
    this.indHealth = new indHealth({});
  }
  
  edit(e) {
    console.log('hi')
  }
  
  remove(e) { // remove from indicators health and graphs
    $(".nb-item-" + e.data.cfg.title + " .nb-item-selected").each(function(d) {
      e.data.cfg.values = e.data.cfg.values.filter(i => i.indCode != $(this).data('ind-code') && i.ds == $(this).data('ds'));
      });
    e.data.doValues();
  }
}
