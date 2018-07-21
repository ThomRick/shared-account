import { Injectable, HttpService } from '@nestjs/common';
import { IAddSharedAccountExpendDto } from './models';

@Injectable()
export class ExpendsService {
  constructor(private readonly http: HttpService) {}

  public async addExpend(accountID: string, expend: IAddSharedAccountExpendDto): Promise<void> {
    await this.http.post('http://localhost:8081/commands/shared-account', {
      name: 'ADD_SHARED_ACCOUNT_EXPEND',
      payload: {
        accountID,
        expend,
      },
    });
  }
}
