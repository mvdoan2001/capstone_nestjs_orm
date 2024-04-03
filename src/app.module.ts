import { Module } from '@nestjs/common';
import { RootModule } from './modules/root.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './modules/user/passport/jwt.strategy';

@Module({
  imports: [RootModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  providers: [JwtStrategy]
})
export class AppModule {}
