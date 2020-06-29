import { findOverlapEnd, findOverlapStart } from '../overlap';
// TODO more tests

describe('findOverlapEnd', () => {
  test('should find overlap', () => {
    const content =
      "I am a content to test the overlap functions but i don't really know what to type";

    const strToFindIn1 = 'I am a content to test the overlap';
    const strToFind1 = 'to test the overlap';

    const strToFindIn2 = "overlap functions but i don't really know";
    const strToFind2 = "don't really know";

    const strToFindIn3 = "overlap functions but i don't really";
    const strToFind3 = "but i don't really";

    const strToFindIn4 =
      "I am a content to test the overlap functions but i don't really know what to type";
    const strToFind4 = "functions but i don't really know what to type";

    const strToFindIn5 = 'am a content to test';
    const strToFind5 = 'to test';

    const expected = true;

    expect(findOverlapEnd(strToFind1, strToFindIn1, content)).toEqual(expected);
    expect(findOverlapEnd(strToFind2, strToFindIn2, content)).toEqual(expected);
    expect(findOverlapEnd(strToFind3, strToFindIn3, content)).toEqual(expected);
    expect(findOverlapEnd(strToFind4, strToFindIn4, content)).toEqual(expected);
    expect(findOverlapEnd(strToFind5, strToFindIn5, content)).toEqual(expected);
  });
});

describe('findOverlapStart', () => {
  test('should find overlap', () => {
    const content =
      "I am a content to test the overlap functions but i don't really know what to type";
    const strToFindIn1 = 'I am a content to test the overlap';
    const strToFind1 = 'I am a content to';

    const strToFindIn2 = "overlap functions but i don't really know";
    const strToFind2 = 'overlap functions but';

    const strToFindIn3 = "overlap functions but i don't really";
    const strToFind3 = 'overlap';

    const strToFindIn4 =
      "I am a content to test the overlap functions but i don't really know what to type";
    const strToFind4 = 'I am a content to test the overlap functions';

    const strToFindIn5 = 'am a content to test';
    const strToFind5 = 'am a';

    const expected = true;

    expect(findOverlapStart(strToFind1, strToFindIn1, content)).toEqual(
      expected,
    );
    expect(findOverlapStart(strToFind2, strToFindIn2, content)).toEqual(
      expected,
    );
    expect(findOverlapStart(strToFind3, strToFindIn3, content)).toEqual(
      expected,
    );
    expect(findOverlapStart(strToFind4, strToFindIn4, content)).toEqual(
      expected,
    );
    expect(findOverlapStart(strToFind5, strToFindIn5, content)).toEqual(
      expected,
    );
  });
});
