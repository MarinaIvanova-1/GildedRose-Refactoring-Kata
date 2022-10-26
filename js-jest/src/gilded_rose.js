class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      switch(this.itemType(this.items[i].name)) {
        
        case 'Backstage Passes':
          this.updateQualityPass(this.items[i])
          console.log('switch backstage')
        case 'Sulfuras':
          this.updateQualitySulfuras(this.items[i])
          console.log('switch sulfuras')
        case 'Aged Brie':
          this.updateQualityBrie(this.items[i])
          console.log('switch brie')
        case 'Ordinary Item':
          console.log('switch ordinary1')
          this.updateQualityOrdinary(this.items[i])
          console.log('switch ordinary2')
      }
      // if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //   if (this.items[i].quality > 0) {
      //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //       this.items[i].quality = this.items[i].quality - 1;
      //     }
      //   }
      // } else {
      //   if (this.items[i].quality < 50) {
      //     this.items[i].quality = this.items[i].quality + 1;
      //     if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (this.items[i].sellIn < 11) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1;
      //         }
      //       }
      //       if (this.items[i].sellIn < 6) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1;
      //         }
      //       }
      //     }
      //   }
      // }
      // if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //   this.items[i].sellIn = this.items[i].sellIn - 1;
      // }
      // if (this.items[i].sellIn < 0) {
      //   if (this.items[i].name != 'Aged Brie') {
      //     if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (this.items[i].quality > 0) {
      //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
      //           this.items[i].quality = this.items[i].quality - 1;
      //         }
      //       }
      //     } else {
      //       this.items[i].quality = this.items[i].quality - this.items[i].quality;
      //     }
      //   } else {
      //     if (this.items[i].quality < 50) {
      //       this.items[i].quality = this.items[i].quality + 1;
      //     }
      //   }
      // }
    }

    return this.items;
  }

  updateQualityOrdinary(item) {
    item.sellIn = item.sellIn - 1
    if (item.quality > 0 && item.sellIn < 0) {
      item.quality -= 2;
    } else if (item.quality > 0) {
      item.quality -= 1;
    }
    return item
  }

  updateQualitySulfuras(item) {
    return item
  }

  updateQualityPass(item) {
    return item
  }

  updateQualityBrie(item) {
    return item
  }

  itemType(name) {
    console.log(name)
    if (name === "Backstage passes to a TAFKAL80ETC concert") {
      return "Backstage Passes"
    } 
    else if (name === "Sulfuras, Hand of Ragnaros") {
      return "Sulfuras"
    }
    else if (name === "Aged Brie") {
      return "Aged Brie"
    } 
    else {
      return "Ordinary Item"
    }
  }
}

module.exports = {
  Item,
  Shop
}
