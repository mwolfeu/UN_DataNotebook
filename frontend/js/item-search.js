class searchItemHandler {
  constructor(cfg) {
    if (!cfg.values) cfg.values = [];
    this.cfg = cfg;
    this.on = {
      Edit: this.edit,
      Remove: this.remove
    }  
    
    var html = commonItemHandler(cfg, cfg.title);
    $(cfg.target).append(html);
    
    if (cfg.values.length) this.doValues(); // make an array
    
    
    $('.nb-item-icon[Title="Remove"]').addClass("nb-item-hide"); // TODO GET RID OF HACK
    //--------------------------------------------------------------
    // <div class="dots"></div>
    $("#nb-item-search .nb-content:eq(0)").append(' <div id="filter-year"></div> <div class="control-tick-labels"> <div class="control-tick-label">1965</div><div class="control-tick-label">2018</div> </div> ');
    var yMin = 1965, yMax = 2018;
    $( "#nb-item-search .nb-content #filter-year" ).slider({
      range: true,
      min: yMin,
      max: yMax,
      values: [2010,2016],
      change: function(event, ui) {
        // $('.section#section4 #left-side #main-text #mt-year').html(ui.values[0] + "-" + ui.values[1]);
      },
      slide: function( event, ui ) {
        $("#nb-item-search #filter-years-output").html(ui.values[0] + "-" + ui.values[1]);
      }
    });
    
    
    
    //--------------------------------------------------------------
    
    $("#nb-item-search .nb-content:eq(1)").append('<span class="nb-item-selectable">Chad</span>, <span class="nb-item-selectable">Mali</span>');

    //--------------------------------------------------------------
    
    $("#nb-item-search .nb-content:eq(2)").append(`
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.STA.MMRT" tabindex="0">1. <b>Maternal</b> mortality ratio (modeled estimate, per 100,000 live births)</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.STA.MMRT.NE" tabindex="0">2. <b>Maternal</b> mortality ratio (national estimate, per 100,000 live births)</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.MMR.DTHS" tabindex="0">3. Number of <b>maternal</b> deaths</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.MMR.RISK" tabindex="0">4. Lifetime risk of <b>maternal</b> death (1 in: rate varies by country)</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.MMR.RISK.ZS" tabindex="0">5. Lifetime risk of <b>maternal</b> death (%)</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.DTH.COMM.ZS" tabindex="0">6. Cause of death, by communicable diseases and <b>maternal</b>, prenatal and nutrition conditions (% of total)</span>
    `);
    
    //--------------------------------------------------------------
    
    $("#nb-item-search .nb-content:eq(3)").append(`
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.MMR.RISK" tabindex="0">Lifetime risk of maternal death (1 in: rate varies by country)</span>, <br>
      <span class="nb-item-selectable" data-ds="wWDI" data-ind-code="sSH.MMR.RISK.ZS" tabindex="0">Lifetime risk of maternal death (%)</span>
    `);
    
    $(this.cfg.target).off("click", ".nb-item-selectable");
    $(this.cfg.target).on("click", ".nb-item-selectable", this, function(e) {
      
      $(this).siblings().removeClass("nb-item-selected");
      $(this).toggleClass("nb-item-selected");
      
      if ($(".nb-item-" + e.data.cfg.title + " .nb-item-selected").length)
        $(".nb-item-" + e.data.cfg.title + " .nb-item-on-select").removeClass("nb-item-hide");
      else
        $(".nb-item-" + e.data.cfg.title + " .nb-item-on-select").addClass("nb-item-hide");
      });
    
    
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
