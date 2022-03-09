export interface PromiseLimitTimeItem {
  /**
   * 入参
   */
  attr: Record<any, any>;
  /**
   * 回调函数
   */
  callback: (val: Record<any, any>) => Promise<any>;
}
export type PromiseLimitTimeArr = PromiseLimitTimeItem[];
