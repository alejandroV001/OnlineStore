using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Discount
{
    public class ProductDiscount : BaseEntity
    {
        public Product Product { get; set; }
        public int? ProductId { get; set; }
        public Discount Discount { get; set; }
        public int? DiscountId { get; set; }
        public DateTime? StartingDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}