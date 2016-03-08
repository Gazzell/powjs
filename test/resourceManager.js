/**
 * Created by joseba on 7/3/16.
 */
describe("ResourceManager tests", function() {
    var engine = new pow.Engine();
    beforeEach(function() { });
    afterEach(function() { });
    describe(" - Asset Manager register resource type -->", function(){
        it('Valid resource type', function() {
            engine.resourceMgr.registerResourceType(
                {
                    type:'validType',
                    parse: function( elem ){
                        return {};
                    }
                });

            expect(engine.resourceMgr._resourceTypes).to.have.property('validType')
                .with.deep.property('parse')
                    .that.is.a('function');
        });

        it('Not valid resource type', function() {
            engine.resourceMgr.registerResourceType(
                {
                    type: 'invalidType'
                });

            expect(engine.resourceMgr._resourceTypes).not.to.have.property('invalidType');
        });

        it('Image resource type loaded', function() {
            expect(engine.resourceMgr._resourceTypes).to.have.property('image')
                .with.deep.property('parse')
                    .that.is.a('function');
        });

    });

    describe(" - Asset Manager download image -->", function(){
        it('Download valid image', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/star.png', 'star', 'image',
            function( res ){
                expect( res ).to.be.an.instanceof( Image );
                done();
            });
        });
    });
});