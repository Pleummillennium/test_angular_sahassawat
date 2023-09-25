import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputDetailComponent } from './input_detail/input-detail/input-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InputDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
