var tbody = document.getElementsByTagName('tbody')[0];
var trEdit;

var txtBrand = document.getElementById('brand');
var txtModel = document.getElementById('model');
var txtCount = document.getElementById('count');
var txtPrice = document.getElementById('price');

// присваеваем формальные параметры конструктора, через контекст вызова конструктора
function Phone(brand, model, count, price) {
    // this. - получаем ссылку на этот объект, в this записываем свойства и методы 
    this.brand = brand;
    this.model = model;
    this.count = count;
    this.price = price;
    this.cost = function() { // функция внутри конструктора ,которая возвращает произведения количества и цены
        return this.count * this.price;
    }
    this.addTable = function(tr) { // функция для добавления элементов в таблицу , которые будем вводить в input
        var cells = tr.children;

        cells[0].innerHTML = this.brand;
        cells[1].innerHTML = this.model;
        cells[2].innerHTML = this.count;
        cells[3].innerHTML = this.price;
        cells[4].innerHTML = this.cost();
    }
    this.setSelection = function(elem, color) { // функция назначения цвета , для выделения строки и для дальнейшего удаления строки ,которую выделили
        elem.addEventListener('click', function() {
            if (this.style.backgroundColor == color) {
                this.style.backgroundColor = 'white';
            } else {
                this.style.backgroundColor = color;
            }
            selectedDel(); // вызов функции для активации или дизактивации кнопки удаления
        });
    }
    this.setDblClick = function(tr) { // функция при двойном клике на строку текст ячеек строки которой  записывается в input с соответствующим значением
        tr.addEventListener('dblclick', function() {
            var cells = this.children;

            txtBrand.value = cells[0].innerHTML;
            txtModel.value = cells[1].innerHTML;
            txtCount.value = cells[2].innerHTML;
            txtPrice.value = cells[3].innerHTML;

            trEdit = this; // сохраняем строку на которую клацнули в переменную trEdit, для того чтобы в дальнейшем перезаписать значения ,которые редактируем в input
            activeSave(false); // активируем кнопку Save ,чтобы сохранить редактируемые значения
        });
    }
}

document.getElementById('btnAdd').addEventListener('click', function() {
    // вызываем через new конструктор
    var mobile = new Phone(txtBrand.value, txtModel.value,  parseInt(txtCount.value), parseInt(txtPrice.value));

    var tr = document.createElement('tr'); // создаём строку в body
    for (var i = 0; i < 5; i++) {
        var td = document.createElement('td'); // создаём яейки строки
            tr.appendChild(td); // добавляем 5 ячеек в строку
    }
    mobile.addTable(tr); // вызов функции addTable, в которой в ведённых нами input значения записываем в соответствующии ячейки строки
    tbody.appendChild(tr); // добавляем строку в тело таблицы
    // очистка input для блокировки кнопки btnAdd
    txtBrand.value = '';
    txtModel.value = '';
    txtCount.value = '';
    txtPrice.value = '';

    activeAdd(true); // блокируем кнопку btnAdd
    mobile.setSelection(tr, 'yellow'); // вызов функции для назначения выделения при клике
    mobile.setDblClick(tr); // вызов функции для записи текста из ячеек строки в input , дляредактирования
});
// функции для активации кнопок
function activeAdd(state) {
    document.getElementById('btnAdd').disabled = state;
}
function activeDel(state) {
    document.getElementById('btnDel').disabled = state;
}

function activeSave(state) {
    document.getElementById('btnSave').disabled = state;
}
// навешиваем события на input , для активации или дизактивации btnAdd
txtBrand.addEventListener('keyup', checkFields);
txtModel.addEventListener('keyup', checkFields);
txtCount.addEventListener('keyup', checkFields);
txtPrice.addEventListener('keyup', checkFields);
// функция  для активации и дизактивации кнопки btnAdd
function checkFields() {
    if (txtBrand.value != '' && txtModel.value != '' && (txtCount.value != '' && !isNaN(txtCount.value)) && (txtPrice.value != '' && !isNaN(txtPrice.value))) {
        return activeAdd(false);
    } else {
        return activeAdd(true);
    }
}
// функция назначения кнопки btnDel
function selectedDel() {
    var tr = tbody.children;
    // перебор строки с ячейками для удаления выделенных жёлтым цветом строк
    for (var i = tr.length - 1; i >= 0; i--) { // перебор строк для удаления элементов всегда начинается с конца
        if (tr[i].style.backgroundColor == 'yellow') {
            return activeDel(false);
        }
    }
    return activeDel(true);
}
// навешиваем событие на кнопку btnDel , если выделенная строка жёлтого цвета
document.getElementById('btnDel').addEventListener('click', function() {
    var tr = tbody.children;

    for (var i = tr.length - 1; i >= 0; i--) {
        if (tr[i].style.backgroundColor == 'yellow') {
            tbody.removeChild(tr[i]);
        }
    }
});
// событие на кнопку btnSave, чтобы сохранить редактируемую строку в input и редактировать текст строки , на которую кликнули дважды dblclick
document.getElementById('btnSave').addEventListener('click', function() {
    var cells = trEdit.children;

    cells[0].innerHTML = txtBrand.value;
    cells[1].innerHTML = txtModel.value;
    cells[2].innerHTML = txtCount.value;
    cells[3].innerHTML = txtPrice.value;
    cells[4].innerHTML = txtCount.value * txtPrice.value;
    // очищаем input ,чтобы заблокировать кнопку btnAdd
    txtBrand.value = '';
    txtModel.value = '';
    txtCount.value = '';
    txtPrice.value = '';
    activeSave(true); // блокируем кнопку Save после очищения полей input
    activeAdd(true); // блокируем кнопку btnAdd
});
