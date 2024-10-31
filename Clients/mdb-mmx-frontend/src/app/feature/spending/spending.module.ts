import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpendingComponent } from './components/spending/spending.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    SpendingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path:'spending', component:SpendingComponent},
    ])
  ],
  providers: [provideHttpClient()]
})
export class SpendingModule { }
