---
slug: "random-python-snippets-01"
date: "2024-11-11"
title: "Manjana's Random Py Snippets – Part I"
description: "Singleton Metaclass, SSH Keypair Generator, Basic Python Logger, SMTP Client"
categories: ["python"]
tags: ["ssh","singleton","smtp"]
featured: false
series: "Python Snippets"
---

# Singleton Metaclass
```python
from typing import Any

class Singleton(type):
    """ Usage: class ClassName(metaclass=Singleton) """

    _instances = {}

    def __call__(cls, *args, **kwargs) -> Any:
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]
```

# Basic Stdlib Logger
```python
import logging

from src.utils.path_manager import PathManager
from src.utils.singleton import Singleton


class ConsoleLogger(metaclass=Singleton):
    def __init__(self, name: str = "ConsoleLogger"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)

        # Console Handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.DEBUG)
        formatter = logging.Formatter(u'%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)

        # File Handler
        log_file_path = PathManager().root.joinpath('app.log')
        file_handler = logging.FileHandler(log_file_path, encoding="utf-8")
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)
        self.logger.addHandler(file_handler)

    def debug(self, message: str) -> None:
        self.logger.debug(message)

    def info(self, message: str) -> None:
        self.logger.info(message)

    def warning(self, message: str) -> None:
        self.logger.warning(message)

    def error(self, message: str) -> None:
        self.logger.error(message)

    def critical(self, message: str) -> None:
        self.logger.critical(message)
```

# Basic SMTP Client
```python
import smtplib
from email.mime.text import MIMEText
from dataclasses import dataclass
from typing import List

from src.utils.logger import ConsoleLogger


@dataclass
class SMTPConfig:
    smtp_server: str
    smtp_port: int
    smtp_username: str
    smtp_password: str
    sender: str
    recipients: List[str]


def send_email(config: SMTPConfig, subject: str, body: str):
    logger = ConsoleLogger()
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = config.sender
    msg['To'] = ', '.join(config.recipients)

    try:
        with smtplib.SMTP_SSL(config.smtp_server, config.smtp_port) as server:
            server.login(config.smtp_username, config.smtp_password)
            server.sendmail(config.sender, config.recipients, msg.as_string())
            logger.info(f"Email [{subject}] sent successfully!")
    except Exception as e:
        logger.info(f"Failed to send email. Error: {str(e)}")
```

# SSH Keypair Generator
```python
import os
from pathlib import Path

import paramiko

from src.utils.logger import ConsoleLogger
from src.utils.path_manager import PathManager


class SshUtils:
    logger = ConsoleLogger()

    def __init__(self, keyfile_name="id_rsa", passphrase=None):
        """
        Creates an SSH key-pair inside playbooks/profile folder with name `key_name`.pub for public, and
        `key_name` for private.

        Usage example:
        ssh_utils = SshUtils(profile_folder="test_profile", key_name="id_rsa", passphrase="Password1234!")
        ssh_utils.create_ssh_key_pair(key_bits=4096)
        print(ssh_utils.read_public_key())

        Passphrase is optional and can be omitted.
        """
        self.key_dir = os.path.expanduser(self.get_dir())
        self.key_name = keyfile_name
        self.passphrase = passphrase
        self.priv_key_path = Path(self.key_dir).joinpath(self.key_name)
        self.pub_key_path = self.priv_key_path.with_suffix(".pub")

    @staticmethod
    def get_dir():
        return PathManager().root / Path(".ssh")

    def create_ssh_key_pair(self, key_bits: int = 4096):
        os.makedirs(self.key_dir, exist_ok=True)

        key = paramiko.RSAKey.generate(bits=key_bits)
        private_key_path = self.create_private_key(key, self.key_dir, self.key_name, self.passphrase)
        public_key_path = self.create_public_key(key, self.key_dir, private_key_path)

        self.logger.info(f"SSH key pair created: Private key: {private_key_path}")
        self.logger.info(f"SSH key pair created: Public key: {public_key_path}")

        return private_key_path, public_key_path

    @classmethod
    def create_public_key(cls, key, key_dir, private_key_path):
        """Private key filepath is appended with .pub to create the pub key file"""
        public_key_path = os.path.join(key_dir, f"{private_key_path}.pub")
        public_key = f"{key.get_name()} {key.get_base64()}"
        with open(public_key_path, "w") as public_key_file:
            public_key_file.write(public_key)
        return public_key_path

    @classmethod
    def create_private_key(cls, key, key_dir, key_name, passphrase):
        private_key_path = os.path.join(key_dir, key_name)
        with open(private_key_path, "w") as private_key_file:
            key.write_private_key_file(private_key_file.name, password=passphrase)
        os.chmod(private_key_path, 0o600)
        return private_key_path

    def read_public_key(self):
        with open(self.pub_key_path, "r") as pub_key:
            return pub_key.readline()

    def read_private_key(self):
        with open(self.priv_key_path, "r") as priv_key:
            return priv_key.readline()
```