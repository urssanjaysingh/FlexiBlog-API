const multer = require("multer");
const path = require("path");

// Serve uploaded files from the 'uploads' directory
const uploadsPath = path.normalize(path.join(__dirname, '..', 'uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExtension = file.originalname.split('.').pop();
        // Generate the filename with just the uniqueSuffix and fileExtension
        const filename = "file-" + uniqueSuffix + "." + fileExtension;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

// Function to generate relative path from uploaded file
upload.generateRelativePath = (filename) => {
    return '/images/' + filename; // Adjust the path as needed
};

module.exports = upload;
