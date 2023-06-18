import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFit } from 'src/app/shared/models/fit';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { UpdateFitComponent } from './update-fit/update-fit.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-fits',
  templateUrl: './edit-fits.component.html',
  styleUrls: ['./edit-fits.component.scss']
})
export class EditFitsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  types: IFit[] = [];
  typeForm!:FormGroup;
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService,private bcService:BreadcrumbService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
      this.types = types;
    });

    this.bcService.set('@editFits', 'Fits')
    this.createForm();
  }

  deleteType(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteFits(id).subscribe(() => {
        this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
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
    if (this.typeForm.valid) {
    this.shopService.addFits(this.typeForm.value).subscribe(response => {
      this.http.get<IFit>(this.baseUrl +'fit/fits').subscribe((types: any) => {
        this.types = types;
      });
    }, error => {
      console.log(error);
    });
  }else{
    this.showErrors = true;
  }
  }

  updateFit(id: number, name: string){
    let dialogRef = this.dialog.open(UpdateFitComponent, {
      data: {id:id, name: name},
      height: '400px',
      width: '600px',
    });
    // this.router.navigateByUrl("admin/update-name/"+ id);
  }
}
