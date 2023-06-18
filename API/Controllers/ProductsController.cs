using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;
using System.Buffers.Text;
using System.Drawing;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductType> _productsTypeRepo;
        private readonly IGenericRepository<ProductBrand> _productsBrandRepo;
        private readonly IGenericRepository<ProductPictures> _productsPicturesRepo;

        private readonly IUnitOfWork unitOfWork;

        private readonly IMapper _mapper;


        public ProductsController(IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productBrandRepo, 
            IGenericRepository<ProductType> productTypeRepo,
            IGenericRepository<ProductPictures> productsPicturesRepo,
            IMapper mapper, IUnitOfWork unit)
        {
            _productsRepo = productsRepo;
            _productsBrandRepo = productBrandRepo;
            _productsTypeRepo = productTypeRepo;
            _productsPicturesRepo = productsPicturesRepo;
            _mapper = mapper;
            unitOfWork = unit;
        }

        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
                        [FromQuery]ProductSpecParams productParams)
        {
            // var spec = new ProductsWithTypesAndBrandsSpecification(productParams);
            // var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            // var totalItems = await _productsRepo.CountAsync(countSpec);
            var products = await unitOfWork.Repository<Product>().ListAll();

            if(productParams.Search != null)
                products = products.Where(p => p.ProductName.Name.ToLower().Contains(productParams.Search)).ToList();
            if(productParams.FitId != null)
                products = products.Where(p => p.ProductFitId == productParams.FitId).ToList();
            
            if(productParams.BrandId != null)
                products = products.Where(p => p.ProductBrandId == productParams.BrandId).ToList();

            if(productParams.TypeId != null)
                products = products.Where(p => p.ProductTypeId == productParams.TypeId).ToList();

            if(productParams.SizeId != null)
                products = products.Where(p => p.ProductSizeId == productParams.SizeId).ToList();
            if(productParams.GenderId != null)
                products = products.Where(p => p.ProductGenderId == productParams.GenderId).ToList();

            if(productParams.ColorId != null)
                products = products.Where(p => p.ProductColorId == productParams.ColorId).ToList();
            if(productParams.CollectionId != null)
                products = products.Where(p => p.CollectionId == productParams.CollectionId).ToList();

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        products = products.OrderBy(p => p.Price).ToList();
                        break;
                    case "priceDesc":
                        products = products.OrderByDescending(p => p.Price).ToList();
                        break;
                }
            }

            if(productParams.PageIndex != 0)
            {
                products = products.GroupBy(p => new { p.ProductName, p.ProductColor })
                   .Select(g => g.First())
                   .ToList();
            }
            
            var totalItems = products.Count;

            products = products.Skip(productParams.Max * (productParams.PageIndex - 1)).Take(productParams.PageSize).ToList();
            var data = _mapper
                        .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]

        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product =  await _productsRepo.GetEntityWithSpec(spec);
            
            if(product == null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product, ProductToReturnDto>(product);
        }

        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return Ok(await _productsBrandRepo.ListAllSync());
        }
        
        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productsTypeRepo.ListAllSync());
        }

        [HttpPost("add-product")]
        public async Task<ActionResult<Product>> AddProduct(ProductMultipleDto product)
        {
            foreach (var size in product.Size)
            {
                var prod  = new Product{
                ProductNameId = (product.ProductNameId != 0) ? product.ProductNameId : null,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                ProductTypeId = (product.ProductTypeId != 0) ? product.ProductTypeId : null,
                ProductBrandId = (product.ProductBrandId != 0) ? product.ProductBrandId : null,
                ProductFitId = (product.ProductFitId != 0) ? product.ProductFitId : null,
                ProductGenderId = (product.ProductGenderId != 0) ? product.ProductGenderId : null,
                ProductColorId = (product.ProductColorId != 0) ? product.ProductColorId : null,
                ProductSizeId = size,
                CollectionId = (product.CollectionId != 0) ? product.CollectionId : null,
            };

            _productsRepo.Add(prod);
            } 
           
            if(await _productsRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add the product");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productsRepo.GetById(id);

            if(product == null) return BadRequest("Product not found");

            _productsRepo.Delete(product);

            if(await _productsRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the product");
        }

        [HttpPut("update-product")]
        public async Task<ActionResult> UpdateProduct(ProductDto product)
        {            
            //var productMapped = _mapper.Map<ProductDto, Product>(product);
            var prod  = new Product{
                Id = product.Id,
                ProductNameId = (product.ProductNameId != 0) ? product.ProductNameId : null,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                ProductTypeId = (product.ProductTypeId != 0) ? product.ProductTypeId : null,
                ProductBrandId = (product.ProductBrandId != 0) ? product.ProductBrandId : null,
                ProductFitId = (product.ProductFitId != 0) ? product.ProductFitId : null,
                ProductGenderId = (product.ProductGenderId != 0) ? product.ProductGenderId : null,
                ProductColorId = (product.ProductColorId != 0) ? product.ProductColorId : null,
                ProductSizeId =(product.ProductSizeId != 0) ? product.ProductSizeId : null,
                CollectionId = (product.CollectionId != 0) ? product.CollectionId : null,
            };
            _productsRepo.Update(prod);

            if(await _productsRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not add the product");
        }

    }
}