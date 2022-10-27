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
      switch(this.items[i].name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          const pass = new BackstagePass(this.items[i])
          pass.updateQuality()
          break
        case 'Sulfuras, Hand of Ragnaros':
          const sulfuras = new Sulfuras(this.items[i])
          sulfuras.updateQuality()
          break
        case 'Aged Brie':
          const brie = new Brie(this.items[i])
          brie.updateQuality()
          break
        case 'Conjured':
          const conjured = new ConjuredItem(this.items[i])
          conjured.updateQuality()
          break
        default:
          const ordinary = new OrdinaryItem(this.items[i])
          ordinary.updateQuality()
          break
      }
      this.setMinMaxQuality(this.items[i])
    }
    return this.items;
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

class BackstagePass{
  constructor(item) {
    this.item = item
  }

  updateQuality() {
    this.item.sellIn = this.item.sellIn - 1
    if (this.item.sellIn < 0) {
      this.item.quality = 0
    } else if (this.item.sellIn < 5) {
      this.item.quality += 3
    } else if (this.item.sellIn < 10) {
      this.item.quality += 2
    } else {
      this.item.quality += 1
    }
    return this.item
  }
}

class Sulfuras{
  constructor(item) {
    this.item = item
  }

  updateQuality() {
    return this.item
  }
}

class Brie{
  constructor(item) {
    this.item = item
  }
  updateQuality() {
    this.item.sellIn = this.item.sellIn - 1
    if (this.item.quality > 0 && this.item.sellIn < 0) {
      this.item.quality += 2;
    } else if (this.item.quality > 0) {
      this.item.quality += 1;
    }
    return this.item
  }
}

class OrdinaryItem{
  constructor(item) {
    this.item = item
  }
  
  updateQuality() {
    this.item.sellIn = this.item.sellIn - 1
    if (this.item.sellIn < 0) {
      this.item.quality -= 2;
    } else {
      this.item.quality -= 1;
    }
    return this.item
  }
}

class ConjuredItem{
  constructor(item) {
    this.item = item
  }
  
  updateQuality() {
    this.item.sellIn = this.item.sellIn - 1
    if (this.item.sellIn < 0) {
      this.item.quality -= 4;
    } else {
      this.item.quality -= 2;
    }
    return this.item
  }
}

module.exports = {
  Item,
  Shop
}

