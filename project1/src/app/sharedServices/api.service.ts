import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>("https://localhost:7025/api/Employee/add_employee", data);
  }
  getEmployee() {

    return this.http.get<any>("https://localhost:7025/api/Employee/get_all_employee");
  }
  deleteEmployee(emp_ID: number) {
    return this.http.delete<any>("https://localhost:7025/api/Employee/delete_employee/" + emp_ID);
  }
  updateEmployee(data: any) {
    return this.http.put<any>("https://localhost:7025/api/Employee/update_employee", data);
  }



  signUp(empObj: any) {
    return this.http.post<any>("https://localhost:7025/api/Login/signup", empObj)
  }
  login(empObj: any) {
    return this.http.post<any>("https://localhost:7025/api/Login/login", empObj)
  }
}
