import { Injectable, HttpService } from '@nestjs/common';
import { IAddSharedAccountUserDto } from './models';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  public async addUser(accountID: string, user: IAddSharedAccountUserDto): Promise<void> {
    await this.http.post('http://localhost:8081/commands/shared-account', {
      name: 'ADD_SHARED_ACCOUNT_USER',
      payload: {
        accountID,
        userID: user.userID,
      },
    }).toPromise();
  }
}