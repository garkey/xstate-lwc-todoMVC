import { camsCallOut } from './CamsExternalCallout';

export const once = (fn) => {
    let called = false;
    let result;
    return (...args) => {
        if (!called) {
            result = fn(...args);
            called = true;
        }
        return result;
    };
};

export const derivedCamsFields = (o) => ({
    ...o,
    id: o.id || o._id,
    _product: {
        model_number: o.model_number,
        description: o.description,
        model_manufacturer_name: o.model_manufacturer_name,
    },
});

export const loadSelectOptions = (requestPath) => {
    return camsCallOut({
        requestPath: `api/${requestPath}`,
        method: 'GET',
        requestbody: JSON.stringify({}),
    })
        .then((result) => {
            return JSON.parse(result.Body);
        })
        .catch((err) => {
            console.error(err);
        });
};

export const trimProps = (props, params) => {
    console.log('props', props);
    console.log('params', params);

    const recurfn = obj => {
      
      const c = Object.entries(params);
      return c;
    }

    console.log();
    

    return params;
};
