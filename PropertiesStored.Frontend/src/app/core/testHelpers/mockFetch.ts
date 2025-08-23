export function mockFetch(data: unknown) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    }),
  );
}

export function mockFetchError() {
  return jest.fn().mockImplementation(() =>
    Promise.reject(new Error('Network response was not ok')),
  );
}