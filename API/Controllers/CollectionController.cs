using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CollectionController : BaseApiController
    {
        private readonly IGenericRepository<ProductCollection> _collectionRepo;

        public CollectionController(IGenericRepository<ProductCollection> collectionRepo)
        {
            _collectionRepo = collectionRepo;
        }

        [HttpGet("collections")]
        public async Task<ActionResult<IReadOnlyList<ProductCollection>>> GetCollections()
        {
            return Ok(await _collectionRepo.ListAllSync());
        }

        [HttpPost()]
        public async Task<ActionResult> Add(ProductCollection coll)
        {
            _collectionRepo.Add(coll);

            if(await _collectionRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var coll = await _collectionRepo.GetById(id);

            if(coll == null) return BadRequest("Collection not found");

            _collectionRepo.Delete(coll);

            if(await _collectionRepo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Could not delete the brand");
        }

    }
}