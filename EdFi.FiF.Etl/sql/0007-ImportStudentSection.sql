SELECT
    ssa.Id as StudentSectionKey, ssa.SchoolId as StudentSchoolKey, ssa.StudentUSI as StudentKey, ssa.SectionIdentifier as SectionKey, ssa.LocalCourseCode as LocalCourseCode, cd.CodeValue as 'Subject', c.CourseTitle as CourseTitle, 'TODO' as TeacherName, ssa.BeginDate as StudentSectionStartDateKey, ssa.EndDate as StudentSectionEndDateKey, sec.SchoolId as SchoolKey, ssa.SchoolYear as SchoolYear
FROM edfi.StudentSectionAssociation ssa
    INNER JOIN edfi.Section sec ON ssa.SectionIdentifier = sec.SectionIdentifier
    INNER JOIN edfi.StaffSectionAssociation stsa on sec.SectionIdentifier = stsa.SectionIdentifier
    INNER JOIN edfi.Course c ON c.CourseCode = sec.LocalCourseCode
    INNER JOIN edfi.Descriptor cd ON c.AcademicSubjectDescriptorId = cd.DescriptorId
