import { threadHomepageDate } from '../dateFormat';

describe('threadHomepageDate', () => {
  test('should work', () => {
    const date = 1581460941341;
    const expected = 'mardi 11 février à 23h42';

    expect(threadHomepageDate(date)).toEqual(expected);
  });
});
