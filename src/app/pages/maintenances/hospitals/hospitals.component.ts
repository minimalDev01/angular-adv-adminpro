import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe((img) => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;
    this.hospitalService.loadHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService
      .updateHospital(hospital._id, hospital.name)
      .subscribe((resp) => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id).subscribe((resp) => {
      this.loadHospitals();
      Swal.fire('Deleted', hospital.name, 'success');
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create hospital',
      text: 'Enter new hospital name',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe((resp: any) => {
        this.hospitals.push(resp.hospital);
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.openModal('hospitals', hospital._id, hospital.img);
  }

  search(term: string) {
    if (term.length === 0) {
      return this.loadHospitals();
    }

    this.searchesService.search('hospitals', term).subscribe((results) => {
      this.hospitals = results;
    });
  }
}
