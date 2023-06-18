import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IName } from 'src/app/shared/models/name';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.scss']
})
export class UpdateColorComponent implements OnInit {

  nameId: number;
  value?: IName;
  nameForm!:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id:number,name: string}, 
  private shopService: ShopService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.nameForm.setValue({
      name: this.data.name
    });
  }

  createForm(){
    this.nameForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit()
  {
    if (this.nameForm.valid) {
      const values = { name: this.nameForm.value.name, id: this.data.id };

    this.shopService.updateColor(values).subscribe(
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
