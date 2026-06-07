import { HisfocusCommands } from "./hisfocus.commands";
import {HisfocusParser } from "./hisfocus.parser";
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

    async getOltOpticalInfo(
        eponPort: string
    ) {
        const raw = await this.execute(
            HisfocusCommands.oltOptical(
                eponPort
            )
        )
        return HisfocusParser.parseOltOpticalInfo(
            raw,
            eponPort
        )
    }
    async getOltOpticalPorts() {
        const ports = []
        for (
            let port = 1;
            port <= 16;
            port++
        ) {

            const eponPort = `0/${port}`
            const raw = await this.execute(
                HisfocusCommands.oltOptical(eponPort)
            )
            if(raw.includes('Interface num') && raw.includes('invalid')) {
                console.log(`STOP AT ${eponPort}`)
                break
            }
            ports.push(
                HisfocusParser.parseOltOpticalInfo(raw, eponPort)
            )
        }
        return ports
    }

    async showSystem() {
        await this.session.enable()
        const rawSystem = await this.execute(
            HisfocusCommands.showSystem()
        )
        return HisfocusParser.parseSystemInfo(rawSystem)
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

    async getOnuList(
        pon: string
    ) {
        await this.session.enable()
        const onus = await this.session.execute(`show onu info epon ${pon} all`)
        return HisfocusParser.parseOnuList(onus)
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