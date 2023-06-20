import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
      this.productId = +localStorage.getItem('productId')!;

      this.bcService.breadcrumbs$ = this.bcService.breadcrumbs$.pipe(
        map(response => response.filter(crumb => crumb.alias !== 'Shop'))
      );
      
      this.loadProduct();
      window.scrollTo(0,0);
      this.shopService.getSizes().subscribe(s => {
        this.sizes = s;
      });

      this.selectedSize = this.sizes?.find(size => size?.name == this.product?.productSize);

      this.bcService.breadcrumbs$ = this.bcService.breadcrumbs$.pipe(
        map(response => response.filter(crumb => crumb.alias !== 'Shop'))
      );

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
    const productId = +localStorage.getItem('productId')!;
    this.shopService.getProduct(productId).subscribe(product => {
      console.log("test");
      console.log(product);

      this.product = product;
      this.checkDiscountForProduct();

      if(product.priceDiscounted == null)
        this.discountedPrice = 0;
      
      this.selectedSize =  this.sizes?.find(size => size?.name == this.product?.productSize);
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
      this.shopParams.colorId = 0;
      this.shopParams.sizeId = 0;

      this.shopService.setShopParams(this.shopParams);
      this.shopService.getProducts(false).subscribe(response => {
        console.log(response.data);
        this.productChilds = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit! == product?.productFit! && p.productColor != product.productColor);
        
        let colors: string[] = [];
        console.log(this.productChilds);

        this.productChilds = this.productChilds.filter(item => {
          if (!colors.includes(item.productColor)) {
            colors.push(item.productColor);
            return true;
          } else {
            colors.push(item.productColor);
            return false;
          }
        });
        console.log(this.productChilds);
        
        this.productSizes = response!.data.filter(p => p.productName! == product?.productName! &&
          p.productGender! == product?.productGender! && p.productFit == product?.productFit!
          && p.productColor! == product?.productColor!);
  

        const sizeOrder = ["XS","S", "M", "L", "XL", "XXL"];
        for (let element of this.productSizes) {
          this.size = this.sizes?.find(size => size?.name == element?.productSize);
          this.availableSizes?.push(this.size!);
        }

        this.availableSizes?.sort((a, b) => {
          const indexA = sizeOrder.indexOf(a.name);
          const indexB = sizeOrder.indexOf(b.name);
          return indexA - indexB;
        });

        this.selectedSize = this.sizes?.find(size => size?.name == this.product?.productSize);

      }, error => {
        console.log(error);
      });

    }, error => {
      console.log(error);
    });
  }

  goTo(name: string,id: number)
  {
    const replacedName = name.replace(/\s+/g, '-');
    this.shopService.setProductId(id);
    const url = `/shop/${replacedName}`;

    this.router.navigateByUrl(url, { skipLocationChange: true });
    window.location.reload();
  }

  selectSize(size: ISize) {
    this.selectedSize = size;
  }

  openSizeGuideDialog() {
    const dialogRef = this.dialog.open(SizeGuideComponent, {
      width: '600px',
      height: 'auto'
    });
  }

  checkDiscountForProduct()
  {
    this.shopService.checkDiscountProduct(+localStorage.getItem('productId')!).subscribe(response => {
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
