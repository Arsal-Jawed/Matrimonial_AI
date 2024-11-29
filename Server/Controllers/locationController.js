const db = require('../config');

const saveLocation = (req,res) => {

    const {title,provider,address,city} = req.body;
    console.log(req.body);

    const photoFile = req.files.image;
    const urlname = `/Places/${photoFile.name}`;
    const filePath = `D:/AREX Projects/The Matrimonial/Client/matrimonial/public/Places/${photoFile.name}`;

    photoFile.mv(filePath, async(err)=>{

        if(err){res.status(500); console.log(err);}else{
    
            db.query("insert into locations(provider,title,address,city,location_image) values(?,?,?,?,?)",
            [provider,title,address,city,urlname],(err,result)=>{
                if(err){res.status(500); console.log(err);}else{
                    res.status(200).json("Location Added Successfully"); console.log("Location Added Successfully");
                }
            })
        }
      });
}

const getLocations = (req,res) => {

    db.query("SELECT * from locations",(err,result) => {

        if(err){
            res.satus(500).json({message: "failed to get locations"})
        }else{

            res.status(200).json(result);
        }
    });
}

module.exports = {saveLocation,getLocations};