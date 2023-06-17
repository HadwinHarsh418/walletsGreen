import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MerchantDetailService } from '@modules/super-admin/services/merchant-detail.service';
import { MessengerService } from '@modules/messenger/messenger.service';

@Component({
  selector: 'edex-merchant-summary',
  templateUrl: './merchant-summary.component.html',
  styleUrls: ['./merchant-summary.component.scss']
})
export class MerchantSummaryComponent implements OnInit {
  constructor(
    private merchantDetailApiService: MerchantDetailService,
    private msgr: MessengerService
  ) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.merchantDetailApiService.getMerchantStatistics().subscribe(
      (res) => {
        this.drawChat(res);
      },
      (err) => {
        this.msgr.error(err.message || 'Failed to get merchant statistics data.');
      }
    );
  }

  drawChat(data: any = {}) {
    Highcharts.chart('summaryChart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: ''
      },

      credits: {
        enabled: false,
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y}'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>'
      },

      series: [
        {
          type: 'pie',
          name: 'Merchant Summary',
          colorByPoint: true,
          data: [
            {
              name: 'Web applications',
              y: data['web'] || 0,
              color: '#595959'
            },
            {
              name: 'Information upload stage',
              y: data['upload'] || 0,
              color: '#0000ff'
            },
            {
              name: 'Being assessed',
              y: data['assessed'] || 0,
              color: '#ffbf00'
            },
            {
              name: 'Approved',
              y: data['approved'] || 0,
              color: '#047804'
            },
            {
              name: 'Website/POS integration Stage',
              y: data['integration'] || 0,
              color: '#800080'
            },
            {
              name: 'Live and Processing',
              y: data['processing'] || 0,
              color: '#000000'
            }
          ]
        }
      ],
    });
  }

}
