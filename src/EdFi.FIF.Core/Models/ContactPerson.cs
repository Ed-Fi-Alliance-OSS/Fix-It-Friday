﻿using System.Collections.Generic;

namespace EdFi.FIF.Core.Models
{
    public class ContactPerson
    {
        public string UniqueKey { get; set; }
        public string ContactPersonKey { get; set; }
        public string StudentKey { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string RelationshipToStudent { get; set; }
        public string StreetNumberName { get; set; }
        public string ApartmentRoomSuiteNumber { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public string PrimaryEmailAddress { get; set; }
        public bool IsPrimaryContact { get; set; }
        public string PreferredContactMethod { get; set; }
        public string BestTimeToContact { get; set; }
        public string ContactNotes { get; set; }
    }
}
