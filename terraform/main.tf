resource "aws_instance" "app_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  tags = {
    Name = "NodeAppServer"
  }
}

output "app_server_ip" {
  value = aws_instance.app_server.public_ip
}

