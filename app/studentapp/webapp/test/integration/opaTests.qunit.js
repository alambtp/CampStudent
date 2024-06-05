sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'student/app/studentapp/test/integration/FirstJourney',
		'student/app/studentapp/test/integration/pages/StudentDetailsList',
		'student/app/studentapp/test/integration/pages/StudentDetailsObjectPage',
		'student/app/studentapp/test/integration/pages/MarksDetailsObjectPage'
    ],
    function(JourneyRunner, opaJourney, StudentDetailsList, StudentDetailsObjectPage, MarksDetailsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('student/app/studentapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStudentDetailsList: StudentDetailsList,
					onTheStudentDetailsObjectPage: StudentDetailsObjectPage,
					onTheMarksDetailsObjectPage: MarksDetailsObjectPage
                }
            },
            opaJourney.run
        );
    }
);