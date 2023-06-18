using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DeliveryMethodController : BaseApiController
    {
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepo;

        public DeliveryMethodController(IGenericRepository<DeliveryMethod> deliveryMethodRepo)
        {
            _deliveryMethodRepo = deliveryMethodRepo;
        }

        // [Cached(600)]
        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _deliveryMethodRepo.ListAllSync());
        }

        [HttpPost()]
        public async Task<ActionResult> Add(DeliveryMethod delivery)
        {
            _deliveryMethodRepo.Add(delivery);

            if(await _deliveryMethodRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var delivery = await _deliveryMethodRepo.GetById(id);

            if(delivery == null) return BadRequest("Delivery not found");

            _deliveryMethodRepo.Delete(delivery);

            if(await _deliveryMethodRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete delivery type");
        }

         [HttpPut("update")]
        public async Task<ActionResult> Update(DeliveryMethod productData)
        { 
            _deliveryMethodRepo.Update(productData);
            if(await _deliveryMethodRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}