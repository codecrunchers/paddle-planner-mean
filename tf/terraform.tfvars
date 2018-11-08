dns_zone = "paddle-planner.com"

region = "eu-west-1"

pipeline_external_access_cidr_block = ["37.228.251.37/32", "83.70.128.30/32", "192.30.252.0/22", "185.199.108.0/22"] //Home,GitHUB*2

#TODO: Dup
#Key Name is Pattern _BUCKET_ID - see go.sh

key_name = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1-key"

#Key Name is Pattern _BUCKET_ID - see go.sh
vpn_instance_details = {
  ami      = "ami-01a191cc4def950c4"
  size     = "t2.micro"
  key_name = "paddle-planner-a09dad9e-99f8-4faa-8ea0-d106fbaafaa3-1-key"
}



nginx_definition = {
  docker_image_tag           = "nginx"
  name                       = "nginx"
  context                    = ""
  host_port_to_expose        = "80"
  container_port_to_expose   = "8080"
  instance_memory_allocation = "1024"
  instance_count             = "1"
}

