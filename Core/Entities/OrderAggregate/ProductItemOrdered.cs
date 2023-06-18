using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productItemId, string productName,string pictureUrl, string size, string color)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
            ProductColor = color;
            ProductSize = size;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string ProductSize { get; set; }
        public string ProductColor { get; set; }
        public string PictureUrl { get; set; }
    }
}