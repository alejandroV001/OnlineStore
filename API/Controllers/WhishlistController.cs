using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WhishlistController : BaseApiController
    {
        private readonly IWhishlistRepository _whishlistRepository;
        private readonly IMapper _mapper;

        public WhishlistController(IWhishlistRepository whishlistRepository, IMapper mapper)
        {
            _whishlistRepository = whishlistRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerWhishlist>> GetWhishlistById(string id ){
            var whishlist = await _whishlistRepository.GetWhishlistAsync(id);

            return Ok(whishlist ?? new CustomerWhishlist(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerWhishlist>> UpdateWhishlist(CustomerWhishlistDto whishlist){
            var customerWhishlist = _mapper.Map<CustomerWhishlistDto, CustomerWhishlist>(whishlist);

            var updatedBasket = await _whishlistRepository.UpdateWhishlistAsync(customerWhishlist);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteWhishlistAsync(string id){
            await _whishlistRepository.DeleteWhishlistAsync(id);
        }

    }
}

