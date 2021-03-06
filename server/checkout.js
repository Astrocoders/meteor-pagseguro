PagSeguro.createPurchase = ({reference, sender, items, shippingAddress}) => {
  return {
    normalizeAddressObj(shippingAddress){
      if(!shippingAddress) return null;

      const normalizedShippingAddress = _.mapKeys(shippingAddress, (v, key) => `shippingAddress${_.capitalize(key)}`);
      return {
        ...normalizedShippingAddress,
        shippingType: shippingAddress.type,
      };
    },

    getPurchase(){
      return {
        reference: reference || Random.id(),
        items,
        createdAt: new Date(),
        sender: _.mapKeys(sender, (v, key) => `sender${_.capitalize(key)}`),
        ...(
          _.isEmpty(shippingAddress) ? {} : {
            shippingAddress: this.normalizeAddressObj(shippingAddress),
          }
        ),
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

      return xml2js.parseStringSync(response.content).checkout.code[0];
    },

    getCheckout({ onError }){
      const purchaseAsRequest = this.getRequest(this.getPurchase());
      const checkoutCode = this.getCheckoutCode(purchaseAsRequest, onError);

      if(!checkoutCode) return false;

      return {
        URL: `${PagSeguro.config.API_PAYMENT_URL}${checkoutCode}`,
        code: checkoutCode,
      };
    },
  };
}
