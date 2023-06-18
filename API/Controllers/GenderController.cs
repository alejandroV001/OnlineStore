using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class GenderController : BaseApiController
    {
        private readonly IGenericRepository<ProductGender> _productGenderRepo;

        public GenderController(IGenericRepository<ProductGender> productGenderRepo)
        {
            _productGenderRepo = productGenderRepo;
        }

        // [Cached(600)]
        [HttpGet("gender")]
        public async Task<ActionResult<IReadOnlyList<ProductGender>>> GetGenders()
        {
            return Ok(await _productGenderRepo.ListAllSync());
        }
    }
}