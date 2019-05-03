// Core
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Document shape
const schema = new mongoose.Schema({
    name:     String,
    password: {
        type:   String,
        select: false,
    },
    email: {
        type:   String,
        index:  true,
        unique: true,
    },
    created: {
        type:    Date,
        default: () => new Date(),
    },
});

schema.plugin(uniqueValidator);

// Collection
export const staff = mongoose.model('staff', schema);
