import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { SearchesService } from 'src/app/services/searches.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public imgSubs: Subscription;
  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchesService: SearchesService,
    private modalImageService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe(delay(1000))
      .subscribe((img) => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.loadUsers(this.from).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }

    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searchesService.search('users', term).subscribe((results) => {
      this.users = results;
    });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'You cannot delete yourself', 'error');
    }

    Swal.fire({
      title: 'Delete user?',
      text: `You are going to delete the user ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {
          this.loadUsers();
          Swal.fire(
            'User deleted',
            `${user.name} has been deleted successfully`,
            'success'
          );
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.saveUser(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid, user.img);
  }
}
