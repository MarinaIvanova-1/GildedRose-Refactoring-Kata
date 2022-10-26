const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it("Quality degrades every day before SellIn date", function() {
    const gildedRose = new Shop([new Item("foo", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(9);
  });

  it("Quality degrades every day before SellIn date, but can't become negative", function() {
    const gildedRose = new Shop([new Item("foo", 5, 0)]);
    const itemsDayOne = gildedRose.updateQuality();
    const itemsDayTwo = gildedRose.updateQuality();
    expect(itemsDayTwo[0].name).toBe("foo");
    expect(itemsDayTwo[0].sellIn).toBe(3);
    expect(itemsDayTwo[0].quality).toBe(0);
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  xit("Aged Brie increases in Quality the older it gets", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Aged Brie");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(2);
  });

  xit("The Quality of an item is never more than 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 49)]);
    const itemsDayOne = gildedRose.updateQuality();
    const itemsDayTwo = gildedRose.updateQuality();
    expect(itemsDayTwo[0].name).toBe("Aged Brie");
    expect(itemsDayTwo[0].sellIn).toBe(3);
    expect(itemsDayTwo[0].quality).toBe(50);
  });

  xit("Sulfuras never has to be sold or decreases in Quality", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(10);
  });

  xit("Backstage passes to a TAFKAL80ETC concert lose its quality past SellIn date", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  xit("Backstage passes to a TAFKAL80ETC concert increases in Quality by 3 if the SellIn date is in less than 6 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(3);
  });

  xit("Backstage passes to a TAFKAL80ETC concert increases in Quality by 2 if the SellIn date is in less than 11 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(2);
  });

  xit("Backstage passes to a TAFKAL80ETC concert increases in Quality by 1 if the SellIn date is in more than 10 days", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(10);
    expect(items[0].quality).toBe(1);
  });

  xit("treats different objects within the shop independently of one another", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 2, 0), new Item("foo", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(3);
    expect(items[1].name).toBe("foo");
    expect(items[1].sellIn).toBe(4);
    expect(items[1].quality).toBe(9);
  });
});




// class Protocol {  
//   // accept a list of method-names  
//   constructor(...methods) {  
//     this.implementations = {};  
//     // and create a method for each  
//     methods.forEach(method => {  
//       // that will dispatch to an implementation stored on the type of the first argument  
//       this\[method\] = (type, ...args) => {  
//         // with the convention that an object's type is given by its constructor  
//         return this.implementations\[type.constructor\]\[method\](type, ...args);  
//       }   
//     });  
//   }  
//   // register implementations for a type  
//   extendTo(typeConstructor, implementation) {  
//     const typed = this.implementations\[typeConstructor\] = {};  
//     Object.keys(implementation)  
//       .forEach(method => {  
//         typed\[method\] = implementation\[method\];  
//       });  
//   }  
// }