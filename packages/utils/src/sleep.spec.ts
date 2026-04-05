import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('resolves after the requested delay', async () => {
    const onResolve = jest.fn();
    const promise = sleep(250).then(onResolve);

    await Promise.resolve();
    expect(onResolve).not.toHaveBeenCalled();

    jest.advanceTimersByTime(249);
    await Promise.resolve();
    expect(onResolve).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    await promise;
    expect(onResolve).toHaveBeenCalledTimes(1);
  });
});
