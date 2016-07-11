PagSeguro.config = {
	encoding: 'UTF-8',
	API_URL: 'https://ws.pagseguro.uol.com.br/v2/checkout',
	API_HEADER: 'application/x-www-form-urlencoded; charset=UTF-8',
	API_PAYMENT_URL: 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=',
	API_NOTIFICATION_URL: 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications/',
	
	cbUrls: {
		/**
		 * Define here the redir url you configured on PagSeguro
		 * PagSeguro will send the confirmation code, the code will be stored
		 * in purchase doc in the collection automatically.
		 * @type {String}
		 */
		confirmationCode: '/pagseguro_purchase_code',

		/**
		 * After getting the purchase code, the user will be redirected to here
		 * @type {String}
		 */
		successfulPurchase: '/pagseguro_confirmation/',

		/**
		 * PagSeguro will be sending to here changes in purchase status
		 * @type {String}
		 */
		notifications: '/pagseguro_notifications'
	},

	callbackUrls(urls) {
		this.cbUrls = _.extend(this.cbUrls, urls);
	},

	/**
	 * Holds checkout callbacks
	 * @type {Array}
	 */
	_checkoutCallbacks: [],

	/**
	 * Set callbacks to be called when checkout is over
	 * @param  {Function} callback
	 */
	checkoutCallback(callback) {
		this._checkoutCallbacks.push(callback);
	},
  
  _notificationHandler: undefined,
  NotificationHandler(handler) {
    this._notificationHandler = handler;
  },
};
