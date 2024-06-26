using System;

namespace MarauderServer.Models
{
    public partial class CustomerAddress
    {
        public int CustomerAddressId { get; set; }
        public int CustomerId { get; set; }
        public bool ShipToFlag { get; set; }
        public bool BillToFlag { get; set; }
        public string? ShipToName { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? AddressLine3 { get; set; }
        public string? City { get; set; }
        public string? StateCode { get; set; }
        public string? ZipCode { get; set; }
        public DateTime Created { get; set; }
        public int CreatedBy { get; set; }
        public DateTime Modified { get; set; }
        public int ModifiedBy { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? Deleted { get; set; }
        public int? DeletedBy { get; set; }

    }
}
