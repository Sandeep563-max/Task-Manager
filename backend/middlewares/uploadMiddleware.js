import multer from "multer";

//Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Specify the destination folder for uploaded files  
    },
    filename:  (req, file, cb)  => {
        cb(null, `${Date.now()}-${file.originalname}`); // Specify the filename for uploaded files
    },
});

//File filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, JPG and PNG files are allowed"), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;