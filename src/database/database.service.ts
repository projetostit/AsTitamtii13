import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
    private pool: Pool;
    constructor(private readonly configService: ConfigService) {
        this.pool = createPool({
            host: this.configService.get<string>('DB_HOST'),
            port: Number(this.configService.get<string>('DB_PORT') ?? 3306),
            user: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASS'),
            database: this.configService.get<string>('DB_DATABASE'),
        });
    }

    async query(sql: string, params?: any[]) {
        const [resultado] = await this.pool.execute(sql, params);
        return resultado;
    }
}
