if (Meteor.isClient) {
	Meteor.startup(function() {
		Hooks.init();
	});
}