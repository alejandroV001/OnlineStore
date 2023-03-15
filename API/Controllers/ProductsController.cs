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

        private readonly IMapper _mapper;


        public ProductsController(IGenericRepository<Product> productsRepo,
            IGenericRepository<ProductBrand> productBrandRepo, 
            IGenericRepository<ProductType> productTypeRepo,
            IGenericRepository<ProductPictures> productsPicturesRepo,
            IMapper mapper)
        {
            _productsRepo = productsRepo;
            _productsBrandRepo = productBrandRepo;
            _productsTypeRepo = productTypeRepo;
            _productsPicturesRepo = productsPicturesRepo;
            _mapper = mapper;
        }

        //[Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
                        [FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var totalItems = await _productsRepo.CountAsync(countSpec);

            var products = await _productsRepo.ListAsync(spec);

            var data = _mapper
                        .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

            return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        // [Cached(600)]
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
        public async Task<ActionResult<Product>> AddProduct(ProductDto product)
        {
            var prod  = new Product{
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                ProductTypeId = product.ProductTypeId,
                ProductBrandId = product.ProductBrandId,
                ProductFitId = product.ProductFitId,
                ProductGenderId = product.ProductGenderId,
            };

            _productsRepo.Add(prod);

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
                return Ok("Product deleted with success!");
            }

            return BadRequest("Could not delete the product");
        }

        [HttpPut("update-product")]
        public async Task<ActionResult<Product>> UpdateProduct(ProductDto product)
        {            
            var productMapped = _mapper.Map<ProductDto, Product>(product);

            _productsRepo.Update(productMapped);

            if(await _productsRepo.SaveAll())
            {
                return Ok("Product Updated with succes");
            }

            return BadRequest("Could not add the product");
        }
    }
}