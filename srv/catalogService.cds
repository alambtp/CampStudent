using { student.db.transaction, student.db.master  } from '../db/datamodel';

service CatalogService@(path: '/CatalogService') {

    //entity StudentSet as projection on transaction.students;
    entity MarksSet as projection on transaction.marks;
    entity SubjectSet as projection on master.subject;
    entity Class as projection on master.class;

    entity StudentDetails @( 
        title: '{i18n>studentDetails}',
        odata.draft.enabled: true
        ) as projection on transaction.students{
            *,
            @mandatory nameFirst, 
            @mandatory nameMiddle,
            //@readonly FinalMarks,
            @readonly inWord,
            Marks: redirected to MarksDetails
        }actions{
            function getTopper() returns array of StudentDetails;
            action upGrade();
        }
//UI F4 Label 
        annotate CatalogService.StudentDetails with {
            roll @title : 'Roll';
            nameMiddle @title : 'Name';
            class @title : 'Class';
            grade @title : 'Grade';
        };
        
        // http://localhost:4004/CatalogService/POs
        // http://localhost:4004/CatalogService/POs('5P29FC40CA471067B31D00DD0106DA01')?$expand=Items


        entity MarksDetails @( title: '{i18n>marksDetails}' )
         as projection on transaction.marks{
            *,
            @readonly roll,
            PARENT_KEY: redirected to StudentDetails
         }
        // http://localhost:4004/CatalogService/POItems('4P29FC40CA471067B31D00DD01LD1010')
        // http://localhost:4004/CatalogService/POItems('4P29FC40CA471067B31D00DD01LD1010')?$expand=PARENT_KEY,PRODUCT_GUID

}
