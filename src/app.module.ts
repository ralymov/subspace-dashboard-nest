import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RpcController } from './nodes/rpc/rpc.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RpcService } from './shared/services/rpc/rpc.service';
import { StateController } from './blockchain/state/state.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({
      headers: { 'Content-Type': 'application/json', Host: '127.0.0.1:9933' },
    }),
  ],
  controllers: [AppController, RpcController, StateController],
  providers: [AppService, RpcService],
})
export class AppModule {}
