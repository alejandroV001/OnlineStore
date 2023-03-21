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

        [HttpPost()]
        public async Task<ActionResult> Add(ProductType type)
        {
            _productsTypeRepo.Add(type);

            if(await _productsTypeRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var type = await _productsTypeRepo.GetById(id);

            if(type == null) return BadRequest("Type not found");

            _productsTypeRepo.Delete(type);

            if(await _productsTypeRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the size");
        }
    }
}