export const HisfocusCommands = {
  enable: 'enable',

  showSystem: 'show system',

  showNetwork: 'show network',

  showOnuInfo: (
    epon: string,
    onuId: string
  ) =>
    `show onu info epon ${epon} ${onuId}`,

  showOpticalInfo: (
    epon: string,
    onuId: string
  ) =>
    `show onu optical-ddm epon ${epon} ${onuId}`,

  renameOnu: (
    epon: string,
    onuId: string,
    name: string
  ) =>
    `onu ${onuId} name ${name}`
}