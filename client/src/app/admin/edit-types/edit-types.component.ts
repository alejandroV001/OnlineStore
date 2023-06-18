import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IType } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTypeComponent } from './update-type/update-type.component';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-types',
  templateUrl: './edit-types.component.html',
  styleUrls: ['./edit-types.component.scss']
})
export class EditTypesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  types: IType[] = [];
  typeForm!:FormGroup;
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService,private dialog:MatDialog,private bcService:BreadcrumbService) { }

  ngOnInit(): void {
    this.http.get<IType>(this.baseUrl +'type/types').subscribe((types: any) => {
      this.types = types;
    });
    this.bcService.set('@editTypes', 'Types');
    this.createForm();
  }

  deleteType(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteType(id).subscribe(() => {
        this.http.get<IType>(this.baseUrl +'type/types').subscribe((types: any) => {
          this.types = types;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.typeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    if(this.typeForm.valid)
    {
      this.shopService.addType(this.typeForm.value).subscribe(response => {
        this.http.get<IType>(this.baseUrl +'type/types').subscribe((types: any) => {
          this.types = types;
        });
      }, error => {
        console.log(error);
      });
    }else{
      this.showErrors = true;
    }
    
  }

  updateType(id: number, name: string){
    let dialogRef = this.dialog.open(UpdateTypeComponent, {
      data: {id:id, name: name},
      height: '400px',
      width: '600px',
    });
    // this.router.navigateByUrl("admin/update-name/"+ id);
  }
}
