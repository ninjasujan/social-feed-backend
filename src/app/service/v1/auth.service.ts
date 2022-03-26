import crypto from 'crypto';

class Auth {
  encryptKey(password: string): { hash: string; salt: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return { salt, hash };
  }

  decryptKey(hash: string, salt: string) {
    return new Promise((resolve, reject) => {
      crypto.scrypt(hash, salt, 64, (error, password) => {
        if (error) {
          reject(error);
        }
        resolve({ password });
      });
    });
  }
}

export default new Auth();
