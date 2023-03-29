import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IName } from 'src/app/shared/models/name';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss']
})
export class EditNameComponent implements OnInit {

  baseUrl = environment.apiUrl;
  names: IName[] = [];
  nameForm!:FormGroup;
  
  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
      this.names = names;
    });
    this.createForm();
  }

  deleteName(id: number){
    if (confirm('Are you sure you want to delete this name?')) {
      this.shopService.deleteName(id).subscribe(() => {
        this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
          this.names = names;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.nameForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.shopService.addName(this.nameForm.value).subscribe(response => {
      this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
        this.names = names;
      });
    }, error => {
      console.log(error);
    });
  }

}
