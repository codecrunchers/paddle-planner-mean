# Remote Statefile

# Cannot contain interpolations

terraform {
  backend "s3" {
    region     = "eu-west-1"
    bucket     = "paddle-planner-_BUCKET_ID"
    key        = "tf_statefiles/dev.tfstate"
    acl        = "private"
    encrypt    = true
  }
}

resource "aws_s3_bucket" "statefiles_for_app" {
  bucket = "paddle-planner-_BUCKET_ID"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}


# Setup the region here
provider "aws" {
  region = "${var.region}"
}

# We want the account ID in the statefile for other resources
data "aws_caller_identity" "current" {}
