using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [HttpGet("fits")]
        public async Task<ActionResult<IReadOnlyList<ProductFit>>> GetFits()
        {
            return Ok(await _productsFitRepo.ListAllSync());
        }
    }
}