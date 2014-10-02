﻿import express = require('express');

function ItemsData(req: express.Request, res: express.Response) {
    res.json([{ "id": 1, "col1": "07c5a", "col2": 348, "col3": "Jan_hus" }, { "id": 2, "col1": "59232", "col2": 291, "col3": "Cenchrus" }, { "id": 3, "col1": "ed12d", "col2": 23, "col3": "Tefillin" }, { "id": 4, "col1": "a6435", "col2": 200, "col3": "Eighty" }, { "id": 5, "col1": "937fe", "col2": 184, "col3": "Jacinth" }, { "id": 6, "col1": "e6b26", "col2": 172, "col3": "Ano" }, { "id": 7, "col1": "45b34", "col2": 55, "col3": "Cirrus" }, { "id": 8, "col1": "4a9b0", "col2": 449, "col3": "Lechwe" }, { "id": 9, "col1": "3a679", "col2": 386, "col3": "Beggar" }, { "id": 200, "col1": "55fe3", "col2": 205, "col3": "Simile" }]
);
    res.end();
};
export = ItemsData;