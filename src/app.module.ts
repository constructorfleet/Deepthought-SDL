import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from "@nestjs/graphql";
import {ConstraintsFactory} from "./schema/constraints/constraints.factory";
import {join} from "path";
import {GraphQLSchema} from "graphql/type";
import {ConstraintsModule} from "./schema/constraints/constraints.module";
import {ApolloDriver} from "@nestjs/apollo";

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            driver: ApolloDriver,
            useFactory: (factory: ConstraintsFactory) => {
                return {
                    typePaths: ['./**/*.graphql'],
                    debug: true,
                    playground: true,
                    installSubscriptionHandlers: true,
                    definitions: {
                        path: join(process.cwd(), 'src/graphql.schema.ts'),
                        customScalarTypeMapping: {
                            RegEx: 'string',
                            Password: 'string'
                        }
                    },
                    transformSchema: factory.transformSchema,
                };
            },
            imports: [ConstraintsModule],
            inject: [ConstraintsFactory]
        }),],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
