sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'student.app.studentapp',
            componentId: 'MarksDetailsObjectPage',
            contextPath: '/StudentDetails/Marks'
        },
        CustomPageDefinitions
    );
});