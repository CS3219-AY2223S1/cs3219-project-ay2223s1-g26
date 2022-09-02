import { createUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(name, username, password) {
  try {
    const response = await createUser({name, username, password});
    console.log('response', response);
    if (response.error) {
      throw new Error(response.error)
    }
    const newUser = response.userModel
    newUser.save();
    return true;
  } catch (err) {
    console.log('ERROR: Could not create new user', err);
    return { err };
  }
}

