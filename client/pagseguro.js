const CartItems = new Mongo.Collection('cart-items', {connection: null});
const	CartItemsPersistent = new PersistentMinimongo(CartItems);

PagSeguro = (settings) => {
  return PagSeguro.API(PagSeguro._settings);
}

PagSeguro.API = settings => {
	if (!Meteor.isServer && !settings || !settings.token || !settings.email) {
		throw new Error('You must set your token and email');
	}

  return {
    get token(){ return settings.token },
    get email(){ return settings.token },

    CartItems: CartItems,

    // { description, amount, quantity, weight }
    addItem(item) {
      if (!item.amount || !item.description) {
        throw new Error('Must have at least amount and description');
      }

      return CartItems.insert({
        quantity: 1,
        weight: 0,
        ...item,
      });
    },

    removeItem: id => CartItems.remove(id),

    removeAllItems() {
      _.each(CartItems.find({}).fetch(), (item) => {
        CartItems.remove(item._id);
      });
    },

    fetchItems() {
      return CartItems.find().fetch();
    },

    checkout(callback, dontClearCart) {
      if (_.isBoolean(callback)) {
        dontClearCart = callback;
        callback = undefined; 
      }

      if (!dontClearCart) {
        this.removeAllItems();
      }

      Meteor.call('pagSeguroCheckout', this.fetchItems(), (err, res) => {
        if (!callback) window.location = res.paymentUrl;
        else callback(err, res);
      });
    }
  };
}
