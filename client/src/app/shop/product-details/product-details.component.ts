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
import { ShopParams } from 'src/app/shared/models/shopParams';
import { map } from 'rxjs';

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
  shopParams!: ShopParams;
  accesories: boolean = false;
  
  selectedColor: string;
  productId: number;
  sizes: ISize[] = [];
  availableSizes?: ISize[] = [];
  availableSizesLoaded: boolean;
  discountedPrice?: number;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private dialog: MatDialog) 
    {
    this.bcService.set('@productDetails', ' ');
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.loadProduct();

      this.shopService.getSizes().subscribe(s => {
        this.sizes = s;
      });

      this.bcService.breadcrumbs$ = this.bcService.breadcrumbs$.pipe(
        map(response => response.filter(crumb => crumb.alias !== 'Shop'))
      );

    });

    this.checkDiscountForProduct();

  }

  addItemToBasket() {
    if(this.selectedSize?.name)
    {
      this.product.productSize = this.selectedSize.name;
      this.shopService.getProducts(false).subscribe(response => {
        console.log(response.data);
        var productToAdd = response!.data.filter(p => p.productName! == this.product?.productName! &&
          p.productGender! == this.product?.productGender! && p.productColor! == this.product?.productColor && p.productFit! == this.product?.productFit! && p.productSize == this.selectedSize?.name).at(0);
          productToAdd!.priceDiscounted = this.discountedPrice!;
        this.basketService.addItemToBasket(productToAdd!, this.quantity);
      }, error => {
        console.log(error);
      });
      console.log(this.product);
    }

    if(this.accesories == true)
    {
      var productToAdd = this.product;
      this.basketService.addItemToBasket(productToAdd!, this.quantity);
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
      if(this.product.productCollection == "Accessories")
        this.accesories = true;

      
      var mainPhotoData = this.product.pictures.filter(ph => ph.isMain == true);
      this.selectedColor = this.product?.productColor;

      if (mainPhotoData.length > 0) {
        this.product.pictureUrl = mainPhotoData[0].url;
      }
      else
        this.product.pictureUrl = environment.imageALt;

      this.bcService.set('@productDetails', product.productName)

      this.shopParams.search = this.product.productName;
      this.shopParams.pageNumber = 0;
      this.shopService.getProducts(false).subscribe(response => {
        this.productChilds = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit! == product?.productFit! && p.productColor != product.productColor);
        
        let colors: string[] = [];

        this.productChilds = this.productChilds.filter(item => {
          if (!colors.includes(item.productColor)) {
            colors.push(item.productColor);
            return true;
          } else {
            colors.push(item.productColor);
            return false;
          }
        });
        
        this.productSizes = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit == product?.productFit!
          && p.productColor! == product?.productColor!);
  
        for (let element of this.productSizes) {
          this.size = this.sizes?.find(size => size?.name == element?.productSize);
          this.availableSizes?.push(this.size!);
        }

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

  checkDiscountForProduct()
  {
    this.shopService.checkDiscountProduct(+this.activateRoute.snapshot.paramMap.get('id')!).subscribe(response => {
      const currentDate = new Date();
      response.forEach(discount => {
        const discountStartingDate = new Date(discount.startingDate);
        const discountEndDate = new Date(discount.endDate);

        if(discountStartingDate <= currentDate && discountEndDate > currentDate)
        {
          const discountAmount = this.product!.price! * discount.value / 100;
          this.discountedPrice = this.product!.price! - discountAmount;
        }
      });
    })
  }
}
