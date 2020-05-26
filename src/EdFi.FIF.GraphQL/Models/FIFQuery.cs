﻿using EdFi.FIF.GraphQL.Helpers;
using GraphQL.Types;
// ReSharper disable InconsistentNaming

namespace EdFi.FIF.GraphQL.Models
{
    public class FIFQuery : ObjectGraphType
    {
        public FIFQuery(ContextServiceLocator contextServiceLocator)
        {
            Field<ListGraphType<StaffType>>(
                "staff",
                resolve: (context) => contextServiceLocator.StaffRepository.All()
            );

            Field<ListGraphType<StudentSchoolType>>(
                "students",
                resolve: (context) => contextServiceLocator.StudentSchoolRepository.All()
            );

            Field<StudentSchoolType>(
                "student",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "studentschoolkey" }),
                resolve: (context) => contextServiceLocator.StudentSchoolRepository.Get(context.GetArgument<string>("studentschoolkey"))
            );

            Field<ListGraphType<ContactPersonType>>(
                "contactperson",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "uniquekey" }),
                resolve: (context) => contextServiceLocator.ContactPersonRepository.Get(context.GetArgument<string>("uniquekey"))
            );

            Field<StaffType>(
                "sectionsbystaff",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "staffkey" }),
                resolve: (context) => contextServiceLocator.StaffRepository.Get(context.GetArgument<int>("staffkey"))
            );

            Field<ListGraphType<StudentSectionType>>(
                "studentsbysection",
                arguments: new QueryArguments(new QueryArgument<StringGraphType> { Name = "sectionkey" }),
                resolve: (context) => contextServiceLocator.StudentSectionRepository.GetBySection(context.GetArgument<string>("sectionkey"))
            );
        }
    }
}