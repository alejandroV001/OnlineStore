import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICupon } from 'src/app/shared/models/cupon';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { IName } from 'src/app/shared/models/name';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.scss']
})
export class UpdateDeliveryComponent implements OnInit {

  nameId: number;
  value?: IName;
  nameForm!:FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {delivery: IDeliveryMethod}, 
  private shopService: ShopService,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.createForm();
  
    this.nameForm.setValue({
      shortname: this.data.delivery.shortName,
      deliverytime: this.data.delivery.deliveryTime,
      description: this.data.delivery.description,
      price: this.data.delivery.price,
    });
  }
  createForm(){
    this.nameForm = this.fb.group({
      shortname: [null, [Validators.required]],
      deliverytime: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]]
    });
  }

  onSubmit()
  {
    if (this.nameForm.valid) {
      const values = { shortname: this.nameForm.value.shortname, 
        deliverytime:this.nameForm.value.deliverytime,
         id: this.data.delivery.id, 
        description: this.nameForm.value.description ,
        price: this.nameForm.value.price};
        
      this.shopService.updateDeliveryMethods(values).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
