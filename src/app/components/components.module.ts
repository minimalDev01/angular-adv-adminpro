import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IncreasingComponent } from './increasing/increasing.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [IncreasingComponent, DonaComponent],
  exports: [IncreasingComponent, DonaComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
