import mongoose from 'mongoose';

const ledSchema = new mongoose.Schema({
    status1: {
        type: Number,
        required: true
    },
    status2: {
        type: Number,
        required: true
    },
    status3: {
        type: Number,
        required: true
    }
});

const Led = mongoose.model('Led', ledSchema);

export default Led;
