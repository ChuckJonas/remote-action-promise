# Promisify Salesforce Remote Actions

This library is used to convert a Salesforce VisualForce remote action into a promise.  It is written in typescript and allows you to quickly define types for the resulting function.

## Usage

### Apex Controller

``` java
public class MyController{
  @RemoteAction
  public static String foo(String param1, Integer param2, Boolean param3) {
    return 'hello world';
  }
}
```

### typescript
``` ts
import { promisifyRemoteAction } from 'remote-action-promise';

//this gets injected on the global scope so we need to declare it if using typescript
declare var MyController: {
  foo: any;
};

// this syntax requires Typescript > 4.0
// can use unnamed tuple instead
type FooParams = [param1: string, param2: number, param3: boolean];

const fooRemoteAction = promisifyRemoteAction<FooParams, string>(MyController.foo);

(async() => {

  try{
    const stringResult = await fooRemoteAction('hello', 42, true);
  }catch(e){
    console.log('error', e);
  }

})()

```
