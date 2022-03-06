const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  /** 成功状态的回调 */
  FULFILLED_CALLBACK_LIST = [];
  /**失败状态的回调 */
  REJECTED_CALLBACK_LIST = [];

  // 私有变量存储，防止get set死循环
  _status = PENDING;

  constructor(fn) {
    // promise的初始状态为pending
    this.status = PENDING;
    // resolve 的结果
    this.value = null;
    // reject 的结果
    this.reason = null;

    // promise的入参函数是立即执行的
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  get status() {
    return this._status;
  }

  // 利用set 做响应式处理，然后去执行相应的回调
  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED:
        this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
      case REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((callback) => {
          callback(this.reason);
        });
        break;
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }

  reject(reson) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reson;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;

    const realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => reason;

    // then的返回值是一个新的promise， 和当前promise无关
    const promsie2 = new MyPromise((resolve, reject) => {
      // 处理异常情况
      const fulfilledMicrotask = () => {
        // 微任务
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 根据status的状态，调用不同的处理函数
      switch (this.status) {
        case FULFILLED:
          fulfilledMicrotask();
          break;
        case REJECTED:
          rejectedMicrotask();
          break;
        // pending的时候先存起来
        case PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
          break;
      }
    });

    return promsie2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}

function isFunction(param) {
  return typeof param === "function";
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果promise2 和x相等，抛出一个error
  if (promise2 === x) {
    return reject(
      new TypeError("the promise and the return value are the same")
    );
  }
  if (x instanceof MyPromise) {
    queueMicrotask(() => {
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject);
      });
    });
  } else if (typeof x === "object" || isFunction(x)) {
    if (x === null) {
      return resolve(x);
    }
    let then = null;

    try {
      then = x.then;
    } catch (error) {
      return reject(error);
    }

    //  如果then是一个函数
    if (isFunction(then)) {
      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        if (called) {
          return;
        }
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

const test = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
})
  .then()
  .then(console.log);

console.log(2222);
