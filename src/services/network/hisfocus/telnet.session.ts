import { TelnetTransport } from "./telnet.transport"

export interface loginOptions {
    username : string
    password : string
}

export class TelnetSession {
    private enabled = false
    private readonly PROMPT = /[>#]\s*$/i
    private readonly PAGINATION = /Enter Key To Continue/i

    private sleep(
        ms: number
    ) {
        return new Promise(
            resolve => {
                setTimeout(
                    resolve,
                    ms
                )
            }
        )
    }

    constructor(
        private transport: TelnetTransport
    ) {}

    async login(options: loginOptions) {
        await this.transport.waitFor(/Username:/i)
        console.log('USERNAME_PROMPT')
        this.transport.write(
            options.username + '\r\n'
        )
        this.transport.clearBuffer()
        await this.transport.waitFor(/Password:/i)
        console.log('PASSWORD_PROMPT')
        this.transport.write(
            options.password + '\r\n'
        )
        this.transport.clearBuffer()
        const prompt = await this.transport.waitFor( this.PROMPT )
        console.log('LOGIN_SUCCESS')

        this.enabled = false
        return prompt
    }

    async enable() {
        if ( this.enabled ) {
            return
        }
        console.log('ENABLE_MODE')
        await this.execute('enable')
        this.enabled = true
    }

    async writeFile() {
        await this.enable()
        this.transport.clearBuffer()
        this.transport.write( 'wr\r\n' )
        return this.transport.waitFor(
            /Configuration file saved ok!/i,
            20000
        )
    }

    async execute(
        command: string,
        timeout = 5000
    ) {
        console.log('EXECUT:', command)

        this.transport.clearBuffer()
        this.transport.write(
            command + '\r\n'
        )
        while(true){
            const buffer = this.transport.getBuffer()
            if(this.PROMPT.test(buffer)){
                return buffer
            }

            //pagination
            if(this.PAGINATION.test(buffer)) {
                // console.log(
                //     'PAGINATION',
                //     new Date().toISOString()
                // )
                this.transport.write('\r\n')
                await this.sleep(200)
            }
            if(Date.now() - this.transport.getLastDataAt() > timeout){
                console.log(
                    'LAST_BUFFER',
                    buffer.slice(-200)
                )
                throw new Error(
                    'COMMAND_TIMEOUT'
                )
            }
            await this.sleep(50)
        }
    }
}