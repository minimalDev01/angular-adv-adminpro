import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value).subscribe(
      () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Saved', 'Changes saved', 'success');
      },
      (err) => {
        console.log(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
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
    this.fileUploadService
      .updatePhoto(this.imageToUpload, 'users', this.user.uid)
      .then((img) => {
        this.user.img = img;
        Swal.fire('Saved', 'User image updated', 'success');
      })
      .catch((err) => {
        console.log(err.error.msg);
        Swal.fire('Error', 'Image cannot be uploaded', 'error');
      });
  }
}
