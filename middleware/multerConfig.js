const multer = require("multer");
const path = require("path");

// Serve avatar files from the 'uploads/avatars' directory
const avatarsPath = path.normalize(path.join(__dirname, '..', 'avatars'));

// Configure multer for avatar uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarsPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        // Generate the filename with just the uniqueSuffix and fileExtension
        const filename = "avatar-" + uniqueSuffix + "." + fileExtension;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

// Function to generate relative path from uploaded avatar file
upload.generateRelativePath = (filename) => {
    return '/avatars/' + filename; // Adjust the path as needed
};

module.exports = upload;
