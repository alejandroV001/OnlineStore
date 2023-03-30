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
        public DbSet <ProductPictures> ProductPictures {get; set;}
        public DbSet <ProductName> ProductNames { get; set; }
        public DbSet <ProductCollection> ProductCollections { get; set; }
        public DbSet <Discount> Discounts { get; set; }
        public DbSet <ProductDiscount> ProductDiscounts { get; set; }
        public DbSet <Order> Orders { get; set;}
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductType)
                .WithMany()
                .HasForeignKey(p => p.ProductTypeId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductBrand)
                .WithMany()
                .HasForeignKey(p => p.ProductBrandId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductFit)
                .WithMany()
                .HasForeignKey(p => p.ProductFitId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductGender)
                .WithMany()
                .HasForeignKey(p => p.ProductGenderId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductColor)
                .WithMany()
                .HasForeignKey(p => p.ProductColorId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductSize)
                .WithMany()
                .HasForeignKey(p => p.ProductSizeId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductName)
                .WithMany()
                .HasForeignKey(p => p.ProductNameId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.ProductCollection)
                .WithMany()
                .HasForeignKey(p => p.CollectionId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}