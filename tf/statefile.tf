# Remote Statefile

# Cannot contain interpolations

terraform {
  backend "s3" {
    region     = "eu-west-1"
    bucket     = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1"
    key        = "tf_statefiles/dev.tfstate"
    acl        = "private"
    encrypt    = true
#    lock_table = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1-lock"
  }
}

resource "aws_s3_bucket" "statefiles_for_app" {
  bucket = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1"
  acl    = "private"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}

#AWS Will allow locking of statfiles via this db
#resource "aws_dynamodb_table" "terraform_statelock" {
#  name           = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1-lock"
#  read_capacity  = 20
#  write_capacity = 20
#  hash_key       = "LockID"

#  attribute {
#    name = "LockID"
#    type = "S"
#  }
#}

# Setup the region here
provider "aws" {
  region = "${var.region}"
}

# We want the account ID in the statefile for other resources
data "aws_caller_identity" "current" {}
