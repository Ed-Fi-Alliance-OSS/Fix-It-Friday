/*
INSERT INTO fif.StaffSectionAssociation
    (StaffKey, SectionKey, BeginDate, EndDate
    )
*/
SELECT
    ssa.StaffUSI as StaffKey, ssa.SectionIdentifier as SectionKey, ssa.BeginDate as BeginDate, ssa.EndDate as EndDate
FROM edfi.StaffSectionAssociation ssa

