import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { RpcService } from '../../shared/services/rpc/rpc.service';

@Controller('rpc')
export class RpcController {
  constructor(
    private readonly httpService: HttpService,
    private rpcService: RpcService,
  ) {}

  public readonly acceptedChainCalls: string[] = [
    'getFinalizedHead',
    'getHeader',
    'getBlock',
  ];
  public readonly acceptedStateCalls: string[] = [
    'getMetadata',
    'getRuntimeVersion',
  ];
  public readonly acceptedSystemCalls: string[] = [
    'chain',
    'chainType',
    'health',
    'name',
    'networkState',
    'syncState',
    'version',
  ];

  @Get('chain/:method')
  async getChainMethod(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('chain', request.params.method);
  }

  @Get('state/:method')
  async getStateMethod(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('state', request.params.method);
  }

  @Get('system/:method')
  async getSystemMethod(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', request.params.method);
  }

  //OLD
  @Get('finalized-head')
  async getFinalizedHead(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('chain', 'getFinalizedHead');
  }

  @Get('chain')
  async getChain(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', 'chain');
  }

  @Get('chain-type')
  async getSyncSpec(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', 'chainType');
  }

  @Get('health')
  async getHealth(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', 'health');
  }

  @Get('name')
  async getName(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', 'name');
  }

  @Get('network-state')
  async getNetworkState(@Req() request: Request): Promise<string> {
    return await this.rpcService.callRpcWss('system', 'networkState');
  }
}
