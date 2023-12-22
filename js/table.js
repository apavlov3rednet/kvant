class Table extends DOM {
    static header(ar = []) {
        if(!ar || ar.length === 0)
            return null;

        let tableHeader, tableHeaderChild = [];

        ar.forEach(item => {
            tableHeaderChild.push(Table.create('th', { 
                text: item,
                events: {
                    click: Table.sort
                }
            }));
        });

        tableHeader = Table.create('thead', {
            children: [
                Table.create('tr', { 
                    children: tableHeaderChild
                })
            ]
        });

        return tableHeader;
    }

    static body(ar = []) {
        if(!ar || ar.length === 0)
            return null;

        let tableBody, tableRow = [];

        ar.forEach(row => {
            if(row instanceof Array) {
                let obRow, arRowChild = [];

                row.forEach(item => {
                    arRowChild.push(Table.create('td', { text: item })); 
                });

                obRow = Table.create('tr', {
                    children: arRowChild
                });

                tableRow.push(obRow);
            }
        });

        tableBody = Table.create('tbody', {
            children: tableRow
        });

        return tableBody;
    }

    static footer(ar = []) {
        if(!ar || ar.length === 0)
            return null;

        let tableFooter, tableFooterChild = [];

        ar.forEach(item => {
            tableFooterChild.push(Table.create('tr', { text: item }));
        });

        tableFooter = Table.create('tfoot', {
            children: [
                Table.create('tr', { 
                    children: tableFooterChild
                })
            ]
        });

        return tableFooter;
    }

    static generate(arHeader = [], arBody = [], arFooter = [], params = {}) {
        let header = Table.header(arHeader);
        let body = Table.body(arBody);
        let footer = Table.footer(arFooter);

        return Table.create('table', {
            className : (params.className) ? params.className : '',
            attrs: (params.attrs) ? params.attrs : [],
            styles: (params.styles) ? params.styles : [],
            events: {

            },
            children: [
                header,
                body,
                footer
            ]
        });
    }

    static sort(event) {
        console.log(event);
    }

    static filterForm() {

    }

    static tableWithFilter() {
        
    }
}