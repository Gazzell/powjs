/**
 * Created by joseba on 8/3/16.
 */

var JsonResource = {
    type: 'json',
    parse: ( response ) => {
        return new Promise( (resolve, reject ) => {
                resolve( response.json() );
            })
            .catch( e => { throw e; });
    }
};

export { JsonResource as default };