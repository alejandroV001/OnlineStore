using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class DiscountSpecParams
    {
        public int? ProductId { get; set; }
        public int? DiscountId { get; set; }
    }
}