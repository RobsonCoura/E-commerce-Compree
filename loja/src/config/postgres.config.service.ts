import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";
@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {

    //Assim que a classe for importada o construtor executa.
    constructor(private configService: ConfigService) { }

    //Função retornará as configurações do banco para conectar e fazendo a proteção de dados sensíveis.
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('5432'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [],
            synchronize: true
        }
    }
}