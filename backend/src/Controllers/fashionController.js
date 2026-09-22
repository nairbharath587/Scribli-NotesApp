import Fashion from '../models/Fashion.js';

export async function getAllTrends (_, res) {

  try {
    const trends = await Fashion.find().sort({ createdAt: -1 }); //newest first
    res.status(200).json(trends);
  } catch (error) {
    console.error("Error in getAllTrends:", error);//note the use of console.error here, which is a good practice for logging errors. This can help with debugging and monitoring the application.
    res.status(500).json({ message: "Internal server error" });//note the status code 500 indicates an internal server error, which is appropriate for unexpected errors that occur on the server side.
  }
}

export async function createCart (req, res) {

  try{
    const { title, description } = req.body; 
    const Cart = new Fashion({ title, description }); // whats Fashion here? Fashion is a Mongoose model that represents the "Fashion" collection in the MongoDB database. It is used to create new documents (in this case, a new cart) and interact with the database. The newCart object is an instance of the Fashion model, which allows us to save it to the database using the save() method.
    //whats happening here? In this code snippet, we are creating a new instance of the Fashion model using the data received in the request body (title and description). This new instance represents a new document that we want to save to the database. After creating the newCart object, we call the save() method on it, which saves the document to the MongoDB database. Once the save operation is successful, we send a response back to the client with a status code of 201 (indicating that a new resource has been created) and include the newly created cart in JSON format. If any error occurs during this process, we catch it and send a response with a status code of 500 (indicating an internal server error) along with an error message.
    const savedCart = await Cart.save(); 
    res.status(201).json(savedCart);

  }
  catch (error) {
    console.error("Error in createCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateCart (req, res) {

  try {

    const{ title, description } = req.body;
    const updatedCart = await Fashion.findByIdAndUpdate(req.params.id, //id becuz thats what we used in fashionRoutes.js
      { title, description }, 
      { new: true }); // for dispalying the new updatedcart
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  }
  catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function deleteCart (req, res) {

  try{
    const deletedCart = await Fashion.findByIdAndDelete(req.params.id);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(deletedCart);

  }
  catch (error) {
    console.error("Error in deleteCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getCartById (req, res) {

  try {
    const cart = await Fashion.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  }
  catch (error) {
    console.error("Error in getCartById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

