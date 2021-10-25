const model = {
    defaults: {
        question: {
            className: 'question',
        },
        answer: {
            className: 'answer',
            onClick: quest => quest.next(),
        },
        screen: {
            className: 'screen'
        }
    },
    questions: [{
            title: 'Lorem1',
            answers: [
                { title: 'Ans1' },
                { title: 'Ans2' },
                { title: 'As3' },
            ]
        },
        {
            title: 'пробелы или табуляция?',
            answers: [
                { title: 'два пробела' },
                { title: 'четыре пробела' },
                {
                    title: 'табуляция',
                    onClick: quest => quest.show('fail')
                },
            ]
        },
        {
            title: 'История это',
            className: 'question trollface',
            answers: [{
                    title: 'наука',
                    onClick: quest => quest.show('fail')
                },
                { title: 'не наука' }
            ]
        }
    ],
    screens: {
        finish: {
            className: 'screen success',
            title: 'Прекрасно, вы прошли наше задание'
        },
        fail: {
            className: 'screen fail',
            title: 'Извините, вы ошиблись'
        },
    }
};

class Log {
    logs = [];
    addLog(obj, event) {
        this.logs.push([obj, event])
    }
    showLogs() {
        console.log(this.logs)
    }
}

class Quest {
    numberQuestion = 0;
    static logs;
    answerClassName;
    $screen = document.querySelector(".screen")
    constructor() {
        //Load default
        const $screenSuccessTitle = document.querySelector(".screen .success .title")
        $screenSuccessTitle.innerText = model.screens.finish.title

        const $screenFailTitle = document.querySelector(".screen .fail .title")
        $screenFailTitle.innerText = model.screens.fail.title

        this.logs = new Log();

    }
    setState(name = "surveys") {
        this.$screen.classList.remove("fail", "start", "success", "surveys")
        this.$screen.classList.add(name)
    }
    init() {
        this.setState("surveys")
        quest.numberQuestion = 0;
        quest.renderQuest(model.questions[0]);

        this.logs.addLog(null, "new survey");
        this.logs.showLogs()
    }
    getAnswerDom(el) {
        const $span = document.createElement('span');
        $span.innerText = el.title;
        const $div = document.createElement('div');
        $div.classList.add("option");
        $div.appendChild($span);

        if (el.onClick)
            $div.addEventListener('click', () => el.onClick(this)); //closure
        else
            $div.addEventListener('click', () => model.defaults.answer.onClick(this)); //closure

        return $div
    }

    setTitle(obj) {
        const $title = document.querySelector(".question .title");
        $title.innerText = obj.title;
    }

    renderAnswers(obj) {
        const $answers = document.querySelector(".answers");
        $answers.innerHTML = '';

        obj.answers.forEach(el => {
            const $answer = this.getAnswerDom(el)
            $answers.appendChild($answer);
        });
    }
    renderQuest(obj) {
        const $question = document.querySelector(".screen .surveys .question")
        $question.classList = (!obj.className ? model.defaults.question.className : obj.className)

        this.setTitle(obj);
        this.renderAnswers(obj);
    }
    show(type) {
        if (type === 'fail') {
            this.setState("fail")
            this.logs.addLog(model.questions[this.numberQuestion], type);
            setTimeout(() => {
                this.setState("surveys");
            }, 1000);
        }
        if (type === 'finish') {
            this.logs.addLog(null, type);
            this.setState("success")
        }
    }
    next() {
        this.logs.addLog(model.questions[this.numberQuestion], "true");
        this.numberQuestion++;
        if (model.questions[this.numberQuestion]) {
            this.renderQuest(model.questions[this.numberQuestion])
        } else {
            this.show("finish")
        }
    }

}

const quest = new Quest();

$buttonsStart = document.querySelectorAll(".screen .begin")
$buttonsStart.forEach($button => {
    $button.addEventListener("click", () => quest.init())
});



/*
Задача для JS, версия - ES6.

Есть следующая модель:


Реализуйте движок тестов со следующей логикой:
- вопросы показываются один за другим;
- если не указаны такие параметры как onClick/className/title - используются данные из model.defaults;
- после ответов на все вопросы показывается блок с контентом model.screens.finish;
- должна существовать кнопка "пройти ещё раз" на финишных экранах;
- где-то в движке должен быть лог прохождения, который при необходимости можно будет посмотреть или отправить;
- для блоков ответов и вопросов используйте любой шаблонизатор;
- при смене вопросов должен быть какой-нибудь симпатичный эффект любой степени безумия;
- продемонстрируйте своё чувство прекрасного: свистелки-тени-закруглённые углы;
- сверстайте это так, чтобы работало на мобильных и десктопе;
- пришлите репозиторий или архив (.zip/.tar/.tgz) с готовым вариантом;
*/