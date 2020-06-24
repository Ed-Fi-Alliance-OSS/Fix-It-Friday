SELECT DISTINCT
    ssa.StaffUSI as StaffKey,
    ssa.SectionIdentifier as SectionKey,
    ssa.BeginDate as BeginDate,
    ssa.EndDate as EndDate
FROM edfi.StaffSectionAssociation ssa

