using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace bootcamp
{
    public static class GetHoursUntilClose
    {
        [FunctionName("GetHoursUntilClose")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var now = DateTime.Now;

            // 5pm
            var close = new DateTime(now.Year, now.Month, now.Day, 17, 0, 0);

            // Get hours from now until close
            var hours = (int)Math.Round(close.Subtract(now).TotalHours);

            var state = "OPEN";

            if (hours < 0)
                state = "CLOSED";

            // Return an object with the state and hours    
            return new OkObjectResult(new { state = state, hours = hours });
        }
    }
}
