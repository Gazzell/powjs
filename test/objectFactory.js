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
    describe(" - Object Factory create math Vector -->", function(){
        var obj = engine.objectFactory.create( "Vector" );
        it('Scene object creation', function() {
            expect( obj ).not.to.be.an("undefined");
            assert.propertyVal( obj, 'x', 0, "Property x does not exists or has value different to 0" );
            assert.propertyVal( obj, 'y', 0, "Property y does not exists or has value different to 0" );
        });
    });
    describe(" - Object Factory create math Vector -->", function(){
        var obj = engine.objectFactory.create( "Rect" );
        it('Scene object creation', function() {
            expect( obj ).not.to.be.an("undefined");
            assert.propertyVal( obj, 'x', 0, "Property x does not exists or has value different to 0" );
            assert.propertyVal( obj, 'y', 0, "Property y does not exists or has value different to 0" );
            assert.propertyVal( obj, 'w', 0, "Property w does not exists or has value different to 0" );
            assert.propertyVal( obj, 'h', 0, "Property h does not exists or has value different to 0" );
        });
    });
    describe(" - Object Factory create math Vector -->", function(){
        var obj = engine.objectFactory.create( "Matrix3" );
        it('Scene object creation', function() {
            expect( obj ).not.to.be.an("undefined");
            assert.property( obj, 'value', "Property value does not exists" );
            assert.lengthOf( obj.value, 6, "Matrix value has 6 length" );
        });
    });
});