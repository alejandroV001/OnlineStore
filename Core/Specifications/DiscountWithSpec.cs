using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class DiscountWithSpec : BaseSpecification<ProductDiscount>
    {
        public DiscountWithSpec(DiscountSpecParams discParams) 
        : base(x =>
            (!discParams.DiscountId.HasValue || x.DiscountId == discParams.DiscountId) &&
            (!discParams.ProductId.HasValue || x.ProductId == discParams.ProductId)

        )
        {
            AddInclude(x => x.Product);
            AddInclude(x => x.Discount);
        }

        public DiscountWithSpec(int id) 
            : base(x =>x.ProductId == id)
        {
            AddInclude(x => x.Product);
            AddInclude(x => x.Discount);
        }
    }
}