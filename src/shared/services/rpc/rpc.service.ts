import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiPromise, WsProvider } from '@polkadot/api';

@Injectable()
export class RpcService {
  private readonly host: string = this.configService.get<string>('RPC_ADDRESS');
  private polkadotApi: ApiPromise;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.init();
  }

  async init() {
    const wsProvider = new WsProvider(`ws://${this.host}`);
    this.polkadotApi = await ApiPromise.create({ provider: wsProvider });
  }

  callRpc(method: string) {
    const URL = `http://${this.host}`;
    const data = { jsonrpc: '2.0', method: method, params: [], id: 1 };
    return firstValueFrom(this.httpService.post(URL, data)).then(
      (response) => response.data.result,
    );
  }

  async callRpcWss(module: string, method: string) {
    return this.polkadotApi.rpc[module][method]();
  }

  async callQuery(module: string, method: string, data: string) {
    return this.polkadotApi.query[module][method](data);
  }
}
