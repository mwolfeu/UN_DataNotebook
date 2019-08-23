
function commonItemHandler(cfg, title) {
  var buttons = cfg.buttons.map(d => {
    return `<span id="${d.label}" class="nb-item-icon nb-item-${d.show}" title="${d.label}" style="background-image: url('img/${d.icon}')";></span>`
    }).join(' ');
  
  var html = `
    <div class="nb-item nb-item-${title}">
      <div class="nb-item-title">
         <b>${title}:</b>&nbsp; ${cfg.label} <span class="nb-item-spacer"></span>  ${buttons}
      </div>
      <div class="nb-content-wrapper">
        <div class="nb-content">
        </div>
      </div>
    </div>
  `;
  
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
        type: 'stack',
        width: 60,
        content:[{
              type: 'component',
              componentName: 'notebook',
              title:'Notebook'
          }]
      },]
    }]
  };
  
  var myLayout = new GoldenLayout(mgrCfg);
  
  myLayout.registerComponent('chat', function( container, state ){
    var content = $(chatTemplate);
    container.getElement().append( content );
  });
  
  myLayout.registerComponent('notebook', function( container, state ){
    var content = $(`<div id="nb-item-container"></div>`);
    container.getElement().append( content );
    });
   
  myLayout.on('initialised', function(){
    ConversationPanel.init();
    Conversation.mwDispMsg('Six "WDI" example indicators have been loaded for Mali and Chad.')
    
    cfg.forEach(c => itemRegister(c));
  });
   
  myLayout.init();

}
