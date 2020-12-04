using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Rest.Model;

namespace Rest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class WMIController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<WMIModel> Get()
        {
            return GetWMIs();
        }

        [HttpGet("filter")]
        public IEnumerable<WMIModel> GetMIModels([FromQuery] string query, [FromQuery] string country)
        {
            if (String.IsNullOrEmpty(query) && String.IsNullOrEmpty(country))
                return GetWMIs();
            query = query?.ToLower();
            var WMIlist = GetWMIs();
            return WMIlist.Where(x => string.IsNullOrEmpty(country) || x.Country == country)
                .Where(x => string.IsNullOrEmpty(query)
                || (x.Country?.ToLower().Contains(query) ?? false)
                || (x.Name?.ToLower().Contains(query) ?? false)
                || (x.VehicleType?.ToLower().Contains(query) ?? false)
                || (x.WMI?.ToLower().Contains(query) ?? false)
                || x.Id.ToString().Contains(query));
        }
        [HttpGet("country")]
        public IEnumerable<string> GetCountry()
        {
            var WMIlist = GetWMIs();
            return WMIlist.GroupBy(x => x.Country).Select(x => x.Key);

        }
        private static List<WMIModel> GetWMIs()
        {
            var file = System.IO.File.OpenText(@"../Rest/Data/honda_wmi.json");
            var WMIlist = JsonConvert.DeserializeObject<List<WMIModel>>(file.ReadToEnd());
            WMIlist.Sort(new WMIModelComparerByCreatedOn());
            return WMIlist;
        }
    }
}
