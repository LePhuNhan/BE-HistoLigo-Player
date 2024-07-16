import SessionModel from "../model/session.model.js";
export async function createSession(userId) {
  const session = await SessionModel.create({
    userId,
    valid: true,
  });
  return session;
}

export async function getSession(_id) {
  const session = await SessionModel.findOne({ _id });
  return session && session.valid ? session : null;
}


export async function invalidateSession(_id) {
  await SessionModel.findOneAndUpdate({ _id }, { isValid: false });
}

