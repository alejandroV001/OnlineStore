using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ProductSpecification: BaseEntity
    {
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public ProductSize ProductSize { get; set; }
        public int ProductSizeId { get; set; }
        public ProductColor ProductColor { get; set; }
        public int ProductColorId { get; set; }
        public int Quantity { get; set; }

    }
}