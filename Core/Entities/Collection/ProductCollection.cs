using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.Collection
{
    public class ProductCollection : BaseEntity
    {
        public Product Product { get; set; }
        public int? ProductId { get; set; }
        public Collection Collection { get; set; }
        public int? CollectionId { get; set; }
    }
}