const VC = new ViewController();
VC.setView('license');
// VC.setView('shop');

const SKIT = {
    1: 20,
    2: 50,
    3: 80,
    4: 50,
    5: 20
}

class Game {
    constructor() {
        this.personEl = q('.game__person')[0];
        this.ball2 = this.personEl.querySelector('.person__ball2');
        this.ball = this.personEl.querySelector('.person__ball');
        this.ball2.style.opacity = '0';
        this.ball.style.opacity = '1';
        this.powerPosition = 50;
        this.throwPower();
        this.stopped = true;
    }

    buldLevel() {
        S.round = 1;
        this.stopped = false;
        S.skitle = 5;
        q(`.skit`).removeClass('throwed');
        q('.throw-button').activate();
        q('.end-modal').deactivate();
    }

    preventTrow() {
        this.ball2.style.opacity = '0';
        this.ball.style.opacity = '1';
        this.personEl.classList.remove('on-throw');
        this.ball2.classList.remove('ball2_to-right');
    }

    throwBall() {
        if (S.round > 2) {
            return;
        }
        this.stopped = true;

        let ended = false;

        this.personEl.classList.add('on-throw');
        setTimeout(() => {
            this.ball2.style.opacity = '1';
            this.ball.style.opacity = '0';
            this.ball2.classList.add('ball2_to-right');
        }, 299);

        setTimeout(() => {
            this.throwSkitlles();
            if (S.round === 2) {
                this.preventTrow();
                q('.end-modal').activate();
                ended = true;
                const win = (5 - S.skitle) * 10 * S.level;
                q('.row')[0].innerHTML = `+${win}`;
                S.balance += win;
                if (S.skitle == 0) {
                    q('.row')[1].innerHTML = `+${50 * S.level} bonus`;
                    S.balance += 50 * S.level;
                } else {
                    q('.row')[1].innerHTML = ``;
                }

                if (S.skitle == 5) {
                    q('.row')[0].innerHTML = `You lose`;
                    q('.next-level-btn')[0].innerHTML = 'Retry';
                    q('.next-level-btn')[0].dataset.retry = 1;
                } else {
                    q('.next-level-btn')[0].innerHTML = 'Next level';
                    q('.next-level-btn')[0].dataset.retry = 0;
                }

            }
        }, 1000);

        setTimeout(() => {
            this.preventTrow();
            q('.throw-button').activate();
            if (ended) { return; }
            S.round++;
            this.stopped = false;
        }, 2000);
    }

    throwSkitlles() {
        for (let i = 1; i <= 5; i++) {
            const chanse = (50 + random(50) - (Math.abs(SKIT[i] - this.powerPosition)));
            if (i < 4) {
                console.log(i, chanse);
            }
            if (chanse > random(100) && !q(`.skit_${i}`)[0].classList.contains('throwed')) {
                q(`.skit_${i}`)[0].classList.add('throwed');
                S.skitle--;
            }
        }
    }


    throwPower() {
        let direction = 1;

        this.intervalId = setInterval(() => {
            if (this.stopped) { return; }

            this.powerPosition += direction * S.level / 3;

            if (this.powerPosition >= 100) {
                this.powerPosition = 100;
                direction *= -1;
            }

            if (this.powerPosition <= 0) {
                this.powerPosition = 0;
                direction *= -1;
            }

            q('.power__value')[0].style.left = `${this.powerPosition}%`;
        }, 10);
    }
}

const g = new Game()

q('.level').on('click', function () {
    S.level = +this.getAttribute('data-level');
    VC.setView('game');
    g.buldLevel();
});

q('.throw-button').on('click', function () {
    this.deactivate();
    g.throwBall()
});

q('.next-level-btn').on('click', function () {
    if (S.level < 5 && +this.dataset.retry !== 1) {
        S.level++;
    }
    g.buldLevel();
});

gameView.on('deactivate', () => {
    q('.throw-button').deactivate();
})


function updateShopView() {
    for (let i = 1; i < 5; i++) {
        const el = q('.person-select')[i - 1];
        el.classList.remove('selected');
        el.classList.remove('buyed');
        el.classList.remove('to-buy');

        if (S.persons[i] === 0) {
            el.classList.add('to-buy');
        }

        if (S.persons[i] === 1) {
            el.classList.add('buyed');
        }

        if (S.persons[i] === 2) {
            el.classList.add('selected');
        }
    }

    updatePerson();
}

updateShopView();


q('.person-select').on('click', function () {
    const price = +this.dataset.price;
    const index = +this.dataset.index;

    if (this.classList.contains('to-buy')) {
        if (S.balance >= price) {
            S.balance -= price;
            S.persons[index] = 1;
            S.persons = S.persons;
        }
        updateShopView();
        return;
    }

    if (this.classList.contains('buyed')) {
        for (let i = 1; i <= 4; i++) {
            if (S.persons[i] === 2) {
                S.persons[i] = 1;
            }
        }
        S.persons[index] = 2;
        S.persons = S.persons;
        updateShopView();
        return;
    }
});


function updatePerson() {
    let index = 0;
    for (let i = 1; i <= 4; i++) {
        if (S.persons[i] === 2) {
            index = i;
        }
    }

    q('.person__person').forEach(e => {
        e.setAttribute('src', `./img/hero_${index}.png`)
    })
}
