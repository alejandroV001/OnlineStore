using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class WhishlistRepository : IWhishlistRepository
    {
        private readonly IDatabase _database;

        public WhishlistRepository(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<bool> DeleteWhishlistAsync(string whishlistId)
        {
            return await _database.KeyDeleteAsync(whishlistId);
        }

        public async Task<CustomerWhishlist> GetWhishlistAsync(string whishlistId)
        {
            var data = await _database.StringGetAsync(whishlistId);

            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerWhishlist>(data);
        }

        public async Task<CustomerWhishlist> UpdateWhishlistAsync(CustomerWhishlist whishlist)
        {
           var created = await _database.StringSetAsync(whishlist.Id, JsonSerializer.Serialize(whishlist), TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetWhishlistAsync(whishlist.Id);
        }
    }
}