import LightningDatatable from 'lightning/datatable';
import editButtonTemplate from './editButtonTemplate.html';
import downloadCellTemplate from './downloadCellTemplate.html';
import productCellTemplate from './productCellTemplate.html';
import datatable from './datatable.html';

export default class DcxDataTable extends LightningDatatable {
    isLoading = true;

    connectedCallback() {
        super.connectedCallback();
        console.log('this.state', JSON.parse(JSON.stringify(this.state)));
    }
    static customTypes = {
        editinform: {
            template: editButtonTemplate,
            typeAttributes: ['rowid'],
        },
        download: {
            template: downloadCellTemplate,
        },
        _product: {
            template: productCellTemplate,
        },
    };

    render() {
        return datatable;
    }
}
