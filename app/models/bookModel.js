import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
      title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      author: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },
      image:{
        type: String,
      }
});

const Book = mongoose.model('book', bookSchema);

export default Book;