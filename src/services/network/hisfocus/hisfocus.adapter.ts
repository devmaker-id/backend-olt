import { HisfocusCommands } from "./hisfocus.commands";
import { HisfocusParser } from "./hisfocus.parser";
import { UNKNOWN_OPTICAL } from "./hisfocus.types";
import { TelnetSession } from "./telnet.session";

export class HisfocusAdapter {
    constructor( private session: TelnetSession ) {}
    private async execute(
        command:string
    ) {
        await this.session.enable()
        return this.session.execute(
            command
        )
    }

    async saveConfig() {
        return this.session.writeFile()
    }

    async getOnuInfo(
        epon: string,
        onuId: string
    ) {
        const raw = await this.execute(
            HisfocusCommands.onuInfo(
                epon,
                onuId
            )
        )
        return HisfocusParser.parseOnuInfo(raw)
    }

    async getOpticalInfo(
        epon:string,
        onuId:string
    ) {
        const raw = await this.execute(
            HisfocusCommands.opticalInfo(
                epon, onuId
            )
        )
        return HisfocusParser.parseOpticalInfo(raw)
    }

    async getCompleteOnuInfo(
        epon:string,
        onuId:string
    ) {
        const onu = await this.getOnuInfo(epon, onuId)
        let optical = UNKNOWN_OPTICAL

        if(onu.is_online) {
            optical = await this.getOpticalInfo(epon, onuId)
        }
        return {
            onu, optical
        }
    }

    async renameOnu(
        epon: string,
        onuId: string,
        name: string
    ) {
        await this.session.enable()
        const commands = HisfocusCommands.renameOnu(
            epon,
            onuId,
            name
        )
        for (
            const command of commands
        ) {
            await this.session.execute(
                command
            )
        }
        return true
    }

    async deleteOnu(
        epon: string,
        onuId: string
    ) {
        await this.session.enable()
        const commands = HisfocusCommands.deleteOnu(
            epon,
            onuId
            )
        for (
            const command
            of commands
        ) {
            await this.session.execute(
            command
            )
        }
        return true
    }
}