<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cheque Printing Software - Home</title>
    <?php include_once('./layout/css.php'); ?>
</head>

<body>
    <?php include_once('./layout/navbar.php'); ?>
    <main class="container page-shell">
        <section class="page-hero cheque-title">
            <div class="page-hero__content">
                <div>
                    <p class="page-hero__eyebrow">Cheque Back</p>
                    <h1>Compose back-side cheque notes with a cleaner print workspace.</h1>
                    <p>Write the content in markdown, tune the sheet dimensions, and review the final back print without leaving the page.</p>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <strong>Formatting</strong>
                        <span>Markdown to print preview</span>
                    </div>
                    <div class="hero-stat">
                        <strong>Layout</strong>
                        <span>Custom width, height, and page count</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="workspace-grid">
            <div class="surface-card control-panel">
                <div class="surface-card__header">
                    <div>
                        <span class="section-badge">Editor</span>
                        <h2>Back print content</h2>
                        <p>Use markdown for names, headings, and supporting details that need to print on the reverse side.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <form class="control-stack">
                        <div class="control-group">
                            <h3>Content</h3>
                            <label for="chequeFormBackData" class="form-label">Cheque back data</label>
                            <textarea id="chequeFormBackData" class="form-control" rows="6"></textarea>
                        </div>
                        <div class="control-group">
                            <h3>Paper setup</h3>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label for="noOfPages" class="form-label">Pages</label>
                                    <input type="text" class="form-control" id="noOfPages">
                                </div>
                                <div class="col-md-4">
                                    <label for="width" class="form-label">Width (mm)</label>
                                    <input type="text" class="form-control" id="width" value="204">
                                </div>
                                <div class="col-md-4">
                                    <label for="height" class="form-label">Height (mm)</label>
                                    <input type="text" class="form-control" id="height" value="93">
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
                        <h2>Back side render</h2>
                        <p>Generated pages update as you type so spacing issues are visible before printing.</p>
                    </div>
                </div>
                <div class="surface-card__body">
                    <div class="preview-shell">
                        <div class="preview-toolbar">
                            <p>Markdown is converted into the printable layout in real time.</p>
                            <span class="section-badge">Live pages</span>
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
            $('#width, #height, #chequeFormBackData, #noOfPages').on('input', function() {
                chequePrint();
            });
            $('#chequeFormBackData').val('##**Name -** \n###**Account No -** \n###**Mobile -** ');
            chequePrint();
        });

        function chequePrint() {
            var converter = new showdown.Converter();
            var html = converter.makeHtml($('#chequeFormBackData').val());
            var cheque_html = '';
            for (let index = 0; index < parseInt($('#noOfPages').val() == "" ? 1 : $('#noOfPages').val()); index++) {
                cheque_html += `<div class="print-page mt-3">
                    <div class="cheque-container border back py-3" data-width="${$('#width').val()}mm" data-height="${$('#height').val()}mm" style="width: ${$('#width').val()}mm; height: ${$('#height').val()}mm;">
                    <div class="inline-block translate-middle top-50 start-50 position-absolute">${html}</div>
                    </div>
                </div>`;
            }
            $('.print-container').html('<div>' + cheque_html + '</div>');
        }
    </script>
</body>

</html>
