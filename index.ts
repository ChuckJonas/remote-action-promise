interface RemoteActionEvent<T> {
  action: string;
  method: string;
  ref: boolean;
  result: T
  status: boolean
  statusCode: number
  tid: number
  type: string,
  message?: string;
}

export const promisifyRemoteAction = <I extends any[], R>(func: Function) => (...args: I): Promise<R> => {
  return new Promise((resolve, reject) => {
    func(...args, (result: R, event: RemoteActionEvent<R>) => {
      return event.status ? resolve(result) : reject(event.message);
    })
  });
}



