import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'edex-barcharts',
  templateUrl: './barcharts.component.html',
  styleUrls: ['./barcharts.component.scss']
})
export class BarchartsComponent implements OnInit {
  type = 'day';
  constructor() { }

  ngOnInit() {
    this.drawChat(this.getLabels());
  }

  drawChat(data: any = {}) {
    Highcharts.chart('energy-production-chart', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },

      credits: {
        enabled: false,
      },

      plotOptions: {
        column: {
          pointPadding: 0.01,
          borderWidth: 0,
          groupPadding: 0,
          shadow: false
        },
        series: {
          dataLabels: {
            enabled: false,
            format: '{point.name}: {point.y}'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.category}</span>: <b>{point.y}</b>'
      },
      yAxis: {
        title: {
          text: 'Energy (kW h)'
        },
        gridLineColor:'transparent'
      },
      xAxis: {
        categories: data.labels,
      },
      series: [
        {
          type: 'column',
          name: 'Energy Production History',
          color:'#dee1e6',
          data: data.data
        }
      ],
    });
  }

  getLabels() {
    switch(this.type) {
      case 'day': 
        return { labels : [
          '12:00 AM', '02:00 AM', '04:00 AM', '06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', 
          '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '10:00 PM', '12:00 AM'
        ], data: [ 0, 0, 0, 0, 0.5, 0.4, 0.5, 0.6, 0.1, 0.2, 0.7, 1, 0.8 ]}
      case 'week' :
        return { 
            labels : ['1 Dec', '2 Dec', '3 Dec', '4 Dec', '5 Dec', '6 Dec', '7 Dec'],
            data: [ 1, 3, 2, 2.5, 1.7, 3.5, 3 ]
         };

      case 'month' :
        return { 
          labels : ['1 Dec', '4 Dec', '7 Dec', '10 Dec', '13 Dec', '17 Dec', '20 Dec', '23 Dec', '27 Dec', '31 Dec'], 
          data: [1.2, 2, 2.3, 3.3, 2.3, 1.6, 2.5, 3.2, 2.1, 4]
        };
      
      case 'year' :
        return { 
          labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          data: [10, 10.5, 12, 12.4, 9.5, 6.7, 5.6, 8.9, 9.7, 10.2, 11.2, 12 ]
         }
    }
  }

  changeInterval(type) {
    if(this.type != type) { 
      this.type = type; 
      this.drawChat(this.getLabels());
    }
  }

}
