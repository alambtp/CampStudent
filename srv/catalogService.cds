using { student.db.transaction  } from '../db/datamodel';

service CatalogService@(path: '/CatalogService') {

    //entity StudentSet as projection on transaction.students;
    entity MarksSet as projection on transaction.marks;

    entity StudentDetails @( 
        title: '{i18n>studentDetails}') as projection on transaction.students{
            *,
            Marks: redirected to MarksDetails
        }actions{
            function getTopper() returns array of StudentDetails;
            action upGrade();
        }
        // http://localhost:4004/CatalogService/POs
        // http://localhost:4004/CatalogService/POs('5P29FC40CA471067B31D00DD0106DA01')?$expand=Items


        entity MarksDetails @( title: '{i18n>marksDetails}' )
         as projection on transaction.marks{
            *,
            PARENT_KEY: redirected to StudentDetails
         }
        // http://localhost:4004/CatalogService/POItems('4P29FC40CA471067B31D00DD01LD1010')
        // http://localhost:4004/CatalogService/POItems('4P29FC40CA471067B31D00DD01LD1010')?$expand=PARENT_KEY,PRODUCT_GUID

}
