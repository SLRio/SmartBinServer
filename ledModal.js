import mongoose from 'mongoose';

const ledSchema = new mongoose.Schema({
    status2: {
        type: Number,
        default: 0
    },
    status3: {
        type: Number,
        default: 0
    }
});

const Led = mongoose.model('Led', ledSchema);

export default Led;
