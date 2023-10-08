import * as dps from './deepspace'
import { ENV_TYPES } from './deepspace'

export const ENV_VAR: any = process.env['NEXT_PUBLIC_ENVIRONMENT']
    ? process.env.NEXT_PUBLIC_ENVIRONMENT.toUpperCase()
    : 'DEVELOPMENT'

export const ENVIRONMENT: ENV_TYPES = ENV_TYPES[ENV_VAR as keyof typeof ENV_TYPES]

function getConfig(envKey: string, defaultValue: string) {
    const varName = 'NEXT_PUBLIC_' + envKey
    if (process.env[varName]) {
        return process.env[varName]
    }
    return defaultValue
}

const config = {
    ASSETS_BASE_URI: getConfig('ASSETS_BASE_URI', dps.ENV_ASSETS_BASE_URI[ENVIRONMENT]),
    SUBGRAPH_NFT: getConfig('SUBGRAPH_NFT', dps.ENV_SUBGRAPH_NFT[ENVIRONMENT]),
}
export default config