using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuponController: ControllerBase
    {
       private readonly IUnitOfWork _unitOfWork;
       private readonly IMapper _mapper;

        public CuponController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // [Cached(600)]
        [HttpGet("getCupons")]
        public async Task<ActionResult<IReadOnlyList<CuponDataDto>>> GetCupons()
        {
            var list = await _unitOfWork.Repository<Cupon>().ListAllSync();

            var data = _mapper.
            Map<IReadOnlyList<Cupon>, IReadOnlyList<CuponDataDto>>(list);       
            return Ok(data);

        }

        // [Cached(600)]
        [HttpGet("{id}")]
        public async Task<ActionResult<IReadOnlyList<Cupon>>> GetCupon(int id)
        {
            var list = await _unitOfWork.Repository<Cupon>().ListAllSync();

            return Ok(list.Where(c => c.Id == id).FirstOrDefault());
        }

        [HttpPost()]
        public async Task<ActionResult<Cupon>> AddCupon(Cupon cupon)
        {
            _unitOfWork.Repository<Cupon>().Add(cupon);

            int val = await _unitOfWork.Complete();
            if(val != 0)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCupon(int id)
        {
            var cupon = await _unitOfWork.Repository<Cupon>().GetByIdAsync(id);

            if(cupon == null) return BadRequest("Cupon not found");

            _unitOfWork.Repository<Cupon>().Delete(cupon);

            int val = await _unitOfWork.Complete();
            if(val != 0)
            {
                return Ok();
            }

            return BadRequest("Could not delete the size");
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(Cupon productData)
        { 
            _unitOfWork.Repository<Cupon>().Update(productData);
            if(await _unitOfWork.Repository<Cupon>().SaveAll())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}