const mongoose = require("mongoose");
const tenantSchema = new mongoose.Schema({ 
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    email:String,
    password:String,
    name:String,
    mobileno:String,
    tenantID:Number,
    tenantProfID:String,
    status:{ type: String, default: "New" },
    regdate: { type: Date, default: Date.now },
    rating:{type:Number, default:5}
});
var tenantmodul = mongoose.model('tenantcollections', tenantSchema);


const landlordSchema = new mongoose.Schema({ 
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    email:String,
    password:String,
    name:String,
    mobileno:String,
    landlordID:Number,
    landlordProfID:String,
    status:{ type: String, default: "New" },
    regdate: { type: Date, default: Date.now },
    rating:{type:Number, default:0}
});

var landlordmodul = mongoose.model('landlordcollections', landlordSchema);
const counterSchema = new mongoose.Schema({ 
    fild:String,
    value:Number
});

var countermodul = mongoose.model('counter', counterSchema);

const propertySchema = new mongoose.Schema({ 
    name:String,
    type:String,
    status:String,
    landlordID:Number,
    landlordName:String,
    propertyID:Number,
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    requestBy:String,
    imgMain:String,
    impOp1:String,
    impOp2:String,
    impOp3:String,
    impAdsProof:String,
    rating:{type:Number, default:0},
    date: { type: Date, default: Date.now }
});

var propertymodul = mongoose.model('property', propertySchema);


const propertyrequestSchema = new mongoose.Schema({ 
    name:String,
    type:String,
    status:String,
    landlordID:Number,
    landlordName:String,
    propertyID:Number,
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    requestBy:String,
    tenantID:Number,
    imgMain:String,
    impOp1:String,
    impOp2:String,
    impOp3:String,
    impAdsProof:String,
    rating:{type:Number, default:0},
    date: { type: Date, default: Date.now }
});

var propertyrequestmodul = mongoose.model('requestproperty', propertyrequestSchema);


const ratingSchema = new mongoose.Schema({ 
    landlordID:Number,
    landlordName:String,
    propertyID:Number,
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    rating:Number,
    date: { type: Date, default: Date.now }
});

var ratingmodul = mongoose.model('rating', ratingSchema);


const leaseSchema = new mongoose.Schema({ 
    tenantID:Number,
    tenantName:String,
    landlordID:Number,
    landlordName:String,
    propertyID:Number,
    status:String,
    name:String,
    type:String,
    postCode:String,
    doorNo:String,
    address:String,
    country:String,
    imgMain:String,
    impOp1:String,
    impOp2:String,
    impOp3:String,
    rating:String,
    date: { type: Date, default: Date.now }

});

var leasemodul = mongoose.model('lease', leaseSchema);



module.exports={
    tenant:tenantmodul,
    landlord:landlordmodul,
    counter:countermodul,
    property:propertymodul,
    propertyrequest:propertyrequestmodul,
    rating:ratingmodul,
    lease:leasemodul
}