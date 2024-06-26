using CatalogService as service from '../../srv/catalogService';

annotate service.StudentDetails with @(UI: {
    SelectionFields              : [
        roll,
        nameMiddle,
        class,
        grade
    ],
    LineItem                     : [
        {
            $Type: 'UI.DataField',
            Label: '{i18n>roll}',
            Value: roll,            
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>fName}',
            Value: nameFirst,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>mName}',
            Value: nameMiddle,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>lName}',
            Value: nameLast,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>gender}',
            Value: sex,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>fMarks}',
            Value: FinalMarks,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>pNumber}',
            Value: phoneNumber,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>email}',
            Value: email,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>grade}',
            Value: grade,
        },
    ],
    HeaderInfo                   : {
        $Type         : 'UI.HeaderInfoType',
        TypeName      : '{i18n>student}',
        TypeNamePlural: '{i18n>students}',
        Title         : {
            Label: '{i18n>roll}',
            Value: roll
        },
        Description   : {
            Label: '{i18n>mName}',
            Value: nameMiddle
        },
        ImageUrl      : 'data:image/jpeg;base64,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',
    },
    Facets                       : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>genralInfo}',
            Target: ![@UI.FieldGroup#HeaderGeneralInfo]
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>marksDetails}',
            Target: 'Marks/@UI.LineItem',
        }
    ],
    FieldGroup #HeaderGeneralInfo: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: '{i18n>fName}',
                Value: nameFirst,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>mName}',
                Value: nameMiddle,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>lName}',
                Value: nameLast,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>roll}',
                Value: roll,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>class}',
                Value: class,
            },
            {
                $Type : 'UI.DataField',
                Label: '{i18n>gender}',
                Value : sex,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>fMarks}',
                Value: FinalMarks,
            }
        ]
    },
});

annotate CatalogService.MarksDetails with @(UI: {LineItem: [
    {
        $Type: 'UI.DataField',
        Label: '{i18n>roll}',
        Value: roll,
    },
    {
        $Type: 'UI.DataField',
        Label: '{i18n>subject}',
        Value: subject,
    },
    {
        $Type: 'UI.DataField',
        Label: '{i18n>tMarks}',
        Value: totalMarks,
    },
    {
        $Type: 'UI.DataField',
        Label: '{i18n>oMarks}',
        Value: obtainedMarks,
    }
]});

// Roll F4 Help
annotate service.StudentDetails with {
    roll @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'StudentDetails',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: roll,
                ValueListProperty: 'roll',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'nameMiddle',
            }
        ],
    }
};
// Middle F4 Help
annotate service.StudentDetails with {
    nameMiddle @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'StudentDetails',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: nameMiddle,
                ValueListProperty: 'nameMiddle',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'nameLast',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'roll',
            }
        ],
    }
};

// Class F4 Help
annotate service.StudentDetails with {
    class @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'Class',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: class,
                ValueListProperty: 'clCode',
            },{
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'clName',
            },
        ],
    }
};
// Grade F4 Help
annotate service.StudentDetails with {
    grade @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'StudentDetails',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: grade,
                ValueListProperty: 'grade',
            }
        ],
    }
};
// Marks Roll F4 Help
annotate service.MarksDetails with {
    roll @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'StudentDetails',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: roll,
                ValueListProperty: 'roll',
            }
        ],
    }
};
// Marks Roll F4 Help
annotate service.MarksDetails with {
    subject @Common.ValueList: {
        $Type         : 'Common.ValueListType',
        CollectionPath: 'SubjectSet',
        Parameters    : [
            {
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: subject,
                ValueListProperty: 'subName',
            },
            {
                $Type            : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty: 'subCode',
            }
        ],
    }
};
