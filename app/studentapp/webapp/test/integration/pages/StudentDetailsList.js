sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'student.app.studentapp',
            componentId: 'StudentDetailsList',
            contextPath: '/StudentDetails'
        },
        CustomPageDefinitions
    );
});