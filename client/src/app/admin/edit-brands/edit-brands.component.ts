import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.scss']
})
export class EditBrandsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  brands: IBrand[] = [];
  brandForm!:FormGroup;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
      this.brands = brands;
    });
    this.createForm();
  }

  deleteBrand(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteBrand(id).subscribe(() => {
        this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
          this.brands = brands;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.brandForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.shopService.addBrand(this.brandForm.value).subscribe(response => {
      this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
        this.brands = brands;
      });
    }, error => {
      console.log(error);
    });
  }
}
