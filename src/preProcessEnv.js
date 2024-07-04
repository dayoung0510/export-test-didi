import cryptoUtils from './utils/cryptoUtils.ts';
import fs from 'fs';
import dotenv from 'dotenv';

/* .env.local 파일에있는 오리지널socketURL */
dotenv.config({ path: '.env.local' });
const originalUrl = process.env.VITE_SOCKET_URL || '';

/* 암호화할 키값 생성 + 오리지널socketURL 암호화 */
const key = cryptoUtils.generateKeys().publicKey;
const encryptedUrl = cryptoUtils.encrypt(originalUrl, key);

/* 암호화된 socketURL을 .env파일에 저장 */
fs.writeFileSync('.env', `VITE_SOCKET_ENCRYPTED_URL=${encryptedUrl}\nVITE_SOCKET_KEY=${key}`);
