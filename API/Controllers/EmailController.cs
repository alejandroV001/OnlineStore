using System.Text.RegularExpressions;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;

namespace API.Controllers
{
    public class EmailController : BaseApiController
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;

        public EmailController(IConfiguration config, IUnitOfWork unitOfWork)
        {
            _config = config;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody] SubscriptionRequest request)
        {
            var isEmail = EsteEmailValid(request.Email);
            var list = await _unitOfWork.Repository<SubscriptionEmails>().ListAllSync();
            var exista = list.Where(s =>s.Email == request.Email).FirstOrDefault();
            bool send = false;

            var emailFromRequest = new SubscriptionEmails();
            if (isEmail && exista == null)
            {
                emailFromRequest.Email = request.Email;
                _unitOfWork.Repository<SubscriptionEmails>().Add(emailFromRequest);
                send = true;
            }

            await _unitOfWork.Complete();

            string key = _config["SendinblueSettings:ApiKey"];
            if (Configuration.Default.ApiKey.TryGetValue("api-key", out string existingApiKey) && existingApiKey == key)
            {}
            else
            {    Configuration.Default.ApiKey.Add("api-key", key);}

            var sendSmtpEmail = new SendSmtpEmail(
                to: new List<SendSmtpEmailTo> { new SendSmtpEmailTo(request.Email) },
                subject: "Welcome to our familly",
                 htmlContent: @"<p style='font-family: Arial, sans-serif; font-size: 14px; color: #333;'>
                        You have successfully subscribed to our newsletter. Thank you for subscribing, here is a
                        <span style='font-weight: bold; font-size: 16px; color: #F00;'>
                            coupon
                            </span> 
                            that you can use in our site for a discount:
                            <span style='font-weight: bold; font-size: 16px; color: #F00;'>
                                subscription10
                                </span>
                                    </p>");

            sendSmtpEmail.Sender = new SendSmtpEmailSender(
                email: "alyvasilescu@gmail.com",
                name: "GymsharkStore");

            var apiInstance = new TransactionalEmailsApi();
            try
            {
                var result = new CreateSmtpEmail();
                if(send == true)
                    result = apiInstance.SendTransacEmail(sendSmtpEmail);
            }
            catch (Exception e)
            {
                Console.WriteLine("Eroare: " + e.Message);
            }

            return Ok(new { message = "You have successfully subscribed to our newsletter!" });
        }

        private bool EsteEmailValid(string email)
        {
            var regex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            return regex.IsMatch(email);
        }
    }
}

public class SubscriptionRequest
{
    public string Email { get; set; }
}
