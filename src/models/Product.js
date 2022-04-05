
export default class Product {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data = this.__data__) {
        this.id = data.id || undefined;
        this.color = data.color || undefined;
        this.errorDescription = data.errorDescription || undefined;
        this.image = data.image || '';
        this.name = data.name || '';
        this.sku = data.sku || undefined;
    }

    export() {
        const result = super.export({
            id: this.id,
            color: this.color,
            errorDescription: this.errorDescription,
            image: this.image,
            name: this.name,
            sku: this.sku
        });
        return result;
    }
}
