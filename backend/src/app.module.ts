import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './api/admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BackupModule } from './backup/backup.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'postgres' as const,
        host: c.get<string>('DB_HOST', 'localhost'),
        port: Number(c.get('DB_PORT', 5432)),
        username: c.getOrThrow<string>('DB_USER'),
        password: c.getOrThrow<string>('DB_PASSWORD'),
        database: c.getOrThrow<string>('DB_NAME'),
        autoLoadEntities: true,
        // Tự đồng bộ bảng theo entity: tiện khi phát triển, KHÔNG nên bật ở môi trường thật.
        synchronize: c.get<string>('DB_SYNC', 'true') === 'true',
      }),
    }),
    AuthModule,
    AdminModule,
    BackupModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
