using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiscountController : ControllerBase
    {
        private readonly IGenericRepository<ProductDiscount> _productDiscountRepo;
        private readonly IGenericRepository<Discount> _discountRepo;

        private readonly IMapper _mapper;

        public DiscountController(IGenericRepository<ProductDiscount> productDiscountRepo,
        IMapper mapper, IGenericRepository<Discount> discountRepo)
        {
            _productDiscountRepo = productDiscountRepo;
            _mapper = mapper;
            _discountRepo = discountRepo;
        }

        // [Cached(600)]
        [HttpGet("getDiscounts")]
        public async Task<ActionResult<IReadOnlyList<Discount>>> GetDiscounts()
        {
            var list = await _discountRepo.ListAllSync();
            return Ok(list);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IReadOnlyList<DiscountDto>>> GetDiscount(int id)
        {
            var spec = new DiscountWithSpec(id);

            var list = await _productDiscountRepo.ListAsync(spec);
            
            var data = _mapper.
            Map<IReadOnlyList<ProductDiscount>, IReadOnlyList<DiscountDto>>(list);

            return Ok(data);
        }

        [HttpPost()]
        public async Task<ActionResult<ProductDiscount>> AddDiscountToProduct(DiscountDto disc)
        {
            var mapped = _mapper.Map<DiscountDto, ProductDiscount>(disc);

            _productDiscountRepo.Add(mapped);

            if(await _productDiscountRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDiscount(int id)
        {
            var disc = await _productDiscountRepo.GetById(id);

            if(disc == null) return BadRequest("Disc not found");

            _productDiscountRepo.Delete(disc);

            if(await _productDiscountRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the size");
        }

         [HttpPut("update")]
        public async Task<ActionResult> Update(DiscountDto productData)
        { 
            var mapped = _mapper.Map<DiscountDto, ProductDiscount>(productData);

            _productDiscountRepo.Update(mapped);
            if(await _productDiscountRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}