using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ColorController :BaseApiController
    {
        private readonly IGenericRepository<ProductColor> _productsColorRepo;

        public ColorController(IGenericRepository<ProductColor> productColorRepo)
        {
            _productsColorRepo = productColorRepo;
        }

        [HttpGet("colors")]
        public async Task<ActionResult<IReadOnlyList<ProductColor>>> GetColors()
        {
            return Ok(await _productsColorRepo.ListAllSync());
        }
    }
}