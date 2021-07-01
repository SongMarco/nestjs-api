import * as bcrypt from 'bcrypt';

// compare hashed with plain text
export const comparePassword = async (password, hashedPassword): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// generate hash with plain text
export const hashPassword = async (plainText): Promise<string> => {
  const DEFAULT_SALT_ROUNDS = 10;
  return await bcrypt.hash(plainText, DEFAULT_SALT_ROUNDS);
};