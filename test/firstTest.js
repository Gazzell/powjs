/**
 * Created by joseba on 16/12/15.
 */
describe("Engine initialization", function() {
    var engine = new pow.Engine();
    beforeEach(function() { });
    afterEach(function() { });
    describe(" - ResourceManager initialization -->", function(){
        it('Resource manager exists', function() {
            assert.isDefined( engine.resourceMgr, ' Engine.resourceMgr not defined' );
        });
        it('Has pepe', function() {
            expect( engine.resourceMgr.pepe ).to.equal("pepe");
        });
    });
});