import User from "./auth.model.js";

class AuthRepository {

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async findById(id) {
        return await User.findById(id);
    }

}

export default new AuthRepository();