/**
 * Created by joseba on 12/2/16.
 */
describe("Scene Object", function() {
    var engine = new pow.Engine(),
        root = engine.objectFactory.create('SceneObject');
    beforeEach(function() {
        for( var i = 0; i < 10; i++ ){
            root.addChild( engine.objectFactory.create('SceneObject') );
        }
    });
    afterEach(function() {
        while (root.children.length > 0){
            engine.objectFactory.dispose( root.children.pop() );
        }
    });

    it(" It should add 'child' at its ast position", function(){
        var newElement = engine.objectFactory.create('SceneObject');
        root.addChild( newElement );
        assert( root.children.length === 11, 'Expected 11 children and had ' + root.children.length );
        assert.equal( root.children[ 10 ], newElement, 'Last children is not the same as new element');
    });

    it(" It should add 'child' at the beginning", function(){
        var newElement = engine.objectFactory.create('SceneObject');
        root.addChild( newElement, 0 );
        assert( root.children.length === 11, 'Expected 11 children and had ' + root.children.length );
        assert.equal( root.children[ 0 ], newElement, 'first children is not the same as new element');
    });

    it(" It should add 'child' at the 5th pos", function(){
        var newElement = engine.objectFactory.create('SceneObject');
        root.addChild( newElement, 4 );
        assert( root.children.length === 11, 'Expected 11 children and had ' + root.children.length );
        assert.equal( root.children[ 4 ], newElement, '5th not the same as new element');
    });

    it(" It should add 'child' at the last pos", function(){
        var newElement = engine.objectFactory.create('SceneObject');
        root.addChild( newElement, 15 );
        assert( root.children.length === 11, 'Expected 11 children and had ' + root.children.length );
        assert.equal( root.children[ 10 ], newElement, '5th not the same as new element');
    });

    
});