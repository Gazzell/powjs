/**
 * Created by joseba on 16/12/15.
 */
describe("Engine initialization", function() {
    beforeEach(function() { });
    afterEach(function() { });
    describe(" - ResourceManager initialization -->", function(){
        it('Resource manager exists', function() {
            assert.isDefined( pow.engine.resourceMgr, ' Engine.resourceMgr not defined' );
        });
    });
});
