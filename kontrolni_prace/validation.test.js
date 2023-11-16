import { isValidInput } from './validation';

test('validates input correctly', () => {
    const stringField = { name: '1', dataType: 'string', minLength: 1, maxLength: 10 };
    const numberField = { name: '2', dataType: 'number', minLength: 1, maxLength: 10 };

    expect(isValidInput('', stringField)).toBe(false);
    expect(isValidInput('a', stringField)).toBe(true);
    expect(isValidInput('abcde', stringField)).toBe(true);
    expect(isValidInput('abcdef', stringField)).toBe(true);

    expect(isValidInput('5', numberField)).toBe(true);
    expect(isValidInput('abc', numberField)).toBe(false);
    expect(isValidInput('15', numberField)).toBe(false);
});