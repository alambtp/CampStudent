sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'student.app.studentapp',
            componentId: 'StudentDetailsObjectPage',
            contextPath: '/StudentDetails'
        },
        CustomPageDefinitions
    );
});