import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IColor } from 'src/app/shared/models/color';
import { ShopService } from 'src/app/shop/shop.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-colors',
  templateUrl: './edit-colors.component.html',
  styleUrls: ['./edit-colors.component.scss']
})
export class EditColorsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  types: IColor[] = [];
  colorForm!:FormGroup;

  constructor(private http:HttpClient, private fb: FormBuilder,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.http.get<IColor>(this.baseUrl +'color/colors').subscribe((types: any) => {
      this.types = types;
    });
    this.createForm();
  }

  deleteColor(id: number){
    if (confirm('Are you sure you want to delete this type?')) {
      this.shopService.deleteColors(id).subscribe(() => {
        this.http.get<IColor>(this.baseUrl +'color/colors').subscribe((types: any) => {
          this.types = types;
        });
      }, error => {
        console.log(error);
      });
  }
}

  createForm(){
    this.colorForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  onSubmit(){
    this.shopService.addColors(this.colorForm.value).subscribe(response => {
      this.http.get<IColor>(this.baseUrl +'color/colors').subscribe((types: any) => {
        this.types = types;
      });
    }, error => {
      console.log(error);
    });
  }
}
