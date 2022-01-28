'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const
        textArea = document.getElementById('idfForm'),
        button = document.querySelector('button'),
        dataContainer = document.getElementById('result');

    //Обработка события формы
    button.onclick = function() {
        let textForm = textArea.value;
        getData(textForm.trim());
    };

    //Получаем список ключей из формы и формируем их в список
    function getData(textForm) {
        const listData = textForm.split('\n');
        wordBug(listData);
    }

    //Получаем мешок слов
    function wordBug(listData) {
        let wordBugList = [];

        listData.forEach(elem => {
            const splitElem = elem.split(' ');
            splitElem.forEach(word => {
                if (!wordBugList.includes(word) && word.length > 1) {
                    wordBugList.push(word);
                }
            });
        });

        wordCounter(listData, wordBugList);
    }

    //Считаем - в скольки фразах используется каждое слово
    function wordCounter(listData, wordBugList) {
        let countList = [];

        wordBugList.forEach(word => {
            let i = 0;
            listData.forEach(elem => {
                if (elem.includes(word)) {
                    i++;
                }
            });
            countList.push([word, i]);
        });

        countList.sort(byField([1]));
        clastersList(countList, listData);
    }

    //Сортировка на уменьшение
    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }

    //Собираем ключи в отдельные группы
    function clastersList(countList, listData) {
        let clasterList = [];
        let stopList = [];

        countList.forEach(word => {
            let claster = [];
            listData.forEach(elem => {

                if (elem.includes(word[0]) && !stopList.includes(elem)) {
                    claster.push(elem);
                    stopList.push(elem);
                }
            });

            if (claster.length > 0) {
                clasterList.push(claster);
            }
        });

        innerData(clasterList);
    }

    function innerData(clasterList) {
        let htmlCollection = `<textarea textarea class="form-control" rows="25">`;

        clasterList.forEach(elem => {
            let stringElem = `${elem.join(', ').replace(/ +/g, ' ').trim()}\n\n`;
            htmlCollection += stringElem;
        });

        htmlCollection += `</textarea>
        <div class="mt-2">
            <button type="submit " class="btn btn-success" id="success">К описанию</button>
        </div>`;

        dataContainer.innerHTML = htmlCollection;
        startContent();
    }

    function startContent() {
        const greenButton = document.getElementById('success');

        //Обработка события формы
        greenButton.onclick = function() {
            dataContainer.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <p>Кластеризация ключевых слов по обратной частотности.</p>
                        <p>Вставьте в поле ввода столбец с ключевыми словами и нажмите кнопку "Отправить"</p>
                        <p>Ключевые слова сгруппируются по частоте их упоминаний в отправленном ядре. Как правило, в начале итогового результата вы увидите одиночные кластеры, содержащие слова, которые используются единожды. Ближе к концу листа формируются
                            наиболее широкие кластеры ключевых слов.
                        </p>
                        <p>Метод подходит для обработки наборов ключевых слов, которые уже объединены по смыслу и тематике, позволяет легко определить минус-слова для будущих групп объявлений, избежать дублирований и каннибализации в рекламных кампаниях.
                        </p>
                        <p>Данный метод кластеризации не всегда отдает полностью оптимальный результат для старта рекламной кампании и может потребовать ручной доработки конечного результата.
                        </p>
                    </div>
                `;
        };

    }


});