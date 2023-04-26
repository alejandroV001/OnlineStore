import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { IColor } from 'src/app/shared/models/color';
import { HttpClient } from '@angular/common/http';
import { ISize } from 'src/app/shared/models/size';
import { MatDialog } from '@angular/material/dialog';
import { SizeGuideComponent } from '../size-guide/size-guide.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct
  quantity = 1;
  color: IColor;
  size?: ISize;
  colors: string[] = [];
  selectedSize?: ISize;
  productChilds: IProduct[] = [];
  productSizes: IProduct[] = [];

  selectedColor: string;
  productId: number;
  sizes: ISize[] = [];
  availableSizes?: ISize[] = [];
  availableSizesLoaded: boolean;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private dialog: MatDialog) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // convert the string parameter to a number
      this.loadProduct();

      this.shopService.getSizes().subscribe(s => {
        console.log(s);
        this.sizes = s;
      });

    });
  }

  addItemToBasket() {
    if(this.selectedSize?.name)
    {
      this.product.productSize = this.selectedSize.name;
      this.shopService.getProducts(false).subscribe(response => {
        var productToAdd = response!.data.filter(p => p.productName! == this.product?.productName! &&
          p.productGender! == this.product?.productGender! && p.productFit! == this.product?.productFit! && p.productSize == this.selectedSize?.name).at(0);
        console.log(productToAdd);
  
        this.basketService.addItemToBasket(productToAdd!, this.quantity);
      }, error => {
        console.log(error);
      });
      console.log(this.product);
    }
    
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }

  loadProduct() {
    this.availableSizes = [];
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(product => {
      this.product = product;
      this.selectedSize = this.size = this.sizes?.find(size => size?.name == this.product?.productSize);
      var mainPhotoData = this.product.pictures.filter(ph => ph.isMain == true);
      this.selectedColor = this.product?.productColor;
      if (mainPhotoData.length > 0) {
        this.product.pictureUrl = mainPhotoData[0].url;
      }
      else
        this.product.pictureUrl = environment.imageALt;

      this.bcService.set('@productDetails', product.productName)

      this.shopService.getProducts(false).subscribe(response => {

        this.productChilds = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit! == product?.productFit! && p.productColor != product.productColor);
        //preluam toate itemele care corespund pentru a putea avea toate culorile care coresp
        
        let colors: string[] = [];

        this.productChilds = this.productChilds.filter(item => {
          if (!colors.includes(item.productColor)) {
            colors.push(item.productColor);
            return true;
          } else {
            return false;
          }
        });
        
        this.productSizes = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit == product?.productFit!
          && p.productColor! == product?.productColor!);
  
        console.log(this.productSizes);
        for (let element of this.productSizes) {
          console.log(element);
          this.size = this.sizes?.find(size => size?.name == element?.productSize);
          this.availableSizes?.push(this.size!);
        }


        //preluam din toate elem toate marimile care se regasesc 

      }, error => {
        console.log(error);
      });

    }, error => {
      console.log(error);
    });
  }

  goTo(id: number) {
    this.router.navigate(['/shop', id]);
  }

  selectSize(size: ISize) {
    this.selectedSize = size;
    console.log(this.selectedSize);
  }

  openSizeGuideDialog() {
    const dialogRef = this.dialog.open(SizeGuideComponent, {
      width: '600px',
      height: 'auto'
    });
  }

}
