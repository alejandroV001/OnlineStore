using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class ProductPictures : BaseEntity
    {
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}