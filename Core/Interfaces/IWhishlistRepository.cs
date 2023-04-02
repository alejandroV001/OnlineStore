using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IWhishlistRepository
    {
        Task<CustomerWhishlist> GetWhishlistAsync(string whishlistId);
        Task<CustomerWhishlist> UpdateWhishlistAsync(CustomerWhishlist whishlist);
        Task<bool> DeleteWhishlistAsync(string whishlistId);
    }
}