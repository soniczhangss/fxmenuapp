System.register(['./googledrive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var googledrive_1;
    return {
        setters:[
            function (googledrive_1_1) {
                googledrive_1 = googledrive_1_1;
            }],
        execute: function() {
            describe('root directory tests', function () {
                var a = [""];
                beforeEach(function () { return a = new googledrive_1.GoogleDrive().getFilesInRootDirectory(); });
                it('ZXL Studio is in the root directory', function () { return expect(a).toContain("ZXL Studio"); });
                it('Others is in the root directory', function () { return expect(a).toContain("Others"); });
                it('IELTS is in the root directory', function () { return expect(a).toContain("IELTS"); });
                it('FIT5167_assi is in the root directory', function () { return expect(a).toContain("FIT5167_assi"); });
                it('FIT5166 is in the root directory', function () { return expect(a).toContain("FIT5166"); });
                it('FIT5045 is in the root directory', function () { return expect(a).toContain("FIT5045"); });
                it('FIT4146 is in the root directory', function () { return expect(a).toContain("FIT4146"); });
                it('Extragreen is in the root directory', function () { return expect(a).toContain("Extragreen"); });
                it('Business Bridging is in the root directory', function () { return expect(a).toContain("Business Bridging"); });
                it('FIT4037 is in the root directory', function () { return expect(a).toContain("FIT4037"); });
            });
        }
    }
});
//# sourceMappingURL=googledrive.spec.js.map