export const recipeValidationSchema = {
    name: {
        isString: { errorMessage: 'Name must be a String.' },
        notEmpty: { errorMessage: 'Name must not be empty.' },
        isLength: { options: { min: 3, max: 128 }, errorMessage: 'Length must be between 3 and 128 Characters.' },
    },
    description: {
        isString: { errorMessage: 'Description must be a String'},
        isLength: { options: { max: 512 }, errorMessage: 'Description must not be longer than 512 Characters'},
    },
    link: {
        isString: { errorMessage: 'link must be a string'},
        isLength: { options: { max: 512}, errorMessage: 'Must not be longer than 512 charcters'}
    }
};
