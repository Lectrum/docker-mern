// Core
import bcrypt from 'bcryptjs';

// Instruments
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async signup() {
        const { email, fullName, password } = this.data;

        const hash = await bcrypt.hash(password, 10);

        const { _id: id } = await staff.create({ email, name: fullName, password: hash });

        return id;
    }

    async getAll() {
        const data = await staff.find({}, { __v: false });

        return data;
    }
}
