﻿// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

using EdFi.Buzz.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdFi.Buzz.Data.Configurations
{
    public class ContactPersonConfiguration : IEntityTypeConfiguration<ContactPerson>
    {
        public void Configure(EntityTypeBuilder<ContactPerson> builder)
        {
            builder.HasKey(s => s.UniqueKey);
            builder.ToTable("ContactPerson".ToLower());
        }
    }
}