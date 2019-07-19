 var config = {
    content: [{
        type: 'row',
      content:[{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'notebook',
                title:'Notebook'
            },{
                type: 'component',
                componentName: 'chat',
                title:'Chat'
            }]
        },{
        type: 'stack',
        width: 60,
        content:[{
              type: 'component',
              componentName: 'output',
              title:'Output'
          }]
      },]
    }]
};

var myLayout = new GoldenLayout( config );

myLayout.registerComponent( 'notebook', function( container, state ){
    var content = $(`
      <style>
        .nbItemContainer {
          display: flex;
          margin: 10px;
          background-color: #00b09e;
          border: 5px solid #00b09e;
          border-radius: 5px;display: flex:
        }
        
        .nbItemIcon {
          float: left;
          width: 20px;
          height: 20px;
          
          background-color: white;
          border: 5px solid white;
          border-radius: 25%;
          margin: 2px;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        #edit {
          background-image: url('img/pencil-alt-solid.svg');
        }
        
        #delete {
          background-image: url('img/times-solid.svg');
        }
        
        .nbPic{
          width: 100px;
          margin: 5px;
        }
        
        .nbIndicator {
          background-color: #fafafa;
          margin: 5px;
          height: min-content;
          border: 1px solid darkgrey;
          border-radius: 10px;
          padding: 5px;
        }
        
        .nbIndX {
          background-image: url('img/times-circle-regular.svg');
          background-repeat: no-repeat;
          background-position: center;
          width: 15px;
          height: 15px;
          display: inline-block;
          margin-left: 5px;
        }
      </style>
      
      <div style="margin: 50px;">This would be user state stored in notebook form (graphs, filters, indicators).</div>
      
      <div>
        <div style="margin: 10px;"> <b>Countries</b> </div>
        <div class="nbItemContainer">
          <div style="margin-right: auto;"> My-Countries </div>
          <div class="nbIndicator">Chad <div class="nbIndX"></div> </div>
          <div class="nbIndicator">Libya <div class="nbIndX"></div> </div>
          <div class="nbIndicator">Mali <div class="nbIndX"></div> </div>
          <div class="nbIndicator">Niger <div class="nbIndX"></div> </div>
          
          <div id="edit" class="nbItemIcon"></div>
          <div id="delete" class="nbItemIcon"></div>
        </div>  
      
      
        <div style="margin: 10px;"> <b>Indicators</b> </div>
        <div class="nbItemContainer">
          <div style="margin-right: auto;"> My-Sahel-Indicators </div>
          <div class="nbIndicator">MMR_ISA_CR <div class="nbIndX"></div> </div>
          <div class="nbIndicator">VDA_ISA_GD <div class="nbIndX"></div> </div>
          <div class="nbIndicator">IMR_ISA_CR <div class="nbIndX"></div> </div>
          
          <div id="edit" class="nbItemIcon"></div>
          <div id="delete" class="nbItemIcon"></div>
        </div>     
        
        <div style="margin: 10px;"> <b>Year Filter</b> </div>
        <div class="nbItemContainer">
          <div style="margin-right: auto;"> Range: 1990-2010 </div>
          <div id="edit" class="nbItemIcon"></div>
          <div id="delete" class="nbItemIcon"></div>
        </div>
        
        <div style="margin: 10px;"> <b>Saved Graphs</b> </div>
        <div class="nbItemContainer">
          <div style="margin-right: auto;"> Named Set 1 </div>
          <img class="nbPic" src="img/imr-mmr-example-graph.png"/>
          <img class="nbPic" src="img/imr2-example.gif"/>
          <div id="delete" class="nbItemIcon"></div>
        </div>       
      </div>
    `);
    
  container.getElement().append( content );
    
  });
  
myLayout.registerComponent( 'chat', function( container, state ){
  var content = $('<img src="img/chat-example.png" />');
  
  container.getElement().append( content );
  });
  
myLayout.registerComponent( 'output', function( container, state ){
  var content = $(`
    <div style="margin: 50px;">This would be output (graphs, lists of indicators), and UI controls for the notebook (slider for date, selection list for chat). An example of DnD graph output like the one below can be dragged into the notebook.</div>
    <img src="img/imr-mmr-example-graph.png" />
    `);
  
  container.getElement().append( content );
  });

//~ myLayout.registerComponent( 'example', function( container, state ){
  //~ var counter = $('<div class="messageCounter">' + state.startCount + '</div>'),
  //~ btnContainer = $('<div class="btnContainer"></div>'),
      //~ count = state.startCount;

  //~ container.getElement().append( btnContainer );
  //~ });

myLayout.init();
