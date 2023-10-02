import { ValidationError } from "./validationErrors";

export const API_KEY = process.env.X_API_KEY!;
export const API_URL = process.env.URL;

export function validateConfig(API_KEY: string | undefined, API_URL: string | undefined): void {
    if (!API_KEY || !API_URL) {
        throw new ValidationError('API_KEY or API_URL is not defined');
    }
}
