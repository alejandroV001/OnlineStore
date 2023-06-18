import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IDiscount } from 'src/app/shared/models/discount';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UpdateDiscountComponent } from './update-discount/update-discount.component';

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
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,private activateRoute: ActivatedRoute,
    private shopService: ShopService, private dialog: MatDialog,
    private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    var id = +this.activateRoute.snapshot.paramMap.get('id')!;
    this.loadProduct(id);
    this.http.get<IDiscount>(this.baseUrl +'Discount/'+ id).subscribe((discounts: any) => {
      this.discountsProduct = discounts;
    });
    this.http.get<IDiscount>(this.baseUrl +'Discount/getDiscounts', {responseType: 'json'}).subscribe((discounts: any) => {
      this.discounts = discounts;
    });
    this.createForm();
  }

  createForm(){
    this.discountForm = this.fb.group({
      productid:[+this.activateRoute.snapshot.paramMap.get('id')!],
      value: [0, [Validators.required,Validators.min(0)]],
      discount: [],
      discountId: [],
      startingDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  deleteDiscount(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteProductDiscount(id).subscribe(() => {
        this.http.get<IDiscount>(this.baseUrl +'Discount/'+ id).subscribe((discounts: any) => {
          this.discountsProduct = discounts;
        });
      }, error => {
        console.log(error);
      });
  }
}
  onSubmit(){
    if(this.discountForm.get('discount')!.value == null)
      this.showErrors = true;
    if(this.discountForm.valid){
      var id = +this.activateRoute.snapshot.paramMap.get('id')!;
      this.shopService.addDiscountForProduct(this.discountForm.value).subscribe(response => {
        this.http.get<IDiscount>(this.baseUrl +'Discount/'+ id).subscribe((discounts: any) => {
          this.discountsProduct = discounts;
        });
      }, error => {
        console.log(error);
      });
    }
    else
      this.showErrors = true;
    
  }

  selectDiscount(id: number)
  {
    this.discountForm.controls['discountId'].setValue(id);
  }

  loadProduct(id: number) {
    this.shopService.getProduct(id).subscribe(product => {
      this.bcService.set('@addDiscount', product.productName)
    }, error => {
      console.log(error);
    });
  }

  updateDiscount(discount: IDiscount){
    let dialogRef = this.dialog.open(UpdateDiscountComponent, {
      data: {discount},
      height: '400px',
      width: '600px',
    });
  }
}
