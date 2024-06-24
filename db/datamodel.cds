namespace student.db;
using { student.common } from './common';

using {cuid, Language} from '@sap/cds/common';

context master {
        entity subject {
        key id : String(2);
        subCode: String(10);
        subName: String(100);
    }
}

context transaction {
    entity students : cuid, common.Amount {
        nameFirst   : String(40);
        nameMiddle  : String(40);
        nameLast    : String(40);
        roll        : String(10);
        sex         : common.Gender;
        language    : Language;
        phoneNumber : common.PhoneNumber;
        email       : common.Email;
        class       : String(25);
        // currency    : Currency;
        // fee         : Decimal(15, 2);
        FinalMarks  : Decimal(15, 2);
        inWord      : localized String(255);
        grade       : String(1);
        Marks: Composition of many marks on Marks.PARENT_KEY = $self
    }

    entity marks : cuid {
        roll          : String(10);
        PARENT_KEY    : Association to students;
        subject       : String(25);
        totalMarks    : Decimal(15, 2);
        obtainedMarks : Decimal(15, 2);
    }

}
