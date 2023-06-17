import { Component, OnInit } from "@angular/core";


declare const TradingView: any;

@Component({
  selector: "edex-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"]
})
export class ChartsComponent implements OnInit {
 
  constructor(

  ) {}

  ngOnInit() {
    

    this.loadCharts()
    .then(() => this.configureCharts())
  }

  loadCharts() {
    return new Promise(resolve => {
      const scriptElement = document.createElement("script");
      scriptElement.src = "https://s3.tradingview.com/tv.js";
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  configureCharts(){
    new TradingView.MediumWidget(
      {
        "container_id": "tv-medium-widget",
        "symbols": [
          [
            "GBP/USD",
            "FX:GBPUSD|1y"
          ],
          [
            "EUR/USD",
            "FX:EURUSD|1y"
          ],
          [
            "EUR/GBP",
            "FX:EURGBP|1y"
          ]
        ],
        "greyText": "Quotes by",
        "gridLineColor": "#e9e9ea",
        "fontColor": "#83888D",
        "underLineColor": "#ccbc9e",
        "trendLineColor": "#442C2E",
        "width": "100%",
        "height": "350px",
        "locale": "en"
      }
    );
  }

}
