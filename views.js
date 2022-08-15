const backgrounds = new BackgroundsModule(['main', 'menu', 'game']);

const S = Storage.create(
    {
        balance: 500,
        bet: 10,
        music: true,
        fish: [],
        level: 1,
        round: 1,
        skitle: 5,
        dirt: 0,
        persons: {
            1: 2,
            2: 0,
            3: 0,
            4: 0
        }
    },
    // {
    //     bet: (value, _S) => {
    //         if (value < 10) {
    //             _S.bet = 10;
    //         }

    //         if (value > _S.balance) {
    //             _S.bet = Math.floor(_S.balance / 10) * 10;
    //         }
    //     },

    //     balance: (value, _S) => {
    //         if (value < 10) {
    //             _S.balance = 100;
    //         }
    //     }
    // }
);

new View('license',
    () => {
        backgrounds.setActive('main');
    }
);


new View('menu', () => {
    backgrounds.setActive('menu');
})

new View('shop', () => {
    backgrounds.setActive('menu');
})

const gameView = new View('game', () => {
    backgrounds.setActive('game');
})