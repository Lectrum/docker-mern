import { Staff as StaffModel } from '../models';

export class Staff {
    constructor(data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async signup() {
        const data = await this.models.staff.signup();

        return data;
    }

    async getAll() {
        const data = await this.models.staff.getAll();

        return data;
    }
}
