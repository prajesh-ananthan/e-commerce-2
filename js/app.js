new Vue({
  el: "#app",
  data: {
    isShowingCart: false,
    cart: {
      items: []
    },
    products: [
      {
        id: 1,
        name: "MacBook Pro (15 inch)",
        description:
          "This laptop has a super crisp Retina display. Yes, we know that it's overpriced...",
        price: 2999,
        inStock: 50
      },
      {
        id: 2,
        name: "Samsung Galaxy Note 7",
        description:
          "Unlike the overpriced MacBook Pro, we're selling this one a bit cheap, as we heard it might explode...",
        price: 299,
        inStock: 755
      },
      {
        id: 3,
        name: "HP Officejet 5740 e-All-in-One-printer",
        description:
          "This one might not last for so long, but hey, printers never work anyways, right?",
        price: 149,
        inStock: 5
      },
      {
        id: 4,
        name: "iPhone 7 cover",
        description:
          "Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?",
        price: 49,
        inStock: 11
      },
      {
        id: 5,
        name: "iPad Pro (9.7 inch)",
        description:
          "We heard it's supposed to be pretty good. At least that's what people say.",
        price: 599,
        inStock: 0
      },
      {
        id: 6,
        name: "OnePlus 3 cover",
        description:
          "Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!",
        price: 19,
        inStock: 81
      }
    ]
  },
  methods: {
    addProductToCart: function(product) {
      // If the same product added to cart, Increase the quantity
      let cartItem = this.getCartItem(product);

      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        // When we add product to cart, the product in stock decreases.
        this.cart.items.push({
          product: product,
          quantity: 1
        });
      }

      product.inStock--;
    },
    getCartItem: function(product) {
      for (let i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i];
        }
      }
      return null;
    },
    increaseQuantity: function(cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    decreaseQuantity: function(cartItem) {
      cartItem.product.inStock++;
      cartItem.quantity--;

      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    removeItemFromCart: function(cartItem) {
      var index = this.cart.items.indexOf(cartItem);

      if (index !== -1) {
        // Remove 1 item from that index position
        this.cart.items.splice(index, 1);
      }
    },
    checkout: function() {
      // Javascript confirm method
      if (confirm("Are you sure you want to purchase these products?")) {
        this.cart.items.forEach(function(item) {
          item.product.inStock += item.quantity;
        });
        this.cart.items = [];
      }
    }
  },
  computed: {
    cartTotal: function() {
      let total = 0;

      // Calculate the total purchase of the products in the cart
      this.cart.items.forEach(function(item) {
        total += item.quantity * item.product.price;
      });

      return total;
    },
    gstAmount: function() {
      return this.cartTotal * 6 / 100;
    }
  },
  filters: {
    currency: function(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });

      return formatter.format(value);
    }
  }
});
