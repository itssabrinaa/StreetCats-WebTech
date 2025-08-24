import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ToastrService } from 'ngx-toastr';

import * as L from 'leaflet';

import { AuthService } from '../_services/auth/auth.service';
import { CatResponse } from '../_services/api-requests/cat-request.type';
import { ApiCatService } from '../_services/api-requests/api-cat.service';
import { ApiCommentService } from '../_services/api-requests/api-comment.service';
import { CommentRequest } from '../_services/api-requests/comment-request.type';

@Component({
  selector: 'app-cat',
  standalone: true,
  imports: [MarkdownModule, FormsModule],
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.scss'
})
export class CatComponent {
  router = inject(Router);
  actRoute = inject(ActivatedRoute);

  toastr = inject(ToastrService);

  authService = inject(AuthService);
  apiCatService = inject(ApiCatService);
  apiCommentService = inject(ApiCommentService);

  cat?: CatResponse['cat'];
  fallbackImg = '/noimage.png';

  map!: L.Map;
  marker!: L.Marker;
  icon = L.icon({iconUrl:"map_marker.png", iconSize:[35,35]});

  isCommenting = false;
  newComment: string = '';

  ngOnInit(){
    const id = Number(this.actRoute.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/map'], {
        queryParams: { nonexistent: '1' }
      });
    }

    this.actRoute.queryParams.subscribe(params => {
      if (params['success']) {
        this.toastr.success(`Hai creato correttamente un nuovo gatto, visualizzalo!`, `Nuovo gatto`);
      }
    });

    this.loadCat(id);
  }
  
  private initMap(lat: number, lon: number): void {
    this.map = L.map('map-catcomponent').setView([lat, lon], 11);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([lat, lon], { icon: this.icon })
          .addTo(this.map);
  }

  private loadCat(id: number){
    this.apiCatService.getCat(id).subscribe({
      next: (res) => {
        this.cat = res.cat;

        this.initMap(this.cat.lat, this.cat.lon);
      },
      error: (err) => {
        this.router.navigate(['/map'], {
          queryParams: { nonexistent: '1' }
        });
      }
    });
  }

  submitComment(){
    if (!this.newComment.trim() || !this.cat) return;

    const payload: CommentRequest = {
      comment: this.newComment.trim(),
      catId: this.cat.id
    };

    this.isCommenting = true;
    this.apiCommentService.createComment(payload)
    .subscribe({
      next: (res) => {
        let new_comment = res.new_comment;
        new_comment.User = { name: this.authService.getName() || new_comment.UserEmail };
        this.cat?.Comments?.unshift(new_comment);
        this.newComment = '';
        this.isCommenting = false;
      },
      error: (err) => {
        this.newComment = '';
        this.isCommenting = false;
        const errorMsg = err.error?.error || 'Errore sconosciuto';
        this.toastr.error(`${errorMsg}`, `Impossibile commentare`);
      }
    });
  }

  transformText(text: string): string{
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImg;
  }

}
