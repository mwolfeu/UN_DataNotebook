var chatTemplate = `
    <div id="view-change-button" class="button" onclick="PayloadPanel.togglePanel(event, this)" style='display:none;' >
      <img class="option full" src="img/chat/Chat Button.png">
      <img class="option not-full" src="img/chat/Code Button.png">
    </div>
    <div id="contentParent" class="responsive-columns-wrapper">
      <div id="chat-column-holder" class="responsive-column content-column">
        <div class="chat-column">
          <div id="scrollingChat"></div>
          <p class="user-typing" id="user-typing-field"></p>
          <label for="textInput" class="inputOutline">
            <input id="textInput" class="input responsive-column" placeholder="Type something" type="text" onkeydown="ConversationPanel.inputKeyDown(event, this)"
              autofocus>
          </label>
          <div class="disclaimer" style="display:none;" >
            * This system is for demonstration purposes only and is not intended to process Personal Data. No Personal
            Data is to be entered
            into this system as it may not have the necessary controls in place to meet the requirements of the General
            Data Protection
            Regulation (EU) 2016/679.
          </div>
          <div class="disclaimer">
            By using this application, you agree to the&nbsp;
            <a target="_blank" rel="noreferrer noopener" href="https://watson-developer-cloud.github.io/terms?name=Watson%20Assistant%20Demo">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
      <div id="payload-column" class="fixed-column content-column" style="display:none;" >
        <div id="payload-initial-message">
          Type something to see the output
        </div>
        <div id="payload-request" class="payload"></div>
        <div id="payload-response" class="payload"></div>
      </div>
    </div>
  `
