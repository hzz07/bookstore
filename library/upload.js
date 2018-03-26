const multer =require('multer');
const storage =multer.diskStorage({
    destination:function (req,file,cd ) {
        console.log(file);
        cd (null,'./public/uploads')
    },
    filename:function (req,file,cd) {
        let fileFormat =(file.originalname).split('.');
        cd (null,file.fieldname+'-'+Date.now()+'.'+fileFormat[fileFormat.length-1]);

    }
});
const upload=multer({
    storage:storage
});
module.exports=upload;