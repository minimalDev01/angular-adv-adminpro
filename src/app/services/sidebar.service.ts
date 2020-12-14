import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }

  constructor() {}
}
