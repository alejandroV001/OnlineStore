using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductSpecification: BaseSpecification<Product>
    {
        public ProductSpecification(int id) : base(o => o.Id == id)
        {
            AddInclude(o => o.Photos);
            AddInclude(o => o.ProductName);
        }

    }
}