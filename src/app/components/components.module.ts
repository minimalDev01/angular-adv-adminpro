import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from './increasing/increasing.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [IncreasingComponent, DonaComponent, ModalImageComponent],
  exports: [IncreasingComponent, DonaComponent, ModalImageComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
