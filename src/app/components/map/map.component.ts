import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  //@ts-ignore
  private map: L.Map;

  /**
   * Function to initiate the map
   */
  private initMap(): void {
    // creating a map in elemnt with map id
    this.map = L.map('map', {
      center: [20.59, 78.96],
      zoom: 1,
      zoomControl: false,
      zoomAnimation: true,
    });

    // creating map tile layer using tileLayer method
    var tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

    });
    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    // });

    // adding the tile to the map
    tiles.addTo(this.map);

    // creating circle marker for cities
    let circle1 = L.circleMarker([12.97, 77.59]);

    // adding markup to the popup of the markup
    circle1.bindPopup(`<div class='flex flex-col gap-2'>
    <p class='!m-0 font-bold'>Bengaluru</p>
    <p class='!m-0'>lat : 12.97</p>
    <p class='!m-0'>long : 77.59</p>
    </div>`);

    // adding the circle marker to the map
    circle1.addTo(this.map);

    let circle2 = L.circleMarker([28.70, 77.10]);
    circle2.bindPopup(`<div class='flex flex-col gap-2'>
    <p class='!m-0 font-bold'>Delhi</p>
    <p class='!m-0'>lat : 28.70</p>
    <p class='!m-0'>long : 77.10</p>
    </div>`);
    circle2.addTo(this.map);
  }


  // lifecycle hook to call methods after view is initiated
  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      this.map.flyTo([35.59, 88.96], 4, {
        animate: true,
        duration: 0.75,
        easeLinearity: 0.1
      })
    }, 1000)
  }
}
