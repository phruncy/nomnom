import { NoDuplicatesDirective } from './no-duplicates.validator';

describe('NoDuplicatesDirective', () => {
    it('should create an instance', () => {
        const directive = new NoDuplicatesDirective();
        expect(directive).toBeTruthy();
    });
});
