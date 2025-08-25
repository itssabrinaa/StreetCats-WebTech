import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import 'highlight.js/styles/github.css';
import 'ace-builds/src-min/ace';
import 'ace-builds/src-min/mode-markdown';
import 'ace-builds/src-min/theme-github';
import { MarkdownModule } from 'ngx-markdown';
import { LMarkdownEditorModule, MdEditorOption } from 'ngx-markdown-editor';
import * as marked from 'marked';
// @ts-ignore
window.marked = marked;

import * as L from 'leaflet';

import { ApiCatService } from '../_services/api-requests/api-cat.service';

@Component({
  selector: 'app-new-cat',
  standalone: true,
  imports: [MarkdownModule, LMarkdownEditorModule, FormsModule],
  templateUrl: './new-cat.component.html',
  styleUrl: './new-cat.component.scss'
})
export class NewCatComponent {
  apiService = inject(ApiCatService);
  toastr = inject(ToastrService);
  router = inject(Router);

  map!: L.Map;
  marker!: L.Marker;
  icon = L.icon({iconUrl:"map_marker.png", iconSize:[35,35]});

  options: MdEditorOption = {
    showPreviewPanel: false,
    resizable: false,
    hideIcons: ['Image', 'TogglePreview', 'FullScreen', 'Code', 'Reference'],
    fontAwesomeVersion: '4'
  };
  public mode: string = "editor";

  title = '';
  desc = '';
  lat!: number;
  lon!: number;
  imgFile?: File;

  ngOnInit(){
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map-newcatcomponent').setView([40.828925120307915, 14.19045339605781], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.lat = e.latlng.lat;
      this.lon = e.latlng.lng;

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng, { icon: this.icon }).addTo(this.map);
      }
    });
  }

  onFileSelected(event: any) {
    this.imgFile = event.target.files[0];
  }

  buttonDisabled(){
    return !this.title || !this.desc || !this.lat || !this.lon || !this.imgFile;
  }

  submitCat(){
    if(!this.buttonDisabled()){
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('desc', this.desc);
      formData.append('lat', this.lat.toString());
      formData.append('lon', this.lon.toString());
      formData.append('img', this.imgFile!);

      this.apiService.createCat(formData).subscribe({
        next: (res) => {
          this.router.navigate(['/cats', res.new_cat.id], {
              queryParams: { success: '1' }
            });
        },
        error: (err) => {
          console.error(err);
          const errorMsg = err.error?.error || 'Errore sconosciuto';
          this.toastr.error(`${errorMsg}`, `Impossibile pubblicare l'avvistamento.`);
        }
      });
    }
  }


}
