import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import fs from 'fs';
import path from 'path';


interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

    // Delete uploaded images
    const requestImages = request.files as Express.Multer.File[];
    requestImages.map(image => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', image.filename);
        fs.unlinkSync(filePath)
    });

    // Validation Error
    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {};

        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });

        return response.status(400).json({ message: 'Validation errors!', errors });
    }

    console.error(error);

    return response.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;