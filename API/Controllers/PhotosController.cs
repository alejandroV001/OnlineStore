using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Options;
using API.Helpers;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Mvc;
using API.Dtos;
using CloudinaryDotNet.Actions;
using Core.Entities;

namespace API.Controllers
{

    [Route("api/photos/{productId}/photos")]
    public class PhotosController : BaseApiController
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        public PhotosController(IProductRepository productRepository, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromProduct = await _productRepository.GetPhotosByProductIdAsync(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromProduct);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForProduct([FromForm]PhotoForCreationDto photo, int productId)
        {
            var product = await _productRepository.GetproductByIdAsync(productId);

            if(product == null)
                return BadRequest("Product not found");

            var file = photo.File;

            var uploadResult = new ImageUploadResult();
            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParamas = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParamas);
                }
            }

            photo.Url = uploadResult.Url.ToString();
            photo.PublicId = uploadResult.PublicId;

            var photoMapped = _mapper.Map<ProductPictures>(photo);
            photoMapped.Product = product;

            if(product.Photos.Count == 0)
            {
                photoMapped.IsMain = true;
            }
            photoMapped.Url = "https"+ photoMapped.Url.Substring(4);
            
            product.Photos.Add(photoMapped);

            var photoToReturn = _mapper.Map<PhotoForReturnDto>(photoMapped);

            if(await _productRepository.SaveAll())
            {
                // return CreatedAtRoute("GetPhoto",new {id = photoMapped.Id}, photoToReturn);
                return Ok(photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }
    }
}