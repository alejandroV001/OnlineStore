using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet <Product> Products {get; set;}
        public DbSet <ProductBrand> ProductBrands {get; set;}
        public DbSet <ProductType> ProductTypes { get; set;}
        public DbSet <ProductColor> ProductColors { get; set;}
        public DbSet <ProductFit> ProductFits { get; set;}
        public DbSet <ProductSize> ProductSizes { get; set;}
        public DbSet <ProductGender> ProductGenders { get; set;}

        public DbSet <ProductSpecification> ProductSpecifications {get; set;}
        public DbSet <ProductPictures> ProductPictures {get; set;}

        public DbSet <Order> Orders { get; set;}
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}