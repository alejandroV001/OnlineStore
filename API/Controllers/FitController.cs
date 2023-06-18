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
    public class FitController: BaseApiController
    {
        private readonly IGenericRepository<ProductFit> _productsFitRepo;

        public FitController(IGenericRepository<ProductFit> productsFitRepo)
        {
            _productsFitRepo = productsFitRepo;
        }

        // [Cached(600)]
        [HttpGet("fits")]
        public async Task<ActionResult<IReadOnlyList<ProductFit>>> GetFits()
        {
            return Ok(await _productsFitRepo.ListAllSync());
        }
        
        [HttpPost()]
        public async Task<ActionResult> Add(ProductFit fit)
        {
            _productsFitRepo.Add(fit);

            if(await _productsFitRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fit = await _productsFitRepo.GetById(id);

            if(fit == null) return BadRequest("Fit not found");

            _productsFitRepo.Delete(fit);

            if(await _productsFitRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the fit");
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(ProductFit productData)
        { 
            _productsFitRepo.Update(productData);
            if(await _productsFitRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}