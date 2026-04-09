var ChequeData = {
    "Axis Bank": {
        width : "204mm",
        height : "93mm",
        // "dimension" : "width: 204mm; height: 93mm;",
        "date_format" : "ddMMyyyy",
        "date_position" : "top: 6mm; right: 10mm; width: 40mm;",/* left: 153mm; */
        "amount_position" : "top: 35mm; left: 156mm; width: 35mm;",
        "name_position" : "top: 18mm; left: 15mm; width: 140mm;",
        "amount_word_position" : "top: 27mm; left: 20mm; width: 160mm; text-indent: 10mm;", // left: 35mm;
        "date_width" : "5mm"
    },
    "PDCCB Pune": {
        width : "204mm",
        height : "93mm",
        // "dimension" : "width: 204mm; height: 93mm;",
        "date_format" : "ddMMyyyy",
        "date_position" : "top: 6mm; right: 10mm; width: 50mm;",/* left: 153mm; */
        "amount_position" : "top: 35mm; left: 158mm; width: 35mm;",
        "name_position" : "top: 18mm; left: 15mm; width: 140mm;",
        "amount_word_position" : "top: 27mm; left: 20mm; width: 160mm; text-indent: 10mm;", // left: 35mm;
        "date_width" : "6mm"
    },
    "HDFC Bank": {
        width : "204mm",
        height : "93mm",
        // "dimension" : "width: 204mm; height: 93mm;",
        "date_format" : "ddMMyyyy",
        "date_position" : "top: 7mm; right: 9mm; width: 42mm;",/* left: 153mm; */
        "amount_position" : "top: 35mm; left: 156.5mm; width: 39mm;",
        "name_position" : "top: 18mm; left: 17mm; width: 160mm;",
        "amount_word_position" : "top: 27mm; left: 20mm; width: 160mm; text-indent: 10mm;", // left: 35mm;
        "date_width" : "5.25mm"
    },
    "Union Bank": {
        width : "204mm",
        height : "93mm",
        // "dimension" : "width: 204mm; height: 93mm;",
        "date_format" : "ddMMyyyy",
        "date_position" : "top: 7mm; right: 10mm; width: 45mm;",/* left: 153mm; */
        "amount_position" : "top: 37mm; left: 158mm; width: 38mm;",
        "name_position" : "top: 18mm; left: 17mm; width: 160mm;",
        "amount_word_position" : "top: 27mm; left: 20mm; width: 160mm; text-indent: 10mm;", // left: 35mm;
        "date_width" : "5.6mm"
    }
};


if (localStorage.getItem("chequePrefix")) {
    var chequePrefix = JSON.parse(localStorage.getItem("chequePrefix"));
} else {
    var chequePrefix = {
        "payeePrefix" : '**',
        "payeeSufix" : '**',
        "amountPrefix" : '**',
        "amountSufix" : '/-**',
        "amountWordsPrefix" : '**',
        "amountWordsSufix" : '**',
        "chequeAlign" : "top: 50%;right: 0;transform: translateY(-50%);"
    };
    localStorage.setItem("chequePrefix", JSON.stringify(chequePrefix));
}

for (let x in chequePrefix) {
    $(`#${x}`).val(chequePrefix[x]);
}