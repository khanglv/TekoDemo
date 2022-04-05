// import Product from '../models/Product'

const apiService = (method, url)=> {
    return fetch(url, {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        } 
    }).then( response => response.json() )
    .then(data => {
        return data;
    })
}

export function getListProducts(){
    return apiService('GET', `https://hiring-test.stag.tekoapis.net/api/products`);
    // return (res || []).map(item => new Product(item));
}

export function getListColors(){
    return apiService('GET', `https://hiring-test.stag.tekoapis.net/api/colors`)
}