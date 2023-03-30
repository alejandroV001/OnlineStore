using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DiscountController : BaseApiController
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
        
        [HttpGet("discounts")]
        public async Task<IReadOnlyList<Discount>> GetDiscounts()
        {
            var list = await _discountRepo.ListAllSync();
            // var data = _mapper.
            // Map<IReadOnlyList<Discount>, IReadOnlyList<DiscountsDto>>(list);
            return list;

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IReadOnlyList<DiscountDto>>> GetDiscount(int id)
        {
            var spec = new DiscountWithSpec(id);
            var list2 = await _discountRepo.ListAllSync();
            var list = await _productDiscountRepo.ListAsync(spec);
            
            var data = _mapper.
            Map<IReadOnlyList<ProductDiscount>, IReadOnlyList<DiscountDto>>(list);

            return Ok(data);
        }



        [HttpPost()]
        public async Task<ActionResult<ProductDiscount>> AddSize(ProductDiscount disc)
        {
            _productDiscountRepo.Add(disc);

            if(await _productDiscountRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(int id)
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
    }
}