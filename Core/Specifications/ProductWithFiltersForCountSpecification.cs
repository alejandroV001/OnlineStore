using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification: BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
            :base(x => 
                (string.IsNullOrEmpty(productParams.Search) || x.ProductName.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (!productParams.GenderId.HasValue || x.ProductGenderId == productParams.GenderId) &&
                (!productParams.SizeId.HasValue || x.ProductSizeId == productParams.SizeId) &&
                (!productParams.ColorId.HasValue || x.ProductColorId == productParams.ColorId) &&
                (!productParams.FitId.HasValue || x.ProductFitId == productParams.FitId) &&
                (!productParams.CollectionId.HasValue || x.CollectionId == productParams.CollectionId) 
            )
        {
        }
    }
}