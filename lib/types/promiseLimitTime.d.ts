import { PromiseLimitTimeArr } from "./types";
export declare class PromiseLimitTime {
    _arr: PromiseLimitTimeArr;
    startArr: PromiseLimitTimeArr[];
    _limitTime: number;
    constructor();
    /**
     * 初始化
     * @param {PromiseLimitTimeArr} arr
     */
    init(arr: PromiseLimitTimeArr, limit?: number): this;
    spit(arr: PromiseLimitTimeArr, limit: number): void;
    static getInstance(): any;
    /**
     * 间隔时间
     * @param time
     * @returns
     */
    delay(time: number): Promise<void>;
    /**
     * 设置arr
     */
    set arr(val: PromiseLimitTimeArr);
    /**
     * 获取arr
     */
    get arr(): PromiseLimitTimeArr;
    get limitTime(): number;
    set limitTime(val: number);
    /**
     *
     * @param delayTime Execute a set of wait times 俩组之间的间隔时间
     * @callback callback  俩组之间的间隔函数
     */
    start(delayTime?: number, callback?: (...val: any) => void): Promise<any[]>;
}
export declare const promiseLimitTime: () => void;
