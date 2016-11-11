
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var stringData = [request.source];
    var key = '2fedeefb340bc05e8a8fc09564a685db';
    var params = 'data=' + stringData + '&api_key=' + key;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://apiv2.indico.io/emotion', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    message.innerText = request.source;

    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //  put into html
                console.log(document);
                console.log(xhr.responseText);
            } else {
                // TODO: Request Error state 
                console.error(xhr.statusText);
            }
        }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.send(params);
  }
});

function onWindowLoad() {
  function tabCallback(tabs) {
    var currentUrl = tabs[0].url; // there will be only one in this array
    var message = document.querySelector('#message');
    // only works with medium
    if (!currentUrl.startsWith('https://medium.com/')) {
      return;
    }
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  };
  var query = { active: true, currentWindow: true };
  chrome.tabs.query(query, tabCallback);
};

window.onload = onWindowLoad;