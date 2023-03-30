import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shared/models/discount';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {
  
  baseUrl = environment.apiUrl;
  discountsProduct: IDiscount[] = [];
  discountForm!:FormGroup;
  discounts: IDiscount[] = [];

  constructor(private http:HttpClient, private fb: FormBuilder,private activateRoute: ActivatedRoute,
    private shopService: ShopService) { }

  ngOnInit(): void {
    var id = +this.activateRoute.snapshot.paramMap.get('id')!;
    this.http.get<IDiscount>(this.baseUrl +'Discount/'+ id).subscribe((discounts: any) => {
      this.discountsProduct = discounts;
    });
    this.http.get<IDiscount>(this.baseUrl +'Discount/discounts', {responseType: 'json'}).subscribe((discounts: any) => {
      this.discounts = discounts;
      console.log(discounts);
    });
    this.createForm();
  }

  createForm(){
    this.discountForm = this.fb.group({
      value: [0, [Validators.required,Validators.min(0)]],
      discount: [],
      discountId: [],
      staringDate: [],
      endDate: []
    });
  }

  deleteDiscount(id: number){
    // if (confirm('Are you sure you want to delete this type?')) {
    //   this.shopService.deleteBrand(id).subscribe(() => {
    //     this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
    //       this.brands = brands;
    //     });
    //   }, error => {
    //     console.log(error);
    //   });
  }
  onSubmit(){
    // this.shopService.addBrand(this.brandForm.value).subscribe(response => {
    //   this.http.get<IBrand>(this.baseUrl +'brand/brands').subscribe((brands: any) => {
    //     this.brands = brands;
    //   });
    // }, error => {
    //   console.log(error);
    // });
  }

  selectDiscount(id: number)
  {

  }
}
