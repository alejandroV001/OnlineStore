using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(d => d.ProductSize, o => o.MapFrom(s => s.ProductSize.Name))
                .ForMember(d => d.ProductFit, o => o.MapFrom(s => s.ProductFit.Name))
                .ForMember(d => d.ProductColor, o => o.MapFrom(s => s.ProductColor.Name))
                .ForMember(d => d.ProductGender, o => o.MapFrom(s => s.ProductGender.Name))
                .ForMember(d => d.Pictures, o => o.MapFrom(s => s.Photos))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ProductName.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.Photos.Where(p =>p.IsMain == true).FirstOrDefault().Url));

             CreateMap<ProductDto, Product>();


            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl));
                // .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemResolver>());

            CreateMap<PhotoForCreationDto, ProductPictures>();
            CreateMap<ProductPictures, PhotoForReturnDto>();

        }
    }
}