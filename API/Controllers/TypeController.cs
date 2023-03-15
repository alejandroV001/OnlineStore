using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TypeController : BaseApiController
    {
        private readonly IGenericRepository<ProductType> _productsTypeRepo;

        public TypeController(IGenericRepository<ProductType> productTypeRepo)
        {
            _productsTypeRepo = productTypeRepo;
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            return Ok(await _productsTypeRepo.ListAllSync());
        }
    }
}