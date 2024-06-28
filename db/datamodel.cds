namespace student.db;
using { student.common } from './common';

using {cuid, Language} from '@sap/cds/common';

context master {
        entity subject {
        key id : String(2);
        subCode: String(10);
        subName: String(100);
    }

    entity class {
        key id : String(2);
        clCode: String(10);
        clName: String(100);
    }
}

context transaction {
    entity students : cuid, common.Amount {
        nameFirst   : String(10);
        nameMiddle  : String(20);
        nameLast    : String(15);
        roll        : String(10);
        sex         : common.Gender;
        language    : Language;
        phoneNumber : common.PhoneNumber;
        email       : common.Email;
        class       : String(10);
        // currency    : Currency;
        // fee         : Decimal(5, 2);
        FinalMarks  : Decimal(5, 2);
        inWord      : localized String(255);
        grade       : String(1);
        Marks: Composition of many marks on Marks.PARENT_KEY = $self;
        cls: Association to one master.class on cls.id = class;
        //cls.clName;
    }

    entity marks : cuid {
        roll          : String(10);
        PARENT_KEY    : Association to students;
        subject       : String(25);
        totalMarks    : Decimal(5, 2);
        obtainedMarks : Decimal(5, 2);
    }

}
