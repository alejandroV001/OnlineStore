import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  typeForm:FormGroup;


  constructor(private fb: FormBuilder,
    private shopService:ShopService, private router: Router) { }

  ngOnInit(): void {
    this.createTypeForm();
  }


  createTypeForm(){
    this.typeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    var formVal = this.typeForm.value;

    console.log(formVal);

    this.shopService.addProduct(this.typeForm.value).subscribe(response => {
      this.router.navigateByUrl('/product-management');
    }, error => {
      console.log(error);
    });
  }
}
