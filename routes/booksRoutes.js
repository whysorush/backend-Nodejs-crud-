import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear){
                return res.status(400).send("Please fill all the fields");
            }
            const newBook = {
                title   :req.body.title,
                author  :req.body.author,
                publishYear:req.body.publishYear
            }
            const book = await Book.create(newBook);
            return res.status(200).send(book); 
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({message:error.message})
    }
})
//get all books
router.get('/',async(req,res)=>{
    try {
        const books = await Book.find();
        return res.status(200).json({
            count:books.length,
            data:books
        });
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({message:error.message})
            }
})
// get book by id
router.get('/:id',async(req,res)=>{
    try {
        const books = await Book.findById(req.params.id);
        return res.status(200).json({
            count:books.length,
            data:books
        });
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({message:error.message})
            }
})

router.put('/:id',async(req,res)=>{
    try {
        // const books = await Book.findById(req.params.id);
        // return res.status(200).json({
        //     count:books.length,
        //     data:books
        // });

        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishYear){
                return res.status(400).send("Please fill all the fields");
            }
            const ID = req.params.id
            const result = await Book.findByIdAndUpdate(ID, req.body);
            if(!result){
                return res.status(404).send({message:"Book not found"})
            }
            return res.status(200).send({message:"Book updated successfully"}) 
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({message:error.message})
            }
})

router.delete('/:id',(req,res)=>{
    try {
        const ID = req.params.id
        Book.findByIdAndDelete(ID).exec();
        return res.status(200).send({message:"Book deleted successfully"})
        } catch (error) {
            console.log(error.message)
            return res.status(500).send({message:error.message})
            }


})


export default router;