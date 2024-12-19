const express = require("express");
const mongoose = require("mongoose");
const UserModule = require("./modules/user");
const cors = require("cors");


const app = express();
app.use(cors())
const serverStart = async () =>{
    try {
        const DB_HOST = process.env.DB_HOST;
        const DB_NAME = process.env.DB_NAME;
        await mongoose.connect(DB_HOST,{"dbName":DB_NAME});
        console.log("Database Connected.");
        // console.log(check);
        app.use(express.json());

        app.get("/rest/get", async (req,res) => {
            try {
                let userData = await UserModule.find({}); 
                res.json({"data":userData});
            } catch (error) {
                console.log(error);
            }
            
            
        })

        app.post("/rest/save", async (req,res)=>{
            let data = req.body;
            let newobject = new UserModule(data);
            try {
                await newobject.save();
                res.json({"success":true,"message":"Form Data Save Successfully!!!"});
            } catch (error) {
                res.json(error);
            }
            
        })

        app.post("/rest/update", async (req,res)=>{
            let data = req.body;
            let id = data._id;
            let newobject = new UserModule(data);
            try {
                const result = await UserModule.updateOne({ _id: id }, { $set: newobject });
                console.log(result); // { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
                res.json({"success":true,"message":"Form Data Update Successfully!!!"});
            } catch (error) {
                res.json(error);
            }
            
        })
        app.post("/rest/delete", async (req,res)=>{
            let data = req.body;
            let id = data._id;
            try {
                const result = await UserModule.deleteOne({ _id: id });
                console.log(result);
                res.json({"success":true,"message":"Form Data Delete successfully!!!"});
            } catch (error) {
                res.json(error);
            }
            
        })

        app.listen(3000,()=>{
            console.log(`Now server is running on http://localhost:3000`);
        })

    } catch (error) {
        console.log(error);
        console.log("Database not connected");
    }
}


serverStart();