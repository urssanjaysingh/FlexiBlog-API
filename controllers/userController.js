const User = require('../models/User');

const userController = {};

userController.getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the authentication middleware
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Include the additional user profile information
    const userProfile = {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.profile.name,
      bio: user.profile.bio,
      avatar: user.profile.avatar
    };

    return res.json(userProfile);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

userController.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the authentication middleware
    
    const { name, bio, avatar } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's profile information
    user.profile.name = name;
    user.profile.bio = bio;
    user.profile.avatar = avatar;
    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Profile update failed' });
  }
};

module.exports = userController;
