import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import path from 'path/posix';
import fs from 'fs';

class Auth {
    public encryptKey(password: string): { hash: string; salt: string } {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');
        return { salt, hash };
    }

    public decryptKey(password: string, salt: string): string {
        const decryptKey = crypto
            .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
            .toString('hex');
        return decryptKey;
    }

    public generateToken(payload: Object) {
        const secret = fs.readFileSync(
            path.join(__dirname, '..', '..', '..', 'secrets', 'private.pem'),
        );
        const token = jwt.sign(payload, secret, {
            algorithm: 'RS256',
        });
        return token;
    }
}

export default new Auth();
