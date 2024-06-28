const cds = require('@sap/cds')
module.exports = function(){
    const {
        StudentDetails, MarksSet
    } = this.entities;

    this.before('CREATE', 'StudentDetails', async req=>{
        console.log("Creating New Student entry");
        console.log(req.data);

        //Fill the Roll No. automatically**************************
        console.log("Get the Highest Roll No.");
        const tx = cds.tx(req);
        const stds = await tx.read(StudentDetails).orderBy({
            roll: 'desc'
        }).limit(1);
        console.log(stds[0].roll );
        req.data.roll = parseInt( stds[0].roll ) + 1;
        //************************************************ */
        var fTotal = 0;
        for(let i = 0; i< req.data.Marks.length; i++  ){
            //Validation for Obtained marks
            console.log("A" + req.data.Marks.length);
            if(parseFloat(req.data.Marks[i].obtainedMarks) > 100){
                let msg = req.data.Marks[i].subject + " obtained Marks must <= 100";
                req.error(500, msg);
            }
            // Update Roll no automatically in Marks
            //console.log("A" + req.data.roll);
            req.data.Marks[i].roll = req.data.roll; 
            // Calculate the final obtain marks.
            fTotal = fTotal + req.data.Marks[i].obtainedMarks; 
        }
        console.log('Total marks' + fTotal);
        // Assigning the obtained final marks.
        req.data.FinalMarks = fTotal;
        req.data.inWord = numbToWord(fTotal);
    });

    this.before('UPDATE', 'StudentDetails', async req=>{
        console.log("Students is getting updated.. ");
        // console.log(req.data);
        // if(parseFloat(req.data.Marks[0].obtainedMarks) > 100){
        //     req.error(500, "Obtained Marks must <= 100");
        // }
        var fTotal = 0;
        for(let i = 0; i< req.data.Marks.length; i++  ){
            //Validation for Obtained marks
            if(parseFloat(req.data.Marks[i].obtainedMarks) > 100){
                let msg = req.data.Marks[i].subject + " obtained Marks must <= 100";
                req.error(500, msg);
            }
            // Update Roll no automatically in Marks
            req.data.Marks[i].roll = req.data.roll; 
            // Calculate the final obtain marks.
            fTotal = fTotal + req.data.Marks[i].obtainedMarks; 
        }
        // Assigning the obtained final marks.
        req.data.FinalMarks = fTotal;

        //Validation for total marks
        for(let i = 0; i< req.data.Marks.length; i++  ){
            if(parseFloat(req.data.Marks[i].totalMarks) > 100){
                let msg = req.data.Marks[i].subject + " Total Marks must <= 100";
                req.error(500, msg);
            }  
        }
    });

    this.before('UPDATE', 'MarksDetails', async req=>{
        console.log("Marks is getting updated ");
        if(parseFloat(req.data.obtainedMarks) > 100){
            req.error(500, "Obtained Marks must <= 100");
        }
        if(parseFloat(req.data.totalMarks) > 100){
            req.error(500, "Total Marks must <= 100");
        }
    });
    
    this.on('getTopper', async req =>{
        try{
            const ID = req.params[0];
            console.log('Topper' + req.params);
            const tx = cds.tx(req);
            const repl = await tx.read(StudentDetails).orderBy({
                FinalMarks: 'desc'
            }).limit(1);
            return repl;
        }catch (error){
            return "Error " + error.toString();
        }
    });

    this.on('upGrade', async req =>{
        try {
            const ID = req.params[0];
            console.log(req.params[0]);
            console.log("Your Grade --->" + ID + "will be increased");
            const tx = cds.tx(req);
            await tx.update(StudentDetails).with({
                grade: "B"
            }).where({ ID : ID });
            return {};
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    function numbToWord(n) {
        if (n < 0)
            return false;
        
        // Arrays to hold words for single-digit, double-digit, and below-hundred numbers
        single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
        double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
        below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
        
        if (n === 0) return 'Zero';
        
        // Recursive function to translate the number into words
        function translate(n) {
            let word = "";
            if (n < 10) {
                word = single_digit[n] + ' ';
            } else if (n < 20) {
                word = double_digit[n - 10] + ' ';
            } else if (n < 100) {
                let rem = translate(n % 10);
                word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem;
            } else if (n < 1000) {
                word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100);
            } else if (n < 1000000) {
                word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000);
            } else if (n < 1000000000) {
                word = translate(parseInt(n / 1000000)).trim() + ' Million ' + translate(n % 1000000);
            } else {
                word = translate(parseInt(n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000);
            }
            return word;
        }
        
        // Get the result by translating the given number
        let result = translate(n);
        return result.trim() + '.';
    }

}