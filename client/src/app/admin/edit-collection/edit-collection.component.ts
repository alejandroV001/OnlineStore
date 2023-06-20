import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICollection } from 'src/app/shared/models/collection';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { UpdateColectionComponent } from './update-colection/update-colection.component';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {
  baseUrl = environment.apiUrl;
  collections: ICollection[] = [];
  collectionForm!:FormGroup;
  showErrors: boolean = false;
  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService,private bcService:BreadcrumbService,
     private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get<ICollection>(this.baseUrl +'collection/collections').subscribe((collections: any) => {
      this.collections = collections;
    });
    this.bcService.set('@editCollection', 'Collections')
    this.createForm();
  }

  deleteCollection(id: number){
    if (confirm('Are you sure you want to delete this collection?')) {
      this.shopService.deleteCollection(id).subscribe(() => {
        this.http.get<ICollection>(this.baseUrl +'collection/collections').subscribe((collections: any) => {
          this.collections = collections;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.collectionForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    if(this.collectionForm.valid)
    {
      this.shopService.addCollection(this.collectionForm.value).subscribe(response => {
        this.http.get<ICollection>(this.baseUrl +'collection/collections').subscribe((collections: any) => {
          this.collections = collections;
        });
      }, error => {
        console.log(error);
      });
    }
    else
      this.showErrors = true;
    
  }

  updateCollection(id: number, name: string){
    let dialogRef = this.dialog.open(UpdateColectionComponent, {
      data: {id:id, name: name},
      height: '400px',
      width: '600px',
    });
  }
  

}
