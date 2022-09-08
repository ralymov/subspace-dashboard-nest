import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { RpcService } from '../../shared/services/rpc/rpc.service';

@Controller('state')
export class StateController {
  constructor(
    private readonly httpService: HttpService,
    private rpcService: RpcService,
  ) {}

  @Get('balance/:address')
  async getChainMethod(@Req() request: Request): Promise<any> {
    //TODO add validation (in some way)
    let test = await this.rpcService.callQuery(
      'system',
      'account',
      request.params.address,
    );
    return await this.rpcService.callQuery(
      'system',
      'account',
      request.params.address,
    );
  }
}
