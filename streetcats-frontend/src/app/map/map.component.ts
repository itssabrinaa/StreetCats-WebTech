import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.8522, 14.2681], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    let icon = L.icon({iconUrl:"map_marker.png", iconSize:[35,35]})

    L.marker([40.8522, 14.2681],{icon:icon}).addTo(this.map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
  }
}