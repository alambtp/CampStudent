const cds = require('@sap/cds')
module.exports = function(){
    const {
        StudentDetails, MarksSet
    } = this.entities;

    this.before('CREATE', 'StudentDetails', async req=>{
        console.log("Creating New Student entry");
        console.log(req.data);
        
        var fTotal = 0;
        for(let i = 0; i< req.data.Marks.length; i++  ){
            //Validation for Obtained marks
            console.log("A" + req.data.Marks.length);
            if(parseFloat(req.data.Marks[i].obtainedMarks) > 100){
                let msg = req.data.Marks[i].subject + " obtained Marks must <= 100";
                req.error(500, msg);
            }
            // Update Roll no automatically in Marks
            console.log("A" + req.data.roll);
            req.data.Marks[i].roll = req.data.roll; 
            // Calculate the final obtain marks.
            console.log("B");
            fTotal = fTotal + req.data.Marks[i].obtainedMarks; 
        }
        console.log(fTotal);
        // Assigning the obtained final marks.
        req.data.FinalMarks = fTotal;
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

}