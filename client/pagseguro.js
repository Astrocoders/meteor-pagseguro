let CartItems = new Mongo.Collection('cart-items', {connection: null});
let	CartItemsPersistent = new PersistentMinimongo(CartItems);

PagSeguro.API = settings => {
	if (!settings || !settings.token || !settings.email) {
		throw new Error('You must set your token and email');
	}

	this.token = settings.token;
	this.email = settings.token;

	return this;
}

PagSeguro.API.prototype = {
	constructor: PagSeguro.API,

	CartItems: CartItems,

	// { description, amount, quantity, weight }
	addItem(item) {
		if (!item.amount || !item.description) {
			throw new Error('Must have at least amount and description');
		}

		item = _.extend({
			quantity: 1,
			weight: 0
		}, item);

		return CartItems.insert(item);
	},

	removeItem(id) {
		return CartItems.remove(id);
	},

	removeAllItems() {
		_.each(CartItems.find({}).fetch(), (item) => {
			CartItems.remove(item._id);
		})
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

		Meteor.call('pagSeguroCheckout', this.fetchItems(), !!callback, (err, res) => {
			if (!callback) window.location = res.paymentUrl;
			else callback(err, res);
		});
	}
}
