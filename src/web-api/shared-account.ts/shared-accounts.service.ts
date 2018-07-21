import { Injectable, HttpService } from '@nestjs/common';
import { ICreateSharedAccountDto } from './models/create-shared-account.dto';
import { AxiosResponse } from '../../../node_modules/axios';
import { ISharedAccountModel } from 'app/core/domain/read-models';

@Injectable()
export class SharedAccountsService {

  constructor(private readonly http: HttpService) {}

  public async create(accountToCreate: ICreateSharedAccountDto): Promise<ISharedAccountModel> {
    await this.http.post('http://localhost:8081/commands/shared-account', {
      name: 'CREATE_SHARED_ACCOUNT',
      payload: accountToCreate,
    }).toPromise();
    const response: AxiosResponse<any> = await this.http.get('http://localhost:8081/queries/shared-account')
      .toPromise();
    return this.map(response.data[ 0 ]);
  }

  public async findAll(): Promise<ISharedAccountModel[]> {
    const response: AxiosResponse<any> = await this.http.get('http://localhost:8081/queries/shared-account')
      .toPromise();
    return response.data.map((account) => this.map(account));
  }

  public async findById(id: string): Promise<ISharedAccountModel> {
    const response: AxiosResponse<any> = await this.http.get(`http://localhost:8081/queries/shared-account/${ id }`)
      .toPromise();
    return this.map(response.data);
  }

  private map(aggregate: any): ISharedAccountModel {
    return {
      accountID: aggregate._id,
      description: aggregate._description,
      expends: aggregate._expends,
      owner: aggregate._owner,
      users: aggregate._users,
    };
  }
}
