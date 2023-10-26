"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const gateway_adapter_1 = require("./notify/gateway.adapter");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalGuards();
    const configService = app.get(config_1.ConfigService);
    const adapter = new gateway_adapter_1.WebsocketAdapter(app, configService);
    app.useWebSocketAdapter(adapter);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map