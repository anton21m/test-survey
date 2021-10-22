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
            title: 'выберите лишнее',
            answers: [
                { title: 'mac os' },
                { title: 'windows' },
                { title: 'linux' },
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

class Quest {
    questionClassName;
    static numberQuestion = 0;
    answerClassName;
    obj;

    constructor() {
        //Load default
        this.questionClassName = model.defaults.question.className;
        this.answerClassName = model.defaults.answer.className;
    }
    renderQuestion(obj) {

    }
}

quest;

function init() {
    //подготовка экрана
    screen = new Quest();


}

init();



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