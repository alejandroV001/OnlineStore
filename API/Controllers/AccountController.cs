using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;


        public AccountController(IConfiguration config,UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService,
                    IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(User);

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email){
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAync(User);

            return _mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindUserByClaimsPrincipleWithAddressAync(User);
            user.Address  = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if(result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            var role = await _userManager.GetRolesAsync(user);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName,
                Roles = role.First()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{"Email addres is already in use"}});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            await _userManager.AddToRoleAsync(user, "Member");

            var emailFromRequest = new SubscriptionEmails();
            emailFromRequest.Email = registerDto.Email;

            string key = _config["SendinblueSettings:ApiKey"];
            if (Configuration.Default.ApiKey.TryGetValue("api-key", out string existingApiKey) && existingApiKey == key)
            {
            }
            else
            {
                Configuration.Default.ApiKey.Add("api-key", key);
            }

            //Configurează informațiile e-mail-ului
            var sendSmtpEmail = new SendSmtpEmail(
                to: new List<SendSmtpEmailTo> { new SendSmtpEmailTo(emailFromRequest.Email) },
                subject: "Welcome to our familly",
                 htmlContent: @"<p style='font-family: Arial, sans-serif; font-size: 14px; color: #333;'>
                        You have successfully registered to our site. Thank you for trusting us.Here is a cupon for
                        <span style='font-weight: bold; font-size: 16px; color: #F00;'>
                            25% off
                            </span> 
                            that you can use in our site for a discount:
                            <span style='font-weight: bold; font-size: 16px; color: #F00;'>
                                firstbuy
                                </span>
                                    </p>");
            // Adaugă informațiile tale de expediere (opțional)
            sendSmtpEmail.Sender = new SendSmtpEmailSender(
                email: "alyvasilescu@gmail.com",
                name: "GymsharkStore");

            var apiInstance = new TransactionalEmailsApi();
            // Trimite e-mail-ul
            try
            {
                CreateSmtpEmail resultEmail = apiInstance.SendTransacEmail(sendSmtpEmail);
            }
            catch (Exception e)
            {
                Console.WriteLine("Eroare: " + e.Message);
            }


            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto{
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        
    }
}