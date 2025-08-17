import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';

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
  actRoute = inject(ActivatedRoute);
  toastr = inject(ToastrService);
  apiService = inject(ApiCatService);

  map!: L.Map;
  cats: CatSummary[] = [];
  icon = L.icon({iconUrl:"map_marker.png", iconSize:[35,35]});

  ngOnInit(){
    this.actRoute.queryParams.subscribe(params => {
      if (params['nonexistent']) {
        this.toastr.warning(`Ops... Hai cercato un gatto che non esiste, riprova.`, `Nessun gatto`);
      }
    });

    this.initMap();
    this.loadCats();

    window.addEventListener('navigateToCat', (e: any) => {
      const catId = e.detail;
      this.router.navigate(['/cats', catId]);
    });
  }

  private initMap(): void {
    this.map = L.map('map-mapcomponent').setView([40.828925120307915, 14.19045339605781], 10);

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
        <strong style="word-wrap: break-word; white-space: pre-wrap;">${cat.title}</strong><br/>
        <p>${cat.User?.name} - <small>${new Date(cat.createdAt).toLocaleDateString()}</small></p>
        <button 
          class="btn btn-primary text-white btn-sm"
          onclick="window.dispatchEvent(new CustomEvent('navigateToCat', { detail: ${cat.id} }))">
          Dettagli
        </button>
      </div>
    `;
  }
  
}