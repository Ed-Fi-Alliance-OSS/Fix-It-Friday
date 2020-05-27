﻿// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

using EdFi.FIF.Core.Data;
using EdFi.FIF.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdFi.FIF.Data.Repositories
{
    public class SectionRepository : ISectionRepository
    {
        private readonly FIFContext _db;

        public SectionRepository(FIFContext db)
        {
            _db = db;
        }

        public async Task<IReadOnlyList<Section>> All()
        {
            return await _db.Sections.OrderBy(x => x.SectionKey).ToListAsync();
        }

        public async Task<Section> Get(string sectionKey)
        {
            return await _db.Sections.FirstOrDefaultAsync(p => p.SectionKey == sectionKey);
        }

        public async Task<IReadOnlyList<Section>> GetBySectionList(List<StaffSectionAssociation> staffSectionAssociations)
        {
            return await _db.Sections.Where(x => staffSectionAssociations.Select(p => p.SectionKey).Contains(x.SectionKey)).OrderBy(x => x.SectionKey).ToListAsync();
        }
    }
}
