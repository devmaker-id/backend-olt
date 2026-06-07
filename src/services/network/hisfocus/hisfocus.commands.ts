export class HisfocusCommands {
    static saveConfig() {
        return 'write'
    }
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
    static renameOnu (
        epon: string,
        onuId: string,
        name: string
    ) {
        return [
            'configure terminal',
            `interface epon ${epon}`,
            `onu ${onuId} name ${name}`,
            'exit',
            'exit'
        ]
    }
    static deleteOnu(
        epon: string,
        onuId: string
    ) {
        return [
            'config terminal',
            `interface epon ${epon}`,
            `delete onu ${onuId}`,
            'exit',
            'exit'
        ]
    }
}