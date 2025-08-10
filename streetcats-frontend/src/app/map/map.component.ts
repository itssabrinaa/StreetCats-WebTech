import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';

import { ApiCatService } from '../_services/api-requests/api-cat.service';
import { CatSummary } from '../_services/api-requests/cat-request.type';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  router = inject(Router);
  apiService = inject(ApiCatService);

  map!: L.Map;
  cats: CatSummary[] = [];
  icon = L.icon({iconUrl:"map_marker.png", iconSize:[35,35]});

  ngOnInit(){
    this.initMap();
    this.loadCats();

    window.addEventListener('navigateToCat', (e: any) => {
      const catId = e.detail;
      this.router.navigate(['/cats', catId]);
    });
  }

  private initMap(): void {
    this.map = L.map('map').setView([40.828925120307915, 14.19045339605781], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  private loadCats(){
    this.apiService.getCats().subscribe({
      next: (res) => {
        this.cats = res.cats;
        this.addMarkers();
      },
      error: (err) => {
        console.error('Errore caricando i gatti', err);
      }
    });
  }

  private addMarkers(){
    this.cats.forEach(cat => {
      L.marker([cat.lat, cat.lon], { icon: this.icon })
        .addTo(this.map)
        .bindPopup(this.createPopupContent(cat));
    });
  }

  private createPopupContent(cat: CatSummary): string {
    return `
      <div style="text-align:center; width:150px;">
        <strong>${cat.title}</strong><br/>
        <small>${new Date(cat.createdAt).toLocaleDateString()}</small><br/>
        <button 
          class="btn btn-primary text-white btn-sm"
          onclick="window.dispatchEvent(new CustomEvent('navigateToCat', { detail: ${cat.id} }))">
          Dettagli
        </button>
      </div>
    `;
  }
  
}