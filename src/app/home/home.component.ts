import { Component, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import * as CityData from "../../assets/home.json";
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { MapComponent } from "../components/map/map.component";
import { HeaderComponent } from '../components/header/header.component';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    // add modules here to use in the html file like <app-header>,<mat-icon> etc.
    imports: [MatIconModule, CommonModule, MapComponent,HeaderComponent]
})
export class HomeComponent {
  data: any = CityData
  ngAfterViewInit() {

    /**
     * Here we are selecting all of the elements with widget class
     * then looping over all of them to initialize chart for each of them
     * each widget has 2 charts so again looping over them
     */
    var chartDomElements =document.querySelectorAll(".widget");
    chartDomElements.forEach((e,index) => {
      let elems = e.querySelectorAll(".chart");
      elems.forEach(e => {
        //@ts-ignore
        // initialiting charts on the chart element
      var myChart = echarts.init(e);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          show: false
        },
        //@ts-ignore
        series:CityData.default[index].data
      };

      // passing the option to the chart to render it.
      option && myChart.setOption(option);
    })
    })
  }
}
