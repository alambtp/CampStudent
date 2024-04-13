namespace student.common;
using { Currency } from '@sap/cds/common';


type Gender      : String(1) enum {
    male         = 'M';
    female       = 'F';
    nonBinary    = 'N';
    noDisclosure = 'D';
    selfDescribe = 'S';
};

type AmountT : Decimal(15,2)@(
    Semantics.amount.currencyCode: 'CURRRENCY',
    sap.unit: 'CURRRENCY'
);

abstract entity Amount {
    CURRENCY: Currency;
    FEE : AmountT;
}

type PhoneNumber : String(30) @assert.format: '^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$';
type Email       : String(255) @assert.format: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';

