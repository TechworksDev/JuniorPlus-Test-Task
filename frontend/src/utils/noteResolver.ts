import { NOTE_COLORS } from '@/types';
import { z } from 'zod/mini';

const noteSchema = z.object({
    title: z
        .string()
        .check(
            z.trim(),
            z.minLength(1, 'Title is required.'),
            z.maxLength(255, 'Title must be at most 255 characters long.')
        ),
    content: z
        .string()
        .check(
            z.trim(),
            z.minLength(1, 'Content is required.'),
            z.maxLength(500, 'Content must be at most 500 characters long.')
        ),
    marker: z.enum(NOTE_COLORS, {
        message: 'Marker color is required.'
    })
});

export const resolver = ({ values }: { values: any }) => {
    const result = noteSchema.safeParse(values);

    if (result.success) {
        return {
            values: result.data,
            errors: {}
        };
    }

    const errors: any = {};
    result.error.issues.forEach(err => {
        const field = err.path[0];
        if (field) {
            errors[field] = [{ message: err.message }];
        }
    });

    return {
        values,
        errors
    };
};