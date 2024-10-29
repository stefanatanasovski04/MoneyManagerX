import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';



@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    MdbCollapseModule
  ],
  exports: [
    NavBarComponent
  ]
})
export class SharedModule { }
