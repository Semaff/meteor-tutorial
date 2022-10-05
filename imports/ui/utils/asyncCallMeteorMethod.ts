import { Meteor } from "meteor/meteor";

export function asyncCallMeteorMethod(methodName: string, ...args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    Meteor.call(methodName, ...args, (error: Meteor.Error, result: any) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}