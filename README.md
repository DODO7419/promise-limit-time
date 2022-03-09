# promise-limit-time

## PainPoint

- If meanwhile too much Promise all. We will be very passive This greatly affects performance

### Installation

npm i -s promise-limit-time

### Usage
```js
const { PromiseLimitTime } = require("promise-limit-time");
function log(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log(val);
      resolve(val);
    }, 1000);
  });
}

const queueArr = [
  {
    attr: {
      index: 1,
    }, // Enter reference
    async callback(attr) {
      return log(attr);
    },
  },
  {
    attr: {
      index: 2,
    }, // Enter reference
    async callback(attr) {
      return log(attr);
    },
  },
  {
    attr: {
      index: 3,
    }, // Enter reference
    async callback(attr) {
      return log(attr);
    },
  },
];

async function use() {
  const queueTask = PromiseLimitTime.getInstance().init(queueArr, 2);
  const res = await queueTask.start(1000, (val) => {
    console.log(val);
  });
}
use();

```