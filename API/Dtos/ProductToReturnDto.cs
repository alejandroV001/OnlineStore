using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public string ProductSize { get; set; }
        public string ProductFit { get; set; }
        public string ProductColor { get; set; }
        public string ProductGender { get; set; }
        public ICollection<PhotoForReturnDto> Pictures { get; set; }

    }
}