/**
 * Created by joseba on 12/05/2016
 */

"use strict";
import { default as imageLoader } from "./imageResource.es6";
import { default as jsonLoader } from "./jsonResource.es6";

var loaders = {
    image: imageLoader,
    json: jsonLoader

}
export { loaders as default }
