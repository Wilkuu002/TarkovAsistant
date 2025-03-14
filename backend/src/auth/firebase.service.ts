import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import axios from 'axios';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (!credentialsPath) {
      throw new Error(
        'GOOGLE_APPLICATION_CREDENTIALS is not set in the environment variables.',
      );
    }

    const fullPath = path.resolve(credentialsPath);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(require(fullPath)),
      });
    }
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return await admin.auth().verifyIdToken(token);
  }
  async loginUser(email: string, password: string): Promise<string> {
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      throw new Error('FIREBASE_API_KEY is not set in the environment variables.');
    }
  
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
  
      return response.data.idToken;
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      throw new Error('Invalid email or password');
    }
  }

  async createUser(email: string, password: string,): Promise<admin.auth.UserRecord> {
    try {
      // nowy user
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });

      return userRecord;
    } catch (error) {
      console.error("Błąd podczas tworzenia użytkownika:", error);
      throw new Error('Nie udało się utworzyć użytkownika');
    }
  }
  async resetPassword(email:string):Promise<string> {
    try{
      const resetLink = await admin.auth().generatePasswordResetLink(email);
      return resetLink;
    }catch(error){
      console.log("Error accured during sending restart link", error)
      throw new Error("Mail with link was not sent")
    }
  }
}
