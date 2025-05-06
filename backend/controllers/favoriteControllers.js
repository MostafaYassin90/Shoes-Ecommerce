import UserModel from './../models/userModel.js';

/* ---------  Add To Favorite -------------- */
const addAndRemoveFavorite = async (req, res) => {

  try {
    const { productId } = req.body;
    const { id } = req.user;
    // Find User
    const user = await UserModel.findById(id);
    let favoriteItems = await user.favoriteItems; // []
    if (favoriteItems.includes(productId)) {
      favoriteItems = favoriteItems.filter((item) => item !== productId);
      return res.status(201).json({ success: true, message: "Removed From Favorite" });
    } else {
      favoriteItems.push(productId);
      return res.status(201).json({ success: true, message: "Added To Favorite" });
    }
    await UserModel.findByIdAndUpdate(id, {
      $set: {
        favoriteItems: favoriteItems
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};


/* ---------  Get Favorite Items -------------- */
const getFavoriteItems = async (req, res) => {

  try {
    const { id } = req.user;
    // Find User
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    const favoriteItems = await user.favoriteItems;

    return res.status(200).json({ success: true, favoriteItems: favoriteItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};


export { addAndRemoveFavorite, getFavoriteItems };