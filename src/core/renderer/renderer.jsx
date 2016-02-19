/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { default as GlRenderer} from "./glRenderer.jsx";
import { default as RenderPass} from "./renderPass.jsx";

var renderer = {
    GlRenderer: GlRenderer,
    RenderPass: RenderPass
};

export { renderer as default };

