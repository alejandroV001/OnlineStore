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

        [HttpPost()]
        public async Task<ActionResult> Add(ProductColor color)
        {
            _productsColorRepo.Add(color);

            if(await _productsColorRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var color = await _productsColorRepo.GetById(id);

            if(color == null) return BadRequest("Color not found");

            _productsColorRepo.Delete(color);

            if(await _productsColorRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the color");
        }
    }
}