const mongoose=require('mongoose');

const hotelSchema=new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true

  },
  taste:
  {
    type: String,
    enum: ['sweet','spicy','sour'],
    required: true,
  },
  is_drink:{
    type: Boolean,
    default: false
  }

});
const hotels= mongoose.model('hotel',hotelSchema);
module.exports=hotels;