
Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
});

Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAI3GQW3YUVTCSLE5Q",
  AWSSecretAccessKey: "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",
  bucket: "tote-pictures",
  acl: "public-read",
  region: "us-west-2",

  authorize: function () {
    if (!this.userId) {
      var message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    var user = Meteor.users.findOne(this.userId);
    return user.username + "/" + file.name;
  }

});

