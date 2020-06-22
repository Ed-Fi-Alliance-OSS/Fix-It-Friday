/*
INSERT INTO fif.Staff
    (StaffKey, PersonalTitlePrefix, FirstName, MiddleName, LastSurname, StaffUniqueId
    )
*/
SELECT
    s.*,
    s.StaffUSI as StaffKey,
    s.PersonalTitlePrefix as PersonalTitlePrefix,
    s.FirstName as FirstName,
    s.MiddleName as MiddleName,
    s.LastSurname as LastSurname,
    s.StaffUniqueId as StaffUniqueId
FROM edfi.Staff s
