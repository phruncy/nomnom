import { describe, expect, test, vi, it } from "vitest";
import { getRecipe } from "../src/handlers/recipes.mjs";


describe('get recipeById', () => {
    const mockRequest = {
        id: 'notanumber'
    }

    const mockResponse = {
        sendStatus: vi.fn(),
        status: {
            json: vi.fn(),
            send: vi.fn()
        }
    }

    const next = vi.fn();

    it('should throw an error for NaN id', () => {
        expect(() => getRecipe(mockRequest, mockResponse, next)).toThrowError();
    }
)

    it('should forward to Error handler on failure', ()=> {
        getRecipe(mockRequest, mockResponse, next);
        expect(next).toHaveBeenCalled();
    })

});

describe('deleteRecipe', () => {

})

describe('addRecipe', () => {}
)
