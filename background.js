var ws = new WebSocket('ws://localhost:8088/post');

chrome.browserAction.onClicked.addListener(function(tab){
  let url_encoded_url = encodeURIComponent(tab.url);
  ws.send(url_encoded_url);
});