export class SyslogIpFilter {
    static isAllowed(
        sourceIp: string,
        allowedIps: string[]
    ): boolean {
        //jiak whithlist kosong
        //berarti semua ip diperbolehakn
        if(allowedIps.length === 0) {
            return true
        }

        return allowedIps.includes(
            sourceIp
        )
    }
}