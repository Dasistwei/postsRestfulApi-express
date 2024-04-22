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
  try {
    const { content, image, name, likes } = req.body
    const result = await Post.create(
      {
        name: name.trim(),
        content: content.trim(),
        image: image.trim(),
        likes
      }
    )  
    handleSuccess(res, result)    
  } catch (error) {
    handleError({res})
  }

})

//PUT
router.put('/:id', async(req, res, next)=> {
  try {
    const { content, image, name, likes } = req.body
    const result = await Post.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        content: content.trim(),
        image: image.trim(),
        likes
      },
      { 
        runValidators: true,
        new: true
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
    if(req.originalUrl.startsWith('/posts/')){
      const result = await Post.findByIdAndDelete(req.params.id)
      if(result !== null){
        handleSuccess(res, result)
      }else{
        handleError({res}) 
      }  
    }
  } catch (error) {
    handleError({error,res})
  }
})
// DELETE ALL
router.delete('/', async(req, res, next)=> {
  try {
    if(req.originalUrl === '/posts'){
      const result = await Post.deleteMany()
      handleSuccess(res, result)
    }else{
      handleError({res})  
    }
  } catch (error) {
    handleError({error,res})
  }
})

module.exports = router