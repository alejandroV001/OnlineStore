using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int ProductTypeId { get; set; }
        public int ProductBrandId { get; set; }
        public int ProductSizeId { get; set; }
        public int ProductFitId { get; set; }
        public int ProductColorId { get; set; }
        public int ProductGenderId { get; set; }


    }
}