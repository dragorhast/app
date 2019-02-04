import { minutesSinceTime } from '..';

describe('Minutes since time function', () => {
  it('Returns 0: Times are both the same', () => {
    const response = minutesSinceTime(new Date());
    expect(response).toBe(0);
    expect(response).not.toBe(5);
  });

  it('Returns 5', () => {
    const timeNow = new Date();
    const time5MinsAgo = new Date(timeNow - 5 * 60 * 1000);
    const response = minutesSinceTime(time5MinsAgo);
    expect(response).toBe(5);
    expect(response).not.toBe(0);
  });
});
