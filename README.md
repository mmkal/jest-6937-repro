# jest-6937-repro

Based on https://github.com/facebook/jest/issues/6937#issuecomment-588219651

## Requirements

`yarn` and `docker-compose` on your path

## Run

```bash
yarn
yarn test
```

Notice that you get 

```
Jest did not exit one second after the test run has completed.

This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```

Now add the `afterAll(() => new Promise(r => setTimeout(r, 0)))` workaround:

```bash
AFTER_ALL_WORKAROUND=true yarn test
````

Notice that it exits as expected.
