jQuery(document).ready(function() {

  let epaDataRecords;
  let dataChart = {
      "methods" : {
          "gets" : 0,
          "posts": 0,
          "heads": 0
      },
      "responseCode" : {
        "c200" : 0,
        "c302" : 0,
        "c304" : 0,
        "c403" : 0,
        "c404" : 0,
        "c500" : 0,
        "c501" : 0
      },
      "sizes" : [] 
  };
  let sizes = [];

  let methodChart = 'methodChart';
  let requestPerMinuteChart = 'requestsPerMinuteChart';
  let responseCode = 'responseCodeChart';
  let sizeChart = 'documentSizeChart';
  
  $.getJSON('http://localhost:3000/data', function(data){

    epaDataRecords = data;

  }).then(function(){


    epaDataRecords.forEach(element => {

      switch(element.request.method){
          case 'GET': dataChart.methods.gets ++;break;
          case 'POST': dataChart.methods.posts ++;break;
          case 'HEAD': dataChart.methods.heads ++;break;
        };
      
      switch(element.response_code){
          case '200': dataChart.responseCode.c200 ++;
            if(element.document_size < 1000){
              sizes.push(element.document_size);
            }
          break;
          case '302': dataChart.responseCode.c302 ++;break;
          case '304': dataChart.responseCode.c304 ++;break;
          case '403': dataChart.responseCode.c403 ++;break;
          case '404': dataChart.responseCode.c404 ++;break;
          case '500': dataChart.responseCode.c500 ++;break;
          case '501': dataChart.responseCode.c501 ++;break;
      };

    });

    // Method Chart

    new Chart(methodChart, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [dataChart.methods.gets, dataChart.methods.posts, dataChart.methods.heads],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(255, 99, 132, 0.2)'      
          ]        
        }],
        labels: [
          'GET',
          'POST',
          'HEAD'
        ]
      }
    });

    // Request Per Minute Chart

    new Chart(requestPerMinuteChart, {
      type: 'line',
      data: [1,2,3,4],
      options: {
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        }
      }
    });

    // Response Code Chart
    new Chart(responseCode, {
      type: 'polarArea',
      data: {
          labels: ['200', '302', '304', '403', '404', '500', '501'],
          datasets: [{
              label: '# Resp Code',
              data: [
                dataChart.responseCode.c200,
                dataChart.responseCode.c302,
                dataChart.responseCode.c304,
                dataChart.responseCode.c403,
                dataChart.responseCode.c404,
                dataChart.responseCode.c500,
                dataChart.responseCode.c501
              ],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(250, 100, 200, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(250, 100, 200, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                      beginAtZero: false
                }
            }]
        }
      }
    });

    // Document Size Chart

    sizes.forEach(function(size, index){

      if(typeof dataChart.sizes[size] !== 'undefined'){
          dataChart.sizes[size] ++;
      }else{
        dataChart.sizes[size] = 0;
      }
    });

    console.log(dataChart.si);
    new Chart(sizeChart, {
      type: 'scatter',
      data: dataChart.sizes,
      options: {
        elements: {
            line: {
                tension: 1 // disables bezier curves
            }
        }
      }
    });

  });
});
