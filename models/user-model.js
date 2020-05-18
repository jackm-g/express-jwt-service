var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-z0-9_-]{3,15}$/, 'is invalid'], index: true, unique: true},
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true, unique: true},
    // accessToken: String,
    // refreshToken: String,
    providerId: String,
}, {timestamps: true});


// Sensitive and should only be retuned to the user since contains JWT
UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.token,
        providerId: this.providerId
    };
};


mongoose.model('User', UserSchema);

