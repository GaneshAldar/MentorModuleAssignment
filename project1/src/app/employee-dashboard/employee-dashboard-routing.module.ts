import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Guards/auth.guard';
import {EmployeesComponent} from './employees/employees.component';

const routes: Routes = [
  {
    path:'Employee-Dashboard',children:[
      { path: "Employees", component: EmployeesComponent }
    ],canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDashboardRoutingModule { }
