const express = require('express')
const router = express.Router()
const Post = require('../model/post')
const handleSuccess = require('../service/handleSuccess')
const handleError = require('../service/handleError')

// GET
router.get('/', async(req, res, next)=> {
  const allPosts = await Post.find({})
  handleSuccess(res, allPosts)
})

// POST
router.post('/', async(req, res, next)=> {
  console.log(req.body)
  const { content, image, name, likes } = req.body
  const result = await Post.create(
    {
      name,
      content,
      image,
      likes
    }
  )  
  handleSuccess(res, result)
})

//PUT
router.put('/:id', async(req, res, next)=> {
  try {
    const { content, image, name, likes } = req.body
    const result = await Post.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        name,
        content,
        image,
        likes
      }
    )
    if(result !== null){
      handleSuccess(res, result)
    }else{
      handleError({res})  
    }  
  } catch (error) {
    handleError({res})
  }
})
// DELETE
router.delete('/:id', async(req, res, next)=> {
  try {
    console.log('req.params.id', req.params.id)
    const result = await Post.findByIdAndDelete(req.params.id)
    if(result !== null){
      handleSuccess(res, result)
    }else{
      handleError({res})  
    }  
  } catch (error) {
    handleError({error,res})
  }
})

module.exports = router