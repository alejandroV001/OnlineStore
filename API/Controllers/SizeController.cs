using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SizeController : BaseApiController
    {
        private readonly IGenericRepository<ProductSize> _productsSizeRepo;

        public SizeController(IGenericRepository<ProductSize> productSizeRepo)
        {
            _productsSizeRepo = productSizeRepo;
        }

        [HttpGet("sizes")]
        public async Task<ActionResult<IReadOnlyList<ProductSize>>> GetSizes()
        {
            return Ok(await _productsSizeRepo.ListAllSync());
        }
    }
}