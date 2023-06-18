import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICupon } from 'src/app/shared/models/cupon';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UpdateCuponComponent } from './update-cupon/update-cupon.component';

@Component({
  selector: 'app-edit-cupon',
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.scss']
})
export class EditCuponComponent implements OnInit {
  
  baseUrl = environment.apiUrl;
  cupons: ICupon[] = [];
  discountForm!:FormGroup;
  discounts: ICupon[] = [];
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,private activateRoute: ActivatedRoute,
    private shopService: ShopService,private dialog:MatDialog, 
    private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    this.http.get<ICupon>(this.baseUrl +'Cupon/getCupons').subscribe((cupons: any) => {
      this.cupons = cupons;
    });

    this.bcService.set('@editCupons', 'Cupons')
    this.createForm();
  }

  createForm(){
    this.discountForm = this.fb.group({
      cuponName: [null, [Validators.required]],
      value: [0, [Validators.required,Validators.min(0)]],
      startingDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  deleteCupon(id: number){
    if (confirm('Are you sure you want to delete this cupon?')) {
      this.shopService.deleteCupon(id).subscribe(() => {
        this.http.get<ICupon>(this.baseUrl +'Cupon/getCupons').subscribe((cupons: any) => {
          this.cupons = cupons;
        });
      }, error => {
        console.log(error);
      });
  }
}
  onSubmit(){
    if (this.discountForm.valid) {
    this.shopService.addCupon(this.discountForm.value).subscribe(response => {
      this.http.get<ICupon>(this.baseUrl +'Cupon/getCupons').subscribe((cupons: any) => {
        this.cupons = cupons;
      });
    }, error => {
      console.log(error);
    });
  }
  else{
    this.showErrors = true;
  }
  }

  updateCupon(cupon: ICupon){
    let dialogRef = this.dialog.open(UpdateCuponComponent, {
      data: {cupon},
      height: '400px',
      width: '600px',
    });
  }
}
