import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ISize } from 'src/app/shared/models/size';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { UpdateSizesComponent } from './update-sizes/update-sizes.component';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-sizes',
  templateUrl: './edit-sizes.component.html',
  styleUrls: ['./edit-sizes.component.scss']
})
export class EditSizesComponent implements OnInit {

  baseUrl = environment.apiUrl;
  sizes: ISize[] = [];
  sizeForm!:FormGroup;
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService, private router: Router,
    private dialog:MatDialog, private bcService:BreadcrumbService) { }

  ngOnInit(): void {
    this.http.get<ISize>(this.baseUrl +'size/sizes').subscribe((sizes: any) => {
      this.sizes = sizes;
    });
    this.bcService.set('@editSizes', 'Sizes');
    this.createForm();
  }

  deleteSize(id: number){
    if (confirm('Are you sure you want to delete this size?')) {
      this.shopService.deleteSize(id).subscribe(() => {
        this.http.get<ISize>(this.baseUrl +'size/sizes').subscribe((sizes: any) => {
          this.sizes = sizes;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.sizeForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    if (this.sizeForm.valid) {
    this.shopService.addSize(this.sizeForm.value).subscribe(response => {
      this.http.get<ISize>(this.baseUrl +'size/sizes').subscribe((sizes: any) => {
        this.sizes = sizes;
      });
    }, error => {
      console.log(error);
    });
  }else{
    this.showErrors = true;
  }
  }

  updateSize(id: number, name: string){
    let dialogRef = this.dialog.open(UpdateSizesComponent, {
      data: {id:id, name: name},
      height: '400px',
      width: '600px',
    });
  }


}
