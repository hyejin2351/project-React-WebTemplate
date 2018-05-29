class JSONResponse {
  constructor(jsonData, code = -1) {
    this.code = code;
    const { success, message, ...data } = jsonData;
    this.success = !!success;
    this.message = message || '';
    this.data = data || {};
  }

  get message() {
    return this.message;
  }

  get success() {
    return this.success;
  }

  get data() {
    return this.data;
  }

  isSuccess() {
    return this.code === 200 && this.success;
  }
}

export default JSONResponse;
