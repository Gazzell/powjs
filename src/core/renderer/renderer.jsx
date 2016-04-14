/**
 * Created by joseba on 19/2/16.
 */

"use strict";

import { glBasicRenderer as glBasicRenderer} from "./gl/glBasicRenderer.jsx";
import { default as RenderPass} from "./renderPass.jsx";

var renderer = {
    glBasicRenderer: glBasicRenderer,
    RenderPass: RenderPass
};

export { renderer as default };

