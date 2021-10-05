const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String
});

UserSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }
    
        const hash = await bcrypt.hash(this.password, 10);
    
        this.password = hash;
    } catch (err) {
        return next (err);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
