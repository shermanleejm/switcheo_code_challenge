class Price {
  constructor(pair, buy, sell, timestamp, id) {
    this.id = id;
    this.pair = pair;
    this.buy = buy;
    this.sell = sell;
    this.timestamp = timestamp;
  }

  mid() {
    return this.buy - this.sell;
  }

  quote() {
    return this.pair.substring(3, 6);
  }
}

class Datasource {
  async getPrices() {
    var result = [];
    await fetch('https://static.ngnrs.io/test/prices')
      .then((res) => res.json())
      .then((data) => {
        data.data.prices.forEach((curr) => {
          result.push(new Price(curr.pair, curr.buy, curr.sell, curr.timestamp, curr.id));
        });
      });
    return result;
  }
}

var ds = new Datasource();

ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
    });
  })
  .catch((error) => {
    console.err(error);
  });
