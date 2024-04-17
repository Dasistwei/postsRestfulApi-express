const express = require('express')
const router = express.Router()
const Post = require('../model/post')
router.get('/', async(req, res, next)=> {
  const allPosts = await Post.find({})
  res.status(200).json(
    {
      status: 'success',
      data: allPosts
    }
  )
})
module.exports = router
// const requestListener = async(req, res) =>{
//   let body = ''
//   req.on('data', chunk => {
//     body += chunk
//   })

//   // 取得所有posts:  GET /posts
//   if (req.url === '/posts' && req.method === 'GET') {
//     const posts = await Post.find()
//     handleSuccess(res, posts)
//   // 新增 post: POST /posts
//   }else if(req.url === '/posts' && req.method === 'POST'){
//     req.on('end', async()=>{
//       try {
//         const { content, image, name, likes } = JSON.parse(body)
//         const result = await Post.create(
//           {
//             name,
//             content,
//             image,
//             likes
//           }
//         )
//         handleSuccess(res, result)     
//       } catch (error) {
//         handleError(res)
//       }
//     })
//   // 修改單筆post: PATCH /posts/{{post id}}
//   } else if(req.url.startsWith('/posts/') && req.method === 'PATCH'){
//     req.on('end', async()=>{
//       try {
//         const { content, image, name, likes } = JSON.parse(body)
//         const postId = req.url.split('/').pop()
//         const post = await Post.findOne({ _id: postId })
//         const result = await Post.findByIdAndUpdate(
//           {
//             _id: postId
//           },
//           {
//             name,
//             content,
//             image,
//             likes
//           }
//         ) 

//         handleSuccess(res, result)
        
//       } catch (error) {
//         handleError(res)
//         console.log(error.message)
//       }
//     })

//   // 刪除單筆post: DELETE /posts/{{post id}}    
//   }else if(req.method === 'DELETE' && req.url.startsWith('/posts/')){
//     const id = req.url.split('/').pop()
//     const result = await Post.findByIdAndDelete(id)
//     handleSuccess(res, result)

//   // 刪除全部posts: DELETE /posts
//   }else if(req.method === 'DELETE' && req.url === '/posts'){
//     const result = await Post.deleteMany({})
//     handleSuccess(res, result)

//   }else if(req.method === 'OPTIONS'){
//     res.writeHead(200, headers)
//     res.end()
//   } else {
//     res.writeHead(404, headers)
//     res.write(JSON.stringify(
//       {
//         "status": false,
//         "message": "查無無此頁面"
//       }
//     ))
//     res.end()
//   }


// }