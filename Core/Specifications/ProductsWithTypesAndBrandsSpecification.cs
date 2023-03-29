using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams)
            :base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.ProductName.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.GenderId.HasValue || x.ProductGenderId == productParams.GenderId) &&
                (!productParams.SizeId.HasValue || x.ProductSizeId == productParams.SizeId) &&
                (!productParams.ColorId.HasValue || x.ProductColorId == productParams.ColorId) &&
                (!productParams.FitId.HasValue || x.ProductFitId == productParams.FitId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductColor);
            AddInclude(x => x.ProductSize);
            AddInclude(x => x.ProductGender);
            AddInclude(x => x.ProductFit);
            AddInclude(x => x.Photos);
            AddInclude(x => x.ProductName);
            AddInclude(x => x.ProductCollection);

            AddOrderBy(x => x.ProductName.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1),
                productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.ProductName.Name);
                        break;

                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(x =>x.Id ==id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductName);
            AddInclude(x => x.ProductBrand);
            AddInclude(x => x.ProductColor);
            AddInclude(x => x.ProductSize);
            AddInclude(x => x.ProductGender);
            AddInclude(x => x.ProductFit);
            AddInclude(x => x.ProductCollection);
            AddInclude(x => x.Photos.Where(p =>p.ProductId == id));

        }
    }
}