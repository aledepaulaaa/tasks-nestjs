export const VALIDATE_RESOURCES_IDS_KEY = 'validate-resources-ids'
export const userAttributes = {
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
        },
    },
}

export const authorAttributes = {
    author: {
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
        },
    },
    task: {
        select: {
            id: true,
            title: true,
            projectId: true,
        },
    },
}

export const EMAIL_QUEUE = 'email_queue'
export const EMAIL_SERVICE = 'EMAIL_SERVICE'
export const SEND_PASSWORD_RESET = 'SEND_PASSWORD_RESET'
