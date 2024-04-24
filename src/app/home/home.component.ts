import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import * as CityData from "../../assets/home.json";
import * as DetailsData from "../../assets/details.json";
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { MapComponent } from "../components/map/map.component";
import { HeaderComponent } from '../components/header/header.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  // add modules here to use in the html file like <app-header>,<mat-icon> etc.
  imports: [MatIconModule, CommonModule, MapComponent, HeaderComponent,RouterModule]
})
export class HomeComponent implements AfterViewInit {
  data: any = DetailsData
  ngAfterViewInit() {

    /**
     * Here we are selecting all of the elements with widget class
     * then looping over all of them to initialize chart for each of them
     * each widget has 2 charts so again looping over them
     */
    var chartDomElements = document.querySelectorAll(".widget");
    chartDomElements.forEach((e, index) => {
      let elems = e.querySelectorAll(".chart");
      elems.forEach(e => {
        //@ts-ignore
        // initialiting charts on the chart element
        var myChart = echarts.init(e);
        var option;

        //@ts-ignore
        console.log(DetailsData.default.filter(e => e.title = "BACKLOG")[0].data[index].data.map(e => e["ai_forecast"]).slice(0,6));

        option = {
          xAxis: {
            type: 'category',
            data: [0,1,2,3,4,5,6,7,8]
          },
          yAxis: {
            type: 'value',
            show: false
          },
          //@ts-ignore
          series:[
            {
              type:'line',
              //@ts-ignore
              data:DetailsData.default.filter(e => e.title = "BACKLOG")[0].data[index].data.map(e => e["ai_forecast"]).slice(0,12)
            },
            {
              type:'line',
              //@ts-ignore
              data:DetailsData.default.filter(e => e.title = "BACKLOG")[0].data[index].data.map(e => e["final_forecast"]).slice(0,12)
            }
          ] 
        };

        // passing the option to the chart to render it.
        option && myChart.setOption(option);
      })
    })
  }
}
