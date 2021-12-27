const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
   endpoint: String,
   keys: Schema.Types.Mixed,
   createDate: {
       type: Date,
       default: Date.now
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    
    }
});

module.exports= mongoose.model('Subscriber', SubscriberSchema);