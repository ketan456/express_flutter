const asyncHandler = require("express-async-handler")
const contactModal = require("../models/contactModel")

//@desc Get all contacts
// @routw Get /api/contacts
//access private
const getContacts =asyncHandler(async (req,res) =>{

    const contacts = await contactModal.find({user_id:req.user.id})
    res.status(200).json(contacts);
});


//@desc Create contacts
// @routw Post /api/contacts
//access private
const createContact = asyncHandler(async function(req,res){
    console.log("Ther request body is : ",req.body);
    const{name, email, phone} =  req.body;
    if(!name || !email ||!phone){
        res.status(400);
        throw new Error("All fields mandotory")
    }
    const contact = await contactModal.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json({ statusCode:"201" ,message:"contact saved"} );
});

//@desc Update contacts
// @routw Put /api/contacts/id
//access private
const updateContact = asyncHandler(async function(req,res){
    const contact = await contactModal.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have the permission")
    }
    const updateContact = await contactModal.findByIdAndUpdate(
        req.params.id, req.body, {new:true}
    )
    res.status(200).json({updateContact});
});

//@desc get By Id contacts
// @routw Get /api/contacts/id
//access private
const getContact = asyncHandler(async function(req,res){
  
    const contact = await contactModal.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have the permission")
    }
    res.status(200).json(contact);
});

//@desc Delete contacts
// @routw Delete /api/contacts/id
//access public
const deleteContact = asyncHandler(async function(req,res){
    const contact = await contactModal.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }
    await contactModal.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});


module.exports = {getContacts, createContact, getContact, updateContact,deleteContact};