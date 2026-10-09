
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',

                host: configService.getOrThrow<string>('DB_HOST'),

                port: Number(
                    configService.get<string>('DB_PORT') ?? 3306
                ),

                username: configService.getOrThrow<string>('DB_USERNAME'),

                password: configService.getOrThrow<string>('DB_PASS'),

                database: configService.getOrThrow<string>('DB_DATABASE'),

                autoLoadEntities: true,

                synchronize: false,
            }),
        }),
    ],

    providers: [DatabaseService],

    exports: [DatabaseService],
})
export class DatabaseModule { }
