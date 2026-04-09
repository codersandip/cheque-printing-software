$(document).ready(function () {
    const style = document.createElement('style');
    style.id = 'dynamicPrintStyle';
    var url = window.location.pathname.substring(1).split('.')[0];
    $('.nav-item a').each(function (index, value) {
        if ((value.href.includes(url) && url != '') || ($(value).attr('href') == './' && url == '')) {
            $(value).addClass('active').addClass('fw-bold').addClass('text-primary');
        }
    });

    $(document).on('click', '.back-print-btn, .front-print-btn, .single-cheque-print', function (e) {
        e.preventDefault();
        style.textContent = `
                @media print {
                    @page {
                        size: ${$('.cheque-container').data('width') + ' ' + $('.cheque-container').data('height')} ;
                        margin: 0;
                    }
                    .cheque-container { ${chequePrefix.chequeAlign} }
                }
            `;
        document.head.appendChild(style);
        $(e.currentTarget).hasClass('single-cheque-print') ? printout($(e.currentTarget).parent().parent()[0]) : printout('.print-container');
        document.getElementById('dynamicPrintStyle').remove();
    });
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        alert('Printing is disabled on this page.');
    }
});