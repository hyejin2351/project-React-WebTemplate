const JSONResponse = require('../JSONResponse');

const makeResponse = JSONResponse.makeResponse;

test('JSONResponse()', () => {
  const data = { value: 1 };
  const message = 'success';
  const success = true;
  const res = new JSONResponse(success, message, data);
  expect(res.success).toBe(success);
  expect(res.message).toBe(message);
  expect(res.value).toBe(data.value);
});

test('makeResponse()', () => {
  const data = { value: 1 };
  const message = 'success';
  const success = true;
  const res = makeResponse(success, message, data);
  expect(res.success).toBe(success);
  expect(res.message).toBe(message);
  expect(res.value).toBe(data.value);
});
