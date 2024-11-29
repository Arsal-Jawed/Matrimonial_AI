const db = require('../config');

const addImage = (req,res) => {

    const {email} = req.body;
    const photoFile = req.files.image;
    const safeEmail = email.replace(/[@.]/g, "_");
    const imageFileName = `${safeEmail}_${photoFile.name}`;
    const urlname = `/Profile_Images/${imageFileName}`;
    const filePath = `D:/AREX Projects/The Matrimonial/Client/matrimonial/public/Profile_Images/${imageFileName}`;

    photoFile.mv(filePath, async(err) => {

        if(err){res.status(500).send("Error Uploading Image");}
        else{

            db.query('insert into images(email,image) values(?,?)',[email,urlname],(err,result) => {
                if(err){res.status(500).send("Error Uploading Image");}
                else{
                    res.status(200).send("Image Uploaded Successfully");
                }
            });
        }
    });
};

const deleteImage = (req, res) => {

    const { email, imageUrl } = req.body;

    db.query('delete from images where email = ? AND image = ?', [email,imageUrl], (err, result) => {
        if (err) { res.status(500).send("Error Deleting Image"); }
        else {
            res.status(200).send("Image Deleted Successfully");
        }
    });
};

const getImages = (req, res) => {

    const { email } = req.query;

    db.query('select image from images where email = ?', [email], (err, result) => {
        if (err) { 
            res.status(500).send("Error Retrieving Images"); 
        } else if (result.length === 0) { 
            res.status(404).send("No Images Found"); 
        } else {
            res.status(200).json(result);
        }
    });
};

const updateProfileImage = (req, res) => {

    const { email, imageUrl } = req.body;

    db.query('UPDATE profiles SET profile_image = ? WHERE email = ?', [imageUrl, email], (err, result) => {
        if (err) {
            res.status(500).send("Error Updating Profile Image");
        } else if (result.affectedRows === 0) {
            res.status(404).send("Profile Not Found");
        } else {
            res.status(200).send("Profile Image Updated Successfully");
        }
    });
};

module.exports = { addImage,deleteImage,getImages,updateProfileImage };