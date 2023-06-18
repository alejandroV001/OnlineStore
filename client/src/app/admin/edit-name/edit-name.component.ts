import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IName } from 'src/app/shared/models/name';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UpdateNameComponent } from './update-name/update-name.component';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.scss']
})
export class EditNameComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm!: ElementRef;

  baseUrl = environment.apiUrl;
  names: IName[] = [];
  nameForm!:FormGroup;
  shopParams!: ShopParams;
  totalCount: number=0;
  showErrors: boolean = false;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService, private router: Router, 
    private dialog:MatDialog, private bcService: BreadcrumbService) {
      this.shopParams = this.shopService.getShopParams();
     }

  ngOnInit(): void {
    this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
      this.names = names;
      this.totalCount = names.length;
        if (this.shopParams.pageNumber === 1) {
          this.names = names.slice(0, 30);
        } else if (this.shopParams.pageNumber > 1) {
          const startIndex = (this.shopParams.pageNumber - 1) * 30;
          const endIndex = startIndex + 30;
          this.names = names.slice(startIndex, endIndex);
        }
        }
    );
    this.bcService.set('@editNameProducts', 'Names')
    console.log(this.totalCount);
    this.createForm();
  }

  deleteName(id: number){
    if (confirm('Are you sure you want to delete this name?')) {
      this.shopService.deleteName(id).subscribe(() => {
        this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
          this.names = names;
        });
      }, error => {
        console.log(error);
      });
  }
}

updateName(id: number, name: string){
  let dialogRef = this.dialog.open(UpdateNameComponent, {
    data: {id:id, name: name},
    height: '400px',
    width: '600px',
  });
}

  createForm(){
    this.nameForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    if(this.nameForm.valid)
    {
      this.shopService.addName(this.nameForm.value).subscribe(response => {
        this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
          this.names = names;
        });
      });
    }
    else
      this.showErrors = true;
   
  }

  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();

    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
        this.names = names;
        this.totalCount = names.length;
        if (this.shopParams.pageNumber === 1) {
          this.names = names.slice(0, 30);
        } else if (this.shopParams.pageNumber > 1) {
          const startIndex = (this.shopParams.pageNumber - 1) * 30;
          const endIndex = startIndex + 30;
          this.names = names.slice(startIndex, endIndex);
        }
        
      });
    } 
  }

  onSearch() {
    var searchName = this.searchTerm.nativeElement.value.toLowerCase();
    this.names = this.names.filter(o => o.name.toLowerCase().includes(searchName.toLowerCase()));

    this.totalCount = this.names.length;
        if (this.shopParams.pageNumber === 1) {
          this.names = this.names.slice(0, 30);
        } else if (this.shopParams.pageNumber > 1) {
          const startIndex = (this.shopParams.pageNumber - 1) * 30;
          const endIndex = startIndex + 30;
          this.names = this.names.slice(startIndex, endIndex);
        }
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopParams.pageNumber = 1;
    this.shopService.setShopParams(this.shopParams);
    this.http.get<IName>(this.baseUrl +'Name/names').subscribe((names: any) => {
      this.names = names;
      this.totalCount = names.length;
      if (this.shopParams.pageNumber === 1) {
        this.names = names.slice(0, 30);
      } else if (this.shopParams.pageNumber > 1) {
        const startIndex = (this.shopParams.pageNumber - 1) * 30;
        const endIndex = startIndex + 30;
        this.names = names.slice(startIndex, endIndex);
      }
    });
  }

}
