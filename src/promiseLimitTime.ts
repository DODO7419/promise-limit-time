import { PromiseLimitTimeArr } from "./types";
import * as _ from "lodash";
export class PromiseLimitTime {
  _arr: PromiseLimitTimeArr = [];
  startArr: PromiseLimitTimeArr[] = [];
  _limitTime: number = 0;
  constructor() {}
  /**
   * 初始化
   * @param {PromiseLimitTimeArr} arr
   */
  init(arr: PromiseLimitTimeArr, limit: number = 1) {
    this.arr = arr;
    this.spit(arr, limit);
    return this;
  }
  spit(arr: PromiseLimitTimeArr, limit: number) {
    let cloneArr = _.cloneDeep(arr);
    let arr1: PromiseLimitTimeArr[] = [];
    let num = parseInt(String(arr.length / limit));
    if (arr.length % limit) {
      num++;
    }
    for (let i = 0; i < num; i++) {
      arr1.push(cloneArr.splice(0, limit));
    }
    // console.log(arr1, cloneArr, num, arr.length, limit, "arr1");

    this.startArr = arr1;
  }
  static getInstance() {
    let instance = null;
    return instance ? instance : (instance = new PromiseLimitTime());
  }
  /**
   * 间隔时间
   * @param time
   * @returns
   */
  delay(time: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
  /**
   * 设置arr
   */
  set arr(val: PromiseLimitTimeArr) {
    if (Array.isArray(val)) {
      this._arr = val;
    } else {
      throw new Error("错误,请传递数组");
    }
  }
  /**
   * 获取arr
   */
  get arr() {
    return this._arr;
  }
  get limitTime() {
    return this._limitTime;
  }
  set limitTime(val: number) {
    this._limitTime = val;
  }
  /**
   *
   * @param delayTime Execute a set of wait times 俩组之间的间隔时间
   * @callback callback  俩组之间的间隔函数
   */
  async start(delayTime?: number, callback?: (...val: any) => void) {
    try {
      const arr = [];
      for (let index = 0; index < this.startArr.length; index++) {
        const element = this.startArr[index];
        const res = await Promise.all(
          element.map((ele) => {
            return ele.callback({
              ...ele.attr,
            });
          })
        );
        arr.push(res);
        if (callback) {
          callback(res);
        }
        if (delayTime) {
          await this.delay(delayTime);
        }
      }
      return arr;
    } catch (error) {
      console.log("error", error);
    }
  }
}
export const promiseLimitTime = (function () {
  let instance = null;
  return function (): void {
    return instance ? instance : (instance = new PromiseLimitTime());
  };
})();
