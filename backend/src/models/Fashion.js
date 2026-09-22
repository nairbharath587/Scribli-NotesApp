import mongoose from 'mongoose';

const fashionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Fashion = mongoose.model('Fashion', fashionSchema);

export default Fashion;
//The detailed explanation of the code is as follows:
//1. Importing Mongoose: The code starts by importing the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
// It provides a straightforward way to model application data and interact with the MongoDB database.
//2. Defining the Schema: The fashionSchema is defined using mongoose.Schema. A schema is a blueprint for the structure of documents in a MongoDB collection.
// In this case, the schema defines two fields: title and description. Both fields are of type String and are marked as required, meaning that they must be provided when creating a new document.
// The second argument to the Schema constructor is an options object. Here, { timestamps: true } is used to automatically add createdAt and updatedAt fields to the documents, which will store the timestamps of when the document was created and last updated.
//3. Creating the Model: The Fashion model is created using mongoose.model. A model is a class that provides an interface for interacting with the database collection. 
// The first argument is the name of the collection (in this case, 'Fashion'), and the second argument is the schema that defines the structure of documents in that collection.
//4. Exporting the Model: Finally, the Fashion model is exported using export default. This allows other parts of the application to import and use the Fashion model to perform database operations such as creating, reading, updating,


// The schema specifies the structure of the documents in the collection, including the fields (title and description) and their data types. 
// The model provides an interface for interacting with the database, allowing us to create, read, update, 
// and delete documents in the "Fashion" collection. 
// By defining this model, we can easily perform database operations related to fashion trends and carts in our application.