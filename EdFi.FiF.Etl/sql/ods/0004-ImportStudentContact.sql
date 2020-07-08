SELECT DISTINCT
	CONCAT(p.parentuniqueid, '-', s.StudentUniqueId) as uniquekey,
	CONCAT(s.StudentUniqueId, '-', ssa.SchoolId) as studentkey
From edfi.Student s
    INNER JOIN
        edfi.StudentSchoolAssociation ssa ON
            S.StudentUSI = ssa.StudentUSI
			LEFT JOIN edfi.StudentParentAssociation spa ON ssa.StudentUSI = spa.StudentUSI
				LEFT JOIN edfi.Parent p ON spa.ParentUSI = p.ParentUSI
WHERE(
    ssa.ExitWithdrawDate IS NULL
    OR ssa.ExitWithdrawDate >= GETDATE());
