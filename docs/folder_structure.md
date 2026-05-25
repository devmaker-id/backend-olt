# Folder Structure

```txt
|- docs/
|
|- src/
|  |
|  |- modules/
|  |  |
|  |  |- auth/
|  |  |
|  |  |- olt/
|  |
|  |- services/
|     |
|     |- network/
|     |  |
|     |  |- core/
|     |  |  |
|     |  |  |- connection.manager.ts
|     |  |  |- network.factory.ts
|     |  |
|     |  |- transport/
|     |  |  |
|     |  |  |- telnet.transport.ts
|     |  |
|     |  |- vendors/
|     |     |
|     |     |- global/
|     |     |  |
|     |     |  |- network.types.ts
|     |     |
|     |     |- hisfocus/
|     |        |
|     |        |- hisfocus.adapter.ts
|     |        |- hisfocus.commands.ts
|     |        |- hisfocus.parser.ts
|     |
|     |- syslog/
|        |
|        |- core/
|        |  |
|        |  |- syslog.server.ts
|        |  |- syslog.types.ts
|        |
|        |- vendors/
|           |
|           |- hisfocus/
|              |
|              |- hisfocus.syslog.parser.ts
|              |- hisfocus.syslog.service.ts
|
|- prisma/
|  |
|  |- schema.prisma
|
|- .env
|- package.json
|- tsconfig.json
```