const config = {
    exchanges: {
        HELLO: {
            name: 'hello',
            type: 'direct',
            options: {
                durable: true,
            },
            queues: {
                WORLD: {
                    name: '_hello.world',
                    binding: '_hello.world',
                    options: {
                        durable: true,
                    },
                },
            },
        },
        UPLOAD_RESULT: {
            name: 'uploadResult',
            type: 'direct',
            options: {
                durable: true,
            },
            queues: {
                UPLOAD_COVER: {
                    name: '_cover',
                    binding: '_cover',
                    options: {
                        durable: true,
                    },
                },
                UPLOAD_BOOK: {
                    name: '_book',
                    binding: '_book',
                    options: {
                        durable: true,
                    },
                }
            }
        }
    },
};

export default config;
