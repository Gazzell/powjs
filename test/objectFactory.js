/**
 * Created by joseba on 14/1/16.
 */
describe("ObjectFactory tests", function() {
    var engine = new pow.Engine();
    beforeEach(function() { });
    afterEach(function() { });
    describe(" - Object Factory create SceneObject -->", function(){
        it('ObjectFactory exists', function() {
            assert.isDefined( engine.objectFactory, ' Engine.objectFactory not defined' );
        });

        var obj = engine.objectFactory.create( "SceneObject" );
        it('Scene object creation', function() {
            expect( obj ).not.to.be.an("undefined");
            assert.equal( obj.type, 'SceneObject' );
        });
    });
});