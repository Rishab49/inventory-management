import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as DetailsData from "../../assets/details.json";
import * as echarts from 'echarts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  // add components here to use in the html template
  imports: [HeaderComponent, MatIconModule, ToggleComponent, TabsComponent, RouterModule, CommonModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  data: any;
  showAiForecast: boolean = true;
  showFinalForecast: boolean = true;
  showActualConsumption: boolean = true;
  aiForecastData: number[] = [];
  finalForecastData: number[] = [];
  actualConsumption: number[] = [];
  tableHeaders: string[] = [];
  routeID: string = "";
  type: string = "";
  constructor(private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit() {
    //@ts-ignore
    this.data = DetailsData.default;
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.routeID = params.get("id") ?? "";
      this.type = params.get("type") ?? "";
      console.log(this.routeID, this.type);
      this.makeChart();
    })
  }

  toggleAiForecast() {
    this.showAiForecast = !this.showAiForecast;
    this.makeChart();
  }

  toggleFinalForecast() {
    this.showFinalForecast = !this.showFinalForecast;
    this.makeChart();
  }

  toggleSidePanel() {
    let elem = document.querySelector(".side-panel") as HTMLElement;
    if (elem.classList.contains("open")) {
      elem.style.maxWidth = "0px";
      elem.classList.remove("open");
      elem.classList.add("closed");
    } else {
      elem.style.maxWidth = "";
      elem.classList.remove("closed");
      elem.classList.add("open");
    }
    this.makeChart();
  }

  makeChart() {
    var chartDomElement = document.querySelector(".graph");
    if (chartDomElement) {
      //@ts-ignore
      var myChart = echarts.init(chartDomElement);
      //@ts-ignore
      console.log(DetailsData.default.filter(e => e.title == this.type));
      //@ts-ignore
      this.aiForecastData = DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["ai_forecast"]).slice(0, 12);
      //@ts-ignore
      this.finalForecastData = DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["final_forecast"]).slice(0, 12);;
      //@ts-ignore
      this.actualConsumption = DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["actual_consumption"]).slice(0, 12);;
      //@ts-ignore
      this.tableHeaders = DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map((d: { [x: string]: any; }) => `${d["year"]} Q${d['quarter']}`).slice(0, 12);
      var option;
      option = {
        xAxis: {
          type: 'category',
          data: ['Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          containLabel: true
        },
        legend: {
          data: ['ai forecast', 'final forecast', 'actual consumption', 'ai forecast(expected)', 'final forecast(expected)', 'prev quarter final'],
          textStyle: {
            color: "white"
          }
        },
        series: [{
          name: "ai forecast",
          type: 'line',
          //@ts-ignore
          data: this.showAiForecast ? this.aiForecastData : []
        },
        {
          name: "final forecast",
          type: 'line',
          //@ts-ignore
          data: this.showFinalForecast ? this.finalForecastData : []
        },
        {
          name: "actual consumption",
          type: 'line',
          //@ts-ignore
          data: this.showActualConsumption ? this.actualConsumption : []
        },
        {
          name: 'ai forecast(expected)',
          type: 'line',
          lineStyle: {
            type: 'dashed'
          },
          //@ts-ignore
          data: this.showAiForecast ? [...(new Array(12).fill(null)), ...DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["ai_forecast"]).slice(12, 15)] : []
        },
        {
          name: 'final forecast(expected)',
          type: 'line',
          lineStyle: {
            type: 'dashed'
          },
          //@ts-ignore
          data: this.showFinalForecast ? [...(new Array(12).fill(null)), ...DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["final_forecast"]).slice(12, 15)] : []
        },
        {
          name: 'prev quarter final',
          type: 'line',
          lineStyle: {
            type: 'dashed'
          },
          //@ts-ignore
          data: this.showActualConsumption ? [...(new Array(12).fill(null)), ...DetailsData.default.filter(e => e.title == this.type)[0].data.filter(e => e.id == this.routeID)[0].data.map(d => d["actual_consumption"]).slice(12, 15)] : []
        }
        ]
      };
      console.log(option);

      // passing the option to the chart to render it.
      option && myChart.setOption(option);
    }


  }
}
