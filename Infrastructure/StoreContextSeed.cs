using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Infrastructure.Data;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try{
                var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                
                if(!context.ProductBrands.Any())
                {
                    var brandsData = File.ReadAllText(path + @"/Data/SeedData/brands.json");
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                    foreach (var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductTypes.Any())
                {
                    var typesData = File.ReadAllText(path + @"/Data/SeedData/types.json");
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                    foreach (var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.DeliveryMethods.Any())
                {
                    var dmData = File.ReadAllText(path + @"/Data/SeedData/delivery.json");
                    var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);
                    foreach (var item in methods)
                    {
                        context.DeliveryMethods.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductColors.Any())
                {
                    var dmData = File.ReadAllText(path + @"/Data/SeedData/color.json");
                    var colors = JsonSerializer.Deserialize<List<ProductColor>>(dmData);
                    foreach (var item in colors)
                    {
                        context.ProductColors.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductFits.Any())
                {
                    var dmData = File.ReadAllText(path + @"/Data/SeedData/fit.json");
                    var fits = JsonSerializer.Deserialize<List<ProductFit>>(dmData);
                    foreach (var item in fits)
                    {
                        context.ProductFits.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductSizes.Any())
                {
                    var dmData = File.ReadAllText(path + @"/Data/SeedData/size.json");
                    var sizes = JsonSerializer.Deserialize<List<ProductSize>>(dmData);
                    foreach (var item in sizes)
                    {
                        context.ProductSizes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductGenders.Any())
                {
                    var dmData = File.ReadAllText(path + @"/Data/SeedData/gender.json");
                    var gender = JsonSerializer.Deserialize<List<ProductGender>>(dmData);
                    foreach (var item in gender)
                    {
                        context.ProductGenders.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.Products.Any())
                {
                    var prductsData = File.ReadAllText(path + @"/Data/SeedData/products.json");
                    var products = JsonSerializer.Deserialize<List<Product>>(prductsData);
                    foreach (var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                
            }catch(Exception ex)
            {
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message);
            }
        }
    }
}