using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class CustomerWhishlist
    {
        public CustomerWhishlist()
        {
        }
        public CustomerWhishlist(string id)
        {
            Id = id;
        }

        public string Id { get; set; }
        public List<WhishlistItem> items { get; set; } = new List<WhishlistItem>();
    }
}