const cds = require('@sap/cds')
module.exports = function(){
    const {
        StudentDetails, MarksSet
    } = this.entities;

    this.before('UPDATE', 'MarksSet', async req=>{
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