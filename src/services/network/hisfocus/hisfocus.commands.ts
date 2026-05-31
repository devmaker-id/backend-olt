export class HisfocusCommands {
    static onuInfo(
        epon: string,
        onuId: string
    ) {
        return `show onu info epon ${epon} ${onuId}`
    }
    static opticalInfo(
        epon: string,
        onuId: string
    ) {
        return `show onu optical-ddm epon ${epon} ${onuId}`
    }
    static onuList(
        epon: string
    ) {
        return `show onu info epon ${epon} all`
    }
}