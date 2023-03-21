import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-delivery-methods',
  templateUrl: './edit-delivery-methods.component.html',
  styleUrls: ['./edit-delivery-methods.component.scss']
})
export class EditDeliveryMethodsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  types: IDeliveryMethod[] = [];
  typeForm!:FormGroup;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.http.get<IDeliveryMethod>(this.baseUrl +'DeliveryMethod/deliveryMethods').subscribe((types: any) => {
      this.types = types;
    });
    this.createForm();
  }

  deleteType(id: number){
    if (confirm('Are you sure you want to delete this delivery method?')) {
      this.shopService.deleteDeliveryMethods(id).subscribe(() => {
        this.http.get<IDeliveryMethod>(this.baseUrl +'DeliveryMethod/deliveryMethods').subscribe((types: any) => {
          this.types = types;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.typeForm = this.fb.group({
      shortname: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required,Validators.min(0)]],
      deliverytime: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.shopService.addDeliveryMethods(this.typeForm.value).subscribe(response => {
      this.http.get<IDeliveryMethod>(this.baseUrl +'DeliveryMethod/deliveryMethods').subscribe((types: any) => {
        this.types = types;
      });
    }, error => {
      console.log(error);
    });
  }
}
