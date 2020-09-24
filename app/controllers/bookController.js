import BookModel from '../models/bookModel';
import connection from '../connection';
import cloudinary from '../cloudinary';

class BookController {  
  /**
   * Create A Book
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and Book object 
   */
  static async addBook(req, res) {
    try {
      const book = await BookModel.findOne({ title: req.body.title }).exec();
      if(book) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Book with that Title already added',
            }
          );
      }
      const getImage = await cloudinary.uploads(req.body.image, 'Assets');
      req.body.image = getImage.url;
      const data = new BookModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'Book successfully added',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a book',
            error
        });
    }
  }

  /**
   * Get All Books
   * @param {object} req 
   * @param {object} res 
   * @returns {array} Return status code 200 and Books array
   */
  static async getAllBooks(req, res) {
    try {
      const data = await BookModel.find({});
      return res.status(200).send(
        { 
          status: 200,
          message: 'All available Books',
          data
        });
    } catch(error) {
      return res.status(400).send(
        { 
          status: 400,
          message: 'Oops failed to fetch books',
          error
        });
    }
  }

  /**
   * Get A Single Book
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and Book object
   */
  static async getOneBook(req, res) {
    const data = await BookModel.findById(req.params.id)
    try {     
      if(data == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'Book with this Title doesn\'t exist',
          }
        );
    }
      return res.status(200).send(
        { 
          status: 200,
          message: 'Book Details',
          data
        }
);
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch all books',
          error
    })
    }
  }

  /**
   * Update A Book
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and Book object
   */
  static async updateBook(req, res) {
    try {
      const data = req.body;
      await BookModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'Book updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the book',
          error
        });
    }
  }

  /**
   * Delete A Book
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deleteBook(req, res) {
    try {      
      const book = await BookModel.findById(req.params.id)
      if(book == null) {
        return res.status(200).send(
          { 
            status: 200,
            message: 'Book with this Title doesn\'t exist',
          }
        );
    }
      await BookModel.deleteOne(book)
      return res.status(200).send({ 
        status: 200,
        message: 'Book deleted successfully'
});
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the book',
          error
        });
    }
  }
}

export default BookController;