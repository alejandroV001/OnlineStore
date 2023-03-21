using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BrandController : BaseApiController
    {
        private readonly IGenericRepository<ProductBrand> _productsBrandRepo;

        public BrandController(IGenericRepository<ProductBrand> productBrandRepo)
        {
            _productsBrandRepo = productBrandRepo;
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await _productsBrandRepo.ListAllSync());
        }

        [HttpPost()]
        public async Task<ActionResult> Add(ProductBrand brand)
        {
            _productsBrandRepo.Add(brand);

            if(await _productsBrandRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var brand = await _productsBrandRepo.GetById(id);

            if(brand == null) return BadRequest("Brand not found");

            _productsBrandRepo.Delete(brand);

            if(await _productsBrandRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the brand");
        }
    }
}