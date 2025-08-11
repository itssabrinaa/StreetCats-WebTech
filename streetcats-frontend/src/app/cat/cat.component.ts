import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { CatResponse } from '../_services/api-requests/cat-request.type';
import { ApiCatService } from '../_services/api-requests/api-cat.service';

@Component({
  selector: 'app-cat',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.scss'
})
export class CatComponent {
  router = inject(Router);
  actRoute = inject(ActivatedRoute);
  apiService = inject(ApiCatService);

  cat?: CatResponse['cat'];

  ngOnInit(){
    const id = Number(this.actRoute.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/map'], {
        queryParams: { nonexistent: '1' }
      });
    }

    this.loadCat(id);
  }

  private loadCat(id: number){
    this.apiService.getCat(id).subscribe({
      next: (res) => {
        this.cat = res.cat;
      },
      error: (err) => {
        this.router.navigate(['/map'], {
          queryParams: { nonexistent: '1' }
        });
      }
    });
  }

}
