import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDiscount } from 'src/app/shared/models/discount';
import { IName } from 'src/app/shared/models/name';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-discount',
  templateUrl: './update-discount.component.html',
  styleUrls: ['./update-discount.component.scss']
})
export class UpdateDiscountComponent implements OnInit {
  baseUrl = environment.apiUrl;

  nameId: number;
  value?: IName;
  nameForm!:FormGroup;
  discounts: IDiscount[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: {discount: IDiscount}, 
  private shopService: ShopService,private http:HttpClient,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.http.get<IDiscount>(this.baseUrl +'Discount/getDiscounts', {responseType: 'json'}).subscribe((discounts: any) => {
      this.discounts = discounts;
    });
    
    this.createForm();
    const startingDate = new Date(this.data.discount.startingDate);
    const endDate = new Date(this.data.discount.endDate);
    const formattedStartingDate = this.formatDate(startingDate);
    const formattedEndDate = this.formatDate(endDate);
    console.log(this.data.discount);
  
    this.nameForm.setValue({
      startingDate: formattedStartingDate,
      endDate: formattedEndDate,
      discount: this.data.discount.discountId,
      discountId: this.data.discount.discountId
    });
  }

  createForm(){
    this.nameForm = this.fb.group({
      discount: [0, [Validators.required]],
      discountId: [],
      startingDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  onSubmit()
  {
    if (this.nameForm.valid) {
      const values = { DiscountId: this.nameForm.value.discountId, 
        productId:this.data.discount.productId, 
        id: this.data.discount.id,
        startingDate: this.nameForm.value.startingDate ,
        endDate: this.nameForm.value.endDate};
      this.shopService.updateDiscount(values).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }

   
  }
  
  selectDiscount(id: number)
  {
    this.nameForm.controls['discountId'].setValue(id);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
