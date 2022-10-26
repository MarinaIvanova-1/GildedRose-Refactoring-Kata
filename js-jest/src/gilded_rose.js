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
          break
        case 'Sulfuras':
          this.updateQualitySulfuras(this.items[i])
          break
        case 'Aged Brie':
          this.updateQualityBrie(this.items[i])
          break
        case 'Ordinary Item':
          this.updateQualityOrdinary(this.items[i])
          break
      }
      this.setMinMaxQuality(this.items[i])
    }
    return this.items;
  }

  updateQualityOrdinary(item) {
    item.sellIn = item.sellIn - 1
    if (item.sellIn < 0) {
      item.quality -= 2;
    } else {
      item.quality -= 1;
    }
    return item
  }

  updateQualitySulfuras(item) {
    return item
  }

  updateQualityPass(item) {
    item.sellIn = item.sellIn - 1
    if (item.sellIn < 0) {
      item.quality = 0
    } else if (item.sellIn < 5) {
      item.quality += 3
    } else if (item.sellIn < 10) {
      item.quality += 2
    } else {
      item.quality += 1
    }
    return item
  }

  updateQualityBrie(item) {
    item.sellIn = item.sellIn - 1
    if (item.quality > 0 && item.sellIn < 0) {
      item.quality += 2;
    } else if (item.quality > 0) {
      item.quality += 1;
    }
    return item
  }

  itemType(name) {
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

  setMinMaxQuality(item) {
    if (item.quality > 50) {
      item.quality = 50
    } else if (item.quality < 0) {
      item.quality = 0
    }
    return item
  }
  
}

module.exports = {
  Item,
  Shop
}

