const db = require('../config');
const { Encrypt, Decrypt } = require('../Modules/ByCrypt');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { username, email, password, gender } = req.body;

  try {
    const hashedPassword = await Encrypt(password);
    const query = `INSERT INTO users (username, email, password, gender) VALUES (?, ?, ?, ?)`;
    const nsfw = `INSERT INTO NSFW (email,Warnings) VALUES (?,?)`;

    db.query(query, [username, email, hashedPassword, gender], (err, result) => {
      if (err) {
        res.status(500).send('Failed to create user');
      } else {

        db.query(nsfw,[email,0], (err,result) => {
          if(err){res.status(500).send("Failed to Finish Account Creating");}
          else{
            res.status(201).send('User created successfully');
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send('Failed to encrypt password');
  }
};

const createProfile = (req , res) => {
  
  const {email,country,city,religion,maritalStatus,occupation,education,build,children,smoking,drinking,description} = req.body;
  const photoFile = req.files.image;
  const safeEmail = email.replace(/[@.]/g, "_");
  const imageFileName = `${safeEmail}_${photoFile.name}`;
  const urlname = `/Profile_Images/${imageFileName}`;
  const filePath = `D:/AREX Projects/The Matrimonial/Client/matrimonial/public/Profile_Images/${imageFileName}`;

  photoFile.mv(filePath, async(err)=>{

    if(err){res.status(500); console.log(err);}else{

        db.query("insert into profiles(email,country,city,religion,maritalStatus,occupation,education,build,children,smoking,drinking,description,profile_image) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [email,country,city,religion,maritalStatus,occupation,education,build,children,smoking,drinking,description,urlname],(err,result)=>{
            if(err){res.status(500); console.log(err);}else{
                res.status(200).json("Profile Added Successfully"); console.log("Profile Added Successfully");
            }
        })
    }
  });
}

const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, userResult) => {
    if (err) {
      res.status(500).send('Error retrieving user');
      console.log(err);
      return;
    }

    if (userResult.length === 0) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const user = userResult[0];

    try {
      const isMatch = await Decrypt(password, user.password);

      if (!isMatch) {
        res.status(401).send('Invalid email or password');
        return;
      }
      db.query("SELECT * FROM profiles WHERE email = ?", [email], (err, profileResult) => {
        if (err) {
          res.status(500).send('Error retrieving profile');
          console.log(err);
          return;
        }

        const profile = profileResult.length > 0 ? profileResult[0] : null;
        const combinedData = { ...user, profile };

        res.status(200).json(combinedData);
      });
    } catch (error) {
      res.status(500).send('Error comparing passwords');
    }
  });
};

const getProfiles = (req, res) => {
    db.query("SELECT * FROM users", (err, usersResult) => {
        if (err) {
            res.status(500).send('Failed to retrieve users');
            console.log(err);
            return;
        }
        db.query("SELECT p.*, s.state as state FROM profiles p JOIN states s ON p.email = s.email", (err, profilesResult) => {
            if (err) {
                res.status(500).send('Failed to retrieve profiles');
                console.log(err);
                return;
            }
            const combinedData = usersResult.map(user => {
                const profile = profilesResult.find(profile => profile.email === user.email) || {};
                return { ...user, profile };
            });
            res.status(200).json(combinedData);
        });
    });
};


const getProfileByEmail = (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    res.status(400).send('Email is required');
    return;
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, usersResult) => {
    if (err) {
      res.status(500).send('Failed to retrieve user');
      console.log(err);
      return;
    }
    
    if (usersResult.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    db.query("SELECT * FROM profiles WHERE email = ?", [email], (err, profilesResult) => {
      if (err) {
        res.status(500).send('Failed to retrieve profile');
        console.log(err);
        return;
      }
      
      const user = usersResult[0];
      const profile = profilesResult[0] || {};
      const combinedData = { ...user, profile };
      console.log(combinedData);
      res.status(200).json(combinedData);
    });
  });
};

const ForgetPassword = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to Retrieve Email" });
      return;
    } else {
      if (result.length === 0) {
        res.status(401).json({ message: "Email Not Found" });
      } else {
        res.status(200).send("Success");
      }
    }
  });
};

const UpdatePassword = (req, res) => {
  const { email, newPassword } = req.body;

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send("Failed to Hash Password");
      return;
    }

    db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email], (err, result) => {
      if (err) {
        res.status(500).send("Failed to Update Password");
      } else {
        res.status(200).send("Password Updated Successfully");
      }
    });
  });
};
const saveState = (req,res) => {

  const {email} = req.body;

  db.query('INSERT INTO states(email,state) values(?,?)',[email,'offline'],(err,result) => {

    if(err){
      res.status(500).send("Failed to Save State");
    }else{
      res.status(200).send("State Saved Successfully");
    }
  });
};

const online = (req,res) => {

  const {email} = req.body;

  db.query('UPDATE states SET state = ? WHERE email = ?',['online',email],(err,result) => {

    if(err){
      res.status(500).send("Failed to Online");
    }else{
      res.status(200).send("Online Successfully");
    }    
  });
};

const offline = (req,res) => {

  const {email} = req.body;

  db.query('UPDATE states SET state = ? WHERE email = ?',['offline',email],(err,result) => {

    if(err){
      res.status(500).send("Failed to Offline");
    }else{
      res.status(200).send("Offline Successfully");
    }    
  });
};

const updateProfile = (req,res) => {

  const {email,country,city,religion,maritalStatus,occupation,education,build,children,smoking,drinking,description} = req.body;
  console.log(email);
  db.query(
    "UPDATE profiles SET country = ?, city = ?, religion = ?, maritalStatus = ?, occupation = ?, education = ?, build = ?, children = ?, smoking = ?, drinking = ?, description = ? WHERE email = ?",
    [country, city, religion, maritalStatus, occupation, education, build, children, smoking, drinking, description, email],
    (err, result) => {
        if (err) { res.status(500).send("Failed to Update Profile");
         } else {
            res.status(200).json("Profile Updated Successfully");
            console.log("Profile Updated Successfully");
        };
    });
  };

  const getCities = (req,res) => {

    db.query("select distinct city from profiles", (err,result) => {

      if(err){res.status(500).send("Failed to get Cities");}
      else{
        res.status(200).json(result);
      };
    });
  };

module.exports = { createUser,createProfile,login,getProfiles,getProfileByEmail,ForgetPassword,UpdatePassword,saveState,online,offline,updateProfile,getCities };