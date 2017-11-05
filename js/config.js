require.config({
	baseUrl : "/kaola",
	paths : {
		"jquery" : "lib/jquery/jquery-1.12.4.min",
		"cookie" : "lib/jquery_plugins/jquery.cookie",
		"template" : "lib/arttemplate/template",
		"loadHeader" : "js/loadHeader",
		"loadFooter" : "js/loadFooter",
		"signIn" : "js/signIn",
		"signUp" : "js/signUp",
		"coursel" : "lib/jquery_plugins/jquery.coursel",
		"htmlCoursel" : "lib/jquery_plugins/jquery.htmlCoursel",
	},
	shim : {
		/*"zoom": {
			deps : ["jquery"]
		}*/
	}
});