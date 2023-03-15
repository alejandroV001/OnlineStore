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
    }
}