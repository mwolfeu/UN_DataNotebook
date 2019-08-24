
class indicatorItemHandler {
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
  
  doValues() { 
    var values  = this.cfg.values.map((d,i) => {
        return `<span class="nb-item-selectable" data-ds="${d.ds}" data-ind-code="${d.indCode}">${i+1}. ${datasetDesc[d.ds].indNameLookup[d.indCode]}</span>`
      }).join(', </br>');
    
    $(".nb-item-" + this.cfg.title + " .nb-content").html(MENU + values);
    
    $(".nb-item-" + this.cfg.title + " .nb-item-on-select").addClass("nb-item-hide");
    $(this.cfg.target).off("click", ".nb-item-selectable");
    $(this.cfg.target).on("click", ".nb-item-selectable", this, function(e) {
      
      $(this).siblings().removeClass("nb-item-selected");
      $(this).toggleClass("nb-item-selected");
      
      if ($(".nb-item-" + e.data.cfg.title + " .nb-item-selected").length)
        $(".nb-item-" + e.data.cfg.title + " .nb-item-on-select").removeClass("nb-item-hide");
      else
        $(".nb-item-" + e.data.cfg.title + " .nb-item-on-select").addClass("nb-item-hide");
      });
    
      function graphPreview(popup) {

        $(".graph-preview").each((i,e) => {
          var vals = $(e).data("values");
          var id = $(e).attr('id');
          var flatData = vals.map(d => {  // flatten it
              return {x:new Date(d.x, 0, 1), y:d.y};
              });
        
          var cfg = {
            data: flatData,
            x_accessor: "x",
            y_accessor: "y",
            area: true,
            color: ['#C377FF'],
            width: 300,
            height: 80,
            x_axis: false,
            y_axis: false,
            buffer: 0,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
          
          cfg.target = "#" + id + ".graph-preview";
          MG.data_graphic(cfg);
          $('svg').css('background', '#fafafa10');
        })
        

      }
       
    tippy(this.cfg.target, {
      target: ".nb-item-selectable",
      content: (e) => this.indHealth.createIndHealth(e),  // sets "this" to object this and not popup event this.
      interactive: true,
      animation: "shift-away",
      arrow: true,
      inertia: true,
      distance: 20,
      followCursor: "initial",
      duration: [500,0],
      //onShow:onKeyTipShow,
      onShown: graphPreview,
      //onHide:onKeyTipHide
    }); 
    
    tippy(".dots", {
      //target: ".menu",
      content: mContent,  // sets "this" to object this and not popup event this.
      interactive: true,
      theme: "light",
      animation: "fade",
      placement: "bottom",
      trigger: "click",
      hideOnClick: true,
      distance: 0,
      followCursor: "initial",
      duration: 0
    });
  }
  
  addValues(vals) {
    this.cfg.values = this.cfg.values.concat(vals);
    this.doValues();
  }
}

