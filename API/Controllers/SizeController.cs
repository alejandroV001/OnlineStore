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

        [HttpPost()]
        public async Task<ActionResult<ProductSize>> AddSize(ProductSize size)
        {
            _productsSizeRepo.Add(size);

            if(await _productsSizeRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(int id)
        {
            var size = await _productsSizeRepo.GetById(id);

            if(size == null) return BadRequest("Size not found");

            _productsSizeRepo.Delete(size);

            if(await _productsSizeRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the size");
        }
    }
}