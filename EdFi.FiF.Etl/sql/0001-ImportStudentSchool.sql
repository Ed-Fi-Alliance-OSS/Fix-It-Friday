SELECT
	seoa.Id as StudentSchoolKey,
	seoa.StudentUSI as StudentKey,
	seoa.EducationOrganizationId as SchoolKey,
	ssa.SchoolYear as SchoolYear,
	s.FirstName as StudentFirstName,
	s.MiddleName as StudentMiddleName,
	s.LastSurname as StudentLastName,
	ssa.EntryDate As EnrollmentDateKey,
	gld.CodeValue As GradeLevel,
	lep.CodeValue As LimitedEnglishProficiency,
	seoa.HispanicLatinoEthnicity As IsHispanic,
	sd.CodeValue As Sex
From edfi.Student s
	-- Demogs reported at the district level
	INNER JOIN edfi.StudentEducationOrganizationAssociation seoa on s.StudentUSI = seoa.StudentUSI
	INNER JOIN edfi.EducationOrganization eo on seoa.EducationOrganizationId = eo.EducationOrganizationId
	INNER JOIN edfi.Descriptor sd on seoa.SexDescriptorId = sd.DescriptorId
	LEFT JOIN edfi.Descriptor lep on seoa.LimitedEnglishProficiencyDescriptorId = lep.DescriptorId
	-- Enrollment
	INNER JOIN edfi.StudentSchoolAssociation ssa on s.StudentUSI = ssa.StudentUSI
	INNER JOIN edfi.EducationOrganization so on ssa.SchoolId = so.EducationOrganizationId
	INNER JOIN edfi.Descriptor gld on ssa.EntryGradeLevelDescriptorId = gld.DescriptorId;
