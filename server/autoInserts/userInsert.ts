import { Accounts } from "meteor/accounts-base";

export const SEED_USERNAME = 'meteorite';
export const SEED_PASSWORD = 'password';

export function insertUser() {
  /* Inserting default User if it's doesn't exist */
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
}