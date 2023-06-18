using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NameController : BaseApiController
    {
        private readonly IGenericRepository<ProductName> _productNameRepo;

        public NameController(IGenericRepository<ProductName> productNameRepo)
        {
            _productNameRepo = productNameRepo;
        }
        
        // [Cached(600)]
        [HttpGet("names")]
        public async Task<ActionResult<IReadOnlyList<ProductName>>> GetNames()
        {
            return Ok(await _productNameRepo.ListAllSync());
        }

        [HttpPost()]
        public async Task<ActionResult> Add(ProductName name)
        {
            _productNameRepo.Add(name);

            if(await _productNameRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var name = await _productNameRepo.GetById(id);

            if(name == null) return BadRequest("Name not found");

            _productNameRepo.Delete(name);

            if(await _productNameRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the brand");
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(ProductName productData)
        {
            // var updateName = new ProductName{
            //     Id = id,
            //     Name = name
            // };
            _productNameRepo.Update(productData);
            if(await _productNameRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}