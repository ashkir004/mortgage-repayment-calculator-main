
import type { FormData } from '../types';

function validateForm(myform: FormData) {
    const errors: { [key: string]: string } = {};

    Object.entries(myform).forEach(([key, field]) => {
        if (!field) {
            errors[key] = 'This field is required';
        }
    });

    return errors;
}

export default validateForm;