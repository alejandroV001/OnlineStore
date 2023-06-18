import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICupon } from 'src/app/shared/models/cupon';
import { IName } from 'src/app/shared/models/name';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.scss']
})
export class UpdateCuponComponent implements OnInit {

  nameId: number;
  value?: IName;
  nameForm!:FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {cupon: ICupon}, 
  private shopService: ShopService,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.createForm();
    const startingDate = new Date(this.data.cupon.startingDate);
    const endDate = new Date(this.data.cupon.endDate);
    const formattedStartingDate = this.formatDate(startingDate);
    const formattedEndDate = this.formatDate(endDate);
  
    this.nameForm.setValue({
      name: this.data.cupon.cuponName,
      value: this.data.cupon.value,
      startingDate: formattedStartingDate,
      endDate: formattedEndDate
    });
  }
  createForm(){
    this.nameForm = this.fb.group({
      name: [null, [Validators.required]],
      value: [null, [Validators.required]],
      startingDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  onSubmit()
  {
    if (this.nameForm.valid) {
      const values = { cuponName: this.nameForm.value.name, value:this.nameForm.value.value, id: this.data.cupon.id, startingDate: this.nameForm.value.startingDate ,endDate: this.nameForm.value.endDate};
      this.shopService.updateCupon(values).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
    }

   
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
