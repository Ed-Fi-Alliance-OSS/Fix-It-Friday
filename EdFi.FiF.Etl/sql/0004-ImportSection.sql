/*
INSERT INTO fif.Section
    (SectionKey, SchoolKey, LocalCourseCode, SessionName, SectionIdentifier, SchoolYear
    )
*/
SELECT
    s.SectionIdentifier as SectionKey,
    s.SchoolId As SchoolKey,
    s.LocalCourseCode,
    s.SessionName,
    s.SectionIdentifier,
    s.SchoolYear
FROM edfi.Section s
