
function commonItemHandler(cfg, title) {
  var buttons = cfg.buttons.map(d => {
    return `<span id="${d.label}" class="nb-item-icon nb-item-${d.show}" title="${d.label}" style="background-image: url('img/${d.icon}')";></span>`
    }).join(' ');
  
  var html = cfg.label.map(d => `
    <div class="nb-item nb-item-${title}">
      <div class="nb-item-title">
         ${d} <span class="nb-item-spacer"></span>  ${buttons}
      </div>
      <div class="nb-content-wrapper">
        <div class="nb-content">
        </div>
      </div>
    </div>
    `).join('');
  
  return html;
}

var nbItems = {};

function itemRegister(cfg) {
  nbItems[cfg.title] = new cfg.handler(cfg);
  // cfg.handler(cfg);
}

// "window" manager
function managerInit(cfg) {
  var mgrCfg = {
    content: [{
        type: 'row',
      content:[{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'chat',
                title:'Chat'
            }]
        },{
        type: 'column',
        // width: 60,
        content:[{
              type: 'component',
              componentName: 'search',
              title:'Search'
          },{
              type: 'component',
              componentName: 'indicators',
              title:'Indicators'
          },{
              type: 'component',
              componentName: 'views',
              title:'Views'
          }]
        },
      
      ]
    }]
  };
  
  var myLayout = new GoldenLayout(mgrCfg);
  
  myLayout.registerComponent('chat', function( container, state ){
    var content = $(chatTemplate);
    container.getElement().append( content );
  });
  
  myLayout.registerComponent('search', function( container, state ){
    var content = $(`<div id="nb-item-search" class="nb-item-container"></div>`);
    container.getElement().append( content );
    });
   
  myLayout.registerComponent('indicators', function( container, state ){
    var content = $(`<div id="nb-item-indicators" class="nb-item-container"></div>`);
    container.getElement().append( content );
    });  
    
  myLayout.registerComponent('views', function( container, state ){
    var content = $(`<div id="nb-item-views" class="nb-item-container"></div>`);
    container.getElement().append( content );
    });  
  
  myLayout.on('initialised', function(){
    ConversationPanel.init();
    Conversation.mwDispMsg('Six "WDI" example indicators have been loaded for Mali and Chad.');
    Conversation.mwDispMsg('Search between 2010 and 2016 for Chad and Mali for the word "maternal"');
    Conversation.mwDispMsg('The result has been added to the search window.');
    Conversation.mwDispMsg('Search for indicators with slopes similar to result 3.');
    Conversation.mwDispMsg('The result has been added to the search window.');
    Conversation.mwDispMsg('Save 4 5 6');
    Conversation.mwDispMsg('What would you like this new save group to be called?');
    Conversation.mwDispMsg('WDI Example Set');
    Conversation.mwDispMsg('The group has been added to "WDI Example Set" in the indicators window.<br>Hover over each for health metadata.');
    Conversation.mwDispMsg('Graph 2 for Mali and Chad');
    Conversation.mwDispMsg('Do you want them both on the same graph?');
    Conversation.mwDispMsg('yes');
    Conversation.mwDispMsg('What would you like this new graph group to be called?');
    Conversation.mwDispMsg('Graphs to Keep');
    Conversation.mwDispMsg('The graph has been added to views.');
    Conversation.mwDispMsg('Add an area graph of 1 for Chad in Graphs to Keep');
    Conversation.mwDispMsg('The graph has been added to views.');
    cfg.forEach(c => itemRegister(c));
  });
   
  myLayout.init();

}
