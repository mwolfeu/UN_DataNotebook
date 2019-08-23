
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
  }
  
  edit(e) {
    console.log('hi')
  }
  
  remove(e) { // remove from indicators health and graphs
    $(".nb-item-" + e.data.cfg.title + " .nb-item-selected").each(function(d) {
      e.data.cfg.values = e.data.cfg.values.filter(i => i.indCode != $(this).data('key'));
      });
    e.data.doValues();
  }
  
  doValues() { 
    var values  = this.cfg.values.map(d => {
        return `<span class="nb-item-selectable" data-key="${d.indCode}">${datasetDesc[d.ds].indNameLookup[d.indCode]}</span>`
      }).join(', </br>');
    
    $(".nb-item-" + this.cfg.title + " .nb-content").html(values);
    
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
  }
  
  addValues(vals) {
    this.cfg.values = this.cfg.values.concat(vals);
    this.doValues();
  }
}

