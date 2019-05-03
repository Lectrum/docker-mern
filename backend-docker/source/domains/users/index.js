// Instruments
import { Staff } from '../../controllers';

export const post = async (req, res) => {
    // eslint-disable-next-line
    console.log(`${req.method} — ${req.originalUrl}`);

    try {
        const staff = new Staff(req.body);
        const id = await staff.signup();

        res.status(201).json({ data: `Customer with id ${id} successfully created.` });
    } catch (error) {
        res.status(400).json({ data: error.message });
    }
};

export const get = async (req, res) => {
    // eslint-disable-next-line
    console.log(`${req.method} — ${req.originalUrl}`);

    try {
        const staff = new Staff();
        const data = await staff.getAll();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ data: error.message });
    }
};
