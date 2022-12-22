import {Module} from "@nestjs/common";
import {ConstraintsFactory} from "./constraints.factory";

@Module({
    providers: [
        ConstraintsFactory
    ],
    exports: [
        ConstraintsFactory
    ]
})
export class ConstraintsModule {
}