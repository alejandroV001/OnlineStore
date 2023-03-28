using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Product :BaseEntity
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public ProductName ProductName { get; set; }
        public int? ProductNameId { get; set; }
        public ProductType ProductType { get; set; }
        public int? ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int? ProductBrandId { get; set; }
        public ProductFit ProductFit { get; set; }
        public int? ProductFitId { get; set; }
        public ProductGender ProductGender { get; set; }
        public int? ProductGenderId { get; set; }
        public ProductColor ProductColor { get; set; }
        public int? ProductColorId { get; set; }
        public ProductSize ProductSize { get; set; }
        public int? ProductSizeId { get; set; }
        public List<ProductPictures> Photos { get; set; } 
        public Product()
        {
            Photos = new List<ProductPictures>();
        }
    }
}