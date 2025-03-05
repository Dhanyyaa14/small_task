//@ui5-bundle my/app/Component-preload.js
sap.ui.predefine("my/app/Component", ["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("my.app.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments)}})});
sap.ui.require.preload({
	"my/app/i18n/i18n.properties":'appTitle=My UI5 App\nappDescription=A simple UI5 application\n',
	"my/app/manifest.json":'{"_version":"1.12.0","sap.app":{"id":"my.app","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}"},"sap.ui":{"technology":"UI5","deviceTypes":{"desktop":true,"tablet":true,"phone":true}}}'
});
//# sourceMappingURL=Component-preload.js.map
