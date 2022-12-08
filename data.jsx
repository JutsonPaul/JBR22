const orders=[];
const bill=[];
export function getorders()
{
    return orders;
}

export function placeorder(r)
{
        orders.push(r);
}

export function tempbill()
{
       return bill;
}

export function genbill(r)
{
      bill.push(r);
}