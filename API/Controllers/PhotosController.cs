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
        private readonly IGenericRepository<ProductPictures> _picturesRepo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;
        public PhotosController(IProductRepository productRepository, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig, IGenericRepository<ProductPictures> picturesRepo)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _picturesRepo = picturesRepo;

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
            var photos = await _productRepository.GetPhotosByProductIdAsync(productId);
            product.Photos = photos;
            
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


         [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {

            var photoFromRepo = await _picturesRepo.GetById(id);

            if (photoFromRepo.IsMain) {
                return BadRequest("You cannot  delete your main photo");
            }            

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok") 
                {
                    _picturesRepo.Delete(photoFromRepo);
                } 
                else 
                {
                    return BadRequest("Failed to delete the photo (issue with Cloud)");
                }
            } 
            else 
            {
                _picturesRepo.Delete(photoFromRepo);
            }

            if (await _picturesRepo.SaveAll()) 
            {
                return Ok();
            }            
            return BadRequest("Failed to delete the photo");

        }
    }
}