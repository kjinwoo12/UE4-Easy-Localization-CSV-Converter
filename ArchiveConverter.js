//import CsvHandler

class ArchiveConverter {
    archives = {}; // archives[langCode] ex)archives['en']

    parseFromCsv(csv) {
        const keyKey = csv[0][0];
        const languageKeys = csv[0].slice(1);
        const jsonArray = csvHandler.csvToJsonArray(csv);
        languageKeys.map(languageKey=>{
            const children = [];
            jsonArray.map(row=>{
                children.push({
                    Source: {
                        Text: row[languageKeys[0]]
                    },
                    Translation: {
                        Text: row[languageKey]
                    },
                    Key: row[keyKey]
                });
            });
            this.archives[languageKey] = {
                FormatVersion: 2,
                Namespace: "",
                Subnamespaces: [
                    {
                        Namespace: "Localization",
                        Children: children
                    }
                ]
            };
        });
        return this.archives;
    }
}

var archiveConverter = new ArchiveConverter();