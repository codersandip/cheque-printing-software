const ToWords = require("to-words").ToWords;
const moment = require("moment");

function getToWordsInstance(locale) {
    return new ToWords({
        localeCode: locale,
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
        },
    });
}

function initializeDatePicker() {
    $("#chequeFormDate").datepicker({
        uiLibrary: "bootstrap5",
        format: "dd-mm-yyyy",
        showRightIcon: false,
        value: moment().format("DD-MM-YYYY"),
    });
}

function toggleChequeView(checkbox) {
    const label = checkbox.checked ? "Single Cheque Print" : "Multiple Cheque Print";
    $(checkbox).parent().find('label').text(label);
    $('.single-cheque, .multiple-cheque').toggleClass('d-none');
}

function updateChequeType(type) {
    const $acPayee = $(".cheque-ac-payee");
    const $cancel = $('.cheque-cancel');
    $acPayee.css("opacity", "0").css("color", "rgba(0, 0, 0, 0)");
    $cancel.css("opacity", "0");

    switch (type) {
        case "Payee":
            $acPayee.css("opacity", "1").css("color", "rgba(0, 0, 0, 1)");
            break;
        case "Crossed":
            $acPayee.css("opacity", "1");
            break;
        case "Self":
            $(".cheque-name").text(`${chequePrefix.payeePrefix}Self${chequePrefix.payeeSufix}`);
            $("#chequeFormName").val("Self");
            break;
        case "Cancel":
            $(".cheque-name, .cheque-date, .cheque-amount, .cheque-amount-word").text('');
            $cancel.css("opacity", "1");
            break;
    }
}

function validateAmount(input) {
    const value = $(input).val();
    const numberRegex = /^-?\d+(\.\d{0,2})?$/;
    if (!numberRegex.test(value)) {
        const parts = value.split(".");
        if (parts.length === 2 && parts[1].length > 2) {
            $(input).val(`${parts[0]}.${parts[1].slice(0, 2)}`);
        } else {
            $(input).val('');
        }
    }
}

function processFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const output = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).slice(1);
        const cheques = output.map(row => {
            if (row.length > 0) {
                return getChequeHTML(
                    row[1],
                    dateHtml(moment(new Date((row[0] - (row[0] > 59 ? 1 : 0)) * 86400000 + Date.UTC(1899, 11, 30))).format('DD-MM-YYYY')),
                    getAmount(row[2]),
                    getAmountWord(row[2])
                );
            }
        });
        getCheque(cheques);
        $('#formFile').val('');
    };
    reader.readAsArrayBuffer(file);
}

function dateHtml(date) {
    return date.replace(/-/g, "").split("").map(digit =>
        `<div class="col p-0" style="width: ${$("#chequeFormBank").val() || "Axis Bank"};">${parseInt(digit).toLocaleString($("#chequeFormLanguage").val())}</div>`
    ).join('');
}

function getAmountWord(amount) {
    if (!amount) return "";
    return chequePrefix.amountWordsPrefix + getToWordsInstance($("#chequeFormLanguage").val()).convert(amount) + chequePrefix.amountWordsSufix;
}

function getAmount(amount) {
    if (!amount) return "";
    return chequePrefix.amountPrefix + parseFloat(amount).toLocaleString($("#chequeFormLanguage").val()) + chequePrefix.amountSufix;
}

function getChequeHTML(name, date, amount, amountWord) {
    const data = ChequeData[$("#chequeFormBank").val()] || ChequeData[$("#chequeFormBank")[0][1].value];
    return `
        <div class="cheque-container border front text-uppercase" data-width="${data.width}" data-height="${data.height}" style="width: ${data.width}; height: ${data.height};">
            <div class="cheque-ac-payee">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A/C Payee Only&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="cheque-name" style="${data.name_position}">${name ? chequePrefix.payeePrefix + name + chequePrefix.payeeSufix : ''}</div>
            <div class="cheque-date" style="${data.date_position}"><div class="row m-0">${date}</div></div>
            <div class="cheque-amount" style="${data.amount_position}">${amount}</div>
            <div class="cheque-amount-word" style="${data.amount_word_position}">${amountWord}</div>
            <div class="cheque-cancel">Cancel</div>
        </div>`;
}

function getCheque(htmlArray) {
    const cheques = htmlArray.map(html => `<div class="print-page mt-3">${html}</div>`).join('');
    $(".print-container").html(`<div>${cheques}</div>`);
}

function chequePrint() {
    const pages = parseInt($("#noOfPages").val() || 1);
    const cheques = Array.from({ length: pages }, () => getChequeHTML(
        $("#chequeFormName").val(),
        dateHtml($("#chequeFormDate").val()),
        getAmount($("#chequeFormAmount").val()),
        getAmountWord($("#chequeFormAmount").val())
    ));
    getCheque(cheques);
}

$(document).ready(function () {
    initializeDatePicker();
    chequePrint();

    $('.cheque-form input, .cheque-form select').on('input change', function (e) {
        const id = this.id;
        if (id === "chequeToggle" && e.type === "change") {
            toggleChequeView(this);
        } else if (id === "chequeFormType") {
            updateChequeType($(this).val());
        } else if (id === "chequeFormAmount") {
            validateAmount(this);
            chequePrint();
        } else if (id === "formFile") {
            processFileUpload(e);
        } else {
            chequePrint();
        }
    });
});
