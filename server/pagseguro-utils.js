PagSeguroUtils = {
  serializeItems(items) {
    let serialized = {};

    _.each(items, (item, i) => {
      i+=1;
      serialized['itemId' + i] = item._id;
      serialized['itemDescription' + i] = item.description;
      serialized['itemAmount' + i] = (item.amount / 100).toFixed(2);
      serialized['itemQuantity' + i] = item.quantity;
      serialized['itemWeight' + i] = item.weight * 1000;
      serialized['itemShippingCost' + i] = (item.shippingCost / 100).toFixed(2);
    });

    return serialized;
  },

  serializeSender(sender) {
    let fields = _.pick(sender, 
      [
        'senderName', 'senderPhone', 'senderAreaCode', 'senderEmail',
        'senderCPF', 'senderBornDate'
      ]
    );

    return fields;
  },

  serializeAddress(address) {
    let fields = _.pick(address, 
      [
        'shippingType', 'shippingAddressStreet', 'shippingAddressNumber', 
        'shippingAddressComplement', 'shippingAddressDistrict', 'shippingAddressPostalCode', 
        'shippingAddressCity', 'shippingAddressState', 'shippingAddressCountry',
      ]
    );

    return fields;
  },

  /**
   * Parametize an flat object.
   * @param  {Object} obj 
   * @return {String} 
   */
  parametizer(obj){
    let params = [];

    _.each(obj, (value, key) => {
      params.push(key + '=' + value);
    });

    return params.join('&');
  },

  serializeRequest(purchase){
    let request = {};
    let sets = PagSeguro._settings;

    request = _.extend(request, this.serializeItems(purchase.items))
    request = _.extend(request, this.serializeSender(purchase.sender))
    request = _.extend(request, this.serializeAddress(purchase.shippingAddress));

    request.reference = purchase.reference;
    request.currency = sets.currency;
    request.email = sets.email;
    request.token = sets.token;

    return request;
  },

  stringifyRequest(purchase) {
    let request = this.serializeRequest(purchase);
    return this.parametizer(request);
  }
}
