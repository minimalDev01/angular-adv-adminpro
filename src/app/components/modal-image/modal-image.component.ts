import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imageToUpload: File;
  public imgTemp: any = null;

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .updatePhoto(this.imageToUpload, type, id)
      .then((img) => {
        Swal.fire('Saved', 'User image updated', 'success');

        this.modalImageService.newImage.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        console.log(err.error.msg);
        Swal.fire('Error', 'Image cannot be uploaded', 'error');
      });
  }
}
