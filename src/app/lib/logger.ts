import winston from 'winston'
import path from 'node:path'
import fs from 'node:fs'

const logDir = path.resolve(__dirname, '../../../../logs')

// pastiin folder logs ada
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'backend-api' },
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        }),

        new winston.transports.File({
            filename: path.join(logDir, 'combined.log'),
        })
    ]
})

export { logger }