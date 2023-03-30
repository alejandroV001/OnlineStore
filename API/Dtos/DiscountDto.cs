using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int DiscountId { get; set; }
        public string StartingDate { get; set; }
        public string EndDate { get; set; }
        public int Value { get; set; }
    }
}