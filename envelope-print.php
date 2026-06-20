<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheque Printing Software - Envelope Print</title>
    <?php include_once('./layout/css.php'); ?>
</head>

<body>
    <?php include_once('./layout/navbar.php'); ?>
    <main class="container-fluid px-4 px-xl-5 page-shell">
        <section class="page-hero cheque-title">
            <div class="page-hero__content">
                <div>
                    <p class="page-hero__eyebrow">Envelope Printing</p>
                    <h1>Lay out sender and delivery addresses in a more polished print canvas.</h1>
                    <p>Create envelope sheets with a centered title, editable dimensions, and live address placement as you type.</p>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>Input</strong>
                        <span>Markdown sender and delivery blocks</span>
                    </div>
                    <div class="hero-stat">
                        <strong>Output</strong>
                        <span>Printable envelope sheets</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="workspace-grid">
            <div class="surface-card control-panel">
                <div class="surface-card__header">
                    <div>
                        <span class="section-badge">Envelope Setup</span>
                        <h2>Compose the sheet</h2>
                        <p>Define the title, page size, and address blocks from a single form.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <form class="control-stack">
                        <div class="control-group">
                            <h3>Document</h3>
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <label for="envelopeTitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="envelopeTitle">
                                </div>
                                <div class="col-md-4">
                                    <label for="noOfPages" class="form-label">Pages</label>
                                    <input type="number" class="form-control" id="noOfPages" value="1">
                                </div>
                                <div class="col-md-4">
                                    <label for="width" class="form-label">Width (mm)</label>
                                    <input type="number" class="form-control" id="width" value="219">
                                </div>
                                <div class="col-md-4">
                                    <label for="height" class="form-label">Height (mm)</label>
                                    <input type="number" class="form-control" id="height" value="93">
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <h3>Addresses</h3>
                            <div class="row g-3">
                                <div class="col-md-12">
                                    <label for="envelopeSenderAddress" class="form-label">Sender address</label>
                                    <textarea id="envelopeSenderAddress" class="form-control" rows="5"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <label for="envelopeDeliveryAddress" class="form-label">Delivery address</label>
                                    <textarea id="envelopeDeliveryAddress" class="form-control" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary w-100 back-print-btn">Print</button>
                    </form>
                </div>
            </div>

            <div class="surface-card">
                <div class="surface-card__header">
                    <div>
                        <span class="section-badge">Preview</span>
                        <h2>Envelope sheet preview</h2>
                        <p>Review title alignment and address placement before sending the sheet to print.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <div class="preview-shell">
                        <div class="preview-toolbar">
                            <p>The preview refreshes on each input change.</p>
                            <span class="section-badge">Address layout</span>
                        </div>
                        <div class="preview-canvas">
                            <div class="preview-frame">
                                <div class="print-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <?php include_once('./layout/js.php'); ?>
    <script src="https://unpkg.com/showdown@2.1.0/dist/showdown.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#width, #height, #envelopeTitle, #envelopeSenderAddress, #envelopeDeliveryAddress, #noOfPages').on('input', function() {
                envelopePrint();
            });
            envelopePrint();
        });

        function envelopePrint() {
            var converter = new showdown.Converter();
            var cheque_html = '';
            for (let index = 0; index < parseInt($('#noOfPages').val() == "" ? 1 : $('#noOfPages').val()); index++) {
                cheque_html += `<div class="print-page mt-3">
                    <div class="cheque-container border back py-3" data-width="${$('#width').val()}mm" data-height="${$('#height').val()}mm" style="width: ${$('#width').val()}mm; height: ${$('#height').val()}mm;">
                    <h3 class="text-center"> ${$('#envelopeTitle').val()}</h3>
                    <div style="position: absolute; bottom: 10%; left: 10%; min-width: 20%; max-width: 40%;" draggable="true">
                    ${converter.makeHtml(`####From, \n`+ $('#envelopeSenderAddress').val().replace(/\n/g, '<br>'))}
                    </div>
                    <div style="position: absolute; top: 30%; right: 10%; min-width: 20%; max-width: 40%;" draggable="true">
                    ${converter.makeHtml('####To, \n' + $('#envelopeDeliveryAddress').val().replace(/\n/g, '<br>'))}
                    </div>
                    </div>
                </div>`;
            }
            $('.print-container').html('<div>' + cheque_html + '</div>');
        }
    </script>
</body>

</html>
