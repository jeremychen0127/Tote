
Slingshot.fileRestrictions("myImageUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 2 * 1024 * 1024,
});

Slingshot.createDirective("myImageUploads", Slingshot.S3Storage, {
  AWSAccessKeyId: "AKIAIK2VPHGGJE2YYBVQ",
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
    return "Clothes/" + file.name;
  }

});

