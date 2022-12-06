class ReservationDetails{
    productId;
    quantity;
    shppingMallId;
    buyerId;
    optionList;
    constructor(productId,quantity,shppingMallId,buyerId,optionList){
        this.productId = productId;
        this.quantity = quantity;
        this.shppingMallId = shppingMallId;
        this.buyerId = buyerId;
        this.optionList = optionList;
    }
}

export default ReservationDetails;