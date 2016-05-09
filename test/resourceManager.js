/**
 * Created by joseba on 7/3/16.
 */
describe("ResourceManager tests", function() {
    var engine = pow.engine;
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

        it('Json resource type loaded', function() {
            expect(engine.resourceMgr._resourceTypes).to.have.property('json')
                .with.deep.property('parse')
                .that.is.a('function');
        });

    });

    describe(" - Asset Manager download image -->", function(){
        it('Download valid image', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/star.png', 'star', 'image')
                .then(
                    function (res) {
                        expect(res).to.be.an.instanceof(Image);
                        done();
                    }
                );
        });
        it('Download invalid image', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/pepe.png', 'pepe', 'image' )
                .then(
                    function( res ){
                        expect( res ).to.be.undefined;
                        done();
                    }
                );
        });
        it('Ask for a valid image twice', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/star.png', 'star', 'image' )
                .then(
                    function( res ){
                        engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/star.png', 'star', 'image')
                            .then(
                                function( res2 ) {
                                    expect( res2 ).to.be.an.instanceof( Image );
                                    done();
                                }
                            );
                    }
                );
        });
    });

    describe(" - Asset Manager download json -->", function(){
        it('Download valid json', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/test.json', 'test', 'json')
                .then(
                    function( res ){
                        expect( res ).to.be.an( 'object' )
                            .with.deep.property('type')
                            .that.equal('Scene');
                        done();
                    }
                );
        });
        it('Download invalid json', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/pepe.json', 'pepe', 'json')
                .then(
                    function( res ){
                        expect( res ).to.be.undefined;
                        done();
                    }
                );
        });
        it('Ask for a valid json twice', function( done ) {
            engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/test.json', 'test', 'json')
                .then(
                    function( res ) {
                        engine.resourceMgr.obtainResource('/base/test/resourceManagerRes/test.json', 'test', 'json')
                            .then(
                                function (res2) {
                                    expect(res2).to.be.an('object')
                                        .with.deep.property('type')
                                        .that.equal('Scene');
                                    done();
                                }
                            );
                    }
                );
        });
    });
});
