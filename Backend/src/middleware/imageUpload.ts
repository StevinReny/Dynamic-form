import multer, { diskStorage } from "multer";
import path from "path"
import crypto from "crypto"
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
          const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(6).toString("hex");
        cb(null,file.fieldname+"_"+uniqueSuffix+path.extname(file.originalname))
    }
})

const filefilter=function(req,file,cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb(new Error("Only images are allowed to upload"),false)
    }
    cb(null,true)
}

const upload=multer({
    storage:storage,
    // fileFilter:filefilter,
    limits:{
        fileSize:1024*1024*2,
        files:10
    }

})


export const uploadMultiple=upload.any()