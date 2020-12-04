using System;

namespace Rest.Model
{
    public class WMIModel
    {
        public string Country { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? DateAvailableToPublic { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public String VehicleType { get; set; }
        public String WMI { get; set; }
    }
}
