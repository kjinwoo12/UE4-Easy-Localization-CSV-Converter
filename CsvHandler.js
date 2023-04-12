class CsvHandler {
    parseCsv(csvString) {
        const rows = csvString.split('\n');

        if(rows[rows.length-1]=="") {
            rows.pop();
        }

        return rows.map((row) => {
            let insideQuotes = false;
            let currentField = '';
            const fields = [];

            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (char === '"') {
                    insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                    fields.push(currentField);
                    currentField = '';
                } else if (char === '\r') {
                } else {
                    currentField += char;
                }
            }
            fields.push(currentField);

            return fields;
        });
    }

    csvToJsonArray(csv) {
        const header = csv[0];
        const rows = csv.slice(1);

        const jsonArray = rows.map((row) =>
            row.reduce((acc, curr, index) => {
                acc[header[index]] = curr;
                return acc;
            }, {})
        );

        return jsonArray;
    }
}

var csvHandler = new CsvHandler();