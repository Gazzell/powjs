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

        var obj;
        it('Scene object creation', function() {
            obj = engine.objectFactory.create( "SceneObject" );
            expect( obj ).to.be.an.instanceof( pow.core.renderables.SceneObject );
        });

        it('Sprite creation', function() {
            obj = engine.objectFactory.create( "Sprite" );
            expect( obj ).to.be.an.instanceof( pow.core.renderables.Sprite );
        });
    });
    describe(" - Object Factory create Aux types -->", function(){
        var obj;
        it('Animation frame creation', function() {
            obj = engine.objectFactory.create( "AnimationFrame" );
            expect( obj ).to.be.an.instanceof( pow.core.renderables.AnimationFrame );
        });

        it('Animation creation', function() {
            obj = engine.objectFactory.create( "Animation" );
            expect( obj ).to.be.an.instanceof( pow.core.renderables.Animation );
        });

        it('Anchor Types should not create', function() {
            obj = engine.objectFactory.create( "AnchorType" );
            expect( obj ).to.be.undefined;
        });
    });
    describe(" - Object Factory create Math types -->", function(){
        var obj;
        it('Vector creation', function() {
            obj = engine.objectFactory.create( "Vector" );
            expect( obj ).to.be.an.instanceof( pow.core.math.Vector );
            assert.propertyVal( obj, 'x', 0, "Property x does not exists or has value different to 0" );
            assert.propertyVal( obj, 'y', 0, "Property y does not exists or has value different to 0" );
        });
        it('Rect creation', function() {
            obj = engine.objectFactory.create( "Rect" );
            expect( obj ).to.be.an.instanceof( pow.core.math.Rect );
            assert.propertyVal( obj, 'x', 0, "Property x does not exists or has value different to 0" );
            assert.propertyVal( obj, 'y', 0, "Property y does not exists or has value different to 0" );
            assert.propertyVal( obj, 'w', 0, "Property w does not exists or has value different to 0" );
            assert.propertyVal( obj, 'h', 0, "Property h does not exists or has value different to 0" );
        });
        it('Matrix creation', function() {
            obj = engine.objectFactory.create( "Matrix3" );
            expect( obj ).to.be.an.instanceof( pow.core.math.Matrix3 );
            assert.isArray( obj.value, "Matrix has not value array" );
        });
    });
});