const backgrounds = new BackgroundsModule(['main']);


const S = Storage.create(
    {
        balance: 500,
        bet: 10,
        music: true,
        fish: [],
        dirt: 0
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
