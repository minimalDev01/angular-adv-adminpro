import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { User } from 'src/app/models/user.model';

import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globallySearch(term);
    });
  }

  globallySearch(term: string) {
    this.searchesService.globallySearch(term).subscribe((resp: any) => {
      this.users = resp.users;
      this.medics = resp.medics;
      this.hospitals = resp.hospitals;
    });
  }

  openMedic(medic: Medic) {}
}
