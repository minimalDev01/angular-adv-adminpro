import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Medic } from 'src/app/models/medic.model';

import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [],
})
export class MedicsComponent implements OnInit, OnDestroy {
  public medics: Medic[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private medicService: MedicService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedics();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe((img) => this.loadMedics());
  }

  loadMedics() {
    this.loading = true;
    this.medicService.loadMedics().subscribe((medics) => {
      this.loading = false;
      this.medics = medics;
    });
  }

  openModal(medic: Medic) {
    this.modalImageService.openModal('medics', medic._id, medic.img);
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadMedics();
    }

    this.searchesService.search('medics', term).subscribe((results) => {
      this.medics = results;
    });
  }

  deleteMedic(medic: Medic) {
    Swal.fire({
      title: 'Delete medic?',
      text: `You are going to delete the user ${medic.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.deleteMedic(medic._id).subscribe((resp) => {
          this.loadMedics();
          Swal.fire(
            'Medic deleted',
            `${medic.name} has been deleted successfully`,
            'success'
          );
        });
      }
    });
  }
}
