import mongoose from 'mongoose';

const smartBinSchema = new mongoose.Schema({
    MAmount: {
        type: Number,
        required: true,
        default: 0
    },
    GAmount: {
        type: Number,
        required: true,
        default: 0
    }
});

const SmartBin = mongoose.model('SmartBin', smartBinSchema);

export default SmartBin;
