// stringUtils.test.ts

import { findFundsIds } from "../app/upload/utils/excelReadUtils";

describe('findKerenId', () => {
  test('it should extract numbers in parentheses from a string', () => {
    const inputString = "ךןלחןידכגךןלדגחי (219) 654 l'ג/'kajehdf (814)";
    const expectedNumbers = [219, 814];
    const extractedNumbers = findFundsIds(inputString);
    expect(extractedNumbers).toEqual(expectedNumbers);
  });

  test('it should extract numbers in parentheses from a string', () => {
    const inputString =`'635 (814)  ילין לפידות קופת גמל מסלול לבני 50 עד 60 (9940)
    403  ילין לפידות קופת גמל מסלול מניות (1036)
    `;
    const expectedNumbers = [814,9940,1036];
    const extractedNumbers = findFundsIds(inputString);
    expect(extractedNumbers).toEqual(expectedNumbers);
  });

  test('it should handle no numbers in parentheses', () => {
    const inputString = "ךןלחןידכגךןלדגחי 654 l'ג/'kajehdf";
    const expectedNumbers: number[] = [];
    const extractedNumbers = findFundsIds(inputString);
    expect(extractedNumbers).toEqual(expectedNumbers);
  });
});
