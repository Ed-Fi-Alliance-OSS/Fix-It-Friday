SELECT
    p.ParentUSI as ContactPersonKey,
    s.StudentUSI as StudentKey
FROM edfi.Student s
    -- Contact Info
    INNER JOIN edfi.StudentParentAssociation spa ON s.StudentUSI = spa.StudentUSI
    INNER JOIN edfi.Parent p ON spa.ParentUSI = p.ParentUSI;

