import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFit } from 'src/app/shared/models/fit';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-fits',
  templateUrl: './edit-fits.component.html',
  styleUrls: ['./edit-fits.component.scss']
})
export class EditFitsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  types: IFit[] = [];
  typeForm!:FormGroup;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
      this.types = types;
    });
    this.createForm();
  }

  deleteType(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteFits(id).subscribe(() => {
        this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
          this.types = types;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.typeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.shopService.addFits(this.typeForm.value).subscribe(response => {
      this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
        this.types = types;
      });
    }, error => {
      console.log(error);
    });
  }
}
