PagSeguro.createPurchase = ({sender, items, shippingAddress}) => {
  return {
    normalizeAddressObj(shippingAddress){
      const normalizedShippingAddress = _.mapKeys(shippingAddress, (v, key) => `shippingAddress${_.capitalize(key)}`);
      return {
        ...normalizedShippingAddress,
        shippingType: shippingAddress.type,
      }
    },

    getPurchase(){
      return {
        reference: Random.id(),
        items,
        createdAt: new Date(),
        sender: _.mapKeys(sender, (v, key) => `sender${_.capitalize(key)}`),
        shippingAddress: this.normalizeAddressObj(shippingAddress),
      };
    },

    getRequest(purchase:object){
      return PagSeguroUtils.serializeRequest(purchase);
    },
    
    getCheckoutCode(purchase:object, onError){
      const response = HTTP.post(PagSeguro.config.API_URL, {
        params: purchase,
        headers: {
          'Accept-Charset': PagSeguro.config.encoding,
        },
      });

      if (response.error) {
        onError(response.error, response);
        return false;
      }

      return xml2js.parseStringSync(response.content).checkout.code;
    },

    getCheckoutURL({ onError }){
      const purchaseAsRequest = this.getRequest(this.getPurchase());
      const checkoutCode = this.getCheckoutCode(purchaseAsRequest, onError);

      if(!checkoutCode) return false;

      return `${PagSeguro.config.API_PAYMENT_URL}${checkoutCode}`;
    },
  };
}
