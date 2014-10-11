import express = require('express');

function ItemsData(req: express.Request, res: express.Response) {
  res.json([
    new Item(1  , "07c5a", 348, "Jan_hus" ),
    new Item(2  , "59232", 291, "Cenchrus"),
    new Item(3  , "ed12d", 23 , "Tefillin"),
    new Item(4  , "a6435", 200, "Eighty"  ),
    new Item(5  , "937fe", 184, "Jacinth" ),
    new Item(6  , "e6b26", 172, "Ano"     ),
    new Item(7  , "45b34", 55 , "Cirrus"  ),
    new Item(8  , "4a9b0", 449, "Lechwe"  ),
    new Item(9  , "3a679", 386, "Beggar"  ),
    new Item(200, "55fe3", 205, "Simile"  )
  ]);
    res.end();
};
export = ItemsData;

class Item{
  constructor(public id: number, public code: string, public quantity: number, public name: string){

  }
}
