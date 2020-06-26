SELECT DISTINCT
    ssa.id as studentsectionkey,
    ssa.schoolid as studentschoolkey,
    ssa.studentusi as studentkey,
    ssa.sectionidentifier as sectionkey,
    ssa.localcoursecode as localcoursecode,
    cd.codevalue as 'subject',
    c.coursetitle as coursetitle,
    'todo' as teachername,
    ssa.begindate as studentsectionstartdatekey,
    ssa.enddate as studentsectionenddatekey,
    sec.schoolid as schoolkey,
    ssa.schoolyear as schoolyear
FROM edfi.StudentSectionAssociation ssa
    INNER JOIN edfi.Section sec ON ssa.SectionIdentifier = sec.SectionIdentifier
    INNER JOIN edfi.StaffSectionAssociation stsa on sec.SectionIdentifier = stsa.SectionIdentifier
    INNER JOIN edfi.Course c ON c.CourseCode = sec.LocalCourseCode
    INNER JOIN edfi.Descriptor cd ON c.AcademicSubjectDescriptorId = cd.DescriptorId
