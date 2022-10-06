import { Meteor } from "meteor/meteor";

export function asyncCallMeteorMethod<T>(methodName: string, ...args: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    Meteor.call(methodName, ...args, (error: Meteor.Error, result: T) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}