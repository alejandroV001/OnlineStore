using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;


namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentServices;
        private readonly IConfiguration _config;

        private const string WhSecret = "whsec_74a9084edcdc11564c793ccaa5fbdf2d4deec04a35ef82b1200d74c82bf7dc9b";
        private readonly ILogger<PaymentsController> _logger;

        public PaymentsController(IPaymentService paymentServices, ILogger<PaymentsController> logger, IConfiguration config)
        {
            _paymentServices = paymentServices;
            _logger = logger;
            _config = config;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentServices.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));

            return basket;
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WhSecret);

            PaymentIntent intent;
            Core.Entities.OrderAggregate.Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded: ", intent.Id);
                    //Update order status
                    order = await _paymentServices.UpdateOrderPaymentSucceeded(intent.Id);
                    string key = _config["SendinblueSettings:ApiKey"];
                    if (Configuration.Default.ApiKey.TryGetValue("api-key", out string existingApiKey) && existingApiKey == key)
                    {
                    }
                    else
                    {
                        Configuration.Default.ApiKey.Add("api-key", key);
                    }


                    var sendSmtpEmail = new SendSmtpEmail(
                        to: new List<SendSmtpEmailTo> { new SendSmtpEmailTo(order.BuyerEmail) },
                        subject: "Payment received with success",
                        htmlContent: "<p>The payment for the order:" + order.Id + "has been received. Thanks for trusting us with your shopping!</p>");

                    sendSmtpEmail.Sender = new SendSmtpEmailSender(
                        email: "alyvasilescu@gmail.com",
                        name: "GymsharkStore");

                    var apiInstance = new TransactionalEmailsApi();
                    try
                    {
                        CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Eroare: " + e.Message);
                    }
                    _logger.LogInformation("Order updated to payment received", order.Id);
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation("Payment failed: ", intent.Id);
                    //Update order status
                    order = await _paymentServices.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation("Payment failed", order.Id);
                    
                    break;
            }

            return new EmptyResult();
        }
    }
}