export const recipeValidationSchema = {
    name: {
        isString: { errorMessage: 'Name must be a String.' },
        notEmpty: { errorMessage: 'Name must not be empty.' },
        isLength: { options: { min: 3, max: 128 }, errorMessage: 'Length must be between 3 and 128 Characters.' },
    },
};
