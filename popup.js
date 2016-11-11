
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == 'getSource') {
    var stringData = request.source;
    var key = '2fedeefb340bc05e8a8fc09564a685db';
    var params = 'data=' + stringData + '&api_key=' + key;
    $.post(
      'https://apiv2.indico.io/emotion',
      JSON.stringify({
        'api_key': '2fedeefb340bc05e8a8fc09564a685db',
        'data': stringData
      })
    ).then(function(res) {
      var results = JSON.parse(res).results;
      // draw chart
      var chartData = [];
      var chartLabels = [];
      for (var key in results) {
        chartLabels.push(key)
        chartData.push(parseFloat(results[key]*100).toFixed(2))
      }
      
      var chartData = {
        labels : chartLabels,
        title : 'Emotion Breakdown',
        datasets : [
          {
            fillColor : 'rgba(220,220,220,0.5)',
            strokeColor : 'rgba(220,220,220,1)',
            pointColor : 'rgba(220,220,220,1)',
            pointStrokeColor : '#fff',
            data : chartData
          },
        ]
      };
      var chartOptions = {
        footNote: 'Emotional Breakdown',
        annotateDisplay : true,
        annotateLabel: function(data) {
          console.log(data);
        }
      }
      var chart = new Chart(document.getElementById('myChart').getContext('2d')).Radar(chartData, chartOptions);
    });
  }
});

$(function() {
  function tabCallback(tabs) {
    var currentUrl = tabs[0].url; // there will be only one in this array
    var message = document.querySelector('#message');
    // only works with medium
    if (!currentUrl.startsWith('https://medium.com/')) {
      return;
    }
    chrome.tabs.executeScript(null, {
      file: 'getPagesSource.js'
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  };
  var query = { active: true, currentWindow: true };
  chrome.tabs.query(query, tabCallback);
});