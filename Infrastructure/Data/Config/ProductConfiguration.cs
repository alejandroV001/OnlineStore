using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p =>p.Id).IsRequired();
            builder.Property(p => p.Description).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(b => b.ProductName).WithMany()
                        .HasForeignKey(p => p.ProductNameId).IsRequired(false);
            builder.HasOne(b => b.ProductBrand).WithMany()
                        .HasForeignKey(p => p.ProductBrandId).IsRequired(false);
            builder.HasOne(t => t.ProductType).WithMany()
                        .HasForeignKey(p => p.ProductTypeId).IsRequired(false);
            builder.HasOne(t => t.ProductFit).WithMany()
                        .HasForeignKey(p => p.ProductFitId).IsRequired(false);
            builder.HasOne(t => t.ProductGender).WithMany()
                        .HasForeignKey(p => p.ProductGenderId).IsRequired(false);
            builder.HasOne(t => t.ProductColor).WithMany()
                        .HasForeignKey(p => p.ProductColorId).IsRequired(false);
            builder.HasOne(t => t.ProductSize).WithMany()
                        .HasForeignKey(p => p.ProductSizeId).IsRequired(false);

        }
    }
}