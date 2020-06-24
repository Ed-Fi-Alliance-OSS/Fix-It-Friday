SELECT DISTINCT
	p.ParentUniqueId as UniqueKey,
	p.ParentUSI as ContactPersonKey,
	s.StudentUSI as StudentKey,
	p.FirstName as ContactFirstName,
	p.LastSurname as ContactLastName,
	spad.CodeValue as RelationshipToStudent,
	pa.StreetNumberName as StreetNumberName,
	pa.ApartmentRoomSuiteNumber as ApartmentRoomSuiteNumber,
	d.CodeValue as 'State',
	pa.PostalCode as PostalCode,
	pt.TelephoneNumber as PhoneNumber,
	pe.ElectronicMailAddress as PrimaryEmailAddress,
	spa.PrimaryContactStatus as IsPrimaryContact,
	NULL as PreferredContactMethod,
	NULL as BestTimeToContact,
	NULL As ContactNotes
From edfi.Student s
			-- Contact Info
			LEFT JOIN edfi.StudentParentAssociation spa ON s.StudentUSI = spa.StudentUSI and PrimaryContactStatus = 1
				LEFT JOIN edfi.Parent p ON spa.ParentUSI = p.ParentUSI
					LEFT JOIN edfi.ParentTelephone pt ON p.ParentUSI = pt.ParentUSI and pt.OrderOfPriority = 1
					LEFT JOIN (Select *, RANK() over(Partition by ParentUSI order by ElectronicMailTypeDescriptorId) as R from edfi.ParentElectronicMail) pe ON p.ParentUSI = pe.ParentUSI and pe.R = 1
				LEFT JOIN edfi.Descriptor as spad on spa.RelationDescriptorId = spad.DescriptorId
				LEFT JOIN edfi.ParentAddress pa ON p.ParentUSI = pa.ParentUSI
				LEFT JOIN edfi.Descriptor d ON pa.StateAbbreviationDescriptorId = d.DescriptorId;

