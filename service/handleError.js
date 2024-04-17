const handleError = ({error, res}) =>{
  let message = ''
  // console.log('error', error)
  if(error){
    message = error.message
  }else{
    message = "欄位填寫有誤，或無此id"
  }
  res.status(400).json(
    {
      status: 'false',
      message
    }    
  )  
}
module.exports = handleError