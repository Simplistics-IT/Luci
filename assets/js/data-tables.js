$(document).ready(function () {
    $('#basic-1 thead tr').clone(true).addClass('filters').appendTo('#basic-1 thead');

    // $('#basic-1 tfoot th').each(function () {
    //     const row = $(this)[0].textContent.trim();

    //     if (![null, false, undefined, ''].includes(row)) {
    //         $(this).html('<input type="text" class="form-control" placeholder="' + $(this).text().toUpperCase() + '" />');
    //     }
    // });

    const table = $('#basic-1').DataTable({
        orderCellsTop: true,
        fixedHeader: true,
        scrollY: 380,
        scrollX: true,
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        initComplete: function () {
            const api = this.api();

            // filtering tfoot
            // api.columns().every(function () {
            //     var that = this;

            //     $('input', this.footer()).on('keyup change clear', function () {
            //         if (that.search() !== this.value) {
            //             that.search(this.value).draw();
            //         }
            //     });
            // });

            //filterin thead
            api.columns().eq(0).each(function (colIdx) {
                const column = $(api.column(colIdx).header());

                if (column[0].textContent.trim() != '') {
                    var cell = $('.filters th').eq(column.index());
                    var title = $(cell).text();
                    $(cell).html('<input type="text" style="background-color: #e1e1e1;"  class="form-control"="' + title.toUpperCase() + '" />');

                    $('input', $('.filters th').eq($(api.column(colIdx).header()).index())).off('keyup change').on('change', function (e) {
                        $(this).attr('title', $(this).val());
                        var regexr = '({search})';

                        var cursorPosition = this.selectionStart;
                        api.column(colIdx).search(
                            this.value != ''
                            ? regexr.replace('{search}', '(((' + this.value + ')))')
                            : '',
                            this.value != '',
                            this.value == ''
                            )
                        .draw();
                    }).on('keyup', function (e) {
                        e.stopPropagation();

                        $(this).trigger('change');
                        $(this).focus()[0].setSelectionRange(cursorPosition, cursorPosition);
                    });
                }
            });
        },
    });
});