const User = require('../models/User');
const upload = require('../middleware/multerConfig');
const path = require('path'); // Import the 'path' module

const avatarController = {};

avatarController.uploadAvatar = upload.single("avatar");

avatarController.updateAvatar = async (req, res) => {
    try {
        const userId = req.user.id; // Get the logged-in user's ID from the authentication middleware

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if an avatar file was uploaded
        if (req.file) {
            const avatarFileName = path.basename(req.file.path); // Get the file name

            user.profile.avatar = avatarFileName; // Construct the correct relative path
        }

        // Save the updated user data
        await user.save();

        // Modify the response avatar URL to use the relative path
        const modifiedUserResponse = { ...user.toObject() };
        modifiedUserResponse.profile.avatar = user.profile.avatar;

        res.status(200).json({ success: true, message: 'Avatar updated successfully', user: modifiedUserResponse });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ success: false, message: 'Avatar update failed' });
    }
};

module.exports = avatarController;
