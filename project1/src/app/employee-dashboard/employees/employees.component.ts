import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl, Validators } from '@angular/forms'
import { Observable, subscribeOn, Subscription } from 'rxjs';

import { ApiService } from 'src/app/sharedServices/api.service';
import { EmployeeModel } from 'src/app/sharedServices/model/employee.model';




@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  formValue !: FormGroup; 
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdated !: boolean;


  constructor(private formbuilder: FormBuilder, private api: ApiService) { }
  display = "none";
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Emp_ID: ['', Validators.required],
      Name: ['', Validators.required],
      Team: ['', Validators.required],
      Designation: ['', Validators.required],
      JoiningDate: ['', Validators.required]
    })

    this.getTheEmployee();
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdated = false;
  }
  postTheEmployee() {
    // console.log(this.formValue.value)

    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Team = this.formValue.value.Team;
    this.employeeModelObj.Designation = this.formValue.value.Designation;
    this.employeeModelObj.JoiningDate = this.formValue.value.JoiningDate;


    this.api.postEmployee(this.employeeModelObj)
      .subscribe({
        next: (res) => {
          alert("Employee Added Successfully !")
          this.formValue.reset();
          let ref = document.getElementById('cancel')
          ref?.click()
          this.getTheEmployee();
        },
        error: () => {
          alert("Something Went Wrong")
        }
      })

  }


  getTheEmployee() {

    this.api.getEmployee().subscribe({
      next: res => {
        this.employeeData = res.employeeDetails;
        //console.log(this.employeeData)
      }
    })
  }

  deleteTheEmployee(Emp_ID: number) {
    this.api.deleteEmployee(Emp_ID).subscribe({
      next: (res) => {
        //console.log(Emp_ID)
        alert("Employee Deleted Successfully");
        this.getTheEmployee();
      },
      error: () => {
        alert("Something Went Wrong");
      }
    })
  }

  edit(row: any) {
    this.showAdd = false;
    this.showUpdated = true;
    console.log(row)
    this.employeeModelObj.Emp_ID = row.Emp_ID;
    this.formValue.controls['Emp_ID'].setValue(row.emp_ID);
    this.formValue.controls['Name'].setValue(row.name);
    this.formValue.controls['Team'].setValue(row.team);
    this.formValue.controls['Designation'].setValue(row.designation);
    this.formValue.controls['JoiningDate'].setValue(row.joiningDate);

  }
  updateTheEmployee() {
    this.employeeModelObj.Name = this.formValue.value.Name;
    this.employeeModelObj.Team = this.formValue.value.Team;
    this.employeeModelObj.Designation = this.formValue.value.Designation;
    this.employeeModelObj.JoiningDate = this.formValue.value.JoiningDate;
    this.api.updateEmployee(this.employeeModelObj)
      .subscribe({
        next: (res) => {
          alert("Employee Updated Successfully !!!")
          this.formValue.reset();
          let ref = document.getElementById('cancel')
          ref?.click()
          this.getTheEmployee();
        },
        error: () => {
          alert("Something Went Wrong")
        }
      })
  }

}
